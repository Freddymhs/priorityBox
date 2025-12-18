import DatabaseService from "./DatabaseService";

const LISTS_PATH = "/listas";

const ListService = {
  async getAll() {
    try {
      return await DatabaseService.get(LISTS_PATH);
    } catch (error) {
      console.error("ListService.getAll error:", error);
      return null;
    }
  },

  async getByName(listName) {
    try {
      return await DatabaseService.get(`${LISTS_PATH}/${listName}`);
    } catch (error) {
      console.error("ListService.getByName error:", error);
      return null;
    }
  },

  async create(name, description, existingLists = {}) {
    // Validación
    if (!name || name.trim().length === 0) {
      return { success: false, error: "El nombre es requerido" };
    }

    if (!description || description.trim().length === 0) {
      return { success: false, error: "La descripción es requerida" };
    }

    if (existingLists?.[name]) {
      return { success: false, error: "Esta lista ya existe" };
    }

    try {
      const newLists = {
        ...existingLists,
        [name]: { description: description.trim(), items: [] },
      };
      await DatabaseService.set(LISTS_PATH, newLists);
      return { success: true };
    } catch (error) {
      console.error("ListService.create error:", error);
      return { success: false, error: "Error al crear la lista" };
    }
  },

  async delete(listName, existingLists) {
    if (!listName || !existingLists?.[listName]) {
      return { success: false, error: "Lista no encontrada" };
    }

    try {
      const updatedLists = { ...existingLists };
      delete updatedLists[listName];
      await DatabaseService.set(LISTS_PATH, updatedLists);
      return { success: true };
    } catch (error) {
      console.error("ListService.delete error:", error);
      return { success: false, error: "Error al eliminar la lista" };
    }
  },

  getListNames(lists) {
    if (!lists || typeof lists !== "object") return [];
    return Object.keys(lists);
  },
};

export default ListService;
