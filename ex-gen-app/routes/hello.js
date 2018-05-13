//ルーティングの設定
var express = require('express');
var router = express.Router();

//getリクエスト
router.get('/',(req,res,next) => {
    var data =  {
        title : "Hello !",
        content : "※入力して送信"
    };
    res.render('hello',data);
});

//postリクエスト
router.post('/post',(req,res,next) => {
    var msg = req.body.message;
    var data = {
        title : "Hello !",
        content: "あなたは「" + msg +"」と送信しました"
    };
    res.render('hello' , data)
});

module.exports = router;