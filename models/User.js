const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Compare the password entered by user to the password in database
class User extends Model {
    checkPassword(password){
        return bcrypt.compareSync(password, this.password);
    }

}

// User model with username, email, hashed password and id. 
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }
)