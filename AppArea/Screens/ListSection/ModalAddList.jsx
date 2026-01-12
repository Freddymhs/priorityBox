import { Button, Modal, Text, useToast } from "native-base";
import { useContext, useState, useCallback } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { MyContext } from "../../../lib/Context";
import { useLists } from "../../../lib/hooks";
import {
  COLORS,
  COMMON_STYLES,
  COMPONENT_STYLES,
} from "../../../lib/constants/theme";

const styles = COMPONENT_STYLES.ModalAddList;

export const ModalAddList = ({ compactSize = false }) => {
  const toast = useToast();
  const contextValue = useContext(MyContext);
  const { boxData = [], refetchBoxData } = contextValue || {};

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
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "height"}
          enabled={true}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Modal.Content maxWidth={720}>
            <Modal.CloseButton />
            <Modal.Header style={styles.header}>Crear Lista</Modal.Header>

            <Modal.Body style={styles.body}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
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
  const modalStyles = COMPONENT_STYLES.ModalAddItem;
  return (
    <Button.Group>
      <Button
        style={modalStyles.modalButtonCancel}
        onPress={() => setModalVisible(false)}
      >
        <Text style={modalStyles.modalButtonCancelText}>Cancelar</Text>
      </Button>
      <Button
        style={modalStyles.modalButtonSave}
        isDisabled={isLoading}
        onPress={createNewList}
      >
        <Text style={modalStyles.modalButtonSaveText}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Text>
      </Button>
    </Button.Group>
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
      <TextInput
        style={COMMON_STYLES.textInput}
        placeholderTextColor={COLORS.textMuted}
        onChangeText={setTitleOfList}
        value={titleOfList}
        placeholder="nombre"
      />
      <TextInput
        style={COMMON_STYLES.textInputMultiline}
        placeholderTextColor={COLORS.textMuted}
        onChangeText={setDescriptionOfList}
        value={descriptionOfList}
        placeholder="descripcion"
        multiline
      />
    </>
  );
};
