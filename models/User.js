
module.exports = (sequelize,DataTypes) => {

    const User = sequelize.define('User',{

        name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        city: DataTypes.STRING,
        phone: DataTypes.STRING,

        
    });


    return User;

}