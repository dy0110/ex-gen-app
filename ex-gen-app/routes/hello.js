//ルーティングの設定
var express = require('express');
var router = express.Router();

//表示部分の作製
router.get('/',(req,res,next) => {
    var data =  {
        title : "Hello World !",
        content : "テストメッセージ<br>This is Test message."
    };
    res.render('hello',data);
});

module.exports = router;