import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import ColorList from '../../Assets/js/ColorList';
import { is_empty_object } from '../../Util/utilities';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

const HomeNoticeModal = ({
  modalVisible,
  noticeModalOpen,
  noticeModalOpenWeekLater,
  popup,
  popupGoToLink,
}: any) => {
  const [popup_image_height, setPopupImageHeight] = useState(0);
  const getImageHeight = useCallback((uri) => {
    Image.getSize(uri, (width, height) => {
      setPopupImageHeight((deviceWidth * 0.9 * height) / width);
    });
  }, []);
  useEffect(() => {
    getImageHeight(popup.image_url);
  }, [popup]);

  return (
    <Modal isVisible={modalVisible} deviceWidth={deviceWidth} deviceHeight={deviceHeight}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => popupGoToLink(popup)}
          style={[styles.image_wrapper, { height: popup_image_height }]}>
          <Image resizeMode={'contain'} source={{ uri: popup.image_url }} style={styles.image} />
        </TouchableOpacity>
        {!is_empty_object(popup.content) ? (
          <View style={styles.content}>
            <Text style={{ fontSize: 15 }}>{popup.content}</Text>
          </View>
        ) : null}
        <View style={styles.button_wrapper}>
          <TouchableOpacity style={styles.button} onPress={() => noticeModalOpenWeekLater()}>
            <Text style={styles.button_aweeklater_text_color}>일주일 뒤에 다시보기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => noticeModalOpen()}>
            <Text style={styles.button_aweeklater_text_color}>다시 표시하지 않기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(HomeNoticeModal);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: ColorList.white,
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    padding: 15,
    justifyContent: 'center',
  },
  image_wrapper: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button_wrapper: {
    width: '100%',
    flexDirection: 'row',
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  button_aweeklater_text_color: {
    color: ColorList.button_title_active,
  },
});
