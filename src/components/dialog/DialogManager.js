import React from 'react'
import NotEnoughEnergy from './NotEnoughEnergy'
import EnergyPaid from './EnergyPaid'
import CostPaid from './CostPaid'
import AICostPaid from './AI/AICostPaid'
import DamageDealtToAI from './DamageDealtToAI'
import CustomDialog from './CustomDialog'
import TemplateDialog from './TemplateDialog'

export const DIALOGS = {
  NOT_ENOUGH_ENERGY: 'NOT_ENOUGH_ENERGY',
  ENERGY_PAID: 'ENERGY_PAID',

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
  switch (current) {
    // [payphase]
    case DIALOGS.NOT_ENOUGH_ENERGY:
      console.log('Dialog: Not enough energy', current)
      return <NotEnoughEnergy />
    case DIALOGS.ENERGY_PAID:
      console.log('Dialog: Energy paid', current)
      return <EnergyPaid />
    case DIALOGS.COST_PAID_SUCCESS:
      console.log('Dialog: Cost paid success', current)
      return <CostPaid />
    case DIALOGS.AI_COST_PAID:
      console.log('Dialog: AI cost paid', current)
      return <AICostPaid />
    // [dmgPhase]
    case DIALOGS.DAMAGE_DEALT_TO_AI:
      console.log('Dialog: Damage dealt to AI', current)
      return <DamageDealtToAI />
    // [other]
    case DIALOGS.CUSTOM:
      console.log(`Dialog: Custom: ${current}`)
      return <CustomDialog />
    case DIALOGS.TEMPLATE:
      console.log(`Dialog: Template: ${current}`)
      return <TemplateDialog />
    default:
      console.log(`Unknown dialog to display: ${current}`, current)
  }
}

// function DialogManager({current}) {
//   return <>{decideDialog(current)}</>
// }
function DialogManager({ current }) {
  return decideDialog(current)
}

export default DialogManager
