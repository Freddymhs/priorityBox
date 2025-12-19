import { View, Text } from "react-native";
import { SafeContainer } from "../../Components/SafeContainer";
import { ModalAddList } from "./ModalAddList";
import { ListOfLists } from "./ListOfLists";
import { COMPONENT_STYLES } from "../../../lib/constants/theme";

const ListSection = () => {
  const styles = COMPONENT_STYLES.ListSection;

  return (
    <SafeContainer style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Listas</Text>
        <ModalAddList compactSize />
      </View>
      <View style={styles.listWrapper}>
        <ListOfLists />
      </View>
    </SafeContainer>
  );
};

export default ListSection;
