import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup,
  TextField,
  Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { questions } from '../data/questions';
import { useQuizSession } from '../hooks/useQuizSession';
import { FloatingHeart } from '../components/FloatingHeart';

export const Phase2Quiz = () => {
  const navigate = useNavigate();
  const { quizState, updateQuizState, resetQuiz } = useQuizSession();
  const [fadeState, setFadeState] = useState<'in' | 'visible' | 'out'>('in');
  const [showHeart, setShowHeart] = useState<'correct' | 'incorrect' | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>('');
  const [localAttempts, setLocalAttempts] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = questions[quizState.currentQuestionIndex];
  const isLastQuestion = quizState.currentQuestionIndex === questions.length - 1;

  const moveToNextPhase = () => {
    resetQuiz();
    navigate('/photos');
  };


  useEffect(() => {
    setFadeState('in');
    const timer = setTimeout(() => setFadeState('visible'), 500);
    return () => clearTimeout(timer);
  }, [quizState.currentQuestionIndex]);

  useEffect(() => {
    if (quizState.currentQuestionIndex >= questions.length) {
      setQuizComplete(true);
    }
  }, [quizState.currentQuestionIndex]);

  const checkAnswer = (isCorrect: boolean) => {
    setShowHeart(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      updateQuizState({ score: quizState.score + 1 });
    }

    const newAttempts = localAttempts + 1;
    setLocalAttempts(newAttempts);
    handleHeartComplete(isCorrect, newAttempts);
  };

  const handleHeartComplete = (isCorrect: boolean, attempts: number) => {
    setTimeout(() => {
      setShowHeart(null);

      if (isCorrect || attempts >= 2) {
        setFadeState('out');
        setTimeout(() => {
          if (isLastQuestion) {
            updateQuizState({ currentQuestionIndex: quizState.currentQuestionIndex + 1 });
            setQuizComplete(true);
          } else {
            updateQuizState({ currentQuestionIndex: quizState.currentQuestionIndex + 1 });
            setCurrentAnswer('');
            setLocalAttempts(0);
          }
        }, 500);
      } else {
        setCurrentAnswer('');
      }
    }, 2500);
  };

  const handleSingleSelect = (value: string) => {
    setCurrentAnswer(value);
    setTimeout(() => {
      const isCorrect = value === currentQuestion.answer;
      checkAnswer(isCorrect);
    }, 100);
  };

  const handleMultiSelect = (value: string) => {
    const current = Array.isArray(currentAnswer) ? currentAnswer : [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setCurrentAnswer(updated);
  };

  const handleSubmit = () => {
    if (localAttempts >= 2) return;

    const isCorrect = Array.isArray(currentQuestion.answer)
      ? JSON.stringify((currentAnswer as string[]).sort()) === JSON.stringify(currentQuestion.answer.sort())
      : typeof currentQuestion.answer === 'string' && typeof currentAnswer === 'string'
        ? currentAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim()
        : false;

    setLocalAttempts(prev => prev + 1);
    checkAnswer(isCorrect);
  };

  const handleReplay = () => {
    resetQuiz();
    setQuizComplete(false);
    setCurrentAnswer('');
    setLocalAttempts(0);
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex items-center justify-center p-4">
        <Paper elevation={3} className="p-8 rounded-3xl bg-white max-w-md w-full text-center">
          <h2 className="text-4xl font-bold text-pink-600 mb-4">Quiz Complete! 🎉</h2>
          <p className="text-6xl font-bold text-rose-500 mb-8">
            {quizState.score}/{questions.length}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="outlined"
              onClick={handleReplay}
              sx={{
                borderColor: '#ec4899',
                color: '#ec4899',
                '&:hover': {
                  borderColor: '#db2777',
                  backgroundColor: 'rgba(236, 72, 153, 0.1)'
                }
              }}
            >
              Replay Quiz
            </Button>
            <Button
              variant="contained"
              onClick={moveToNextPhase}
              sx={{
                backgroundColor: '#ec4899',
                '&:hover': {
                  backgroundColor: '#db2777',
                }
              }}
            >
              Next
            </Button>
          </div>
        </Paper>
      </div>
    );
  }

  const getAnimationStyle = () => {
    if (fadeState === 'in') {
      return {
        animation: 'slideInFromTop 0.5s ease-out forwards'
      };
    }
    if (fadeState === 'out') {
      return {
        animation: 'slideOutToBottom 0.5s ease-in forwards'
      };
    }
    return {};
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex items-center justify-center p-4">
      {showHeart && <FloatingHeart type={showHeart} onComplete={() => {}} />}

      <style>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideOutToBottom {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(50px);
          }
        }
      `}</style>

      <Paper
        elevation={3}
        className="p-8 rounded-3xl bg-white max-w-2xl w-full"
        style={getAnimationStyle()}
      >
        <div className="mb-4 text-sm text-pink-500 font-semibold">
          Question {quizState.currentQuestionIndex + 1} of {questions.length}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-8">
          {currentQuestion.question}
        </h2>

        {currentQuestion.type === 'single' && (
          <RadioGroup value={currentAnswer} onChange={(e) => handleSingleSelect(e.target.value)}>
            {currentQuestion.options?.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio sx={{ color: '#ec4899', '&.Mui-checked': { color: '#ec4899' } }} />}
                label={option}
                sx={{ marginBottom: 1 }}
              />
            ))}
          </RadioGroup>
        )}

        {currentQuestion.type === 'multi' && (
          <>
            <FormGroup>
              {currentQuestion.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={Array.isArray(currentAnswer) && currentAnswer.includes(option)}
                      onChange={() => handleMultiSelect(option)}
                      sx={{ color: '#ec4899', '&.Mui-checked': { color: '#ec4899' } }}
                    />
                  }
                  label={option}
                  sx={{ marginBottom: 1 }}
                />
              ))}
            </FormGroup>
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={handleSubmit}
              disabled={localAttempts >= 2 || !currentAnswer.length}
              sx={{
                marginTop: 3,
                backgroundColor: '#ec4899',
                '&:hover': { backgroundColor: '#db2777' }
              }}
            >
              Submit ({2 - localAttempts} attempts left)
            </Button>
          </>
        )}

        {currentQuestion.type === 'text' && (
          <>
            <TextField
              fullWidth
              variant="outlined"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#ec4899',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={handleSubmit}
              disabled={localAttempts >= 2 || !currentAnswer}
              sx={{
                marginTop: 3,
                backgroundColor: '#ec4899',
                '&:hover': { backgroundColor: '#db2777' }
              }}
            >
              Submit ({2 - localAttempts} attempts left)
            </Button>
          </>
        )}
      </Paper>
    </div>
  );
};
