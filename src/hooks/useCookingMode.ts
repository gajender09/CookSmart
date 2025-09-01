import { useState } from "react";
import { CookingStep } from "../types/recipe";

/**
 * Custom hook for guided cooking mode
 */
export const useCookingMode = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [steps, setSteps] = useState<CookingStep[]>([]);

  const startCookingMode = (instructions: string) => {
    // Split instructions into steps
    const instructionSteps = instructions
      .split(/\d+\.|\n/)
      .filter((step) => step.trim().length > 0)
      .map((instruction, index) => ({
        step: index + 1,
        instruction: instruction.trim(),
        isCompleted: false,
      }));

    setSteps(instructionSteps);
    setCurrentStep(0);
    setIsActive(true);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeStep = (stepIndex: number) => {
    setSteps((prev) =>
      prev.map((step, index) =>
        index === stepIndex ? { ...step, isCompleted: true } : step
      )
    );
  };

  const exitCookingMode = () => {
    setIsActive(false);
    setCurrentStep(0);
    setSteps([]);
  };

  const speakInstruction = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return {
    currentStep,
    isActive,
    steps,
    startCookingMode,
    nextStep,
    prevStep,
    completeStep,
    exitCookingMode,
    speakInstruction,
  };
};
