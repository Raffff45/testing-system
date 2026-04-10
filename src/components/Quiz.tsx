import { useState } from 'react';
import type { Level } from '../data/questions';
import QuestionCard from './Question';
import Result from './Result';

interface Props {
  level: Level;
  onComplete: (passed: boolean) => void;
  onBack: () => void;
}

export default function Quiz({ level, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(s => s + 1);
    } else {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      if (newHearts <= 0) {
        setFinished(true);
        setPassed(false);
        return;
      }
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex >= level.questions.length) {
      const finalScore = score + (correct ? 1 : 0);
      const didPass = finalScore >= Math.ceil(level.questions.length * 0.7);
      setFinished(true);
      setPassed(didPass);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  if (finished) {
    return (
      <Result
        level={level}
        score={score + (passed ? 0 : 0)}
        total={level.questions.length}
        passed={passed}
        onContinue={() => onComplete(passed)}
        onRetry={() => {
          setCurrentIndex(0);
          setHearts(3);
          setScore(0);
          setFinished(false);
        }}
      />
    );
  }

  return (
    <QuestionCard
      question={level.questions[currentIndex]}
      questionNumber={currentIndex + 1}
      totalQuestions={level.questions.length}
      onAnswer={handleAnswer}
      hearts={hearts}
    />
  );
}