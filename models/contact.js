module.exports = (sequelize,DataTypes)=>{
  sequelize.define('contact',{
        permanent_address:{
            type: DataTypes.STRING,
            allowNull : false
        },
        current_address:{
            type: DataTypes.STRING,
        }
  })
}