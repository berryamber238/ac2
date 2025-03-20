import React from 'react';
import {
  Divider,
  Icon,
  IconButton,
  SVG,
  ScreenContainer,
  Shadow,
  SimpleStyleFlashList,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as TestApi from '../apis/TestApi.js';
import EmptyViewBlock from '../components/EmptyViewBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as gf from '../custom-files/gf';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import getNoteStatus from '../global-functions/getNoteStatus';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const MessageCenterScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [refreshingFetchScrollView, setRefreshingFetchScrollView] =
    React.useState(false);
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestIgnoreAllPOST = AceCampTestApi.useIgnoreAllPOST();
  const aceCampTestReadMessagePUT = AceCampTestApi.useReadMessagePUT();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <AceCampTestApi.FetchUserNotificationsGET page={1} per_page={15}>
        {({ loading, error, data, refetchUserNotifications }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              {/* 标题 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: 'rgb(240, 241, 247)',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: safeAreaInsets.top,
                    paddingBottom: 12,
                    paddingLeft: 14,
                    paddingRight: 14,
                    paddingTop: 5,
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
                  color={palettes.Brand.appStyle_primary}
                  icon={'AntDesign/left'}
                  size={24}
                />
                {/* Title */}
                <Text
                  accessible={true}
                  selectable={false}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: palettes.Brand.appStyle_primary,
                      flex: 1,
                      fontFamily: 'System',
                      fontSize: 18,
                      fontWeight: '600',
                      letterSpacing: 0.2,
                      lineHeight: 32,
                      marginLeft: 10,
                      marginRight: 10,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'event_message_center')}
                </Text>

                <View
                  style={StyleSheet.applyWidth(
                    { position: 'absolute', right: 14, top: 7 },
                    dimensions.width
                  )}
                >
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          const result = (
                            await aceCampTestIgnoreAllPOST.mutateAsync()
                          )?.json;
                          await refetchUserNotifications();
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: 'rgb(237, 245, 254)',
                          borderRadius: 16,
                          paddingBottom: 4,
                          paddingLeft: 14,
                          paddingRight: 14,
                          paddingTop: 4,
                        },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand.appStyle_primary,
                            fontFamily: 'System',
                            fontSize: 13,
                            fontWeight: '600',
                            letterSpacing: 0.2,
                            lineHeight: 20,
                          },
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'event_all_read')}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              </View>
              <>
                {fetchData?.data?.length === 0 ? null : (
                  <SimpleStyleScrollView
                    bounces={true}
                    horizontal={false}
                    keyboardShouldPersistTaps={'never'}
                    nestedScrollEnabled={false}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshingFetchScrollView}
                        onRefresh={() => {
                          const handler = async () => {
                            try {
                              setRefreshingFetchScrollView(true);
                              await refetchUserNotifications();
                              setRefreshingFetchScrollView(false);
                            } catch (err) {
                              console.error(err);
                              setRefreshingFetchScrollView(false);
                            }
                          };
                          handler();
                        }}
                      />
                    }
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={StyleSheet.applyWidth(
                      { height: '100%', width: '100%' },
                      dimensions.width
                    )}
                  >
                    <SimpleStyleFlashList
                      data={fetchData?.data}
                      estimatedItemSize={50}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(flashListData, index) => flashListData?.id}
                      listKey={'Fetch->Scroll View->FlashList'}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const flashListData = item;
                        return (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'column',
                                width: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: '100%',
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: dimensions.width,
                                  },
                                ],
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              selectable={false}
                              {...GlobalStyles.TextStyles(theme)['Text Title']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text Title']
                                    .style,
                                  {
                                    color: 'rgb(161, 169, 177)',
                                    fontFamily: 'System',
                                    fontSize: 13,
                                    fontWeight: '400',
                                    lineHeight: 20,
                                    marginBottom: 10,
                                    marginRight: null,
                                    marginTop: 10,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {fromUnixTimestamp(
                                Variables,
                                flashListData?.created_at,
                                'YYYY/MM/DD HH:mm'
                              )}
                            </Text>

                            <Shadow
                              offsetX={0}
                              offsetY={0}
                              paintInside={true}
                              showShadowCornerBottomEnd={true}
                              showShadowCornerBottomStart={true}
                              showShadowCornerTopEnd={true}
                              showShadowCornerTopStart={true}
                              showShadowSideBottom={true}
                              showShadowSideEnd={true}
                              showShadowSideStart={true}
                              showShadowSideTop={true}
                              distance={10}
                              startColor={palettes.Gray[100]}
                              style={StyleSheet.applyWidth(
                                { width: '100%' },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor:
                                      palettes.App['Custom #ffffff'],
                                    borderRadius: 8,
                                    width: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '100%',
                                      },
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: dimensions.width - 32,
                                      },
                                    ],
                                  },
                                  dimensions.width
                                )}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      padding: 8,
                                      paddingLeft: 10,
                                      position: 'relative',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        backgroundColor: 'rgb(242, 246, 249)',
                                        borderRadius: 16,
                                        padding: 6,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <Icon
                                      color={
                                        (flashListData?.has_read
                                          ? palettes.Zinc[400]
                                          : palettes.App['Custom Color 42']) ??
                                        palettes.App['Custom Color 42']
                                      }
                                      name={'Ionicons/calendar-clear-sharp'}
                                      size={18}
                                    />
                                  </View>

                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        fontFamily: 'System',
                                        fontSize: 16,
                                        fontWeight: '600',
                                        letterSpacing: 0.2,
                                        lineHeight: 24,
                                        marginLeft: 10,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {flashListData?.notification?.title}
                                  </Text>
                                </View>
                                <Divider
                                  {...GlobalStyles.DividerStyles(theme)[
                                    'Divider'
                                  ].props}
                                  color={palettes.Gray[300]}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.DividerStyles(theme)[
                                        'Divider'
                                      ].style,
                                      { height: 1 }
                                    ),
                                    dimensions.width
                                  )}
                                />
                                <Touchable
                                  onPress={() => {
                                    const handler = async () => {
                                      try {
                                        const result = (
                                          await aceCampTestReadMessagePUT.mutateAsync(
                                            { id: flashListData?.id }
                                          )
                                        )?.json;
                                        if (
                                          flashListData?.notification
                                            ?.content_html_array?.[0]
                                            ?.redirect_link_type ===
                                          'eventDetail'
                                        ) {
                                          navigation.push('EventDetailScreen', {
                                            event_id:
                                              flashListData?.notification
                                                ?.content_html_array?.[0]
                                                ?.redirect_link_params
                                                ?.event_id,
                                          });
                                        } else {
                                          navigation.push(
                                            'BottomTabNavigator',
                                            {
                                              screen: 'Mine',
                                              params: {
                                                screen: 'MineUserInfoScreen',
                                              },
                                            }
                                          );
                                        }
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    };
                                    handler();
                                  }}
                                >
                                  {/* View 3 */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { flexDirection: 'row' },
                                      dimensions.width
                                    )}
                                  >
                                    {/* View 2 */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          flexDirection: 'column',
                                          padding: 10,
                                          width: '92%',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Utils.CustomCodeErrorBoundary>
                                        <gf.RenderHtml
                                          source={{
                                            html: `${flashListData?.notification?.content_html_array[0].rich_content}`,
                                          }}
                                          contentWidth={20}
                                        />
                                      </Utils.CustomCodeErrorBoundary>
                                    </View>

                                    <View
                                      style={StyleSheet.applyWidth(
                                        { flex: 1, justifyContent: 'center' },
                                        dimensions.width
                                      )}
                                    >
                                      <Icon
                                        size={24}
                                        color={palettes.App['Custom Color 44']}
                                        name={'AntDesign/right'}
                                      />
                                    </View>
                                  </View>
                                </Touchable>
                              </View>
                            </Shadow>
                          </View>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  </SimpleStyleScrollView>
                )}
              </>
              <>
                {!(fetchData?.data?.length === 0) ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        height: '100%',
                        justifyContent: 'center',
                        marginTop: -100,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    <SVG
                      {...GlobalStyles.SVGStyles(theme)['SVG'].props}
                      source={'https://static.acecamptech.com/system/empty.svg'}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.SVGStyles(theme)['SVG'].style,
                        dimensions.width
                      )}
                    />
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.TextStyles(theme)['Text Title'].style,
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'common_no_content')}
                    </Text>
                  </View>
                )}
              </>
            </>
          );
        }}
      </AceCampTestApi.FetchUserNotificationsGET>
      <>
        {getNoteStatus(Variables) === 0 ? null : (
          <EmptyViewBlock type={getNoteStatus(Variables)} />
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(MessageCenterScreen);
