require("dotenv/config");

const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = express();
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const popularGifts = require("./controllers/popularGifts");
const wishlist = require("./controllers/wishlist");
const products = require("./controllers/products");
const interest = require("./controllers/interest");
const mapping = require("./controllers/mapping");
app.use(express.json());
app.use(cors());
const database = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  }
});

app.get("/", (req, res) => {
  res.send("It is working");
});
app.get("/populargifts", (req, res) => {
  popularGifts.handlePopularGifts(req, res, database);
});
app.post("/signin", (req, res) =>
  signin.handleSignin(req, res, database, bcrypt, jwt)
);

app.post("/register", (req, res) =>
  register.handleRegister(req, res, database, bcrypt)
);

app.post("/wishlist", (req, res) => {
  wishlist.handleWishlist(req, res, database);
});

app.post("/addtowishlist", (req, res) => {
  wishlist.addtowishlist(req, res, database);
});
app.delete("/removefromwishlist", (req, res) => {
  wishlist.removefromwishlist(req, res, database);
});

app.post("/products", (req, res) => {
  console.log(req.body);
  products.handleProducts(req, res, database);
});
app.post("/productsbyint", (req, res) => {
  products.productsByInterest(req, res, database);
});

app.post("/productDetails", (req, res) => {
  products.productDetails(req, res, database);
});

app.get("/interests", (req, res) => {
  interest.handleInterest(req, res, database);
});

app.get("/subinterest", (req, res) => {
  interest.getSubinterest(req, res, database);
});
app.post("/subinterest", (req, res) => {
  interest.postSubinterest(req, res, database);
});

app.post("/mapping", (req, res) => {
  mapping.handleMapping(req, res, database);
});
app.listen(3001);
