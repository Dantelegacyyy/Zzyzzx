import React from 'react';
import { ScreenHello } from '../../../../features/onboarding/components/ScreenHello';

export function HelloScreen(props: { onNext?: () => void; onBegin?: () => void }) {
  return <ScreenHello {...props} />;
}

export default HelloScreen;
