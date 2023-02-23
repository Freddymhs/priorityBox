import { Text, View, Box } from "native-base";
import { FlatList, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { handleDeleteByList, handleDeleteList } from "../../../lib/helpers";
import { useContext, useEffect } from "react";
import { MyContext } from "../../../lib/Context";

export const ListOfLists = () => {
  const { boxData, refetchBoxData } = useContext(MyContext);

  const titlesInList = Object.keys(boxData || {});

  if (!boxData) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="16" color="gray.400">
          No hay listas disponibles
        </Text>
      </Box>
    );
  }
  return (
    <FlatList
      data={titlesInList || []}
      renderItem={({ item: t }) => {
        const oneList = boxData[t];
        const itemsOfList = oneList?.items;

        return (
          <View style={styles.listItemContainer}>
            <View style={styles.listItemHeader}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome
                  name="cube"
                  size={16}
                  color="#215055"
                  style={{ paddingRight: 5, paddingLeft: 3 }}
                />
                <Text
                  style={styles.listTitle}
                  onPress={() => {
                    handleDeleteList(t, boxData, refetchBoxData);
                  }}
                >
                  {t}
                </Text>
              </View>
              <Text style={styles.itemCount}>
                {itemsOfList?.length
                  ? `${itemsOfList.length} items`
                  : "sin elementos"}
              </Text>
            </View>
            {itemsOfList && (
              <FlatList
                data={itemsOfList || []}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      handleDeleteByList({ item, t }, boxData, refetchBoxData);
                    }}
                    style={styles.listItem}
                  >
                    <Text style={styles.listItemText}> {item.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(_, i) => i}
              />
            )}
          </View>
        );
      }}
      keyExtractor={(item) => item}
    />
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    paddingBottom: 8,
    paddingTop: 8,
  },
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#215055",
  },
  itemCount: {
    color: "#999",
  },
  listItem: {
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  listItemText: {
    fontSize: 14,
    color: "#215055",
  },
});
