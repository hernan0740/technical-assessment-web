import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { AppLayout } from '@/components/layout/AppLayout'

import { AssessmentsPage } from '@/pages/assessments/AssessmentsPage'
import { AssessmentDetailPage } from '@/pages/assessments/AssessmentDetailPage'
import { CreateAssessmentPage } from '@/pages/assessments/CreateAssessmentPage'

import { CreateQuestionPage } from '@/pages/questions/CreateQuestionPage'
import { QuestionSolvePage } from '@/pages/questions/QuestionSolvePage'

import { ResultsPage } from '@/pages/results/ResultsPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <Navigate
              to="/assessments"
              replace
            />
          }
        />

        <Route
          path="/assessments"
          element={<AssessmentsPage />}
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
          path="/assessments/:assessmentId/questions/new"
          element={<CreateQuestionPage />}
        />

        <Route
          path="/assessments/:assessmentId/questions/:questionId"
          element={<QuestionSolvePage />}
        />

        <Route
          path="/results/:submissionId"
          element={<ResultsPage />}
        />
      </Route>
    </Routes>
  )
}

export default App