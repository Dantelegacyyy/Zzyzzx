export class DocumentIntelligenceEngine {
  static async extract(fileBuffer: Buffer, mimeType: string) {
    return { status: 'SUCCEEDED', extractedText: 'simulated' };
  }
}
