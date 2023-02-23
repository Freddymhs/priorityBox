import * as React from "react";
import { CustomSidebar } from "./CustomSidebar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import HomeSection from "../Screens/HomeSection";
import GuideSection from "../Screens/GuideSection";
import ListSection from "../Screens/ListSection";

export const Navigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(navigatorProps) => (
          <CustomSidebar {...navigatorProps} />
        )}
        initialRouteName="LISTAS"
        screenOptions={{
          drawerType: "front",
          drawerStyle: {
            backgroundColor: "#62EFFF",
            width: "89%",
          },
          drawerActiveTintColor: "#215055",
          drawerActiveBackgroundColor: "#52C7D5",
          drawerInactiveTintColor: "#317880",
        }}
      >
        <Drawer.Screen
          name="MATRIZ"
          component={HomeSection}
          options={{
            headerShown: false,
            drawerIcon: () => (
              <FontAwesome name="list-alt" size={32} color="#215055" />
            ),
          }}
        />
        <Drawer.Screen
          name="LISTAS"
          component={ListSection}
          options={{
            headerShown: false,
            drawerIcon: () => (
              <FontAwesome name="th-list" size={32} color="#215055" />
            ),
          }}
        />
        <Drawer.Screen
          name="GUIA"
          component={GuideSection}
          options={{
            headerShown: false,
            drawerIcon: () => (
              <FontAwesome name="file" size={32} color="#215055" />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
