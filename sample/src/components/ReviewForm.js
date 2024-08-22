
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // For star icons
// import axios from 'axios';

// const ReviewForm = ({ productId }) => {
//   const [rating, setRating] = useState(0);
//   const [reviewText, setReviewText] = useState('');
//   const [reviewDescriptions, setReviewDescriptions] = useState([]);

//   const handlePostReview = async () => {
//     if (rating === 0 || reviewText.trim() === '') {
//       Alert.alert('Error', 'Please complete all fields.');
//       return;
//     }

//     const newReviewDescription = reviewText.trim();
//     setReviewDescriptions(prev => [...prev, newReviewDescription]);

//     // Prepare data
//     const reviewData = {
//       descriptions: reviewDescriptions.concat(newReviewDescription),
//     };

//     const ratingData = {
//       ratings: [
//         { "scale_min": "1.0", "scale_max": "5.0", "value": rating.toFixed(1) }
//       ]
//     };
//     const numericProductID = productId.replace('gid://shopify/Product/', '');
//     console.log("reviewData Product ID:", reviewData);

//     try {
//       // Update review descriptions
//       await axios.post(`https://wishandemoapp.myshopify.com/admin/api/2024-07/products/${numericProductID}/metafields.json`, {
//         metafield: {
//           namespace: 'custom',
//           key: 'reviewdes',
//           value: JSON.stringify(reviewData.descriptions),
//           type: 'list.single_line_text_field'
//         }
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       // Update rating
//       await axios.post(`https://wishandemoapp.myshopify.com/admin/api/2024-07/products/${numericProductID}/metafields.json`, {
//         metafield: {
//           namespace: 'custom',
//           key: 'rating',
//           value: JSON.stringify(ratingData.ratings),
//           type: 'list.rating'
//         }
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       Alert.alert('Success', 'Review posted successfully!');
//       // Reset form
//       setReviewText('');
//       setRating(0);
//     } catch (error) {
//       console.error('Error posting review:', error.response?.data || error.message);
//       Alert.alert('Error', `Failed to post review: ${error.response?.data?.errors || error.message}`);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Submit Your Review</Text>

//       <View style={styles.starsContainer}>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <TouchableOpacity key={star} onPress={() => setRating(star)}>
//             <Icon
//               name={star <= rating ? 'star' : 'star-border'}
//               size={30}
//               color="#FFD700"
//             />
//           </TouchableOpacity>
//         ))}
//       </View>

//       <TextInput
//         style={styles.textInput}
//         placeholder="Write your review here..."
//         value={reviewText}
//         onChangeText={setReviewText}
//       />

//       <TouchableOpacity style={styles.button} onPress={handlePostReview}>
//         <Text style={styles.buttonText}>Submit Review</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   starsContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   textInput: {
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default ReviewForm;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For star icons
import axios from 'axios';
import { blackColor, redColor, whiteColor, lightShadeBlue, mediumGray, grayColor } from '../constants/Color';
import { ADMINAPI_ACCESS_TOKEN } from '../constants/Constants';


const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewDescriptions, setReviewDescriptions] = useState([]);

  useEffect(() => {
    // Load existing reviews when the component mounts
    const fetchReviews = async () => {
      const numericProductID = productId.replace('gid://shopify/Product/', '');
      try {
        const response = await axios.get(`https://wishandemoapp.myshopify.com/admin/api/2024-07/products/${numericProductID}/metafields.json`, {
          headers: {
            'X-Shopify-Access-Token': ADMINAPI_ACCESS_TOKEN,
          },
        });

        const metafields = response.data.metafields;
        const reviewMetafield = metafields.find((mf) => mf.key === 'reviewdes');
        if (reviewMetafield) {
          setReviewDescriptions(JSON.parse(reviewMetafield.value));
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [productId]);


const handlePostReview = async () => {
    if (rating === 0 || reviewText.trim() === '') {
      Alert.alert('Error', 'Please complete all fields.');
      return;
    }
  
    const newReviewDescription = reviewText.trim();
    const updatedReviews = [...reviewDescriptions, newReviewDescription];
  
    // Prepare data for review descriptions
    const reviewData = {
      descriptions: updatedReviews,
    };
  
    // Prepare rating data in JSON format
    const newRatingData = {
      "scale_min": "1.0",
      "scale_max": "5.0",
      "value": rating.toFixed(1)
    };
  
    const numericProductID = productId.replace('gid://shopify/Product/', '');
  
    try {
      // Update or create review descriptions metafield
      await axios.post(`https://wishandemoapp.myshopify.com/admin/api/2024-07/products/${numericProductID}/metafields.json`, {
        metafield: {
          namespace: 'custom',
          key: 'reviewdes',
          value: JSON.stringify(reviewData.descriptions),
          type: 'list.single_line_text_field'
        }
      }, {
        headers: {
          'X-Shopify-Access-Token': ADMINAPI_ACCESS_TOKEN,
          'Content-Type': 'application/json'
        }
      });
  
      // Fetch existing rating data
      const existingRatingsResponse = await axios.get(`https://wishandemoapp.myshopify.com/admin/api/2024-07/products/${numericProductID}/metafields.json`, {
        headers: {
          'X-Shopify-Access-Token': ADMINAPI_ACCESS_TOKEN,
          'Content-Type': 'application/json'
        }
      });
  
      const existingRatings = existingRatingsResponse.data.metafields.find(mf => mf.key === 'rating');
      const existingRatingsData = existingRatings ? JSON.parse(existingRatings.value) : [];
  
      // Append new rating to existing ratings
      const updatedRatingsData = [...existingRatingsData, newRatingData];
  
      // Update or create rating metafield
      await axios.post(`https://wishandemoapp.myshopify.com/admin/api/2024-07/products/${numericProductID}/metafields.json`, {
        metafield: {
          namespace: 'custom',
          key: 'rating',
          value: JSON.stringify(updatedRatingsData), // Append new rating to existing ones
          type: 'list.rating'
        }
      }, {
        headers: {
          'X-Shopify-Access-Token': ADMINAPI_ACCESS_TOKEN,
          'Content-Type': 'application/json'
        }
      });
  
      Alert.alert('Success', 'Review posted successfully!');
      // Reset form
      setReviewText('');
      setRating(0);
    } catch (error) {
      console.error('Error posting review:', error.response?.data || error.message);
      Alert.alert('Error', `Failed to post review: ${error.response?.data?.errors || error.message}`);
    }
  };
  
  
  return (
    <View style={styles.container}>
        <View style={{borderBottomWidth:1, borderBottomColor:"#E6E6E6", marginBottom:20}}>
        <Text style={styles.title}> Leave a Review</Text>

        </View>
        <Text style={[styles.title, {fontSize:16, textAlign:"justify",marginBottom: 5,}]}>How was your order?</Text>
        <Text style={{fontSize:12, color:"#808080",marginBottom: 20,}}>Please give your rating and also your review.</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Icon
              name={star <= rating ? 'star' : 'star-border'}
              size={30}
              color="#FFC107"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Write your review..."
        value={reviewText}
        onChangeText={setReviewText}
      />

      <TouchableOpacity style={styles.button} onPress={handlePostReview}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width:"100%"
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    textAlign:"center",
   
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent:"center"
  },
  textInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    height:50
  },
  button: {
    backgroundColor: redColor,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:"center",
    height:54
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReviewForm;
