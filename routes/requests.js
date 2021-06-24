const express = require('express')
const router = new express.Router()
const nodemailer = require('nodemailer');
const Request =require('../models/request')

router.get('/requests',(req, res)=>{
    Request.find({},(err,users)=>{
        if(err)res.json({msg:'error'})
        else res.status(200).json(users)
    })
})
router.get('/accept/:id',(req, res)=>{
    const id =req.params.id
    Request.findOneAndUpdate({_id:id},{accept:true},(err,user)=>{
        if(err)console.log(err)
        else {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "dpspakurweb@gmail.com",
                    pass: "Dps@887711",
                },
            });
            const email =user.email
            const mailOptions = {
                from: '"Auth Admin" <dpspakurweb@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Booking Confirmation", // Subject line
                html: `<h1> Your tablehas been booked`, // html body
             };
             transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                   res.status(200).json({msg:'success'})
                }
             })
        }
    })
})
router.get('/reject/:id',(req, res)=>{
    const id =req.params.id
    Request.findOneAndUpdate({_id:id},{reject:true},(err,user)=>{
        if(err)console.log(err)
        else {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "dpspakurweb@gmail.com",
                    pass: "Dps@887711",
                },
            });
            const email =user.email
            const mailOptions = {
                from: '"Auth Admin" <dpspakurweb@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Booking Confirmation", // Subject line
                html: `<h1> Sorry all tables are booked please try for any other timing`, // html body
             };
             transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                   res.status(200).json({msg:'success'})
                }
             })
        }
    })
})
module.exports = router;