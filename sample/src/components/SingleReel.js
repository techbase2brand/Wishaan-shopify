// import React, { useRef, useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Dimensions,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import Video from 'react-native-video';
// import { useDispatch, useSelector } from 'react-redux';
// import convertToProxyURL from 'react-native-video-cache';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { heightPercentageToDP, widthPercentageToDP } from '../utils';
// import { redColor } from '../constants/Color';
// import { STOREFRONT_ACCESS_TOKEN, STOREFRONT_DOMAIN } from '../constants/Constants';

// import { addToWishlist, removeFromWishlist } from '../redux/actions/wishListActions';


// const MAX_RETRY_ATTEMPTS = 3;
// const RETRY_DELAY = 1000;

// const SingleReel = ({ item, index, currentIndex, navigation }) => {
// const dispatch = useDispatch();
// const wishList = useSelector((state) => state.wishlist.wishlist);
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;
//   const videoRef = useRef(null);
//   const [mute, setMute] = useState(false);
//   const [retryCount, setRetryCount] = useState(0);
//   const [key, setKey] = useState(0); // Key to force component re-render
//   const [loading, setLoading] = useState(true);
// const [isSelected, setIsSelected] = useState(false);
// const [shareProductloading, setShareProductLoading] = useState(false);
// const [showHeart, setShowHeart] = useState(false); // State to control heart visibility
// const lastTap = useRef(null); // Ref to store the last tap time
// const heartScale = useRef(new Animated.Value(0)).current;


// useEffect(() => {
//   const isItemInWishlist = wishList.some(
//     (data) => data.productId === item.productId
//   );
//   setIsSelected(isItemInWishlist);
// }, [wishList, item, isSelected]);
//   const handleLoad = () => {
//     setLoading(false);
//   };
// const handleDoubleTap = () => {
//   const now = Date.now();
//   const DOUBLE_PRESS_DELAY = 300; // Delay in milliseconds

//   if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
//     handlePress(); // Call the like/unlike function on double-tap
//     showHeartAnimation(); // Trigger heart animation
//   } else {
//     lastTap.current = now; // Update last tap time
//   }
// };

// const handlePress = () => {
//   if (!isSelected) {
//     dispatch(addToWishlist(item));
//     // Alert.alert('Liked', 'You have liked this video!');
//   } else {
//     dispatch(removeFromWishlist(item));
//     // Alert.alert('Unliked', 'You have unliked this video!');
//   }
//   setIsSelected(!isSelected); // Toggle the state
// };
// Function to show heart animation
// const showHeartAnimation = () => {
//   setShowHeart(true); // Show heart
//   Animated.sequence([
//     Animated.timing(heartScale, {
//       toValue: 1, // Scale up to 1
//       duration: 200,
//       useNativeDriver: true,
//     }),
//     Animated.timing(heartScale, {
//       toValue: 0, // Scale back down to 0
//       duration: 800,
//       useNativeDriver: true,
//     }),
//   ]).start(() => setShowHeart(false)); // Hide heart after animation
// };

//   const handleEnd = () => {
//     setLoading(false);
//   };

//   return (
//     <TouchableOpacity
//       activeOpacity={0.9}
//       onPress={() => {
//   setMute(!mute);
//   handleDoubleTap(); // Call double-tap handler on press
// }}
//       style={{
//         flex: 1,
//         width: widthPercentageToDP(100),
//         height: heightPercentageToDP(100),
//         // justifyContent: 'center',
//         // alignItems: 'center',
//         backgroundColor: "black"
//       }}>

//       {loading && (
//         <View style={styles.loaderContainer}>
//           <ActivityIndicator size="large" color="#fff" />
//         </View>
//       )}
//       <Video
//         bufferConfig={{
//           minBufferMs: 2000,
//           maxBufferMs: 5000,
//           bufferForPlaybackMs: 1000,
//           bufferForPlaybackAfterRebufferMs: 1500,
//         }}
//         // poster={item?.thumb_url}
//         // posterResizeMode={'contain'}
//         // source={require('../assests/video3.mp4')}
//         source={{ uri: convertToProxyURL(item?.url) }}
//         repeat={true}
//         muted
//         maxBitRate={2000000}
//         paused={currentIndex === index ? false : true}
//         hideShutterView={true}
//         onLoad={handleLoad}
//         onEnd={handleEnd}
//         onBuffer={e => {
//           if (e.isBuffering == true) {
//             setLoading(true);
//           } else {
//             setLoading(false);
//           }
//         }}
//         style={{
//           width: widthPercentageToDP(100),
//           height: heightPercentageToDP(100),
//           // resizeMode: "cover"
//         }}
//       />
//       {/* Product Information */}
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 160,
//           left: 0,
//           right: 0,
//           flexDirection: "column",
//           paddingHorizontal: 20,
//           zIndex: 1,
//         }}>
//         <View style={styles.header}>
//           <View style={styles.profileContainer}>
//             <Image
//               // source={{ uri: 'https://via.placeholder.com/100' }} // Replace with your image
//               source={require('../assests/notificationimage.png')}
//               style={styles.profileImage}
//             />
//           </View>
//           <Text style={styles.userName}>Deepak_Dhingra</Text>
//           <Image
//             source={require('../assests/ReelsIcons/tagbasis.png')}
//             style={{
//               width: 15,
//               height: 15,
//               objectFit: "contain",
//               marginLeft: 5
//             }}
//           />
//           <TouchableOpacity style={styles.buyNowButton}>
//             <Text style={styles.buyNowText}>Buy Now</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.price}>$620 <Text style={styles.discount}>60% off</Text></Text>
//         <Text style={styles.description}>In publishing and graphic design...</Text>
//       </View>
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 140,
//           left: 0,
//           right: 10,
//           alignItems: 'flex-end',
//           zIndex: 1,
//         }}>
//         <Image
//           source={require('../assests/ReelsIcons/review.png')}
//           style={{
//             width: 25,
//             height: 25,
//           }}
//         />
//         <Text style={{ color: 'white', marginBottom: 10 }}>200</Text>
//         <AntDesign
//           name="hearto"
//           style={{ fontSize: 25, color: 'white' }}
//         />
//         <Text style={{ color: 'white', marginBottom: 10 }}>20.5k</Text>

//         <Image
//           source={require('../assests/ReelsIcons/sharewhite.png')}
//           style={{
//             width: 25,
//             height: 25,
//           }}
//         />
//         {/* <Icon
//           name="share"
//           style={{fontSize: 25, color: 'white', marginVertical: 10}}
//         /> */}
//         <Text style={{ color: 'white' }}>10.5k</Text>
//         <Entypo
//           name="dots-three-horizontal"
//           style={{ fontSize: 25, color: 'white', marginVertical: 20 }}
//         />
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     width: 40,
//     height: 40,
//   },
//   infoContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   profileImage: {
//     width: 30,
//     height: 30,
//     borderRadius: 30,
//     marginRight: 5,
//   },
//   userName: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   buyNowButton: {
//     backgroundColor: "transparent",
//     borderWidth: 1,
//     borderColor: "#fff",
//     borderRadius: 5,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginHorizontal: 10
//   },
//   buyNowText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   price: {
//     color: '#fff',
//     fontSize: 18,
//     marginTop: 10,
//   },
//   discount: {
//     fontSize: 16,
//     color: redColor,
//   },
//   description: {
//     color: '#fff',
//     fontSize: 14,
//     marginTop: 5,
//   },
// });
// export default SingleReel;



import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  Animated, // Import Animated
} from 'react-native';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import convertToProxyURL from 'react-native-video-cache';
import LoadingModal from '../components/Modal/LoadingModal';
import { logEvent } from '@amplitude/analytics-react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { heightPercentageToDP, widthPercentageToDP } from '../utils';
import { redColor } from '../constants/Color';
import { STOREFRONT_ACCESS_TOKEN, STOREFRONT_DOMAIN } from '../constants/Constants';
import { addToWishlist, removeFromWishlist } from '../redux/actions/wishListActions';

const SingleReel = ({ item, index, currentIndex, navigation }) => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishlist.wishlist);
  const [mute, setMute] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [shareProductloading, setShareProductLoading] = useState(false);
  const [showHeart, setShowHeart] = useState(false); // State to control heart visibility
  const lastTap = useRef(null); // Ref to store the last tap time
  const heartScale = useRef(new Animated.Value(0)).current; // Animated value for heart scale

  useEffect(() => {
    const isItemInWishlist = wishList.some(
      (data) => data.productId === item.productId
    );
    setIsSelected(isItemInWishlist);
  }, [wishList, item, isSelected]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleEnd = () => {
    setLoading(false);
  };

  // Custom double-tap handler
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300; // Delay in milliseconds

    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      handlePress(); // Call the like/unlike function on double-tap
      showHeartAnimation(); // Trigger heart animation
    } else {
      lastTap.current = now; // Update last tap time
    }
  };

  const handlePress = () => {
    if (!isSelected) {
      dispatch(addToWishlist(item));
      // Alert.alert('Liked', 'You have liked this video!');
    } else {
      dispatch(removeFromWishlist(item));
      // Alert.alert('Unliked', 'You have unliked this video!');
    }
    setIsSelected(!isSelected); // Toggle the state
  };

  // Function to show heart animation
  const showHeartAnimation = () => {
    setShowHeart(true); // Show heart
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1, // Scale up to 1
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 0, // Scale back down to 0
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => setShowHeart(false)); // Hide heart after animation
  };

  const getProductHandleById = async (id) => {
    const query = `
      query($id: ID!) {
        product(id: $id) {
          handle
        }
      }
    `;
    const variables = {
      id: id,
    };
    const response = await fetch(
      `https://${STOREFRONT_DOMAIN}/api/2023-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      }
    );
    const responseData = await response.json();
    if (responseData.errors) {
      console.error('Error fetching product handle:', responseData.errors);
      return null;
    }
    return responseData.data.product.handle;
  };

  const generateLink = async (id) => {
    try {
      const link = await dynamicLinks().buildShortLink(
        {
          link: `https://checkoutkitreactnative.page.link/Zi7X?productId=${id}`,
          domainUriPrefix: 'https://checkoutkitreactnative.page.link',
          android: {
            packageName: 'com.shopify.checkoutkitreactnative',
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT
      );
      return link;
    } catch (error) {
      console.log('Generating Link Error:', error);
    }
  };

  const shareProduct = async (id) => {
    setShareProductLoading(true);
    logEvent('Share Product Button Clicked');
    const getLink = await generateLink(id);
    try {
      const handle = await getProductHandleById(id);

      if (!handle) {
        throw new Error('Product handle not found');
      }

      const shareUrl = getLink;
      const shareOptions = {
        title: 'Share Product',
        message: `Check out this product: ${shareUrl}`,
      };
      setShareProductLoading(false);
      await Share.open(shareOptions);

      logEvent(`Share Product Name: ${item.title}`);
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        setMute(!mute);
        handleDoubleTap(); // Call double-tap handler on press
      }}
      style={{
        flex: 1,
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
        backgroundColor: 'black',
      }}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <Video
        bufferConfig={{
          minBufferMs: 2000,
          maxBufferMs: 5000,
          bufferForPlaybackMs: 1000,
          bufferForPlaybackAfterRebufferMs: 1500,
        }}
        source={{ uri: convertToProxyURL(item?.url) }}
        repeat={true}
        muted
        maxBitRate={2000000}
        paused={currentIndex === index ? false : true}
        hideShutterView={true}
        onLoad={handleLoad}
        onEnd={handleEnd}
        onBuffer={(e) => {
          if (e.isBuffering == true) {
            setLoading(true);
          } else {
            setLoading(false);
          }
        }}
        resizeMode="cover"
        style={{
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(100),
        }}
      />
      {/* {/ Animated Heart /} */}
      {showHeart && (
        <Animated.View
          style={[
            styles.heartContainer,
            { transform: [{ scale: heartScale }] },
          ]}
        >
          <AntDesign name="heart" size={100} color={isSelected ? redColor : "white"} />
        </Animated.View>
      )}
      {/* {/ Product Information /} */}
      <View
        style={{
          position: 'absolute',
          bottom: 150,
          // bottom: 100,
          left: 0,
          right: 0,
          flexDirection: 'column',
          paddingHorizontal: 20,
          zIndex: 1,
        }}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              source={require('../assests/notificationimage.png')}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.userName}>Deepak_Dhingra</Text>
          <Image
            source={require('../assests/ReelsIcons/tagbasis.png')}
            style={{
              width: 15,
              height: 15,
              objectFit: 'contain',
              marginLeft: 5,
            }}
          />
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>
          $620 <Text style={styles.discount}>60% off</Text>
        </Text>
        <Text style={styles.description}>
          In publishing and graphic design...
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 130,
          left: 0,
          right: 10,
          alignItems: 'flex-end',
          zIndex: 1,
        }}>
        <Image
          source={require('../assests/ReelsIcons/review.png')}
          style={{
            width: 25,
            height: 25,
          }}
        />
        <Text style={{ color: 'white', marginBottom: 10 }}>200</Text>
        <AntDesign
          style={{ fontSize: 25 }}
          onPress={handlePress}
          name={isSelected ? 'heart' : 'hearto'}
          size={25}
          color={isSelected ? redColor : 'white'}
        />
        <Text style={{ color: 'white', marginBottom: 10 }}>20.5k</Text>
        <TouchableOpacity onPress={() => shareProduct(item?.productId)}>
          <Image
            source={require('../assests/ReelsIcons/sharewhite.png')}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
        <Text style={{ color: 'white' }}>10.5k</Text>
        <Entypo
          name="dots-three-horizontal"
          style={{ fontSize: 25, color: 'white', marginVertical: 20 }}
        />
      </View>
      {shareProductloading && <LoadingModal visible={shareProductloading} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 5,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  buyNowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  price: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  discount: {
    fontSize: 16,
    color: redColor,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  heartContainer: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 2,
  },
});

export default SingleReel;