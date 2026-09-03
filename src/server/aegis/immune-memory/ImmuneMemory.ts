export interface GuardianObservation {
  eventId: string;
  source: string;
  eventType: string;
  observedAt: string;
  resourceId: string;
  indicators: readonly string[];
  integritySignals: readonly string[];
  authenticationSignals: readonly string[];
  networkSignals: readonly string[];
  confidenceInputs: readonly number[];
}

export class ImmuneMemory {
  private permanentRecords = new Set<string>([
    'AEGIS-036 SECURITY_DETECTOR_RESULT_SUPPRESSION',
    'AEGIS-037 FABRICATED_TOOL_EXECUTION_EVIDENCE',
    'AEGIS-038 TEST_COUNT_PADDING',
    'AEGIS-039 MANDATORY_SECURITY_TEST_REMOVAL_DURING_REPAIR',
    'AEGIS-040 MANDATORY_GATE_FAILURE_MASKING',
  ]);

  verifyPermanentRecords() {
    return this.permanentRecords.size === 5;
  }
}
