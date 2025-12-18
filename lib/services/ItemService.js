import DatabaseService from "./DatabaseService";

const LISTS_PATH = "/listas";

const ItemService = {
  async addToList(listName, item, existingLists) {
    // Validaciones
    const validation = this.validateItem(item);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    if (!listName) {
      return { success: false, error: "Seleccione una lista" };
    }

    if (!existingLists?.[listName]) {
      return { success: false, error: "Lista no encontrada" };
    }

    try {
      const currentItems = existingLists[listName]?.items || [];
      const newPosition = currentItems.length;
      await DatabaseService.set(
        `${LISTS_PATH}/${listName}/items/${newPosition}`,
        item
      );
      return { success: true };
    } catch (error) {
      console.error("ItemService.addToList error:", error);
      return { success: false, error: "Error al agregar el item" };
    }
  },

  async deleteFromList(listName, itemName, existingLists) {
    if (!existingLists?.[listName]) {
      return { success: false, error: "Lista no encontrada" };
    }

    try {
      const currentItems = existingLists[listName]?.items || [];
      const filteredItems = currentItems.filter(
        (item) => item?.name !== itemName
      );

      // Reindexar items como objeto
      const reindexedItems = {};
      filteredItems.forEach((item, index) => {
        reindexedItems[index] = item;
      });

      await DatabaseService.set(
        `${LISTS_PATH}/${listName}/items`,
        reindexedItems
      );
      return { success: true };
    } catch (error) {
      console.error("ItemService.deleteFromList error:", error);
      return { success: false, error: "Error al eliminar el item" };
    }
  },

  async deleteFromAllLists(itemToDelete, existingLists) {
    if (!existingLists) {
      return { success: false, error: "No hay listas" };
    }

    try {
      const updatedLists = {};

      for (const listName in existingLists) {
        const list = existingLists[listName];
        const items = list?.items || [];

        const filteredItems = items.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(itemToDelete)
        );

        updatedLists[listName] = {
          ...list,
          items: filteredItems,
        };
      }

      await DatabaseService.set(LISTS_PATH, updatedLists);
      return { success: true };
    } catch (error) {
      console.error("ItemService.deleteFromAllLists error:", error);
      return { success: false, error: "Error al eliminar el item" };
    }
  },

  validateItem(item) {
    if (!item?.name || item.name.trim().length === 0) {
      return { valid: false, error: "El nombre del item es requerido" };
    }

    const validPriorities = ["alto", "bajo"];
    if (!validPriorities.includes(item?.priority)) {
      return { valid: false, error: "Prioridad inválida" };
    }

    const validTypes = ["necesidad", "deseo"];
    if (!validTypes.includes(item?.type)) {
      return { valid: false, error: "Tipo inválido" };
    }

    return { valid: true };
  },

  createItem(data = {}) {
    return {
      name: data.name || "",
      priority: data.priority || "bajo",
      type: data.type || "deseo",
    };
  },
};

export default ItemService;
