//ルーティングの設定
var express = require('express');
var router = express.Router();

//sqliteモジュールのロード
var sqlite3 = require('sqlite3');

//dbオブジェクトの取得
var db = new sqlite3.Database('mydb.db');
//knexオブジェクトのロード
var knex = require('knex')({
    dialect: 'sqlite3',
    connection: {
        filename: 'mydb.db'
    },
    useNullAsDefault: true //sqliteの時のみ
});

//Bookshelfのロード
var Bookshelf = require('bookshelf')(knex);

//モデル(データベースへアクセスするためのオブジェクト)
var MyData = Bookshelf.Model.extend({
    tableName: 'mydata'
})

//express-validater
var { check, validationResult } = require('express-validator/check');

//getリクエスト(index)
router.get('/',(req,res,next) => {
    //
    new MyData().fetchAll().then( ( collection ) => {
        console.log( collection.toJSON() )
        var data = {
            title: 'Hello!',
            content: collection.toJSON()
        };
        res.render( 'hello/index', data );
    } ).catch( (error) => {
        res.status(500).json({
            error: true,
            data: {
                message: error.message
            }
        })
    } );
});

//getリクエスト(add)
router.get('/add', (req,res,next) => {
    var data = {
        title:'Hello/Add',
        content:'新しいレコードを入力:',
        name_error:"",
        mail_error :"",
        age_error:"",
        form:{name:'',mail:'',age:0}
    }
    res.render('hello/add',data);
});

//postリクエスト(add)
router.post('/add', (req, res, next) => {
    var response = res;
    //余分なデータを取り除く
    var body = req.body;
    var save_data = {}
    save_data.name = body.name;
    save_data.mail = body.mail;
    save_data.age = body.age;
    //保存
    new MyData( save_data ).save( ).then( (model) => {
        response.redirect('/hello');
    } );
});

//getリクエスト(show)
router.get('/show',(req,res,next) => {
    var id = req.query.id;
    db.serialize(() => {
        //レコードの取り出し
        var q = "SELECT * FROM mydata WHERE id = ?";
        db.get(q,[id],(error,row) => {
            if(!error){
                var data = {
                    title:'Hello/show',
                    content:'id = '+id+' のレコード',
                    mydata: row
                }
                //取り出した値を表示
                res.render('hello/show',data);
            }
        });
    });
});

//getリクエスト(edit)
router.get('/edit',(req,res,next) => {
    var id = req.query.id;
    db.serialize(() => {
        var q = "SELECT * FROM mydata WHERE id = ? ";
        db.get(q,[id],(error,row) => {
            if(!error){
                var data = {
                    title: 'hello/edit',
                    content: 'id = '+id+' のレコードを編集 :',
                    mydata:row
                }
                res.render('hello/edit',data);
            }
        });
    });
});

//postリクエスト(edit)
router.post('/edit',(req,res,next) => {
    var id = req.body.id;
    var nm = req.body.name;
    var ml = req.body.mail;
    var ag = req.body.age;
    var q  = "UPDATE mydata SET name = ? , mail = ? , age = ?  WHERE id = ? ";
    db.run(q,nm,ml,ag,id);
    res.redirect('/hello');
});

//getリクエスト(delete)
router.get('/delete',(req,res,next) => {
    var id = req.query.id;
    db.serialize(() => {
        var q = "SELECT * FROM mydata WHERE id = ? ";
        db.get(q,[id],(error,row) => {
            if(!error){
                var data = {
                    title:'Hello/delete',
                    content:'id = '+id+' のレコードを削除 ：',
                    mydata: row
                }
            }
            res.render('hello/delete',data);
        });
    });
});

//postリクエスト(edit)
router.post('/delete',(req,res,next) => {
    var id = req.body.id;
    var q = "DELETE FROM mydata WHERE id = ? ";
    db.run(q,id);
    res.redirect('/hello');
});

//getリクエスト(find)
router.get( '/find', ( req, res, next ) => {
    var fstr = {
        fstr : ''
    }
    var data = {
        title: '/Hello/Find',
        content: '検索IDを入力: ',
        form: fstr ,
        mydata: null
    };
    console.log( data.form.fstr)
    res.render( 'hello/find', data );
} );

//postリクエスト
router.post( '/find', ( req, res, next ) => {
    new MyData().where( 'id', '=', req.body.fstr )
        .fetch().then( (collection) => {
            var data = {
                title: "Hello!",
                content: '*ID = ' + req.body.fstr + ' の検索結果: ',
                form: req.body,
                mydata: collection.toJSON()
            }
            res.render( "hello/find", data );
        } )
} );

module.exports = router;