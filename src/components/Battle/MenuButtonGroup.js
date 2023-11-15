import React from 'react';
import { energyEmoji } from '../../consts/consts';
import PropTypes from 'prop-types';
import { useStateContext } from '../../MainContext';

function MenuButtonGroup({ togglePopup }) {
  const contextualState = useStateContext();

  return (
    <div className="font-silkscreen flex w-full justify-between text-white bg-boy-green mx-2">
      <div className="flex items-center justify-center flex-grow p-1">
        {contextualState.game.player.energy} Energy {energyEmoji}
      </div>
      <div className="flex flex-grow justify-around items-center m-1 bg-boy-green">
        <div className="flex flex-col items-center">
          <div
            onClick={togglePopup}
            className="p-1 text-green-200 text-sm cursor-pointer"
          >
            Attack
          </div>
          <div className="p-1 text-green-400 text-sm">
            [(🔒)Items]
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-1 text-sm">[(🔒)PaLs]</div>
          <div className="p-1 text-sm">[(🔒)Options]</div>
        </div>
      </div>
    </div>
  );
}

MenuButtonGroup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
};

export default MenuButtonGroup;
