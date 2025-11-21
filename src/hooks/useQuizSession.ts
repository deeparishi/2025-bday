import { useState, useEffect } from 'react';

interface QuizState {
  currentQuestionIndex: number;
  score: number;
  attempts: number;
  userAnswers: (string | string[])[];
}

const STORAGE_KEY = 'quiz_state';

export const useQuizSession = () => {
  const [quizState, setQuizState] = useState<QuizState>(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      currentQuestionIndex: 0,
      score: 0,
      attempts: 0,
      userAnswers: []
    };
  });

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(quizState));
  }, [quizState]);

  const updateQuizState = (updates: Partial<QuizState>) => {
    setQuizState(prev => ({ ...prev, ...updates }));
  };

  const resetQuiz = () => {
    const initialState = {
      currentQuestionIndex: 0,
      score: 0,
      attempts: 0,
      userAnswers: []
    };
    setQuizState(initialState);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
  };

  return {
    quizState,
    updateQuizState,
    resetQuiz
  };
};
