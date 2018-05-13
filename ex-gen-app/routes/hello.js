//ルーティングの設定
var express = require('express');
var router = express.Router();

//表示部分の作製
router.get('/',(req,res,next) => {
    //クエリーパラメータ
    var name = req.query.name;
    var mail = req.query.mail;

    var data =  {
        title : "Hello World !",
        content : "あなたの名前は" + name + "<br>" + "あなたのメールアドレスは" + mail 
    };
    res.render('hello',data);
});

module.exports = router;