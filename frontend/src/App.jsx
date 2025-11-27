import { useState } from 'react'
import RegistrationForm from './components/RegistrationForm'
import ParticipantsList from './components/ParticipantsList'
import './App.css'

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRegistrationSuccess = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Event Registration Portal</h1>
        <p>Register for upcoming events and view all participants</p>
      </header>
      <main className="app-main">
        <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
        <ParticipantsList refreshTrigger={refreshTrigger} />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Event Registration Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
