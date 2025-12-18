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

export const getAllItems = (listsData) => {
  if (!listsData || typeof listsData !== "object") {
    return [];
  }

  const allItems = [];
  const listNames = Object.keys(listsData);

  listNames.forEach((listName) => {
    const items = listsData[listName]?.items || [];
    items.forEach((item) => {
      if (item) {
        allItems.push({
          ...item,
          listName,
        });
      }
    });
  });

  return allItems;
};

export const countItemsByQuadrant = (listsData) => {
  const categorized = categorizeItemsByQuadrant(listsData);
  return {
    urgentImportant: categorized[0].length,
    urgentNotImportant: categorized[1].length,
    notUrgentImportant: categorized[2].length,
    notUrgentNotImportant: categorized[3].length,
    total: categorized.flat().length,
  };
};

export const filterByPriority = (items, priority) => {
  return items.filter((item) => item?.priority === priority);
};

export const filterByType = (items, type) => {
  return items.filter((item) => item?.type === type);
};
