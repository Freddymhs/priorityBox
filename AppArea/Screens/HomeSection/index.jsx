import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ModalAddItem } from "./ModalAddItem";
import { Matriz } from "./Matriz";
import { COMPONENT_STYLES } from "../../../lib/constants/theme";

export default function HomeSection() {
  const styles = COMPONENT_STYLES.HomeSection;

  return (
    <>
      <View style={styles.topSection}>
        <Matriz />
      </View>
      <View style={styles.bottomSection}>
        <ModalAddItem />
      </View>
    </>
  );
}
