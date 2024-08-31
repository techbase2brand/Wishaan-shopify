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


import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, FlatList, Dimensions, ScrollView, Image, Text, ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import VideoItem from './VideoItem';
import { ADMINAPI_ACCESS_TOKEN, Images, STOREFRONT_ACCESS_TOKEN, STOREFRONT_DOMAIN, Videos } from '../constants/Constants';
import VipAddSection from './VipAddSection';
import { VIP_LOGO } from '../assests/images';
import { grayColor, redColor, blackColor } from '../constants/Color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../utils';
import { useSelector } from 'react-redux';
import RecommendedVideo from './RecommendedVideo'
import { useCart } from '../context/Cart';
import { logEvent } from '@amplitude/analytics-react-native';
import { useShopifyCheckoutSheet } from '@shopify/checkout-sheet-kit';



const { height } = Dimensions.get('window');

const VideoList = ({ cachedFiles, currentIndex, onViewableItemsChanged, viewabilityConfig, navigation }) => {
  const ShopifyCheckout = useShopifyCheckoutSheet();

  const cacheFiles = useSelector(state => state.cachedFiles?.cachedFiles);
  const userLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const { addToCart, addingToCart, clearCart,checkoutURL } = useCart();
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [bestDealInventoryQuantities, setBestDealInventoryQuantities] = useState('');
  const [bestDealoptions, setBestDealOptions] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  // console.log("cachedFilescachedFiles",cachedFiles[0].node.variants.edges[0].node);
  const videosPerPage = 10;
  console.log("videosvideosvideos",cachedFiles);
  const productMedia = cachedFiles?.map(productEdge => {
    const productId = productEdge?.node?.id;
    const title = productEdge?.node?.title;
    const description = productEdge?.node?.descriptionHtml;
    const variants = productEdge?.node?.variants?.edges?.map(variantEdge => ({
      variantId: variantEdge?.node?.id,
      // variantTitle: variantEdge?.node?.title,
    }));
    const media = productEdge?.node?.media?.edges?.map(mediaEdge => ({
      ...mediaEdge?.node?.sources[0],
      productId,
      title,
      description,
      variants
    }));

    return media;
  });
  const productVideosUrl = productMedia?.reduce((acc, val) => acc.concat(val), []).filter(Boolean);
  console.log("productVideosUrlproductVideosUrl",productVideosUrl);
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
  }, [page, videosPerPage]);


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
  }, [loading, page, videosPerPage]);


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

  // recommneded data
  useEffect(() => {
    fetchUpsellingProducts("gid://shopify/Product/9432610505011");
  }, []);

  const fetchUpsellingProducts = async (productId) => {
    console.log('Fetching upselling products for product ID:', productId);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("X-Shopify-Storefront-Access-Token", STOREFRONT_ACCESS_TOKEN);

      const graphql = JSON.stringify({
        query: `
          query getProduct($id: ID!) {
            product(id: $id) {
              id
              title
              tags
              collections(first: 5) {
                edges {
                  node {
                    id
                    title
                    products(first: 3) {
                      edges {
                        node {
                          id
                          title
                          media(first: 10) {
                            edges {
                              node {
                                mediaContentType
                                ... on Video {
                                  sources {
                                    url
                                  }
                                }
                              }
                            }
                          }
                          variants(first: 1) {
                            edges {
                              node {
                                priceV2 {
                                  amount
                                  currencyCode
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { id: productId },
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow"
      };

      const response = await fetch(`https://${STOREFRONT_DOMAIN}/api/2024-04/graphql.json`, requestOptions);
      const result = await response.json();
      const product = result.data.product;

      const relatedProducts = product.collections.edges.flatMap(edge => edge.node.products.edges.map(productEdge => productEdge.node));

      const productMedia = relatedProducts.map(productEdge =>
        productEdge.media.edges.map(mediaEdge => mediaEdge.node.sources[0]?.url)
      );
      let productVideosUrl = productMedia.flat();
      productVideosUrl = [...new Set(productVideosUrl)];


      // Set the unique video URLs in the state
      setVideoUrls(productVideosUrl);

      return relatedProducts;

      // Continue with further processing like caching or dispatching
      return relatedProducts;
    } catch (error) {
      console.error('Error fetching upselling products:', error);
      return [];
    }
  };

  // Ads Data 


  const [entriesData, setEntriesData] = useState([]);

  // useEffect(() => {
  //   const fetchMetaobjects = async () => {
  //     try {
  //       const response = await fetch(`https://${STOREFRONT_DOMAIN}/admin/api/2023-07/graphql.json`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'X-Shopify-Access-Token': ADMINAPI_ACCESS_TOKEN,
  //         },
  //         body: JSON.stringify({
  //           query: `
  //             {
  //               metaobjects(first: 10, type: "ads") {
  //                 edges {
  //                   node {
  //                     id
  //                     fields {
  //                       key
  //                       value
  //                     }
  //                     type
  //                   }
  //                 }
  //               }
  //             }
  //           `,
  //         }),
  //       });

  //       const data = await response.json();
  //       console.log("Metaobjects Response>>", data);

  //       const metaobjectEdges = data.data.metaobjects.edges;
  //       if (metaobjectEdges.length === 0) {
  //         console.warn('No metaobjects found.');
  //         return;
  //       }

  //       const allEntries = metaobjectEdges.map(edge => {
  //         const fields = edge.node.fields;
  //         const titleField = fields.find(field => field.key === 'title');
  //         const imagesField = fields.find(field => field.key === 'ads'); // Adjust the key if needed

  //         const title = titleField ? titleField.value : 'No title';
  //         let images = [];

  //         if (imagesField) {
  //           try {
  //             const gidArray = JSON.parse(imagesField.value);

  //             // Debug parsed GID array
  //             console.log('Parsed GID array:', gidArray);

  //             images = gidArray.map(gid => {
  //               const imageId = gid.split('/').pop();
  //               // Construct URL - adjust this as needed based on your Shopify configuration
  //               // const url = `https://cdn.shopify.com/s/files/1/${STOREFRONT_DOMAIN}/files/${imageId}.jpg?v=1`;
  //               const url = `https://admin.shopify.com/store/wishandemoapp/content/metaobjects/entries/ads/${mediaId}`;
  //               // Debug constructed URL
  //               console.log('Constructed URL:', url);

  //               return url;
  //             });

  //             // Debug final image URLs
  //             console.log('Final Image URLs:', images);

  //           } catch (error) {
  //             console.error('Error parsing image field value as JSON:', error);
  //           }
  //         }

  //         return {
  //           title,
  //           images
  //         };
  //       });

  //       setEntriesData(allEntries);

  //     } catch (error) {
  //       console.error('Error fetching metaobjects:', error);
  //     }
  //   };

  //   fetchMetaobjects();
  // }, []);

  const fetchMediaDetails = async (mediaIds) => {
    const query = `
    query {
      nodes(ids: [${mediaIds.map(id => `"gid://shopify/MediaImage/${id}"`).join(',')}]) {
        ... on MediaImage {
          image {
            src
          }
        }
      }
    }
  `;
    try {
      const response = await fetch(`https://${STOREFRONT_DOMAIN}/admin/api/2023-07/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': ADMINAPI_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      return data.data.nodes.map(node => node.image.src);
    } catch (error) {
      console.error('Error fetching media details:', error);
      return [];
    }
  };

  // Function to fetch metaobjects
  const fetchMetaobjects = async (after = null, accumulatedEntries = []) => {
    const query = `
    query {
      metaobjects(first: 10, type: "ads" ${after ? `, after: "${after}"` : ''}) {
        edges {
          cursor
          node {
            id
            fields {
              key
              value
            }
            type
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `;
    try {
      const response = await fetch(`https://${STOREFRONT_DOMAIN}/admin/api/2023-07/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': ADMINAPI_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      const newEntries = data.data.metaobjects.edges.map(edge => edge.node);

      const updatedEntries = [...accumulatedEntries];

      for (const metaobject of newEntries) {
        const titleField = metaobject.fields.find(field => field.key === 'title');
        const imagesField = metaobject.fields.find(field => field.key === 'ads');
        if (titleField) {
          const title = titleField.value;
          let images = [];

          if (imagesField) {
            try {
              const mediaIds = JSON.parse(imagesField.value).map(id => id.split('/').pop());
              images = await fetchMediaDetails(mediaIds);
            } catch (error) {
              console.error('Error parsing images:', error);
            }
          }

          updatedEntries.push({
            title,
            images
          });
        }
      }

      const hasNextPage = data.data.metaobjects.pageInfo.hasNextPage;

      if (hasNextPage) {
        const lastCursor = data.data.metaobjects.edges[data.data.metaobjects.edges.length - 1].cursor;
        return fetchMetaobjects(lastCursor, updatedEntries);
      } else {
        return updatedEntries;
      }
    } catch (error) {
      console.error('Error fetching metaobjects:', error);
      return accumulatedEntries;  // Return what was accumulated so far
    }
  };

  // React component to load and display metaobjects

  useEffect(() => {
    const loadMetaobjects = async () => {
      const allEntriesData = await fetchMetaobjects();
      setEntriesData(allEntriesData);
    };

    loadMetaobjects();
  }, []);


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


  const addToCartProduct = async (variantId, quantity) => {
    await addToCart(variantId, quantity);
    // navigation.navigate('CartModal')
    Toast.show(`${quantity} item${quantity !== 1 ? 's' : ''} added to cart`);
  };

  // checkout 

  const presentCheckout = async () => {
    logEvent('Click CheckOut ');

    // Check if the user is logged in
    if (!userLoggedIn) {
      // Navigate to the AuthStack if the user is not logged in
      navigation.navigate("AuthStack");
      Toast.show("Please First complete the registration process")
    } else {
      // Check if the checkout URL exists
      if (checkoutURL) {
        // Present the checkout using ShopifyCheckout
        ShopifyCheckout.present(checkoutURL);
        logEvent('Open CheckOut ');
      } else {
        // Log or handle the case where the checkout URL is not available
        console.log('Checkout URL is not available');
      }
    }
  };

  // recommended
  const renderItem1 = useCallback(
    ({ item, index }) => (
      <View key={index}>
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
              data={videoUrls}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem1}
              keyExtractor={item => item}
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

      const adIndex = ((index - 5) / 5) % entriesData.length;
      const adData = entriesData[adIndex];
      return (
        <View key={`ad-${index}`}>
          <View style={{ height: 4, backgroundColor: grayColor }} />
          <View style={{ marginVertical: 20, marginLeft: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp(95) }}>
              <View style={{ flexDirection: 'row', gap: 5, marginBottom: 10 }}>
                <Image source={VIP_LOGO} style={{ width: 40, height: 40 }} />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: '500', color: redColor }}>
                    {adData?.title}
                    {/* VIP Number Shop */}
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
              {adData?.images?.map(item => (
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
        key={`${index}`}
        item={item}
        index={index}
        currentIndex={currentIndex}
        isPlaying={index === currentIndex}
        navigation={navigation}
        presentCheckout={presentCheckout}
        onAddToCart={addToCartProduct}
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
