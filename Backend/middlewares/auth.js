const jwt = require('jsonwebtoken')

const auth = (req, res, next)=>{
    try {
        const acatoken = req.header("Authorization")
        if(!acatoken)return res.status(400).json({msg: "Invalid Authentication"})

        jwt.verify(acatoken, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
            if(err)return res.status(400).json({msg: "Invalid Authentication"})
            
            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}



module.exports = auth