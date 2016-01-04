(function() {
  "use strict";
  const urlList = [
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/fall-of-the-lich-king/fall-of-the-lich-king-1920x1080.jpg",
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/black-temple/black-temple-1920x1200.jpg",
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/zandalari/zandalari-1920x1200.jpg",
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/rage-of-the-firelands/rage-of-the-firelands-1920x1200.jpg",
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/fury-of-hellfire/fury-of-hellfire-3840x2160.jpg",
  ];

  var startDownloadTask = function(imgSrc, dirName, index) {
    //TODO: startDownloadTask
  }

  urlList.forEach(function(item, index, array) {
    startDownloadTask(item, './', index);
  })
})();
