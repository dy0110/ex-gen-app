//ルーティングの設定
var express = require('express');
var router = express.Router();

//sqliteモジュールのロード
var sqlite3 = require('sqlite3');

//dbオブジェクトの取得
var db = new sqlite3.Database('mydb.db');

//getリクエスト
router.get('/',(req,res,next) => {
    //dbのシリアライズ
    db.serialize( () => {
        //レコードの取り出し
        db.all("SELECT * FROM mydata ",(err,rows) => {
            //DBアクセス完了時の処理
            if(!err) {
                var data = {
                    title: 'Hello!',
                    content: rows
                }
                res.render('hello',data);
            }
        });
    });
});

module.exports = router;