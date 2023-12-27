import React from 'react'
import NotEnoughEnergy from './NotEnoughEnergy'
import EnergyPaid from './EnergyPaid'
import CostPaid from './CostPaid'
import AICostPaid from './AI/AICostPaid'
import CustomDialog from './CustomDialog'
import TemplateDialog from './TemplateDialog'
import DamagedPalAI from './DamagedPalAI'
import DamagedPalHuman from './DamagedPalHuman'
import StatusAppliedAI from './StatusAppliedAI'
import StatusNotAppliedAI from './StatusNotAppliedAI'
import StatusNotAppliedHuman from './StatusNotAppliedHuman'
import StatusAppliedHuman from './StatusAppliedHuman'
import Cleanup from './Cleanup'
import SwitchingTurns from './SwitchingTurns'
import { PLAYERS } from '../../consts/consts'
import MissedAttack from './MissedAttack'

export const DIALOGS = {
  NOT_ENOUGH_ENERGY: 'NOT_ENOUGH_ENERGY',
  ENERGY_PAID: 'ENERGY_PAID',
  AI_COST_PAID: 'AI_COST_PAID',

  DAMAGED_PAL_AI: 'DAMAGED_PAL_AI',
  DAMAGED_PAL_HUMAN: 'DAMAGED_PAL_HUMAN',
  MISSED_ATTACK_AI: 'MISSED_ATTACK_AI',
  MISSED_ATTACK_HUMAN: 'MISSED_ATTACK_HUMAN',

  STATUS_APPLIED_AI: 'STATUS_APPLIED_AI',
  STATUS_APPLIED_HUMAN: 'STATUS_APPLIED_HUMAN',
  STATUS_NOT_APPLIED_AI: 'STATUS_NOT_APPLIED_AI',
  STATUS_NOT_APPLIED_HUMAN: 'STATUS_NOT_APPLIED_HUMAN',

  CLEANUP_AI: 'CLEANUP_AI',
  CLEANUP_HUMAN: 'CLEANUP_HUMAN',

  SWITCHTURNS_TO_AI: 'SWITCHTURNS_TO_AI',
  SWITCHINGTURNS_TO_HUMAN: 'SWITCHINGTURNS_TO_HUMAN',

  COST_PAID_SUCCESS: 'COST_PAID_SUCCESS',
  AI_MOVE_COST_PAID: 'AI_COST_PAID',
  ERROR_INVALID_MOVE: 'ERROR_INVALID_MOVE',
  CONFIRMATION: 'CONFIRMATION',
  DAMAGE_DEALT: 'DAMAGE_DEALT',
  TARGET_FAINTED: 'TARGET_FAINTED',
  ERROR_INVALID_ACTION: 'ERROR_INVALID_ACTION',

  STATUS_EFFECT_APPLIED: 'STATUS_EFFECT_APPLIED',
  STATUS_EFFECT_FAILED: 'STATUS_EFFECT_FAILED',
  CLEANUP_EFFECTS: 'CLEANUP_EFFECTS',

  CUSTOM: 'CUSTOM',
  TEMPLATE: 'TEMPLATE',
}
const decideDialog = (current) => {
  const {
    NOT_ENOUGH_ENERGY,
    ENERGY_PAID,
    COST_PAID_SUCCESS,
    AI_COST_PAID,

    DAMAGED_PAL_AI,
    DAMAGED_PAL_HUMAN,
    MISSED_ATTACK_AI,
    MISSED_ATTACK_HUMAN,

    STATUS_APPLIED_AI,
    STATUS_APPLIED_HUMAN,
    STATUS_NOT_APPLIED_AI,
    STATUS_NOT_APPLIED_HUMAN,

    CLEANUP_AI,
    CLEANUP_HUMAN,

    SWITCHTURNS_TO_AI,
    CUSTOM,
    TEMPLATE,
  } = DIALOGS

  switch (current) {
    // [payphase]
    case NOT_ENOUGH_ENERGY:
      console.log('Dialog: Not enough energy', current)
      return <NotEnoughEnergy />
    case ENERGY_PAID:
      console.log('Dialog: Energy paid', current)
      return <EnergyPaid />
    case COST_PAID_SUCCESS:
      console.log('Dialog: Cost paid success', current)
      return <CostPaid />
    case AI_COST_PAID:
      console.log('Dialog: AI cost paid', current)
      return <AICostPaid />
    // [dmgPhase]
    case DAMAGED_PAL_AI:
      console.log('Dialog: Damage dealt to AI Pal', current)
      return <DamagedPalAI />
    case DAMAGED_PAL_HUMAN:
      console.log('Dialog: Damage dealt to HUMAN Pal', current)
      return <DamagedPalHuman />
    case MISSED_ATTACK_HUMAN:
      console.log('Dialog: Missed attack', current)
      return <MissedAttack player={PLAYERS.HUMAN} />
    case MISSED_ATTACK_AI:
      console.log('Dialog: Missed attack', current)
      return <MissedAttack player={PLAYERS.AI} />
    // [statusPhase]
    case STATUS_APPLIED_AI:
      console.log('Dialog: Status applied', current)
      return <StatusAppliedAI />
    case STATUS_APPLIED_HUMAN:
      console.log('Dialog: Status applied Human', current)
      return <StatusAppliedHuman />
    case STATUS_NOT_APPLIED_AI:
      console.log('Dialog: Status Not applied', current)
      return <StatusNotAppliedAI />
    case STATUS_NOT_APPLIED_HUMAN:
      console.log('Dialog: Status Not applied Human', current)
      return <StatusNotAppliedHuman />
    // [cleanupPhase]
    case CLEANUP_AI:
      console.log('Dialog: Status applied', current)
      return <Cleanup player={PLAYERS.AI} />
    case CLEANUP_HUMAN:
      console.log('Dialog: Status applied', current)
      return <Cleanup player={PLAYERS.HUMAN} />
    // [endPhase]
    case SWITCHTURNS_TO_AI:
      console.log('Dialog: Status applied', current)
      return <SwitchingTurns whosTurn={PLAYERS.AI} />
    // [other]
    case CUSTOM:
      console.log(`Dialog: Custom: ${current}`)
      return <CustomDialog />
    case TEMPLATE:
      console.log(`Dialog: Template: ${current}`)
      return <TemplateDialog />
    default:
      console.log(`Unknown dialog to display: ${current}`, current)
  }
}

// change to one
function DialogManager({ current }) {
  return decideDialog(current)
}

export default DialogManager
