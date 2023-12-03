import { User } from "../models/studentModel.js";
export const login = async (req, res) => {
    try {
      const { applicationNo } = req.body;
      if (!applicationNo) {
        return res.status(400).json({
          success: false,
          message: "Please enter application no.",
        });
      }
  
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
  
  