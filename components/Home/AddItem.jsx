import { onValue, ref, set } from 'firebase/database';
import { Box, Button, Center, CheckIcon, HStack, Input, Modal, Select, VStack } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { db } from '../../init-firebase';


export const AddItem = () => {
  const { CloseButton, Content, Body, Header, Footer } = Modal;
  const { Group } = Button;
  const { Item } = Select;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [mainLists, setMainLists] = useState(null);
  const [text, onChangeText] = useState({
    name: "",
    priority: "bajo",
    type: "deseo"
  });



  const addItemInList = () => {

    const newPosition = mainLists[selectedList]?.items?.length || 0;
    set(ref(db, `/listas/${selectedList}/items/${newPosition}`), text);
  }
  const [listNames, setListNames] = React.useState([]);

  useEffect(() => {
    const refRealTimeDatabase = ref(db, "/listas");
    function getDataFromFirebase() {
      try {
        onValue(refRealTimeDatabase, (snapshot) => {
          const data = snapshot.val();
          setMainLists(data)
          setListNames(Object.keys(data))
        });
      } catch (err) {
        console.log("no pude obtener la data desde firebase realtime");
      }
    }
    getDataFromFirebase();
  }, []);

  return (
    <View style={styles.centeredView}>

      <Modal
        animationType="slide"
        transparent={true}
        isOpen={modalVisible}
        onClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Content maxWidth="350">
          <CloseButton />
          <Header>Ingrese nuevo Item</Header>

          <Body>


            <Select

              selectedValue={selectedList}
              onValueChange={itemValue => (setSelectedList(itemValue))}
              placeholder="A que lista agregar este item?"
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />
              }}>
              {
                listNames?.map((name) => {
                  return <Item label={name} value={name} />
                })
              }
            </Select>





            <Input
              onChangeText={(e) => {
                onChangeText((prev) => {
                  return { ...prev, name: e };
                });
              }}
              value={text.name}
              w="100%" placeholder="Asigne un nombre" _light={{
                placeholderTextColor: "blueGray.400"
              }} _dark={{
                placeholderTextColor: "blueGray.50"
              }} />

            <Select selectedValue={text.type} minWidth={200} placeholder="Deseo o prioridad?"
              onValueChange={itemValue => onChangeText((prev) => ({ ...prev, type: itemValue }))}
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />
              }}>
              <Select.Item label="necesidad" value="necesidad" />
              <Select.Item label="deseo" value="deseo" />
            </Select>
            <Select selectedValue={text.priority} minWidth={200} placeholder="Nivel de relevancia "
              onValueChange={itemValue => onChangeText((prev) => ({ ...prev, priority: itemValue }))}
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />
              }}>
              <Select.Item label="Muy Importante" value="alto" />
              <Select.Item label="Poco Importante" value="bajo" />
            </Select>




            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={addItemInList}>
              <Text style={styles.textStyle}>agregar</Text>
            </Pressable> */}




          </Body>
          <Footer>
            <Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setModalVisible(false);
              }}>
                Cancel
              </Button>
              <Button onPress={() => {
                addItemInList();
                setModalVisible(false);
              }}>
                Save
              </Button>
            </Group>
          </Footer>
        </Content>

      </Modal >

      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress=>
        <Text style={styles.textStyle}>Agregar Item NUEVO!</Text>
      </Pressable> */}
      <Box Box alignItems="center" >
        <Button onPress={() => setModalVisible(true)}>Agregar a la lista</Button></Box >
    </View >
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
