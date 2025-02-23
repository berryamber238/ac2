import React from 'react';
import {
  Button,
  Divider,
  Icon,
  IconButton,
  LinearGradient,
  ScreenContainer,
  SimpleStyleFlashList,
  SimpleStyleScrollView,
  Swiper,
  SwiperItem,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import {
  ActivityIndicator,
  Image,
  Modal,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CoverView from '../custom-files/CoverView';
import * as Toast from '../custom-files/Toast';
import JumpToPageByType from '../global-functions/JumpToPageByType';
import LabelPickerCancelBtnPress from '../global-functions/LabelPickerCancelBtnPress';
import LabelPickerConfirmBtnPress from '../global-functions/LabelPickerConfirmBtnPress';
import ShowToast from '../global-functions/ShowToast';
import arrayIdToString from '../global-functions/arrayIdToString';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import getArticleType from '../global-functions/getArticleType';
import getMonthStr from '../global-functions/getMonthStr';
import getNameById from '../global-functions/getNameById';
import splitList from '../global-functions/splitList';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { event_id: 10001038 };

const EventDetailScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [bottomSheetTitle, setBottomSheetTitle] = React.useState('');
  const [event_id, setEvent_id] = React.useState('');
  const [id, setId] = React.useState('');
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [recommand_data_list, setRecommand_data_list] = React.useState([]);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestUnfollowOrganizationPOST =
    AceCampTestApi.useUnfollowOrganizationPOST();
  const aceCampTestFollowOrganizationPOST =
    AceCampTestApi.useFollowOrganizationPOST();
  const aceCampTestEventsRegisterPOST = AceCampTestApi.useEventsRegisterPOST();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }

      const entry = StatusBar.pushStackEntry?.({ barStyle: 'light-content' });
      return () => StatusBar.popStackEntry?.(entry);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <AceCampTestApi.FetchEventInfoGET
        handlers={{
          onData: fetchData => {
            try {
              console.log(fetchData);
              setIsFollowed(fetchData?.data?.organization?.followed);
              setEvent_id(fetchData?.data?.id);
              setId(fetchData?.data?.meetings?.[0]?.id);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        id={props.route?.params?.event_id ?? defaultProps.event_id}
      >
        {({ loading, error, data, refetchEventInfo }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              <SimpleStyleScrollView
                bounces={true}
                horizontal={false}
                keyboardShouldPersistTaps={'never'}
                nestedScrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={StyleSheet.applyWidth(
                  { height: '100%' },
                  dimensions.width
                )}
              >
                <LinearGradient
                  endX={100}
                  endY={100}
                  startX={0}
                  startY={0}
                  {...GlobalStyles.LinearGradientStyles(theme)[
                    'Linear Gradient'
                  ].props}
                  color1={palettes.App['Custom Color 38']}
                  color2={palettes.App['Custom Color 40']}
                  color3={palettes.App['Custom Color 39']}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.LinearGradientStyles(theme)[
                        'Linear Gradient'
                      ].style,
                      { position: 'absolute', top: 0, width: dimensions.width }
                    ),
                    dimensions.width
                  )}
                />
                <View>
                  {/* 标题 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: palettes.App['Custom #ffffff'],
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: safeAreaInsets.top,
                        paddingBottom: 15,
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
                      color={palettes.App['Custom #ffffff']}
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
                          alignSelf: 'auto',
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
                      {null}
                    </Text>
                    {/* 分享Btn */}
                    <IconButton
                      color={palettes.App['Custom #ffffff']}
                      icon={'AntDesign/export'}
                      size={28}
                    />
                  </View>

                  <View
                    style={StyleSheet.applyWidth(
                      { paddingLeft: 16, paddingRight: 16, paddingTop: 10 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.App['Custom #ffffff'],
                          fontFamily: 'System',
                          fontSize: 18,
                          fontWeight: '700',
                          letterSpacing: 0.2,
                          lineHeight: 24,
                        },
                        dimensions.width
                      )}
                    >
                      {fetchData?.data?.name}
                    </Text>

                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          flexDirection: 'row',
                          marginBottom: 5,
                          marginTop: 5,
                          paddingBottom: 10,
                          paddingTop: 10,
                        },
                        dimensions.width
                      )}
                    >
                      {/* VIP 2 */}
                      <>
                        {null?.source?.exists_need_pay_meeting ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                backgroundColor: 'rgb(254, 249, 239)',
                                borderColor: 'rgb(184, 148, 108)',
                                borderRadius: 4,
                                borderWidth: 1,
                                justifyContent: 'center',
                                marginRight: 8,
                                paddingLeft: 6,
                                paddingRight: 6,
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              selectable={false}
                              {...GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Text Form Label 2'
                                  ].style,
                                  {
                                    alignSelf: 'center',
                                    color: 'rgb(184, 148, 106)',
                                    fontFamily: 'System',
                                    fontSize: 12,
                                    fontWeight: '400',
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'VIP'}
                            </Text>
                          </View>
                        )}
                      </>
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App['Custom #ffffff'],
                            fontFamily: 'System',
                            fontSize: 14,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 19,
                          },
                          dimensions.width
                        )}
                      >
                        {arrayIdToString(
                          Variables,
                          13,
                          fetchData?.data?.custom_sector_ids,
                          '、'
                        )}
                      </Text>
                    </View>
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: 'rgb(44, 51, 138)',
                          borderRadius: 8,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          opacity: 1,
                          paddingBottom: 10,
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 10,
                        },
                        dimensions.width
                      )}
                    >
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.push('BottomTabNavigator', {
                              screen: 'Home',
                              params: {
                                screen: 'OrganizerScreen',
                                params: {
                                  organization_id:
                                    fetchData?.data?.organization?.id,
                                },
                              },
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
                          <Image
                            resizeMode={'cover'}
                            {...GlobalStyles.ImageStyles(theme)['Image'].props}
                            source={imageSource(
                              `${fetchData?.data?.organization?.logo}`
                            )}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ImageStyles(theme)['Image'].style,
                                {
                                  borderRadius: 2225,
                                  height: 40,
                                  marginRight: 10,
                                  width: 40,
                                }
                              ),
                              dimensions.width
                            )}
                          />
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'System',
                                fontSize: 16,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 19,
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.data?.contacts?.[0]?.name}
                          </Text>
                        </View>
                      </Touchable>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { alignItems: 'center', flexDirection: 'row' },
                          dimensions.width
                        )}
                      >
                        {/* Touchable 2 */}
                        <Touchable
                          onPress={() => {
                            try {
                              Linking.openURL(
                                `mailto:${fetchData?.data?.contacts?.[0]?.phone}`
                              );
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor: palettes.App['Custom #ffffff'],
                                borderRadius: 15,
                                height: 25,
                                justifyContent: 'center',
                                width: 25,
                              },
                              dimensions.width
                            )}
                          >
                            <Icon
                              name={'Entypo/mail'}
                              size={15}
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App['Custom #ffffff'],
                                },
                                dimensions.width
                              )}
                            />
                          </View>
                        </Touchable>

                        <Touchable
                          onPress={() => {
                            const handler = async () => {
                              try {
                                if (isFollowed) {
                                  const unfollowResult = (
                                    await aceCampTestUnfollowOrganizationPOST.mutateAsync(
                                      {
                                        organization_id:
                                          fetchData?.data?.organization?.id,
                                      }
                                    )
                                  )?.json;
                                  setIsFollowed(
                                    unfollowResult?.code === 200 ? false : true
                                  );
                                } else {
                                  const followResult = (
                                    await aceCampTestFollowOrganizationPOST.mutateAsync(
                                      {
                                        organization_id:
                                          fetchData?.data?.organization?.id,
                                      }
                                    )
                                  )?.json;
                                  setIsFollowed(
                                    followResult?.code === 200 ? true : false
                                  );
                                }
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                        >
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: 'rgb(200, 208, 216)',
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: isFollowed
                                      ? '#C8D0D8'
                                      : palettes.Brand.appStyle_primary,
                                  },
                                ],
                                borderRadius: 14,
                                marginLeft: 10,
                                paddingBottom: 5,
                                paddingLeft: 15,
                                paddingRight: 15,
                                paddingTop: 5,
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: palettes.App['Custom #ffffff'],
                                  fontFamily: 'System',
                                  fontSize: 13,
                                  fontWeight: '400',
                                  letterSpacing: 0.2,
                                  lineHeight: 17,
                                },
                                dimensions.width
                              )}
                            >
                              {isFollowed
                                ? t(Variables, 'common_followed')
                                : t(Variables, 'common_follow')}
                            </Text>
                          </View>
                        </Touchable>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App['Custom #ffffff'],
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      height: '100%',
                      marginTop: 20,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/* 时间选择 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: 'rgb(246, 247, 248)',
                        borderColor: palettes.Brand.appStyle_primary,
                        borderRadius: 6,
                        borderWidth: 2,
                        flexDirection: 'row',
                        height: 70,
                        justifyContent: 'center',
                        marginLeft: 16,
                        marginTop: 16,
                        overflow: 'hidden',
                        width: 120,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: 'rgb(227, 234, 253)',
                          borderBottomRightRadius: 3,
                          left: 0,
                          padding: 4,
                          position: 'absolute',
                          top: 0,
                          zIndex: 100,
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
                            fontSize: 10,
                            fontWeight: '400',
                          },
                          dimensions.width
                        )}
                      >
                        {fetchData?.data?.meetings?.[0]?.meeting_way ===
                        'default_online'
                          ? t(Variables, 'event_detail_online')
                          : t(Variables, 'event_detail_offline')}
                      </Text>
                    </View>
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: palettes.App['Custom #ffffff'],
                          borderRadius: 4,
                          padding: 4,
                        },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: 'rgb(165, 175, 185)',
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 14,
                          },
                          dimensions.width
                        )}
                      >
                        {getMonthStr(
                          Variables,
                          fromUnixTimestamp(
                            Variables,
                            fetchData?.data?.meetings?.[0]?.start_time,
                            'MM'
                          )
                        )}
                      </Text>
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            fontFamily: 'System',
                            fontSize: 14,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {fromUnixTimestamp(
                          Variables,
                          fetchData?.data?.meetings?.[0]?.start_time,
                          'DD'
                        )}
                      </Text>
                    </View>
                    {/* View 3 */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginLeft: 8 },
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
                            fontSize: 14,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 19,
                          },
                          dimensions.width
                        )}
                      >
                        {fromUnixTimestamp(
                          Variables,
                          fetchData?.data?.meetings?.[0]?.start_time,
                          'HH:mm'
                        )}
                      </Text>
                    </View>
                  </View>
                  {/* 会议时间 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        marginTop: 16,
                        paddingLeft: 16,
                        paddingRight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { marginRight: 4 },
                        dimensions.width
                      )}
                    >
                      <Icon
                        color={palettes.App['Custom Color 41']}
                        name={'MaterialCommunityIcons/clock-time-three'}
                        size={18}
                      />
                    </View>
                    {/* View 2 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'event_detail_time')}
                      </Text>
                    </View>
                    {/* View 3 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {fromUnixTimestamp(
                          Variables,
                          fetchData?.data?.meetings?.[0]?.start_time,
                          'YYYY/MM/DD HH:mm'
                        )}
                        {'-'}
                        {fromUnixTimestamp(
                          Variables,
                          fetchData?.data?.meetings?.[0]?.end_time,
                          'HH:mm'
                        )}
                        {'\n'}
                        {getNameById(
                          Variables,
                          1,
                          fetchData?.data?.meetings?.[0]?.time_zone_id
                        )}
                      </Text>
                    </View>
                  </View>
                  {/* 会议类型 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        marginTop: 16,
                        paddingLeft: 16,
                        paddingRight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { marginRight: 4 },
                        dimensions.width
                      )}
                    >
                      <Icon
                        color={palettes.App['Custom Color 41']}
                        name={'MaterialIcons/dashboard'}
                        size={18}
                      />
                    </View>
                    {/* View 2 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'event_detail_type')}
                      </Text>
                    </View>
                    {/* View 3 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {fetchData?.data?.meetings?.[0]?.meeting_way ===
                        'default_online'
                          ? t(Variables, 'event_detail_online_group')
                          : t(Variables, 'event_detail_offline_group')}
                      </Text>
                    </View>
                  </View>
                  {/* 参会方式 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        marginTop: 16,
                        paddingLeft: 16,
                        paddingRight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { marginRight: 4 },
                        dimensions.width
                      )}
                    >
                      <Icon
                        color={palettes.App['Custom Color 41']}
                        name={'Entypo/hair-cross'}
                        size={18}
                      />
                    </View>
                    {/* View 2 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'event_detail_style')}
                      </Text>
                    </View>
                    {/* View 3 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Event Text'].style,
                            { color: palettes.App['Custom Color 4'] }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchData?.data?.meetings?.[0]?.has_registered
                          ? t(Variables, 'event_detail_online_group')
                          : t(Variables, 'event_detail_after_look')}
                      </Text>
                    </View>
                  </View>
                  {/* 语言 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        marginTop: 16,
                        paddingLeft: 16,
                        paddingRight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { marginRight: 4 },
                        dimensions.width
                      )}
                    >
                      <Icon
                        color={palettes.App['Custom Color 41']}
                        name={'Ionicons/earth'}
                        size={18}
                      />
                    </View>
                    {/* View 2 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'event_detail_language')}
                      </Text>
                    </View>
                    {/* View 3 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Event Text'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Event Text'].style,
                          dimensions.width
                        )}
                      >
                        {arrayIdToString(
                          Variables,
                          2,
                          fetchData?.data?.meetings?.[0]?.language_ids,
                          '、'
                        )}
                      </Text>
                    </View>
                  </View>
                  {/* 不可以提问 */}
                  <>
                    {fetchData?.data?.meetings?.[0]?.interactive ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            marginTop: 16,
                            paddingLeft: 16,
                            paddingRight: 16,
                          },
                          dimensions.width
                        )}
                      >
                        {/* View 2 */}
                        <View>
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Event Text']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Event Text']
                                  .style,
                                { color: palettes.App['Custom Color_11'] }
                              ),
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'event_detail_not_request')}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.Slate[100],
                        height: 4,
                        marginTop: 16,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  />
                  {/* 活动介绍标题 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: palettes.Slate[100],
                        flexDirection: 'row',
                        paddingBottom: 8,
                        paddingTop: 8,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.Brand.appStyle_primary,
                          borderBottomRightRadius: 3,
                          borderTopRightRadius: 3,
                          height: 22,
                          marginRight: 10,
                          width: 3,
                        },
                        dimensions.width
                      )}
                    />
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Title'].style,
                          { fontSize: 16, lineHeight: 24 }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'common_description')}
                    </Text>
                  </View>
                  {/* 活动介绍 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { padding: 16 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: 'rgb(60, 60, 60)',
                          fontFamily: 'System',
                          fontSize: 14,
                          fontWeight: '400',
                          letterSpacing: 0.2,
                          lineHeight: 24,
                        },
                        dimensions.width
                      )}
                    >
                      {fetchData?.data?.description}
                    </Text>
                  </View>
                  {/* 本营专家一对一 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        height: 75,
                        marginBottom: 10,
                        marginTop: 20,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.push('BottomTabNavigator', {
                            screen: 'Home',
                            params: {
                              screen: 'OrganizerScreen',
                              params: { organization_id: 20505781 },
                            },
                          });
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <Image
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        resizeMode={'contain'}
                        source={imageSource(
                          'https://static.acecamptech.com/system/posters/sc_event_poster.png'
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 75, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                    </Touchable>
                  </View>
                  {/* 相关推荐-标题 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginBottom: 10,
                        marginTop: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    <LinearGradient
                      color1={palettes.App['Custom Color 33']}
                      color2={palettes.App['Custom Color 33']}
                      color3={'rgba(0, 0, 0, 0)'}
                      endX={0}
                      endY={5}
                      startX={200}
                      startY={5}
                      style={StyleSheet.applyWidth(
                        { flex: 1, height: 2 },
                        dimensions.width
                      )}
                    />
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: 'rgb(95, 136, 247)',
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '600',
                          letterSpacing: 0.2,
                          lineHeight: 24,
                          marginLeft: 20,
                          marginRight: 20,
                        },
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'article_detail_recommand')}
                    </Text>
                    {/* Linear Gradient 3 */}
                    <LinearGradient
                      color1={palettes.App['Custom Color 33']}
                      color2={palettes.App['Custom Color 33']}
                      color3={'rgba(0, 0, 0, 0)'}
                      endX={100}
                      endY={5}
                      startX={0}
                      startY={5}
                      style={StyleSheet.applyWidth(
                        { flex: 1, height: 2 },
                        dimensions.width
                      )}
                    />
                  </View>
                  {/* 相关推荐 2 */}
                  <View>
                    <AceCampTestApi.FetchArticleInfoSimilarGET
                      handlers={{
                        onData: fetchData => {
                          try {
                            const result = splitList(fetchData?.data, 5);
                            setRecommand_data_list(result);
                            console.log(result);
                          } catch (err) {
                            console.error(err);
                          }
                        },
                      }}
                      source_id={fetchData?.data?.id}
                      source_type={'Event'}
                    >
                      {({
                        loading,
                        error,
                        data,
                        refetchArticleInfoSimilar,
                      }) => {
                        const fetchData = data?.json;
                        if (loading) {
                          return <ActivityIndicator />;
                        }

                        if (
                          error ||
                          data?.status < 200 ||
                          data?.status >= 300
                        ) {
                          return <ActivityIndicator />;
                        }

                        return (
                          <Swiper
                            data={recommand_data_list}
                            dotActiveColor={theme.colors.branding.primary}
                            dotColor={theme.colors.text.light}
                            dotsTouchable={true}
                            hideDots={false}
                            keyExtractor={(swiperData, index) =>
                              swiperData?.id ??
                              swiperData?.uuid ??
                              index?.toString() ??
                              JSON.stringify(swiperData)
                            }
                            listKey={
                              'Fetch->Scroll View->View->相关推荐 2->Fetch->Swiper'
                            }
                            minDistanceForAction={0.2}
                            minDistanceToCapture={5}
                            renderItem={({ item, index }) => {
                              const swiperData = item;
                              return (
                                <SwiperItem>
                                  <SimpleStyleFlashList
                                    data={swiperData}
                                    estimatedItemSize={50}
                                    horizontal={false}
                                    inverted={false}
                                    keyExtractor={(flashListData, index) =>
                                      flashListData?.id ??
                                      flashListData?.uuid ??
                                      index?.toString() ??
                                      JSON.stringify(flashListData)
                                    }
                                    listKey={JSON.stringify(swiperData)}
                                    numColumns={1}
                                    onEndReachedThreshold={0.5}
                                    renderItem={({ item, index }) => {
                                      const flashListData = item;
                                      return (
                                        <Touchable
                                          onPress={() => {
                                            try {
                                              JumpToPageByType(
                                                navigation,
                                                flashListData?.source_type,
                                                flashListData?.source_id,
                                                Constants['base_url']
                                              );
                                              /* hidden 'If/Else' action */
                                              /* hidden 'Navigate' action */
                                            } catch (err) {
                                              console.error(err);
                                            }
                                          }}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  palettes.App[
                                                    'Custom Color 31'
                                                  ],
                                                borderRadius: 4,
                                                marginBottom: 5,
                                                marginTop: 5,
                                                paddingBottom: 5,
                                                paddingLeft: 16,
                                                paddingRight: 16,
                                                paddingTop: 5,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  paddingBottom: 3,
                                                  paddingTop: 3,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <Text
                                                accessible={true}
                                                selectable={false}
                                                ellipsizeMode={'tail'}
                                                numberOfLines={1}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    fontFamily: 'System',
                                                    fontSize: 14,
                                                    fontWeight: '600',
                                                    letterSpacing: 0.2,
                                                    lineHeight: 24,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {flashListData?.source_type ===
                                                'Event'
                                                  ? flashListData?.source.name
                                                  : flashListData?.source.title}
                                              </Text>
                                            </View>
                                            {/* View 2 */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: 'center',
                                                  flexDirection: 'row',
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    borderColor:
                                                      palettes.App
                                                        .Peoplebit_Light_Stone_Gray,
                                                    borderRadius: 4,
                                                    borderWidth: 1,
                                                    paddingBottom: 2,
                                                    paddingLeft: 4,
                                                    paddingRight: 4,
                                                    paddingTop: 2,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Text
                                                  accessible={true}
                                                  selectable={false}
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        palettes.App[
                                                          'Custom Color 34'
                                                        ],
                                                      fontFamily: 'System',
                                                      fontSize: 13,
                                                      fontWeight: '400',
                                                      letterSpacing: 0.2,
                                                      lineHeight: 17,
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {getArticleType(
                                                    Variables,
                                                    flashListData?.source_type
                                                  )}
                                                </Text>
                                              </View>

                                              <Text
                                                accessible={true}
                                                selectable={false}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      palettes.App[
                                                        'Custom Color 34'
                                                      ],
                                                    fontFamily: 'System',
                                                    fontSize: 13,
                                                    fontWeight: '400',
                                                    letterSpacing: 0.2,
                                                    lineHeight: 17,
                                                    marginLeft: 10,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {fromUnixTimestamp(
                                                  Variables,
                                                  flashListData?.source
                                                    .release_time,
                                                  'YYYY/MM/DD HH:mm'
                                                )}
                                              </Text>
                                            </View>
                                          </View>
                                        </Touchable>
                                      );
                                    }}
                                    showsHorizontalScrollIndicator={true}
                                    showsVerticalScrollIndicator={true}
                                    scrollEnabled={false}
                                  />
                                </SwiperItem>
                              );
                            }}
                            vertical={false}
                            {...GlobalStyles.SwiperStyles(theme)['Swiper']
                              .props}
                            loop={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.SwiperStyles(theme)['Swiper']
                                  .style,
                                { height: 400 }
                              ),
                              dimensions.width
                            )}
                            timeout={5000}
                          />
                        );
                      }}
                    </AceCampTestApi.FetchArticleInfoSimilarGET>
                  </View>
                </View>
              </SimpleStyleScrollView>
              {/* Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                    marginBottom: safeAreaInsets.bottom,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                >
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        setShowConfirmModal(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    {...GlobalStyles.ButtonStyles(theme)['Button (default)']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button (default)']
                          .style,
                        {
                          backgroundColor: palettes.Brand.appStyle_primary,
                          borderRadius: null,
                          color: palettes.App['Custom #ffffff'],
                          fontSize: 18,
                          letterSpacing: 0.5,
                          lineHeight: 26,
                          paddingBottom: 10,
                          paddingTop: 10,
                        }
                      ),
                      dimensions.width
                    )}
                    title={`${t(Variables, 'dialog_sign_up_now')}`}
                  />
                </View>

                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color_11'],
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '600',
                      letterSpacing: 0.2,
                      lineHeight: 24,
                      marginLeft: 32,
                      marginRight: 32,
                    },
                    dimensions.width
                  )}
                >
                  {fetchData?.data?.meetings?.[0]?.current_price}
                  {t(Variables, 'mine_a_currency')}
                </Text>
              </View>
            </>
          );
        }}
      </AceCampTestApi.FetchEventInfoGET>
      {/* 背景图层 */}
      <>
        {!showConfirmModal ? null : (
          <CoverView.AnimatedView isVisible={showConfirmModal} />
        )}
      </>
      {/* Label Picker Modal */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        {...GlobalStyles.ModalStyles(theme)['Modal'].props}
        animationType={'slide'}
        presentationStyle={'overFullScreen'}
        style={StyleSheet.applyWidth(
          GlobalStyles.ModalStyles(theme)['Modal'].style,
          dimensions.width
        )}
        transparent={true}
        visible={showConfirmModal}
      >
        <Touchable
          onPress={() => {
            try {
              /* hidden 'Run a Custom Function' action */
              setShowConfirmModal(false);
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ height: '40%' }, dimensions.width)}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App['Custom Color 4'],
                height: '100%',
                opacity: 0,
                width: '100%',
              },
              dimensions.width
            )}
          />
        </Touchable>
        {/* Popup view */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App.appStyle_white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              flexDirection: 'column',
              height: '60%',
              paddingBottom: safeAreaInsets.bottom + 60,
              width: '100%',
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
                marginTop: 20,
                paddingLeft: 16,
                paddingRight: 16,
              },
              dimensions.width
            )}
          >
            {/* Title */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                  {
                    alignSelf: 'auto',
                    flex: null,
                    fontFamily: 'System',
                    fontWeight: '600',
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'event_detail_confirm_title')}
            </Text>
            <IconButton
              onPress={() => {
                try {
                  setShowConfirmModal(false);
                } catch (err) {
                  console.error(err);
                }
              }}
              color={palettes.App['Custom Color 4']}
              icon={'AntDesign/close'}
              size={24}
            />
          </View>
          {/* Select All Checkbox view */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-start',
                flexDirection: 'column',
                marginLeft: 16,
                marginRight: 16,
                marginTop: 20,
              },
              dimensions.width
            )}
          >
            {/* message */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color 4'],
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 22,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'event_detail_confirm_message')}
            </Text>

            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {t(Variables, 'common_name')}
            </Text>
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {Constants['user_info']?.organization_user.real_name}{' '}
            </Text>
            {/* Text 3 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {t(Variables, 'common_organization')}
            </Text>
            {/* Text 4 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {Constants['user_info']?.organization_user.organization.name}{' '}
            </Text>
            {/* Text 5 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {t(Variables, 'common_title')}
            </Text>
            {/* Text 6 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {Constants['user_info']?.organization_user.position_name}{' '}
            </Text>
            {/* Text 7 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {t(Variables, 'common_work_email')}
            </Text>
            {/* Text 8 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Event Confirm Info'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['Event Confirm Info'].style,
                dimensions.width
              )}
            >
              {Constants['user_info']?.organization_user.email}
            </Text>
          </View>
          <View />
        </View>

        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              bottom: [
                { minWidth: Breakpoints.Mobile, value: 0 },
                { minWidth: Breakpoints.Mobile, value: safeAreaInsets.bottom },
              ],
              flexWrap: 'wrap',
              height: 50,
              paddingLeft: 16,
              paddingRight: 16,
              position: 'absolute',
              width: '100%',
            },
            dimensions.width
          )}
        >
          <Button
            accessible={true}
            onPress={() => {
              const handler = async () => {
                try {
                  /* hidden 'Run a Custom Function' action */
                  const result = (
                    await aceCampTestEventsRegisterPOST.mutateAsync({
                      event_id:
                        props.route?.params?.event_id ?? defaultProps.event_id,
                      id: id,
                    })
                  )?.json;
                  if (result?.code === 200) {
                    ShowToast(
                      t(Variables, 'event_detail_register_success'),
                      undefined
                    );
                    setShowConfirmModal(false);
                  } else {
                    ShowToast(result?.msg, undefined);
                  }
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            iconPosition={'left'}
            iconSize={14}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                { width: '90%' }
              ),
              dimensions.width
            )}
            title={`${t(Variables, 'event_detail_confirm_button')}`}
          />
        </View>
      </Modal>
      <Utils.CustomCodeErrorBoundary>
        <Toast.ele />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(EventDetailScreen);
