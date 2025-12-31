const {QueryTypes,Op} = require('sequelize');
const db = require('../models/index');
const User = db.user;
const Contact = db.contact;
const Education = db.education;

const postUsers = async(req,res)=>{
    try {
     const postData = req.body;
    let data; 
    if(postData.length>1){
     data = await User.bulkCreate(postData);
    }else{
     data = await User.create(postData);
    }
    res.status(200).json(data)
    } catch (err) {
        let err_msg = ''
        err && err.errors.map((val)=>err_msg += val.message+'. ');
        res.status(200).json({err_msg});
    }
}


const getUsers = async(req,res)=>{
    const data = await User.findAll({
          where: {
    firstName: 'Roshni'
  }        
    });
    res.status(200).json(data)
}

const getUser = async(req,res)=>{
    const data = await User.findOne({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json(data)
}

const deleteAllUser = async(req,res)=>{
    const data = await User.truncate()
    res.status(200).json(data)
}

const deleteUser = async(req,res)=>{
    const data = await User.destroy({
        where:{
            id:req.params.id
        }
    });
    res.status(200).json(data)
}

const updateUser = async(req,res)=>{
    const patchData = req.body;
    const data = await User.update(patchData,{
        where:{
            id:req.params.id
        }
    });
    res.status(200).json(data)
}

const usersRawQuery = async(req,res)=>{
    const city = req.body.city || '';
    const lastName = req.body.lastName || '';
    const data = await db.sequelize.query('SELECT * FROM users WHERE city = :city OR lastName = :lastName ',
            {
              replacements: {city,lastName},
              model: User,
              type: QueryTypes.SELECT,
              
            }
    );

    res.status(200).json(data)

}

const oneToOneUser = async(req,res)=>{

  const data = await User.create({firstName:"Nidhi",lastName:"Sharma",email:"nidhi@gmail.com",age:"18"})
    if(data && data.id){
     await Contact.create({permanent_address:"West Bengal",current_address:"Jabalpur",
         UserId:data.id })
     }
 
    // const data = await Contact.findAll({
    //         attributes:['current_address'],
    //         include:[{model:User,attributes:['firstName']}]

    // });
 
    res.status(200).json({data})
}


const lazyLoadingUser = async(req,res)=>{
    const data = await User.findOne({where:{id:17}}); 
    const contactDetails = await data.getContact(); 
    res.status(200).json({data,contactDetails})
}

const eagerLoadingUser = async(req,res)=>{
    const data = await User.findAll({
        // attributes:['id','firstName'],
        include:[
           {
            model:Contact,
           },
           {
            model:Education
           }
    ]
    });
 
    res.status(200).json({data})
}

const creatorUser = async(req,res)=>{
 
    const data = await Contact.create({
        permanent_address:"Bihar",
        current_address:"Indore",
        User:{
            firstName:"Anjani",
            lastName:"Singh",
            email:"anjani123@gmail.com"
        }
    },{
        include:[db.contactUser]
    })

    res.status(200).json({data})
}

const scopesUser =  async(req,res)=>{
    //  User.addScope('checkVoter',{
    //     where:{age:{[Op.gt]:20}}
    //  })
     
     User.addScope('includeContact',{
        include:{
            model:Contact,
            attributes:['permanent_address']
        }
     })


      User.addScope('includeAttributes',{
           attributes:['firstName','email']
        })

     
    const data = await User.scope(['includeContact','includeAttributes']).findAll({});
    res.status(200).json({data})
}

module.exports = {
    postUsers,
    getUsers,
    getUser,
    deleteAllUser,
    deleteUser,
    updateUser,
    usersRawQuery,
    oneToOneUser,
    lazyLoadingUser,
    eagerLoadingUser,
    creatorUser,
    scopesUser
}