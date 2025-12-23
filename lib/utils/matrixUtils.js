import { QUADRANTS } from "../constants/matrix";

export const categorizeItemsByQuadrant = (listsData) => {
  if (!listsData || typeof listsData !== "object") {
    return [[], [], [], []];
  }

  const quadrants = [[], [], [], []];
  const listNames = Object.keys(listsData);

  listNames.forEach((listName) => {
    const items = listsData[listName]?.items || [];

    items.forEach((item) => {
      if (!item) return;

      // Verificar cada cuadrante usando los filtros configurados
      Object.values(QUADRANTS).forEach((quadrant) => {
        if (quadrant.filter(item)) {
          quadrants[quadrant.id].push({
            ...item,
            listName, // Agregamos referencia a la lista
          });
        }
      });
    });
  });

  return quadrants;
};
