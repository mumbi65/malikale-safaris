import React from "react";
import NavBar from "./navbar";
import Footer from "./footer";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { contactUsFormSchema } from "../schema";
import app from "../firebaseconfig";
import { getDatabase, ref, set, push } from "firebase/database";

const ContactUs = () =>{

    const onSubmit = async (values, {setSubmitting, resetForm}) =>{
        try {
            const response = await fetch('https://malikale-safaris.onrender.com/safari/api/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            if (response.ok) {
                const data = await response.json()
                alert("Message sent successfully")
                resetForm()
            } else {
                const errorData = await response.json()
                console.error(errorData)
                alert("Error:" + JSON.stringify(errorData))
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setSubmitting(false);
        }
        
    }

    const{values, errors, handleChange, handleBlur, handleSubmit, isSubmitting, setSubmitting, touched} = useFormik({
        initialValues:{
            fullname: '',
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: contactUsFormSchema,
        onSubmit
    })

    return(
        <>
        <NavBar/>
        <div className="heading-background-image-container">
            <div className="contactus-heading">
                <h1>Contact Us</h1>
            </div>
        </div>
        <div className="contactus-content">
            <div className="form-area">
                    <form onSubmit={handleSubmit}>
                        <div className="input-info">
                            <div className="form-group">
                                <label htmlFor="fullname">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fullname"
                                    name="fullname"
                                    onChange={handleChange}
                                    value={values.fullname}
                                    onBlur={handleBlur}
                                    placeholder="Full Name"
                                    style={errors.fullname && touched.fullname ? {borderColor: "rgb(245, 98, 98)"}: {}}
                                    />
                                {errors.fullname && touched.fullname ? <p className="error-message">{errors.fullname}</p> : ''}
                            </div>
                        </div>
                        <div className="input-info">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder="Email"
                                    style={errors.email && touched.email ? {borderColor: "rgb(245, 98, 98)"}: {}}
                                    />
                                    {errors.email && touched.email ? <p className="error-message">{errors.email}</p> : ''}
                            </div>
                        </div>
                        <div className="input-info">
                            <div className="form-group">
                                <label htmlFor="course">Subject</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="subject"
                                    name="subject"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.subject}
                                    placeholder="Write Subject"
                                    style={errors.subject && touched.subject ? {borderColor: "rgb(245, 98, 98)"}: {}}
                                    />
                                    {errors.subject && touched.subject ? <p className="error-message">{errors.subject}</p> : ''}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="message"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.message}
                                    placeholder="Write your message"
                                    style={errors.message && touched.message ? { borderColor: "rgb(245, 98, 98)" } : {}}
                                ></textarea>
                                {errors.message && touched.message ? <p className="error-message">{errors.message}</p> : ''}
                            </div>
                        </div>
                        <br/>
                        <button disabled={isSubmitting} className="submit-btn" type="submit">Submit</button>
                    </form>
                </div>
                <div className="contact-us-background-image-container">
                    <div className="contact-info">
                            <h3>Contact Information</h3> <br />
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon"/>
                            <h6>Kenya Contact Details:</h6>
                            <h6>P.O. Box 6657 00-200, Nairobi,</h6>
                            <h6>Kenya</h6>
                             <br />
                             <FontAwesomeIcon icon={faPhoneAlt} className="contact-icon"/>
                             <h6>Tell:</h6>
                             <h6>+254748153767</h6>
                             <br />
                             <FontAwesomeIcon icon={faEnvelope} className="contact-icon"/>
                             <h6>Email:</h6>
                             <h6>malikale@gmail.com</h6>
                             <br />
                             <div className="contactus-socials">
                                <div>
                                    <FontAwesomeIcon icon={faFacebook} className="contact-icon"/>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faInstagram} className="contact-icon"/>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faXTwitter} className="contact-icon"/>
                                </div>
                             </div>
                    </div>
                </div>
        </div>
        <div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1627.7034988535493!2d36.68081597496038!3d-1.270204218415575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1721380625787!5m2!1sen!2ske" style={{width: "100%", height:"500px", border: "0", marginTop: "10px"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <Footer/>
        </>
    )
}

export default ContactUs