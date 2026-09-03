export class AiGate {
  private static concurrencyLimit = 5;
  private static currentConcurrent = 0;
  private static circuitOpen = false;
  private static circuitCooldownMs = 30000;
  private static lastFailureTime = 0;

  static async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.circuitOpen) {
      const now = Date.now();
      if (now - this.lastFailureTime > this.circuitCooldownMs) {
        // Half-open recovery
        this.circuitOpen = false;
      } else {
        throw new Error('AI_GATE_CIRCUIT_OPEN');
      }
    }

    if (this.currentConcurrent >= this.concurrencyLimit) {
      throw new Error('AI_GATE_CONCURRENCY_LIMIT_REACHED');
    }

    this.currentConcurrent++;
    try {
      const result = await operation();
      return result;
    } catch (error) {
      this.lastFailureTime = Date.now();
      this.circuitOpen = true;
      throw error;
    } finally {
      this.currentConcurrent--;
    }
  }
}
