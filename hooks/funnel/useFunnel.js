// useFunnel.js

import React, { useState, isValidElement } from 'react';

export function useFunnel(initialStep) {
  const [stepHistory, setStepHistory] = useState([initialStep]);

  const currentStep = stepHistory[stepHistory.length - 1];

  const setStep = nextStep => {
    setStepHistory([...stepHistory, nextStep]);
  };

  const goBack = () => {
    if (stepHistory.length > 1) {
      setStepHistory(stepHistory.slice(0, -1));
    }
  };

  const Step = ({ name, children }) => {
    return <>{children}</>;
  };

  const Funnel = ({ children }) => {
    const currentChild = React.Children.toArray(children).find(
      child => isValidElement(child) && child.props.name === currentStep,
    );
    return currentChild || null;
  };

  Funnel.Step = Step;

  return { Funnel, setStep, goBack, currentStep };
}
