import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface Props {
  onAuth: () => void
}

export default function AuthScreen({ onAuth }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async () => {
    setError('')
    setSuccess('')
    if (!email || !password) { setError('Заполни все поля'); return }
    if (mode === 'register' && !name) { setError('Введи своё имя'); return }
    if (password.length < 6) { setError('Пароль минимум 6 символов'); return }

    setLoading(true)

    if (mode === 'register') {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) { setError(signUpError.message); setLoading(false); return }

      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          email,
          full_name: name,
          completed_levels: [],
          total_xp: 0,
        })
        setSuccess('Аккаунт создан! Войди в систему.')
        setMode('login')
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) {
        setError('Неверный email или пароль')
        setLoading(false)
        return
      }
      onAuth()
    }
    setLoading(false)
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-mascot">🎯</div>
          <h1 className="auth-title">SkillPass</h1>
          <p className="auth-subtitle">Стартап термины для команды</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(''); setSuccess('') }}
          >Войти</button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setError(''); setSuccess('') }}
          >Регистрация</button>
        </div>

        <div className="auth-form">
          {mode === 'register' && (
            <div className="input-group">
              <label>Твоё имя</label>
              <input
                type="text"
                placeholder="Иван Иванов"
                value={name}
                onChange={e => setName(e.target.value)}
                className="auth-input"
              />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="ivan@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Минимум 6 символов"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="auth-input"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          {error && <div className="auth-error">⚠️ {error}</div>}
          {success && <div className="auth-success">✅ {success}</div>}

          <button
            className="auth-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '⏳ Загрузка...' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </button>
        </div>
      </div>
    </div>
  )
}