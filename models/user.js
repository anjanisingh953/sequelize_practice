module.exports = (sequelize,DataTypes)=>{
 const User =   sequelize.define('User',{
        firstName:{
            type: DataTypes.STRING,
            allowNull : false,
            get() {
            const rawValue = this.getDataValue('firstName');
            return rawValue ? rawValue.toUpperCase() : null;
            }

        },
        lastName:{
            type: DataTypes.STRING,
            set(value) {
              this.setDataValue('lastName', value + ', Indian');
            }
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            },
            set(value) {
               throw new Error('Do not try to set the `fullName` value!');
            }
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            validate:{
                isEmail: {msg:'Please enter a valid email'}
            }
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false,
             validate: {
                isIn: {
                  args: [['Indore', 'Bhopal', 'Jabalpur', 'Delhi']],
                  msg: 'Must be Indore, Bhopal, Jabalpur or Delhi'
               }
             }
        }
    },{
        tableName:'users'
    })
  return User;  
}
