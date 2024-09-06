import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the dropdown icon and radio buttons
import Header from '../components/Header';
import { blackColor, redColor, whiteColor, lightShadeBlue, mediumGray, grayColor } from '../constants/Color'

const ReturnRequestScreen = ({ navigation }) => {
    const [selectedReason, setSelectedReason] = useState('');
    const [selectedSubReason, setSelectedSubReason] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(''); // To differentiate between reason and sub-reason
    const [checked, setChecked] = useState('Return/Refund'); // Initial selected radio button

    const reasons = ['Damaged Product', 'Incorrect Size', 'Wrong Item'];
    const subReasons = ['Small', 'Large', 'Other'];

    const openModal = (type) => {
        setModalType(type);
        setModalVisible(true);
    };

    const selectItem = (item) => {
        if (modalType === 'reason') {
            setSelectedReason(item);
        } else {
            setSelectedSubReason(item);
        }
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Report and Issue Request</Text>
            </View>
            {/* <Header
                backIcon={true}
                navigation={navigation}
                text={"Report and Issue Request"} /> */}
            <View style={{ paddingHorizontal: 16, }}>
                <View style={styles.productContainer}>
                    <Image
                        source={require('../assests/regularfit.png')}
                        style={styles.productImage}
                    />
                    <View style={styles.productDetails}>
                        <Text style={styles.productTitle}>Regular Fit Slogan</Text>
                        <Text style={styles.productDescription}>The name says it all, the right size slightly.</Text>
                        <Text style={styles.productPrice}>$ 1290 (Includes Convenience Fee)</Text>
                    </View>
                </View>

                <Text style={styles.inputLabel}>Enter Report and Issue Details</Text>
                {selectedReason ? <Text style={{ marginHorizontal: 15, paddingLeft:5, position:"absolute",top:155,left:15,zIndex: 1, backgroundColor: whiteColor,
                 width: "29%" }}>Select Reason<Text style={{ color: redColor }}>*</Text></Text> : null}
                <TouchableOpacity style={styles.selectInput} activeOpacity={0.9} onPress={() => openModal('reason')}>
                    <Text style={styles.selectText}>
                        {selectedReason ? selectedReason : 'Select Reason'}
                    </Text>
                    <Icon name="keyboard-arrow-down" size={24} color="#000" />
                </TouchableOpacity>
                {selectedSubReason ? <Text style={{ marginHorizontal: 15, paddingLeft:5, position:"absolute",top:223,left:15,zIndex: 1, backgroundColor: whiteColor,
                 width: "38%" }}>Select Sub Reason<Text style={{ color: redColor }}>*</Text></Text> : null}
                <TouchableOpacity style={styles.selectInput} activeOpacity={0.9} onPress={() => openModal('subReason')}>
                    <Text style={styles.selectText}>
                        {selectedSubReason ? selectedSubReason : 'Sub Reason'}
                    </Text>
                    <Icon name="keyboard-arrow-down" size={24} color="#000" />
                </TouchableOpacity>

                <View style={styles.radioGroup}>
                    <TouchableOpacity style={styles.radioButtonContainer} onPress={() => setChecked('Return/Refund')}>
                        <Icon name={checked === 'Return/Refund' ? 'radio-button-checked' : 'radio-button-unchecked'} size={24} color={redColor} />
                        <Text style={styles.radioText}>Return/Refund</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radioButtonContainer} onPress={() => setChecked('Exchange')}>
                        <Icon name={checked === 'Exchange' ? 'radio-button-checked' : 'radio-button-unchecked'} size={24} color={redColor} />
                        <Text style={styles.radioText}>Exchange</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radioButtonContainer} onPress={() => setChecked('We will Decide later')}>
                        <Icon name={checked === 'We will Decide later' ? 'radio-button-checked' : 'radio-button-unchecked'} size={24} color={redColor} />
                        <Text style={styles.radioText}>We will Decide later</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginBottom: 10 }}>Write a Comment <Text style={{ color: redColor }}>*</Text></Text>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Comment"
                    multiline
                />

                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>

                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={modalType === 'reason' ? reasons : subReasons}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.modalItem} onPress={() => selectItem(item)}>
                                        <Text style={styles.modalText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        paddingHorizontal: 10
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    productContainer: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E6E6E6"

    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    productDetails: {
        flex: 1,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 14,
        color: '#999',
    },
    inputLabel: {
        fontSize: 14,
        marginBottom: 16,
    },
    selectInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E6E6E6"
    },
    selectText: {
        fontSize: 14,
        color: '#333',
    },
    radioGroup: {
        marginBottom: 16,
    },
    radioButtonContainer: {
        width: "50%",
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    radioText: {
        marginLeft: 8,
        fontSize: 16,
    },
    commentInput: {
        height: 100,
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 16,
        textAlignVertical: 'top',
    },
    saveButton: {
        padding: 16,
        backgroundColor: redColor,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 80,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
    },
    modalItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalText: {
        fontSize: 16,
    },
});

export default ReturnRequestScreen;
