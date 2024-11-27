// import React from 'react';
// import messaging from '@react-native-firebase/messaging';
// import {PermissionsAndroid, Platform} from 'react-native';

// const usePushNotification = () => {
//   const requestUserPermission = async () => {
    
//     const res = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//     );
//   }

//   const getFCMToken = async () => {
//     const fcmToken = await messaging().getToken();
//     if (fcmToken) {
//       console.log('Your Firebase Token is:', fcmToken);
//     } else {
//       console.log('Failed', 'No token received');
//     }
//   };

//   const listenToBackgroundNotifications = async () => {
//     const unsubscribe = messaging().setBackgroundMessageHandler(
//       async remoteMessage => {
//         console.log(
//           'A new message arrived! (BACKGROUND)',
//           JSON.stringify(remoteMessage),
//         );
//       },
//     );
//     return unsubscribe;
//   }

//   const onNotificationOpenedAppFromBackground = async () => {
//     const unsubscribe = messaging().onNotificationOpenedApp(
//       async remoteMessage => {
//         console.log(
//           'App opened from BACKGROUND by tapping notification:',
//           JSON.stringify(remoteMessage),
//         );
//       },
//     );
//     return unsubscribe;
//   };

//   const onNotificationOpenedAppFromQuit = async () => {
//     const message = await messaging().getInitialNotification();

//     if(message) {
//       console.log('App opened from QUIT by tapping notification:', JSON.stringify(message));
//     }
//   };

//   return {
//     requestUserPermission,
//     getFCMToken,
//     listenToBackgroundNotifications,
//     onNotificationOpenedAppFromBackground,
//     onNotificationOpenedAppFromQuit,
//   };
// };

// export default usePushNotification;