import React from 'react';
import {
  IconButton,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Toast from '../custom-files/Toast';
import ShowToast from '../global-functions/ShowToast';
import removeEleFromArray from '../global-functions/removeEleFromArray';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const AccountCancellationReasonScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [can_submit, setCan_submit] = React.useState(true);
  const [info_data, setInfo_data] = React.useState([
    { key: 'events_is_few', name: '活动太少' },
    { key: 'poor_quality', name: '内容质量差' },
    { key: 'too_expensive', name: '费用太高' },
    { key: 'functional_problem', name: '产品性能问题' },
    { key: 'user_group_is_poor', name: '用户群体质量差' },
    { key: 'personal_reasons', name: '个人原因' },
    { key: 'reregister', name: '重新注册' },
    { key: 'other', name: '其他' },
  ]);
  const [other_reason, setOther_reason] = React.useState('');
  const [reasons, setReasons] = React.useState([]);
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      {/* 主题栏 */}
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
            size={24}
            style={StyleSheet.applyWidth(
              { left: 16, position: 'absolute', top: 11 },
              dimensions.width
            )}
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
                  lineHeight: 22,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {t(Variables, 'setting_apply_account_cancellation')}
            </Text>
          </View>
        </View>
      </View>

      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={StyleSheet.applyWidth(
            { justifyContent: 'space-between', padding: 16 },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['15 Regular'].style,
                {
                  alignSelf: 'center',
                  fontSize: 22,
                  lineHeight: 30,
                  padding: 12,
                }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'setting_account_cancellation_reason')}
          </Text>
          <SimpleStyleFlatList
            data={info_data}
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
            listKey={'Scroll View->View->List'}
            nestedScrollEnabled={false}
            numColumns={1}
            onEndReachedThreshold={0.5}
            pagingEnabled={false}
            renderItem={({ item, index }) => {
              const listData = item;
              return (
                <Touchable
                  onPress={() => {
                    try {
                      if (reasons.includes(listData?.key)) {
                        setReasons(removeEleFromArray(reasons, listData?.key));
                      } else {
                        setReasons(reasons.concat([listData?.key]));
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: [
                          {
                            minWidth: Breakpoints.Mobile,
                            value: palettes.App['Custom Color 65'],
                          },
                          {
                            minWidth: Breakpoints.Mobile,
                            value: reasons.includes(listData?.key)
                              ? '#e3edfa'
                              : '#e5ecf2',
                          },
                        ],
                        borderRadius: 4,
                        justifyContent: 'center',
                        margin: 8,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['14 Regular'].style,
                          theme.typography.body1,
                          {
                            color: [
                              {
                                minWidth: Breakpoints.Mobile,
                                value: palettes.App.appStyle_black,
                              },
                              {
                                minWidth: Breakpoints.Mobile,
                                value: reasons.includes(listData?.key)
                                  ? palettes.Brand.appStyle_primary
                                  : palettes.App.appStyle_black,
                              },
                            ],
                            padding: 10,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {listData?.name}
                    </Text>
                  </View>
                </Touchable>
              );
            }}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={true}
            snapToAlignment={'start'}
          />
          {/* 其他 */}
          <>
            {!reasons.includes('other') ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 16 },
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['14 Regular'].style,
                      theme.typography.body1,
                      { color: palettes.Brand.itemTextNomal }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'setting_account_cancellation_reason_other')}
                </Text>
                <TextInput
                  autoCorrect={true}
                  changeTextDelay={500}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={newTextAreaValue => {
                    try {
                      setOther_reason(newTextAreaValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  textAlignVertical={'top'}
                  webShowOutline={true}
                  placeholder={t(Variables, 'setting_input_reason_other')}
                  style={StyleSheet.applyWidth(
                    {
                      borderColor: palettes.App['Custom Color 6'],
                      borderRadius: 4,
                      borderWidth: 1,
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      height: 160,
                      letterSpacing: 0.2,
                      lineHeight: 18,
                      marginTop: 8,
                      padding: 16,
                    },
                    dimensions.width
                  )}
                  value={other_reason}
                />
              </View>
            )}
          </>
          <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)} />
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              },
              dimensions.width
            )}
          >
            {/* View 2 */}
            <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
              {/* Touchable 2 */}
              <Touchable
                onPress={() => {
                  try {
                    if (reasons?.length > 0) {
                      if (reasons.includes('other') && !other_reason) {
                        ShowToast(
                          t(Variables, 'setting_please_input_reason_other'),
                          undefined,
                          'error'
                        );
                      } else {
                        navigation.push('AccountCancellationSubmitScreen', {
                          reasons: reasons,
                          description: other_reason,
                        });
                      }
                    } else {
                      ShowToast(
                        t(Variables, 'setting_please_select_reason'),
                        undefined,
                        'error'
                      );
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.App['Custom Color 68'],
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: can_submit
                            ? palettes.Brand.appStyle_primary
                            : '#c6d0d9',
                        },
                      ],
                      borderRadius: 4,
                      height: 45,
                      justifyContent: 'center',
                      marginTop: 16,
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
                        fontSize: 14,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_next')}
                  </Text>
                </View>
              </Touchable>
            </View>
          </View>
        </View>
      </SimpleStyleScrollView>

      <AceCampTestApi.FetchDeleteAccountReasonGET
        handlers={{
          onData: fetchData => {
            try {
              console.log(fetchData);
              if (!fetchData?.data) {
                return;
              }
              setInfo_data(fetchData?.data);
            } catch (err) {
              console.error(err);
            }
          },
        }}
      >
        {({ loading, error, data, refetchDeleteAccountReason }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <View />;
          }

          return null;
        }}
      </AceCampTestApi.FetchDeleteAccountReasonGET>
      <Utils.CustomCodeErrorBoundary>
        <Toast.ele />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(AccountCancellationReasonScreen);
