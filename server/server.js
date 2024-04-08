const jsonServer = require("json-server");
const categoriesJson = require("./categories.json");
const usersJson = require("./users.json");
const loginJson = require("./login.json");
const verifyJson = require("./verify.json");
const json = { ...categoriesJson, ...usersJson, ...loginJson, ...verifyJson };

const server = jsonServer.create();
const router = jsonServer.router(json);
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);

server.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(router, middlewares);

server.listen(3000, () => {
  console.log("Mock server is running on port 3000");
});
