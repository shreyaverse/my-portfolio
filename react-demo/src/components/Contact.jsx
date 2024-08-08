import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      message: Yup.string().required('Required')
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('Form Submitted', values);

      fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(response => {
          if (response.ok) {
            setSubmissionStatus('success');
            resetForm();
          } else {
            setSubmissionStatus('error');
            return response.json().then(data => { throw new Error(data.message || 'Unknown error'); });
          }
        })
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          setSubmissionStatus('error');
          console.error('Error:', error);
        });
    }
  });

  return (
    <div id='contact' className="min-h-screen bg-gradient-to-b from-gray-300 via-gray-100 to-white p-4 text-black">
      <div className="flex flex-col p-4 mt-8 justify-center max-w-screen-lg mx-auto h-full">
        <div className="mt-12">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">Contact</p>
          <p className="py-6">Feel free to reach out to me for any inquiries or opportunities.</p>
        </div>

        <div className="flex mb-8 justify-center items-center">
          <form onSubmit={formik.handleSubmit} className="flex flex-col w-full md:w-1/2 bg-black p-8 rounded-lg shadow-md">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="p-2 mb-4 bg-gray-200 border-2 border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 mb-4">{formik.errors.name}</div>
            ) : null}

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="p-2 mb-4 bg-gray-200 border-2 border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 mb-4">{formik.errors.email}</div>
            ) : null}

            <textarea
              name="message"
              placeholder="Enter your message"
              rows="10"
              className="p-2 mb-4 bg-gray-200 border-2 border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 mb-4">{formik.errors.message}</div>
            ) : null}

            <button
              type="submit"
              className="text-white font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 mt-8 mx-auto rounded-md hover:scale-110 duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {submissionStatus === 'success' && (
          <div className="text-green-500 text-center mt-2">
            Your message has been sent successfully!
          </div>
        )}
        {submissionStatus === 'error' && (
          <div className="text-red-500 text-center mt-2">
            An error occurred. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
