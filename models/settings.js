const mongoose = require('mongoose');
var settingsSchema = mongoose.Schema({

    days: {
      type: Number,
      require: true
    },
    name: {
        type:String
    },
    open_time: {
        type:Date
      },
    close_time:{
        type:Date
    }
  
  },  {timestamps: true});
const Settings = mongoose.model("settings", settingsSchema);
module.exports = Settings