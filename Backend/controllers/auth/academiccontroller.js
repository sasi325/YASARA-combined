const Academic = require('../../models/auth/academicuser')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')

const academiccontroller = {


    register: async(req,res)=>{
        try{
            const{afirstname,alastname,anic,aemail,amobile,agender,stream,arole,subject,apwd} = req.body;

            const nicrepeat = await Academic.findOne({anic})
            if(nicrepeat) return res.status(400).json({msg:"NIC you entered is already in use"})

            const mailrepeat = await Academic.findOne({aemail})
            if(mailrepeat) return res.status(400).json({msg:"Email you entered is already in use"})

            

            //encrypting
            const apwdhash = await bcrypt.hash(apwd,10)

            //registering
            const newAcademic = new Academic({
                afirstname,alastname,anic,aemail,amobile,agender,stream,arole,subject,apwd:apwdhash
            })
            res.json({msg:"Registered on system"}),
            
            
            //saving academic to Academics database
            await newAcademic.save()

            //JWts
            const acaaccesstoken = createAccessToken({id:newAcademic._id})
            const acarefreshtoken = createRefreshToken({id:newAcademic._id})

            res.cookie('acarefreshtoken', acarefreshtoken, {
                httpOnly: true, 
                path : '/academic/acarefresh_token'

            })
            res.json({acaaccesstoken})

        }catch(err){
            return res.status(500).json("error")
        }
        
    },


    login: async(req,res)=>{
        try{
            const{anic,apwd}= req.body;

            const nicfound = await Academic.findOne({anic})
            if(!nicfound) return res.status(400).json({msg:"Not found"})

            const ismatch = await bcrypt.compare(apwd, nicfound.apwd)
            if(!ismatch) return res.status(400).json({msg:"password does not match"})

            //password matches
            const acaaccesstoken = createAccessToken({id:nicfound._id})
            const acarefreshtoken = createRefreshToken({id:nicfound._id})

            res.cookie('acarefreshtoken', acarefreshtoken, {
                httpOnly: true, 
                path : '/academic/acarefresh_token'

            })
            res.json({acaaccesstoken})



        }catch{
            return res.status(500).json("error")
        }
    },


    logout: async(req, res)=>{
        try{
            res.clearCookie('acarefreshtoken', {path : '/academic/acarefresh_token'})
            return res.json({msg: "Logged out"})
        }catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


    acarefreshToken: (req,res)=>{
        try{
            const rf_token = req.cookies.acarefreshtoken;
            if(!rf_token) return res.status(400).json({msg: "s"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err,aca) => {
                
                if(err)return res.status(400).json({msg: "d"})

                const acaaccesstoken = createAccessToken({id: aca.id})

                res.json({acaaccesstoken})
            })
            

        }catch(err){
            return res.status(500).json("error")
        } 
        
    },
   
    getAca: async(req,res)=>{
        try {

            const user = await Academic.findById(req.user.id).select('-apwd')
            if(!user) return res.status(400).json({msg:"User not found"})
            res.json(user)
            
        } catch (err ) {
            return res.status(500).json({msg:err.message})
        }
    }
}

const createAccessToken = (aca)=>{
    return jwt.sign(aca, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (aca)=>{
    return jwt.sign(aca, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = academiccontroller