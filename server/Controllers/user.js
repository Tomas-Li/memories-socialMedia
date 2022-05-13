import mongoose from 'mongoose';
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials." });
    
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SALT,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: existingUser, token });
    
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong when trying to retrieve the user' });
  }
}

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).json({ message: "Email already on use." });

    if(password !== confirmPassword) return res.status(400).json({ message: "Passwords didn't match."});

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SALT,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result, token });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong when trying to create the user' });
  }
}