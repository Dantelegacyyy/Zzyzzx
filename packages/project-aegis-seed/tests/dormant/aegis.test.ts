import { describe, it, expect } from 'vitest';
import { AEGIS_PHASE_2_STATE } from '../../src/core/AegisStateMachine.js';

describe('AEGIS-DORM-001', () => {
  it('should maintain dormant seed state', () => {
    expect(AEGIS_PHASE_2_STATE.lifecycle).toBe('DORMANT_SEED');
    expect(AEGIS_PHASE_2_STATE.runtimeConnected).toBe(false);
  });
});
