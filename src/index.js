const app = require("./server");
require("dotenv").config();

app.listen(app.get("port"), function () {
  console.log("App listening on port " + process.env.PORT);
});
