const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors());  // This enables CORS
server.use(middlewares);
server.use(router);

server.listen(5001, () => {
  console.log('JSON Server is running on port 5001');
});
