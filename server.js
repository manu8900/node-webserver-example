const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
app.set('viewengine','hbs');
hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper('getYear',() =>{
return new Date().getFullYear();
});
hbs.registerHelper('getheading',(text) =>{
    return text.toUpperCase();
})
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });
app.use((req,res,next) =>{
    var date=new Date().toString();
    var log =`${date}:,${req.method},${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n');
    next();
})
app.use(express.static(__dirname +'/public'));
app.get('/',(req,res) => {
 res.render('home.hbs',{
        pagetitle:'Home Page',
        heading:'Welcome to Home Page ',
        
    });
});
app.get('/about',(req,res) =>{
res.render('about.hbs',{
    pagetitle:'About page',
   

});
});

app.get('/bad',(req,res) =>{
    res.send({
        status:'Error 404',
        Message:'Bad Request'
    });
});
app.listen(3000,()=>{
    console.log('server is running at port 3000');
});