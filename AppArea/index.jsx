import { SafeAreaView } from "react-native";
import { Navigator } from "./Navigator";
import { DataProvider } from "../lib/Context";
import { COMPONENT_STYLES } from "../lib/constants/theme";

const AppArea = () => {
  const styles = COMPONENT_STYLES.AppArea;

  return (
    <DataProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <Navigator />
      </SafeAreaView>
    </DataProvider>
  );
};

export default AppArea;
