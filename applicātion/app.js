const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var enteries=require('./models/content.js');
var message="";
const reg = require('./routes/auth.js');
app.use('/',reg );
app.get('/',(req,res)=>
{
    enteries.find(function(err,result)
    {
        if(err)
        console.log(err);
        else
        res.render("home.ejs",{items:result});
    });
   
});
app.get('/admin',(req,res)=>
{
   
    enteries.find(function(err,result)
    {
        if(err)
        console.log(err);
        else
        res.render("admin.ejs",{items:result,message:message});
    });
    
});

app.post('/add',(req,res)=>
{
var titlename=req.body.title;
 var desc= req.body.des;
 var price=req.body.price;
 let added= new enteries({
  title:titlename,
  description:desc,
  price:price
 });

 added.save()
 .then(doc => {
  message="Item added successfully";
 })
 .catch(err => {
   console.error(err)
 })
  res.redirect('/admin');
 
});
app.post('/delete/:id',(req,res)=>
{
    enteries.findByIdAndRemove(req.params.id, function(err){
        if(err){
            message="error";
            res.redirect("/admin");
        } else {
            message="deletion successfull"
            res.redirect("/admin");
        }
     });
}
);
app.get('/edit/:id',(req,res)=>
{
    enteries.find({ id: req.params.id}, function (err, docs) {
        if (err){
            console.log("error found");
        }
        else{
            console.log(docs);
          res.render('edit.ejs',{item:docs});
        }
    })
}
);
app.post('/edit/:id',(req,res)=>
{
    var titlename=req.body.title;
 var desc= req.body.des;
 var price=req.body.price;  
 const filter = { id:req.params.id};
const update = {title:titlename,description: desc,price:price };
const opts = { new: true };
let doc = enteries.findOneAndUpdate(filter, update,opts);
message="updated successfully";
res.redirect('/admin');

// `doc` is the document _before_ `update` was applied

}
);

app.post('/search',(req,res)=>
{ 
   var title=req.body.box;
    enteries.find({title:title},function(err,result)
    {
        if(err)
       { message="item not exists";
        res.redirect('/admin');}
        else
        res.render("admin.ejs",{message:"search result",items:result});
    });
    
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
  