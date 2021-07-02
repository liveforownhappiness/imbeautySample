import axios from 'axios';
import { Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NavigationService from '../Navigator/NavigationService';
import { store } from '../Redux/store';
import keyChain from '../Util/keychain';

export const BASE_URL = {
  Local: 'http://localhost:8000',
  Development: 'https://dev-imbeauty-api.beautyvillage.net',
  Staging: 'https://stage-imbeauty-api.beautyvillage.net',
  Production: 'https://imbeauty-api.beautyvillage.net',
};

export const setAccessToken = (accessToken: string | null | undefined) => {
  if (accessToken) axios.defaults.headers.common.Authorization = `jwt ${accessToken}`;
  else axios.defaults.headers.common.Authorization = null;
};

export const setAxiosGlobalInstance = async () => {
  try {
    const state = store.getState();
    const apiMode = state.setting.apiMode;
    axios.defaults.baseURL = BASE_URL[apiMode];

    const accessToken = keyChain.accessToken;
    if (accessToken) {
      setAccessToken(accessToken);
    }

    const [appVersion, userAgent] = await Promise.all([
      DeviceInfo.getVersion(),
      DeviceInfo.getUserAgent(),
    ]);

    axios.defaults.headers.common['User-Agent'] = userAgent.concat(` appVersion=${appVersion}`);

    if (__DEV__) {
      axios.interceptors.request.use(
        function (config) {
          console.log('axios 요청:\n', config);
          return config;
        },
        function (error) {
          console.log('axios 요청 오류:\n', error);
          throw error;
        },
      );
    }

    axios.interceptors.response.use(
      (response) => {
        if (__DEV__) console.log('axios 응답:\n', response);
        return response;
      },
      (error) => {
        if (__DEV__) console.log('axios 응답 오류:\n', error);
        if (error?.response?.status === 401) {
          Alert.alert('', '사용자 정보가 만료되었습니다. 재로그인이 필요합니다.', [
            {
              text: '확인',
              onPress: () => NavigationService.navigate('login'),
            },
          ]);
        }

        throw error;
      },
    );
  } catch (err) {
    if (__DEV__) console.log('setAxiosGlobalInstance 에러', err);
  }
};
