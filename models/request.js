const mongoose = require('mongoose');
var requestSchema = mongoose.Schema({

    email: {
      type: String,
      require: true
    },
    name: {
        type: String,
        require: true
      },
    accept:{
        type:Boolean,
        default:false
    },
    reject:{
        type:Boolean,
        default:false
    },
    date:{
        type: String
    },
  
  },  {timestamps: true});
const Request = mongoose.model("request", requestSchema);
module.exports = Request