require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const routes = require("./routes");
const path = require("path");
console.log(__dirname);
const buildPath = path.join(__dirname, "/client/build");
app.use(express.static(buildPath));
// ** MIDDLEWARE ** //
// const whitelist = [
//   "http://localhost:3000",
//   "http://localhost:4000",
//   "https://young-falls-90605.herokuapp.com/",
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin);
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable");
//       callback(null, true);
//     } else {
//       console.log("Origin rejected");
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.resolve(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/"));
  });
  app.use("/api/all", routes.admin);
} else {
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
  app.use("/api/all", routes.admin);
}

app.listen(port || 4000, console.log(`Server started on port ${port}`));
