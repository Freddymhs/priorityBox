import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ModalAddItem } from "./ModalAddItem";
import { Matriz } from "./Matriz";

const styles = StyleSheet.create({
  topSection: { flex: 1 },

  bottomSection: {
    backgroundColor: "#62EFFF",
  },
});

export default function HomeSection() {
  return (
    <>
      <View style={styles.topSection}>
        <Matriz />
      </View>
      <View style={styles.bottomSection}>
        {/* aca falla */}
        <ModalAddItem />
      </View>
    </>
  );
}
