var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/toys', {useNewUrlParser: true});

var tSchema = new mongoose.Schema({
            title: 
                {type:String,
                required:true
                },
            description:
            {type:String,
                required:true
                },
            price:
            {
              type:String,
              required:true
            }
        });
 
var content =mongoose.model('content',tSchema);
 
module.exports =content;