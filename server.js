var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    articleOne : {
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
    articleTwo: {
    title:'Article two | Pratap',
    heading:'Article  Two',
    date:'Aug 04, 2017',
    content:`
            <p>
                This is my second paragraph, This is my second paragraph, This is my second paragraph, This is my second paragraph.
            </p>`
            
    },
    articleThree:{
    title:'Article Three | Pratap',
    heading:'Article  Three',
    date:'Aug 06, 2017',
    content:`
            <p>
                This is my three paragraph, This is my three paragraph, This is my three paragraph, This is my three paragraph.
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

app.get('/:articleName', function(req, res){
    //articleName == Artcle-one
    //articles[articleName] == contant object for article one
    var articleName = req.params.articeName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
