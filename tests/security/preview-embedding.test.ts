import { describe, expect, it } from 'vitest';

import { frameAncestorsFor } from '../../src/server/security/headers.js';

describe('PREVIEW-SEC-001 AI Studio framing', () => {
  it('allows only self normally', () => {
    expect(frameAncestorsFor(false)).toEqual(["'self'"]);
  });

  it('allows AI Studio only in preview mode', () => {
    expect(frameAncestorsFor(true)).toEqual([
      "'self'",
      'https://aistudio.google.com',
    ]);
  });

  it('never allows wildcard framing', () => {
    expect(frameAncestorsFor(true)).not.toContain('*');
  });
});
