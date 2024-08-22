import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Header from '../components/Header'
import { blackColor, redColor, whiteColor, lightShadeBlue, mediumGray, grayColor } from '../constants/Color';


const OrderDetailsScreen = ({ navigation }) => {
    const [rating, setRating] = useState(0); // Rating state

    const mostPopularItems = [
        { id: '1', title: 'Lorem ipsum dolor sit amet consectetur', price: '$17.00', image: require('../assests/regularfit.png') },
        { id: '2', title: 'Lorem ipsum dolor sit amet consectetur', price: '$17.00', image: require('../assests/regularfit.png') },
        { id: '3', title: 'Lorem ipsum dolor sit amet consectetur', price: '$17.00', image: require('../assests/regularfit.png') },
    ];

    const renderPopularItem = ({ item }) => (
        <View style={styles.popularItem}>
            <Image source={item.image} style={styles.popularImage} />
            <Text style={styles.popularTitle}>{item.title}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, alignItems: "center" }}>
                <Text style={styles.popularPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderRatingStars = () => {
        return (
            <View style={styles.ratingContainer}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
                        <Icon
                            name={index < rating ? "star" : "star-border"}
                            size={24}
                            color={index < rating ? "#FFA928" : "grey"}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* {/ Header /} */}
            <Header backIcon={true} text={"Order Details"} navigation={navigation} />
            <View style={{ paddingHorizontal: 16 }}>
                <View style={styles.orderIdContainer}>
                    <Text style={styles.orderId}>ORDER ID - 0D125478965478963214</Text>
                </View>

                {/* {/ Product Details /} */}
                <View style={styles.productContainer}>
                    <View style={{ width: "80%", }}>
                        <Text style={styles.productTitle}>Regular Fit Slogan</Text>
                        <Text style={styles.productDescription}>The name says it all, the right size slightly snugs the body.</Text>
                        <Text style={styles.sellerName}>Seller First Choice</Text>
                        <Text style={styles.productPrice}>$652</Text>
                    </View>
                    <Image source={require('../assests/regularfit.png')} style={styles.productImage} />


                </View>

                {/* {/ Tracking /} */}
                <View style={styles.trackingContainer}>
                    <View style={styles.trackingRow}>
                        <View style={styles.trackingDot} />
                        <Text style={styles.trackingText}>Order Confirmed, Jan 11, 2024</Text>
                    </View>
                    <View style={styles.trackingRow}>
                        <View style={styles.trackingDot} />
                        <Text style={styles.trackingText}>Delivered, Jan 25, 2024</Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Text style={styles.seeAllUpdates}>See All Updates </Text>
                        <Icon name="chevron-right" size={24} color={redColor} />
                    </TouchableOpacity>
                </View>

                {/* {/ Rating Section /} */}
                <View style={styles.ratingSection}>
                    {renderRatingStars()}
                    {/*  */}
                </View>
                <View style={{ borderBottomWidth: 1, paddingBottom: 8, borderBottomColor: "#E6E6E6" }}>
                    <TouchableOpacity style={[styles.chatButton, { alignSelf: "center" }]}>
                        <Icon name="chat-bubble-outline" size={24} color="black" />
                        <Text style={styles.chatText}>Chat with us</Text>

                    </TouchableOpacity>
                </View>
                {/* {/ Actions /} */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={[styles.actionItem, { borderBottomWidth: 1, paddingBottom: 8, borderBottomColor: "#E6E6E6" }]}>
                        {/* <Icon name="file-download" size={24} color={redColor} /> */}
                        <Image source={require('../assests/invoicered.png')} style={{ width: 24, height: 24 }} />
                        <Text style={[styles.actionTextRed, { color: blackColor }]}>Invoice Download</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionItem, { alignSelf: "center" }]}>
                        {/* <Icon name="report-problem" size={24} color="black" /> */}
                        <Text style={[styles.actionText, { color: redColor, fontWeight: "500" }]}>Report an Issue</Text>
                    </TouchableOpacity>
                </View>

                {/* {/ Most Popular /} */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Most Popular</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={mostPopularItems}
                    renderItem={renderPopularItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

                {/* {/ Shipping Details /} */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Shipping Details</Text>
                </View>
                <View style={styles.shippingContainer}>
                    <Octicons name="home" size={22} color="black" />
                    <View style={styles.shippingTextContainer}>
                        <Text style={[styles.shippingText, { marginTop: 4 }]}>Wishaan</Text>
                        <Text style={[styles.shippingText, { fontSize: 12 }]}>49 Featherstone Street...</Text>
                        <Text style={styles.shippingText}>+157 214 2541 +157 214 2541</Text>
                    </View>
                </View>

                {/* {/ other item order Details /} */}
                <Text style={[styles.shippingText, { marginTop: 4 }]}>Other Items In This Order</Text>
                <View style={styles.productContainer}>

                    <View style={{ width: "80%", }}>
                        <Text style={styles.productTitle}>Regular Fit Slogan</Text>
                        <View style={[styles.trackingRow, { marginTop: 15 }]}>
                            <View style={styles.trackingDot} />
                            <Text style={styles.trackingText}>Delivered, Jan 25, 2024</Text>
                        </View>
                    </View>
                    <Image source={require('../assests/regularfit.png')} style={styles.productImage} />


                </View>

                {/* {/ Price Details /} */}
                <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Price Details</Text>
      </View>
      <View style={styles.priceDetailsContainer}>
        <View style={[styles.priceRow,{borderTopColor:"#E6E6E6", borderTopWidth:1 , paddingTop:10}]}>
          <Text style={styles.priceLabel}>List price</Text>
          <Text style={styles.priceValue}>$17.00</Text>
        </View>
        <View style={[styles.priceRow,{borderBottomColor:"#E6E6E6", borderBottomWidth:1, paddingBottom:10}]}>
          <Text style={styles.priceLabel}>Selling price</Text>
          <Text style={styles.priceValue}>$15.00</Text>
        </View>
        <View  style={[styles.priceRow,{borderBottomColor:"#E6E6E6", borderBottomWidth:1, paddingBottom:10}]}>
          <Text style={styles.priceLabel}>Total Amount</Text>
          <Text style={styles.priceValue}>$15.00</Text>
        </View>
        <View style={styles.priceRow}>
        <View style={[styles.trackingRow]}>
                            <View style={[styles.trackingDot,{backgroundColor:blackColor}]} />
                            <Text style={[styles.priceLabel,{color:blackColor}]}>UPI: $1500</Text>

                        </View>
          {/* <Text style={styles.priceValue}>$1500</Text> */}
        </View>
      </View>
            </View>
        </ScrollView>
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
    orderIdContainer: {
        borderTopWidth: 1,
        borderTopColor: "#E6E6E6",
        borderBottomWidth: 1,
        borderBottomColor: "#E6E6E6",
        paddingVertical: 10,
    },
    orderId: {
        fontSize: 14,
        color: '#666',
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6',
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        // width:"70%",
        // marginBottom: 4,
        marginVertical: 10
    },
    sellerName: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    trackingContainer: {
        // marginVertical: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    trackingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    trackingDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: redColor,
        marginRight: 8,
    },
    trackingText: {
        fontSize: 14,
        color: '#000',
    },
    seeAllUpdates: {
        color: redColor,
        fontSize: 14,
    },
    ratingSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    chatButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatText: {
        fontSize: 14,
        marginLeft: 8,
        color: '#000',
    },
    actionsContainer: {
        marginVertical: 10,
        // paddingVertical: 16,
        // borderBottomWidth: 1,
        // borderBottomColor: '#eee',
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    actionText: {
        fontSize: 14,
        marginLeft: 8,
        color: '#000',
    },
    actionTextRed: {
        fontSize: 14,
        marginLeft: 8,
        color: 'red',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    seeAll: {
        color: redColor,
        fontSize: 14,
    },
    popularItem: {
        marginRight: 16,
        width: 150,
        // alignItems: 'center',
    },
    popularImage: {
        width: 150,
        height: 150,
        marginBottom: 8,
        borderRadius: 8,
    },
    popularTitle: {
        fontSize: 14,
        color: '#000',
        // textAlign: 'center',
        marginBottom: 4,
    },
    popularPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    addButton: {
        backgroundColor: redColor,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    shippingContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderTopColor: "#E6E6E6",
        borderBottomColor: "#E6E6E6",
        paddingVertical: 10
    },
    shippingTextContainer: {
        marginLeft: 8,
    },
    shippingText: {
        fontSize: 14,
        color: '#000',
        marginBottom: 4,
    },
    priceDetailsContainer: {
        // paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
    },
    priceValue: {
        fontSize: 14,
        color: '#000',
    },
});

export default OrderDetailsScreen;
