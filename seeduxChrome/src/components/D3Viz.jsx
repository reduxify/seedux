import ReactFauxDom from 'react-faux-dom';
import React, { Component, PropTypes } from 'react';
import { transformVizNode } from '../d3helpers';

class D3Viz extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, chartType, zoomLevel, d3Table, searchTerms, recentFilter } = this.props;
    console.log(searchTerms);
    // Helper function that manipulates a faux DOM node to create the D3 visualization
    const fauxNode = ReactFauxDom.createElement('div');
    transformVizNode(fauxNode, data, chartType, zoomLevel, d3Table, searchTerms, recentFilter);
    return fauxNode.toReact();
  }
}

D3Viz.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default D3Viz;
