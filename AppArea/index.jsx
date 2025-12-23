import { SafeAreaView } from "react-native";
import { Navigator } from "./Navigator";
import { Provider } from "../lib/Context";
import { COMPONENT_STYLES } from "../lib/constants/theme";

const AppArea = () => {
  const styles = COMPONENT_STYLES.AppArea;

  return (
    <Provider>
      <SafeAreaView style={styles.safeAreaView}>
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
};

export default AppArea;
