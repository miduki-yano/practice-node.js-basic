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

function setCookie(key,value,response){
        var cookie = qs.escape(value);
        response.setHeader('Set-Cookie',[key + '=' + cookie]);
}

function getCookie(key,request){
        var cookie_data = request.headers.cookie != undefined ?
        request.headers.cookie: '';
        //条件？値１：値２；
        //条件に合えば、値１が入り、合っていないなら値２が入る。
        console.log(cookie_data);
        var data = cookie_data.split(';');
        
        for (var i in data){
                if(data[i].trim().startsWith(key + '=')){
                        var result = data[i].trim().substring(key.length + 1);
                        return qs.unescape(result);
                }
        }
        return '';
}



function getFromClient(request,response){
        var url_parts = url.parse(request.url,true);
        switch(url_parts.pathname){

                case '/':
                        response_index(request,response);
                        break;

                case '/other':
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
                        setCookie('msg',data.msg,response);
                        write_index(request,response);
                });
        }else{
                write_index(request,response);
        }

}

function write_index(request,response){
        var msg = "※伝言を表示します。"
        var cookie_data = getCookie('msg',request);
        var content = ejs.render(index_page,{
                title: "Index",
                content: msg,
                data: data,
                cookie_data: cookie_data,
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
        