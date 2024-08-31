import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];  
    if (!token) return res.status(401).json({ message: 'No token provided' });

    console.log('Token:', token);  
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decode);  

    req.user = await userModel.findById(decode._id);
    console.log('User:', req.user);  

    if (!req.user) return res.status(401).json({ message: 'User not found' });

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
