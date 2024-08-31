import React, { useContext, useState, useEffect } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ConfirmationModal from '../components/Modal/ConfirmationModal'
import { AuthContext } from '../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingModal from '../components/Modal/LoadingModal';
import { logout } from '../redux/actions/authActions';
import { logEvent } from '@amplitude/analytics-react-native';
import Header from '../components/Header';
import { blackColor, redColor, whiteColor, lightShadeBlue, mediumGray, grayColor } from '../constants/Color'
import { getAdminAccessToken, getStoreDomain, SIGN_OUT, DELETE, SHIPPING_ADDRESS, MY_WISHLIST, ORDERS, ARE_YOU_SURE_DELETE_ACCOUNT, ARE_YOU_SURE_SIGNOUT, STOREFRONT_DOMAIN, ADMINAPI_ACCESS_TOKEN } from '../constants/Constants';
import { useThemes } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/Color';



const AccountScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.menu.selectedItem);
  // const STOREFRONT_DOMAIN = getStoreDomain(selectedItem)
  // const ADMINAPI_ACCESS_TOKEN = getAdminAccessToken(selectedItem)
  const { setIsLoggedIn } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [orders, setOrders] = useState([]);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => { });
  const [customerId, setCustomerId] = useState("")
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false)

  const { isDarkMode, toggleTheme } = useThemes();
  const colors = isDarkMode ? darkColors : lightColors;


  useEffect(() => {
    fetchUserDetails()
    logEvent('ProfileScreen Initialized');
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      fetchUserDetails()
      fetchImage();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      getCustomerAddress(customerId);
      fetchUserProfile(customerId);
      fetchOrders(customerId);
    }, [customerId])
  );

  useEffect(() => {
    getCustomerAddress(customerId);
    fetchUserProfile(customerId);
    fetchOrders(customerId);
  }, [customerId])

  //for get customer ID
  const fetchUserDetails = async () => {
    const userDetails = await AsyncStorage.getItem('userDetails')
    if (userDetails) {
      const userDetailsObject = JSON.parse(userDetails);
      console.log(userDetailsObject)
      const userId = userDetailsObject?.customer ? userDetailsObject?.customer.id : userDetailsObject?.id;
      console.log("userDetailsObject", userId)
      setCustomerId(userId)
    }
  };

  //for get customer Profile
  const fetchUserProfile = async (id) => {
    console.log("fetchUserProfile", id)
    try {
      const response = await axios.get(`https://${STOREFRONT_DOMAIN}/admin/api/2024-01/customers/${id}.json`, {
        headers: {
          'X-Shopify-Access-Token': ADMINAPI_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
      });
      console.log('Response fetchUserProfileDatar:', response.data);
      const customer = response?.data?.customer;
      setUserName(`${customer.first_name} ${customer.last_name}`);
    } catch (error) {
      console.error('Error fetching customer profile:', error);
    }
  };

  //for get customer profile Image
  const fetchImage = async () => {
    const profileImage = await AsyncStorage.getItem('userImage')
    setImage(profileImage)
  };

  //for get customer orders
  const fetchOrders = async (id) => {
    try {
      console.log
      const response = await axios.get(
        `https://${STOREFRONT_DOMAIN}/admin/api/2024-04/orders.json?customer_id=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": ADMINAPI_ACCESS_TOKEN
          },
        }
      );
      console.log("response.data.orders", response?.data?.orders);
      setOrders(response?.data?.orders)
    } catch (error) {
      console.log('Error fetching orders:', error);
    }
  };

  //for get customer Address
  const getCustomerAddress = async (id) => {
    // console.log("getCustomerAddress", id)
    try {
      const response = await axios.get(
        `https://${STOREFRONT_DOMAIN}/admin/api/2024-04/customers/${id}.json`,
        {
          headers: {
            'X-Shopify-Access-Token': ADMINAPI_ACCESS_TOKEN,
          },
        }
      );
      const customer = response?.data?.customer;
      const addresses = customer?.addresses;
      // console.log("customer.addresses", addresses)
      setCustomerAddresses(addresses)
      return addresses;
    } catch (error) {
      console.log('Error fetching customer address:', error);
    }
  };

  //for toggle Modal
  const toggleModal = (message: string, action: () => void) => {
    setModalMessage(message);
    setConfirmAction(() => action);
    setShowModal(true);
  };

  //for SignOutAccount
  const handleSignOut = async () => {
    setLoading(true)
    logEvent('SignOut Button Clicked');
    dispatch(logout());
    const signout = await AsyncStorage.removeItem('isUserLoggedIn');
    await AsyncStorage.removeItem('userImage')
    console.log("removed url", signout);
    setShowModal(false);
    setIsLoggedIn(false)
    navigation.navigate('AuthStack');
    logEvent('SignOut Seccess');
    setLoading(false)
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: 'AppWithNavigation' }],
    //   })
    // );
  };

  //for deleteAccount
  const handleDelete = async () => {
    logEvent('Delete Button Clicked');
    try {
      // const currentUser = auth().currentUser;
      // if (currentUser) {
      //   await currentUser.delete();
      //   await AsyncStorage.removeItem('isUserLoggedIn');
      //   dispatch(logout());
      //   console.log('Firebase user deleted successfully.');
      //   logEvent(`Firebase user deleted successfully.`);
      // } else {
      //   console.log('No user is currently signed in to Firebase.');
      //   logEvent(`No user is currently signed in to Firebase.`);
      // }
      await axios.delete(
        `https://${STOREFRONT_DOMAIN}/admin/api/2024-04/customers/${customerId}.json`,
        {
          headers: {
            'Content-Type': 'application/json',
            "X-Shopify-Access-Token": ADMINAPI_ACCESS_TOKEN,
          },
        }
      );
      setLoading(true)
      console.log(`Customer  deleted successfully.`);
      await AsyncStorage.removeItem('isUserLoggedIn');
      await AsyncStorage.removeItem('userImage')
      await AsyncStorage.removeItem('userDetails')
      setShowModal(false);
      setIsLoggedIn(false)
      dispatch(logout());
      navigation.navigate('AuthStack');
      logEvent('Delete Seccess');
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(`Error deleting customer :`, error);
      logEvent(`Error deleting customer :${error}`);
    }
  };


  const capitalizeFirstLetter = (str) => {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const FallbackAvatar = ({ name }) => (
    <View style={[styles.fallbackAvatar, { borderColor: colors.grayColor }]}>
      <Text style={styles.fallbackAvatarText}>{getInitials(name)}</Text>
    </View>
  );




  return (
    <ScrollView style={styles.container}>
      {/* {/ Header /} */}
      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="black" onPress={()=> navigation.goBack()}/>
        </TouchableOpacity>
        <Text style={styles.title}>Account</Text>
        <TouchableOpacity>
          <Icon name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View> */}
      <Header
        backIcon={true}
        navigation={navigation}
        text={"Account"} />

      {/* {/ User Profile /} */}
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.profileContainer}>
          <Image
            // source={{ uri: 'https://via.placeholder.com/100' }} // Replace with your image
            source={require('../assests/notificationimage.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Aman Kumar</Text>
            <TouchableOpacity>
              <Text style={styles.viewActivity}>View activity</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* {/ Shortcuts /} */}
        <View style={styles.shortcutContainer}>
          <TouchableOpacity style={styles.shortcut}>
            <View style={{ backgroundColor: "#FFF", borderWidth: 1, borderColor: "#E6E6E6", borderRadius: 100, height: 35, width: 35, alignItems: 'center', alignContent: "center", paddingTop: 7 }}>
              <AntDesign
                name="hearto"
                size={20}
                color="black"
              />

            </View>
            <Text style={styles.shortcutText}>Favourites</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shortcut}>
            <View style={{ backgroundColor: "#FFF", borderWidth: 1, borderColor: "#E6E6E6", borderRadius: 100, height: 35, width: 35, alignItems: 'center', alignContent: "center", paddingTop: 6 }}>
              <Icon name="attach-money" size={20} color="black" />
            </View>
            <Text style={styles.shortcutText}>Money <Text style={styles.moneyAmount}>$0</Text></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.shortcutContainer}>
          <TouchableOpacity style={styles.shortcut}>
            <View style={{ backgroundColor: "#FFF", borderWidth: 1, borderColor: "#E6E6E6", borderRadius: 100, height: 35, width: 35, alignItems: 'center', alignContent: "center", paddingTop: 6 }}>
              <Image
                source={require('../assests/AccountScreen/profileCart.png')}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
            </View>
            <Text style={styles.shortcutText}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcut} onPress={() => navigation.navigate("OrderHistory")}>
            <View style={{ backgroundColor: "#FFF", borderWidth: 1, borderColor: "#E6E6E6", borderRadius: 100, height: 35, width: 35, alignItems: 'center', alignContent: "center", paddingTop: 6 }}>

              <Image
                source={require('../assests/AccountScreen/order.png')}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
            </View>
            <Text style={styles.shortcutText}>Order</Text>
          </TouchableOpacity>
        </View>

        {/* {/ Sections /} */}
        <TouchableOpacity style={[styles.section, {
          borderWidth: 1,
          borderColor: "#E6E6E6",
          borderRadius: 10,
        }]}
          onPress={() => navigation.navigate("OrderDetailsScreen")}>
          <View style={styles.sectionRow}>
            <Image
              source={require('../assests/AccountScreen/mydetails.png')}
              style={{ width: 25, height: 25 }}
            />
            <Text style={styles.sectionText}>My Details</Text>
          </View>
          <Icon name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        <View style={[styles.sectionContainer, {
          borderWidth: 1,
          borderColor: "#E6E6E6",
          borderRadius: 10,
          marginTop: 20,

        }]}>

          <View style={{
            marginTop: 10, borderLeftWidth: 5,
            borderLeftColor: redColor,
          }}>
            <Text style={[styles.sectionHeader, {
              paddingLeft: 10,
            }]}>Orders</Text>
          </View>
          <TouchableOpacity style={styles.section}
            onPress={() =>
                navigation.navigate("UserDashboardScreen", {
                  from: SHIPPING_ADDRESS,
                  address: customerAddresses
                })
              }
            //   navigation.navigate("PickupAddressScreen")
            // }
          >
            <View style={styles.sectionRow}>
              <Image source={require('../assests/homeaddress.png')} style={{ width: 20, height: 20 }} />
              <Text style={styles.sectionText}>Address Book</Text>
            </View>
            <Icon name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.sectionDivider} /> */}

        <View style={[styles.sectionContainer, {
          borderWidth: 1,
          borderColor: "#E6E6E6",
          borderRadius: 10,
          marginTop: 20
        }]}>
          <View style={{
            marginTop: 10,
            borderLeftWidth: 5,
            borderLeftColor: redColor,
          }}>
            <Text style={[styles.sectionHeader, {
              paddingLeft: 10,
            }]}>Events</Text>
          </View>
          <TouchableOpacity style={styles.section}>
            <View style={styles.sectionRow}>
              <Icon name="event-available" size={20} color="black" />
              <Text style={styles.sectionText}>Event Help</Text>
            </View>
            <Icon name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.sectionDivider} />
          <TouchableOpacity style={styles.section}>
            <View style={styles.sectionRow}>
              <Icon name="help-outline" size={20} color="black" />
              <Text style={styles.sectionText}>Frequently asked questions</Text>
            </View>
            <Icon name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.sectionDivider} /> */}

        <View style={[styles.sectionContainer, {
          borderWidth: 1,
          borderColor: "#E6E6E6",
          borderRadius: 10,
          marginTop: 20
        }]}>
          <View style={{
            marginTop: 10,
            borderLeftWidth: 5,
            borderLeftColor: redColor,
          }}>
            <Text style={[styles.sectionHeader, {
              paddingLeft: 10,
            }]}>More</Text>
          </View>
          <TouchableOpacity style={styles.section}>
            <View style={styles.sectionRow}>
              <Image source={require('../assests/AccountScreen/about.png')} style={{ width: 20, height: 20 }} />
              <Text style={styles.sectionText}>About</Text>
            </View>
            <Icon name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.sectionDivider} />
          <TouchableOpacity style={styles.section}>
            <View style={styles.sectionRow}>
              <Image source={require('../assests/AccountScreen/feedback.png')} style={{ width: 20, height: 20 }} />

              <Text style={styles.sectionText}>Send Feedback</Text>
            </View>
            <Icon name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.sectionDivider} />
          <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("ReportIssueScreen")}>
            <View style={styles.sectionRow}>
              <AntDesign name="exclamationcircleo" size={20} color="black" />
              <Text style={styles.sectionText}>Report a Issue</Text>
            </View>
            <Icon name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.sectionDivider} />
          <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("HelpCenter")}>
            <View style={styles.sectionRow}>
              <Image source={require('../assests/AccountScreen/help.png')} style={{ width: 24, height: 24, resizeMode: "contain" }} />

              <Text style={styles.sectionText}>Help Center</Text>
            </View>
            <Icon name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.sectionDivider} />
          <TouchableOpacity style={styles.section}>
            <View style={styles.sectionRow}>
              <AntDesign name="setting" size={20} color="black" />
              <Text style={styles.sectionText}>Settings</Text>
            </View>
            <Icon name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.sectionDivider} />
          <TouchableOpacity style={styles.section}>
            <View style={styles.sectionRow}>
              <Image source={require('../assests/AccountScreen/product-return.png')} style={{ width: 24, height: 24, resizeMode: "contain" }} />
              <Text style={styles.sectionText}>Return & Refunds Policy</Text>
            </View>
            <Icon name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.sectionDivider} />
          <TouchableOpacity style={styles.section}>
            <View style={styles.sectionRow}>
              <Icon name="power-settings-new" size={20} color={redColor} />
              <Text style={[styles.sectionText, { color: redColor }]}>Logout</Text>
            </View>
            <Icon name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
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
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E6E6E6"
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '500',
  },
  viewActivity: {
    color: redColor,
    marginTop: 4,
  },
  shortcutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "flex-start",
    marginBottom: 16,
  },
  shortcut: {
    width: '48%',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E6E6E6"
  },
  shortcutText: {
    marginTop: 8,
    fontSize: 14,
    // textAlign: 'center',
  },
  moneyAmount: {
    backgroundColor: "#D1FFD0",
    borderRadius: 10,
    color: 'green',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '500',
    // marginBottom: 8,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,


  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    marginLeft: 16,
    fontSize: 16,
  },
  sectionDivider: {
    height: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: '#eee',
    // marginVertical: 16,
  },
});

export default AccountScreen;
