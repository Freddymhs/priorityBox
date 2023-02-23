import { View } from "react-native";
import { ModalAddList } from "./ModalAddList";
import { ListOfLists } from "./ListOfLists";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topSection: { flex: 9, backgroundColor: "#62EFFF" },

  bottomSection: {
    backgroundColor: "#62EFFF",
  },
});

export default ListSection = () => {
  return (
    <>
      <View style={styles.topSection}>
        <ListOfLists />
      </View>

      <View style={styles.bottomSection}>
        <ModalAddList />
      </View>
    </>
  );
};
