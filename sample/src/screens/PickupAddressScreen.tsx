import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { blackColor, redColor, whiteColor, lightShadeBlue, mediumGray, grayColor } from '../constants/Color';


const PickupAddressScreen = ({ navigation }) => {
    const [selectedAddress, setSelectedAddress] = useState();

    const handleSelectAddress = () => {
        setSelectedAddress(!selectedAddress);
    };

    return (
        <ScrollView style={styles.container}>
            {/* {/ Header /} */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row" }}>
                    <AntDesign name="plus" size={20} color={redColor} />
                    <Text style={styles.addAddress}>Add Address</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Select Pick Up Address</Text>
            <Text style={styles.stepText}>Step 1 to 3</Text>

            {/* {/ Address Card /} */}
            <TouchableOpacity style={styles.addressCard} activeOpacity={0.9}>
                <View style={styles.addressRow}>
                    <View>
                        <Text style={styles.addressName}>David Smith</Text>
                        <Text style={styles.addressPhone}>+157 214 2541</Text>
                        <Text style={styles.orderId}>ORDER ID - 0D125478965478963214</Text>
                        <Text style={styles.returnPickup}>Return Pickup available</Text>
                        <Text style={styles.exchangeAvailable}>Exchange available</Text>
                    </View>

                </View>
                <TouchableOpacity style={styles.radioButton} onPress={handleSelectAddress} activeOpacity={0.9}>
                    <Icon name={selectedAddress ? "radio-button-checked" : "radio-button-unchecked"} size={24} color={redColor} />
                </TouchableOpacity>
            </TouchableOpacity>

            {/* {/ Ads Section /} */}
            <View style={styles.adsContainer}>
                <Text style={styles.adsTitle}>Ads</Text>
                <Image
                    source={require('../assests/vip_banner_1.png')}
                    style={styles.adsImage}
                />
            </View>

            {/* {/ Proceed Button /} */}
            <TouchableOpacity style={styles.proceedButton}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 6
    },
    addAddress: {
        color: redColor,
        fontSize: 16,
        marginLeft: 4,
    },
    stepText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    addressCard: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addressRow: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        width: "100%"
    },
    addressName: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
    },
    addressDetails: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    addressPhone: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    orderId: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: 10,
    },
    returnPickup: {
        fontSize: 14,
        color: redColor,
        marginBottom: 4,
    },
    exchangeAvailable: {
        fontSize: 14,
        color: redColor,
    },
    radioButton: {
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        right: 20,
        top: 16
    },
    adsContainer: {
        marginBottom: 140,
    },
    adsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: redColor,
        marginBottom: 8,
    },
    adsImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    proceedButton: {
        backgroundColor: redColor,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 70,
    },
    proceedButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PickupAddressScreen;
