import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import LoadTab from './LoadTab';
import SaveTab from './SaveTab';
import EPSGTab from './EPSGTab';

const remote = require('electron').remote;
const dialog = remote.require('dialog');
import * as fs from 'fs';

import geojsontoosm from 'geojsontoosm';
import {default as writeConvertedFile} from './helpers/convert';

let filtersListOpen = [{
  name: 'GeoJSON',
  extensions: ['geojson']
},{
  name: 'ESRI Shapefile',
  extensions: ['shp']
}, {
  name: 'OSM',
  extensions: ['osm']
}];

let filtersListClose = filtersListOpen.slice(0, 2);

class TabsMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputFile: '',
      epsg: '',
      outputFile: ''
    };
  }

  dimmiStato(){
    console.log(this.state);
  }

  updateInputFile () {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: filtersListOpen,
      // using arrow fun to pass correct this into the callback
    }, (fileNames) => {
      if (fileNames === undefined) {
        return;
      } else {
        let fileName = fileNames[0].replace(/^.*[\\\/]/, '');
        this.setState({inputFile:fileName})
      }
    });
  }
  updateEPSG(val) {
      this.setState({epsg:val})
  }
  updateOutputFile(val) {
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
        console.log('this from save panel' + this);
          // funzione gdal per convertire e trasformare.
          // Uso gdal write al posto di fs writeFile per scrivere nuovo file
        writeConvertedFile(this.inputFileOpen, this.inputFileClosed, crs, err);
      });

  }

  render() {
    return (

          <Tabs>



          <Tab label="Load File" >
            {/*just for debuggin purpoues*/}
            <button onClick={this.dimmiStato.bind(this)}></button>
              <LoadTab nomeCaricato={this.updateInputFile.bind(this)}/>
            </Tab>
            <Tab label="Reproject" >
              <EPSGTab updateFun={this.updateEPSG.bind(this)}/>
            </Tab>
            <Tab label="Save File" >
              <SaveTab updateFun={this.updateOutputFile.bind(this)} />
            </Tab>
          </Tabs>
        )
  }
}

export default TabsMenu;
