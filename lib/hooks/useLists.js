import { useState, useCallback } from "react";
import ListService from "../services/ListService";

const useLists = (listsData, onRefresh) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createList = useCallback(
    async (name, description) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await ListService.create(name, description, listsData);

        if (result.success && onRefresh) {
          await onRefresh();
        } else if (!result.success) {
          setError(result.error);
        }

        return result;
      } catch (err) {
        const errorMsg = "Error al crear la lista";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [listsData, onRefresh]
  );

  const deleteList = useCallback(
    async (listName) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await ListService.delete(listName, listsData);

        if (result.success && onRefresh) {
          await onRefresh();
        } else if (!result.success) {
          setError(result.error);
        }

        return result;
      } catch (err) {
        const errorMsg = "Error al eliminar la lista";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    [listsData, onRefresh]
  );

  const getListNames = useCallback(() => {
    return ListService.getListNames(listsData);
  }, [listsData]);

  const listExists = useCallback(
    (listName) => {
      return !!listsData?.[listName];
    },
    [listsData]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Estado
    isLoading,
    error,

    // Métodos
    createList,
    deleteList,
    getListNames,
    listExists,
    clearError,
  };
};

export default useLists;
