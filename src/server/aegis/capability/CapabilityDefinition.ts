export interface CapabilityDefinition {
  id: string;
  requiredExports: readonly string[];
  requiredConfig: readonly string[];
  requiredTestIds: readonly string[];
  requiredEvidenceKinds: readonly string[];
}
