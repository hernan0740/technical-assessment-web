import {
  Link,
  useParams,
} from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { COPY } from '@/constants/copy'

import {
  clearAssessmentSession,
  getAssessmentSession,
} from '@/services/assessment-session.service'

function formatTime(
  totalSeconds: number,
) {
  const minutes =
    Math.floor(
      totalSeconds / 60,
    )

  const seconds =
    totalSeconds % 60

  return `${minutes} min ${seconds} s`
}

export function AssessmentResultsPage() {
  const { assessmentId } =
    useParams<{
      assessmentId: string
    }>()

  const session =
    assessmentId
      ? getAssessmentSession(
          assessmentId,
        )
      : null

  if (
    !assessmentId ||
    !session
  ) {
    return (
      <main className="px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-red-600">
            {
              COPY
                .assessmentResults
                .errors.notFound
            }
          </p>

          <Button
            asChild
            variant="outline"
            className="mt-5"
          >
            <Link to="/assessments">
              {
                COPY
                  .assessmentResults
                  .back
              }
            </Link>
          </Button>
        </div>
      </main>
    )
  }

  const isTimeExpired =
    session.completionReason ===
    'TIME_EXPIRED'

  const totalScore =
    session.submissions.reduce(
      (
        total,
        submission,
      ) =>
        total +
        submission.score,
      0,
    )

  const maximumScore =
    session.questions.reduce(
      (
        total,
        question,
      ) =>
        total +
        question.maxScore,
      0,
    )

  const passedQuestions =
    session.submissions.filter(
      (submission) =>
        submission.status ===
        'PASSED',
    ).length

  const incorrectQuestions =
    session.questions.length -
    passedQuestions

  const endTime =
    session.completedAt ??
    Date.now()

  const calculatedTimeSpent =
    Math.max(
      0,
      Math.floor(
        (endTime -
          session.startedAt) /
          1000,
      ),
    )

  const timeSpentSeconds =
    isTimeExpired
      ? session.timeLimitMinutes *
        60
      : calculatedTimeSpent

  const questionResults =
    session.questions.map(
      (question) => {
        const submission =
          session.submissions.find(
            (
              currentSubmission,
            ) =>
              currentSubmission.questionId ===
              question.id,
          )

        return {
          question,

          submission,

          score:
            submission?.score ??
            0,

          status:
            submission?.status ??
            'FAILED',
        } as const
      },
    )

  const handleFinish =
    () => {
      clearAssessmentSession(
        assessmentId,
      )
    }

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <header>
          <p className="text-sm text-slate-500">
            {
              COPY
                .assessmentResults
                .eyebrow
            }
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {
              COPY
                .assessmentResults
                .title
            }
          </h1>

          <p className="mt-2 text-slate-600">
            {
              session.assessmentName
            }
          </p>
        </header>

        {isTimeExpired && (
          <section className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-5">
            <h2 className="font-semibold text-amber-900">
              {
                COPY
                  .assessmentResults
                  .timeExpired.title
              }
            </h2>

            <p className="mt-1 text-sm text-amber-800">
              {
                COPY
                  .assessmentResults
                  .timeExpired
                  .description
              }
            </p>
          </section>
        )}

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              {
                COPY
                  .assessmentResults
                  .labels
                  .candidate
              }
            </p>

            <p className="mt-2 text-lg font-semibold">
              {
                session.candidate
              }
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              {
                COPY
                  .assessmentResults
                  .labels.score
              }
            </p>

            <p className="mt-2 text-lg font-semibold">
              {totalScore} /{' '}
              {maximumScore}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              {
                COPY
                  .assessmentResults
                  .labels
                  .correctQuestions
              }
            </p>

            <p className="mt-2 text-lg font-semibold">
              {
                passedQuestions
              }{' '}
              /{' '}
              {
                session.questions
                  .length
              }
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              {
                COPY
                  .assessmentResults
                  .labels
                  .timeSpent
              }
            </p>

            <p className="mt-2 text-lg font-semibold">
              {formatTime(
                timeSpentSeconds,
              )}
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-6 text-sm">
            <span>
              <strong>
                {
                  passedQuestions
                }
              </strong>{' '}
              {
                COPY
                  .assessmentResults
                  .labels.correct
              }
            </span>

            <span>
              <strong>
                {
                  incorrectQuestions
                }
              </strong>{' '}
              {
                COPY
                  .assessmentResults
                  .labels
                  .incorrect
              }
            </span>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">
            {
              COPY
                .assessmentResults
                .questionsTitle
            }
          </h2>

          <div className="mt-4 space-y-3">
            {questionResults.map(
              (
                {
                  question,
                  submission,
                  score,
                  status,
                },
                index,
              ) => (
                <article
                  key={
                    question.id
                  }
                  className="rounded-xl border bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-sm text-slate-500">
                        {
                          COPY
                            .assessmentDetail
                            .labels
                            .question
                        }{' '}
                        {index +
                          1}
                      </p>

                      <h3 className="mt-1 font-semibold">
                        {
                          question.title
                        }
                      </h3>

                      {submission ? (
                        <p className="mt-2 text-sm text-slate-500">
                          {
                            submission.passedTests
                          }{' '}
                          /{' '}
                          {
                            submission.totalTests
                          }{' '}
                          {
                            COPY
                              .assessmentResults
                              .testsPassed
                          }
                        </p>
                      ) : (
                        <p className="mt-2 text-sm text-red-600">
                          {
                            COPY
                              .assessmentResults
                              .unanswered
                          }
                        </p>
                      )}
                    </div>

                    <div className="sm:text-right">
                      <p className="font-semibold">
                        {score} /{' '}
                        {
                          question.maxScore
                        }{' '}
                        {
                          COPY.solveQuestion
                            .labels.points
                        }
                      </p>

                      <p
                        className={`mt-1 text-sm ${
                          status ===
                          'PASSED'
                            ? 'text-emerald-600'
                            : status ===
                                'PARTIAL'
                              ? 'text-amber-600'
                              : 'text-red-600'
                        }`}
                      >
                        {
                          COPY
                            .submissionStatus[
                            status
                          ]
                        }
                      </p>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <div className="mt-8 flex justify-end">
          <Button
            asChild
            className="bg-[#0043A9] text-white hover:bg-[#00388F]"
          >
            <Link
              to="/assessments"
              onClick={
                handleFinish
              }
            >
              {
                COPY
                  .assessmentResults
                  .finish
              }
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}