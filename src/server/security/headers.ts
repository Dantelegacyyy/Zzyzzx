import helmet from 'helmet';
import { ENV } from '../config/env.js';

export function frameAncestorsFor(aiStudioPreview: boolean): string[] {
  return aiStudioPreview
    ? ["'self'", 'https://aistudio.google.com']
    : ["'self'"];
}

export function securityHeaders() {
  console.log('ALLOW_PREVIEW:', ENV.AI_STUDIO_PREVIEW_EMBED);
  const allowAiStudioPreview = ENV.AI_STUDIO_PREVIEW_EMBED;

  return helmet({
    xFrameOptions: allowAiStudioPreview
      ? false
      : {
          action: 'sameorigin',
        },

    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],

        baseUri: ["'self'"],

        objectSrc: ["'none'"],

        frameAncestors: frameAncestorsFor(allowAiStudioPreview),

        scriptSrc:
          process.env.NODE_ENV === 'production'
            ? ["'self'"]
            : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],

        scriptSrcAttr: ["'none'"],

        styleSrc: ["'self'", "'unsafe-inline'"],

        imgSrc: ["'self'", 'data:', 'blob:', 'https:'],

        fontSrc: ["'self'", 'data:', 'https:'],

        connectSrc: [
          "'self'",
          'https://identitytoolkit.googleapis.com',
          'https://securetoken.googleapis.com',
          'https://*.googleapis.com',
          'https://*.firebaseio.com',
        ],

        formAction: ["'self'"],
      },
    },

    crossOriginOpenerPolicy: {
      policy: allowAiStudioPreview ? 'same-origin-allow-popups' : 'same-origin',
    },

    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin',
    },

    xContentTypeOptions: true,
  });
}
