import React from 'react';
import {
  IconButton,
  ScreenContainer,
  SimpleStyleFlatList,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import FetchLoadingBlock from '../components/FetchLoadingBlock';
import MyFollowUserSectionBlock from '../components/MyFollowUserSectionBlock';
import NoDataBlock from '../components/NoDataBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const MineMyFansScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [follow_user, setFollow_user] = React.useState([]);
  const [follow_user_page, setFollow_user_page] = React.useState(0);
  const [is_loading, setIs_loading] = React.useState(false);
  const [refreshingFetchList, setRefreshingFetchList] = React.useState(false);
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <View>
        {/* 标题 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              height: 45,
              justifyContent: 'space-between',
              marginTop: safeAreaInsets.top,
              paddingBottom: 5,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 5,
              width: '100%',
              zIndex: 1000,
            },
            dimensions.width
          )}
        >
          {/* 返回Btn */}
          <IconButton
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
            color={palettes.App.appStyle_black}
            icon={'AntDesign/left'}
            size={22}
          />
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                paddingLeft: 4,
                paddingRight: 4,
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Title */}
            <Text
              accessible={true}
              selectable={false}
              adjustsFontSizeToFit={true}
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: palettes.App.appStyle_black,
                  flexShrink: 1,
                  fontFamily: 'System',
                  fontSize: 18,
                  fontWeight: '600',
                  letterSpacing: 0.2,
                  lineHeight: 28,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {t(Variables, 'mine_my_fans')}
            </Text>
          </View>
        </View>
      </View>

      <AceCampTestApi.FetchSnsFollowingUsersGET
        handlers={{
          on401: fetchData => {
            try {
              console.log(fetchData?.statusText);
            } catch (err) {
              console.error(err);
            }
          },
          on4xx: fetchData => {
            try {
              console.log('error');
            } catch (err) {
              console.error(err);
            }
          },
          onData: fetchData => {
            try {
              /* hidden 'Log to Console' action */
              setFollow_user(fetchData?.data);
              setFollow_user_page(2);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        page={1}
        per_page={20}
        retry={1}
      >
        {({ loading, error, data, refetchSnsFollowingUsers }) => {
          const fetchData = data?.json;
          if (loading) {
            return <FetchLoadingBlock />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return (
              <>
                {/* No-Data 2 */}
                <NoDataBlock />
              </>
            );
          }

          return (
            <>
              <SimpleStyleFlatList
                data={follow_user}
                decelerationRate={'normal'}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ??
                  listData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(listData)
                }
                keyboardShouldPersistTaps={'never'}
                listKey={'Fetch->List'}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReached={() => {
                  const handler = async () => {
                    try {
                      if (is_loading) {
                        return;
                      }
                      if (fetchData?.meta?.total <= follow_user?.length) {
                        return;
                      }
                      setIs_loading(true);
                      const result = (
                        await AceCampTestApi.snsFollowingUsersGET(Constants, {
                          page: follow_user_page,
                          per_page: 20,
                        })
                      )?.json;
                      setFollow_user(follow_user.concat(result?.data));
                      setFollow_user_page(follow_user_page + 1);
                      setIs_loading(false);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                onEndReachedThreshold={0.5}
                pagingEnabled={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshingFetchList}
                    onRefresh={() => {
                      const handler = async () => {
                        try {
                          setRefreshingFetchList(true);
                          await refetchSnsFollowingUsers();
                          setRefreshingFetchList(false);
                        } catch (err) {
                          console.error(err);
                          setRefreshingFetchList(false);
                        }
                      };
                      handler();
                    }}
                  />
                }
                renderItem={({ item, index }) => {
                  const listData = item;
                  return <MyFollowUserSectionBlock item={listData} />;
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                snapToAlignment={'start'}
              />
              <>
                {!(
                  fetchData?.code !== 200 || fetchData?.data?.length === 0
                ) ? null : (
                  <NoDataBlock />
                )}
              </>
            </>
          );
        }}
      </AceCampTestApi.FetchSnsFollowingUsersGET>
    </ScreenContainer>
  );
};

export default withTheme(MineMyFansScreen);
