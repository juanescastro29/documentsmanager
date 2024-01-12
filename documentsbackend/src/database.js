const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/users", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then((db) => console.log("Db is connected"))
.catch((err) => console.log(err));
