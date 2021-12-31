//Part#1 point1,changed main as app.js in package.json
const express = require('express'); 
const path = require ('path'); 
const bodyparser = require('body-parser');//part#1 point2
const cors = require('cors');


const nav = require('./src/data/nav');//part#2 point6
const loginRouter = require('./src/routes/loginroute');
const signupRouter = require('./src/routes/signuproute');
const homeRouter = require('./src/routes/homerouter')(nav);//Part #1 Point3
const booksRouter = require('./src/routes/booksroute')(nav);//nav passing
const authorsRouter = require('./src/routes/authorsroute')(nav);//nav passing

const app = new express; 


app.set('views','./src/views'); 
app.set('view engine','ejs'); 


app.use(cors()); //Part#2 Point7
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname , '/public'))); 

app.use('/login',loginRouter); 
app.use('/signup',signupRouter); 
app.use('/home',homeRouter); 
app.use('/books',booksRouter); 
app.use('/authors',authorsRouter); 



app.get('/',function(req,res){

    res.render('index',{nav});//part#2 point6
    
});





app.listen(process.env.PORT||5000,()=>{
    console.log("Server Ready on 5000");//Part #1 Point5
});