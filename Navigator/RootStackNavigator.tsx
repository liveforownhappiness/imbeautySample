import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import ColorList from '../Assets/js/ColorList';
import Apply from '../Screen/ApplyScreen';
import ChangePasswordScreen from '../Screen/ChangePasswordScreen';
import ChangePhoneIdentification from '../Screen/ChangePhoneIdentification';
import DevMenuScreen from '../Screen/DevMenuScreen';
import EmailLoginScreen from '../Screen/EmailLoginScreen';
import FindEmailIdentification from '../Screen/EmailLoginScreen/FindEmailIdentification';
import ResetPassword from '../Screen/EmailLoginScreen/ResetPassword';
import EmailSignUpScreens from '../Screen/EmailSignUpScreens';
import EmailSignUpEmailPasswordNickname from '../Screen/EmailSignUpScreens/EmailSignUpEmailPasswordNickname';
import EmailSignUpEmailVerification from '../Screen/EmailSignUpScreens/EmailSignUpEmailVerification';
import InitApp from '../Screen/Entrance/InitApp';
import EventDetailScreen from '../Screen/EventDetailScreen';
import EventInputScreen from '../Screen/EventInputScreen';
import EventUpdateScreen from '../Screen/EventUpdateScreen';
import IdentificationScreen from '../Screen/IdentificationScreen';
import LoginScreen from '../Screen/LoginScreen';
import NicknameAndTerms from '../Screen/LoginScreen/NicknameAndTerms';
import MyPageMyProfileEdit from '../Screen/MyPageEditScreen';
import MyPageOpenSourceLicense from '../Screen/MyPageOpenSourceLicenseScreen';
import MyPageOptions from '../Screen/MyPageOptionScreen';
import MyPageScreen from '../Screen/MyPageScreen/Index';
import NewsDetailScreen from '../Screen/NewsDetailScreen';
import NewsInputScreen from '../Screen/NewsInputScreen';
import NewsUpdateScreen from '../Screen/NewsUpdateScreen';
import Notice from '../Screen/NoticeScreen';
import NotificationScreen from '../Screen/NotificationScreen';
import ReplyScreen from '../Screen/ReplyScreen';
import ReviewDetailScreen from '../Screen/ReviewDetailScreen';
import ReviewInputScreen from '../Screen/ReviewInputScreen';
import ScrapScreen from '../Screen/ScrapScreen';
import SearchShopScreen from '../Screen/SearchShopScreen';
import ShopApplyListScreen from '../Screen/ShopApplyListScreen';
import ShopDetailPictureInputScreen from '../Screen/ShopDetailPictureInputScreen';
import ShopDetailPictureScreen from '../Screen/ShopDetailPictureScreen';
import ShopDetailScreen from '../Screen/ShopDetailScreen';
import ShopInputScreen from '../Screen/ShopInputScreen';
import ShopModifyScreen from '../Screen/ShopModifyScreen';
import ShopRegisterScreen from '../Screen/ShopRegisterScreen';
import SignOutScreen from '../Screen/SignOutScreen';
import SignOutScreen2 from '../Screen/SignOutScreen/SignOutScreen2';
import TermsOfServiceDetail from '../Screen/TermsOfServiceDetailScreen/TermsOfServiceDetail';
import TermsOfService from '../Screen/TermsOfServiceScreen/TermsOfService';
import UserApplyListScreen from '../Screen/UserApplyListScreen';
import UserDetailScreen from '../Screen/UserDetailScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="InitApp">
      <Stack.Screen
        name="InitApp"
        component={InitApp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="bottomTab"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          headerTitle: '',
          headerTintColor: ColorList.primary,
          headerBackTitleVisible: false,
          headerStyle: {
            shadowColor: ColorList.background,
            backgroundColor: ColorList.background,
          }, }}
      />
      <Stack.Screen
        name="emailLogin"
        component={EmailLoginScreen}
        options={{
          headerTitle: '',
          headerTintColor: ColorList.primary,
          headerBackTitleVisible: false,
          headerStyle: {
            shadowColor: ColorList.background,
            backgroundColor: ColorList.background,
          },
        }}
      />
      <Stack.Screen
        name="EmailSignUpScreen"
        component={EmailSignUpScreens}
        options={{
          headerTitle: '이메일로 가입하기',
          headerTintColor: ColorList.black1,
          headerBackTitleVisible: false,
          headerStyle: {
            shadowColor: ColorList.white,
          },
        }}
      />
      <Stack.Screen
        name="emailSignUpEmailPasswordNickname"
        component={EmailSignUpEmailPasswordNickname}
        options={{
          headerTitle: '이메일로 가입하기',
          headerTintColor: ColorList.black1,
          headerBackTitleVisible: false,
          headerStyle: {
            shadowColor: ColorList.white,
          },
        }}
      />
      <Stack.Screen
        name="emailSignUpEmailVerification"
        component={EmailSignUpEmailVerification}
        options={{
          headerTitle: '이메일로 가입하기',
          headerTintColor: ColorList.black1,
          headerBackTitleVisible: false,
          headerStyle: {
            shadowColor: ColorList.white,
          },
        }}
      />
      <Stack.Screen
        name="review_detail"
        component={ReviewDetailScreen}
        options={{
          title: '후기',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="review_input"
        component={ReviewInputScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="news_detail"
        component={NewsDetailScreen}
        options={{
          title: '샵소식',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="news_input"
        component={NewsInputScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="newsUpdate"
        component={NewsUpdateScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="event_input"
        component={EventInputScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="shopInput"
        component={ShopInputScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="shopModify"
        component={ShopModifyScreen}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="replyScreen"
        component={ReplyScreen}
        options={{ title: '댓글', headerTitleAlign: 'center', headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="SearchShopScreen"
        component={SearchShopScreen}
        options={{ title: '시술 받은 샵 선택', headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="shop_detail"
        component={ShopDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="myPage"
        component={MyPageScreen}
        options={{
          headerShown: true,
          title: '마이 페이지',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="user_apply_list"
        component={UserApplyListScreen}
        options={{
          headerShown: true,
          title: '신청내역',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="shop_apply_list"
        component={ShopApplyListScreen}
        options={{
          headerShown: true,
          title: '신청내역',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="myPageOptions"
        component={MyPageOptions}
        options={{
          headerShown: true,
          title: '설정',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="myPageOpenSourceLicense"
        component={MyPageOpenSourceLicense}
        options={{
          headerShown: true,
          title: '오픈소스 라이선스',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="notice"
        component={Notice}
        options={{
          headerShown: true,
          title: '공지사항',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="termsOfService"
        component={TermsOfService}
        options={{
          headerShown: true,
          title: '약관 및 정책',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="termsOfServiceDetail"
        component={TermsOfServiceDetail}
        options={({ route }) => ({
          title: route.params.title,
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="myPageMyProfileEdit"
        component={MyPageMyProfileEdit}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          title: '프로필 수정',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="apply"
        component={Apply}
        options={({ route }) => ({
          title: '상담신청',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="shopRegister"
        component={ShopRegisterScreen}
        options={({ route }) => ({
          title: ' ',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="userDetail"
        component={UserDetailScreen}
        options={({ route }) => ({
          title: '',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="event_detail"
        component={EventDetailScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="event_update"
        component={EventUpdateScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="changePassword"
        component={ChangePasswordScreen}
        options={({ route }) => ({
          headerTitle: '',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="shopDetailPictureInputScreen"
        component={ShopDetailPictureInputScreen}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="shopDetailPictures"
        component={ShopDetailPictureScreen}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="signOut"
        component={SignOutScreen}
        options={({ route }) => ({
          headerTitle: '회원 탈퇴',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="signOut2"
        component={SignOutScreen2}
        options={({ route }) => ({
          headerTitle: '회원 탈퇴',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="identification"
        component={IdentificationScreen}
        options={({ route }) => ({
          headerTitle: '휴대폰 본인인증',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="FindEmailIdentification"
        component={FindEmailIdentification}
        options={({ route }) => ({
          headerTitle: '이메일 찾기',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="notificationScreen"
        component={NotificationScreen}
        options={{
          title: '알림',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={({ route }) => ({
          headerTitle: '비밀번호 재설정',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="NicknameAndTerms"
        component={NicknameAndTerms}
        options={({ route }) => ({
          headerTitle: '약관 동의',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="ChangePhoneIdentification"
        component={ChangePhoneIdentification}
        options={({ route }) => ({
          headerTitle: '전화번호 변경',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="DevMenuScreen"
        component={DevMenuScreen}
        options={({ route }) => ({
          headerTitle: '개발자 메뉴',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="ScrapScreen"
        component={ScrapScreen}
        options={({ route }) => ({
          headerTitle: '찜목록',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
