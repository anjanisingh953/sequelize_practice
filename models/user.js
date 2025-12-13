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
        }

    },{
        tableName:'users'
    })
  return User;  
}
