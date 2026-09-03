import { AegisStateMachine } from './AegisStateMachine.js';
import { GuardianDecision } from './GuardianDecision.js';

export class AegisKernel {
  private stateMachine = new AegisStateMachine();

  ingestDecision(decision: GuardianDecision): void {
    // Fails closed if unauthorized
    if (
      decision.requiresOwnerApproval &&
      this.stateMachine.getMode() !== 'OWNER_LOCKED'
    ) {
      this.stateMachine.transition('OWNER_LOCKED', 'kernel_safeguard');
    }
  }
}
