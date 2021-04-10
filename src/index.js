const app = require("./server");
require("dotenv").config();

app.listen(app.get("port"), () => {
  console.log("server on port");
});
