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
    children: yup.number().min(1).max(15).required("Required"), 
    subject:  yup.string().required("Required"),
    message: yup.string().required("Required")
})