export class OcrIntelligenceEngine {
  static async extract(imageBuffer: Buffer) {
    return { status: 'SUCCEEDED', text: 'ocr simulated', confidence: 0.9 };
  }
}
