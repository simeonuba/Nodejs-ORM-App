const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await prisma.users.findMany({
            select:{
                id: true,
                name: true,
                email: true,
                phone_number: true,
    
            }
        })
        .then(allUsers => {
            return res.status(200).json( allUsers )
        })
        .catch((err) => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
}
// update user details 
exports.updateUser =  async (req, res, next) => {
    try {
        const {id} = req.params;
        const {email,password,...data} = req.body;
        const updatedUser = await prisma.users.update({
            where: {
              id:parseInt(id)
            },
            data: {
              ...data,
            }
        })

        return res.status(200).json({
            message: "updated",
            data:updatedUser
        });
      
    } catch (err) {
        return next(err);
        
    }
    
}