import React from "react";
import useFormValidation from './useFormValidation'
import validateLogin from './validateLogin'
import firebase from '../../firebase'
import { Link } from 'react-router-dom'

const INITIAL_STATE = {
  name: "",
  email:"",
  password:""
}
 
function Login(props) {
  const {handleChange,
     handleBlurr, 
     errors, 
     handleSubmit, 
     values, 
     isSubmitting} = useFormValidation(INITIAL_STATE,validateLogin,authenticateUser)
  const [login, setLogin]=React.useState(true)
  const [firebaseError, setFirebaseError] = React.useState(null) 
  
  async function authenticateUser(){
    const { name, email, password } = values
    try{
      login?
            await firebase.login(email,password)
            :await firebase.register(name,email,password);
            props.history.push('/');
    }catch(error){
          console.error("Authentication Error", error)
          setFirebaseError(error.message )
    }
  } 
  
  return(
  <div>
    <h2 className="mv3">{login ? "Login":"Create Account"}</h2>
    <form onSubmit={handleSubmit} className="flex flex-column">

        {!login&&<input type="text" 
        onBlur={handleBlurr}
        onChange={handleChange} 
        name="name" 
        value={values.name} 
        className={errors.name && "error-input"}
        placeholder="Your Name" 
        autoComplete="off" />}

        <input type="email" 
        onBlur={handleBlurr}
        onChange={handleChange} 
        name= "email" 
        value={values.email} 
        placeholder="Your E-mail" 
        autoComplete="off" />
      {errors.email && <p className="error-text">{errors.email}</p>}

        <input type="password" 
        onBlur={handleBlurr}
        onChange={handleChange} 
        name="password" 
        value={values.password} 
        className={errors.password && "error-input"}
        placeholder="Choose a secure Password" autoComplete="off" />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}

      <div className="flex mt-3">
        <button type="submit" className="button pointer mr2" disabled = {isSubmitting} style={{ background: isSubmitting ? "red" : 'green'}}>
          Submit
        </button>
        <button type="button" className="pointer button" onClick={()=>setLogin(prevLogin => !prevLogin)}>
          {login? "Signup":"Already have an Account?"}  
        </button>
      </div>
    </form>
    <div className="forgot-password">
      <Link to="/forgot">Forgot Password?</Link>

    </div>
  </div>)
}

export default Login;
