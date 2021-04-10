const app = require("./server");
require("dotenv").config();

app.listen(app.get(process.env.PORT), function () {
  console.log("App listening on port " + process.env.PORT);
});
