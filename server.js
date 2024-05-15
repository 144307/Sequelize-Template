const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var MyDB = require("./db");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => {
    users.find((user) => user.email === email);
  },
  (id) => {
    users.find((user) => user.id === id);
  }
);

const hostname = "127.0.0.1";
const port = 8000;
app.use(express.static(__dirname + "/public/"));
app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: "*",
    preflightContinue: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const users = [];

app.get("/", checkAuthentificated, (req, res) => {
  console.log("/");
  res.sendFile("index.html", { root: __dirname });
});

app.get("/dbtest", (req, res) => {
  console.log("/dbtest");
  // MyDB.initDB();
  // MyDB.testDB();
  // MyDB.addOrder();
  // MyDB.changeStatus(6, "отменено");
  // MyDB.addUser();
  // MyDB.getOrderList();
  MyDB.getProductList();
});

app.get("/getproductlist", (req, res) => {
  MyDB.getProductList().then((response) => {
    console.log("getProductList:", response);
    res.status(200).send(response);
  });
});

app.post("/placeorder", (req, res) => {
  console.log("/placeorder");
  let cart = req.body;
  console.log("cart", cart);
  if (cart) {
    MyDB.addOrder(cart);
  }
});

app.get("/register", (req, res) => {
  console.log("/register");
  res.sendFile("register.html", { root: __dirname });
});
app.post("/register", async (req, res) => {
  console.log("/register");
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("req.body", req.body);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.sendFile("login.html", { root: __dirname });
  } catch {
    // res.sendFile("register.html", { root: __dirname });
  }
  console.log("users:", users);
});

app.get("/login", (req, res) => {
  console.log("/login");
  res.sendFile("login.html", { root: __dirname });
});
// app.post("/login", function (req, res, next) {
//   passport.authenticate("local", function (err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       console.log("no user");
//       res.sendFile("login.html", { root: __dirname });
//     }
//     req.logIn(user, function (err) {
//       if (err) {
//         return next(err);
//       }
//       res.sendFile("index.html", { root: __dirname });
//     });
//   })(req, res, next);
// });

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/adminPanel",
    successRedirect: "/",
  }),
  function (req, res) {
    res.redirect("/");
  }
);
// passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/login",
//   failureFlash: true,
// });

app.get("/adminpanel", (req, res) => {
  console.log("/");
  res.sendFile("adminPanel.html", { root: __dirname });
});

function checkAuthentificated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.sendFile("login.html", { root: __dirname });
}

app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
