import React from 'react';
import {Typeahead} from 'react-typeahead';
import json from "../data/epsg.json";

const epsg_descrArr =  []
json.results.collection1.map( (item) =>  epsg_descrArr.push(item.li_elem) )
console.log(json.results.collection1[0].epsg_code);
// this.onUpdate(item)

export default class EPSGTab extends React.Component {

  render() {

    return (
      <div>
      <Typeahead
        ref='crs'
        options={epsg_descrArr}
        maxVisible={20}
        onOptionSelected={ (item) =>  {
          this.props.updateFun( json.results.collection1.filter(
             (val) =>  {
               if (item == val.li_elem) return val.epsg_code
             }
           )
          )}
         }
      />
    </div>
    )
  };
};
