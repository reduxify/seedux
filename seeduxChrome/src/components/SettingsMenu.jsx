import React, {PropTypes} from 'react';
import Collapsible from './Collapsible';

function getSettingsClass(setting) {
  return setting ? 'activeSetting' : 'disabledSetting';
}

function saveSettings(settings) {
  console.log('Saving settings: ', settings);
  localStorage.setItem('seeduxSettings', JSON.stringify(settings));
}

const SettingsMenu = ({ toggleSettings, settings }) => {

  return (
    <div className = 'settings-menu'>
      <Collapsible titleString = 'Settings'>
        <ul>
          <li className = 'menu-line'><button className = { getSettingsClass(settings.containersViz) } onClick = { toggleSettings } id = 'containersViz'> Containers Visualization </button></li>
          <li className = 'menu-line'><button className = { getSettingsClass(settings.actionCreatorsViz) } onClick = { toggleSettings } id = 'actionCreatorsViz'> Action Creators Visualization </button></li>
          <li className = 'menu-line'><button className = { getSettingsClass(settings.reducersViz) } onClick = { toggleSettings } id = 'reducersViz'> Reducers Visualization </button></li>
          <li className = 'menu-line'><button className = { getSettingsClass(settings.transactionLog) } onClick = { toggleSettings } id = 'transactionLog'> Store Transaction Log </button></li>
          <li className = 'menu-line'><button className = { getSettingsClass(settings.logFrozen) } onClick = { toggleSettings } id = 'logFrozen'> Freeze Log </button></li>
          <li className = 'menu-line'><button className = 'btn-save-settings' onClick = { () => saveSettings(settings) }> Save Settings as Default </button></li>
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
