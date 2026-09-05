import React from 'react';

/**
 * Purged per Order 66 zero-distraction policy.
 * Permanently disabled: no floating AEGIS walkthrough overlays or badge widgets.
 */
export interface AegisFeatureHighlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  securityNote: string;
  icon?: React.ReactNode;
  badge: string;
}

interface AegisGuardianCharacterProps {
  autoTriggerStep?: string;
}

export const AegisGuardianCharacter: React.FC<AegisGuardianCharacterProps> = () => {
  return null;
};
