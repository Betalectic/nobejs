const https = require("https");
const path = require("path");
const fs = require("fs");
const url = require("url");
var request = require("request");
var MultiProgress = require("multi-progress");
var extractZip = require("extract-zip");
bars = new MultiProgress(process.stderr);
// dest = _fs["default"].createWriteStream(destf);

fs.rmdirSync("upgrade-nobejs", { recursive: true });

if (!fs.existsSync("upgrade-nobejs")) {
  fs.mkdirSync("upgrade-nobejs");
}

var destf = path.join("upgrade-nobejs", "release.zip");

var dest = fs.createWriteStream(destf);

function rpad(text, len) {
  var t = text;

  if (t.length > len) {
    t = "".concat(text.substr(0, len - 3), "...");
  }

  return "".concat(t).concat(new Array(len - t.length + 1).join(" "));
}

var bar = bars.newBar("".concat((0, rpad)("release.zip", 24), " :bar :etas"), {
  complete: "▇",
  incomplete: "-",
  width: process.stdout.columns - 36,
  total: 100,
});

var progress = bar.update.bind(bar);

// "https://codeload.github.com/betalectic/nobejs/legacy.zip/refs/tags/v0.0.1"

var options = Object.assign(
  {},
  url.parse("https://api.github.com/repos/betalectic/nobejs/zipball/v0.0.1"),
  {
    headers: {
      "User-Agent": "rjvim",
    },
  }
);

// console.log(options);

// var request = require("request");

// request(
//   {
//     followAllRedirects: true,
//     url: "https://api.github.com/repos/betalectic/nobejs/zipball/v0.0.1",
//     headers: {
//       "User-Agent": "rjvim",
//     },
//   },
//   function (error, response, body) {
//     if (!error) {
//       //   response.pipe(dest);
//       console.log(response);
//     }
//   }
// );

https
  .get(options, function (res1) {
    console.log("res1", res1.headers.location);

    // res1.pipe(dest);

    https
      .get(res1.headers.location, function (res2) {
        var total = parseInt(res2.headers["content-length"], 10);
        var completed = 0;
        res2.pipe(dest);
        res2.on("data", function (data) {
          completed += data.length;
          progress(completed / total);
        });
        res2.on("progress", progress);
        res2.on("error", () => {});
        res2.on("end", () => {
          console.log(destf);

          try {
            extractZip(destf, {
              dir: path.resolve("upgrade-nobejs"),
            });
            console.log("Extraction complete");
          } catch (err) {
            console.log("err", err);
          }
        });
      })
      .on("error", () => {});
  })
  .on("error", (error) => {
    console.log("Go crazy", error);
  });
