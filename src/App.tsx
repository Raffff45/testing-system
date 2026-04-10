import { useState, useEffect } from 'react'
import { supabase, type Profile } from './lib/supabase'
import { levels, type Level } from './data/questions'
import AuthScreen from './components/AuthScreen'
import StartScreen from './components/StartScreen'
import Quiz from './components/Quiz'
import Leaderboard from './components/Leaderboard'

type View = 'loading' | 'auth' | 'home' | 'quiz' | 'leaderboard'

export default function App() {
  const [view, setView] = useState<View>('loading')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [activeLevel, setActiveLevel] = useState<Level | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setView('auth')
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setProfile(null)
        setView('auth')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (data) {
      setProfile(data)
      setView('home')
    } else {
      setView('auth')
    }
  }

  const handleSelectLevel = (level: Level) => {
    setActiveLevel(level)
    setView('quiz')
  }

  const handleComplete = async (passed: boolean) => {
    if (passed && activeLevel && profile) {
      const alreadyDone = profile.completed_levels?.includes(activeLevel.id)
      if (!alreadyDone) {
        const newCompleted = [...(profile.completed_levels || []), activeLevel.id]
        const newXp = (profile.total_xp || 0) + activeLevel.questions.length * 10
        const { data } = await supabase
          .from('profiles')
          .update({ completed_levels: newCompleted, total_xp: newXp })
          .eq('id', profile.id)
          .select()
          .single()
        if (data) setProfile(data)
      }
    }
    setActiveLevel(null)
    setView('home')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (view === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F7F7' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎯</div>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 16, color: '#AFAFAF', fontWeight: 700 }}>Загрузка...</div>
        </div>
      </div>
    )
  }

  if (view === 'auth') {
    return <AuthScreen onAuth={() => {
      supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
        if (session?.user) loadProfile(session.user.id)
      })
    }} />
  }

  if (view === 'leaderboard' && profile) {
    return <Leaderboard currentUserId={profile.id} onBack={() => setView('home')} />
  }

  if (view === 'quiz' && activeLevel) {
    return (
      <Quiz
        level={activeLevel}
        onComplete={handleComplete}
        onBack={() => setView('home')}
      />
    )
  }

  return (
    <StartScreen
      levels={levels}
      completedLevels={profile?.completed_levels || []}
      onSelectLevel={handleSelectLevel}
      onLeaderboard={() => setView('leaderboard')}
      onLogout={handleLogout}
      profile={profile}
    />
  )
}