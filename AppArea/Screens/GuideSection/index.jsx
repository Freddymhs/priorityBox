import * as React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Timeline from "react-native-timeline-flatlist";
import { View, Center, Text } from "native-base";
import { SafeContainer } from "../../Components/SafeContainer";

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: "#62EFFF",
  },
  container: {
    flex: 12,
  },
  timeline: {
    width: "81%",
  },
  space: {
    flex: 1,
  },
  homeButton: {
    flex: 1,
    paddingTop: 67,
  },
  title: { color: "#215055", fontWeight: "bold", fontSize: 17 },
  description: { color: "#215055" },
});

const data = [
  {
    time: "1",
    title: <Text style={styles.title}>Crea tareas a completar</Text>,
    description: (
      <Text style={styles.description}>
        Define qué quieres lograr y organiza tus tareas en una de las 4
        categorías.
      </Text>
    ),
  },
  {
    time: "2",
    title: <Text style={styles.title}>Organiza tu matriz</Text>,
    description: (
      <Text style={styles.description}>
        Prioriza las tareas importantes y urgentes.
      </Text>
    ),
  },
  {
    time: "3",
    title: <Text style={styles.title}>Enfócate</Text>,

    description: (
      <Text style={styles.description}>
        Asegúrate de eliminar constantemente todo lo que no sea relevante.
      </Text>
    ),
  },
  {
    time: "4",
    title: <Text style={styles.title}>Revisa tu matriz</Text>,
    description: (
      <Text style={styles.description}>
        Elimina tareas que ya no consideres importantes o vuelve a agregarlas.
      </Text>
    ),
  },
  {
    time: "5",
    title: <Text style={styles.title}>No te sobrecargues</Text>,

    description: (
      <Text style={styles.description}> Disfruta de tu tiempo libre.</Text>
    ),
  },
];

export default function GuideSection({ navigation }) {
  return (
    <SafeContainer style={styles.safeContainer}>
      <View style={styles.space}></View>
      <View style={styles.container}>
        <Timeline
          style={styles.timeline}
          data={data}
          lineColor="#215055"
          circleColor="#215055"
        />
      </View>
      <Center style={styles.homeButton}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flex: 1 }}
        >
          <FontAwesome name="home" size={24} color="#215055" />
        </TouchableOpacity>
      </Center>
    </SafeContainer>
  );
}
