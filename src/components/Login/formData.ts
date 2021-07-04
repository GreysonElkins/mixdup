import * as Yup from 'yup'

export const loginValidation = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

export const signUpValidation = Yup.object().shape({
  "email": Yup.string()
    .required('Please enter an email')
    .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
    'Please enter a valid email address'
    ),
  "username": Yup.string()
    .required('Please enter a username')
    .min(4, 'Your username is too short')
    .max(16, 'Your username is too long')
    .matches(/^[a-zA-Z0-9_.-]*$/, 'Only letters, numbers, and dashes please'),
  "firstName": Yup.string().max(20, "Your first name is too long"),
  "lastName": Yup.string().max(30, "Your last name is too long"),
  "password": Yup.string()
    .required('Please enter your password')
    .min(8, 'Your password should be longer than 8 characters')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Use one uppercase, one number and one special character"
    ),
  "verify": Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], "Your passwords don't match."),
  "staySignedIn": Yup.bool()
})

export const formRows = [
  {
    name: 'email',
    text: 'Email',
    type: 'text',
  },
  {
    name: 'username',
    text: 'Username',
    type: 'text',
    signUp: true,
  },
  {
    name: 'password',
    text: 'Password',
    type: 'password',
  },
  {
    name: 'verify',
    text: 'Verify Password',
    type: 'password',
    signUp: true,
  },
]