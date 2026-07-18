import './styles/App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { supabase } from './lib/supabase'

// pages
import HomePage from './pages/HomePage'
import OverviewPage from './pages/OverviewPage'
import LogPage from './pages/LogPage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'


function App() {
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setIsLoading(false)
    }

    getSession()
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={session ? <HomePage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/overview"
        element={session ? <OverviewPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/log"
        element={session ? <LogPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/settings"
        element={session ? <SettingsPage /> : <Navigate to="/login" replace />}
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
