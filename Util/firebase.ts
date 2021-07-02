import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import userApi from '../Service/User/UserService';
import { navigateByData, setDeepLinkOnStore } from './deepLink';

// (ios에서만) push notification 권한 요청
export const requestMessagePermission = async (): Promise<void> => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
};

// 앱이 켜져있을 때
export const subscribeForegroundMessage = () => {
  const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    Toast.show({
      text1: remoteMessage?.notification?.title,
      text2: remoteMessage?.notification?.body,
      onPress: () => {
        if (remoteMessage?.data && remoteMessage.data.hasOwnProperty('screen')) {
          navigateByData(remoteMessage.data);
        }
        Toast.hide();
      },
    });
  });

  return unsubscribe;
};

// 앱이 대기 상태이거나 종료되었을 때 backgroud에서 실행됨
export const registerBackgroundMessageHandler = (): void => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('BackgroundMessageHandler remoteMessage\n', remoteMessage);
  });
};

// firebase device token 정보를 서버에 업로드
export const updateFirebaseTokenToServer = async (): Promise<void> => {
  const token = await messaging().getToken();
  const device_id = DeviceInfo.getUniqueId();
  const os_type = Platform.OS;

  userApi.postDeviceInfo(token, device_id, os_type);
};

// 앱이 대기 상태(완전 종료는 아님)에서 notification을 눌러서 켜졌을 때
export const onNotificationOpenedApp = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (remoteMessage?.data && remoteMessage.data.hasOwnProperty('screen')) {
      setDeepLinkOnStore(remoteMessage.data.screen, JSON.parse(remoteMessage.data.params));
    }
  });
};

// 앱이 완전 종료된 상태에서 notification을 눌러서 켜졌을 때
export const onInitialNotification = () => {
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        if (remoteMessage?.data && remoteMessage.data.hasOwnProperty('screen')) {
          setDeepLinkOnStore(remoteMessage.data.screen, JSON.parse(remoteMessage.data.params));
        }
      }
    });
};
