import React from 'react';
import {Typeahead} from 'react-typeahead';


export default class EPSGTab extends React.Component {

  render() {
    const epsg_descrArr =  []
    this.props.epsgData.map( (item) =>  epsg_descrArr.push(item.li_elem) )
    return (
      <div>
      <Typeahead
        ref='crs'
        options={epsg_descrArr}
        maxVisible={20}
        onOptionSelected={(opz)=>{this.props.optionChosen=opz;}}
      />

    </div>
    )
  };
};


// 0: Object
// epsg_code: "2000"
// epsg_description: "Anguilla 1957 / British West Indies Grid"
// index: 1
// li_elem: "EPSG:2000: Anguilla 1957 / British West Indies Grid"
// url: "http://spatialreference.org/ref/epsg/?page=1"
