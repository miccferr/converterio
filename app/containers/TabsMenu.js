import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
// import MyTab from './MyTab'; don't need it anymore
import LoadTab from './LoadTab';
import SaveTab from './SaveTab';
import EPSGTab from './EPSGTab';

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

class TabsMenu extends React.Component {
// const TabsMenu = React.createClass({
  constructor(props) {
    super(props);
    this.state = {
      inputFile: '',
      epsg: '',
      outputFile: ''
    };
  }

  // getInitialState()  {
  //     return ({
  //         epsg: ''
  //     });
  // }

  // updateState(val) {
  //   console.log(this);
  //     this.setState({
  //         epsg: val
  //     });
  // }

// CANCELLATO PER EIMINARE IL  RIFERIMENTO CIRCOLARE DENTRO A LOADTAB
  // openFile() {
  //   dialog.showOpenDialog({
  //     properties: ['openFile', 'multiSelections'],
  //     filters: filtersListOpen,
  //   }, function (fileNames) {
  //     if (fileNames === undefined) {
  //       return;
  //     } else {
  //       var fileName = fileNames[0];
  //       console.log('fileName is ' + fileName);
  //       console.log(this);
  //       this.state.inputFile = fileName
  //       // console.log(fileName);
  //       // this.state.inputFile = fileName;
  //       // console.log(this);
  //
  //     }
  //   });
  // }


// ultima roba aggiunta e poi commentata via
  // updateState() {
  //    console.log(this);
  //    let nuovoStato = this.openFile();
  //    console.log(nuovoStato);
  //     this.state.inputFile=nuovoStato
  // }
  // saveFile() {
  //   dialog.showSaveDialog({
  //     title: 'Save as',
  //     filters: filtersListClose,
  //   }, function (fileName, err) {
  //     if (fileName === undefined) return;
  //     // stores file name to be saved
  //     this.inputFileClosed = fileName;
  //     // stores crs to be saved
  //     function saveCRS() {
  //       // var crs = document.getElementById("crs")
  //       // var crs = this.refs.myInput.state.entryValue;
  //       var crs = this.refs
  //       console.log(crs);
  //
  //       var number = +parseInt(crs);
  //       // console.log(Number.isInteger(crs));
  //       if (crs.value === "" || number != number) {
  //         dialog.showErrorBox('Error','Missing CRS');
  //       } else {
  //         console.log('it is a number');
  //         return number;
  //       }
  //
  //     }
  //     let crs = saveCRS()
  //     console.log(writeConvertedFile);
  //       // funzione gdal per convertire e trasformare.
  //       // Uso gdal write al posto di fs writeFile per scrivere nuovo file
  //     writeConvertedFile(this.inputFile, this.inputFileClosed, crs, err);
  //   });
  // }

  dimmiStato(){
    console.log(this.state);    
  }

  openFile () {
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



  render() {
    return (
          <Tabs>
            <Tab label="Load File" >
              <button onClick={this.dimmiStato.bind(this)}></button>
              <LoadTab nomeCaricato={this.openFile.bind(this)}/>
            </Tab>
            <Tab label="Reproject" >
              {/*TODO remove bind with arrow fun?*/}
              <EPSGTab updateFun={this.updateState}/>
            </Tab>
            <Tab label="Save File" >
              <SaveTab epsg={this.state.epsg} />
            </Tab>
          </Tabs>
        )
  }
}

export default TabsMenu;
