import { useState, useCallback } from "react";
import ItemService from "../services/ItemService";

const useItems = (listsData, onRefresh) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItem = useCallback(
    async (listName, item) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await ItemService.addToList(listName, item, listsData);

        if (result.success && onRefresh) {
          await onRefresh();
        } else if (!result.success) {
          setError(result.error);
        }

        return result;
      } catch (err) {
        const errorMsg = "Error al agregar el item";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [listsData, onRefresh]
  );

  const deleteItemFromList = useCallback(
    async (listName, itemName) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await ItemService.deleteFromList(
          listName,
          itemName,
          listsData
        );

        if (result.success && onRefresh) {
          await onRefresh();
        } else if (!result.success) {
          setError(result.error);
        }

        return result;
      } catch (err) {
        const errorMsg = "Error al eliminar el item";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [listsData, onRefresh]
  );

  const deleteItemFromAll = useCallback(
    async (item) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await ItemService.deleteFromAllLists(item, listsData);

        if (result.success && onRefresh) {
          await onRefresh();
        } else if (!result.success) {
          setError(result.error);
        }

        return result;
      } catch (err) {
        const errorMsg = "Error al eliminar el item";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [listsData, onRefresh]
  );

  const validateItem = useCallback((item) => {
    return ItemService.validateItem(item);
  }, []);

  const createItem = useCallback((data = {}) => {
    return ItemService.createItem(data);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Estado
    isLoading,
    error,

    // Métodos
    addItem,
    deleteItemFromList,
    deleteItemFromAll,
    validateItem,
    createItem,
    clearError,
  };
};

export default useItems;
