import React from 'react';
import { ExpoImage, Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import ShowToast from '../global-functions/ShowToast';
import StringFormat from '../global-functions/StringFormat';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { articleId: null, type: 'upgrade_vip' };

const UpgradeVipDialogBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const aceCampTestRemindBuyPOST = AceCampTestApi.useRemindBuyPOST();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App['Custom #ffffff'],
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 16,
        },
        dimensions.width
      )}
    >
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
        <>
          {!((props.type ?? defaultProps.type) === 'upgrade_vip') ? null : (
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['16_Title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['16_Title'].style,
                  theme.typography.body1,
                  { fontFamily: 'System', fontWeight: '700' }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'mine_upgrade_vip')}
            </Text>
          )}
        </>
      </View>
      <>
        {!((props.type ?? defaultProps.type) === 'upgrade_vip') ? null : (
          <Touchable
            onPress={() => {
              try {
                navigation.push('VipInfoScreen');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: 'rgba(87, 134, 255, 0.1)',
                  borderRadius: 4,
                  marginTop: 16,
                  paddingBottom: 10,
                  paddingTop: 10,
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
                    {
                      color: palettes.App['Custom Color 56'],
                      fontFamily: 'System',
                      fontWeight: '700',
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'mine_check_my_rights')}
              </Text>
            </View>
          </Touchable>
        )}
      </>
      {/* View 4 */}
      <>
        {!((props.type ?? defaultProps.type) !== 'upgrade_vip') ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.App['Custom Color 95'],
                marginTop: 16,
                paddingBottom: 10,
                paddingTop: 10,
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
                  {
                    color: palettes.App['Custom Color 94'],
                    fontFamily: 'System',
                    fontWeight: '700',
                  }
                ),
                dimensions.width
              )}
            >
              {StringFormat(
                t(Variables, 'mine_delay_can_use_content'),
                props.type ?? defaultProps.type
              )}
            </Text>
          </View>
        )}
      </>
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.TextStyles(theme)['14 Regular'].style,
            { color: palettes.Brand.itemTextNomal, marginTop: 8 }
          ),
          dimensions.width
        )}
      >
        {t(Variables, '@string/mine_need_upgrade_contact')}
      </Text>
      {/* View 3 */}
      <>
        {!(Constants['customer_info']?.length > 0) ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App['Custom Color 14'],
                borderRadius: 8,
                marginTop: 16,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 12,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    fontFamily: 'System',
                    fontSize: 20,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 22,
                  },
                  dimensions.width
                )}
              >
                {Constants['customer_info'] &&
                  Constants['customer_info'][0]?.name}
              </Text>

              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: palettes.Brand.appStyle_primary,
                    borderRadius: 4,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingBottom: 4,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 4,
                  },
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
                  source={imageSource(Images['iccomments'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                      {
                        height: 18,
                        marginBottom: 4,
                        marginLeft: 4,
                        marginRight: 4,
                        marginTop: 4,
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
                      { color: palettes.App['Custom #ffffff'] }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'live_try_vip_comments')}
                </Text>
              </View>
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', marginTop: 16 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  dimensions.width
                )}
              >
                {t(Variables, 'live_phone')}
              </Text>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  dimensions.width
                )}
              >
                {': '}
                {Constants['customer_info'] &&
                  Constants['customer_info'][0].phone_number}
              </Text>
            </View>
            {/* View 4 */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', marginTop: 16 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  dimensions.width
                )}
              >
                {t(Variables, 'common_email')}
              </Text>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  dimensions.width
                )}
              >
                {': '}
                {Constants['customer_info'] &&
                  Constants['customer_info'][0]?.email}
              </Text>
            </View>
          </View>
        )}
      </>
      {/* View 5 */}
      <>
        {!(Constants['customer_info']?.length > 1) ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App['Custom Color 14'],
                borderRadius: 8,
                marginTop: 16,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 12,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    fontFamily: 'System',
                    fontSize: 20,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 22,
                  },
                  dimensions.width
                )}
              >
                {Constants['customer_info'] &&
                  Constants['customer_info'][1]?.name}
              </Text>

              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: palettes.Brand.appStyle_primary,
                    borderRadius: 4,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingBottom: 4,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 4,
                  },
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
                  source={imageSource(Images['iccomments'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                      {
                        height: 18,
                        marginBottom: 4,
                        marginLeft: 4,
                        marginRight: 4,
                        marginTop: 4,
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
                      { color: palettes.App['Custom #ffffff'] }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'live_try_vip_comments')}
                </Text>
              </View>
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', marginTop: 16 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  dimensions.width
                )}
              >
                {t(Variables, 'live_phone')}
              </Text>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  dimensions.width
                )}
              >
                {': '}
                {Constants['customer_info'] &&
                  Constants['customer_info'][1]?.phone_number}
              </Text>
            </View>
            {/* View 4 */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', marginTop: 16 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  dimensions.width
                )}
              >
                {t(Variables, 'common_email')}
              </Text>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['12 Regular'].style,
                  dimensions.width
                )}
              >
                {': '}
                {Constants['customer_info'] &&
                  Constants['customer_info'][1]?.email}
              </Text>
            </View>
          </View>
        )}
      </>
      {/* Touchable 2 */}
      <Touchable
        onPress={() => {
          const handler = async () => {
            try {
              const result = (
                await aceCampTestRemindBuyPOST.mutateAsync({
                  resource_id: props.articleId ?? defaultProps.articleId,
                  resource_type: 'Article',
                })
              )?.json;
              ShowToast(
                result?.code === 200
                  ? t(Variables, 'mine_remind_success')
                  : result?.msg,
                undefined,
                undefined
              );
            } catch (err) {
              console.error(err);
            }
          };
          handler();
        }}
      >
        {/* View 6 */}
        <>
          {!((props.type ?? defaultProps.type) !== 'upgrade_vip') ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: palettes.Brand.appStyle_primary,
                  borderRadius: 4,
                  marginTop: 16,
                  padding: 16,
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
                    { color: palettes.App['Custom #ffffff'] }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'mine_add_reminder')}
              </Text>
            </View>
          )}
        </>
      </Touchable>
    </View>
  );
};

export default withTheme(UpgradeVipDialogBlock);
