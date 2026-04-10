import type { Level } from '../data/questions';

interface Props {
  level: Level;
  score: number;
  total: number;
  passed: boolean;
  onContinue: () => void;
  onRetry: () => void;
}

export default function Result({ level, score, total, passed, onContinue, onRetry }: Props) {
  const accuracy = Math.round((score / total) * 100);
  const xp = passed ? total * 10 : 0;

  return (
    <div className={`result-screen ${passed ? 'result-pass' : 'result-fail'}`}>
      <div className="result-content">
        <div className="result-mascot">
          <div className={`result-blob ${passed ? 'blob-pass' : 'blob-fail'}`}>
            <span className="result-emoji">{passed ? '🎉' : '😅'}</span>
          </div>
        </div>

        <h2 className="result-title">
          {passed ? 'Уровень пройден!' : 'Попробуй ещё раз!'}
        </h2>
        <p className="result-subtitle">
          {passed
            ? `Ты знаешь термины уровня «${level.title}»`
            : 'Нужно 70% правильных ответов для прохождения'}
        </p>

        <div className="result-stats">
          <div className="stat-card">
            <span className="stat-icon">🎯</span>
            <span className="stat-value">{accuracy}%</span>
            <span className="stat-label">Точность</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <span className="stat-value">{score}/{total}</span>
            <span className="stat-label">Верных</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⭐</span>
            <span className="stat-value">+{xp}</span>
            <span className="stat-label">XP</span>
          </div>
        </div>

        {passed ? (
          <button className="btn-primary" onClick={onContinue}>
            Продолжить
          </button>
        ) : (
          <div className="result-buttons">
            <button className="btn-secondary" onClick={onContinue}>
              На главную
            </button>
            <button className="btn-primary" onClick={onRetry}>
              Попробовать снова
            </button>
          </div>
        )}
      </div>
    </div>
  );
}