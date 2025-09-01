import React from "react";
import { ChevronLeft, ChevronRight, X, Volume2, Check } from "lucide-react";
import { CookingStep } from "../types/recipe";

interface CookingModeViewProps {
  steps: CookingStep[];
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onCompleteStep: (stepIndex: number) => void;
  onExit: () => void;
  onSpeak: (text: string) => void;
}

/**
 * Guided cooking mode with step-by-step navigation
 */
export const CookingModeView: React.FC<CookingModeViewProps> = ({
  steps,
  currentStep,
  onNextStep,
  onPrevStep,
  onCompleteStep,
  onExit,
  onSpeak,
}) => {
  const current = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  if (!current) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white">Cooking Mode</h2>
          <div className="text-sm text-gray-300">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        <button
          onClick={onExit}
          className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full text-center">
          {/* Step Number */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 text-white rounded-full text-2xl font-bold mb-8 shadow-lg">
            {current.step}
          </div>

          {/* Instruction */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-8">
            <p className="text-2xl lg:text-3xl text-gray-900 dark:text-gray-100 leading-relaxed font-medium">
              {current.instruction}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => onSpeak(current.instruction)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Volume2 className="w-5 h-5" />
              Read Aloud
            </button>

            <button
              onClick={() => onCompleteStep(currentStep)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                current.isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30"
              }`}
            >
              <Check className="w-5 h-5" />
              {current.isCompleted ? "Completed" : "Mark Complete"}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-6 bg-gray-800 border-t border-gray-700">
        <button
          onClick={onPrevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl font-semibold transition-colors duration-200 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="text-white text-lg font-semibold">
          {Math.round(progress)}% Complete
        </div>

        <button
          onClick={onNextStep}
          disabled={currentStep === steps.length - 1}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl font-semibold transition-colors duration-200 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
