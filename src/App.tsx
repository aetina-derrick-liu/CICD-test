import './App.css'
import Layout from './containers/Layout'
import ProjectLayout from './containers/project/ProjectLayout'
import Login from './features/user/Login'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

function App () {
  return (
    <CookiesProvider>
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />
          <Route path="/app/project/*" element={<ProjectLayout/>} />
          <Route
                path="*"
                element={<Navigate to="/app/cardboard" replace />}
              />
        </Routes>
      </Router>
    </CookiesProvider>
  )
}

export default App
