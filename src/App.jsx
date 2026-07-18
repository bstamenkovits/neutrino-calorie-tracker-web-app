import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OverviewPage from './pages/OverviewPage'
import LogPage from './pages/LogPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/overview" element={<OverviewPage />} />
      <Route path="/log" element={<LogPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  )
}

export default App
