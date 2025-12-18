import { View, StyleSheet } from "react-native";
import { SafeContainer } from "../../Components/SafeContainer";
import { ModalAddList } from "./ModalAddList";
import { ListOfLists } from "./ListOfLists";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#62EFFF",
  },
  topSection: {
    flex: 9,
  },
  bottomSection: {},
});

export default ListSection = () => {
  return (
    <SafeContainer style={styles.container}>
      <View style={styles.topSection}>
        <ListOfLists />
      </View>

      <View style={styles.bottomSection}>
        <ModalAddList />
      </View>
    </SafeContainer>
  );
};
