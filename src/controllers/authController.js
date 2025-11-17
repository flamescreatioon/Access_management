import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try{
    const {name, email, password, Registration_number, Department, College} = req.body;
    const exists = await prisma.user.findUnique({ where: { email } });
    if(exists) return res.status(400).json({error: 'User with this email already exists'});


    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {name, email, password:hashed, status:'pending', Registration_number, Department, College },
    });

    res.status(201).json({
      message: 'Signup successful, pending approval', 
      user: { id: user.id, name: user.name, email: user.email, status: user.status }
    });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try{
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if(!user) return res.status(404).json({error: 'User not found'});
    if(!user.approved) return res.status(403).json({error: 'Account not approved yet, Meet the admins to activate your account'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(401).json({error: 'Invalid credentials'});

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ message: 'Login successful', token });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};