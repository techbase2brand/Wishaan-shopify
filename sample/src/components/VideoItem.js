// // // components/VideoItem.js
// // import React from 'react';
// // import {TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native';
// // import Video from 'react-native-video';

// // const VideoItem = ({videoUri, onPress, index, currentIndex}) => {
// //   return (
// //     <View style={{ flex:1,  width:"100%", height:"100%"}}>
// //       <Text style={{marginLeft: 20, fontSize: 25, color: '#fff', marginTop:20}}>
// //         John Doe
// //       </Text>
// //       <Text style={{marginLeft: 20, fontSize: 20, color: '#fff'}}>
// //         march, 20
// //       </Text>
// //       <TouchableOpacity onPress={onPress} style={styles.container}>
// //         <Video
// //           source={videoUri}
// //           style={styles.video}
// //           resizeMode="cover"
// //           repeat={true}
// //           paused={currentIndex == index ? false : true}
// //           muted
// //         />
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     width: '100%',
// //     // height:'100%',
// //     marginBottom: 60,
// //     marginTop: 80,
// //   },
// //   video: {
// //     width: '100%',
// //     height: 400,
// //   },
// // });

// // export default VideoItem;

// import React, { useEffect, useState, useRef } from 'react';
// import {
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import Video from 'react-native-video';
// import convertToProxyURL from 'react-native-video-cache';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useDispatch, useSelector } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { ADD_TO_CART, SHARE, VOICE } from '../assests/images';
// import { green, redColor } from '../constants/Color';
// import { addToWishlist, removeFromWishlist } from '../redux/actions/wishListActions';
// import { ADMINAPI_ACCESS_TOKEN, STOREFRONT_DOMAIN } from '../constants/Constants';
// import Toast from 'react-native-simple-toast';


// const VideoItem = ({ item, index, currentIndex,onAddToCart, navigation, onPress,presentCheckout }) => {
//   const dispatch = useDispatch();
//   const wishList = useSelector(state => state.wishlist.wishlist);
//   // const isSelected = wishList.some(data => data.productId === item.productId);
//   const [loading, setLoading] = useState(true);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isSelected, setIsSelected] = useState(false);
//   useEffect(() => {
//     // Check if the item is in the wishlist and update local state
//     const isItemInWishlist = wishList.some(data => data.productId === item.productId);
//     setIsSelected(isItemInWishlist);
//   }, [wishList,item,isSelected]);
//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//   };

//   const handleLoad = () => {
//     setLoading(false);
//   };

//   const handleEnd = () => {
//     setLoading(false);
//   };

//   const onBuffer = meta => {
//     console.log('Buffering:');
//     setLoading(meta.isBuffering);
//   };
//   const handlePress = () => {
//     if (!isSelected) {
//       dispatch(addToWishlist(item));
//     } else {
//       dispatch(removeFromWishlist(item));
//     }
//     setIsSelected(!isSelected); // Toggle the state
//   };

  
//   const extractNumericId = (gid) => {
//     const parts = gid.split('/');
//     return parts[parts.length - 1]; // Get the last part
//   };
//   const variantId = extractNumericId(item.variants[0].variantId);
//  const [cartLoading, setCartLoading] = useState(false)
//   const handleAddToCart = () => {
//     // dispatch(addProductInCart(product));
//     console.log("handleAddToCartvariantId",variantId);
//     onAddToCart(item.variants[0].variantId,1);
//     Toast.show(`1 item added to cart`);

//   };
//   const videoUrl =
//     'https://cdn.shopify.com/videos/c/vp/474e4c3b8a9a423ebd3d9ccf3fda0281/474e4c3b8a9a423ebd3d9ccf3fda0281.HD-1080p-4.8Mbps-32573231.mp4';
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onPress={onPress}
//         // onPress={() => navigation.navigate('ReelsScreen')}
//         style={styles.videoContainer}
//         activeOpacity={0.8}>
//         {loading && (
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator size="large" color="#fff" />
//           </View>
//         )}
//         <Video
//           bufferConfig={{
//             minBufferMs: 2000,
//             maxBufferMs: 5000,
//             bufferForPlaybackMs: 1000,
//             bufferForPlaybackAfterRebufferMs: 1500,
//           }}
//           // poster={item?.thumb_url}
//           // posterResizeMode={'cover'}
//           source={{ uri: convertToProxyURL(item?.url) }}
//           style={styles.video}
//           resizeMode="cover"
//           repeat={true}
//           muted={isMuted}
//           maxBitRate={2000000}
//           paused={currentIndex === index ? false : true}
//           hideShutterView={true}
//           onLoad={handleLoad}
//           onEnd={handleEnd}
//           onBuffer={e => {
//             console.log('e.isBuffering', e.isBuffering);
//             if (e.isBuffering == true) {
//               setLoading(true);

//             } else {
//               setLoading(false);
//             }
//           }}

//         />
//       </TouchableOpacity>
//       <TouchableOpacity style={{
//         marginVertical: 10,
//         backgroundColor: "black",
//         alignItems: "center",
//         objectFit: 'contain',
//         position: 'absolute',
//         bottom: 200,
//         right: 10,
//         padding: 2,
//         borderRadius: 100,
//         width: 30,
//         height: 30,

//       }} onPress={toggleMute}>

//         {isMuted ? <Ionicons
//           name="volume-mute-outline"
//           size={25}
//           color="white"
//           style={{
//             width: 20,
//             height: 20,
//           }}
//         /> : <Ionicons
//           name="volume-high-outline"
//           size={25}
//           color="white"
//           style={{
//             width: 24,
//             height: 24,
//           }}
//         />}
//       </TouchableOpacity>
//       <Entypo
//         name="dots-three-vertical"
//         size={25}
//         color="white"
//         style={{ position: 'absolute', top: 20, right: 10 }}
//       />
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//         <View style={styles.iconContainer}>
//           <AntDesign
//             onPress={handlePress}
//             name={isSelected ? "heart":"hearto"}
//             size={25}
//             color={isSelected ? redColor :"black"}
//             style={styles.icon}
//           />
//           {/* <Icon name="comment-o" size={25} color="black" style={styles.icon} /> */}
//           <Image
//             source={SHARE}
//             style={{
//               width: 24,
//               height: 24,
//               marginVertical: 10,
//               objectFit: 'contain',
//             }}
//           />
//         </View>
//         <TouchableOpacity style={styles.iconContainer} onPress={handleAddToCart}>
//           <Image
//             source={ADD_TO_CART}
//             style={{
//               width: 27,
//               height: 27,
//               marginVertical: 10,
//               objectFit: 'contain',
//             }}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={{ marginHorizontal: 10 }}>
//         <Text style={{ color: 'black', width: '40%' }}>
//           In publishing and graphic design more...
//         </Text>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginHorizontal: 10,
//         }}>
//         <View style={styles.ratingcontainer}>
//           <Text style={styles.ratingText}>3.8</Text>
//           <Icon name="star" size={16} color="#fff" />
//           <Text style={styles.reviewsText}>| 3.7K</Text>
//         </View>
//         <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
//           <Text style={{ color: '#fff', alignSelf: 'center' }}>{"Buy Now"}</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={{ flexDirection: 'row', marginHorizontal: 10, gap: 10 }}>
//         <Text style={{ color: 'black', fontSize: 16 }}>$620</Text>
//         <Text style={{ fontSize: 14 }}>$800</Text>
//         <Text style={{ color: green, fontSize: 14 }}>60% off</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     paddingBottom: 40,
//   },
//   title: {
//     marginLeft: 10,
//     fontSize: 25,
//     color: '#fff',
//     marginTop: 20,
//   },
//   date: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: '#fff',
//   },
//   videoContainer: {
//     width: '100%',
//   },
//   video: {
//     width: '100%',
//     height: 400,
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     gap: 14,
//     marginHorizontal: 10,
//   },
//   icon: {
//     marginVertical: 10,
//   },
//   image: {
//     width: 50,
//     height: 50,
//     marginTop: 14,
//   },
//   ratingcontainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: green,
//     borderRadius: 5,
//     padding: 5,
//     marginVertical: 10,
//     width: '25%',
//   },
//   ratingText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     marginRight: 5,
//   },
//   reviewsText: {
//     color: '#fff',
//     marginLeft: 5,
//   },
//   buyButton: {
//     height: 30,
//     width: 75,
//     backgroundColor: redColor,
//     alignItems: 'center',
//     borderRadius: 6,
//     justifyContent: 'center',
//   },
// });

// export default VideoItem;




import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ActivityIndicator,
  ImageBackground 
} from 'react-native';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Share from 'react-native-share';

import {
  ADD_TO_CART,
  BEST_SELLER,
  SHARE,
  VOICE,
  WISHAAN_CHOICE,
} from '../assests/images';
import {green, redColor} from '../constants/Color';
import { logEvent } from '@amplitude/analytics-react-native';
import {
  addToWishlist,
  removeFromWishlist,
} from '../redux/actions/wishListActions';
import {ADMINAPI_ACCESS_TOKEN, STOREFRONT_ACCESS_TOKEN, STOREFRONT_DOMAIN} from '../constants/Constants';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from '../utils';
import LoadingModal from '../components/Modal/LoadingModal';
// import { createThumbnail } from 'react-native-create-thumbnail';

// "react-native-video": "^6.4.2",

const VideoItem = ({
  item,
  index,
  currentIndex,
  onAddToCart,
  navigation,
  preloadNextVideo,
  onPress,
  presentCheckout,
}) => {
  // console.log("itemitemitem",item);

  const dispatch = useDispatch();
  const wishList = useSelector(state => state.wishlist.wishlist);
  // const isSelected = wishList.some(data => data.productId === item.productId);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [cachedUrl, setCachedUrl] = useState('');
  const [shareProductloading, setShareProductLoading] = useState(false);
  // console.log("cachedUrlcachedUrl",cachedUrl);
// console.log("thumbnailUrl",thumbnailUrl);

 


 


  useEffect(() => {
    const isItemInWishlist = wishList.some(
      data => data.productId === item.productId,
    );
    setIsSelected(isItemInWishlist);
  }, [wishList, item, isSelected]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const handleEnd = () => {
    setLoading(false);
  };

  // const handleProgress = (progress) => {
  //   // console.log("progresaas", progress);
    
  //   if (progress.currentTime >= 2) {
  //     preloadNextVideo(); 
  //   }
  // };

  const handlePress = () => {
    if (!isSelected) {
      dispatch(addToWishlist(item));
    } else {
      dispatch(removeFromWishlist(item));
    }
    setIsSelected(!isSelected); // Toggle the state
  };

  const extractNumericId = gid => {
    const parts = gid.split('/');
    return parts[parts.length - 1]; // Get the last part
  };

  const variantId = extractNumericId(item.variants[0].variantId);
  const [cartLoading, setCartLoading] = useState(false);

  const handleAddToCart = () => {
    // dispatch(addProductInCart(product));
    console.log('handleAddToCartvariantId', variantId);
    onAddToCart(item.variants[0].variantId, 1);
    Toast.show(`1 item added to cart`);
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
      id: id
    };
    const response = await fetch(`https://${STOREFRONT_DOMAIN}/api/2023-04/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables })
    });
    const responseData = await response.json();
    if (responseData.errors) {
      console.error('Error fetching product handle:', responseData.errors);
      return null;
    }
    return responseData.data.product.handle;
  };

  const generateLink = async (id) => {
    console.log("getlinkid",id);
    try {
      const link = await dynamicLinks().buildShortLink({
        link: `https://checkoutkitreactnative.page.link/Zi7X?productId=${id}`,
        domainUriPrefix: 'https://checkoutkitreactnative.page.link',
        android: {
          packageName: 'com.shopify.checkoutkitreactnative',
        },
        // ios: {
        //   appStoreId: '123456789',
        //   bundleId: 'com.deepLinkingProjectBundleId',
        // },
      }, dynamicLinks.ShortLinkType.DEFAULT)
      return link
    } catch (error) {
      console.log('Generating Link Error:', error)
    }
  }

  const shareProduct = async (id) => {
    setShareProductLoading(true)
    logEvent('Share Product Button Clicked');
    const getLink = await generateLink(id)
    try {
      const handle = await getProductHandleById(id);

      if (!handle) {
        throw new Error('Product handle not found');
      }

      const shareUrl = getLink;
      const shareOptions = {
        title: 'Share Product',
        // message: `Check out this product: ${product.title}\nhttps://${STOREFRONT_DOMAIN}/products/${handle}`,
        message: `Check out this product: ${shareUrl}`,
      };
      setShareProductLoading(false)
      await Share.open(shareOptions);

      logEvent(`Share Product Name: ${product.title}`);

    } catch (error) {
      console.log('Error => ', error);
    }
  };

  const videoUrl =
    convertToProxyURL('/data/user/0/com.shopify.checkoutkitreactnative/cache/cached_video_gid://shopify/Product/9432575934771.mp4');
    
  const isBestSeller = item?.tags?.includes('BestSeller');
  const isWishaanChoice = item?.tags?.includes('WishaanChoice');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        // onPress={onPress}
        onPress={() => navigation.navigate('ReelsScreen')}
        style={styles.videoContainer}
        activeOpacity={0.8}>
           {/* <Image
              source={{ uri: thumbnailUrl }}
              style={{width:300,height:300}} // Style for the thumbnail
              resizeMode="cover"
            /> */}
        {/* {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : ( */}
       
          <Video
          bufferConfig={{
            minBufferMs: 5000, // Buffer at least 5 seconds of video before starting
            maxBufferMs: 15000, // Buffer up to 15 seconds
            bufferForPlaybackMs: 3000, // Buffer 3 seconds of video before playback
            bufferForPlaybackAfterRebufferMs: 5000, // Buffer 5 seconds after rebuffering
          }}
          source={{uri: convertToProxyURL(item?.url)}}
          // poster={thumbnailUrl}
            // posterResizeMode={'cover'}
            // source={{uri: cachedUrl}}
            // viewType="textureView"
            style={styles.video}
            resizeMode="cover"
            repeat={true}
            muted={isMuted}
            maxBitRate={1000000}
            paused={currentIndex === index ? false : true}
            hideShutterView={true}
            onLoad={handleLoad}
            onEnd={handleEnd}
            // onProgress={handleProgress}
            onBuffer={e => {
              // console.log('e.isBuffering', e.isBuffering);
              if (e.isBuffering == true) {
                setLoading(true);
              } else {
                setLoading(false);
              }
            }}
            onError={e => {
              console.log('e.onError', e.error);
            }}
          />
        {/* )} */}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginVertical: 10,
          backgroundColor: 'black',
          alignItems: 'center',
          objectFit: 'contain',
          position: 'absolute',
          bottom: 210,
          right: 10,
          padding: 2,
          borderRadius: 100,
          width: 30,
          height: 30,
        }}
        onPress={toggleMute}>
        {isMuted ? (
          <Ionicons
            name="volume-mute-outline"
            size={25}
            color="white"
            style={{
              width: 20,
              height: 20,
            }}
          />
        ) : (
          <Ionicons
            name="volume-high-outline"
            size={25}
            color="white"
            style={{
              width: 24,
              height: 24,
            }}
          />
        )}
      </TouchableOpacity>
      <Entypo
        name="dots-three-vertical"
        size={25}
        color="white"
        style={{position: 'absolute', top: 20, right: 10}}
      />
      {isBestSeller && (
        <Image
          source={BEST_SELLER}
          style={{
            width: 94,
            height: 24,
            marginVertical: 10,
            objectFit: 'contain',
            position: 'absolute',
            top: 310,
            right: 2,
          }}
        />
      )}
      {isWishaanChoice && (
          <Image
            source={WISHAAN_CHOICE}
            style={{
              width: 80,
              height: 80,
              marginBottom:40,
              resizeMode: 'contain',
              position: 'absolute', top:10, left: 10,
            }}
          />
      )} 
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.iconContainer}>
          <AntDesign
            onPress={handlePress}
            name={isSelected ? 'heart' : 'hearto'}
            size={25}
            color={isSelected ? redColor : 'black'}
            style={styles.icon}
          />
          {/* {/ <Icon name="comment-o" size={25} color="black" style={styles.icon} /> /} */}
          <TouchableOpacity  
          onPress={()=>shareProduct(item?.productId)}
          >
          <Image
            source={SHARE}
            style={{
              width: 24,
              height: 24,
              marginVertical: 10,
              objectFit: 'contain',
            }}
          />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={handleAddToCart}>
          <Image
            source={ADD_TO_CART}
            style={{
              width: 27,
              height: 27,
              marginVertical: 10,
              objectFit: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 10}}>
        <Text style={{color: 'black', width: '40%'}}>
          In publishing and graphic design more...
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <View style={styles.ratingcontainer}>
          <Text style={styles.ratingText}>3.8</Text>
          <Icon name="star" size={16} color="#fff" />
          <Text style={styles.reviewsText}>| 3.7K</Text>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <Text style={{color: '#fff', alignSelf: 'center'}}>{'Buy Now'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 10, gap: 10}}>
        <Text style={{color: 'black', fontSize: 16}}>$620</Text>
        <Text style={{fontSize: 14}}>$800</Text>
        <Text style={{color: green, fontSize: 14}}>60% off</Text>
      </View>
      {shareProductloading && <LoadingModal visible={shareProductloading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 40,
  },
  title: {
    marginLeft: 10,
    fontSize: 25,
    color: '#fff',
    marginTop: 20,
  },
  date: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  videoContainer: {
    width: '100%',
  },
  video: {
    width: '100%',
    height: 400,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 14,
    marginHorizontal: 10,
  },
  icon: {
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 14,
  },
  ratingcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: green,
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    width: wp(25),
  },
  ratingText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  reviewsText: {
    color: '#fff',
    marginLeft: 5,
  },
  buyButton: {
    height: 30,
    width: 75,
    backgroundColor: redColor,
    alignItems: 'center',
    borderRadius: 6,
    justifyContent: 'center',
  },
});

export default VideoItem;
