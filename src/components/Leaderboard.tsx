import { useEffect, useState } from 'react'
import { supabase, type Profile } from '../lib/supabase'

interface Props {
  currentUserId: string
  onBack: () => void
}

export default function Leaderboard({ currentUserId, onBack }: Props) {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*')
      .order('total_xp', { ascending: false })
      .then(({ data }: { data: Profile[] | null }) => {
        if (data) setProfiles(data)
        setLoading(false)
      })
  }, [])

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="lb-screen">
      <div className="lb-header">
        <button className="back-btn" onClick={onBack}>← Назад</button>
        <h2 className="lb-title">Рейтинг команды</h2>
        <div style={{ width: 70 }} />
      </div>

      {loading ? (
        <div className="lb-loading">⏳ Загрузка...</div>
      ) : (
        <div className="lb-list">
          {profiles.map((p, i) => {
            const isMe = p.id === currentUserId
            return (
              <div key={p.id} className={`lb-row ${isMe ? 'lb-me' : ''}`}>
                <div className="lb-rank">
                  {i < 3 ? medals[i] : <span className="lb-num">{i + 1}</span>}
                </div>
                <div className="lb-avatar">
                  {(p.full_name || p.email).charAt(0).toUpperCase()}
                </div>
                <div className="lb-info">
                  <div className="lb-name">
                    {p.full_name || p.email}
                    {isMe && <span className="lb-you"> (ты)</span>}
                  </div>
                  <div className="lb-levels">
                    {p.completed_levels?.length || 0} / 7 уровней
                  </div>
                </div>
                <div className="lb-xp">
                  <span className="lb-xp-val">{p.total_xp}</span>
                  <span className="lb-xp-lbl">XP</span>
                </div>
              </div>
            )
          })}

          {profiles.length === 0 && (
            <div className="lb-empty">Пока никто не проходил тесты</div>
          )}
        </div>
      )}
    </div>
  )
}