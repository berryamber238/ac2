import React from 'react';
import {
  Divider,
  Icon,
  ScreenContainer,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import getNameById from '../global-functions/getNameById';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const MineIndexScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [darkModeSwitch, setDarkModeSwitch] = React.useState(false);
  const [sns_data, setSns_data] = React.useState({
    topic_count: 0,
    opinion_count: 0,
    favorite_count: 1,
    follower_count: 0,
    following_count: 5,
  });
  React.useEffect(() => {
    try {
      console.log(Constants['user_info']?.has_vip, 'has_vip');
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.Brand.appStyle_background },
        dimensions.width
      )}
    >
      <SimpleStyleScrollView
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        bounces={false}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content */}
        <View>
          {/* Page Scroll */}
          <SimpleStyleScrollView
            bounces={true}
            horizontal={false}
            keyboardShouldPersistTaps={'never'}
            nestedScrollEnabled={false}
            onScroll={event => {
              try {
                /* 'Run a Custom Function' action requires configuration: choose a custom function */
              } catch (err) {
                console.error(err);
              }
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={StyleSheet.applyWidth(
              { paddingBottom: 40 },
              dimensions.width
            )}
          >
            </* Profile Fetch component: no endpoint configured */>
              {(profileFetchData => (
                <View>
                  <ImageBackground
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageBackgroundStyles(theme)[
                      'Image Background'
                    ].props}
                    source={imageSource(
                      Constants['user_info']?.has_vip
                        ? Images['icheaderbgvip']
                        : Images['icheaderbgdefault']
                    )}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageBackgroundStyles(theme)[
                          'Image Background'
                        ].style,
                        {
                          height: '100%',
                          left: 0,
                          position: 'absolute',
                          top: 0,
                          width: '100%',
                        }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* Profile Top View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        marginTop: 50,
                        paddingLeft: 16,
                        paddingRight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Page Top with Logo */}
                    <View
                      {...GlobalStyles.ViewStyles(theme)['Page Top 7'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ViewStyles(theme)['Page Top 7'].style,
                          {
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            height: 30,
                            justifyContent: 'flex-end',
                            opacity: 1,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {/* More Button View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: 40,
                            justifyContent: 'space-between',
                            paddingBottom: 12,
                            paddingLeft: 12,
                            paddingRight: 12,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            dimensions.width
                          )}
                        >
                          {' '}
                        </Text>
                        {/* More Button Touchable */}
                        <Touchable
                          onPress={() => {
                            try {
                              navigation.navigate('BottomTabNavigator', {
                                screen: 'Mine',
                                params: { screen: 'MineSettingsScreen' },
                              });
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <Icon
                            color={
                              Constants['user_info']?.has_vip
                                ? palettes.App['Custom #ffffff']
                                : undefined
                            }
                            name={'Ionicons/settings-outline'}
                            size={24}
                          />
                        </Touchable>
                      </View>
                    </View>
                    {/* Profile Header View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: 'rgba(0, 0, 0, 0)',
                          flexDirection: 'row',
                          height: 59,
                          justifyContent: 'space-between',
                        },
                        dimensions.width
                      )}
                    >
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.navigate('BottomTabNavigator', {
                              screen: 'Mine',
                              params: { screen: 'MineIdentityInfoScreen' },
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'center', flexDirection: 'row' },
                            dimensions.width
                          )}
                        >
                          {/* Img Header */}
                          <>
                            {!(
                              Constants['is_login'] &&
                              Constants['user_info']?.avatar
                            ) ? null : (
                              <Image
                                {...GlobalStyles.ImageStyles(theme)['Image']
                                  .props}
                                resizeMode={'cover'}
                                source={imageSource(
                                  `${Constants['user_info']?.avatar}`
                                )}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ImageStyles(theme)['Image']
                                      .style,
                                    { height: 59, width: 59 }
                                  ),
                                  dimensions.width
                                )}
                              />
                            )}
                          </>
                          {/* Img Header 2 */}
                          <Image
                            {...GlobalStyles.ImageStyles(theme)['Image'].props}
                            resizeMode={'cover'}
                            source={
                              imageSource(Images['icheadercompany']) ??
                              imageSource('')
                            }
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ImageStyles(theme)['Image'].style,
                                { height: 59, width: 59 }
                              ),
                              dimensions.width
                            )}
                          />
                          <View>
                            {/* Header Name Title View */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flex: 1,
                                  justifyContent: 'center',
                                  marginLeft: 16,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Header Middle View */}
                              <>
                                {!Constants['is_login'] ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Header Vip Image */}
                                    <>
                                      {!Constants['user_info']
                                        ?.has_vip ? null : (
                                        <Image
                                          resizeMode={'cover'}
                                          {...GlobalStyles.ImageStyles(theme)[
                                            'Image'
                                          ].props}
                                          source={imageSource(Images['icvip'])}
                                          style={StyleSheet.applyWidth(
                                            StyleSheet.compose(
                                              GlobalStyles.ImageStyles(theme)[
                                                'Image'
                                              ].style,
                                              {
                                                height: 24,
                                                right: 6,
                                                width: 24,
                                              }
                                            ),
                                            dimensions.width
                                          )}
                                        />
                                      )}
                                    </>
                                    {/* Header Name Text */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      ellipsizeMode={'tail'}
                                      numberOfLines={1}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            color: Constants['user_info']
                                              ?.has_vip
                                              ? '#ffd6a6'
                                              : undefined,
                                            fontSize: 22,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {Constants['user_info']?.name}
                                    </Text>
                                  </View>
                                )}
                              </>
                              {/* Header Title View */}
                              <>
                                {!Constants['is_login'] ? null : (
                                  <View>
                                    {/* Header Title Text */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value: palettes.Gray[400],
                                            },
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value: Constants['user_info']
                                                ?.has_vip
                                                ? palettes.App['Custom #ffffff']
                                                : undefined,
                                            },
                                          ],
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {getNameById(
                                        Variables,
                                        9,
                                        Constants['user_info']
                                          ?.organization_user.organization
                                          .organization_type_id
                                      )}
                                    </Text>
                                  </View>
                                )}
                              </>
                              <>
                                {Constants['is_login'] ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignSelf: 'flex-start',
                                        flex: 1,
                                        justifyContent: 'center',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <Touchable
                                      onPress={() => {
                                        try {
                                          navigation.push(
                                            'BottomTabNavigator',
                                            {
                                              screen: 'Tickets',
                                              params: { screen: 'LoginScreen' },
                                            }
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                    >
                                      <View
                                        style={StyleSheet.applyWidth(
                                          { justifyContent: 'center' },
                                          dimensions.width
                                        )}
                                      >
                                        <Text
                                          accessible={true}
                                          selectable={false}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color:
                                                palettes.Brand.itemTextNomal,
                                              fontFamily: 'System',
                                              fontSize: 22,
                                              fontWeight: '700',
                                              letterSpacing: 0.2,
                                              lineHeight: 30,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {t(Variables, 'mine_click_login')}
                                        </Text>
                                      </View>
                                    </Touchable>
                                  </View>
                                )}
                              </>
                            </View>
                          </View>
                        </View>
                      </Touchable>
                      {/* Header ProfileUrl View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginLeft: 4,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Header ProfileUrl Text */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                color: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: palettes.Gray[400],
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: Constants['user_info']?.has_vip
                                      ? '#f6f7f8'
                                      : undefined,
                                  },
                                ],
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'个人主页'}
                        </Text>
                        {/* Header ProfileUrl Next Image */}
                        <Image
                          resizeMode={'cover'}
                          {...GlobalStyles.ImageStyles(theme)['Image'].props}
                          source={imageSource(Images['icminenext'])}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ImageStyles(theme)['Image'].style,
                              { height: 14, marginLeft: 4, width: 10 }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    </View>

                    <AceCampTestApi.FetchSnsUserInfoGET
                      handlers={{
                        on401: fetchData => {
                          try {
                            setGlobalVariableValue({
                              key: 'is_login',
                              value: false,
                            });
                            setSns_data({
                              topic_count: 0,
                              opinion_count: 0,
                              favorite_count: 0,
                              follower_count: 0,
                              following_count: 0,
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        },
                        onData: fetchData => {
                          try {
                            setSns_data(fetchData?.data?.stats);
                          } catch (err) {
                            console.error(err);
                          }
                        },
                      }}
                      user_id={Constants['user_info']?.id}
                    >
                      {({ loading, error, data, refetchSnsUserInfo }) => {
                        const fetchData = data?.json;
                        if (loading) {
                          return <ActivityIndicator />;
                        }

                        if (
                          error ||
                          data?.status < 200 ||
                          data?.status >= 300
                        ) {
                          return <View />;
                        }

                        return null;
                      }}
                    </AceCampTestApi.FetchSnsUserInfoGET>
                    {/* Profile Point View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: 'rgba(0, 0, 0, 0)',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginBottom: 24,
                          marginTop: 24,
                        },
                        dimensions.width
                      )}
                    >
                      <Touchable
                        onPress={() => {
                          try {
                            if (!Constants['is_login']) {
                              return;
                            }
                            navigation.push('MineMyPointScreen');
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {/* Point Section View */}
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'center' },
                            dimensions.width
                          )}
                        >
                          {/* Count Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: Constants['user_info']?.has_vip
                                    ? '#ffd6a6'
                                    : undefined,
                                  fontSize: 16,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {sns_data?.opinion_count}
                          </Text>
                          {/* Title Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'rgb(69, 69, 69)',
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: Constants['user_info']?.has_vip
                                        ? '#f6f7f899'
                                        : undefined,
                                    },
                                  ],
                                  fontSize: 13,
                                  marginTop: 4,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'观点'}
                          </Text>
                        </View>
                      </Touchable>
                      {/* Touchable 2 */}
                      <Touchable
                        onPress={() => {
                          try {
                            /* hidden 'Conditional Stop' action */
                            navigation.push('MineMyTopicScreen');
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {/* Discussion Section View */}
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'center' },
                            dimensions.width
                          )}
                        >
                          {/* Count Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: Constants['user_info']?.has_vip
                                    ? '#ffd6a6'
                                    : undefined,
                                  fontSize: 16,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {sns_data?.topic_count}
                          </Text>
                          {/* Title Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'rgb(69, 69, 69)',
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: Constants['user_info']?.has_vip
                                        ? '#f6f7f899'
                                        : undefined,
                                    },
                                  ],
                                  fontSize: 13,
                                  marginTop: 4,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'讨论'}
                          </Text>
                        </View>
                      </Touchable>
                      {/* Touchable 3 */}
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.push('MineMyFollowScreen');
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {/* Follow Section View */}
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'center' },
                            dimensions.width
                          )}
                        >
                          {/* Count Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: Constants['user_info']?.has_vip
                                    ? '#ffd6a6'
                                    : undefined,
                                  fontSize: 16,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {sns_data?.following_count}
                          </Text>
                          {/* Title Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'rgb(69, 69, 69)',
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: Constants['user_info']?.has_vip
                                        ? '#f6f7f899'
                                        : undefined,
                                    },
                                  ],
                                  fontSize: 13,
                                  marginTop: 4,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'关注'}
                          </Text>
                        </View>
                      </Touchable>
                      {/* Touchable 5 */}
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.push('MineMyFansScreen');
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {/* Fans Section View */}
                        <View
                          style={StyleSheet.applyWidth(
                            { alignItems: 'center' },
                            dimensions.width
                          )}
                        >
                          {/* Count Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: Constants['user_info']?.has_vip
                                    ? '#ffd6a6'
                                    : undefined,
                                  fontSize: 16,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {sns_data?.follower_count}
                          </Text>
                          {/* Title Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: [
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: 'rgb(69, 69, 69)',
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: Constants['user_info']?.has_vip
                                        ? '#f6f7f899'
                                        : undefined,
                                    },
                                  ],
                                  fontSize: 13,
                                  marginTop: 4,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'粉丝'}
                          </Text>
                        </View>
                      </Touchable>
                    </View>

                    <Touchable
                      onPress={() => {
                        try {
                          if (Constants['user_info']?.has_vip) {
                            navigation.push('VipInfoScreen');
                          } else {
                            navigation.push('WebViewScreen', {
                              url: Constants['base_url'] + '/vip_turn',
                            });
                          }
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      {/* Profile VIP Section View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            borderRadius: 10,
                            height: 46,
                            overflow: 'hidden',
                          },
                          dimensions.width
                        )}
                      >
                        <ImageBackground
                          {...GlobalStyles.ImageBackgroundStyles(theme)[
                            'Image Background'
                          ].props}
                          resizeMode={'stretch'}
                          source={imageSource(Images['icvipbg'])}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ImageBackgroundStyles(theme)[
                                'Image Background'
                              ].style,
                              {
                                bottom: 0,
                                height: 56,
                                left: 0,
                                position: 'absolute',
                                top: 0,
                                width: '100%',
                                zIndex: 0,
                              }
                            ),
                            dimensions.width
                          )}
                        />
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor: 'rgba(0, 0, 0, 0)',
                              flexDirection: 'row',
                              height: '100%',
                              justifyContent: 'space-between',
                              opacity: 1,
                              paddingLeft: 12,
                              paddingRight: 12,
                              width: '100%',
                            },
                            dimensions.width
                          )}
                        >
                          {/* Crown Image */}
                          <Image
                            resizeMode={'cover'}
                            {...GlobalStyles.ImageStyles(theme)['Image'].props}
                            source={imageSource(Images['icvip'])}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ImageStyles(theme)['Image'].style,
                                { height: 22, width: 22, zIndex: 5 }
                              ),
                              dimensions.width
                            )}
                          />
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                justifyContent: 'center',
                                marginLeft: 12,
                                width: '70%',
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              selectable={false}
                              {...GlobalStyles.TextStyles(theme)['Text'].props}
                              style={StyleSheet.applyWidth(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                dimensions.width
                              )}
                            >
                              {Constants['user_info']?.has_vip
                                ? Constants['user_info']?.vip_infos[0].title
                                : t(Variables, 'live_open_vip')}
                            </Text>
                          </View>
                          {/* Go Image */}
                          <Image
                            resizeMode={'cover'}
                            {...GlobalStyles.ImageStyles(theme)['Image'].props}
                            source={imageSource(Images['icvipnext'])}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ImageStyles(theme)['Image'].style,
                                { height: 22, width: 22 }
                              ),
                              dimensions.width
                            )}
                          />
                        </View>
                      </View>
                    </Touchable>
                  </View>
                  {/* Banner Radius View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.App.appStyle_white,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        height: 16,
                        marginTop: 16,
                        overflow: 'hidden',
                      },
                      dimensions.width
                    )}
                  />
                </View>
              ))()}
            </>
            <Touchable
              onPress={() => {
                try {
                  navigation.push('WebViewScreen', {
                    url: Constants['base_url'] + '/invite_users',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* Operation List Banner View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    overflow: 'hidden',
                    paddingBottom: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                  dimensions.width
                )}
              >
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['icactiveinvite'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      {
                        borderRadius: 8,
                        height: 60,
                        overflow: 'hidden',
                        width: '100%',
                      }
                    ),
                    dimensions.width
                  )}
                />
              </View>
            </Touchable>
            {/* Split View */}
            <View
              style={StyleSheet.applyWidth(
                { backgroundColor: 'rgb(250, 250, 250)', height: 5 },
                dimensions.width
              )}
            />
            {/* My Events Section View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  paddingBottom: 10,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 10,
                },
                dimensions.width
              )}
            >
              {/* Title View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 4,
                    paddingTop: 4,
                  },
                  dimensions.width
                )}
              >
                {/* Title Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                      { fontSize: 14 }
                    ),
                    dimensions.width
                  )}
                >
                  {'我报名的活动'}
                </Text>

                <Touchable
                  onPress={() => {
                    try {
                      navigation.push('WebViewScreen', {
                        url:
                          Constants['base_url'] +
                          '/personalCenter/enteredEvent',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  {/* Button view */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* Button Text */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text 2111'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text 2111'].style,
                          {
                            color: 'rgb(156, 169, 181)',
                            fontSize: 12,
                            marginRight: 4,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'查看全部'}
                    </Text>
                    {/* Go Next Iamge */}
                    <Image
                      resizeMode={'cover'}
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      source={imageSource(Images['icminenext'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { height: 14, width: 10 }
                        ),
                        dimensions.width
                      )}
                    />
                  </View>
                </Touchable>
              </View>
              {/* Buttons List View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    gap: 12,
                    justifyContent: 'space-around',
                    paddingLeft: 6,
                    paddingRight: 6,
                  },
                  dimensions.width
                )}
              >
                <Touchable
                  onPress={() => {
                    try {
                      navigation.push('WebViewScreen', {
                        url:
                          Constants['base_url'] +
                          '/personalCenter/enteredEvent?state=planned',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { width: '28%' },
                    dimensions.width
                  )}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'column' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: 'rgba(196, 196, 196, 0.2)',
                          borderRadius: 8,
                          height: 59,
                          justifyContent: 'center',
                          overflow: 'hidden',
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(Images['icmineregistering'])}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                      />
                    </View>

                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: 'rgb(89, 106, 122)',
                          fontSize: 12,
                          paddingTop: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'报名中'}
                    </Text>
                  </View>
                </Touchable>
                {/* Touchable 3 */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.push('WebViewScreen', {
                        url:
                          Constants['base_url'] +
                          '/personalCenter/enteredEvent?state=ongoing',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { width: '28%' },
                    dimensions.width
                  )}
                >
                  {/* View 3 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'column' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: 'rgba(196, 196, 196, 0.2)',
                          borderRadius: 8,
                          height: 59,
                          justifyContent: 'center',
                          overflow: 'hidden',
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(Images['icmineeventing'])}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                      />
                    </View>

                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: 'rgb(89, 106, 122)',
                          fontSize: 12,
                          paddingTop: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'进行中'}
                    </Text>
                  </View>
                </Touchable>
                {/* Touchable 2 */}
                <Touchable
                  onPress={() => {
                    try {
                      navigation.push('WebViewScreen', {
                        url:
                          Constants['base_url'] +
                          '/personalCenter/enteredEvent?state=finished',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { width: '28%' },
                    dimensions.width
                  )}
                >
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', flexDirection: 'column' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: 'rgba(196, 196, 196, 0.2)',
                          borderRadius: 8,
                          height: 59,
                          justifyContent: 'center',
                          overflow: 'hidden',
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(Images['icmineeventpass'])}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 30, width: 30 }
                          ),
                          dimensions.width
                        )}
                      />
                    </View>

                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: 'rgb(89, 106, 122)',
                          fontSize: 12,
                          paddingTop: 8,
                        },
                        dimensions.width
                      )}
                    >
                      {'已结束'}
                    </Text>
                  </View>
                </Touchable>
              </View>
            </View>
            {/* A Coins Touchable */}
            <Touchable
              onPress={() => {
                try {
                  navigation.push('WebViewScreen', {
                    url: Constants['base_url'] + '/personalCenter/virtualCoin',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { marginBottom: 24 },
                dimensions.width
              )}
            >
              {/* Message Center Item */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Setting Icon View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 28,
                      justifyContent: 'center',
                      marginRight: 20,
                      width: 28,
                    },
                    dimensions.width
                  )}
                >
                  <Icon name={'FontAwesome/money'} size={24} />
                </View>
                {/* Setting Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                      { fontSize: 16, marginRight: 20 }
                    ),
                    dimensions.width
                  )}
                >
                  {'A 币'}
                </Text>
                {/* Settings Arrow View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 20,
                      justifyContent: 'center',
                      width: 20,
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    {...GlobalStyles.IconStyles(theme)['Arrow Right'].props}
                    color={palettes.Brand.appStyle_greyscale_400}
                    name={'Entypo/chevron-thin-right'}
                    size={16}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.IconStyles(theme)['Arrow Right'].style,
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </Touchable>
            {/* Article Summary Touchable */}
            <Touchable
              onPress={() => {
                try {
                  navigation.push('MineBuyArticleScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { marginBottom: 24 },
                dimensions.width
              )}
            >
              {/* Message Center Item */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Setting Icon View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 28,
                      justifyContent: 'center',
                      marginRight: 20,
                      width: 28,
                    },
                    dimensions.width
                  )}
                >
                  <Icon name={'AntDesign/profile'} size={24} />
                </View>
                {/* Setting Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                      { fontSize: 16, marginRight: 20 }
                    ),
                    dimensions.width
                  )}
                >
                  {'购买的文章纪要'}
                </Text>
                {/* Settings Arrow View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 20,
                      justifyContent: 'center',
                      width: 20,
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    {...GlobalStyles.IconStyles(theme)['Arrow Right'].props}
                    color={palettes.Brand.appStyle_greyscale_400}
                    name={'Entypo/chevron-thin-right'}
                    size={16}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.IconStyles(theme)['Arrow Right'].style,
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </Touchable>
            {/* Purchased Replays Touchable */}
            <Touchable
              onPress={() => {
                try {
                  navigation.push('MineBuyLiveScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { marginBottom: 24 },
                dimensions.width
              )}
            >
              {/* Item */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Icon View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 28,
                      justifyContent: 'center',
                      marginRight: 20,
                      width: 28,
                    },
                    dimensions.width
                  )}
                >
                  <Icon name={'FontAwesome/film'} size={24} />
                </View>

                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                      { fontSize: 16, marginRight: 20 }
                    ),
                    dimensions.width
                  )}
                >
                  {'购买的回放'}
                </Text>
                {/* Arrow View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 20,
                      justifyContent: 'center',
                      width: 20,
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    {...GlobalStyles.IconStyles(theme)['Arrow Right'].props}
                    color={palettes.Brand.appStyle_greyscale_400}
                    name={'Entypo/chevron-thin-right'}
                    size={16}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.IconStyles(theme)['Arrow Right'].style,
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </Touchable>
            {/* My Likes Touchable */}
            <Touchable
              onPress={() => {
                try {
                  navigation.push('MineMyLikeScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { marginBottom: 24 },
                dimensions.width
              )}
            >
              {/* Item */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Icon View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 28,
                      justifyContent: 'center',
                      marginRight: 20,
                      width: 28,
                    },
                    dimensions.width
                  )}
                >
                  <Icon name={'AntDesign/like2'} size={24} />
                </View>

                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                      { fontSize: 16, marginRight: 20 }
                    ),
                    dimensions.width
                  )}
                >
                  {'我的点赞'}
                </Text>
                {/* Arrow View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 20,
                      justifyContent: 'center',
                      width: 20,
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    {...GlobalStyles.IconStyles(theme)['Arrow Right'].props}
                    color={palettes.Brand.appStyle_greyscale_400}
                    name={'Entypo/chevron-thin-right'}
                    size={16}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.IconStyles(theme)['Arrow Right'].style,
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </Touchable>
            {/* My Collection Touchable */}
            <Touchable
              onPress={() => {
                try {
                  navigation.push('BottomTabNavigator', {
                    screen: 'Mine',
                    params: { screen: 'MineMyFavoritesScreen' },
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { marginBottom: 24 },
                dimensions.width
              )}
            >
              {/* Item */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Icon View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 28,
                      justifyContent: 'center',
                      marginRight: 20,
                      width: 28,
                    },
                    dimensions.width
                  )}
                >
                  <Icon name={'AntDesign/staro'} size={24} />
                </View>

                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                      { fontSize: 16, marginRight: 20 }
                    ),
                    dimensions.width
                  )}
                >
                  {'我的收藏'}
                </Text>
                {/* Arrow View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 20,
                      justifyContent: 'center',
                      width: 20,
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    {...GlobalStyles.IconStyles(theme)['Arrow Right'].props}
                    color={palettes.Brand.appStyle_greyscale_400}
                    name={'Entypo/chevron-thin-right'}
                    size={16}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.IconStyles(theme)['Arrow Right'].style,
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </Touchable>
            {/* Identity Authentication Touchable */}
            <Touchable
              style={StyleSheet.applyWidth(
                { marginBottom: 24 },
                dimensions.width
              )}
            >
              {/* Item */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Icon View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      height: 28,
                      justifyContent: 'center',
                      marginRight: 20,
                      width: 28,
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    name={'FontAwesome/id-card-o'}
                    size={24}
                    style={StyleSheet.applyWidth(
                      { width: 32 },
                      dimensions.width
                    )}
                  />
                </View>

                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                      { fontSize: 16, marginRight: 20 }
                    ),
                    dimensions.width
                  )}
                >
                  {'身份认证'}
                </Text>
                {/* Text 2 */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.Brand.appStyle_greyscale_400,
                      fontSize: 12,
                      marginRight: 10,
                    },
                    dimensions.width
                  )}
                >
                  {'已认证(机构投资人)'}
                </Text>
                {/* Arrow View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 20,
                      justifyContent: 'center',
                      width: 20,
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    {...GlobalStyles.IconStyles(theme)['Arrow Right'].props}
                    color={palettes.Brand.appStyle_greyscale_400}
                    name={'Entypo/chevron-thin-right'}
                    size={16}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.IconStyles(theme)['Arrow Right'].style,
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </Touchable>
            {/* Join Live Touchable */}
            <Touchable
              style={StyleSheet.applyWidth(
                { marginBottom: 24 },
                dimensions.width
              )}
            >
              {/* Item */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 16,
                    paddingRight: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Icon View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 28,
                      justifyContent: 'center',
                      marginRight: 20,
                      width: 28,
                    },
                    dimensions.width
                  )}
                >
                  <Icon name={'Ionicons/videocam-outline'} size={24} />
                </View>

                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                      { fontSize: 16, marginRight: 20 }
                    ),
                    dimensions.width
                  )}
                >
                  {'加入直播'}
                </Text>
                {/* Arrow View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 20,
                      justifyContent: 'center',
                      width: 20,
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    {...GlobalStyles.IconStyles(theme)['Arrow Right'].props}
                    color={palettes.Brand.appStyle_greyscale_400}
                    name={'Entypo/chevron-thin-right'}
                    size={16}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.IconStyles(theme)['Arrow Right'].style,
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </Touchable>
            <Divider
              {...GlobalStyles.DividerStyles(theme)['Divider'].props}
              color={palettes.Brand.appStyle_greyscale_200}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.DividerStyles(theme)['Divider'].style,
                  { height: 1, marginBottom: 24, width: '100%' }
                ),
                dimensions.width
              )}
            />
          </SimpleStyleScrollView>
        </View>
      </SimpleStyleScrollView>
      {/* Fetch 2 */}
      <AceCampTestApi.FetchMyInfoGET
        handlers={{
          onData: fetch2Data => {
            try {
              setGlobalVariableValue({
                key: 'user_info',
                value: fetch2Data?.data,
              });
            } catch (err) {
              console.error(err);
            }
          },
        }}
      >
        {({ loading, error, data, refetchMyInfo }) => {
          const fetch2Data = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return null;
        }}
      </AceCampTestApi.FetchMyInfoGET>
    </ScreenContainer>
  );
};

export default withTheme(MineIndexScreen);
