const sequelize = require('../db')
const {DataTypes} =require('sequelize')

const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    email:{type:DataTypes.STRING, unique:true},
    password:{type:DataTypes.STRING},
    role:{type: DataTypes.STRING, defaultValue:'USER'}
})

const Basket = sequelize.define('basket',{
    id:{type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true}
})

const Basket_Device = sequelize.define('basket_device',{
    id:{type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true}
})

const Device = sequelize.define('device',{
    id:{type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    name:{type:DataTypes.STRING,unique:true,allowNull:false},
    price:{type:DataTypes.INTEGER,allowNull:false},
    rating:{type:DataTypes.INTEGER, defaultValue: 0},
    img:{type:DataTypes.STRING, allowNull:false}
})

const Device_info = sequelize.define('device_info',{
    id:{type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    title:{type:DataTypes.STRING,allowNull:false},
    description:{type: DataTypes.STRING,allowNull:false}
})

const Type = sequelize.define('type',{
    id:{type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    name:{type:DataTypes.STRING,unique:true, allowNull:false}
})

const Brand = sequelize.define('brand',{
    id:{type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    name:{type:DataTypes.STRING,unique:true, allowNull:false}
})

const Rating = sequelize.define('rating',{
    id:{type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true},
    rate:{type:DataTypes.INTEGER,allowNull:false}
})

const TypeBrand = sequelize.define('type_brand',{
    id:{type:DataTypes.INTEGER,primaryKey: true, autoIncrement: true}
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(Basket_Device)
Basket_Device.belongsTo(Basket)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Type.hasMany(Device)
Device.belongsTo(Type)

Device.hasMany(Device_info, {as:'info'})
Device_info.belongsTo(Device)

Device.hasMany(Basket_Device)
Basket_Device.belongsTo(Device)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Type.belongsToMany(Brand, {through:TypeBrand})
Brand.belongsToMany(Type, {through:TypeBrand})

module.exports = {
    User, Basket, Device, Rating, Type, Brand, TypeBrand, Device_info, Basket_Device
}