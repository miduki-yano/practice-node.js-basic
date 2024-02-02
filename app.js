const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs','utf8');
const other_page = fs.readFileSync('./other.ejs','utf8');
const style_css = fs.readFileSync('./style.css','utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');



function getFromClient(request,response){
        var url_parts = url.parse(request.url,true);
        switch(url_parts.pathname){

                case '/':
                        /*
                        var content = "これはIndexページです"
                        var query = url_parts.query;
                        if(query.msg != undefined) {
                                content += 'あなたは、「' + query.msg + '」と送りました。';
                        }
                        var content = ejs.render(index_page,{
                                title: "Indexページ",
                                content: content,
                        });
                        */

                        response_index(request,response);
                        break;

                case '/other':
                        /*var content = ejs.render(other_page,{
                                title: "other",
                                content: "これは新しいページ",
                        });
                        response.writeHead(200,{'Content-Type':'text/html'});
                        response.write(content);
                        response.end();*/
                        response_other(request,response);
                        break;
                case '/style.css':
                        response.writeHead(200,{'Content-Type':'text/css'});
                        response.write(style_css);
                        response.end();
                        break;

                default:
                        response.writeHead(200,{'Content-Type':'text/plain'});
                        response.end('no page...');
                        break;

        } 
}

/*
var data = {
        'Taro': '09-999-999',
        'Hanako': '080-888-888',
        'Sachiko': '070-777-777',
        'Ichiro': '060-666-666'
};*/

var data = { msg: 'no message...'};

//indexのアクセス処理
function response_index(request,response){
        if(request.method == 'POST'){
                var body = '';
                request.on('data', (data) => {
                        body += data;
                });
                request.on('end',() =>{
                        data = qs.parse(body);
                        write_index(request,response);
                });
        }else{
                write_index(request,response);
        }
        
        /*
        var msg = "これはindexページです。"
        var content = ejs.render(index_page,{
                title: "Index",
                content: msg,
                data: data,
                filename: 'data_item',
        });
        response.writeHead(200,{'Content-Type':'text/html'});
                response.write(content);
                response.end();*/
}

function write_index(request,response){
        var msg = "※伝言を表示します。"
        var content = ejs.render(index_page,{
                title: "Index",
                content: msg,
                data: data,
        });
        response.writeHead(200,{ 'Content-Type': 'text/html'});
        response.write(content);
        response.end();
}

var data2 = {
        'Taro': ['taro@yamada','09-999-999','Tokyo'],
        'Hanako': ['hanako@yamada','080-888-999','Fukuoka'],
        'Sachiko': ['sachiko@yamada','070-777-999','Tokyo'],
        'Ichiro': ['ichiro@yamada','09-555-999','Ishikawa'],
}

//otherのアクセス処理
function response_other(request,response){
        var msg = "これはotherページです。"
        var content = ejs.render(other_page,{
                title: "Other",
                content: msg,
                data: data2,
                filename: 'data_item',
        });
        response.writeHead(200,{'Content-Type':'text/html'});
                response.write(content);
                response.end();
}
        /*
        if(request.method == 'POST'){
                var body = '';
                request.on('data', (data) => {
                        body += data;
                });
                request.on('end',() =>{
                        var post_data = qs.parse(body);
                        msg += 'あなたは、「' + post_data.msg + '」と書きました。';
                        var content = ejs.render(other_page, {
                                title: "Other",
                                content: msg,
                        });
                        response.writeHead(200,{'Content-Type':'text/html'});
                        response.write(content);
                        response.end();

                });
        }else{
                var msg = "メッセージがありません。"
                var content = ejs.render(other_page, {
                        title: "Other",
                        content: msg,
                });
                response.writeHead(200,{'Content-Type':'text/html'});
                response.write(content);
                response.end();
        }*/