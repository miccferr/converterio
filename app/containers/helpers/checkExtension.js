let extension = {

  extensionsObj: {
    geojson: "GeoJSON",
    shp: "ESRI Shapefile",

  },

  contains: function (needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if (!findNaN && typeof Array.prototype.indexOf === 'function') {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function (needle) {
        var i = -1,
          index = -1;

        for (i = 0; i < this.length; i++) {
          var item = this[i];

          if ((findNaN && item !== item) || item === needle) {
            index = i;
            break;
          }
        }
        return index;
      };
    }
    return indexOf.call(this, needle) > -1;
  },

  //comapre extensionsObj and map the correct input the output
  checkExtension: function (saveFilePath) {

    var re = /(?:\.([^.]+))?$/;
    var extension = re.exec(saveFilePath)[1]
    console.log(Object.keys(this.extensionsObj));
    console.log(this.contains.call(Object.keys(this.extensionsObj),extension));
    if (!this.contains.call(Object.keys(this.extensionsObj), extension)) {
      // print error
      dialog.showErrorBox("Wrong file extension");
    } else {
      var gdalFormat = this.extensionsObj[extension];
      // return gdal.drivers.getNames[gdalFormat];
      return gdalFormat;

    }
  }
};

export default extension;
