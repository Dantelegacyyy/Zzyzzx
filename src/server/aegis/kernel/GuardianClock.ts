export class GuardianClock {
  static now() {
    return new Date().toISOString();
  }
}
