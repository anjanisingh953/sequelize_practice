module.exports = (sequelize,DataTypes)=>{
  const Reaction = sequelize.define('reaction',{
        type:DataTypes.STRING,
  },{timestamps:false})
    return Reaction;  
}