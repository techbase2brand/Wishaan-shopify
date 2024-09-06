import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header'
import ReviewForm from '../components/ReviewForm'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import { redColor } from '../constants/Color';
import axios from 'axios';
import {ADMINAPI_ACCESS_TOKEN} from '../constants/Constants'


// const reviewsData = [
//     {
//         id: '1',
//         name: 'Donald Rice',
//         rating: 4.5,
//         review: 'The item is very good, my son likes it very much and plays every day.',
//         time: '5 min ago',
//         avatar: "https://media.istockphoto.com/id/1939608350/photo/happy-mature-latin-man-using-laptop-at-home-technology-and-smart-working-concept.webp?b=1&s=170667a&w=0&k=20&c=qiQHsBK6zXDBwoY_uGzh2BZdZ64a00VPL_8ZS9Nz610=", // Replace with your image path
//     },
//     {
//         id: '2',
//         name: 'Elmer Roberts',
//         rating: 4.5,
//         review: 'The seller is very fast in sending packet, I just bought it and the item arrived in just 1 day!',
//         time: '15 min ago',
//         avatar: "https://media.istockphoto.com/id/1939608350/photo/happy-mature-latin-man-using-laptop-at-home-technology-and-smart-working-concept.webp?b=1&s=170667a&w=0&k=20&c=qiQHsBK6zXDBwoY_uGzh2BZdZ64a00VPL_8ZS9Nz610=",
//     },
//     {
//         id: '3',
//         name: 'Elmer Roberts',
//         rating: 4.5,
//         review: 'I just bought it and the stuff is really good! I highly recommend it!',
//         time: '15 min ago',
//         avatar: "https://media.istockphoto.com/id/1939608350/photo/happy-mature-latin-man-using-laptop-at-home-technology-and-smart-working-concept.webp?b=1&s=170667a&w=0&k=20&c=qiQHsBK6zXDBwoY_uGzh2BZdZ64a00VPL_8ZS9Nz610=",
//     },
// ];

const ReviewScreen = ({ navigation, route }) => {
    // const [reviewRating, setReviewRating] = useState([]);
    // const [reviewDescription, setReviewDescription] = useState([]);
    // const [reviewsData, setReviewsData] = useState([]);
    // const { product } = route?.params;
    // //   console.log("product...", product);
    // console.log("productIDroute", product?.productId);
    // console.log("reviewsDatareviewsData", reviewsData);


    // const fetchProductMetafields = async (productID) => {


    //     // Extract the numeric product ID if you are using the GraphQL ID
    //     const numericProductID = productID.replace('gid://shopify/Product/', '');
    //     console.log("Numeric Product ID:", numericProductID);

    //     try {
    //         const response = await axios.get(`https://wishandemoapp.myshopify.com/admin/api/2024-07/products/${numericProductID}/metafields.json`, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         const metafields = response.data.metafields;
    //         console.log('All Metafield Values:', metafields);
    //         // Find the metafield with the key 'rating'
    //         const ratingMetafield = metafields.find(mf => mf.key === 'rating');
    //         const descriptionMetafield = metafields.find(mf => mf.key === 'reviewdes');

    //         if (ratingMetafield) {
    //             // Parse the JSON value
    //             const parsedRating = JSON.parse(ratingMetafield.value);
    //             setReviewRating(parsedRating); // Set the review rating state
    //         }

    //         if (descriptionMetafield) {
    //             // Parse the array of review descriptions
    //             const parsedDescriptions = JSON.parse(descriptionMetafield.value);
    //             setReviewDescription(parsedDescriptions); // Set the review descriptions state
    //         }


    //     } catch (error) {
    //         console.error('Error fetching metafields:', error.message);
    //     }
    // };



    // useEffect(() => {
    //     fetchProductMetafields(product?.productId)
    // }, []);
    // useEffect(() => {
    //     // Combine reviewRating and reviewDescriptions into reviewsData
    //     const combinedReviews = reviewRating.map((rating, index) => ({
    //         id: (index + 1).toString(),
    //         name: `Reviewer ${index + 1}`,  // You might replace this with actual reviewer names if available
    //         rating: parseFloat(rating.value),
    //         review: reviewDescription[index] || 'No review text available',
    //         time: `${(index + 1) * 5} min ago`, // Example time, you might want to calculate or replace it with actual data
    //         avatar: "https://media.istockphoto.com/id/1939608350/photo/happy-mature-latin-man-using-laptop-at-home-technology-and-smart-working-concept.webp?b=1&s=170667a&w=0&k=20&c=qiQHsBK6zXDBwoY_uGzh2BZdZ64a00VPL_8ZS9Nz610=", // Replace with your image path
    //     }));

    //     setReviewsData(combinedReviews);
    // }, [reviewRating, reviewDescription]);


    const [reviewRating, setReviewRating] = useState([]);
    const [reviewDescription, setReviewDescription] = useState([]);
    const [reviewsData, setReviewsData] = useState([]);
    const { product } = route?.params;

    console.log("productIDroute", product?.productId);
    console.log("reviewsData", reviewsData);

    const fetchProductMetafields = async (productID) => {
        const numericProductID = productID.replace('gid://shopify/Product/', '');
        console.log("Numeric Product ID:", numericProductID);

        try {
            const response = await axios.get(`https://wishandemoapp.myshopify.com/admin/api/2024-07/products/${numericProductID}/metafields.json`, {
                headers: {
                    'X-Shopify-Access-Token': ADMINAPI_ACCESS_TOKEN,
                    'Content-Type': 'application/json'
                }
            });

            const metafields = response.data.metafields;
            console.log('All Metafield Values:', metafields);

            const ratingMetafield = metafields.find(mf => mf.key === 'rating');
            const descriptionMetafield = metafields.find(mf => mf.key === 'reviewdes');

            if (ratingMetafield) {
                const parsedRating = JSON.parse(ratingMetafield.value);
                setReviewRating(parsedRating);
                console.log('Parsed Rating:', parsedRating);
            }

            if (descriptionMetafield) {
                const parsedDescriptions = JSON.parse(descriptionMetafield.value);
                setReviewDescription(parsedDescriptions);
                console.log('Parsed Descriptions:', parsedDescriptions);
            }

        } catch (error) {
            console.error('Error fetching metafields:', error.message);
        }
    };

    useEffect(() => {
        fetchProductMetafields(product?.productId);
    }, [product?.productId]);

    // useEffect(() => {
    //     if (reviewRating.length > 0 && reviewDescription.length > 0) {
    //         const combinedReviews = reviewRating.map((rating, index) => ({
    //             id: (index + 1).toString(),
    //             name: `Reviewer ${index + 1}`,  // Placeholder name
    //             rating: parseFloat(rating.value),
    //             review: reviewDescription[index] || 'No review text available',
    //             time: `${(index + 1) * 5} min ago`,  // Example time
    //             avatar: "https://media.istockphoto.com/id/1939608350/photo/happy-mature-latin-man-using-laptop-at-home-technology-and-smart-working-concept.webp?b=1&s=170667a&w=0&k=20&c=qiQHsBK6zXDBwoY_uGzh2BZdZ64a00VPL_8ZS9Nz610=", // Placeholder image
    //         }));

    //         setReviewsData(combinedReviews);
    //         console.log('Combined Reviews Data:', combinedReviews);
    //     } else {
    //         console.log('Ratings or Descriptions data is missing or empty');
    //     }
    // }, [reviewRating, reviewDescription]);

    useEffect(() => {
        // Determine the number of reviews based on the longer of the two arrays
        const maxReviews = Math.max(reviewRating.length, reviewDescription.length);
    
        // Create a combined array of reviews
        const combinedReviews = Array.from({ length: maxReviews }, (_, index) => ({
            id: (index + 1).toString(),
            name: `Reviewer ${index + 1}`,  // Placeholder name
            rating: parseFloat(reviewRating[index]?.value) || 0,  // Default to 0 if no rating is available
            review: reviewDescription[index] || 'No review text available',  // Use description if available
            time: `${(index + 1) * 5} min ago`,  // Example time
            avatar: "https://media.istockphoto.com/id/1939608350/photo/happy-mature-latin-man-using-laptop-at-home-technology-and-smart-working-concept.webp?b=1&s=170667a&w=0&k=20&c=qiQHsBK6zXDBwoY_uGzh2BZdZ64a00VPL_8ZS9Nz610=", // Placeholder image
        }));
    
        setReviewsData(combinedReviews);
        console.log('Combined Reviews Data:', combinedReviews);
    }, [reviewRating, reviewDescription]);

    const renderReviewCard = ({ item }) => (
        <View style={{
            backgroundColor: '#f9f9f9', borderRadius: 8,
            padding: 16,
            marginVertical: 8,
        }}>
            <View style={styles.reviewCard}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.reviewContent}>
                    <View style={styles.reviewHeader}>
                        <Text style={styles.reviewName}>{item.name}</Text>
                        <Text style={styles.reviewTime}>{item.time}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        {Array.from({ length: 5 }, (_, index) => (
                            <Icon
                                key={index}
                                name="star"
                                size={16}
                                color={index < Math.round(item.rating) ? '#FFA928' : 'grey'}
                            />
                        ))}
                        <Text style={styles.reviewRating}>({item.rating.toFixed(1)})</Text>

                    </View>
                    <Text style={styles.reviewText}>{item.review}</Text>

                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header backIcon={true} text={"Ratings & Reviews"} notificationIcon={false} navigation={navigation} />
            <ReviewForm productId={product?.productId}/>
            <Text style={styles.summaryTitle}>Summary</Text>

            <View style={styles.summaryContainer}>
                {Array.from({ length: 5 }, (_, index) => (
                    <View key={index} style={styles.summaryRow}>
                        <Text>{5 - index}</Text>
                        <View style={styles.summaryBarBackground}>
                            <View style={[styles.summaryBar, { width: `${(5 - index) * 20}%` }]} />
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>4.5 <Icon
                        name="star"
                        size={16}
                        color={"#FFA928"}
                    /></Text>
                    <Text style={styles.statLabel}>{reviewsData?.length} Reviews</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>88%</Text>
                    <Text style={styles.statLabel}>Recommended</Text>
                </View>
            </View>
            <FlatList
                data={reviewsData}
                renderItem={renderReviewCard}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
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
    summaryTitle: {
        fontSize: 16,
        marginVertical: 8,
        textAlign: 'center',
    },
    summaryContainer: {
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    summaryBarBackground: {
        flex: 1,
        height: 8,
        backgroundColor: '#eee',
        marginHorizontal: 8,
        borderRadius: 4,
    },
    summaryBar: {
        height: 8,
        backgroundColor: redColor,
        borderRadius: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 10
    },
    statBox: {
        alignItems: 'center',
        paddingVertical: 5,
        width: wp(45),
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderRadius: 8,
        paddingEnd: 20,
        alignContent: "center"
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    reviewCard: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    reviewContent: {
        flex: 1,
        marginLeft: 16,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reviewName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: redColor,
    },
    reviewTime: {
        fontSize: 12,
        color: '#999',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    reviewRating: {
        marginLeft: 4,
        fontSize: 12,
        color: '#666',
    },
    reviewText: {
        fontSize: 14,
        color: '#333',
    },
});

export default ReviewScreen;
