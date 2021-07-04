import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { signIn } from 'scripts'

import { loginValidation, signUpValidation, formRows } from './formData'
import './Login.scss'

const LoginSignUpForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  
  const autoCompleteValue = (fieldName: string) => {
    switch (fieldName) {
      case 'email':
      case 'username':
        return fieldName
      case 'password':
        return isSignUp ? 'new-password' : 'current-password'
    }
  }

  const printFormRows = (errors: any, touched: any) => {
    const rows = isSignUp ? formRows : formRows.filter((row) => !row.signUp)
    return rows.map(({ name, text, type }) => {
      return (
        <div key={`${name}-${text}-${type}`} className="sign-in-row">
          <Field 
            name={name} 
            type={type} 
            placeholder={text} 
            className="sign-in-field" 
            autoComplete={autoCompleteValue(name)}
          />
          <div className="form-error">{errors[name] && touched[name] && errors[name]}</div>
        </div>
      )
    })
  }

  return (
    <Formik
      initialValues={{ email: '', password: '', username: '', staySignedIn: true }}
      validationSchema={isSignUp ? signUpValidation : loginValidation}
      onSubmit={({ email, password, username }) => signIn({ email, username, password, isSignUp })
      }
    >
      {({ errors, touched }) => (
        <Form className="SignIn">
          {printFormRows(errors, touched)}
          <div className="sign-in-buttons">
            <button type="submit" className="cta-1">
              {isSignUp ? 'Sign Up' : 'Login'}
            </button>
            <button
              className="cta-4"
              type="button"
              onClick={() => setIsSignUp((prev: boolean) => !prev)}
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LoginSignUpForm
