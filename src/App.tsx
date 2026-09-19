import { Navigate, Route, Routes } from 'react-router-dom'
import { AssessmentsPage } from '@/pages/assessments/AssessmentsPage'
import { QuestionSolvePage } from '@/pages/questions/QuestionSolvePage'

function App() {
  return (
    <Routes>
      <Route path="/assessments" element={<AssessmentsPage />} />
      <Route path="/" element={<Navigate to="/assessments" replace />} />
      <Route
        path="/assessments/:assessmentId/questions/:questionId"
        element={<QuestionSolvePage />}
      />
    </Routes>
  )
}

export default App