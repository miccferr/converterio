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

  render() {
  return (

        <div>
          <FlatButton label="Load File" onClick={this.props.nomeCaricato}  />
          <p><span>File loaded {+ this.props } </span></p>
        </div>
      );
    }
};



export default LoadTab;
