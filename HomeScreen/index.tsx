import { useIsFocused } from '@react-navigation/native';
import { Spinner } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import { Dimensions, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { useDispatch, useSelector } from 'react-redux';
import ColorList from '../../Assets/js/ColorList';
import commonStyles from '../../Assets/js/commonStyle';
import EventCard from '../../Component/EventCard';
import FeedCard from '../../Component/FeedCard';
import ImbeautyHeader from '../../Component/ImbeautyHeader';
import ShopCard from '../../Component/ShopCard';
import { homeActionCreator } from '../../Redux/Modules/Home/homeReducer';
import { settingActionCreator } from '../../Redux/Modules/Setting/settingReducer';
import { RootState } from '../../Redux/rootReducer';
import eventApi from '../../Service/Event/EventService';
import newsApi from '../../Service/News/NewsService';
import reviewApi from '../../Service/Review/ReviewService';
import shopApi from '../../Service/Shop/shopService';
import { cleanDeepLinkStore, navigateByData } from '../../Util/deepLink';
import { loginAlert } from '../../Util/loginAlert';
import { is_empty_object } from '../../Util/utilities';
import HomeEventCard from './HomeEventCard';
import HomeNoticeModal from './HomeNoticeModal';

function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();

  const refresh_homes = useCallback(() => {
    dispatch(homeActionCreator.fetchHomes.request());
  }, []);

  const notice_modal = useSelector((reduxState: RootState) => reduxState.setting.notice_modal);
  const homes = useSelector((reduxState: RootState) => reduxState.home.homes);
  const user = useSelector((reduxState: RootState) => reduxState.user.user_info);

  const noticeModalOpenWeekLaterCheck = useCallback(() => {
    const now = new Date();
    if (notice_modal?.date instanceof Date) {
      if ((now.getTime() - notice_modal.date.getTime()) / (1000 * 3600 * 24 * 7) >= 7) {
        dispatch(
          settingActionCreator.setValue({
            notice_modal: { open: true, date: null },
          }),
        );
      }
    }
  }, [notice_modal]);

  const noticeModalOpen = useCallback(() => {
    dispatch(
      settingActionCreator.setValue({
        notice_modal: { open: false, date: null },
      }),
    );
  }, []);

  const noticeModalOpenWeekLater = useCallback(() => {
    dispatch(
      settingActionCreator.setValue({
        notice_modal: { open: false, date: new Date() },
      }),
    );
  }, [notice_modal]);

  const isFocused = useIsFocused();
  useEffect(() => {
    noticeModalOpenWeekLaterCheck();
    if (isFocused) {
      refresh_homes();
    }
  }, [isFocused]);

  const deep_link = useSelector((reduxState: RootState) => reduxState.setting.deep_link);
  useEffect(() => {
    if (deep_link?.hasOwnProperty('screen')) {
      navigateByData(deep_link);
      cleanDeepLinkStore();
    }
  }, [deep_link]);

  const navigateToEventDetail = useCallback(
    (event_id: number) => navigation.navigate('event_detail', { event_id: event_id }),
    [],
  );

  const toggleHotEventScrap = useCallback(
    (event_id, is_scraped) => {
      if (is_scraped) eventApi.cancelScrapEvent(event_id);
      else eventApi.scrapEvent(event_id);
      dispatch(
        homeActionCreator.setValue({
          homes: {
            ...homes,
            data: {
              ...homes.data,
              hot_events: homes.data.hot_events.map((hot_event: any) =>
                hot_event.id == event_id
                  ? {
                    ...hot_event,
                    is_scraped: !hot_event.is_scraped,
                    scrap_count: hot_event.is_scraped
                      ? hot_event.scrap_count - 1
                      : hot_event.scrap_count + 1,
                  }
                  : hot_event,
              ),
            },
          },
        }),
      );
    },
    [homes],
  );

  const toggleNewEventScrap = useCallback(
    (event_id, is_scraped) => {
      if (is_scraped) eventApi.cancelScrapEvent(event_id);
      else eventApi.scrapEvent(event_id);
      dispatch(
        homeActionCreator.setValue({
          homes: {
            ...homes,
            data: {
              ...homes.data,
              new_events: homes.data.new_events.map((new_event: any) =>
                new_event.id == event_id
                  ? {
                    ...new_event,
                    is_scraped: !new_event.is_scraped,
                    scrap_count: new_event.is_scraped
                      ? new_event.scrap_count - 1
                      : new_event.scrap_count + 1,
                  }
                  : new_event,
              ),
            },
          },
        }),
      );
    },
    [homes],
  );

  const renderHotEventCard = useCallback(
    (event: any) => {
      return (
        <HomeEventCard
          key={event.id}
          card_data={event}
          navigateToDetail={navigateToEventDetail}
          toggleScrap={toggleHotEventScrap}
          main_image_url={event.main_image_url}
          is_scraped={event.is_scraped}
          location={event.shop.location.name}
          title={event.title}
          tags={event.tags}
          origin_price={event.origin_price}
          discounted_price={event.discounted_price}
        />
      );
    },
    [navigateToEventDetail, toggleHotEventScrap],
  );

  const renderNewEventCard = useCallback(
    (event: any) => {
      return (
        <EventCard
          key={event.id}
          card_data={event}
          navigateToDetail={navigateToEventDetail}
          toggleScrap={toggleNewEventScrap}
          main_image_url={event.main_image_url}
          is_scraped={event.is_scraped}
          location={event.shop.location.name}
          shop_id={event.shop.id}
          title={event.title}
          tags={event.tags}
          origin_price={event.origin_price}
          discounted_price={event.discounted_price}
        />
      );
    },
    [navigateToEventDetail, toggleHotEventScrap],
  );

  const navigateToReviewDetail = useCallback(
    (review_id: number) => navigation.navigate('review_detail', { review_id: review_id }),
    [],
  );

  const navigateToNewsDetail = useCallback(
    (news_id: number) =>
      navigation.navigate('news_detail', {
        news_id: news_id,
      }),
    [],
  );

  const toggleReviewLike = useCallback(
    (review_id, is_liked) => {
      if (is_liked) reviewApi.cancelLikeReview(review_id);
      else reviewApi.likeReview(review_id);
      dispatch(
        homeActionCreator.setValue({
          homes: {
            ...homes,
            data: {
              ...homes.data,
              hot_reviews: homes.data.hot_reviews.map((hot_review: any) =>
                hot_review.id == review_id
                  ? {
                    ...hot_review,
                    is_liked: !hot_review.is_liked,
                    likes_count: hot_review.is_liked
                      ? hot_review.likes_count - 1
                      : hot_review.likes_count + 1,
                  }
                  : hot_review,
              ),
            },
          },
        }),
      );
    },
    [homes],
  );

  const toggleNewsLike = useCallback(
    (news_id, is_liked) => {
      if (is_liked) newsApi.cancelLikeNews(news_id);
      else newsApi.likeNews(news_id);
      dispatch(
        homeActionCreator.setValue({
          homes: {
            ...homes,
            data: {
              ...homes.data,
              hot_news: homes.data.hot_news.map((news: any) =>
                news.id == news_id
                  ? {
                    ...news,
                    is_liked: !news.is_liked,
                    likes_count: news.is_liked ? news.likes_count - 1 : news.likes_count + 1,
                  }
                  : news,
              ),
            },
          },
        }),
      );
    },
    [homes],
  );

  const toggleReviewScrap = useCallback(
    (review_id, is_scraped) => {
      if (is_scraped) reviewApi.cancelScrapReview(review_id);
      else reviewApi.scrapReview(review_id);
      dispatch(
        homeActionCreator.setValue({
          homes: {
            ...homes,
            data: {
              ...homes.data,
              hot_reviews: homes.data.hot_reviews.map((hot_review: any) =>
                hot_review.id == review_id
                  ? {
                    ...hot_review,
                    is_scraped: !hot_review.is_scraped,
                    scrap_count: hot_review.is_scraped
                      ? hot_review.scrap_count - 1
                      : hot_review.scrap_count + 1,
                  }
                  : hot_review,
              ),
            },
          },
        }),
      );
    },
    [homes],
  );

  const toggleNewsScrap = useCallback(
    (news_id, is_scraped) => {
      if (is_scraped) newsApi.cancelScrapNews(news_id);
      else newsApi.scrapNews(news_id);

      dispatch(
        homeActionCreator.setValue({
          homes: {
            ...homes,
            data: {
              ...homes.data,
              hot_news: homes.data.hot_news.map((news: any) =>
                news.id == news_id
                  ? {
                    ...news,
                    is_scraped: !news.is_scraped,
                  }
                  : news,
              ),
            },
          },
        }),
      );
    },
    [homes],
  );

  const toggleShopScrap = useCallback(
    (shop_id, is_scraped) => {
      if (is_scraped) shopApi.cancelScrapShop(shop_id);
      else shopApi.scrapShop(shop_id);
      dispatch(
        homeActionCreator.setValue({
          homes: {
            ...homes,
            data: {
              ...homes.data,
              hot_shops: homes.data.hot_shops.map((hot_shop: any) =>
                hot_shop.id == shop_id
                  ? {
                    ...hot_shop,
                    is_scraped: !hot_shop.is_scraped,
                    scrap_count: hot_shop.is_scraped
                      ? hot_shop.scrap_count - 1
                      : hot_shop.scrap_count + 1,
                  }
                  : hot_shop,
              ),
            },
          },
        }),
      );
    },
    [homes],
  );

  const renderReviewCard = useCallback(
    (review: any) => {
      return (
        <FeedCard
          key={review.id}
          feed_data={review}
          navigateToDetail={navigateToReviewDetail}
          toggleLike={toggleReviewLike}
          toggleScrap={toggleReviewScrap}
          numberOfLines={2}
          location={review?.shop?.location?.name}
          feed_type="review"
          profile_img_url={review?.owner?.profile_img_url}
          name={review?.owner?.nickname}
          shop_id={review?.shop?.id}
          owner_id={review?.owner?.id}
          comments_count={review?.comments_count}
          tags={[review.tag]}
        />
      );
    },
    [navigateToReviewDetail, toggleReviewLike, toggleReviewScrap],
  );

  const navigateToNewsUpdate = useCallback(
    (news_id: number) => navigation.navigate('newsUpdate', { news_id: news_id }),
    [],
  );

  const renderNewsCard = useCallback((news: any) => {
    return (
      <FeedCard
        key={news.id}
        feed_data={news}
        navigateToDetail={navigateToNewsDetail}
        toggleLike={toggleNewsLike}
        toggleScrap={toggleNewsScrap}
        location={news?.shop?.location?.name}
        feed_type="news"
        profile_img_url={news?.shop?.logo_img_url}
        name={news?.shop?.name}
        shop_id={news?.shop?.id}
        owner_id={news?.owner?.id}
        comments_count={news?.comments_count}
        tags={[news.tag]}
        navigateToUpdate={navigateToNewsUpdate}
      />
    );
  }, [navigateToNewsDetail, toggleNewsLike, toggleNewsScrap, navigateToNewsUpdate]);

  const bannerGoToLink = useCallback(
    (index: number) => {
      if (homes.data.banners[index].link) {
        Linking.openURL(homes.data.banners[index].link);
        return;
      }
      if (homes.data.banners[index].app_navigation_screen) {
        navigation.navigate(homes.data.banners[index].app_navigation_screen, {
          params: homes.data.banners[index].app_navigation_param,
        });
      }
    },
    [homes],
  );

  const popupGoToLink = useCallback(
    (popup: any) => {
      if (popup.external_link) {
        Linking.openURL(popup.external_link);
        return;
      }
      if (popup.deeplink_screen) {
        if (user.id) {
          navigation.navigate(popup.deeplink_screen, {
            params: popup.deeplink_params,
          });
        } else {
          loginAlert();
        }
      }
      noticeModalOpenWeekLater();
    },
    [user],
  );

  const navigateToShopDetail = useCallback(
    (shop_id: number) => navigation.navigate('shop_detail', { shop_id: shop_id }),
    [],
  );

  const renderShopCard = useCallback(
    (shop: any) => {
      return (
        <ShopCard
          key={shop.id}
          feed_data={shop}
          profile_img_url={shop?.logo_img_url}
          name={shop?.name}
          navigateToDetail={navigateToShopDetail}
          toggleScrap={toggleShopScrap}
          location={shop?.location?.name}
          shop_id={shop?.id}
          tags={shop.tags}
        />
      );
    },
    [navigateToShopDetail, toggleShopScrap],
  );
  console.log('useruseruseruseruseruser\n', user);
  return (
    <View style={styles.container}>
      <ImbeautyHeader />
      {is_empty_object(homes?.data) ? (
        <View style={[{ flex: 1 }, commonStyles.align_center]}>
          <Spinner color={ColorList.primary} />
        </View>
      ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {!is_empty_object(user) &&
              !is_empty_object(
                homes?.data?.popups
                  ?.slice()
                  .reverse()
                  .find((popup: any) => (popup.only_logged_in === true || popup.only_shop_user === true)),
              ) && (
                <HomeNoticeModal
                  user={user}
                  modalVisible={notice_modal?.open}
                  noticeModalOpen={noticeModalOpen}
                  noticeModalOpenWeekLater={noticeModalOpenWeekLater}
                  popup={user.is_shop_user ?
                    homes?.data?.popups
                    ?.slice()
                    .reverse()
                    .find((popup: any) =>  popup.only_shop_user === true)
                  :
                    homes?.data?.popups
                    ?.slice()
                    .reverse()
                    .find((popup: any) => popup.only_logged_in === true)
                  }
                  popupGoToLink={popupGoToLink}
                />
              )}
            {is_empty_object(user) &&
              !is_empty_object(
                homes?.data?.popups
                  ?.slice()
                  .reverse()
                  .find((popup: any) => (popup.only_logged_in === false && popup.only_shop_user === false)),
              ) && (
                <HomeNoticeModal
                  user={null}
                  modalVisible={notice_modal?.open}
                  noticeModalOpen={noticeModalOpen}
                  noticeModalOpenWeekLater={noticeModalOpenWeekLater}
                  popup={homes?.data?.popups
                    ?.slice()
                    .reverse()
                    .find((popup: any) => popup.only_logged_in === false)}
                  popupGoToLink={popupGoToLink}
                />
              )}
            <View>
              <SliderBox
                images={
                  homes?.data?.banners?.length > 0 ? homes.data.banners.map((i) => i.image_url) : []
                }
                onCurrentImagePressed={(index) => bannerGoToLink(index)}
                sliderBoxWidth={Dimensions.get('screen').width}
                sliderBoxHeight={Dimensions.get('screen').width * 0.6}
                autoplay
                circleLoop
                resizeMode={'contain'}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 15,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                }}
              />
            </View>

            <View style={styles.each_container}>
              <View style={styles.title_container}>
                <Text style={styles.title_container_font}>추천 이벤트</Text>
              </View>
              <View style={styles.wrapper}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  {homes?.data?.hot_events?.map((i: any) => renderHotEventCard(i))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.each_container}>
              <View style={styles.title_container}>
                <Text style={styles.title_container_font}>신규 이벤트</Text>
              </View>
              <View style={styles.wrapper}>
                {homes?.data?.new_events?.map((i: any) => renderNewEventCard(i))}
              </View>
            </View>

            <View style={{ width: '100%' }}>
              <View style={[styles.title_container, { paddingLeft: 10 }]}>
                <Text style={styles.title_container_font}>인기 샵소식</Text>
              </View>
              <View>{homes?.data?.hot_news?.map((i: any) => renderNewsCard(i))}</View>
            </View>

            <View style={{ width: '100%' }}>
              <View style={[styles.title_container, { paddingLeft: 10 }]}>
                <Text style={styles.title_container_font}>인기 후기</Text>
              </View>
              <View>{homes?.data?.hot_reviews?.map((i: any) => renderReviewCard(i))}</View>
            </View>

            <View style={{ width: '100%' }}>
              <View style={[styles.title_container, { paddingLeft: 10 }]}>
                <Text style={styles.title_container_font}>인기 샵</Text>
              </View>
              <View>{homes?.data?.hot_shops?.map((i: any) => renderShopCard(i))}</View>
            </View>
          </ScrollView>
        )}
    </View>
  );
}
export default React.memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorList.white,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  each_container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title_container: {
    width: '100%',
    paddingVertical: 10,
  },
  title_container_font: {
    fontSize: 15,
  },
});
