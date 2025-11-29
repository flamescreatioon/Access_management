import 'dotenv/config'
import bcrypt from 'bcrypt'
import prisma from '../src/lib/prisma.js'

async function main(){
  const email = process.env.ADMIN_EMAIL || 'donflames2002@gmail.com'
  const name = process.env.ADMIN_NAME || 'Flames'
  const plain = process.env.ADMIN_PASSWORD || 'Ugo20022'

  const existing = await prisma.user.findUnique({ where:{ email } })
  if(existing){
    console.log(`Admin already exists: ${email}`)
    return
  }
  const hash = await bcrypt.hash(plain, 10)
  const user = await prisma.user.create({
    data:{ name, email, password: hash, role:'admin', status:'approved' }
  })
  console.log('Seeded admin user:')
  console.log({ email: user.email, password: plain })
  console.log('Store this password securely; change after first login.')
}

main().catch(e=>{ console.error(e); process.exit(1) }).finally(()=>prisma.$disconnect())
