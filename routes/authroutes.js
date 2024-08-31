import express  from "express";
import {registerController,loginController } from "../controller/authcontroller.js";
 
 
 
const router = express.Router();
//register
router.post("/register",  registerController)
 
//login
router.post('/login', loginController);
export default  router;