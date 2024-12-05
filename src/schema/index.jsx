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
    contactNumber: yup.string().required("Required").matches(
        /^\+?\d{7,15}$/,
        "Required with 7-15 digits."
      ),
    adults: yup.number().min(1).max(15).required("Required"),
    children: yup.number().min(0).max(15).required("Required"), 
    subject:  yup.string().required("Required"),
    message: yup.string().required("Required"),
    bookingDate: yup.date().required('Please select a booking date')
})

export const loginFormSchema = yup.object().shape({
    identifier: yup
        .string()
        .required("Username or email is required")
        .min(3, "Must be at least 3 characters") // Updated message for consistency
        .test('is-valid-identifier', 'Must be a valid username or email', value => {
            return value && (value.includes('@') ? /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value): value.length >= 3);
        }),
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