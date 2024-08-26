// import React, { useState, useEffect } from 'react';
// import { View, FlatList, Dimensions, ScrollView, Image, Text, ActivityIndicator } from 'react-native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import VideoItem from './VideoItem'; // Adjust the import path as necessary
// import { Images } from '../constants/Constants';
// import VipAddSection from './VipAddSection';
// import { VIP_LOGO } from '../assests/images';
// import { grayColor, redColor } from '../constants/Color';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
// import { useSelector,useDispatch } from 'react-redux';


// const { height } = Dimensions.get('window');

// const VideoList = ({ cachedFiles, currentIndex, onViewableItemsChanged, viewabilityConfig, navigation }) => {
//   const cacheFiles = useSelector(state => state.cachedFiles?.cachedFiles);
// // console.log("cacheFilescacheFiles",cacheFiles);
//   const [videos, setVideos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [allLoaded, setAllLoaded] = useState(false);
//   const [bestDealInventoryQuantities, setBestDealInventoryQuantities] = useState('');
//   const [bestDealoptions, setBestDealOptions] = useState([]);

//   const videosPerPage = 10;

//   // const productMedia = cachedFiles?.map(productEdge =>
//   //   productEdge?.node?.media?.edges?.map(mediaEdge => mediaEdge?.node?.sources[0])
//   // );
//   // console.log("productMedia",productMedia);
//   // productVideosUrl = productMedia.reduce((acc, val) => acc.concat(val), []);

//   const productMedia = cachedFiles?.map(productEdge => {
//     const productId = productEdge?.node?.id; // Extract the product ID
//     const media = productEdge?.node?.media?.edges?.map(mediaEdge => ({
//       ...mediaEdge?.node?.sources[0], // Spread the media source details
//       productId // Add the product ID to the media object
//     }));
//     return media;
//   });
  
//   // Flatten the array and remove any undefined or null entries
//   const productVideosUrl = productMedia?.reduce((acc, val) => acc.concat(val), []).filter(Boolean);
  


  
//   useEffect(() => {
//     // console.log("cachedFiles?.data?.collection?.products?.nodes",cachedFiles);
    
//     // const inventoryQuantities = cachedFiles?.node?.map((productEdge) => {
//     //     return productEdge?.variants?.node?.map((variants) => variants?.inventoryQuantity);
//     //   });
//     //   console.log("inventoryQuantities",inventoryQuantities);
//     //   setBestDealInventoryQuantities(inventoryQuantities)
//     //   const fetchedOptions = cachedFiles?.data?.collection?.products?.nodes?.map((product) => product?.options);
//     //   setBestDealOptions(fetchedOptions);
//    // Function to extract inventory quantities from cachedFiles
//   //  cachedFiles.forEach((productWrapper, index) => {
//   //   const product = productWrapper?.node;
//   //   console.log(`Product ${index}:`, product);
//   //   console.log(`Variants for Product ${index}:`, product?.variants);
//   // });
//   // Function to extract inventory quantities from cachedFiles
// const extractInventoryQuantities = () => {
//   if (!cachedFiles || !Array.isArray(cachedFiles)) {
//     console.error("Invalid data format for cachedFiles");
//     return;
//   }

//   // Extract inventory quantities
//   const inventoryQuantities = cachedFiles.map((productWrapper) => {
//     const product = productWrapper?.node;

//     // Check if product and variants are defined and variants.edges is an array
//     if (product && product.variants?.edges && Array.isArray(product.variants.edges)) {
//       return product.variants.edges.map((edge) => {
//         // Extract inventoryQuantity from each variant node
//         return edge?.node?.inventoryQuantity || null; // Use null if inventoryQuantity is missing
//       });
//     } else {
//       // Log the structure if variants.edges is not an array
//       console.warn("Variants edges not found or not an array:", product?.variants?.edges);
//       return [];
//     }
//   });

//   console.log("inventoryQuantities", inventoryQuantities);
//   setBestDealInventoryQuantities(inventoryQuantities);

//   // Extract options (if needed)
//   // const fetchedOptions = cachedFiles.map((productWrapper) => productWrapper?.node?.options || []);
//   // setBestDealOptions(fetchedOptions);
// };

// // Call the function when needed
// extractInventoryQuantities();

//   }, [cachedFiles]);
//   useEffect(() => {
//     loadMoreVideos();
//   }, []);
//   // console.log("videosvideos..", videos?.length);
//   // const loadMoreVideos = () => {
//   //   if (loading) return;

//   //   setLoading(true);

//   //   // Simulate an API call or data fetching
//   //   setTimeout(() => {
//   //     const start = (page - 1) * videosPerPage;
//   //     const end = start + videosPerPage;
//   //     setVideos(prevVideos => [...prevVideos, ...cachedFiles.slice(start, end)]);
//   //     setPage(prevPage => prevPage + 1);
//   //     setLoading(false);
//   //   }, 1000); // Simulated delay
//   // };
//   // const loadMoreVideos = () => {
//   //   if (loading) return;

//   //   setLoading(true);
//   //   setTimeout(() => {
//   //     const start = (page - 1) * videosPerPage;
//   //     const end = start + videosPerPage;
//   //     const newVideos = cachedFiles.slice(start, end);
//   //     const videosWithAds = insertAds([...videos, ...newVideos]);
//   //     setVideos(videosWithAds);
//   //     setPage(prevPage => prevPage + 1);
//   //     setLoading(false);
//   //   }, 1000); 
//   // };

//   const insertAds = (videoArray) => {
//     let result = [];
//     videoArray.forEach((video, index) => {
//       result.push(video);
//       if ((index + 1) % 10 === 0) {
//         result.push({ isAd: true, id: `ad-${index}` });
//       }
//     });
//     return result;
//   };

//   const loadMoreVideos = () => {
//     if (loading || allLoaded) return;

//     setLoading(true);

//     // Simulate an API call or data fetching
//     setTimeout(() => {
//       const start = (page - 1) * videosPerPage;
//       const end = start + videosPerPage;
//       const newVideos = productVideosUrl.slice(start, end);

//       if (newVideos.length === 0) {
//         setAllLoaded(true); // Set flag if no more videos to load
//       } else {
//         setVideos(prevVideos => [...prevVideos, ...newVideos]);
//         setPage(prevPage => prevPage + 1);
//       }
//       setLoading(false);
//     }, 800); // Simulated delay
//   };

//   const handleEndReached = () => {
//     if (!loading && !allLoaded) {
//       loadMoreVideos();
//     }
//   };
//   // const handleEndReached = () => {
//   //   if (!loading && !allLoaded && videos.length < cachedFiles.length) {
//   //     loadMoreVideos();
//   //   }
//   // };
//   const handlePressItem = item => {
//     // console.log('Video pressed:', item);
//     // Handle video play logic here
//   };
//   const getVariant = (product: ShopifyProduct) => {
//     if (product.variants?.edges?.length > 0) {
//       return product?.variants?.edges[0]?.node;
//     } else if (product?.variants?.nodes?.length > 0) {
//       return product?.variants?.nodes[0];
//     } else {
//       return null;
//     }
//   };
//   const renderItem = ({ item, index }) => {
//     if (item.isAd) {
//       return <View>
//         <View style={{ height: 4, backgroundColor: grayColor }} />
//         <View style={{ marginVertical: 20, marginLeft: 10 }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               width: wp(95),
//             }}>
//             <View style={{ flexDirection: 'row', gap: 5, marginBottom: 10 }}>
//               <Image source={VIP_LOGO} style={{
//                 width: 40,
//                 height: 40,
//               }} />
//               <View>
//                 <Text
//                   style={{
//                     fontSize: 16,
//                     fontWeight: '500',
//                     color: redColor,
//                   }}>
//                   VIP Number Shop
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     fontWeight: '500',
//                     color: '#999999',
//                   }}>
//                   Sponsored
//                 </Text>
//               </View>
//             </View>
//             <Entypo name="cross" size={25} color="gray" />
//           </View>
//           <ScrollView
//             horizontal
//             contentContainerStyle={{
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//             showsHorizontalScrollIndicator={false}>
//             {Images.map(item => (
//               <View key={item}>
//                 <VipAddSection item={item} onPress={handlePressItem} />
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//         <View style={{ height: 4, backgroundColor: grayColor }} />
//       </View>;
//     }
//     return <VideoItem key={index}
//       item={item}
//       index={index}
//       currentIndex={currentIndex}
//       isPlaying={index === currentIndex}
//       navigation={navigation} />;
//   };
//   return (
//     <View style={{}}>
//       <FlatList
//         data={productVideosUrl || cacheFiles}
//         // renderItem={renderItem}
//         renderItem={({ item, index }) => (
//           <VideoItem
//             key={index}
//             item={item}
//             index={index}
//             currentIndex={currentIndex}
//             isPlaying={index === currentIndex}
//             navigation={navigation}
//             onPress={() => {
//               navigation.navigate('ProductDetails', {
//                 product: item,
//                 variant: getVariant(item),
//                 inventoryQuantity: bestDealInventoryQuantities[index],
//                 // tags: bestDealTags[index],
//                 option: bestDealoptions[index],
//                 // ids: bestDealProductVariantsIDS[index]
//               });
//             }}
//           />
//         )}
//         keyExtractor={(item, index) => index}
//         showsHorizontalScrollIndicator={false}
//         onViewableItemsChanged={onViewableItemsChanged}
//         viewabilityConfig={viewabilityConfig}
//         scrollEventThrottle={16}
//         snapToInterval={height}
//         onEndReached={handleEndReached}
//         onEndReachedThreshold={0.1}
//         decelerationRate="fast"
//         pagingEnabled
//         ListFooterComponent={loading && !allLoaded ? <ActivityIndicator /> : null}
//         initialNumToRender={10}
//         maxToRenderPerBatch={10}
//         windowSize={21}
//         removeClippedSubviews={true}
//         updateCellsBatchingPeriod={50}
//       />

//     </View>
//   );
// };

// export default VideoList;


import React, { useState, useEffect , useRef, useCallback} from 'react';
import { View, FlatList, Dimensions, ScrollView, Image, Text, ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import VideoItem from './VideoItem';
import { Images, Videos } from '../constants/Constants';
import VipAddSection from './VipAddSection';
import { VIP_LOGO } from '../assests/images';
import { grayColor, redColor, blackColor } from '../constants/Color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import { useSelector } from 'react-redux';
import RecommendedVideo from './RecommendedVideo'

const { height } = Dimensions.get('window');

const VideoList = ({ cachedFiles, currentIndex, onViewableItemsChanged, viewabilityConfig, navigation }) => {
  const cacheFiles = useSelector(state => state.cachedFiles?.cachedFiles);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [bestDealInventoryQuantities, setBestDealInventoryQuantities] = useState('');
  const [bestDealoptions, setBestDealOptions] = useState([]);

  const videosPerPage = 10;
  const productMedia = cachedFiles?.map(productEdge => {
    const productId = productEdge?.node?.id;
    const media = productEdge?.node?.media?.edges?.map(mediaEdge => ({
      ...mediaEdge?.node?.sources[0],
      productId
    }));
    return media;
  });

  const productVideosUrl = productMedia?.reduce((acc, val) => acc.concat(val), []).filter(Boolean);
  useEffect(() => {
    extractInventoryQuantities();
  }, [cachedFiles]);

  const extractInventoryQuantities = () => {
    if (!cachedFiles || !Array.isArray(cachedFiles)) {
      console.error("Invalid data format for cachedFiles");
      return;
    }
    const inventoryQuantities = cachedFiles.map((productWrapper) => {
      const product = productWrapper?.node;
      if (product && product.variants?.edges && Array.isArray(product.variants.edges)) {
        return product.variants.edges.map((edge) => {
          return edge?.node?.inventoryQuantity || null;
        });
      } else {
        console.warn("Variants edges not found or not an array:", product?.variants?.edges);
        return [];
      }
    });
    setBestDealInventoryQuantities(inventoryQuantities);
  };
  useEffect(() => {
    setVideos([]);
    setPage(1);
    setAllLoaded(false);
  }, [cachedFiles]);
  useEffect(() => {
    loadMoreVideos(); // Ensure this is called with the correct data for the selected tab.
  }, [ page, videosPerPage]);


// const loadMoreVideos = () => {
//   if (loading) {
//       console.log("Already loading, skipping...");
//       return;
//   }

//   console.log("loadMoreVideos called");

//   setLoading(true);
//   setTimeout(() => {
//       const start = (page - 1) * videosPerPage;
//       const end = start + videosPerPage;

//       console.log("start:", start, "end:", end); // Debug start and end values

//       const newVideos = productVideosUrl.slice(start, end);
//       console.log("newVideos length:", newVideos.length); // Debug new videos length

//       if (newVideos.length === 0) {
//           console.log("No more videos to load");
//           setAllLoaded(true);
//       } else {
//           const updatedVideos = [...videos, ...newVideos];
//           console.log("Updated videos length:", updatedVideos.length); // This line
//           setVideos(updatedVideos);
//           setPage(prevPage => prevPage + 1);
//       }
//       setLoading(false);
//   }, 800);
// };
const loadMoreVideos = useCallback(() => {
  if (loading) {
    return;
  }

  setLoading(true);

  setTimeout(() => {
    const start = (page - 1) * videosPerPage;
    const end = start + videosPerPage;

    const newVideos = productVideosUrl.slice(start, end);

    if (newVideos.length === 0) {
      setAllLoaded(true);
    } else {
      setVideos(prevVideos => {
        const updatedVideos = [...prevVideos, ...newVideos];
        console.log("Updated videos length:", updatedVideos.length);
        return updatedVideos;
      });
      setPage(prevPage => prevPage + 1);
    }
    setLoading(false);
  }, 800);
}, [loading, page, videosPerPage, productVideosUrl]);

   
  const handleEndReached = () => {
    if (!loading && !allLoaded) {
      loadMoreVideos();
    }
  };

  const handlePressItem = item => {
    console.log('Video pressed:', item);
  };

  const getVariant = (product) => {
    if (product.variants?.edges?.length > 0) {
      return product?.variants?.edges[0]?.node;
    } else if (product?.variants?.nodes?.length > 0) {
      return product?.variants?.nodes[0];
    } else {
      return null;
    }
  };

  const VIDEO_DURATION = 5000;
  const [visibleVideoIndices, setVisibleVideoIndices] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(0);
  const timerRef = useRef(null);

  const viewabilityConfig1 = useRef({
    viewAreaCoveragePercentThreshold: 50, // Determines what percentage of the item is visible
  }).current;

  const clearAllTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const togglePlayingVideo = () => {
    setPlayingIndex((prevIndex) => (prevIndex + 1) % visibleVideoIndices.length);
  };

  useEffect(() => {
    clearAllTimers();
    if (visibleVideoIndices.length > 0) {
      setPlayingIndex(0);
      timerRef.current = setInterval(togglePlayingVideo, VIDEO_DURATION);
    }
    return () => clearAllTimers();
  }, [visibleVideoIndices]);

  const onViewableItemsChanged1 = useRef(({ viewableItems }) => {
    const newVisibleIndices = viewableItems.map(item => item.index);
    if (newVisibleIndices.join() !== visibleVideoIndices.join()) {
      setVisibleVideoIndices(newVisibleIndices);
    }
  }).current;

  const renderItem1 = useCallback(
    ({ item, index }) => (
      <View >
        <RecommendedVideo
          item={item}
          isPlaying={visibleVideoIndices[playingIndex] === index}
        />
      </View>
    ),
    [visibleVideoIndices, playingIndex]
  );

  const renderItem = ({ item, index }) => {
    if (index === 5) {
      // Recommended Videos Section after the first 5 videos
      return (
        <View key={`recommended-${index}`}>

        <View style={{ height: 4, backgroundColor: grayColor }} />
        <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 10 }}>
                {/* <Image source={REEL_PLAY_BLACK} style={styles.reelIcon} /> */}
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 5,
                    fontWeight: '600',
                    color: blackColor,
                  }}>
                  Recommended
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 5,
                    fontWeight: '500',
                    color: redColor,
                  }}>
                  See All
                </Text>
              </View>
              {/* </View> */}
              <FlatList
                data={Videos}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem1}
                keyExtractor={item => item.video_id}
                onViewableItemsChanged={onViewableItemsChanged1}
                viewabilityConfig={viewabilityConfig1}
              // getItemLayout={(data, index) => (
              //   { length: width, offset: width * index, index }
              // )}
              />
            </View>
<View style={{ height: 4, backgroundColor: grayColor }} />

        </View>

      );
    }

    if (index > 5 && (index - 5) % 5 === 0) {
      return (
        <View key={`ad-${index}`}>
          <View style={{ height: 4, backgroundColor: grayColor }} />
          <View style={{ marginVertical: 20, marginLeft: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp(95) }}>
              <View style={{ flexDirection: 'row', gap: 5, marginBottom: 10 }}>
                <Image source={VIP_LOGO} style={{ width: 40, height: 40 }} />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: '500', color: redColor }}>
                    VIP Number Shop
                  </Text>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#999999' }}>
                    Sponsored
                  </Text>
                </View>
              </View>
              <Entypo name="cross" size={25} color="gray" />
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              showsHorizontalScrollIndicator={false}
            >
              {Images.map(item => (
                <View key={item}>
                  <VipAddSection item={item} onPress={handlePressItem} />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{ height: 4, backgroundColor: grayColor }} />
        </View>
      );
    }

    return (
      <VideoItem
        key={item.productId}
        item={item}
        index={index}
        currentIndex={currentIndex}
        isPlaying={index === currentIndex}
        navigation={navigation}
        onPress={() => {
          navigation.navigate('ProductDetails', {
            product: item,
            variant: getVariant(item),
            inventoryQuantity: bestDealInventoryQuantities[index],
            option: bestDealoptions[index],
          });
        }}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.productId}-${index}`}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
        snapToInterval={height}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        decelerationRate="fast"
        pagingEnabled
        ListFooterComponent={loading && !allLoaded ? <ActivityIndicator /> : null}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
};

export default VideoList;
