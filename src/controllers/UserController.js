const bcryptjs = require('bcryptjs')
const User = require('../models/User')

const register = async (req, res) => {
    try{
        const { name, email, password } = req.body
        const passwordCrypt = await bcryptjs.hash(password, 8)

        let user = new User({
            name,
            email,
            password: passwordCrypt
        })

        await user.save()

        res.status(201).send("User registered successfully")
    }catch(error){
        res.status(400).send(error)
    }   
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body
        const user = await User.findOne({ email })

        const isPasswordMatch = bcryptjs.compareSync(password, user.password)
        const isEmailMatch = email === user.email

        if(!isPasswordMatch || !isEmailMatch)
            throw new Error()

        res.status(200).json({ email })
    }catch(error){
        res.status(400).send("Verify your datas")
    }   
}


module.exports = {
    register,
    login
}