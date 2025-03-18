import React from 'react';
import {
  ExpoImage,
  IconButton,
  Link,
  ScreenContainer,
  SimpleStyleScrollView,
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
import Images from '../config/Images';
import * as ConfirmDialog from '../custom-files/ConfirmDialog';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const AccountCancellationCheckScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [can_submit, setCan_submit] = React.useState(false);
  const [info_data, setInfo_data] = React.useState({
    has_vip: true,
    user_card_balance: '0.0',
    has_unconsumed_order: false,
  });
  const [isAbandonBuy, setIsAbandonBuy] = React.useState(false);
  const [isAbandonInfo, setIsAbandonInfo] = React.useState(false);
  const [isAbandonOther, setIsAbandonOther] = React.useState(false);
  const [isAbandonPoint, setIsAbandonPoint] = React.useState(true);
  const [isAbandonVIP, setIsAbandonVIP] = React.useState(true);
  const [isReadTerm, setIsReadTerm] = React.useState(false);
  const [tip_message, setTip_message] = React.useState('');
  const [tip_modal_visiable, setTip_modal_visiable] = React.useState(false);
  const [tip_title, setTip_title] = React.useState('');
  const [tip_type, setTip_type] = React.useState(0);
  const set_abandon = () => {
    switch (tip_type) {
      case 0:
        setIsAbandonBuy(true);
        break;
      case 1:
        setIsAbandonInfo(true);
        break;
      case 2:
        setIsAbandonOther(true);
        break;
    }

    setTip_modal_visiable(false);
  };
  React.useEffect(() => {
    if (
      isAbandonPoint &&
      isAbandonVIP &&
      isAbandonBuy &&
      isAbandonInfo &&
      isAbandonOther &&
      isReadTerm
    ) {
      setCan_submit(true);
    } else {
      setCan_submit(false);
    }
  }, [
    isAbandonPoint,
    isAbandonVIP,
    isAbandonInfo,
    isAbandonOther,
    isAbandonBuy,
    isReadTerm,
  ]);
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
        <View style={StyleSheet.applyWidth({ padding: 16 }, dimensions.width)}>
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['15 Regular'].style,
                { fontFamily: 'System', fontWeight: '600' }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'setting_account_check_conditions')}
          </Text>
          {/* A币结清 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgba(217, 217, 217, 0.53)',
                borderRadius: 8,
                marginTop: 16,
                padding: 16,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row' },
                dimensions.width
              )}
            >
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                resizeMode={'contain'}
                source={imageSource(Images['icapoint'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 20, width: 20 }
                  ),
                  dimensions.width
                )}
              />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['15 Regular'].style,
                    {
                      color: palettes.Brand.itemTextNomal,
                      flex: 1,
                      fontFamily: 'System',
                      fontWeight: '600',
                      marginLeft: 8,
                      marginRight: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'setting_account_check_a_point')}
              </Text>
              {/* Image 2 */}
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                resizeMode={'contain'}
                source={imageSource(
                  isAbandonPoint
                    ? Images['icstatusvector']
                    : Images['icstatuswarning']
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 18, width: 18 }
                  ),
                  dimensions.width
                )}
              />
            </View>

            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['15 Regular'].style,
                  {
                    color: palettes.App['Custom Color 4'],
                    lineHeight: 22,
                    marginTop: 16,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'setting_account_check_a_point_content')}
            </Text>
          </View>
          {/* 会员服务 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgba(217, 217, 217, 0.53)',
                borderRadius: 8,
                marginTop: 16,
                padding: 16,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row' },
                dimensions.width
              )}
            >
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                resizeMode={'contain'}
                source={imageSource(Images['icviptime'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 20, width: 20 }
                  ),
                  dimensions.width
                )}
              />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['15 Regular'].style,
                    {
                      color: palettes.Brand.itemTextNomal,
                      flex: 1,
                      fontFamily: 'System',
                      fontWeight: '600',
                      marginLeft: 8,
                      marginRight: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'setting_account_check_vip')}
              </Text>
              {/* Image 2 2 */}
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                resizeMode={'contain'}
                source={imageSource(
                  isAbandonVIP
                    ? Images['icstatusvector']
                    : Images['icstatuswarning']
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 18, width: 18 }
                  ),
                  dimensions.width
                )}
              />
            </View>

            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['15 Regular'].style,
                  {
                    color: palettes.App['Custom Color 4'],
                    lineHeight: 22,
                    marginTop: 16,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'setting_account_check_vip_content')}
            </Text>
          </View>
          {/* 已购资产 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgba(217, 217, 217, 0.53)',
                borderRadius: 8,
                marginTop: 16,
                padding: 16,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row' },
                dimensions.width
              )}
            >
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                resizeMode={'contain'}
                source={imageSource(Images['iccheckwallet'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 20, width: 20 }
                  ),
                  dimensions.width
                )}
              />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['15 Regular'].style,
                    {
                      color: palettes.Brand.itemTextNomal,
                      flex: 1,
                      fontFamily: 'System',
                      fontWeight: '600',
                      marginLeft: 8,
                      marginRight: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'setting_account_check_buy')}
              </Text>
              {/* Image 2 */}
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                resizeMode={'contain'}
                source={imageSource(
                  isAbandonBuy
                    ? Images['icstatusvector']
                    : Images['icstatuswarning']
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 18, width: 18 }
                  ),
                  dimensions.width
                )}
              />
            </View>

            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['15 Regular'].style,
                  {
                    color: palettes.App['Custom Color 4'],
                    lineHeight: 22,
                    marginTop: 16,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'setting_account_check_buy_content')}
            </Text>
            <>
              {isAbandonBuy ? null : (
                <Touchable
                  onPress={() => {
                    try {
                      setTip_title(t(Variables, 'setting_buy_has'));
                      setTip_message(t(Variables, 'setting_buy_has_sure'));
                      setTip_type(0);
                      setTip_modal_visiable(true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { marginTop: 16 },
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
                        theme.typography.body1,
                        { color: palettes.App['Custom Color 59'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'setting_confirm_discard')}
                  </Text>
                </Touchable>
              )}
            </>
          </View>
          {/* 信息资产 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgba(217, 217, 217, 0.53)',
                borderRadius: 8,
                marginTop: 16,
                padding: 16,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row' },
                dimensions.width
              )}
            >
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                resizeMode={'contain'}
                source={imageSource(Images['iccheckinfo'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 20, width: 20 }
                  ),
                  dimensions.width
                )}
              />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['15 Regular'].style,
                    {
                      color: palettes.Brand.itemTextNomal,
                      flex: 1,
                      fontFamily: 'System',
                      fontWeight: '600',
                      marginLeft: 8,
                      marginRight: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'setting_account_check_info')}
              </Text>
              {/* Image 2 */}
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                resizeMode={'contain'}
                source={imageSource(
                  isAbandonInfo
                    ? Images['icstatusvector']
                    : Images['icstatuswarning']
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 18, width: 18 }
                  ),
                  dimensions.width
                )}
              />
            </View>

            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['15 Regular'].style,
                  {
                    color: palettes.App['Custom Color 4'],
                    lineHeight: 22,
                    marginTop: 16,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'setting_account_check_info_content')}
            </Text>
            {/* Touchable 2 */}
            <>
              {isAbandonInfo ? null : (
                <Touchable
                  onPress={() => {
                    try {
                      setTip_title(t(Variables, 'setting_buy_has'));
                      setTip_message(t(Variables, 'setting_info_has_sure'));
                      setTip_type(1);
                      setTip_modal_visiable(true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { marginTop: 16 },
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
                        theme.typography.body1,
                        { color: palettes.App['Custom Color 59'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'setting_confirm_discard')}
                  </Text>
                </Touchable>
              )}
            </>
          </View>
          {/* 虚拟资产 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgba(217, 217, 217, 0.53)',
                borderRadius: 8,
                marginTop: 16,
                padding: 16,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row' },
                dimensions.width
              )}
            >
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                resizeMode={'contain'}
                source={imageSource(Images['iccheckother'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 20, width: 20 }
                  ),
                  dimensions.width
                )}
              />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['15 Regular'].style,
                    {
                      color: palettes.Brand.itemTextNomal,
                      flex: 1,
                      fontFamily: 'System',
                      fontWeight: '600',
                      marginLeft: 8,
                      marginRight: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'setting_account_check_other')}
              </Text>
              {/* Image 2 */}
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                resizeMode={'contain'}
                source={imageSource(
                  isAbandonOther
                    ? Images['icstatusvector']
                    : Images['icstatuswarning']
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { height: 18, width: 18 }
                  ),
                  dimensions.width
                )}
              />
            </View>

            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['15 Regular'].style,
                  {
                    color: palettes.App['Custom Color 4'],
                    lineHeight: 22,
                    marginTop: 16,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'setting_account_check_other_content')}
            </Text>
            {/* Touchable 2 */}
            <>
              {isAbandonOther ? null : (
                <Touchable
                  onPress={() => {
                    try {
                      setTip_title(t(Variables, 'setting_other_has'));
                      setTip_message(t(Variables, 'setting_other_has_sure'));
                      setTip_type(2);
                      setTip_modal_visiable(true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { marginTop: 16 },
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
                        theme.typography.body1,
                        { color: palettes.App['Custom Color 59'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'setting_confirm_discard')}
                  </Text>
                </Touchable>
              )}
            </>
          </View>

          <Touchable
            onPress={() => {
              try {
                setIsReadTerm(!isReadTerm);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', marginTop: 24 },
                dimensions.width
              )}
            >
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                resizeMode={'cover'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                source={imageSource(
                  isReadTerm
                    ? Images['icselectactive']
                    : Images['icselectdefault']
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    {
                      height: 18,
                      marginBottom: 5,
                      marginLeft: 5,
                      marginTop: 5,
                      width: 18,
                    }
                  ),
                  dimensions.width
                )}
              />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['14 Regular'].style,
                    theme.typography.body1,
                    { marginLeft: 6 }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'setting_read_and_agree')}
                <Link
                  accessible={true}
                  onPress={() => {
                    try {
                      if (Constants['current_lang'] === 'CN') {
                        navigation.push('WebViewScreen', {
                          url: 'https://terms.acecamptech.com/agreement/cancellation/en. html',
                        });
                      } else {
                        navigation.push('WebViewScreen', {
                          url: 'https://terms.acecamptech.com/agreement/cancellation/zh-CN.html',
                        });
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  selectable={false}
                  {...GlobalStyles.LinkStyles(theme)['Link'].props}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.LinkStyles(theme)['Link'].style,
                    dimensions.width
                  )}
                  title={`${t(
                    Variables,
                    'setting_account_cancellation_agreement'
                  )}`}
                />
              </Text>
            </View>
          </Touchable>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingLeft: 16,
              paddingRight: 16,
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
                  navigation.push('AccountCancellationReasonScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              disabled={!can_submit}
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
                        value: can_submit ? '#ff4b4b' : '#c6d0d9',
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
                  {t(Variables, 'setting_account_cancellation_sure')}
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
      </SimpleStyleScrollView>

      <AceCampTestApi.FetchAssetsInfoGET
        handlers={{
          onData: fetchData => {
            try {
              console.log(fetchData);
              if (!fetchData?.data) {
                return;
              }
              setInfo_data(fetchData?.data);
              setIsAbandonBuy(!info_data?.has_unconsumed_order);
              setIsAbandonPoint(
                parseFloat(fetchData?.data?.user_card_balance, 10) <= 0
              );
              setIsAbandonVIP(!fetchData?.data?.has_vip);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        id={Constants['user_info']?.id}
      >
        {({ loading, error, data, refetchAssetsInfo }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <View />;
          }

          return null;
        }}
      </AceCampTestApi.FetchAssetsInfoGET>
      {/* 删除提示框 */}
      <Utils.CustomCodeErrorBoundary>
        <ConfirmDialog.ConfirmDialog
          title={tip_title}
          message={tip_message}
          cancelBtn={t(Variables, 'setting_confirm_discard_yes')}
          confirmBtn={t(Variables, 'setting_think_more')}
          onConfirm={() => {
            setTip_modal_visiable(false);
          }}
          onCancel={set_abandon}
          visible={tip_modal_visiable}
        />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(AccountCancellationCheckScreen);
