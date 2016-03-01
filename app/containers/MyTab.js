import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

const remote = require('electron').remote;
const dialog = remote.require('dialog');
import * as fs from 'fs';

import {default as writeConvertedFile} from './helpers/convert';

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

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};



class MyTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputFileOpen: ''
    };
  }


    onUpdate() {this.setState((value)=> {inputFileOpen:value}) }

    openFile() {
      dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: filtersListOpen,
      }, function (fileNames) {
        if (fileNames === undefined) {
          return;
        } else {
          var fileName = fileNames[0];
          console.log(fileName);
          this.state.inputFileOpen = fileName;
          console.log(this);

        }
      });
    }

    saveFile() {
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

    render() {
    return <div>
            <FlatButton label="Load File" onClick={this.openFile}  />
            <p><span>File loaded {  this.state }</span></p>
          </div>

      }

  };

export default MyTab;
