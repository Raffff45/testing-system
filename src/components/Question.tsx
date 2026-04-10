import { useState } from 'react';

interface Question {
  category: string;
  definition: string;
  correct: string;
  options: string[];
}

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
  hearts: number;
}

export default function QuestionCard({ question, questionNumber, totalQuestions, onAnswer, hearts }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    setTimeout(() => {
      onAnswer(option === question.correct);
      setSelected(null);
      setAnswered(false);
    }, 900);
  };

  const getOptionClass = (option: string) => {
    if (!answered) return 'option';
    if (option === question.correct) return 'option correct';
    if (option === selected) return 'option wrong';
    return 'option dim';
  };

  const progress = ((questionNumber - 1) / totalQuestions) * 100;

  return (
    <div className="question-screen">
      <div className="quiz-header">
        <button className="close-btn" onClick={() => onAnswer(false)}>✕</button>
        <div className="quiz-progress-track">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="hearts">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={i < hearts ? 'heart full' : 'heart empty'}>
              {i < hearts ? '❤️' : '🖤'}
            </span>
          ))}
        </div>
      </div>

      <div className="question-body">
        <div className="question-label">Выбери правильный термин</div>
        <div className="question-card">
          <div className="question-category">{question.category}</div>
          <p className="question-definition">{question.definition}</p>
        </div>

        <div className="options-grid">
          {question.options.map((option) => (
            <button
              key={option}
              className={getOptionClass(option)}
              onClick={() => handleSelect(option)}
            >
              <span className="option-text">{option}</span>
              {answered && option === question.correct && <span className="option-icon">✓</span>}
              {answered && option === selected && option !== question.correct && <span className="option-icon">✕</span>}
            </button>
          ))}
        </div>
      </div>

      {answered && (
        <div className={`feedback-bar ${selected === question.correct ? 'feedback-correct' : 'feedback-wrong'}`}>
          <div className="feedback-content">
            <span className="feedback-icon">{selected === question.correct ? '🎉' : '💡'}</span>
            <div>
              <div className="feedback-title">
                {selected === question.correct ? 'Отлично!' : 'Правильный ответ:'}
              </div>
              {selected !== question.correct && (
                <div className="feedback-answer">{question.correct}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}