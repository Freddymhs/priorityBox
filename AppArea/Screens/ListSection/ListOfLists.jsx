import { Text, View, Box, useToast } from "native-base";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useContext, useCallback, useMemo } from "react";
import { MyContext } from "../../../lib/Context";
import { useItems, useLists, useConfirmation } from "../../../lib/hooks";
import { COLORS, FONT_SIZES, SPACING } from "../../../lib/constants/theme";

const ListItem = ({ item, onDelete }) => (
  <TouchableOpacity onPress={() => onDelete(item)} style={styles.listItem}>
    <Text style={styles.listItemText}>{item.name}</Text>
  </TouchableOpacity>
);

const ListHeader = ({ title, itemCount, onDeleteList }) => (
  <View style={styles.listItemHeader}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FontAwesome
        name="cube"
        size={16}
        color={COLORS.primaryDark}
        style={{ paddingRight: 5, paddingLeft: 3 }}
      />
      <Text style={styles.listTitle} onPress={onDeleteList}>
        {title}
      </Text>
    </View>
    <Text style={styles.itemCount}>
      {itemCount > 0 ? `${itemCount} items` : "sin elementos"}
    </Text>
  </View>
);

const ListCard = ({ title, items, onDeleteList, onDeleteItem }) => (
  <View style={styles.listItemContainer}>
    <ListHeader
      title={title}
      itemCount={items?.length || 0}
      onDeleteList={onDeleteList}
    />
    {items && items.length > 0 && (
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem item={item} onDelete={onDeleteItem} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    )}
  </View>
);

const EmptyState = () => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Text fontSize="16" color="gray.400">
      No hay listas disponibles
    </Text>
  </Box>
);

export const ListOfLists = () => {
  const toast = useToast();
  const { boxData, refetchBoxData } = useContext(MyContext);

  // Hooks SOLID
  const { deleteItemFromList } = useItems(boxData, refetchBoxData);
  const { deleteList } = useLists(boxData, refetchBoxData);
  const { confirmDeleteItem, confirmDeleteList } = useConfirmation();

  // Obtener títulos de las listas
  const listTitles = useMemo(() => {
    return Object.keys(boxData || {});
  }, [boxData]);

  const handleDeleteList = useCallback(
    (listName) => {
      confirmDeleteList(async () => {
        const result = await deleteList(listName);
        if (result.success) {
          toast.show({
            description: "LISTA ELIMINADA",
            placement: "top",
          });
        }
      });
    },
    [confirmDeleteList, deleteList, toast]
  );

  const handleDeleteItemFromList = useCallback(
    (listName, item) => {
      confirmDeleteItem(async () => {
        const result = await deleteItemFromList(listName, item.name);
        if (result.success) {
          toast.show({
            description: "TAREA ELIMINADA",
            placement: "top",
          });
        }
      });
    },
    [confirmDeleteItem, deleteItemFromList, toast]
  );

  if (!boxData) {
    return <EmptyState />;
  }

  return (
    <FlatList
      data={listTitles}
      renderItem={({ item: listName }) => {
        const list = boxData[listName];
        const items = list?.items;

        return (
          <ListCard
            title={listName}
            items={items}
            onDeleteList={() => handleDeleteList(listName)}
            onDeleteItem={(item) => handleDeleteItemFromList(listName, item)}
          />
        );
      }}
      keyExtractor={(item) => item}
    />
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    paddingBottom: SPACING.sm,
    paddingTop: SPACING.sm,
  },
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listTitle: {
    fontSize: FONT_SIZES.subtitle,
    fontWeight: "bold",
    color: COLORS.primaryDark,
  },
  itemCount: {
    color: COLORS.textMuted,
  },
  listItem: {
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  listItemText: {
    fontSize: FONT_SIZES.body,
    color: COLORS.primaryDark,
  },
});
