import  { useState } from 'react'
import "./Login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
const Login = () => {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const [applicationNo, setApplicationNo] = useState("");
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true);
  }
  function handleSubmit(){
    axios
    .post("https://payment-backend-mw11.onrender.com/api/login", {
      applicationNo
    })
    .then((response) => {
      if (response.data.success === true) {
        // user found
        navigate(`/feepayment/?applicationNo=${applicationNo}`);
      } else {
        // user not found
        alert("User not found");
      }
    });
  }
  return (
    <div className='page'>
      <h1 className='header'>Welcome</h1>
      <div className='cover'>
        <h1>Enter Application no. to continue</h1>
        <input type='text' id="applicationNo" value={applicationNo} 
        placeholder='Application No' 
        onChange={(e) => setApplicationNo(e.target.value)}/>
        <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={onChange}
        />
        <button className='login-btn' disabled={!verified} onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default Login