import ReactFauxDom from 'react-faux-dom';
import React, { Component, PropTypes } from 'react';
import { transformVizNode } from '../d3helpers';

class D3Viz extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, chartType, zoomLevel, d3Table, searchTerms } = this.props;
    // //--- D3 LOGIC -----////
    // The canvas for the tree//
    const fauxNode = ReactFauxDom.createElement('div');
    transformVizNode(fauxNode, data, chartType, zoomLevel, d3Table, searchTerms);
    return fauxNode.toReact();
  }
}

D3Viz.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default D3Viz;
