import { Navigate, Route, Routes } from 'react-router-dom'
import { AssessmentsPage } from '@/pages/assessments/AssessmentsPage'
import { QuestionSolvePage } from '@/pages/questions/QuestionSolvePage'
import { AssessmentDetailPage } from './pages/assessments/AssessmentDetailPage'
import { ResultsPage } from './pages/results/ResultsPage'
import { CreateAssessmentPage } from './pages/assessments/CreateAssessmentPage'
import { CreateQuestionPage } from './pages/questions/CreateQuestionPage'

function App() {
  return (
    <Routes>
      <Route path="/assessments" element={<AssessmentsPage />} />
      <Route path="/" element={<Navigate to="/assessments" replace />} />
      <Route
        path="/assessments/:assessmentId/questions/new"
        element={<CreateQuestionPage />}
      />
      <Route
        path="/assessments/:assessmentId/questions/:questionId"
        element={<QuestionSolvePage />}
      />
      <Route
        path="/assessments/new"
        element={<CreateAssessmentPage />}
      />
      <Route
        path="/assessments/:assessmentId"
        element={<AssessmentDetailPage />}
      />
      <Route
        path="/results/:submissionId"
        element={<ResultsPage />}
      />
    </Routes>
    
  )
}

export default App