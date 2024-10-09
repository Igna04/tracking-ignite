// import React, { FC, useEffect, useState } from "react";
// import { View, Text, StyleSheet, PermissionsAndroid, Platform } from "react-native";
// import Geolocation from "react-native-geolocation-service";

// export const TrackingScreen: FC = () => {
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );

//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           startLocationTracking();
//         } else {
//           console.log('Location permission denied');
//         }
//       } else {
//         startLocationTracking();
//       }
//     };

//     const startLocationTracking = () => {
//       const watchId = Geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ latitude, longitude });
//         },
//         (error) => {
//           console.error(error.code, error.message);
//         },
//         {
//           enableHighAccuracy: true,
//           distanceFilter: 0,
//           interval: 5000,
//           fastestInterval: 5000,
//         },
//       );

//       // Cleanup the watcher on component unmount
//       return () => {
//         Geolocation.clearWatch(watchId);
//       };
//     };

//     requestLocationPermission();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {location ? (
//         <Text>
//           Latitude: {location.latitude}, Longitude: {location.longitude}
//         </Text>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//       <Text>Haii ini ignaa</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
