const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



      index  = async (data) => {
   
          // 
          const {id} = parseInt(data);
         const historydata = await prisma.transactions.findMany({
              where: {
                  user_id: id,
              },
              select: {
                  trans_id: true,
                  type: true,
                  amount: true,
                  status: true,
                  updateAt: true
              }
          })
          return historydata;
        
      }
      createData =  async (data)=>{
          
        const createtransaction = await prisma.transactions.create({
             data: data
        })
        
        
   

      }


module.exports = {createData,index};