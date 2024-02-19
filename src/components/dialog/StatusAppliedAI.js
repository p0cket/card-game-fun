import React from 'react';
import DialogTemplate from '../common/DialogTemplate';
import { ATK_PHASES, executeMove } from '../../handlers/moveHandlers';
import { useDispatchContext, useStateContext } from '../../MainContext';

const StatusAppliedAI = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  // Ensure there's a fallback if monsters array is empty or not available
  const enemyStatuses = state.opponent.monsters?.[0]?.status
    ? Object.keys(state.opponent.monsters[0].status).join(', ')
    : 'No statuses applied';

  const dmg_continueOption = {
    label: 'Continue',
    onClick: () => executeMove(dispatch, {
      pal: state.attack.pal,
      move: state.attack.move,
      phase: ATK_PHASES.CLEANUP,
      userSlot: state.attack.userSlot,
      targets: state.attack.targets,
      player: state.attack.player,
    }),
  };

  const status_ok = {
    label: `Great! I landed a status`,
    onClick: () => {
      console.log('statusOptions onClick: state.attack', state.attack);
      executeMove(dispatch, {
        pal: state.attack.pal,
        move: state.attack.move,
        phase: ATK_PHASES.CLEANUP,
        userSlot: state.attack.userSlot,
        targets: state.attack.targets,
        player: state.attack.player,
      });
    },
  };

  const statusNotLand = {
    label: `Status not land. OK`,
    onClick: () => {
      console.log('statusNotLandOptions onClick: start');
      executeMove(dispatch, {
        pal: state.attack.pal,
        move: state.attack.move,
        phase: ATK_PHASES.CLEANUP,
        userSlot: state.attack.userSlot,
        targets: state.attack.targets,
        player: state.attack.player,
      });
    },
  };

  const statusAppliedProps = {
    title: `Status Applied to Enemy`,
    header: `You applied Statuses!`,
    message: `Status applied! Enemy Pal's statuses are now: ${enemyStatuses}`,
    options: [status_ok],
  };

  return <DialogTemplate {...statusAppliedProps} />;
};

export default StatusAppliedAI;
