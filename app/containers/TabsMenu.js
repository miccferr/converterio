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
