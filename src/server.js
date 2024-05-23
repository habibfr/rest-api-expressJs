import application from "./application/application.js";
import "dotenv/config";
const SERVER_PORT = process.env.SERVER_PORT;
application.listen(SERVER_PORT, () =>
  console.log(`The server is running on http://localhost:${SERVER_PORT}`)
);
