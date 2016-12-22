import React, {PropTypes} from 'react';
import Collapsible from './Collapsible';

function getSettingsClass(setting) {
  return setting ? 'activeSetting' : 'disabledSetting';
}

function saveSettings(settings) {
  localStorage.setItem('seeduxSettings', JSON.stringify(settings));
}

const SettingsMenu = ({ toggleSettings, settings, chartSelectValue, handleSelectChange }) => {

  return (
      <Collapsible titleString = 'Settings &#9660;' role='drawer'>
        <div className = 'menu-contents'>
        <h4>
          Chart Type
        </h4>
        <select value={chartSelectValue} onChange={handleSelectChange} >
          <option value="fancyTree">Fancy Tree</option>
          <option value="comfyTree">Comfy Tree</option>
        </select>
        <hr />
        <h4>
          Chart Visibility
        </h4>
        <ul>
          <li className = 'menu-line'><button className = { getSettingsClass(settings.containersViz) } onClick = { toggleSettings } id = 'containersViz'> Containers </button></li>
          <li className = 'menu-line'><button className = { getSettingsClass(settings.actionCreatorsViz) } onClick = { toggleSettings } id = 'actionCreatorsViz'> Action Creators </button></li>
          <li className = 'menu-line'><button className = { getSettingsClass(settings.reducersViz) } onClick = { toggleSettings } id = 'reducersViz'> Reducers </button></li>
          <li className = 'menu-line'><button className = { getSettingsClass(settings.recentFilter) } onClick = { toggleSettings } id = 'recentFilter'> Recent Only </button></li>

        </ul>
          <hr></hr>
          <h4>
            Other Options
          </h4>
          <ul>
        <li className = 'menu-line'><button className = { getSettingsClass(settings.transactionLog) } onClick = { toggleSettings } id = 'transactionLog'> Transaction Log </button></li>
          <li className = 'menu-line'><button className = { getSettingsClass(settings.logFrozen) } onClick = { toggleSettings } id = 'logFrozen'> Freeze Log </button></li>
          <li className = 'menu-line'><button className = 'btn-save-settings' onClick = { () => saveSettings(settings) }> Save Defaults </button></li>
        </ul>
      </div>
      </Collapsible>
  );
};

export default SettingsMenu;
