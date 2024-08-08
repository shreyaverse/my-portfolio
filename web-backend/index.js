const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const UserModel = require("./Models/Usermodels");
const PostModel = require("./Models/Postmodels");
const SubscribeModel = require("./Models/Subscribemodels");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/Public", express.static(path.join(__dirname, "Public")));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    
    const existingSubscription = await SubscribeModel.findOne({ email });
    if (existingSubscription) {
      return res.status(400).send('Email already subscribed');
    }

    const newSubscription = new SubscribeModel({ email });
    await newSubscription.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Subscription Confirmation',
      text: 'Thank you for subscribing to our newsletter!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending confirmation email');
      }
      console.log('Confirmation email sent:', info.response);
    });

    res.status(201).send('Subscribed successfully!');
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).send('Internal Server Error');
  }
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("Token is missing");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json("Token is invalid");
      } else {
        req.email = decoded.email;
        req.username = decoded.username;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ email: req.email, username: req.username });
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ username, email, password: hash })
        .then(() => res.json("Success"))
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.cookie("token", token, { httpOnly: true });
          return res.json({ Status: "Success", role: user.role });
        } else {
          return res.status(401).json("Password is incorrect");
        }
      });
    } else {
      return res.status(404).json("No record exists");
    }
  });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).send("All fields are required");
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Error sending email");
      }
      console.log("Email sent:", info.response);
      res.status(201).send("Message sent successfully!");
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).send("Internal Server Error");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "Public/Images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/create", verifyUser, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File is required" });
  }

  PostModel.create({
    title: req.body.title,
    author: req.body.author,
    date: req.body.date,
    description: req.body.description,
    file: req.file.filename,
  })
    .then(() => res.json("Success"))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error creating post", details: err.message })
    );
});

app.get("/getpost/:id", (req, res) => {
  const { id } = req.params;
  PostModel.findById(id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error fetching post", details: err.message })
    );
});

app.get("/getposts", (req, res) => {
  PostModel.find()
    .then((posts) => res.json(posts))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error fetching posts", details: err.message })
    );
});

app.put("/updatepost/:id", upload.single("file"), (req, res) => {
  const { id } = req.params;
  const updateData = {
    title: req.body.title,
    author: req.body.author,
    date: req.body.date,
    description: req.body.description,
  };

  if (req.file) {
    updateData.file = req.file.filename;
  }

  PostModel.findByIdAndUpdate(id, updateData)
    .then(() => res.json("Success"))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error updating post", details: err.message })
    );
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.delete("/deletepost/:id", verifyUser, (req, res) => {
  PostModel.findByIdAndDelete(req.params.id)
    .then(() => res.json("Success"))
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error deleting post", details: err.message })
    );
});

app.get("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.json("Success");
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
