var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var Crypto = require('crypto');
var uuid = require('uuid');

var mongoose = require('mongoose');
var User = require('../model/User');
var signin = require('../model/signup');
var udata = require('../model/upload_data');

var nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/register',
async (req, res) => {
  try {
    const {
      name,
      username,
      birthday,
      gender,
      email,
      password,
      confirmpass,
    } = req.body;
    const user = await signin.findOne({
      username,
    });
    if (user) {
      return res.status(400).json({
        message: '重複註冊，請聯絡管理員',
      });
    }
    const passwordCryp = Crypto.createHash('sha1').update(password).digest('hex');// 使用sha1算法加密
    const newUser = {
      name,
      username,
      birthday,
      gender,
      email,
      password: passwordCryp,
    };
    const newuser = new signin(newUser);
    await newuser.save();
    return res.redirect('/');
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
})

router.post('/',
async (req, res) => {
  try {
    const {
      username,
      password,
    } = req.body;
    const passwordCryp = Crypto.createHash('sha1').update(password).digest('hex');// 加密密碼
    const user = await signin.findOne({
      username,
    });// 根據用戶名找人
    if (!user) { // 如果資料庫沒有該用戶
      return res.redirect('/e');  //res.status(400).json({ message: '還沒註冊哦!',});
    }
    if (user.password !== passwordCryp) { // 如果密碼錯誤
      return res.redirect('/e') //res.status(400).json({ message: '密碼錯誤，請重新輸入',});
    }else{
      //取得token並用網址方式丟到第二頁面判斷
      //https://ithelp.ithome.com.tw/articles/10190254
      
      const tokenstr = uuid.v4();// 隨機標示id
      const token = Crypto.createHash('sha1').update(tokenstr).digest('hex');// 加密隨機標示id
      if(username == "admin"){ 
        return res.redirect('/nurse?' + username + '&' + token)
      }else{
        return res.redirect('/main?' + username + '&' + token)
      }
    }

    
    
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

router.get('/register', function(req, res, next){
  res.render('register');
})

router.get('/forget_pwd', function(req, res, next){
  res.render('forget_pwd');
})

router.get('/select', function(req, res, next){
  res.render('select')
})

router.get('/blu', function(req, res, next){
  res.render('blu')
})

router.get('/blu2', function(req, res, next){
  res.render('blu2')
})

router.get('/fall', function(req, res, next){
  res.render('fall')
})

router.post('/fall',async(req,res)=>{
  try{
    const {
      userid,
      log,
      num,
      danger,
    } = req.body;
    console.log(userid,log,num,danger)
    const uploa = {
      userid,
      log,
      num,
      danger,
    };
    const uploaData = new udata(uploa);
    await uploaData.save().exec();
    console.log("上傳完成")

    if(danger == 1){
      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
          user: "",
          pass: "",
        },
      });

      const database = signin.find(userid)
      const usersmail = database.select('email').exec();

      let info = await transporter.sendMail({
        from: '"吳亦超老師實驗室" <>', // sender address
        to: usersmail, // list of receivers
        subject: "警告⚠️", // Subject line
        text: "疑似發生跌倒，請盡快確認", // plain text body
        html: "<b>疑似發生跌倒，請盡快確認</b>", // html body
      });
    }
      
    
  }catch(e){

  }
})

router.get('/nurse', function(req, res, next){
  res.render('nurse')
})

router.post('/nurse', async(req, res)=>{
  try{
    const num = req.body
    if(num == 1){
      //調用server data
      const users = await signin.find({}).select({username:1 ,_id:0}).exec()
      //const users = await signin.find({}).exec()
      console.log(users)
      var JSONdata = JSON.stringify(users);
      res.send(JSONdata)
    }else if(num == 2){
      //尋找data
      const{
        username1,
      } = req.body;
      
      const userSearch = await udata.find({userid:username1}).exec()
      var JSONdata1 = JSON.stringify(userSearch);
      res.send(JSONdata1)
    }

    
  }catch(e){

  }
  
})

router.get('/main', function(req, res, next){
  res.render('main')
})

router.get('/e', function(req, res, next){
  res.render('e')
})

router.get('/gait', function(req, res, next){
  res.render('gait')
})

router.post('/gait',async (req, res)=>{
  
})

router.get('/rehab', function(req, res, next){
  res.render('rehab')
})

module.exports = router;
