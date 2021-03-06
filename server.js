var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').Pool;
var crypto = require('crypto');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
    title:'Article one | Pratap',
    heading:'Article  one',
    date:'Aug 02, 2017',
    content:`
            <p>
                This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph.
            </p>
            <p>
                This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph.
            </p>
            <p>
                This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph, This is my first paragraph.
            </p>`
},
    'article-two': {
    title:'Article two | Pratap',
    heading:'Article  Two',
    date:'Aug 04, 2017',
    content:`
            <p>
                This is my second paragraph, This is my second paragraph, This is my second paragraph, This is my second paragraph.
            </p>`
            
    },
    'article-three':{
    title:'Article Three | Pratap',
    heading:'Article  Three',
    date:'Aug 06, 2017',
    content:`
            <p>
                This is my third paragraph, This is my third paragraph, This is my third paragraph, This is my third paragraph.
            </p>`
    }
};

function createTemplate(data) {
var title = data.title;
var heading = data.heading;
var date = data.date;
var content = data.content;
var htmlTemplate = `
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width,  initial-scale=1"/> 
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
            ${heading}
        <div>
            ${date}
        </div>
        <div>
           ${content}
        </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    //create hash
    var hashed = crypto.pbkdf2Sync('input', 'salt', 10000, 512, 'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input', function(req, res){
  var hashedString = hash(req.param.input, 'this-is-some-random-string');
  res.send(hashedString);
    
});


var counter = 0;
app.get('/counter', function(req, res){
   counter = counter+1;
   res.send(counter.toString());
});


app.get('/:articleName', function(req, res){
    //articleName == Artcle-one
    //articles[articleName] == contant object for article one
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
