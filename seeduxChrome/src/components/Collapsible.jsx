import ActionTitle from './ActionTitle';
import SettingsTitle from './SettingsTitle';

// The MIT License (MIT)
//
// Copyright (c) 2016 Glenn Flanagan
// Lifted from 'react-collapsible' on npm and github; slightly modified
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React from 'react';

var Collapsible = React.createClass({

  //Set validation for prop typesTrigger
  propTypes: {
    transitionTime: React.PropTypes.number,
    easing: React.PropTypes.string,
    open: React.PropTypes.bool,
    classParentString: React.PropTypes.string,
    accordionPosition: React.PropTypes.number,
    handleTriggerClick: React.PropTypes.func,
    trigger: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    triggerWhenOpen:React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    lazyRender: React.PropTypes.bool,
    overflowWhenOpen: React.PropTypes.oneOf([
      'hidden',
      'visible',
      'auto',
      'scroll',
      'inherit',
      'initial',
      'unset'
    ])
  },

  //If no transition time or easing is passed then default to this
  getDefaultProps: function() {
    return {
      transitionTime: 400,
      easing: 'linear',
      open: false,
      classParentString: 'Collapsible',
      lazyRender: false,
      overflowWhenOpen: 'hidden'
    };
  },

  //Defaults the dropdown to be closed
  getInitialState: function(){

    if(this.props.open){
      return {
        isClosed: false,
        shouldSwitchAutoOnNextCycle: false,
        height: 'auto',
        transition: 'none',
        hasBeenOpened: true,
        overflow: this.props.overflowWhenOpen
      }
    }
    else{
      return {
        isClosed: true,
        shouldSwitchAutoOnNextCycle: false,
        height: 0,
        transition: 'height ' + this.props.transitionTime + 'ms ' + this.props.easing,
        hasBeenOpened: false,
        overflow: 'hidden'
      }
    }
  },

  // Taken from https://github.com/EvandroLG/transitionEnd/
  // Determines which prefixed event to listen for
  whichTransitionEnd: function(element){
      var transitions = {
          'WebkitTransition' : 'webkitTransitionEnd',
          'MozTransition'    : 'transitionend',
          'OTransition'      : 'oTransitionEnd otransitionend',
          'transition'       : 'transitionend'
      };

      for(var t in transitions){
          if(element.style[t] !== undefined){
              return transitions[t];
          }
      }
  },

  componentDidMount: function() {
    //Set up event listener to listen to transitionend so we can switch the height from fixed pixel to auto for much responsiveness;
    //TODO:  Once Synthetic transitionend events have been exposed in the next release of React move this funciton to a function handed to the onTransitionEnd prop

    this.refs.outer.addEventListener(this.whichTransitionEnd(this.refs.outer), (event) => {
      if(this.state.isClosed === false){
        this.setState({
          shouldSwitchAutoOnNextCycle: true
        });
      }

    });
  },

  componentDidUpdate: function(prevProps) {

    if(this.state.shouldSwitchAutoOnNextCycle === true && this.state.isClosed === false) {
      //Set the height to auto to make compoenent re-render with the height set to auto.
      //This way the dropdown will be responsive and also change height if there is another dropdown within it.
      this.makeResponsive();
    }

    if(this.state.shouldSwitchAutoOnNextCycle === true && this.state.isClosed === true) {
      this.prepareToOpen();
    }

    //If there has been a change in the open prop (controlled by accordion)
    if(prevProps.open != this.props.open) {

      if(this.props.open === true) {
        this.openCollasible();
      }
      else {
        this.closeCollapsible();
      }
    }
  },


  handleTriggerClick: function(event) {

    event.preventDefault();

    if(this.props.handleTriggerClick) {
      this.props.handleTriggerClick(this.props.accordionPosition);
    }
    else{

      if(this.state.isClosed === true){
        this.openCollasible();
      }
      else {
        this.closeCollapsible();
      }
    }

  },

  closeCollapsible: function() {
    this.setState({
      isClosed: true,
      shouldSwitchAutoOnNextCycle: true,
      height: this.refs.inner.offsetHeight,
      overflow: 'hidden',
    });
  },

  openCollasible: function() {
    this.setState({
      height: this.refs.inner.offsetHeight,
      transition: 'height ' + this.props.transitionTime + 'ms ' + this.props.easing,
      isClosed: false,
      hasBeenOpened: true
    });
  },

  makeResponsive: function() {
    this.setState({
      height: 'auto',
      transition: 'none',
      shouldSwitchAutoOnNextCycle: false,
      overflow: this.props.overflowWhenOpen
    });
  },

  prepareToOpen: function() {
    //The height has been changes back to fixed pixel, we set a small timeout to force the CSS transition back to 0 on the next tick.
    window.setTimeout(() => {
      this.setState({
        height: 0,
        shouldSwitchAutoOnNextCycle: false,
        transition: 'height ' + this.props.transitionTime + 'ms ' + this.props.easing
      });
    }, 50);
  },

  render: function () {

    var dropdownStyle = {
      height: this.state.height,
      WebkitTransition: this.state.transition,
      msTransition: this.state.transition,
      transition: this.state.transition,
      overflow: this.state.overflow
    }

    var openClass = this.state.isClosed ? 'is-closed' : 'is-open';

    //If user wants different text when tray is open
    var trigger = (this.state.isClosed === false) && (this.props.triggerWhenOpen !== undefined) ? this.props.triggerWhenOpen : this.props.trigger;

    // Don't render children until the first opening of the Collapsible if lazy rendering is enabled
    var children = this.props.children;
    if(this.props.lazyRender)
      if(!this.state.hasBeenOpened)
          children = null;

    const actionTitle = <ActionTitle clickHandler={this.handleTriggerClick} titleString={this.props.titleString} buttonHandler={this.props.buttonHandler} />
    const settingsTitle = <SettingsTitle clickHandler={this.handleTriggerClick} titleString={this.props.titleString} />

    return(
      <div className={this.props.classParentString}>
        {this.props.titleString.includes('Action') ? actionTitle: settingsTitle}
        <div className={this.props.classParentString + "__contentOuter" } ref="outer" style={dropdownStyle}>
          <div className={this.props.classParentString + "__contentInner"} ref="inner">
            {children}
          </div>
        </div>
      </div>
    );
  }

});

export default Collapsible;
