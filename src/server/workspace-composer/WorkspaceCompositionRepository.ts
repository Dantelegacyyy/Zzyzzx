import { WorkspaceComposition } from '../../shared/workspace-composer/workspaceComposition.js';

export class WorkspaceCompositionRepository {
  static async save(composition: WorkspaceComposition) {
    // Save to Firestore in real implementation
    console.log('Saved composition', composition);
  }
}
