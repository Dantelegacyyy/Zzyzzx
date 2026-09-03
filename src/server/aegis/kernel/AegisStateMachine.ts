export type AegisMode =
  | 'DORMANT'
  | 'LAB_ACTIVE'
  | 'OBSERVE'
  | 'ELEVATED'
  | 'CONTAINMENT'
  | 'ISOLATION'
  | 'RECOVERY'
  | 'OWNER_LOCKED'
  | 'PRODUCTION_ACTIVE';

export const PHASE_2_5_DEFAULT = {
  mode: 'LAB_ACTIVE',
  cerebroProductionConnected: false,
  productionAutomationEnabled: false,
  ownerRootActiveForProduction: false,
  thirdPartyTargetsAllowed: false,
} as const;

export class AegisStateMachine {
  private currentMode: AegisMode = PHASE_2_5_DEFAULT.mode;

  getMode(): AegisMode {
    return this.currentMode;
  }

  transition(newMode: AegisMode, authRef: string): void {
    if (
      newMode === 'PRODUCTION_ACTIVE' &&
      !PHASE_2_5_DEFAULT.ownerRootActiveForProduction
    ) {
      throw new Error('PRODUCTION_ACTIVE is locked until OwnerRoot release.');
    }
    this.currentMode = newMode;
  }
}
