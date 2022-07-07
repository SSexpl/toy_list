var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/toys', {useNewUrlParser: true});

var userSchema = new mongoose.Schema({
            name: 
                {type:String,
                required:true
                },
            password:
            {type:String,
                required:true
                },
            email : 
             {type:String,
                required:true
                }
        });
 
var userModel=mongoose.model('user',userSchema);
 
module.exports =userModel;