import { Linking } from 'react-native';
import NavigationService from '../Navigator/NavigationService';
import { settingActionCreator, settingInitialState } from '../Redux/Modules/Setting/settingReducer';
import { store } from '../Redux/store';
import { deepLinkParser } from './urlParser';

export const setDeepLinkOnStore = (screen: string, params: any) => {
  store.dispatch(
    settingActionCreator.setValue({
      deep_link: { screen, params },
    }),
  );
};

export const cleanDeepLinkStore = () => {
  store.dispatch(
    settingActionCreator.setValue({
      deep_link: settingInitialState.deep_link,
    }),
  );
};

export const navigateByData = (data: any) => {
  NavigationService.navigate(data.screen, data.params);
};

//IOS && ANDROID : 앱이 딥링크로 처음 실행될때, 앱이 열려있지 않을 때
export const listenInitialURL = () => {
  Linking.getInitialURL().then((url) => {
    if (url) {
      const url_obj = deepLinkParser(url);
      if (url_obj?.screen && url_obj.screen?.length > 1) {
        setDeepLinkOnStore(url_obj.screen, url_obj.params);
      }
    }
  });
};

//IOS : 앱이 딥링크로 처음 실행될때, 앱이 열려있지 않을 때 && 앱이 실행 중일 때
//ANDROID : 앱이 실행 중일 때
export const subscribeDeepLink = () => {
  Linking.addEventListener('url', (url) => {
    if (url) {
      const url_obj = deepLinkParser(url.url);
      if (url_obj?.screen && url_obj.screen?.length > 1) {
        setDeepLinkOnStore(url_obj.screen, url_obj.params);
      }
    }
  });
};

export const unsubscribeDeepLink = () => {
  Linking.removeEventListener('url');
};

export const generateDeepLink = (feed_type: string, feed_id: number): string => {
  const screen = `${feed_type}_detail`;
  const id_name = `${feed_type}_id`;

  return `https://beautyvillage.net/app/deep_link.html?screen=${screen}&${id_name}=${feed_id}`;
};
