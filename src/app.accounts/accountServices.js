const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



      index  = async (data) => {
   
          // 
          const {email} = data;
          const userInfo = await prisma.users.findUnique({
                where: { email: data.email},
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone_number: true
                        }
                            
            
        
        });
          return historydata;
        
      }

      allaccounts = async () =>{
        
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
            });
            
      
    }
      createData =  async (data)=>{
          
        const createtransaction = await prisma.transactions.create({
             data: data
        })
        
        
   

      }


module.exports = {createData,index};