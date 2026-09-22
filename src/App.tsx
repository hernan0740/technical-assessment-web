import { Navigate, Route, Routes } from 'react-router-dom'

import { AppLayout } from '@/components/layout/AppLayout'

import { AssessmentDetailPage } from '@/pages/assessments/AssessmentDetailPage'
import { AssessmentsPage } from '@/pages/assessments/AssessmentsPage'
import { CreateAssessmentPage } from '@/pages/assessments/CreateAssessmentPage'
import { EditAssessmentPage } from '@/pages/assessments/EditAssessmentPage'

import { CreateQuestionPage } from '@/pages/questions/CreateQuestionPage'
import { EditQuestionPage } from '@/pages/questions/EditQuestionPage'
import { QuestionSolvePage } from '@/pages/questions/QuestionSolvePage'

import { AssessmentResultsPage } from '@/pages/results/AssessmentResultsPage'
import { ResultsPage } from '@/pages/results/ResultsPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/assessments" replace />} />

        <Route path="/assessments" element={<AssessmentsPage />} />

        <Route path="/assessments/new" element={<CreateAssessmentPage />} />

        <Route path="/assessments/:assessmentId/edit" element={<EditAssessmentPage />} />

        <Route
          path="/assessments/:assessmentId/results"
          element={<AssessmentResultsPage />}
        />

        <Route path="/assessments/:assessmentId" element={<AssessmentDetailPage />} />

        <Route
          path="/assessments/:assessmentId/questions/new"
          element={<CreateQuestionPage />}
        />

        <Route
          path="/assessments/:assessmentId/questions/:questionId/edit"
          element={<EditQuestionPage />}
        />

        <Route
          path="/assessments/:assessmentId/questions/:questionId"
          element={<QuestionSolvePage />}
        />

        <Route path="/results/:submissionId" element={<ResultsPage />} />
      </Route>
    </Routes>
  )
}

export default App
