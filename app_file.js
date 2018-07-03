var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;

app.set('views', './views_file');

app.set('view engine', 'jade');

// 라우팅
app.get('/topic/new', function(req, res) {
  fs.readdir('data', function(err, files) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', { topics: files });
  });
});

// 중복을 제거함으로써 유지, 보수를 하기가 용이해짐
app.get(['/topic', '/topic/:id'], function(req, res) {
  fs.readdir('data', function(err, files) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }

    var id = req.params.id;
    if (id) {
      // id 값이 있을 때
      fs.readFile('data/' + id, 'utf8', function(err, data) {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', { topics: files, title: id, description: data });
      })
    } else {
      // render(템플릿 파일의 이름, 파일 안으로 주입하고자 하는 데이터)
      // id 값이 없을 때
      res.render('view', { topics: files, title: 'Welcome', description: 'Hello, Javascript for server.' });
    }
  })
});

// 링크를 타고 들어오는 것은 get
// app.get('/topic/:id', function(req, res) {
//   var id = req.params.id;
//
//   fs.readdir('data', function(err, files) {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     }
//     // render(템플릿 파일의 이름, 파일 안으로 주입하고자 하는 데이터)
//     // res.render('view', { topics: files });
//     fs.readFile('data/' + id, 'utf8', function(err, data) {
//       if (err) {
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//       }
//       res.render('view', { topics: files, title: id, description: data });
//     })
//   })
// });

// 사용자가 /topic으로 들어오면 글 목록이 화면에 표시되게 함
app.get('/topic', function(req, res) {
  res.render('view');
})

// 라우터 설치
app.post('/topic', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  // fs.writeFile('dataa/' + title, description, function(err) {
  fs.writeFile('data/' + title, description, function(err) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    // 만약 에러가 없다면
    // res.send('Success!');
    res.redirect('/topic/' + title);
  });
});

// function callback
app.listen(3000, function() {
  console.log('Connected, 3000 port!');
});
