import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { Navigator } from "./Navigator";
import { Provider } from "../lib/Context";

const AppArea = () => {
  // const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  // const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

  return (
    <Provider>
      <SafeAreaView style={styles.safeAreaView}>
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#62EFFF",
  },
});

export default AppArea;
