 const express= require('express');
 const path = require('path');
 const port = 8001;

 const db = require('./config/mongoose');
 const Contact = require('./models/contact_list');
 const app = express();


 app.set('view engine','ejs');
  app.set('views',path.join(__dirname,'views'));
 
  app.use(express.urlencoded());
  app.use(express.static('assets'));
  var contactList =[
    {
        name: "Dipanshu",
        phone: "111111111"
    },
    {
        name: "Iron man",
        phone: "222222222"
    },
    {
        name:"spider man",
        phone:"3333333333"
    },
  ]

  app.get('/',function(req,res){
   // console.log(__dirname);
    //res.send('<h1>Cool ,it is running! or is it?</h1>');
    Contact.find({},function(err,contacts){
    
    if(err){
        console.log('Error in Fetching contacts from db');
        return;
    }

    return res.render('practice',{
        title: "Contact  List",
    contact_list: contacts
    });
 });
});

 app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "Let us play with ejs"
    });
 });


 app.post('/create-contact',function(req,res){
 //  console.log(req.body);
   // return res.redirect('/practice');
//    contactList.push({
//     name: req.body.name,
//     phone: req.body.phone
//    });

  //contactList.push(req.body);

   Contact.create({
    name: req.body.name,
    phone: req.body.phone
   },function(err,newContact){
    if(err){console.log('error in creating a contact');
return;}

console.log('*****',newContact);
return res.redirect('back');
   });

 //return res.redirect('back');
});

app.get('/delete-contact/',function(req,res){
   // console.log(req.query);
    let id =req.query.id;

   Contact.findByIdAndDelete(id,function(err){
    if(err){
        console.log('error in deleting from db');
        return ;
    }
    return res.redirect('back');

});
});

// app.use('/api/stuff', (req, res, next) => {
//     Thing.find().then(
//       (things) => {
//         res.status(200).json(things);
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   });

app.get('/search/', (req, res, next) => {
    Contact.findOne({
      name: req.query.name
    }).then(
      (thing) => {
        console.log('mil gyaa')
      return  res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });


 app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('Yup! My Expess server is running on port:',port);
 });

