import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { blackColor, redColor, whiteColor, lightShadeBlue, mediumGray, grayColor } from '../constants/Color';
import Header from '../components/Header';


const HelpCenter = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header
                backIcon={true}
                navigation={navigation}
                text={"Help Center"} />

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <TouchableOpacity style={styles.optionContainer}>
                    <Icon name="headset-outline" size={24} color="#000" />
                    <Text style={styles.optionText}>Customer Service</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer}>
                    <Icon name="logo-whatsapp" size={24} color="#000" />
                    <Text style={styles.optionText}>Whatsapp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer}>
                    <Icon name="globe-outline" size={24} color="#000" />
                    <Text style={styles.optionText}>Website</Text>
                </TouchableOpacity>

                <View style={styles.socialMediaContainer}>
                    <Text style={styles.socialMediaText}>Social media</Text>
                    <Text style={styles.followUsText}>Follow us / Like us</Text>
                </View>

                <TouchableOpacity style={styles.optionContainer}>
                    <Icon name="logo-facebook" size={24} color="#000" />
                    <Text style={styles.optionText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer}>
                    <Icon name="logo-twitter" size={24} color="#000" />
                    <Text style={styles.optionText}>Twitter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer}>
                    <Icon name="logo-instagram" size={24} color="#000" />
                    <Text style={styles.optionText}>Instagram</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentContainer: {
        marginTop: 20,
        paddingHorizontal: 15,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        marginVertical: 5,
    },
    optionText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#000',
    },
    socialMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
    },
    socialMediaText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    followUsText: {
        fontSize: 14,
        color: redColor,
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    navText: {
        fontSize: 12,
        color: '#A9A9A9',
        marginTop: 2,
    },
});

export default HelpCenter;
