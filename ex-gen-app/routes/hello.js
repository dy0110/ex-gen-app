//ルーティングの設定
var express = require('express');
var router = express.Router();

//getリクエスト
router.get('/',(req,res,next) => {
    var msg = "※入力して送信";
    //セッションがあればそれを表示
    if( req.session.message != undefined){
        msg = "Last Message: " + req.session.message
    }
    //値の書き出し
    var data =  {
        title : "Hello !",
        content : msg
    };
    res.render('hello',data);
});

//postリクエスト
router.post('/post',(req,res,next) => {
    var msg = req.body.message;
    //セッションに入力した値を保存して表示
    req.session.message = msg;
    var data = {
        title : "Hello !",
        content: "Last Message: " + req.session.message
    };
    res.render('hello' , data)
});

module.exports = router;