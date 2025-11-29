import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LEN = 8

export const register = async (req, res) => {
  try{
    let {name, email, password, Registration_number, Department, College} = req.body;
    if(!name || !email || !password){
      return res.status(400).json({ error: 'Name, email and password are required' })
    }
    email = email.trim().toLowerCase()
    if(!EMAIL_REGEX.test(email)){
      return res.status(400).json({ error: 'Invalid email format' })
    }
    if(password.length < MIN_PASSWORD_LEN){
      return res.status(400).json({ error: `Password must be at least ${MIN_PASSWORD_LEN} characters` })
    }
    const exists = await prisma.user.findUnique({ where: { email } });
    if(exists) return res.status(409).json({error: 'Email already in use'});

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {name: name.trim(), email, password:hashed, status:'pending', Registration_number, Department, College },
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
  try {
    let { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ error: 'Email and password required' })
    email = email.trim().toLowerCase()
    const user = await prisma.user.findUnique({ where: { email } });
    // Generic message to avoid user enumeration
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    if (user.status !== 'approved') return res.status(403).json({ error: 'Account not approved yet' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    if(!process.env.JWT_SECRET){
      return res.status(500).json({ error: 'Server misconfiguration (JWT secret missing)' })
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ message: 'Login successful', token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};