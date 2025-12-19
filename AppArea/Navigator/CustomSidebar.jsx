import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Image, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { COMPONENT_STYLES } from "../../lib/constants/theme";

const styles = COMPONENT_STYLES.CustomSidebar;

export const CustomSidebar = (props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerCard}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.sideMenuProfileIcon}
        />
        <Text style={styles.appTitle}>PriorityBox</Text>
        <Text style={styles.appSubtitle}>Enfoca lo que importa</Text>
      </View>
      <DrawerContentScrollView {...props} style={styles.drawerContent}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text style={styles.footerText}>Gracias por probar esta App.</Text>
    </SafeAreaView>
  );
};
