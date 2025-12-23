// Tipos de items
export const ITEM_TYPES = {
  NECESIDAD: "necesidad",
  DESEO: "deseo",
};

// Niveles de prioridad
export const PRIORITY_LEVELS = {
  ALTO: "alto",
  BAJO: "bajo",
};

// Configuración de cuadrantes de la matriz
export const QUADRANTS = {
  // Cuadrante 1: Necesidades + Relevante (Urgente e Importante)
  URGENT_IMPORTANT: {
    id: 0,
    label: "RELEVANTE",
    column: "NECESIDADES",
    filter: (item) =>
      item?.type === ITEM_TYPES.NECESIDAD &&
      item?.priority === PRIORITY_LEVELS.ALTO,
  },

  // Cuadrante 2: Necesidades + Irrelevante (Urgente, No Importante)
  URGENT_NOT_IMPORTANT: {
    id: 1,
    label: "IRRELEVANTE",
    column: "NECESIDADES",
    filter: (item) =>
      item?.type === ITEM_TYPES.NECESIDAD &&
      item?.priority === PRIORITY_LEVELS.BAJO,
  },

  // Cuadrante 3: Deseos + Relevante (No Urgente, Importante)
  NOT_URGENT_IMPORTANT: {
    id: 2,
    label: "RELEVANTE",
    column: "DESEOS",
    filter: (item) =>
      item?.type === ITEM_TYPES.DESEO &&
      item?.priority === PRIORITY_LEVELS.ALTO,
  },

  // Cuadrante 4: Deseos + Irrelevante (No Urgente, No Importante)
  NOT_URGENT_NOT_IMPORTANT: {
    id: 3,
    label: "IRRELEVANTE",
    column: "DESEOS",
    filter: (item) =>
      item?.type === ITEM_TYPES.DESEO &&
      item?.priority === PRIORITY_LEVELS.BAJO,
  },
};

// Columnas de la matriz
export const MATRIX_COLUMNS = {
  LEFT: {
    id: "necesidades",
    title: "NECESIDADES",
    quadrants: [QUADRANTS.URGENT_IMPORTANT, QUADRANTS.URGENT_NOT_IMPORTANT],
  },
  RIGHT: {
    id: "deseos",
    title: "DESEOS",
    quadrants: [
      QUADRANTS.NOT_URGENT_IMPORTANT,
      QUADRANTS.NOT_URGENT_NOT_IMPORTANT,
    ],
  },
};

// Opciones para selects en formularios
export const SELECT_OPTIONS = {
  TYPE: [
    { label: "necesidad", value: ITEM_TYPES.NECESIDAD },
    { label: "deseo", value: ITEM_TYPES.DESEO },
  ],
  PRIORITY: [
    { label: "Muy Importante", value: PRIORITY_LEVELS.ALTO },
    { label: "Poco Importante", value: PRIORITY_LEVELS.BAJO },
  ],
};
