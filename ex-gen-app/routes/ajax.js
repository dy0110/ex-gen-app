var express = require('express');
var router = express.Router();

//データの設定
var data = [
    {name:"Taro",age:35,mail:"taro@yamada"},
    {name:"Hanako",age:29,mail:"hanako@flower"},
    {name:"Sachiko",age:41,mail:"sachiko@happy"}
];

//Jsonの出力
router.get('/',(req,res,next) => {
    var n = req.query.id;
    res.json(data[n]);
});

module.exports = router;