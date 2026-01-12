import { SafeAreaView, StatusBar } from "react-native";
import { Navigator } from "./Navigator";
import { DataProvider } from "../lib/Context";
import { COMPONENT_STYLES, COLORS } from "../lib/constants/theme";

const AppArea = () => {
  const styles = COMPONENT_STYLES.AppArea;

  return (
    <DataProvider>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <SafeAreaView style={styles.safeAreaView}>
        <Navigator />
      </SafeAreaView>
    </DataProvider>
  );
};

export default AppArea;
