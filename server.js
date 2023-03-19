const express = require("express");
const expressHbs = require('express-handlebars');
const app = express();
const bodyParser = require("body-parser");
const cal = require("./caculator.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
//app.engine('.hbs', ExpressHandlebars());
app.engine('.hbs', expressHbs.engine({ 
  extname: "hbs", 
  defaultLayout: 'main', 
  layoutsDir: "views/layouts/" }));

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );

app.set('view engine', '.hbs');
app.set('views', './views');

app.post("/", (req, res) => {
  console.log(req.body);
  const soA = Number(req.body.soA);
  const soB = Number(req.body.soB);
  const operator = req.body.operator;



  switch (operator) {
    case "cong":
      const tong = cal.add(soA, soB);
        res.render('home', {
          layout: 'main',
          //showContentMaytinh: false,

          helpers: {
            soA() { return soA+''; },
            soB() { return soB+''; },
            kq() { return tong+''; }
          }
        });
     
      break;
    case "tru":
      const hieu = cal.sub(soA, soB);
      res.render('home', {
        layout: 'main',
        //showContentMaytinh: false,

        helpers: {
          soA() { return soA+''; },
          soB() { return soB+''; },
          kq() { return hieu+''; }
        }
      });
      break;
    case "nhan":
      const tich = cal.mul(soA, soB);
      res.render('home', {
        layout: 'main',
        //showContentMaytinh: false,

        helpers: {
          soA() { return soA+''; },
          soB() { return soB+''; },
          kq() { return tich+''; }
        }
      });
      break;
    case "chia":
      const thuong = cal.div(soA, soB);
      res.render('home', {
        layout: 'main',
        //showContentMaytinh: false,

        helpers: {
          soA() { return soA+''; },
          soB() { return soB+''; },
          kq() { return thuong+''; }
        }
      });


      break;
  }
});


app.listen(8000);
