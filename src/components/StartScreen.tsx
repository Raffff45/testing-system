import type { Level } from '../data/questions'

interface Props {
  levels: Level[]
  completedLevels: number[]
  onSelectLevel: (level: Level) => void
  onLeaderboard: () => void
  onLogout: () => void
  profile: any | null
}

export default function StartScreen({ levels, completedLevels, onSelectLevel, onLeaderboard, onLogout, profile }: Props) {
  const nextLevel = levels.find(l => !completedLevels.includes(l.id)) || levels[0]
  const pct = Math.round((completedLevels.length / levels.length) * 100)
  const totalXp = profile?.total_xp || 0

  return (
    <div className="start-screen">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🎯</span>
          <span className="logo-text">SkillPass</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div className="streak">
            <span className="streak-icon">⭐</span>
            <span className="streak-count">{totalXp}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>Выйти</button>
        </div>
      </header>

      <div className="hero">
        <div className="hero-mascot">
          <div className="mascot-blob">
            <span className="mascot-emoji">🦉</span>
          </div>
        </div>
        <h1 className="hero-title">
          {profile?.full_name ? `Привет, ${profile.full_name.split(' ')[0]}!` : 'SkillPass'}
        </h1>
        <p className="hero-subtitle">Прокачай словарный запас<br />фаундера за 7 уровней</p>
        <div className="progress-bar-wrap">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="progress-text">{completedLevels.length} / {levels.length} уровней пройдено</span>
        </div>
      </div>

      <div className="levels-path">
        {levels.map((level, index) => {
          const isCompleted = completedLevels.includes(level.id)
          const isNext = level.id === nextLevel.id
          const isLocked = !isCompleted && !isNext

          return (
            <div key={level.id} className={`level-node-wrap ${index % 2 === 0 ? 'left' : 'right'}`}>
              {isNext && <div className="start-badge">НАЧАТЬ</div>}
              <button
                className={`level-node ${isCompleted ? 'completed' : ''} ${isNext ? 'next' : ''} ${isLocked ? 'locked' : ''}`}
                style={{ '--level-color': level.color } as React.CSSProperties}
                onClick={() => !isLocked && onSelectLevel(level)}
                disabled={isLocked}
              >
                <div className="level-icon-wrap">
                  <span className="level-emoji">{isCompleted ? '✓' : isLocked ? '🔒' : level.emoji}</span>
                </div>
                <div className="level-info">
                  <span className="level-num">Уровень {level.id}</span>
                  <span className="level-name">{level.title}</span>
                  <span className="level-sub">{level.questions.length} вопросов</span>
                </div>
                {isCompleted && <div className="xp-badge">+{level.questions.length * 10} XP</div>}
              </button>
            </div>
          )
        })}
      </div>

      <div className="bottom-nav">
        <div className="nav-item active">
          <span>🏠</span>
          <span>Главная</span>
        </div>
        <div className="nav-item" onClick={onLeaderboard}>
          <span>🏆</span>
          <span>Рейтинг</span>
        </div>
        <div className="nav-item" onClick={onLogout}>
          <span>👤</span>
          <span>Выйти</span>
        </div>
      </div>
    </div>
  )
}