import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

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
