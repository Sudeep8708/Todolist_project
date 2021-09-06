
const express = require('express');
const server = express();
let bodyparser = require('body-parser');
server.use(bodyparser.urlencoded({ extended:false }));

server.set('view engine','ejs');

var db,collection;

//Connectinng to the DataBase//

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, (error,client) =>{

  if(error){
    return console.log("There was an error in connecting.." + error);
  }
   db = client.db('test2');
   collection = db.collection('todo');
  console.log("Connection Established !");
});

// General Route for the Fetching of Data whenever requested/

server.get('/', (req,res) =>{

  // Retrieving Data From the DB//
  var arr  =  collection.find({status:'pending'},{projection:{status:false,_id:false}}).toArray();

  arr.then( (mes) =>{
  var len = mes.length;
  res.render('todopage',{len:len,mes:mes});
  server.use( express.static('public'));
  res.end();
 }).catch( (err) =>{
   console.log("There is an error in retrieving the data from the db",err);
 });

});

// Inserting and Editing(Updation) the Task is Done Here !

server.post('/', (req,res) =>{


  if( (req.body.edittitle) && (req.body.editdesc))  //Checking does the user made an attempt to edit or to insert here..!
  {
    //This If Block is the space for Updating Task

    let query = { title:req.body.origtitle, description:req.body.origdesc };
    let updwith = { $set: { title:req.body.edittitle.trim(), description:req.body.editdesc.trim(), priority:req.body.imp } };

    collection.updateOne(query, updwith, (err,resp) =>{
      if(err){console.log("Sorry found some error in updating !",err)};
      console.log(resp);
      res.redirect('/');
    });
    
  }
  // This Else Block is the ppace for Inserting Task
else{
  collection.insertOne({priority:req.body.imp,title:req.body.title,description:req.body.task,status:'pending'}, (err,result) =>{
    if(err){
      return console.log("There was an error in inserting which says: ",err);
    }
    console.log(result);
    res.redirect('/');
  });
}
});

// Deleting  a Task
  server.get('/delete', (req,res) =>{

    let title = req.query.title;
  console.log("Oh this goes for the title name in mongo",title);
  console.log("Connection Established ! This is from the delete opeartion route !");
  const query = {title:title};
  collection.updateOne({$and:[query,{status:'pending'}]},{$set:{status:'done'}},(err,result) =>{
    if(err){
      return console.log("Sorry There is an error in updating",err);
    }
    console.log(result);
    res.redirect('/');
  })
});

// Sorting Out the List using Priorities

server.get('/sort', (req,res) =>{

  var arr_sorted  =  collection.find({status:'pending'},{projection:{status:false,_id:false}}).sort({priority:1}).toArray();
  arr_sorted.then( (mes) =>{
  let len = mes.length;
  res.render('todopage',{len:len,mes:mes});
  server.use( express.static(__dirname));
  res.end();
 }).catch( () =>{
   console.log("There is an error in retrieving the data and sorting out, from the db");
 });

});


server.listen(1000, () =>{
  console.log('Listening in the PORT:1000');
});


