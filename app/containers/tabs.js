import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import {LoadTab, SaveTab} from './FsTab';
import EPSGTab from './EPSGTab';
import json from "../data/epsg.json";
const data = json.results.collection1



const TabsMenu = () => (
  <Tabs>
    <Tab label="Load File" >
      <LoadTab />
    </Tab>
    <Tab label="Reproject" >
      <EPSGTab epsgData={data} />
    </Tab>
    <Tab label="Save File">
      <SaveTab />
    </Tab>
  </Tabs>
);

export default TabsMenu;
// <Tab label="Menu">
//   <EPSGTab />
//   </Tab>
