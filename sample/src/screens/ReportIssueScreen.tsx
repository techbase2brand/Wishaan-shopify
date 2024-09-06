
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import { blackColor, redColor, whiteColor, lightShadeBlue, mediumGray, grayColor } from '../constants/Color'

const ReportIssueScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const FloatingLabelInput = ({ label, value, onChangeText, inputwidth, keyboardType = 'default' }) => {
    return (
      <View style={[styles.inputContainer, { width: inputwidth ? inputwidth : "48%" }]}>
        <Text style={styles.alwaysTopLabel}>{label}<Text style={{ color: redColor }}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* {/ Header /} */}
      <Header
        backIcon={true}
        navigation={navigation}
        text={"Report and Issue"} />
      <View style={{ paddingHorizontal: 16, }}>
        {/* {/ Options /} */}
        <TouchableOpacity style={styles.optionContainer} onPress={toggleModal}>
          <Text style={styles.optionText}>Request a Call Back</Text>
          <Icon name="chevron-right" size={24} color="grey" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionContainer} onPress={()=> navigation.navigate("ReturnRequestScreen")}>
          <Text style={styles.optionText}>Submit Report and Issue</Text>
          <Icon name="chevron-right" size={24} color="grey" />
        </TouchableOpacity>

        {/* {/ Modal /} */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Image source={require('../assests/requestcall.png')} style={{ width: "100%", height: 73, resizeMode: "cover" }} />
              </View>

              <View style={styles.formRow}>
                <FloatingLabelInput
                  label="Your Name"
                  value={name}
                  onChangeText={setName}
                />
                <FloatingLabelInput
                  label="Your Contact"
                  value={contact}
                  onChangeText={setContact}
                  keyboardType="phone-pad"
                />
              </View>
              <FloatingLabelInput
                label="Your Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                inputwidth="100%"
              />

              <TouchableOpacity style={styles.sendButton} onPress={toggleModal}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    padding: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputContainer: {
    width: '48%',
    position: 'relative',
    marginBottom: 20,
  },
  alwaysTopLabel: {
    position: 'absolute',
    left: 10,
    top: -8,
    fontSize: 12,
    color: blackColor,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  sendButton: {
    backgroundColor: redColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportIssueScreen;

