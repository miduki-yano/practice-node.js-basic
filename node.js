const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
//ejsオブジェクトの読み込み

const index_page = fs.readFileSync('./index.ejs','utf8');//テンプレートファイル(絶対に変わらないhtmlの部分)の読み込み
//readFile(非同期)と違い、同期処理で、fsオブジェクトのeadFileSyncメソッドで読み込む

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('server start!');


/*
function getFromClient(request,response){
    var content = ejs.render(index_page);
    //テンプレートファイルをレンダリング(画面に表示するHTMLコードに変換)し、格納。
    response.writeHead(200,{'Content-Type': 'text/html' });
    //200:ステータスコード(クライアントのリクエストの結果)で、成功を表す。401は失敗。
    response.write(content);
    response.end();
}*/

function getFromClient(request,response){
    var content = ejs.render(index_page, {
        title: "Indexページ",
        content: "これはテンプレートを使ったサンプルページです",
    });
    
    response.writeHead(200,{'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}
