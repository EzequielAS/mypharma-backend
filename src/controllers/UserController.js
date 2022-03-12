
const User = require('../models/User')


const getAllUsers = async (req, res) =>{
    try{
        let doc = await User.find({})

        res.send(doc)
    }catch(error){
        res.send("Cannot find User")
    }   

}


module.exports = {
    getAllUsers,
}