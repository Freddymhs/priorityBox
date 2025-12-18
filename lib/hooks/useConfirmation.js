import { useCallback } from "react";
import { Alert } from "react-native";

const useConfirmation = () => {
  const showConfirmation = useCallback(
    ({
      title,
      message,
      onConfirm,
      onCancel,
      confirmText = "Sí",
      cancelText = "No",
      confirmStyle = "default",
    }) => {
      Alert.alert(
        title,
        message,
        [
          {
            text: confirmText,
            style: confirmStyle,
            onPress: onConfirm,
          },
          {
            text: cancelText,
            onPress: onCancel || (() => {}),
          },
        ],
        { cancelable: false }
      );
    },
    []
  );

  const confirmDeleteItem = useCallback(
    (onConfirm) => {
      showConfirmation({
        title: "Confirmar borrado",
        message: "¿Estás seguro de que deseas borrar este item?",
        onConfirm,
      });
    },
    [showConfirmation]
  );

  const confirmDeleteList = useCallback(
    (onConfirm) => {
      showConfirmation({
        title: "Confirmar borrado",
        message:
          "¿Estás seguro de que deseas borrar la lista y todos los items que contiene?",
        onConfirm,
        confirmStyle: "destructive",
      });
    },
    [showConfirmation]
  );

  return {
    showConfirmation,
    confirmDeleteItem,
    confirmDeleteList,
  };
};

export default useConfirmation;
