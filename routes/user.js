const express = require('express')
const router = new express.Router()
const jwt =require('jsonwebtoken')
const User =require('../models/user')
router.post('/adduser',(req,res)=>{
    let data=req.body;
    const user =new User(data)
    user.save(err=>{
        if(err)console.log(err)
        else res.json({msg:'ok'})
    })
} )
router.post('/signIn',(req,res)=>{
    const {email} = req.body;
   User.findOne({email:email},(err,user)=>{
        if(user){
            const payload = {user};
                jwt.sign(payload, 'secret', {
                    expiresIn: 3600
                }, (err, token) => {
                     if(err) console.error('There is some error in token', err);
                     else {
                         res.json({
                             type:'success',
                             token: `Bearer ${token}`,
                             msg:'Login Succes'
                         });
                     }
                });
            }
        
    })

})
router.post('/checkEmail',(req,res)=>{
    const {email} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(!user){
           res.json({email:false})
        }else(res.json({email:true}))
    })
})
router.post('/checkPassword',(req,res)=>{
    const {email, password} = req.body;
User.findOne({email:email},(err,user)=>{
        if(user.password!=password){
            res.json({password:false})
        }else{
            res.json({password:true})
        }
    })

})
module.exports = router;