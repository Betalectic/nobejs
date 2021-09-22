const https = require("https");
const fs = require("fs");
// var yauzl = require("yauzl");
// var request = require("request");
// const downloadRelease = require("@terascope/fetch-github-release");

const options = {
  hostname: "api.github.com",
  port: 443,
  path: "/repos/betalectic/nobejs/releases/latest",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "User-Agent": "request",
  },
};

fs.rmdirSync("upgrade", { recursive: true });

function doRequest(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
}

function downloadZip(url) {
  return new Promise((resolve, reject) => {
    https.get(url, function (response) {
      response.on("data", function (data) {
        // fs.appendFileSync("nobe-latest.zip", data);
        fs.writeFileSync("nobe-latest.zip", data);
        resolve({});
      });
      response.on("end", function () {
        resolve({});
      });

      response.on("error", function (err) {
        reject(err);
      });
    });
  });
}

(async () => {
  try {
    // let response = await doRequest(options);
    // console.log("r", response.zipball_url);
    // await downloadZip(response.zipball_url);
  } catch (error) {
    console.log("error", error);
  }
})();

// request("https://api.github.com/repos/betalectic/nobejs/zipball/v0.0.1")
//   .pipe(fs.createWriteStream("nobe-latest.zip"))
//   .on("close", function () {
//     console.log("File written!");
//   });

const user = "betalectic";
const repo = "nobejs";
const outputdir = "upgrade";
const leaveZipped = false;
const disableLogging = false;

// Define a function to filter releases.
function filterRelease(release) {
  // Filter out prereleases.
  return true;
}

// Define a function to filter assets.
function filterAsset(asset) {
  console.log("asset", asset);
  // Select assets that contain the string 'windows'.
  return true;
}

// downloadRelease(
//   user,
//   repo,
//   outputdir,
//   filterRelease,
//   filterAsset,
//   leaveZipped,
//   disableLogging
// )
//   .then(function () {
//     console.log("All done!");
//   })
//   .catch(function (err) {
//     console.error(err.message);
//   });
