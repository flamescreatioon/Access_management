import prisma  from "../lib/prisma.js"
import crypto from 'crypto'
import QRCode from 'qrcode'

const generateCode = () => crypto.randomBytes(4).toString('hex');

export const generateTextCode = async (req, res) => {
    try{
        /* const {userId} = req.user.id; */
        const code = generateCode();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

        const entry = await prisma.qRCode.create({
            data: {
                /* userId, */
                code, 
                type: 'TEXT',
                expiresAt
            }
        })

        res.json({message: 'Code generated', code: entry.code, expiresAt});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const generateQR = async (req, res) => {
  try {
    /* const userId = req.user.id */
    
    const code = generateCode()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    const entry = await prisma.accessCode.create({
      data: {
        /* userId, */
        code,
        type: 'QR',
        expiresAt
      }
    })

    const qr = await QRCode.toDataURL(code)

    res.json({ message: 'QR generated', qr, expiresAt })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const checkIn = async (req, res) => {
  try {
    const { code } = req.body

    const entry = await prisma.qRCode.findUnique({ where: { code } })

    if (!entry) return res.status(404).json({ error: 'Invalid code' })
    if (entry.used) return res.status(400).json({ error: 'Code already used' })
    if (new Date() > entry.expiresAt)
      return res.status(400).json({ error: 'Code expired' })

    const user = await prisma.user.findUnique({ where: { id: entry.userId } })
    if (!user.approved)
      return res.status(403).json({ error: 'User not approved' })

    // Mark code as used
    await prisma.qRCode.update({
      where: { id: entry.id },
      data: { used: true }
    })

    // Create access log
    await prisma.accessLog.create({
      data: {
        userId: entry.userId,
        method: entry.type
      }
    })

    res.json({ message: 'Check-in successful', user: user.email })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
