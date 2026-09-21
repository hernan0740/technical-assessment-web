export const COPY = {
  common: {
    companyName: 'Banco de Bogotá',
    appName: 'Plataforma de Evaluaciones Técnicas',
    loading: 'Cargando...',
    create: 'Crear',
    remove: 'Eliminar',
    back: 'Volver',

    error: {
      unexpected:
        'Ocurrió un error inesperado. Intenta nuevamente.',
    },

    languageSelector: {
        placeholder: 'Selecciona un lenguaje',
    },
  },

  assessments: {
    title: 'Evaluaciones técnicas',
    description:
      'Selecciona una evaluación para comenzar.',

    createButton: 'Crear evaluación',
    viewButton: 'Ver evaluación',

    loading: 'Cargando evaluaciones...',

    empty: {
      title: 'No hay evaluaciones disponibles',
      description:
        'Aún no se han creado evaluaciones técnicas.',
    },

    units: {
      minute: 'minuto',
      minutes: 'minutos',
      question: 'pregunta',
      questions: 'preguntas',
    },

    errors: {
      load: 'No fue posible cargar las evaluaciones.',
      create: 'No fue posible crear la evaluación.',
    },
  },

  assessmentDetail: {
    eyebrow: 'Evaluación técnica',
    title: 'Preguntas de la evaluación',
    description:
      'Revisa las preguntas de programación disponibles.',

    back: 'Volver a evaluaciones',
    createQuestion: 'Crear pregunta',
    createFirstQuestion: 'Crear primera pregunta',
    solveQuestion: 'Resolver pregunta',

    loading: 'Cargando preguntas...',

    empty: {
      title: 'No hay preguntas disponibles',
      description:
        'Esta evaluación aún no tiene preguntas de programación.',
    },

    labels: {
      question: 'Pregunta',
      score: 'Puntaje',
      languages: 'Lenguajes',
    },

    errors: {
      assessmentIdRequired:
        'El identificador de la evaluación es obligatorio.',
      load: 'No fue posible cargar las preguntas.',
    },
  },

  createAssessment: {
    eyebrow: 'Evaluación técnica',
    title: 'Crear evaluación',
    description:
      'Define la información básica de la evaluación técnica.',

    back: 'Volver a evaluaciones',

    fields: {
      name: 'Nombre',
      namePlaceholder:
        'Ej. Fundamentos de programación',

      description: 'Descripción',
      descriptionPlaceholder:
        'Describe el objetivo de la evaluación...',

      timeLimit: 'Tiempo límite',
      questionCount: 'Cantidad de preguntas',
    },

    submit: 'Crear evaluación',
    submitting: 'Creando...',

    errors: {
      create: 'No fue posible crear la evaluación.',
    },
  },

  createQuestion: {
    eyebrow: 'Evaluación técnica',
    title: 'Crear pregunta',
    description:
      'Configura el ejercicio de programación y sus casos de prueba.',

    back: 'Volver a la evaluación',

    fields: {
      title: 'Título',
      titlePlaceholder:
        'Ej. Duplicar un número',

      description: 'Descripción',
      descriptionPlaceholder:
        'Describe lo que debe resolver el candidato...',

      score: 'Puntaje',
    },

    languages: {
      title: 'Lenguajes permitidos',
      description:
        'Selecciona los lenguajes que podrá utilizar el candidato.',
    },

    testCases: {
      title: 'Casos de prueba',

      description:
        'Los casos privados se utilizan para validar la solución sin revelar sus datos al candidato.',

      add: 'Agregar caso de prueba',
      remove: 'Eliminar',

      testCase: 'Caso de prueba',

      input: 'Entrada',
      inputPlaceholder: 'Ej. 5',

      expectedOutput: 'Salida esperada',
      expectedOutputPlaceholder: 'Ej. 10',

      private: 'Caso de prueba privado',
    },

    submit: 'Crear pregunta',
    submitting: 'Creando...',

    errors: {
      assessmentIdRequired:
        'El identificador de la evaluación es obligatorio.',

      languageRequired:
        'Selecciona al menos un lenguaje de programación.',

      create:
        'No fue posible crear la pregunta.',
    },
  },

  solveQuestion: {
    eyebrow: 'Pregunta de programación',

    labels: {
      maximumScore: 'Puntaje máximo',
      points: 'puntos',
      timeElapsed: 'Tiempo transcurrido',
      code: 'Código',
      candidate: 'Candidato',
      executionTime: 'Tiempo',
      memory: 'Memoria',
      status: 'Estado',
    },

    candidatePlaceholder:
      'Ingresa el nombre del candidato',

    runCode: 'Ejecutar código',
    running: 'Ejecutando...',

    submitAnswer: 'Enviar respuesta',
    submitting: 'Enviando...',

    console: {
      title: 'Consola',
      empty:
        'Ejecuta tu código para visualizar el resultado.',
    },

    loading: 'Cargando pregunta...',

    errors: {
      questionIdRequired:
        'El identificador de la pregunta es obligatorio.',

      questionNotFound:
        'No se encontró la pregunta.',

      load:
        'No fue posible cargar la pregunta.',

      execution:
        'No fue posible ejecutar el código.',

      submission:
        'No fue posible enviar la respuesta.',

      missingIds:
        'No se encontró la evaluación o la pregunta.',
    },
  },

  results: {
    eyebrow: 'Resultado de la evaluación',
    title: 'Resultado de la respuesta',

    description:
      'Revisa el resultado obtenido en la evaluación técnica.',

    loading: 'Cargando resultados...',
    notFound: 'No se encontró la respuesta.',

    back: 'Volver a evaluaciones',

    labels: {
      status: 'Estado',
      score: 'Puntaje',
      candidate: 'Candidato',
      language: 'Lenguaje',
      testsPassed: 'Pruebas aprobadas',
      timeSpent: 'Tiempo empleado',
    },

    testResults: {
      title: 'Resultados de las pruebas',
      testCase: 'Caso de prueba',
      public: 'Caso de prueba público',
      private: 'Caso de prueba privado',
      passed: 'Aprobado',
      failed: 'Fallido',
    },

    errors: {
      submissionIdRequired:
        'El identificador de la respuesta es obligatorio.',

      load:
        'No fue posible cargar el resultado.',
    },
  },

  submissionStatus: {
    PASSED: 'APROBADO',
    PARTIAL: 'PARCIAL',
    FAILED: 'FALLIDO',
  },

  executionStatus: {
    SUCCESS: 'EJECUCIÓN EXITOSA',
    COMPILATION_ERROR: 'ERROR DE COMPILACIÓN',
    RUNTIME_ERROR: 'ERROR DE EJECUCIÓN',
    TIMEOUT: 'TIEMPO DE EJECUCIÓN AGOTADO',
    ERROR: 'ERROR',
  },

  languages: {
    java: 'Java',
    javascript: 'JavaScript',
    python: 'Python',
  },
} as const