import * as React from "react";
import Timeline from "react-native-timeline-flatlist";
import { View, Text } from "native-base";
import { SafeContainer } from "../../Components/SafeContainer";
import { COLORS, COMPONENT_STYLES } from "../../../lib/constants/theme";

const styles = COMPONENT_STYLES.GuideSection;

const data = [
  {
    time: "1",
    title: <Text style={styles.title}>Captura</Text>,
    description: (
      <Text style={styles.description}>
        Anota ideas y deseos al instante. Libera tu mente.
      </Text>
    ),
  },
  {
    time: "2",
    title: <Text style={styles.title}>Clasifica</Text>,
    description: (
      <Text style={styles.description}>
        ¿Necesidad o Deseo? Prioriza con honestidad.
      </Text>
    ),
  },
  {
    time: "3",
    title: <Text style={styles.title}>Pausa</Text>,
    description: (
      <Text style={styles.description}>
        Deja pasar el tiempo. ¿Es real o solo un impulso?
      </Text>
    ),
  },
  {
    time: "4",
    title: <Text style={styles.title}>Revisa</Text>,
    description: (
      <Text style={styles.description}>
        Si cambia tu prioridad, mueve o elimina sin culpa.
      </Text>
    ),
  },
  {
    time: "5",
    title: <Text style={styles.title}>Decide</Text>,
    description: (
      <Text style={styles.description}>
        Actúa solo cuando estés seguro. Ahorra y gana paz.
      </Text>
    ),
  },
];

export default function GuideSection() {
  return (
    <SafeContainer style={styles.safeContainer}>
      <View style={styles.container}>
        <Timeline
          style={styles.timeline}
          listViewStyle={styles.timelineList}
          contentContainerStyle={styles.timelineContent}
          listViewContainerStyle={styles.timelineContent}
          options={{
            contentContainerStyle: styles.timelineContent,
            showsVerticalScrollIndicator: false,
          }}
          data={data}
          lineColor={COLORS.textMuted}
          circleColor={COLORS.primary}
        />
      </View>
    </SafeContainer>
  );
}
