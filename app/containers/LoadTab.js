import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import geojsontoosm from 'geojsontoosm';
import ioDialog from "./helpers/ioDialog";


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props.route} was activated.`);
}

const LoadTab = React.createClass({
getInitialState() { return ({text:''}) },
onUpdate() {this.setState((value)=> {text:value}) },
render() {
return (
      <div>
        <FlatButton label="Load File" onClick={ioDialog.openFile}  />
        <p><span>File loaded {  ioDialog.inputFileOpen }</span></p>
      </div>
    );
  }
});



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
