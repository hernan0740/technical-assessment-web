export const COPY = {
  common: {
    companyName:
      'Banco de Bogotá',

    appName:
      'Plataforma de Evaluaciones Técnicas',

    loading: 'Cargando...',
    create: 'Crear',
    remove: 'Eliminar',
    back: 'Volver',

    error: {
      unexpected:
        'Ocurrió un error inesperado. Intenta nuevamente.',
    },

    languageSelector: {
      placeholder:
        'Selecciona un lenguaje',
    },
  },

  assessments: {
    title:
      'Evaluaciones técnicas',

    description:
      'Selecciona una evaluación para comenzar.',

    createButton:
      'Crear evaluación',

    viewButton:
      'Ver evaluación',

    editButton:
      'Editar',

    deleteButton:
      'Eliminar',

    deletingButton:
      'Eliminando...',

    confirmDelete:
      '¿Estás seguro de eliminar esta evaluación? También se eliminarán sus preguntas y resultados asociados.',

    loading:
      'Cargando evaluaciones...',

    empty: {
      title:
        'No hay evaluaciones disponibles',

      description:
        'Aún no se han creado evaluaciones técnicas.',
    },

    units: {
      minute:
        'minuto',

      minutes:
        'minutos',

      question:
        'pregunta',

      questions:
        'preguntas',
    },

    errors: {
      load:
        'No fue posible cargar las evaluaciones.',

      create:
        'No fue posible crear la evaluación.',

      delete:
        'No fue posible eliminar la evaluación.',
    },
  },

  assessmentDetail: {
    eyebrow:
      'Evaluación técnica',

    title:
      'Preguntas de la evaluación',

    description:
      'Revisa las preguntas de programación disponibles.',

    back:
      'Volver a evaluaciones',

    createQuestion:
      'Crear pregunta',

    createFirstQuestion:
      'Crear primera pregunta',

    solveQuestion:
      'Resolver pregunta',

    editQuestion:
      'Editar',

    deleteQuestion:
      'Eliminar',

    deletingQuestion:
      'Eliminando...',

    confirmDeleteQuestion:
      '¿Estás seguro de eliminar esta pregunta? También se eliminarán los resultados asociados.',

    loading:
      'Cargando evaluación...',

    empty: {
      title:
        'No hay preguntas disponibles',

      description:
        'Esta evaluación aún no tiene preguntas de programación.',
    },

    labels: {
      question:
        'Pregunta',

      score:
        'Puntaje',

      languages:
        'Lenguajes',
    },

    errors: {
      assessmentIdRequired:
        'El identificador de la evaluación es obligatorio.',

      load:
        'No fue posible cargar la evaluación.',

      delete:
        'No fue posible eliminar la pregunta.',
    },
  },

  assessmentSession: {
    title:
      'Iniciar evaluación',

    description:
      'Ingresa el nombre del candidato. Al iniciar, las preguntas se resolverán de forma consecutiva y el tiempo será continuo durante toda la evaluación.',

    candidate:
      'Nombre del candidato',

    candidatePlaceholder:
      'Ej. Hernan Chapid',

    start:
      'Iniciar evaluación',

    back:
      'Volver a la evaluación',
  },

  createAssessment: {
    eyebrow:
      'Evaluación técnica',

    title:
      'Crear evaluación',

    description:
      'Define la información básica de la evaluación técnica.',

    back:
      'Volver a evaluaciones',

    fields: {
      name:
        'Nombre',

      namePlaceholder:
        'Ej. Fundamentos de programación',

      description:
        'Descripción',

      descriptionPlaceholder:
        'Describe el objetivo de la evaluación...',

      timeLimit:
        'Tiempo límite',
    },

    submit:
      'Crear evaluación',

    submitting:
      'Creando...',

    errors: {
      create:
        'No fue posible crear la evaluación.',
    },
  },

  editAssessment: {
    eyebrow:
      'Evaluación técnica',

    title:
      'Editar evaluación',

    description:
      'Actualiza la información de la evaluación técnica.',

    back:
      'Volver a la evaluación',

    fields: {
      name:
        'Nombre',

      namePlaceholder:
        'Ej. Fundamentos de programación',

      description:
        'Descripción',

      descriptionPlaceholder:
        'Describe el objetivo de la evaluación...',

      timeLimit:
        'Tiempo límite',
    },

    submit:
      'Guardar cambios',

    submitting:
      'Guardando...',

    loading:
      'Cargando evaluación...',

    errors: {
      assessmentIdRequired:
        'El identificador de la evaluación es obligatorio.',

      load:
        'No fue posible cargar la evaluación.',

      update:
        'No fue posible actualizar la evaluación.',
    },
  },

  createQuestion: {
    eyebrow:
      'Evaluación técnica',

    title:
      'Crear pregunta',

    description:
      'Configura el ejercicio de programación y sus casos de prueba.',

    back:
      'Volver a la evaluación',

    fields: {
      title:
        'Título',

      titlePlaceholder:
        'Ej. Duplicar un número',

      description:
        'Descripción',

      descriptionPlaceholder:
        'Describe lo que debe resolver el candidato...',

      score:
        'Puntaje',
    },

    languages: {
      title:
        'Lenguajes permitidos',

      description:
        'Selecciona los lenguajes que podrá utilizar el candidato.',
    },

    testCases: {
      title:
        'Casos de prueba',

      description:
        'Los casos privados se utilizan para validar la solución sin revelar sus datos al candidato.',

      add:
        'Agregar caso de prueba',

      remove:
        'Eliminar',

      testCase:
        'Caso de prueba',

      input:
        'Entrada',

      inputPlaceholder:
        'Ej. 5',

      expectedOutput:
        'Salida esperada',

      expectedOutputPlaceholder:
        'Ej. 10',

      private:
        'Caso de prueba privado',
    },

    submit:
      'Crear pregunta',

    submitting:
      'Creando...',

    errors: {
      assessmentIdRequired:
        'El identificador de la evaluación es obligatorio.',

      languageRequired:
        'Selecciona al menos un lenguaje de programación.',

      create:
        'No fue posible crear la pregunta.',
    },
  },

  editQuestion: {
    eyebrow:
      'Evaluación técnica',

    title:
      'Editar pregunta',

    description:
      'Actualiza la información de la pregunta de programación.',

    back:
      'Volver a la evaluación',

    fields: {
      title:
        'Título',

      titlePlaceholder:
        'Ej. Duplicar un número',

      description:
        'Descripción',

      descriptionPlaceholder:
        'Describe lo que debe resolver el candidato...',

      score:
        'Puntaje',
    },

    languages: {
      title:
        'Lenguajes permitidos',

      description:
        'Selecciona los lenguajes que podrá utilizar el candidato.',
    },

    testCasesNotice: {
      title:
        'Casos de prueba',

      description:
        'Los casos de prueba no pueden modificarse después de crear la pregunta. Si necesitas cambiarlos, elimina la pregunta y crea una nueva.',
    },

    submit:
      'Guardar cambios',

    submitting:
      'Guardando...',

    loading:
      'Cargando pregunta...',

    errors: {
      missingIds:
        'No se encontró la evaluación o la pregunta.',

      load:
        'No fue posible cargar la pregunta.',

      languageRequired:
        'Selecciona al menos un lenguaje de programación.',

      update:
        'No fue posible actualizar la pregunta.',
    },
  },

  solveQuestion: {
    eyebrow:
      'Pregunta de programación',

    labels: {
      maximumScore:
        'Puntaje máximo',

      points:
        'puntos',

      timeRemaining:
        'Tiempo restante',

      code:
        'Código',

      candidate:
        'Candidato',

      executionTime:
        'Tiempo',

      memory:
        'Memoria',

      status:
        'Estado',

      question:
        'Pregunta',

      of:
        'de',
    },

    publicTests: {
      title:
        'Casos de prueba públicos',

      description:
        'Puedes utilizar estos casos para probar tu solución antes de enviarla.',

      select:
        'Caso de prueba',

      option:
        'Caso público',

      input:
        'Entrada',

      expectedOutput:
        'Salida esperada',

      empty:
        'Esta pregunta no tiene casos de prueba públicos disponibles.',
    },

    runCode:
      'Ejecutar código',

    running:
      'Ejecutando...',

    submitAnswer:
      'Enviar y continuar',

    finishAssessment:
      'Finalizar evaluación',

    submitting:
      'Enviando...',

    console: {
      title:
        'Consola',

      empty:
        'Ejecuta tu código para visualizar el resultado.',
    },

    loading:
      'Cargando pregunta...',

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

      noActiveSession:
        'No existe una evaluación en curso. Inicia la evaluación desde su detalle.',

      sessionUpdate:
        'No fue posible actualizar el progreso de la evaluación.',

      nextQuestion:
        'No fue posible encontrar la siguiente pregunta.',
    },
  },

  assessmentResults: {
    eyebrow:
      'Evaluación finalizada',

    title:
      'Resultado final',

    back:
      'Volver a evaluaciones',

    finish:
      'Finalizar y volver a evaluaciones',

    questionsTitle:
      'Resultado por pregunta',

    testsPassed:
      'casos aprobados',

    unanswered:
      'Sin respuesta registrada',

    timeExpired: {
      title:
        'Tiempo agotado',

      description:
        'El tiempo límite de la evaluación terminó. Se conservaron los resultados obtenidos hasta ese momento y las preguntas no respondidas se calificaron con cero puntos.',
    },

    labels: {
      candidate:
        'Candidato',

      score:
        'Puntaje obtenido',

      correctQuestions:
        'Preguntas correctas',

      timeSpent:
        'Tiempo empleado',

      correct:
        'preguntas correctas',

      incorrect:
        'preguntas incorrectas',
    },

    errors: {
      notFound:
        'No se encontró información de la evaluación finalizada.',
    },
  },

  results: {
    eyebrow:
      'Resultado de la evaluación',

    title:
      'Resultado de la respuesta',

    description:
      'Revisa el resultado obtenido en la evaluación técnica.',

    loading:
      'Cargando resultados...',

    notFound:
      'No se encontró la respuesta.',

    back:
      'Volver a evaluaciones',

    labels: {
      status:
        'Estado',

      score:
        'Puntaje',

      candidate:
        'Candidato',

      language:
        'Lenguaje',

      testsPassed:
        'Pruebas aprobadas',

      timeSpent:
        'Tiempo empleado',
    },

    testResults: {
      title:
        'Resultados de las pruebas',

      testCase:
        'Caso de prueba',

      public:
        'Caso de prueba público',

      private:
        'Caso de prueba privado',

      passed:
        'Aprobado',

      failed:
        'Fallido',
    },

    errors: {
      submissionIdRequired:
        'El identificador de la respuesta es obligatorio.',

      load:
        'No fue posible cargar el resultado.',
    },
  },

  submissionStatus: {
    PASSED:
      'APROBADO',

    PARTIAL:
      'PARCIAL',

    FAILED:
      'FALLIDO',
  },

  executionStatus: {
    SUCCESS:
      'EJECUCIÓN EXITOSA',

    COMPILATION_ERROR:
      'ERROR DE COMPILACIÓN',

    RUNTIME_ERROR:
      'ERROR DE EJECUCIÓN',

    TIMEOUT:
      'TIEMPO DE EJECUCIÓN AGOTADO',

    ERROR:
      'ERROR',
  },

  languages: {
    java:
      'Java',

    javascript:
      'JavaScript',

    python:
      'Python',
  },
} as const