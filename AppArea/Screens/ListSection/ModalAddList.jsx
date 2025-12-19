import { Button, Input, Modal, Text, useToast } from "native-base";
import { useContext, useState, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { MyContext } from "../../../lib/Context";
import { useLists } from "../../../lib/hooks";
import {
  COLORS,
  COMMON_STYLES,
  COMPONENT_STYLES,
  INPUT_STATES,
} from "../../../lib/constants/theme";

const styles = COMPONENT_STYLES.ModalAddList;

export const ModalAddList = ({ compactSize = false }) => {
  const toast = useToast();
  const { boxData = [], refetchBoxData } = useContext(MyContext);

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
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "height"}
          enabled
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Modal.Content maxWidth="720px">
            <Modal.CloseButton />
            <Modal.Header style={styles.header}>Crear Lista</Modal.Header>

            <Modal.Body style={styles.body}>
              <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <ModalBodyInputs
                  titleOfList={titleOfList}
                  descriptionOfList={descriptionOfList}
                  setTitleOfList={setTitleOfList}
                  setDescriptionOfList={setDescriptionOfList}
                />
              </ScrollView>
            </Modal.Body>
            <Modal.Footer style={styles.footer}>
              <FooterButtons
                setModalVisible={setModalVisible}
                createNewList={handleCreateList}
                isLoading={isLoading}
              />
            </Modal.Footer>
          </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>

      {compactSize ? (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.compactButton}
          activeOpacity={0.85}
        >
          <FontAwesome name="plus" size={22} style={styles.compactIcon} />
        </TouchableOpacity>
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
        <Text style={styles.textButtonGroup}>Cancelar</Text>
      </Button>
      <Button
        style={styles.buttonGroup}
        isDisabled={isLoading}
        onPress={createNewList}
      >
        <Text style={styles.textButtonGroupSave}>
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
        variant="unstyled"
        style={COMMON_STYLES.input}
        _focus={INPUT_STATES.focusStyle}
        placeholderTextColor={COLORS.textMuted}
        onChangeText={setTitleOfList}
        value={titleOfList}
        w="100%"
        placeholder="nombre"
      />
      <Input
        variant="unstyled"
        style={COMMON_STYLES.input}
        _focus={INPUT_STATES.focusStyle}
        placeholderTextColor={COLORS.textMuted}
        w="100%"
        h="20"
        onChangeText={setDescriptionOfList}
        value={descriptionOfList}
        placeholder="descripcion"
      />
    </>
  );
};
