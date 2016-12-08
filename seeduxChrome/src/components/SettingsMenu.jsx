import React, {PropTypes} from 'react';
import Collapsible from './Collapsible';

const SettingsMenu = ({ toggleSettings, settings }) => {
  let containersVizClass, actionCreatorsVizClass, reducersVizClass, transactionLogClass;
  settings.containersViz ? containersVizClass = 'activeSetting' : containersVizClass = 'disabledSetting';
  settings.actionCreatorsViz ? actionCreatorsVizClass = 'activeSetting' : actionCreatorsVizClass = 'disabledSetting';
  settings.reducersViz ? reducersVizClass = 'activeSetting' : reducersVizClass = 'disabledSetting';
  settings.transactionLog ? transactionLogClass = 'activeSetting' : transactionLogClass = 'disabledSetting';
  
  return (
    <div className = 'settings-menu'>
      <Collapsible titleString = 'Settings'>
        <ul>
          <li className = 'menu-line'><button className = { containersVizClass } onClick = { (e) => toggleSettings(e) } id = 'containersViz'> Containers Visualization </button></li>
          <li className = 'menu-line'><button className = { actionCreatorsVizClass } onClick = { (e) => toggleSettings(e) } id = 'actionCreatorsViz'> Action Creators Visualization </button></li>
          <li className = 'menu-line'><button className = { reducersVizClass } onClick = { (e) => toggleSettings(e) } id = 'reducersViz'> Reducers Visualization </button></li>
          <li className = 'menu-line'><button className = { transactionLogClass } onClick = { (e) => toggleSettings(e) } id = 'transactionLog'> Store Transaction Log </button></li>
        </ul>
      </Collapsible>
    </div>
  );
};

// SettingsMenu.propTypes = {
//   toggleSettings: PropTypes.func.isRequired,
//   settings: PropTypes.objectOf(PropTypes.shape({
//     containersViz: PropTypes.bool.isRequired,
//     actionCreatorsViz: PropTypes.bool.isRequired,
//     reducersViz: PropTypes.bool.isRequired,
//     transactionLog: PropTypes.bool.isRequired
//   }).isRequired).isRequired
// };

export default SettingsMenu;