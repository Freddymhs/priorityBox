import { ref, set } from "@firebase/database";
import { Button, Input, Modal, Text, useToast } from "native-base";
import { useContext, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Alert } from "react-native";
import { db } from "../../../lib/init-firebase";
import { StyleSheet } from "react-native";
import { MyContext } from "../../../lib/Context";

const styles = StyleSheet.create({
  header: { backgroundColor: "#62EFFF", borderColor: "#62EFFF" },
  body: { backgroundColor: "#62EFFF" },
  footer: { backgroundColor: "#62EFFF", borderColor: "#62EFFF" },
  button: {
    backgroundColor: "#215055",
    borderRadius: 8,
    padding: 10,
    width: 233,
    height: 55,
    alignSelf: "center",
    marginBottom: 11,
  },
  textButton: { fontSize: 18, fontWeight: "bold", color: "white" },
  buttonGroup: {
    backgroundColor: "#215055",
    borderRadius: 8,
    padding: 10,
    alignSelf: "center",
  },
  textButtonGroup: { fontSize: 18, color: "white" },
});

export const ModalAddList = ({ compactSize = false }) => {
  const toast = useToast();
  const { boxData = [], refetchBoxData } = useContext(MyContext);
  const { CloseButton, Content, Body, Header, Footer } = Modal;
  const [titleOfList, setTitleOfList] = useState("");
  const [descriptionOfList, setDescriptionOfList] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const createNewList = () => {
    if (titleOfList?.length < 1 || descriptionOfList?.length < 1) {
      Alert.alert("No es valido un campo vacio");
      return;
    }
    if (boxData?.[titleOfList]) {
      console.log("2");
      Alert.alert("esta lista ya existe");
      return;
    }

    const listToAdd = {
      ...boxData,
      [titleOfList]: { description: descriptionOfList || "", items: [{}] },
    };

    set(ref(db, "/listas"), listToAdd);
    refetchBoxData();
    setModalVisible(false);

    setTitleOfList("");
    setDescriptionOfList("");
    toast.show({
      description: "LISTA CREADA",
      placement: "top",
    });
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}
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
              createNewList={createNewList}
            />
          </Footer>
        </Content>
      </Modal>

      {compactSize ? (
        <FontAwesome
          name="plus-square"
          size={32}
          color="#215055"
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

const FooterButtons = ({ setModalVisible, createNewList }) => {
  const { Group } = Button;
  return (
    <Group space={2}>
      <Button
        style={styles.buttonGroup}
        variant="ghost"
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <Text style={styles.textButtonGroup}>
          <FontAwesome name="close" size={21} color="white" />
          Cancelar
        </Text>
      </Button>
      <Button
        style={styles.buttonGroup}
        onPress={() => {
          createNewList();
        }}
      >
        <Text style={styles.textButtonGroup}>
          <FontAwesome name="check" size={21} color="white" />
          Guardar
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
        borderColor="#215055"
        placeholderTextColor="#34656A"
        onChangeText={(e) => {
          setTitleOfList(e);
        }}
        value={titleOfList}
        w="100%"
        placeholder="nombre"
      />
      <Input
        borderColor="#215055"
        placeholderTextColor="#34656A"
        w="100%"
        h="20"
        onChangeText={(e) => {
          setDescriptionOfList(e);
        }}
        value={descriptionOfList}
        placeholder="descripcion"
      />
    </>
  );
};
