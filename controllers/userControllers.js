const {QueryTypes} = require('sequelize');
 const db = require('../models/index');
 const User = db.user;


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
        console.log('err>>>>>',err);
        
    }
}


const getUsers = async(req,res)=>{
    const data = await User.findAll({});
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
    const data = await db.sequelize.query('SELECT * FROM users WHERE city = ? OR lastName = ? ',
            {
              replacements: ['Indore','Gupta, Indian'],
              model: User,
              type: QueryTypes.SELECT,
            }
    );

    res.status(200).json(data)

}


module.exports = {
    postUsers,
    getUsers,
    getUser,
    deleteAllUser,
    deleteUser,
    updateUser,
    usersRawQuery
}