const express = require('express')
const app = express();
const cors=require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const server = require('http').createServer(app)
const socketio =require('socket.io');
const user=require('./routes/user')
const settings=require('./routes/setttings')
const requests=require('./routes/requests')
const Request=require('./models/request')
const io =socketio(server,{
    cors:{
        origin:'*',
    }
})
app.use(cors());
app.use(bodyParser.urlencoded({
    extended : true
  }))
app.use(bodyParser.json())

app.use('/',user)
app.use('/',settings)
app.use('/',requests)


io.on('connection', socket =>{
    // console.log('connection made successfully')
    socket.on('message',payload => {
        console.log('Message received on server: ', payload)
        io.emit('message',payload)
        const request = new Request(payload)
        request.save(err=>{
            if(err) console.log(err)
        })
    })
})
const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`Server is running at ${port}`)
})
mongoose.connect('mongodb+srv://demo:demo123@demo.nvwrp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex :true
})