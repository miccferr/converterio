import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import {LoadTab, SaveTab} from './FsTab';
import EPSGTab from './EPSGTab';


// import {Typeahead} from 'react-typeahead';
// import json from "../data/epsg.json";
//
// const epsg_descrArr =  []
// json.results.collection1.map( (item) =>  epsg_descrArr.push(item.li_elem) )




// const optionChosen;

const TabsMenu = React.createClass({
  getInitialState()  {
      return ({
          epsg: '4362'
      });
  },

  onUpdate(val) {
    console.log('loggin the root Component', this.state.data);
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
// <Tab label="Menu">
//   <EPSGTab />
//   </Tab>
