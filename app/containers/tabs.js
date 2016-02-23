import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import {LoadTab, SaveTab} from './FsTab';
import EPSGTab from './EPSGTab';

const TabsMenu = React.createClass({
  getInitialState()  {
      return ({
          epsg: ''
      });
  },

  onUpdate(val) {
      this.setState({
          epsg: val
      });

  },

  render() {
    return (
          <Tabs>
            <Tab label="Load File" >
              <LoadTab />
            </Tab>
            <Tab label="Reproject" >
              <EPSGTab updateFun={this.onUpdate}/>
            </Tab>
            <Tab label="Save File" >
              <SaveTab epsg={this.state.epsg} />
            </Tab>
          </Tabs>
        )
  }
})

export default TabsMenu;
