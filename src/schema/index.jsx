import * as yup from 'yup'

export const contactUsFormSchema = yup.object().shape({
    fullname: yup.string().required("Required").min(3),
    email: yup.string().email("Not a valid email").required("Required"),
    subject:  yup.string().required("Required"),
    message: yup.string().required("Required")
})

export const bookingFormSchema = yup.object().shape({
    fullname: yup.string().required("Required").min(3),
    email: yup.string().email("Not a valid email").required("Required"),
    country: yup.string().required("Required"),
    contactNumber: yup.string().min(10).required("Required"),
    adults: yup.number().min(1).max(15).required("Required"),
    children: yup.number().min(0).max(15).required("Required"), 
    subject:  yup.string().required("Required"),
    message: yup.string().required("Required")
})

export const loginFormSchema = yup.object().shape({
    username: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
    password: yup.string().required("Password is required"),
})


export const registerFormSchema = yup.object().shape({
    username: yup.string().required("Required").min(3, "Username must be at least 3 characters"),
    fullnames: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], "Password must match")
    .required("Required"),
})