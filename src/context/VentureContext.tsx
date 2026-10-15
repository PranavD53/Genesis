import React, { createContext, useContext, useState } from 'react';
import {
  VentureState,
  VentureEvolutionStage,
  StartupDetails,
  ProblemDetails,
  SolutionDetails,
  TargetCustomerDetails
} from '../types/venture';
import { initialMockVentureState, emptyVentureState } from '../data/mockVentureData';
import { submitVentureInput, refineVentureField } from '../services/api';

interface VentureContextType {
  venture: VentureState;
  currentStage: VentureEvolutionStage;
  isProcessing: boolean;
  setStage: (stage: VentureEvolutionStage) => void;
  updateStartupDetails: (details: Partial<StartupDetails>) => void;
  updateProblem: (problem: Partial<ProblemDetails>) => void;
  updateSolution: (solution: Partial<SolutionDetails>) => void;
  updateTargetCustomers: (customers: Partial<TargetCustomerDetails>) => void;
  submitInitialFlow: () => Promise<void>;
  refineContext: (fieldName: string, newValue: string) => Promise<void>;
  resetVenture: (targetStage?: VentureEvolutionStage) => void;
  loadDemoVenture: () => void;
}

const VentureContext = createContext<VentureContextType | undefined>(undefined);

export const VentureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [venture, setVenture] = useState<VentureState>(emptyVentureState);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const setStage = (stage: VentureEvolutionStage) => {
    setVenture(prev => ({ ...prev, currentStage: stage }));
  };

  const updateStartupDetails = (details: Partial<StartupDetails>) => {
    setVenture(prev => ({
      ...prev,
      startupDetails: { ...prev.startupDetails, ...details }
    }));
  };

  const updateProblem = (problem: Partial<ProblemDetails>) => {
    setVenture(prev => ({
      ...prev,
      problem: { ...prev.problem, ...problem }
    }));
  };

  const updateSolution = (solution: Partial<SolutionDetails>) => {
    setVenture(prev => ({
      ...prev,
      solution: { ...prev.solution, ...solution }
    }));
  };

  const updateTargetCustomers = (customers: Partial<TargetCustomerDetails>) => {
    setVenture(prev => ({
      ...prev,
      targetCustomers: { ...prev.targetCustomers, ...customers }
    }));
  };

  const submitInitialFlow = async () => {
    setIsProcessing(true);
    try {
      const updatedVenture = await submitVentureInput({
        startupDetails: venture.startupDetails,
        problem: venture.problem,
        solution: venture.solution,
        targetCustomers: venture.targetCustomers
      });
      setVenture({ ...updatedVenture, currentStage: 'dna' });
    } catch (err) {
      console.error('Failed to submit initial flow:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const refineContext = async (fieldName: string, newValue: string) => {
    setIsProcessing(true);
    try {
      const updated = await refineVentureField(venture, fieldName, newValue);
      setVenture(updated);
    } catch (err) {
      console.error('Failed to refine field:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetVenture = (targetStage: VentureEvolutionStage = 'opening') => {
    setVenture({
      ...emptyVentureState,
      currentStage: targetStage
    });
  };

  const loadDemoVenture = () => {
    setVenture({
      ...initialMockVentureState,
      currentStage: 'dna'
    });
  };


  return (
    <VentureContext.Provider
      value={{
        venture,
        currentStage: venture.currentStage,
        isProcessing,
        setStage,
        updateStartupDetails,
        updateProblem,
        updateSolution,
        updateTargetCustomers,
        submitInitialFlow,
        refineContext,
        resetVenture,
        loadDemoVenture
      }}
    >
      {children}
    </VentureContext.Provider>
  );
};

export const useVenture = () => {
  const context = useContext(VentureContext);
  if (!context) throw new Error('useVenture must be used within a VentureProvider');
  return context;
};
