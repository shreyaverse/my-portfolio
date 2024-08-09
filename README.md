# Personal Portfolio Website

This is a full-stack portfolio website built using **React.js**, **Express.js**, **MongoDB**, and **Tailwind CSS**. The website showcases various pages including login, sign-out, home, about, skills, blog, subscribe, and contact pages. The project is designed to be responsive and user-friendly.

## Features

- **Login & Sign-out**: Secure authentication for users.
- **Home & About Pages**: Overview of your portfolio and personal background.
- **Skills Page**: Highlight your technical skills and expertise.
- **Blog**: Integrated blog section with React-Quill for formatting.
- **Subscribe**: Users can subscribe to receive updates.
- **Contact**: Contact form for users to get in touch with you.
- **Theme Toggling**: Context API for dark/light mode.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Form Validation**: Utilized Formik and Yup for form validation.
- **HTTP Requests**: Used Axios for API calls.
- **Email Notifications**: Nodemailer for sending email notifications.
- **File Uploads**: Multer for handling file uploads.
- **Deployment**: Deployed for review and feedback.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/shreyaverse/my-portfolio.git
    cd my-portfolio
    ```

2. **Install the dependencies**:
    - For the backend:
      ```bash
      cd backend
      npm install
      ```
    - For the frontend:
      ```bash
      cd ../frontend
      npm install
      ```

3. **Set up environment variables**:
    Create a `.env` file in the backend directory with the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    NODE_ENV=development
    JWT_SECRET=your_jwt_secret
    EMAIL_HOST=your_email_host
    EMAIL_PORT=your_email_port
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_pass
    ```

4. **Run the application**:
    - Backend:
      ```bash
      cd backend
      npm run dev
      ```
    - Frontend:
      ```bash
      cd ../frontend
      npm start
      ```

5. **Visit the website**:
    Open your browser and go to `http://localhost:3000` to view the website.

## Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS
  - Formik & Yup (form validation)
  - React-Quill (rich text editor)
  - Axios (HTTP requests)
  - Context API (state management)

- **Backend**:
  - Express.js
  - MongoDB
  - Nodemailer (email notifications)
  - Multer (file uploads)

## Contact

For any inquiries, please contact [shreyyyk31@gmail.com](mailto:your-email@example.com)

