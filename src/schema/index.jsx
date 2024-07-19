import * as yup from 'yup'

export const contactUsFormSchema = yup.object().shape({
    fullname: yup.string().required("Required").min(3),
    email: yup.string().email("Not a valid email").required("Required"),
    subject:  yup.string().required("Required"),
    message: yup.string().required("Required")
})