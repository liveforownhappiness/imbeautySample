import { CardItem } from 'native-base';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import ColorList from '../../Assets/js/ColorList';
import FloatingScrap from '../../Component/Molecules/FloatingScrap';
import { calculatePercentage } from '../../Util/calculatePercentage';
import EventTags from '../EventScreen/EventTags';

const HomeEventCard: React.FC = ({
  card_data,
  navigateToDetail,
  main_image_url,
  toggleScrap,
  location,
  title,
  tags,
  origin_price,
  discounted_price,
}: any) => {
  return (
    <CardItem key={card_data.id} style={styles.container}>
      <TouchableOpacity onPress={() =>  navigateToDetail(card_data.id)}>
        <Image
          source={{
            uri: main_image_url,
          }}
          style={styles.image}
        />
        <View style={styles.wrapper}>
          <Text style={styles.shop_name}>{title}</Text>
          <Text style={styles.shop_loc}>
            {location}
          </Text>
          <View style={styles.content_wrapper}>
            {
              discounted_price !== null ?
                <>
                  <Text style={styles.discount_percentage}>
                    {calculatePercentage(origin_price, discounted_price)}%
                </Text>
                  <Entypo name='arrow-bold-down' size={15} color={ColorList.price_color} />
                  <Text style={styles.discount} numberOfLines={1}>
                    {discounted_price}만원
                  </Text>
                  <Text style={styles.before_discount} numberOfLines={1}>
                    {origin_price}만원
                  </Text>
                </>
                : origin_price !== null &&
                <Text style={styles.discount} numberOfLines={1}>{origin_price}만원</Text>
            }
          </View>
          <EventTags tags={tags} />
        </View>
      </TouchableOpacity>
      <FloatingScrap
        event_id={card_data.id}
        is_scraped={card_data.is_scraped}
        toggleScrap={toggleScrap}
        style={styles.floating_btn_style}
      />
    </CardItem>
  );
};
export default React.memo(HomeEventCard);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.3,
    justifyContent: 'center',
    marginRight: 20,
    alignItems: 'flex-start',
    overflow: 'hidden'
  },
  wrapper: {
    width: Dimensions.get('window').width * 0.3,
  },
  image: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    borderRadius: 10
  },
  shop_name: {
    paddingTop: 2,
    fontSize: 13,
  },
  content_wrapper: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
  },
  discount: {
    color: ColorList.black1,
    fontSize: 10,
  },
  discount_des: {
    color: ColorList.black1,
    paddingRight: 8,
    fontSize: 10,
  },
  tags: {
    fontSize: 10,
    color: ColorList.red3,
  },
  shop_loc: {
    fontSize: 10,
  },
  floating_btn_style: {
    top: '10%',
    right: 1,
  },
  discount_percentage: {
    color: ColorList.price_color,
    fontSize: 10
  },
  before_discount: {
    fontSize: 10,
    textDecorationLine: 'line-through',
    textDecorationColor: ColorList.price_color,
    color: ColorList.gray2
  }
});
