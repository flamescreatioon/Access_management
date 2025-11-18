import prisma from '../lib/prisma.js'

export const getPendingUsers = async(req, res) =>{
    try {
        const users = await prisma.user.findMany({
            where: {status: 'pending'},
            select: {id: true, name: true, email: true, role: true, created_at:true}
        });

        res.json({ count: users.length, users });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const approveUser = async(req, res) =>{
   try {
     const {userId} = req.params;
     const user = await prisma.user.update({
        where: {id: userId},
        data: {status: 'approved'}
     })

     res.json({message: `User ${user.name} approved successfully.`});
   } catch (error) {
    res.status(500).json({error: error.message});
   }
}

export const rejectUser = async(req, res) =>{
    try {
      const {userId} = req.params;
      const user = await prisma.user.update({
         where: {id: userId},
         data: {status: 'rejected'}
      })
 
      res.json({message: `User ${user.name} rejected successfully.`});
    } catch (error) {
     res.status(500).json({error: error.message});
    }
 }