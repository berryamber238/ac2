// This import is required if you are defining react components in this module.
import React from 'react';

import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlashList,
  Text,
} from 'react-native';

export const RefreshView = props => {
  const {
    children,
    listData,
    setListData,
    api,
    isLoading,
    setIsLoading,
    page,
    setPage,
    Constants,
  } = props;
  const [refreshing, setRefreshing] = React.useState(false);
  //  const [listData, setListData] = React.useState(listData);
  //  const [listData, setListData] = React.useState(isLoading);
  //  isLoading
  const tmpSV = React.useRef();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const onScrollEnd = async event => {
    console.log('end drag');
    try {
      const bottomPosition =
        event?.nativeEvent?.contentSize?.height -
        event?.nativeEvent?.layoutMeasurement?.height -
        50;
      if (event?.nativeEvent?.contentOffset?.y > bottomPosition) {
        if (event?.nativeEvent?.contentOffset?.y > bottomPosition + 40) {
          setIsLoading(true);

          const result = (await api.regionsGET(Constants, { page: page }))
            ?.json;
          setListData(listData.concat(result?.data));
          if (result.data.length > 0) {
            setPage(page + 1);
          } else {
            tmpSV.current.scrollTo({
              x: 0,
              y: bottomPosition,
              animated: true,
            });
          }
          setIsLoading(false);
        } else {
          tmpSV.current.scrollTo({
            x: 0,
            y: bottomPosition,
            animated: true,
          });
        }
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ScrollView
      bounces={true}
      horizontal={false}
      keyboardShouldPersistTaps={'never'}
      nestedScrollEnabled={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScrollEndDrag={onScrollEnd}
      onMomentumScrollEnd={onScrollEnd}
      showsHorizontalScrollIndicator={true}
      showsVerticalScrollIndicator={true}
      ref={tmpSV}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
