module.exports = (sequelize,DataTypes)=>{
 const User =   sequelize.define('User',{
        firstName:{
            type: DataTypes.STRING,
            allowNull : false
        },
        lastName:{
            type: DataTypes.STRING,
        }

    },{
        tableName:'users'
    })
  return User;  
}
