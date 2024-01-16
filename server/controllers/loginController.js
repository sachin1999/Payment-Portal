import { User } from "../models/studentModel.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.CAPTCHA_SECRET_KEY;
export const login = async (req, res) => {
    try {
      const { applicationNo , captchaValue } = req.body;
      if (!applicationNo) {
        return res.status(400).json({
          success: false,
          message: "Please enter application no.",
        });
      }
  
      axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaValue}`).then( 
        async({data})=>{
          if(data.success){
            let existUser = await User.findOne({ "form.applicationNo": applicationNo });
              if (!existUser) {
                return res.status(200).json({
                  success: false,
                  message: "User not found",
                });
              } else {
                return res.status(200).json({
                  success: true,
                  message: "User found",
                });
              }
                  }
                  else{
                    res.status(400).json({
                      success:false,
                      message:"Captcha not verifed"
                    })
                  }
                }
      )
      
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in login",
      });
    }
  };
  export const details = async (req, res) => {
    try {
      // type here
      const { applicationNo } = req.body;
  
      let userData = await User.findOne({ "form.applicationNo": applicationNo });
  
      if (userData) {
        return res.status(200).json({
          success: true,
          userData,
        });
      } else {
        return res.status(500).json({
          error: "User Doesn't exist in database",
          message: error,
        });
      }
  
      // console.log(userData.form.name);
    } catch (error) {
      return res.status(500).json({
        error: "error while fetching details",
        message: error,
      });
    }
  };
  
  
