(function() {
  "use strict";
  const http = require("http");
  const fs = require("fs");
  const path = require("path");

  const urlList = [
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/fall-of-the-lich-king/fall-of-the-lich-king-1920x1080.jpg",
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/black-temple/black-temple-1920x1200.jpg",
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/zandalari/zandalari-1920x1200.jpg",
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/rage-of-the-firelands/rage-of-the-firelands-1920x1200.jpg",
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/fury-of-hellfire/fury-of-hellfire-3840x2160.jpg",
  ];

  function getHttpReqCallback(imgSrc, dirName, index) {
    var fileName = index + "-" + path.basename(imgSrc);
    var callback = function(res) {
      console.log("request: " + imgSrc + " return status: " + res.statusCode);
      var contentLength = parseInt(res.headers['content-length']);
      var fileBuff = [];
      res.on('data', function (chunk) {
        var buffer = new Buffer(chunk);
        fileBuff.push(buffer);
      });
      res.on('end', function() {
        console.log("end downloading " + imgSrc);
        if (isNaN(contentLength)) {
          console.log(imgSrc + " content length error");
          return;
        }
        var totalBuff = Buffer.concat(fileBuff);
        console.log("totalBuff.length = " + totalBuff.length + " " + "contentLength = " + contentLength);
        if (totalBuff.length < contentLength) {
          console.log(imgSrc + " download error, try again");
          startDownloadTask(imgSrc, dirName, index);
          return;
        }
        fs.appendFile(dirName + "/" + fileName, totalBuff, function(err){});
      });
    };

    return callback;
  }

  var startDownloadTask = function(imgSrc, dirName, index) {
    console.log("start downloading " + imgSrc);
    var req = http.request(imgSrc, getHttpReqCallback(imgSrc, dirName, index));
    req.on('error', function(e){
      console.log("request " + imgSrc + " error, try again");
      startDownloadTask(imgSrc, dirName, index);
    });
    req.end();
  }

  urlList.forEach(function(item, index, array) {
    startDownloadTask(item, './', index);
  })
})();
