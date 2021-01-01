export default function validateCreateLink(values){
  let errors = {}

  //Description errors
  if(!values.description){
    errors.description = "description required"
  }else if(values.description.length < 10){
    errors.description = "Desription must be atleast 10 characters"
  }

  //URL errors
  if(!values.url){
    errors.url = "provide a URL"
  }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)){
    errors.password = "URL must be valid"
  }


  return errors
}


 
  