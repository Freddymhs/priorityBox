import { Button, Input, Modal, Text, useToast } from "native-base";
import { useContext, useState, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Alert, StyleSheet } from "react-native";
import { MyContext } from "../../../lib/Context";
import { useLists } from "../../../lib/hooks";
import {
  COLORS,
  COMMON_STYLES,
  BORDER_RADIUS,
  SPACING,
  FONT_SIZES,
} from "../../../lib/constants/theme";

const styles = StyleSheet.create({
  header: COMMON_STYLES.modal.header,
  body: COMMON_STYLES.modal.body,
  footer: COMMON_STYLES.modal.footer,
  button: {
    ...COMMON_STYLES.button,
    width: 233,
    height: 55,
    alignSelf: "center",
    marginBottom: SPACING.md,
  },
  textButton: {
    ...COMMON_STYLES.buttonText,
  },
  buttonGroup: {
    ...COMMON_STYLES.button,
    alignSelf: "center",
  },
  textButtonGroup: {
    fontSize: FONT_SIZES.title,
    color: COLORS.textLight,
  },
});

export const ModalAddList = ({ compactSize = false }) => {
  const toast = useToast();
  const { boxData = [], refetchBoxData } = useContext(MyContext);
  const { CloseButton, Content, Body, Header, Footer } = Modal;

  // Hook SOLID
  const { createList, isLoading } = useLists(boxData, refetchBoxData);

  const [titleOfList, setTitleOfList] = useState("");
  const [descriptionOfList, setDescriptionOfList] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const resetForm = useCallback(() => {
    setTitleOfList("");
    setDescriptionOfList("");
  }, []);

  const handleCreateList = useCallback(async () => {
    const result = await createList(titleOfList, descriptionOfList);

    if (result.success) {
      setModalVisible(false);
      resetForm();
      toast.show({
        description: "LISTA CREADA",
        placement: "top",
      });
    } else {
      Alert.alert("Error", result.error || "Error al crear la lista");
    }
  }, [titleOfList, descriptionOfList, createList, toast, resetForm]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <Content maxWidth="720px">
          <CloseButton />
          <Header style={styles.header}>Crear Lista</Header>

          <Body style={styles.body}>
            <ModalBodyInputs
              titleOfList={titleOfList}
              descriptionOfList={descriptionOfList}
              setTitleOfList={setTitleOfList}
              setDescriptionOfList={setDescriptionOfList}
            />
          </Body>
          <Footer style={styles.footer}>
            <FooterButtons
              setModalVisible={setModalVisible}
              createNewList={handleCreateList}
              isLoading={isLoading}
            />
          </Footer>
        </Content>
      </Modal>

      {compactSize ? (
        <FontAwesome
          name="plus-square"
          size={32}
          color={COLORS.primaryDark}
          onPress={() => setModalVisible(true)}
        />
      ) : (
        <Button style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.textButton}>Crear Lista</Text>
        </Button>
      )}
    </>
  );
};

const FooterButtons = ({ setModalVisible, createNewList, isLoading }) => {
  const { Group } = Button;
  return (
    <Group space={2}>
      <Button
        style={styles.buttonGroup}
        variant="ghost"
        onPress={() => setModalVisible(false)}
      >
        <Text style={styles.textButtonGroup}>
          <FontAwesome name="close" size={21} color={COLORS.textLight} />
          Cancelar
        </Text>
      </Button>
      <Button
        style={styles.buttonGroup}
        isDisabled={isLoading}
        onPress={createNewList}
      >
        <Text style={styles.textButtonGroup}>
          <FontAwesome name="check" size={21} color={COLORS.textLight} />
          {isLoading ? "Guardando..." : "Guardar"}
        </Text>
      </Button>
    </Group>
  );
};

const ModalBodyInputs = ({
  titleOfList,
  descriptionOfList,
  setTitleOfList,
  setDescriptionOfList,
}) => {
  return (
    <>
      <Input
        borderColor={COLORS.primaryDark}
        placeholderTextColor={COLORS.textSecondary}
        onChangeText={setTitleOfList}
        value={titleOfList}
        w="100%"
        placeholder="nombre"
      />
      <Input
        borderColor={COLORS.primaryDark}
        placeholderTextColor={COLORS.textSecondary}
        w="100%"
        h="20"
        onChangeText={setDescriptionOfList}
        value={descriptionOfList}
        placeholder="descripcion"
      />
    </>
  );
};
