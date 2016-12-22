// const React = require('react');
// const expect = require('chai').expect;
// const assert = require('chai').assert;
// const sinon = require('sinon');
// const { shallow } = require('enzyme');
// const SettingsMenu = require('./../src/components/SettingsMenu');

// describe('SettingsMenu', () => {
//     let wrapper, spyOnClick;
//     let settings = {
//       containersViz: true,
//       actionCreatorsViz: true,
//       reducersViz: true,
//       transactionLog: true,
//       logFrozen: false,
//       chartType: 'fancyTree',
//       zoomLevel: 1,
//       recentFilter: false,
//     }

//     before(() => {
//       spyOnClick = sinon.spy();
//       wrapper = shallow(<SettingsMenu toggleSettings={spyOnClick} settings={settings} />);
//     });

//     it('renders a <Collapsible> with the titleString "Settings &#9660"', () => {
//       expect(wrapper.type()).to.equal('Collapsible');
//       expect(wrapper.props().titleString).to.equal('Settings &#9660');
//     });

//     it('should invoke toggleSettings on click and toggle false settings to be true', () => {
//       wrapper.find('.disabledSetting').simulate('click');
//       expect(settings.logFrozen).to.be.true;
//       expect(settings.recentFilter).to.be.true;
//     });

//     it('should invoke toggleSettings on click and toggle true settings to be false', () => {
//       wrapper.find('.enabledSetting').simulate('click');
//       expect(settings.containersViz).to.be.false;
//       expect(settings.actionCreatorsViz).to.be.false;
//       expect(settings.reducersViz).to.be.false;
//       expect(settings.transactionLog).to.be.false;
//       expect(settings.logFrozen).to.be.false;
//       expect(settings.recentFilter).to.be.false;
//     });

// });
