export default function validateLogin(values) {
  let errors = {}
  if(!values.email){
    errors.email = "Email required"
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
    errors.email = "invalid email address"
  }
  if(!values.password){
    errors.password = "Password Required"
  }else if(values.password.length < 6){
    errors.password = "Password Must be greater than 6 characters"
  }


  return errors
}