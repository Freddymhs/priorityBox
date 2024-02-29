import { ref, update } from "@firebase/database";
import { db } from "./init-firebase";
import { onValue, set } from "firebase/database";
import { Alert } from "react-native";

export const getDataFromFirebase = async () => {
  const refRealTimeDatabase = ref(db, "/listas");

  try {
    return await new Promise((resolve) =>
      onValue(refRealTimeDatabase, (snapshot) => {
        resolve(snapshot.val());
      })
    );
  } catch (err) {
    console.log("no pude obtener la data desde firebase realtime");
  }
};

export const handleDeleteByList = (
  { t: titleList, item: { name: itemName } },
  mainLists,
  refetchBoxData,
  toast
) => {
  const allItems = mainLists[titleList].items;
  const newItems = allItems.filter(({ name }) => name !== itemName);

  const newItemsObject = {};
  newItems.forEach((item, i) => {
    newItemsObject[i] = item;
  });

  Alert.alert(
    "Confirmar borrado",
    `¿Estás seguro de que deseas borrar este item?`,
    [
      {
        text: "Sí",
        onPress: () => {
          set(ref(db, `/listas/${titleList}/items`), newItemsObject);
          refetchBoxData();
          toast.show({
            description: "TAREA ELIMINADA",
            placement: "top",
          });
        },
      },
      {
        text: "No",
        onPress: () => console.log("No se borró el elemento"),
      },
    ],
    { cancelable: false }
  );
};

export const handleDeleteByItem = (
  itemToDelete,
  mainLists,
  refetchBoxData,
  toast
) => {
  (async () => {
    const res = mainLists;

    const filteredValue = {};
    for (const propiedad in res) {
      const listName = propiedad;
      const { items = [], ...rest } = res[propiedad];

      const filteredList = items.filter((i) => {
        if (JSON.stringify(i) !== JSON.stringify(itemToDelete)) {
          return i;
        }
      });

      filteredValue[listName] = { items: filteredList, ...rest };
    }
    Alert.alert(
      "Confirmar borrado",
      `¿Estás seguro de que deseas borrar este item?`,
      [
        {
          text: "Sí",
          onPress: () => {
            set(ref(db, "/listas/"), { ...filteredValue });
            refetchBoxData();
            toast.show({
              description: "TAREA ELIMINADA",
              placement: "top",
            });
          },
        },
        {
          text: "No",
          onPress: () => console.log("No se borró el elemento"),
        },
      ],
      { cancelable: false }
    );
  })();
};

export const handleDeleteList = (t, boxData, refetchBoxData, toast) => {
  Alert.alert(
    "Confirmar borrado",
    `¿Estás seguro de que deseas borrar la lista y todo los items que contiene?`,
    [
      {
        text: "Sí",
        style: "destructive",
        disabled: true,
        onPress: () => {
          delete boxData?.[t];
          set(ref(db, `/listas/`), boxData);
          refetchBoxData();
          toast.show({
            description: "LISTA ELIMINADA",
            placement: "top",
          });
        },
      },
      {
        text: "No",
        onPress: () => console.log("No se borró el elemento"),
      },
    ],
    { cancelable: false }
  );
};
