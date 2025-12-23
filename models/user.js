module.exports = (sequelize,DataTypes)=>{
 const User =   sequelize.define('User',{
     firstName:{type: DataTypes.STRING,allowNull : false},
     lastName:{type: DataTypes.STRING,allowNull : false},
        email:{type:DataTypes.STRING,unique:true,
         validate:{ isEmail:{msg:'Plz provide a valid email'} }
        },
        age:{type:DataTypes.INTEGER,
         validate:{
          min:{args:18,msg:'Age should be minimum 18'}  
        }
      },
        city:{type:DataTypes.STRING,allowNull:false,
             validate: {
                isIn: {
                  args: [['Indore', 'Bhopal', 'Jabalpur', 'Delhi']],
                  msg: 'City name must be Indore, Bhopal, Jabalpur or Delhi'
               }
             }
        }
    },{
        tableName:'users',
        paranoid: true,
    })
  return User;  
}
