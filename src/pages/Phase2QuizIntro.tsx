import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const Phase2QuizIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-8 text-center">
        Let's start a lovely quiz? 💖
      </h1>
      <Button
        variant="contained"
        size="large"
        startIcon={<PlayArrowIcon />}
        onClick={() => navigate('/quiz/start')}
        sx={{
          backgroundColor: '#ec4899',
          '&:hover': {
            backgroundColor: '#db2777',
          },
          borderRadius: '50px',
          padding: '12px 40px',
          fontSize: '1.25rem',
          textTransform: 'none',
          fontWeight: 'bold'
        }}
      >
        Start Quiz
      </Button>
    </div>
  );
};
