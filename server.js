const express= require ('express');
const fs = require('fs');
const hbs= require('hbs');
const port=process.env.PORT || 3000 ;
// var sphp= require('sphp');
// var execPhp= require(__dirname+'/cosmetic/main_project/index.php')
var app= express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs);
// app.use(sphp.express('/cosmetic/main_project/index.php'));
app.use((req, res , next)=>{
    var now= new Date().toString();
var log =`${now}:${req.method}${req.url}`
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if (err){
console.log('Unable to append tp server.log');
        }
    });
next();
});
// app.use((req, res, next)=>{
//     res.render('maintain.hbs');
// });
// app.use('*.php',function(request,response,next) {
// 	execPHP.parseFile(request.originalUrl,function(phpResult) {
// 		response.write(phpResult);
// 		response.end();
// 	});
// });

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getcurrentYear',()=>
{
     return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
});

app.get('/',(req,res)=>{
// res.send('<h1>hello</h1>');
// res.send({
// name:'raygon',
// likes: [
//     'coffee',
//     'comedy',
//     'songs'
// ]});
res.render('root.hbs',{
    pageTitle:'Home page',
    haha: 'i want this to be displayed',
   
});
});
app.get('/about',(req,res)=>{
res.render('about.hbs',{
    pageTitle: 'About page',
   
    
});
});
app.get('/projects',(req, res)=>{
res.render('projects.hbs',{
    pageTitle: 'Projects'
});
});
app.get('/bad',(req,res)=>{
    res.send({
        error: '404 not found' 
    });
});
app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});
