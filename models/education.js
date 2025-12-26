module.exports = (sequelize,DataTypes)=>{
  const Education = sequelize.define('Education',{
        
        className:{type: DataTypes.STRING},
        grade:{type: DataTypes.STRING},
        passing_year:{type: DataTypes.INTEGER}

  },{timestamps:false})
    return Education;  
}