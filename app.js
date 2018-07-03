var express = require('express');
var app = express();  // 애플리케이션 객체 생성

// bodyParser 모듈 추가
var bodyParser = require('body-parser');

// googling | jade express code pretty
app.locals.pretty = true;

app.set('views', './views');
app.set('view engine', 'jade');

// public이라는 디렉토리에 정적인 파일을 갖다 놓으면 사용자에게 서비스할 수 있음
app.use(express.static('public'));

// POST 3 : POST
// bodyParser를 use라는 메서드를 통해 연결함
app.use(bodyParser.urlencoded({ extended: false }))

// POST 2 : form
app.get('/form', function(req, res) {
  res.render('form');
});

// POST 2 : form
app.get('/form_receiver', function(req, res) {
  // res.send('Hello, GET');
  var title = req.query.title;
  var description = req.query.description;
  res.send(title + ', ' + description);
});

// POST 3 : POST
app.post('/form_receiver', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  // res.send('Hello, POST');
  res.send(title + ', ' + description);
});

// query 객체의 사용법 | 라우터 연결
// app.get('/topic', function(req, res) {
app.get('/topic/:', function(req, res) {
  var topics = [
    'Javascript is...',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
    <a href="/topic/0">JavaScirpt</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br><br>
    ${topics[req.query.id]}
  `
  res.send(output);
  // ${topics[req.params.id]}
  // res.send(req.query.id + ', ' + req.query.name);
});

app.get('/topic/:id/:mode', function(req, res) {
  res.send(req.params.id + ', ' + req.params.mode);
})

// template engine을 이용하므로 렌더링을 사용
//
app.get('/template', function(req, res) {
  // template로 들어온 사용자에게 temp라는 템플릿 파일을 렌더링해서 전송
  res.render('temp', {time:Date(), _title:'Jade'});
});

// 홈페이지에 접속했다는 화면을 보여주고 싶을 경우
app.get('/', function(req, res) {
  res.send('Hello home page');
});

app.get('/dynamic', function(req, res) {
  var lis = '';
  for (var i = 0; i < 5; i++) {
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, Dynamic!
      <ul>
        ${lis}
      </ul>
      ${time}
    </body>
  </html>`;
  res.send(output);
});

app.get('/route', function(req, res) {
  res.send('Hello Router, <img src="/route.png">')
});

// get 같은 메서드를 라우터 라고 부르고, 내가 한 행동을 라우팅이라고 한다
// 사전적 의미로 '길을 찾는다'라는 뜻인데, 어떤 요청이 들어왔을 때 길을 찾게 해줌
app.get('/login', function(req, res) {
  res.send('<h1>Login please</h1>');
});

app.listen(3000, function() {
  console.log('Connected 3000 port!');
});
