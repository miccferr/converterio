const remote = require('electron').remote;
const dialog = remote.require('dialog');
import * as fs from 'fs';

import {default as writeConvertedFile} from './convert';

let filtersListOpen = [{
  name: 'GeoJSON',
  extensions: ['geojson']
}, {
  name: 'ESRI Shapefile',
  extensions: ['shp']
}, {
  name: 'OSM',
  extensions: ['osm']
}];

let filtersListClose = filtersListOpen.slice(0, 2);


let ioDialog  = {

  inputFileOpen: '',

  inputFileClosed: '',

  openFile: function () {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: filtersListOpen,
    }, function (fileNames) {
      if (fileNames === undefined) {
        return;
      } else {
        var fileName = fileNames[0];
        console.log(fileName);
        this.inputFileOpen = fileName;
        console.log(this.inputFileOpen);

      }
    });
  },

  saveFile: function () {
    dialog.showSaveDialog({
      title: 'Save as',
      filters: filtersListClose,
    }, function (fileName, err) {
      if (fileName === undefined) return;
      // stores file name to be saved
      this.inputFileClosed = fileName;
      // stores crs to be saved
      function saveCRS() {
        // var crs = document.getElementById("crs")
        // var crs = this.refs.myInput.state.entryValue;
        var crs = this.refs
        console.log(crs);

        var number = +parseInt(crs);
        // console.log(Number.isInteger(crs));
        if (crs.value === "" || number != number) {
          dialog.showErrorBox('Error','Missing CRS');
        } else {
          console.log('it is a number');
          return number;
        }

      }
      let crs = saveCRS()
      console.log(writeConvertedFile);
        // funzione gdal per convertire e trasformare.
        // Uso gdal write al posto di fs writeFile per scrivere nuovo file
      writeConvertedFile(this.inputFileOpen, this.inputFileClosed, crs, err);
    });
  }



};

export default ioDialog;
// export { openFile, saveFile  };
