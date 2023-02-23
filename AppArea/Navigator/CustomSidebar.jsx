import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Image, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export const CustomSidebar = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../assets/icon.png")}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props} style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 13,
          textAlign: "center",
          color: "#215055",
        }}
      >
        Gracias por probar esta App.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: "center",
    flex: 1,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});
