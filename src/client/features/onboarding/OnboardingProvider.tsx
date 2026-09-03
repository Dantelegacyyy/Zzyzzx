/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { OnboardingStep, CerebroSignatureInput } from './onboardingTypes';
import { getNextStep, getPrevStep, getStepProgress } from './onboardingMachine';

export interface OnboardingData {
  profileName: string;
  university: string;
  canvasConnected: boolean;
  selectedCourses: string[];
  continuousSync: boolean;
  signature: Partial<CerebroSignatureInput>;
  aegisActivated: boolean;
}

const defaultData: OnboardingData = {
  profileName: '',
  university: '',
  canvasConnected: false,
  selectedCourses: [],
  continuousSync: true,
  signature: {},
  aegisActivated: false,
};

interface OnboardingContextType {
  currentStep: OnboardingStep;
  data: OnboardingData;
  progress: number;
  setStep: React.Dispatch<React.SetStateAction<OnboardingStep>>;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

interface OnboardingProviderProps {
  children: ReactNode;
  initialStep?: OnboardingStep;
}

export function OnboardingProvider({
  children,
  initialStep = 'HELLO',
}: OnboardingProviderProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(initialStep);
  const [data, setData] = useState<OnboardingData>(defaultData);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => getNextStep(prev));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => getPrevStep(prev));
  }, []);

  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const progress = getStepProgress(currentStep);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        data,
        progress,
        setStep: setCurrentStep,
        nextStep,
        prevStep,
        updateData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
