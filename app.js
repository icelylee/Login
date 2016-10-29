var express = require('express');
var path = require('path');
var app =express();
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('.html',require('ejs').__express);
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx'
}));
function checkLogin(req,res,next){
    if(req.session.username){
        next();
    }else{
        res.redirect('/login');
    }
}
app.get('/login',function(req,res){
    res.render('login');
});
app.post('/login',function(req,res){
    var user = req.body;//得到bodyParser传递给我们的请求体
    if(user.username == user.password){
        req.session.username = user.username;//把用户名写入session
        res.redirect('/user');//请客户端向新的路径发起请求
    }
});
app.get('/user',checkLogin,function(req,res){
    res.render('user',{username:req.session.username});
});
app.listen(9090);