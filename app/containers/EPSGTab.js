import React from 'react';
import {Typeahead} from 'react-typeahead';


export default class EPSGTab extends React.Component {

  render() {
    const epsg_descrArr =  []
    this.props.epsgData.map( (item) =>  epsg_descrArr.push(item.li_elem) )
    return ( <div>
      <Typeahead
        options={epsg_descrArr}
        maxVisible={20}
      />
    </div>
    )
  };
};
