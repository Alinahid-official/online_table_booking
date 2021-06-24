const express = require('express')
const router = new express.Router()
const Settings= require('../models/settings')

router.post('/settings',(req,res)=>{
    let values =req.body
    Settings.findOneAndUpdate({name:'settings'},values,(err)=>{
        if(err)console.log(err)
        else res.status(200).json({msg:'ok'})
    })
})
router.get('/settings',(req,res)=>{
    Settings.findOne({name:'settings'},(err,user)=>{
        if(err)console.log(err)
        else res.status(200).json(user)
    })
})
module.exports = router;