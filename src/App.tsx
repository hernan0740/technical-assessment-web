import { Navigate, Route, Routes } from 'react-router-dom'
import { AssessmentsPage } from '@/pages/assessments/AssessmentsPage'

function App() {
  return (
    <Routes>
      <Route path="/assessments" element={<AssessmentsPage />} />
      <Route path="/" element={<Navigate to="/assessments" replace />} />
    </Routes>
  )
}

export default App