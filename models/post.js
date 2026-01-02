module.exports = (sequelize,DataTypes)=>{
  const Post = sequelize.define('post',{
        content: DataTypes.STRING,
      },{timestamps:false})
    return Post;  
}