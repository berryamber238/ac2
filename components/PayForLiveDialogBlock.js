import React from 'react';
import { Button, ExpoImage, Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import StringFormat from '../global-functions/StringFormat';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  callback: () => {},
  payNum: 100,
  prepay: [
    {
      card: null,
      gift: 8839,
      unit: 'A',
      state: 'available',
      title: 'prepay',
      expire: null,
      sncode: '5911004256',
      balance: 8839,
      expired: null,
      en_title: 'prepay',
      sc_title: 'prepay',
      available: true,
      card_type: 'prepay',
      created_at: 1650862414,
      owner_type: 'Organization',
      start_time: 1650862914,
    },
    {
      card: null,
      gift: 2000,
      unit: 'A',
      state: 'available',
      title: 'prepay',
      expire: null,
      sncode: '2101503069',
      balance: 3000,
      expired: null,
      en_title: 'prepay',
      sc_title: 'prepay',
      available: true,
      card_type: 'prepay',
      created_at: 1678098215,
      owner_type: 'Organization',
      start_time: null,
    },
    {
      card: null,
      gift: 0,
      unit: 'A',
      state: 'available',
      title: 'prepay',
      expire: null,
      sncode: '5212008040',
      balance: 9600,
      expired: null,
      en_title: 'prepay',
      sc_title: 'prepay',
      available: true,
      card_type: 'prepay',
      created_at: 1659594445,
      owner_type: 'Organization',
      start_time: null,
    },
    {
      card: null,
      gift: 1000,
      unit: 'A',
      state: 'available',
      title: 'prepay',
      expire: null,
      sncode: '9819003070',
      balance: 2000,
      expired: null,
      en_title: 'prepay',
      sc_title: 'prepay',
      available: true,
      card_type: 'prepay',
      created_at: 1678175630,
      owner_type: 'Organization',
      start_time: null,
    },
    {
      card: null,
      gift: 1000,
      unit: 'A',
      state: 'available',
      title: 'prepay',
      expire: null,
      sncode: '9819003033',
      balance: 2000,
      expired: null,
      en_title: 'prepay',
      sc_title: 'prepay',
      available: true,
      card_type: 'prepay',
      created_at: 1678175630,
      owner_type: 'User',
      start_time: null,
    },
  ],
};

const PayForLiveDialogBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [company, setCompany] = React.useState({});
  const [personal, setPersonal] = React.useState({});
  const [snCode, setSnCode] = React.useState('');
  const [style, setStyle] = React.useState(0);
  const getData = type => {
    const prepays = props.prepay ?? defaultProps.prepay;
    if (prepays !== null) {
      for (let i = 0; i < prepays.length; i++) {
        if (prepays[i].owner_type === type) {
          return prepays[i];
        }
      }
    }
    return null;
  };
  React.useEffect(() => {
    if (company) {
      setStyle(1);
    }
  }, [company]);
  React.useEffect(() => {
    try {
      const comp = getData('Organization');
      setCompany(comp);
      const pers = getData('User');
      setPersonal(pers);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App['Custom #ffffff'],
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center' },
          dimensions.width
        )}
      >
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              fontFamily: 'System',
              fontSize: 30,
              fontWeight: '700',
              marginBottom: 2,
              marginTop: 32,
            },
            dimensions.width
          )}
        >
          {props.payNum ?? defaultProps.payNum}
          {t(Variables, 'live_user_a_currency')}
        </Text>
      </View>
      {/* 英文提示 */}
      <>
        {Constants['current_lang'] === 'CN' ? null : (
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['12 Regular'].style,
                {
                  alignSelf: 'center',
                  color: palettes.Brand.itemTextNomal,
                  marginBottom: 14,
                }
              ),
              dimensions.width
            )}
          >
            {'('}
            {props.payNum ?? defaultProps.payNum}
            {t(Variables, 'live_user_a_currency')}
            {'=$'}
            {props.payNum ?? defaultProps.payNum}
            {'=￥'}
            {parseFloat(props.payNum ?? defaultProps.payNum, 10) * 6.8}
            {')'}
          </Text>
        )}
      </>
      {/* 中文提示 */}
      <>
        {!(Constants['current_lang'] === 'CN') ? null : (
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['12 Regular'].style,
                {
                  alignSelf: 'center',
                  color: palettes.Brand.itemTextNomal,
                  marginBottom: 14,
                }
              ),
              dimensions.width
            )}
          >
            {'('}
            {props.payNum ?? defaultProps.payNum}
            {t(Variables, 'live_user_a_currency')}
            {'='}
            {props.payNum ?? defaultProps.payNum}
            {'美元='}
            {parseFloat(props.payNum ?? defaultProps.payNum, 10) * 6.8}
            {'元)'}
          </Text>
        )}
      </>
      {/* Text 2 */}
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['14 Regular'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.TextStyles(theme)['14 Regular'].style,
            {
              color: palettes.Brand.itemTextNomal,
              fontFamily: 'System',
              fontWeight: '700',
              paddingBottom: 6,
              paddingLeft: 16,
            }
          ),
          dimensions.width
        )}
      >
        {t(Variables, 'live_pay_style')}
      </Text>
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes.Brand.itemTextNomal,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            flexDirection: 'row',
            height: 30,
            justifyContent: 'center',
            marginLeft: 16,
            marginRight: 16,
          },
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
          source={imageSource(Images['icminecurrencywhite'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
              { height: 16, width: 16 }
            ),
            dimensions.width
          )}
        />
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['13 Regular'].style,
              {
                color: palettes.App['Custom #ffffff'],
                fontFamily: 'System',
                fontWeight: '700',
                marginLeft: 6,
              }
            ),
            dimensions.width
          )}
        >
          {t(Variables, 'live_pay_buy_a')}
        </Text>
      </View>
      {/* View 3 */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes.App['Custom Color 14'],
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            marginLeft: 16,
            marginRight: 16,
            padding: 16,
          },
          dimensions.width
        )}
      >
        <Touchable
          onPress={() => {
            try {
              setStyle(1);
              setSnCode(company?.sncode);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <>
            {!company ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.Brand.appStyle_primary,
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          style === 1
                            ? palettes.Brand.appStyle_primary
                            : palettes.App['Custom #ffffff'],
                      },
                    ],
                    borderRadius: 4,
                    borderWidth: 1,
                    flexDirection: 'row',
                    marginBottom: 16,
                    padding: 12,
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
                  source={imageSource(Images['iccompanylogo'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                      { height: 32, width: 32 }
                    ),
                    dimensions.width
                  )}
                />
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 1, marginLeft: 12 },
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
                          color: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: palettes.Brand.appStyle_primary,
                            },
                            {
                              minWidth: Breakpoints.Mobile,
                              value:
                                parseFloat(
                                  props.payNum ?? defaultProps.payNum,
                                  10
                                ) > company?.balance
                                  ? '#c6d0d9'
                                  : palettes.Brand.appStyle_primary,
                            },
                          ],
                          fontFamily: 'System',
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'mine_company_coins')}
                  </Text>
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['12 Regular'].style,
                        { color: palettes.App['Custom Color 4'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {StringFormat(
                      t(Variables, 'mine_company_coins_num'),
                      [].concat([company?.balance])
                    )}
                  </Text>
                </View>

                <Touchable
                  onPress={() => {
                    try {
                      props.callback?.(1, undefined);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['13 Regular'].style,
                        {
                          color: palettes.Brand.appStyle_primary,
                          fontFamily: 'System',
                          fontWeight: '700',
                          padding: 4,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'live_recharge')}
                  </Text>
                </Touchable>
              </View>
            )}
          </>
        </Touchable>
        {/* Touchable 2 */}
        <Touchable
          onPress={() => {
            try {
              setSnCode(personal?.sncode);
              setStyle(2);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <>
            {!personal ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.Brand.appStyle_primary,
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          style === 1
                            ? palettes.App['Custom #ffffff']
                            : palettes.Brand.appStyle_primary,
                      },
                    ],
                    borderRadius: 4,
                    borderWidth: 1,
                    flexDirection: 'row',
                    padding: 12,
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
                  source={imageSource(Images['icpersonallogo'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                      { height: 32, width: 32 }
                    ),
                    dimensions.width
                  )}
                />
                <View
                  style={StyleSheet.applyWidth(
                    { flex: 1, marginLeft: 12 },
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
                          color: [
                            {
                              minWidth: Breakpoints.Mobile,
                              value: palettes.Brand.appStyle_primary,
                            },
                            {
                              minWidth: Breakpoints.Mobile,
                              value:
                                parseFloat(
                                  props.payNum ?? defaultProps.payNum,
                                  10
                                ) > personal?.balance
                                  ? '#c6d0d9'
                                  : palettes.Brand.appStyle_primary,
                            },
                          ],
                          fontFamily: 'System',
                          fontWeight: '700',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'mine_company_coins')}
                  </Text>
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['12 Regular'].style,
                        { color: palettes.App['Custom Color 4'] }
                      ),
                      dimensions.width
                    )}
                  >
                    {StringFormat(
                      t(Variables, 'mine_personal_coins_num'),
                      [].concat([personal?.balance])
                    )}
                  </Text>
                </View>

                <Touchable
                  onPress={() => {
                    try {
                      props.callback?.(1, undefined);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['13 Regular'].style,
                        {
                          color: palettes.Brand.appStyle_primary,
                          fontFamily: 'System',
                          fontWeight: '700',
                          padding: 4,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'live_recharge')}
                  </Text>
                </Touchable>
              </View>
            )}
          </>
        </Touchable>
      </View>
      {/* Text 3 */}
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['12 Regular'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.TextStyles(theme)['12 Regular'].style,
            {
              color: palettes.Brand.itemTextNomal,
              fontFamily: 'System',
              fontWeight: '700',
              marginBottom: 20,
              marginLeft: 16,
              marginRight: 16,
              marginTop: 4,
            }
          ),
          dimensions.width
        )}
      >
        {t(Variables, 'live_recharge_remind')}
      </Text>
      <Button
        accessible={true}
        iconPosition={'left'}
        onPress={() => {
          try {
            props.callback?.(2, snCode);
          } catch (err) {
            console.error(err);
          }
        }}
        {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
        disabled={
          style === 1
            ? parseFloat(props.payNum ?? defaultProps.payNum, 10) >
              company?.balance
              ? true
              : false
            : parseFloat(props.payNum ?? defaultProps.payNum, 10) >
              personal?.balance
            ? true
            : false
        }
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
            theme.typography.button,
            {
              backgroundColor: palettes.Brand.appStyle_primary,
              borderRadius: 4,
              fontSize: 14,
              marginBottom: 20,
              marginLeft: 16,
              marginRight: 16,
              marginTop: 20,
            }
          ),
          dimensions.width
        )}
        title={`${t(Variables, 'live_immediately_payment')}`}
      />
    </View>
  );
};

export default withTheme(PayForLiveDialogBlock);
