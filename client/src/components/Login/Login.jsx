import  { useRef, useState } from 'react'
import "./Login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
const Login = () => {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const [applicationNo, setApplicationNo] = useState("");
  const [captchaValue,setCaptchaValue] = useState("");
  const captchaRef = useRef();
  function onChange(value) {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
    setVerified(true);
  }
  function handleSubmit(){
    captchaRef.current.reset();
    axios
    .post("http://localhost:4000/api/login", {
      applicationNo,captchaValue
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
        onChange={(e) => setApplicationNo(e.target.value)} required/>
        <ReCAPTCHA
        sitekey="6LfudFIpAAAAAJe4CeinDs_rCuj9tz3-x7kUSxXw"
        onChange={onChange}
        ref = {captchaRef}
        />
        <button className='login-btn' disabled={!verified} onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default Login
