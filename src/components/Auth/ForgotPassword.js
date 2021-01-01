import React from "react";
import { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext)
  const [resetPasswordEmail,setResetPasswordEmail] = React.useState("")
  const [isPasswordReset,setIsPasswordReset] = React.useState(false)
  const [passwordResetError,setPasswordResetError] = React.useState(null) 

  async function handleResetPassword(){
    try{
      await firebase.resetPassword(resetPasswordEmail)
      setIsPasswordReset(true)
      setPasswordResetError(null)
    }catch(error){
      console.error("error sending email",error)
      setPasswordResetError(error.message)
    }
  }
  return( 
  <div>
    <input
      type="email"
      className="input"
      placeholder="provideyour account email"
      onChange={event => setResetPasswordEmail(event.target.value)}
    />
    <div>
      <button className="button" onClick={handleResetPassword}>
        Reset Password
      </button>
    </div>
    {isPasswordReset && <p>Check email to Reset Password</p>}
    {passwordResetError && <p className="error-text">{passwordResetError}</p>}
  </div>
  )
}

export default ForgotPassword;
