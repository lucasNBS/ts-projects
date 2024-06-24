import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  function next() {
    setCurrentStepIndex((pre) => {
      if (pre > steps.length - 1) return pre;

      return pre + 1;
    });
  }

  function back() {
    setCurrentStepIndex((pre) => {
      if (pre <= 0) return pre;

      return pre - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goTo,
    back,
    next,
    steps,
    isFirstStep,
    isLastStep,
  };
}
