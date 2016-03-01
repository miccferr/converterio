import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import geojsontoosm from 'geojsontoosm';
// import ioDialog from "./helpers/ioDialog";

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


class LoadTab extends React.Component{

  // getInitialState () { return ({text:''}) }
  //
  // onUpdate () {this.setState((value)=> {inputFile:value}) }
  updateState() {
     console.log(this);
     let nuovoStato = this.openFile();
     console.log(nuovoStato);
      this.props.stato=nuovoStato
  }

  openFile () {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: filtersListOpen,
    }, function (fileNames) {
      if (fileNames === undefined) {
        return;
      } else {
        var fileName = fileNames[0];
        console.log(fileName);
        console.log(this);
        return fileName
        // this.props.updateFun(inputFile,fileName)

        // this.inputFileOpen = fileName;
        // this.onUpdate(fileName)

      }
    });
  }

  render() {
  return (
        <div>
          <FlatButton label="Load File" onClick={this.updateState.bind(this)} openfile={this.openFile.bind(this)}  />
          {/*<FlatButton label="Load File" onClick={()=> console.log(this.props.stato)}  />*/}
          <p><span>File loaded {console.log(this.props.stato) } </span></p>
        </div>
      );
    }
};



export default LoadTab


// <Tab label="Item Two" >
//   <div>
//     <h2 style={styles.headline}>Tab Two</h2>
//     <p>
//       This is another example tab.
//     </p>
//   </div>
// </Tab>
// <Tab
//   label="onActive"
//   route="/home"
//   onActive={handleActive}
// >
//   <div>
//     <h2 style={styles.headline}>Tab Three</h2>
//     <p>
//       This is a third example tab.
//     </p>
//   </div>
// </Tab>
