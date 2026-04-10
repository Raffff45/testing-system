import { useState } from 'react';
import { levels, type Level } from './data/questions';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';

type View = 'home' | 'quiz';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  const handleSelectLevel = (level: Level) => {
    setActiveLevel(level);
    setView('quiz');
  };

  const handleComplete = (passed: boolean) => {
    if (passed && activeLevel && !completedLevels.includes(activeLevel.id)) {
      setCompletedLevels(prev => [...prev, activeLevel.id]);
    }
    setView('home');
    setActiveLevel(null);
  };

  if (view === 'quiz' && activeLevel) {
    return (
      <Quiz
        level={activeLevel}
        onComplete={handleComplete}
        onBack={() => setView('home')}
      />
    );
  }

  return (
    <StartScreen
      levels={levels}
      completedLevels={completedLevels}
      onSelectLevel={handleSelectLevel}
    />
  );
}