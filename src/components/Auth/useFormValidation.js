import React from "react"
import {authenticateUser} from "./Login"

function useFormValidation(initialState,validate,authenticate) {
  const [values,setValues] = React.useState(initialState)
  const [errors,setErrors] = React.useState({})
  const [isSubmitting,setSubmitting] = React.useState(false)
  React.useEffect(()=> {
    if(isSubmitting){
      const noErrors = Object.keys(errors).length === 0
      if(noErrors){
        authenticate()
        setSubmitting(false)
      }else{
        setSubmitting(false)
      }
    }
  },[errors])
  function handleChange(event){
    event.persist()
     setValues(previousValues => ({
      ...previousValues,
      [event.target.name]:event.target.value
    }))
  }
function handleBlurr(){
  const validationErrors = validate(values)
  setErrors(validationErrors)
}

  function handleSubmit(event){
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setSubmitting(true)
  }
  return {handleChange, handleBlurr, errors, handleSubmit, values, isSubmitting}
}

export default useFormValidation;
