import React from 'react'
import NotEnoughEnergy from './NotEnoughEnergy'
import EnergyPaid from './EnergyPaid'
import CostPaid from './CostPaid'
import AICostPaid from './AI/AICostPaid'
import CustomDialog from './CustomDialog'
import TemplateDialog from './TemplateDialog'
import DamagedPalAI from './DamagedPalAI'
import DamagedPalHuman from './DamagedPalHuman'
import StatusApplied from './StatusApplied'
import StatusNotApplied from './StatusNotApplied'
import StatusNotAppliedHuman from './StatusNotAppliedHuman'
import StatusAppliedHuman from './StatusAppliedHuman'
import Cleanup from './Cleanup'
import SwitchingTurns from './SwitchingTurns'
import { PLAYERS } from '../../consts/consts'

export const DIALOGS = {
  NOT_ENOUGH_ENERGY: 'NOT_ENOUGH_ENERGY',
  ENERGY_PAID: 'ENERGY_PAID',
  AI_COST_PAID: 'AI_COST_PAID',

  DAMAGED_PAL_AI: 'DAMAGED_PAL_AI',
  DAMAGED_PAL_HUMAN: 'DAMAGED_PAL_HUMAN',

  STATUS_APPLIED: 'STATUS_APPLIED',
  STATUS_APPLIED_HUMAN: 'STATUS_APPLIED_HUMAN',
  STATUS_NOT_APPLIED: 'STATUS_NOT_APPLIED',
  STATUS_NOT_APPLIED_HUMAN: 'STATUS_NOT_APPLIED_HUMAN',

  CLEANUP: 'CLEANUP',
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
    STATUS_APPLIED,
    STATUS_APPLIED_HUMAN,
    STATUS_NOT_APPLIED,
    STATUS_NOT_APPLIED_HUMAN,
    CLEANUP,
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
    // [statusPhase]
    case STATUS_APPLIED:
      console.log('Dialog: Status applied', current)
      return <StatusApplied />
    case STATUS_APPLIED_HUMAN:
      console.log('Dialog: Status applied Human', current)
      return <StatusAppliedHuman />
    case STATUS_NOT_APPLIED:
      console.log('Dialog: Status Not applied', current)
      return <StatusNotApplied />
    case STATUS_NOT_APPLIED_HUMAN:
      console.log('Dialog: Status Not applied Human', current)
      return <StatusNotAppliedHuman />
    // [cleanupPhase]
    case CLEANUP:
      console.log('Dialog: Status applied', current)
      return <Cleanup />
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
