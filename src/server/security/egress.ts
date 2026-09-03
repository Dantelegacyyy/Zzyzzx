/* eslint-disable preserve-caught-error */
export class DestinationRegistry {
  static allowedDomains = new Set([
    'generativelanguage.googleapis.com',
    'canvas.instructure.com',
  ]);

  static isAllowed(domain: string) {
    return this.allowedDomains.has(domain);
  }
}

export class EgressBudget {
  static maxRequestsPerMinute = 100;
  static currentRequests = 0;
}

export class SsrfGuard {
  static validateUrl(urlString: string) {
    try {
      const url = new URL(urlString);
      if (url.protocol !== 'https:') throw new Error('HTTPS required');
      if (!DestinationRegistry.isAllowed(url.hostname))
        throw new Error('Destination not in registry');
      // basic block list
      if (
        url.hostname === 'localhost' ||
        url.hostname === '127.0.0.1' ||
        url.hostname === '169.254.169.254'
      ) {
        throw new Error('Blocked internal IP');
      }
      return url;
    } catch (e) {
      throw new Error(`SSRF Guard Blocked Request: ${e}`);
    }
  }
}
