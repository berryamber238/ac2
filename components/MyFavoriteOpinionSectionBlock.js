import React from 'react';
import { Divider, Icon, withTheme } from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  dataItem: {
    id: 43,
    item: {
      id: 49,
      type: 'industry',
      user: {
        id: 10000387,
        name: '个人bil崔',
        avatar: null,
        deleted: false,
        nickname: '个人bil崔',
        position: '',
        sns_career_name: '',
        organization_name: '',
        management_scale_id: null,
        organization_type_id: 3,
      },
      title: '0106行业观点',
      content:
        '李宁3季度跑输行业，折扣加深，4季度的能见度低3季度的流水同比下降中个位数，弱于2季度的低单位数下滑。对比安踏（增长中单），361度（增长LT）等竞对，李宁的市场份额明显下滑。3季度奥莱同比持平，比上半年的增速明显变弱，估计是正价店打折，3季度线下折扣同比加深，影响奥莱折扣店的客流和需求。中国李宁的渠道还在收缩调整，未来不作为销量增长的品类，而是作为品牌调性和文化的象征。折扣加深是流水较弱的结果，而不是原因。流水不及管理层的预期，自然要加大折扣来去库存。管理层6月份看到...',
      parent_id: null,
      cover_image: null,
      release_time: 1736146555,
      stock_tracing: {
        duration: null,
        start_time: null,
        actual_change: 0,
        current_price: '0.0',
        initial_price: '0.0',
        expected_change: null,
      },
      expected_trend: 'bearish',
    },
    item_id: 49,
    item_type: 'Opinion',
    created_at: 1739975627,
    updated_at: 1739975627,
    favorite_id: 220,
  },
  gotoScreen: () => {},
};

const MyFavoriteOpinionSectionBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View
      style={StyleSheet.applyWidth(
        { marginBottom: 10, marginTop: 10 },
        dimensions.width
      )}
    >
      {/* 本营观点 */}
      <View
        style={StyleSheet.applyWidth(
          { paddingLeft: 16, paddingRight: 16 },
          dimensions.width
        )}
      >
        {/* 标题和涨跌幅 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            dimensions.width
          )}
        >
          {/* 标题 */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flex: 1, flexDirection: 'row' },
              dimensions.width
            )}
          >
            {/* 观点文本-谨慎 */}
            <>
              {!(
                (props.dataItem ?? defaultProps.dataItem)?.item
                  ?.expected_trend === 'bearish'
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.App['Custom Color 21'],
                      borderRadius: 3,
                      flexDirection: 'row',
                      height: 24,
                      marginRight: 4,
                      paddingLeft: 5,
                      paddingRight: 5,
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    color={palettes.App.White}
                    name={'Feather/trending-down'}
                    size={12}
                    style={StyleSheet.applyWidth(
                      { marginRight: 3 },
                      dimensions.width
                    )}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App.White,
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          lineHeight: 16,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'tab_create_point_personal_3')}
                  </Text>
                </View>
              )}
            </>
            {/* 观点文本-正面 */}
            <>
              {!(
                (props.dataItem ?? defaultProps.dataItem)?.item
                  ?.expected_trend === 'bullish'
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.App['Custom Color 12'],
                      borderRadius: 2,
                      flexDirection: 'row',
                      height: 24,
                      marginRight: 4,
                      paddingLeft: 5,
                      paddingRight: 5,
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    color={palettes.App.White}
                    name={'Feather/trending-up'}
                    size={12}
                    style={StyleSheet.applyWidth(
                      { marginRight: 3 },
                      dimensions.width
                    )}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App.White,
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          lineHeight: 16,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'tab_create_point_personal_1')}
                  </Text>
                </View>
              )}
            </>
            {/* 观点文本-中性 */}
            <>
              {!(
                (props.dataItem ?? defaultProps.dataItem)?.item
                  ?.expected_trend === 'none'
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.App['Custom Color 22'],
                      borderRadius: 2,
                      flexDirection: 'row',
                      height: 24,
                      marginRight: 4,
                      paddingLeft: 5,
                      paddingRight: 5,
                    },
                    dimensions.width
                  )}
                >
                  <Icon
                    color={palettes.App.White}
                    name={'Feather/activity'}
                    size={12}
                    style={StyleSheet.applyWidth(
                      { marginRight: 3 },
                      dimensions.width
                    )}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text Form Label 2']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text Form Label 2']
                          .style,
                        {
                          color: palettes.App.White,
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          lineHeight: 16,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'tab_create_point_personal_2')}
                  </Text>
                </View>
              )}
            </>
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'flex-start', flex: 1, flexDirection: 'row' },
                dimensions.width
              )}
            >
              {/* 主题 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                allowFontScaling={false}
                numberOfLines={1}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Title'].style,
                    { fontSize: 16, lineHeight: 24 }
                  ),
                  dimensions.width
                )}
              >
                {(props.dataItem ?? defaultProps.dataItem)?.item?.type ===
                'industry'
                  ? (props.dataItem ?? defaultProps.dataItem)?.item?.title
                  : (props.dataItem ?? defaultProps.dataItem)?.item
                      ?.stock_tracing?.tracing_corporation?.name}
                {(props.dataItem ?? defaultProps.dataItem)?.item?.type ===
                'stock'
                  ? '(' +
                    (props.dataItem ?? defaultProps.dataItem)?.data
                      ?.stock_tracing?.tracing_corporation?.ticker +
                    ')'
                  : undefined}
              </Text>
            </View>
          </View>

          <View>
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text Title'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text Title'].style,
                  {
                    color: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.App['Custom Color 22'],
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          (props.dataItem ?? defaultProps.dataItem)?.source
                            ?.expected_trend === 'bearish'
                            ? palettes.App['Custom Color 21']
                            : (props.dataItem ?? defaultProps.dataItem)?.source
                                ?.expected_trend === 'bullish'
                            ? palettes.App['Custom Color 12']
                            : palettes.App['Custom Color 22'],
                      },
                    ],
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 24,
                  }
                ),
                dimensions.width
              )}
            >
              {
                (props.dataItem ?? defaultProps.dataItem)?.item?.stock_tracing
                  ?.actual_change
              }
              {'%'}
            </Text>
          </View>
        </View>
        {/* 作者 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              alignSelf: 'flex-start',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginTop: 10,
            },
            dimensions.width
          )}
        >
          <>
            {!(props.dataItem ?? defaultProps.dataItem)?.item?.user
              ?.avatar ? null : (
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(
                  `${
                    (props.dataItem ?? defaultProps.dataItem)?.item?.user
                      ?.avatar
                  }`
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { borderRadius: 16, height: 16, marginRight: 10, width: 16 }
                  ),
                  dimensions.width
                )}
              />
            )}
          </>
          {/* Image 2 */}
          <>
            {(props.dataItem ?? defaultProps.dataItem)?.item?.user
              ?.avatar ? null : (
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={
                  imageSource(Images['icheadercompany']) ??
                  imageSource(
                    `${
                      (props.dataItem ?? defaultProps.dataItem)?.data?.user
                        ?.avatar
                    }`
                  )
                }
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { borderRadius: 16, height: 16, marginRight: 10, width: 16 }
                  ),
                  dimensions.width
                )}
              />
            )}
          </>
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text Title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text Title'].style,
                {
                  color: palettes.App['Custom Color 4'],
                  fontFamily: 'System',
                  fontSize: 12,
                  fontWeight: '400',
                  lineHeight: 20,
                }
              ),
              dimensions.width
            )}
          >
            {(props.dataItem ?? defaultProps.dataItem)?.item?.user?.name}
          </Text>
        </View>
        {/* 简介 */}
        <View
          style={StyleSheet.applyWidth({ paddingTop: 10 }, dimensions.width)}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text Title'].props}
            numberOfLines={3}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text Title'].style,
                {
                  color: palettes.App['Custom Color 77'],
                  fontFamily: 'System',
                  fontSize: 13,
                  fontWeight: '400',
                  lineHeight: 18,
                }
              ),
              dimensions.width
            )}
          >
            {(props.dataItem ?? defaultProps.dataItem)?.item?.content}
          </Text>
        </View>
        {/* 类别与作者 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderColor: palettes.Brand.appStyle_primary,
                borderWidth: 1,
                padding: 2,
              },
              dimensions.width
            )}
          >
            {/* Text 2 */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(theme.typography.body1, {
                  color: palettes.Brand.appStyle_primary,
                  fontFamily: 'System',
                  fontSize: 10,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 14,
                }),
                dimensions.width
              )}
            >
              {t(Variables, 'tab_circle')}
            </Text>
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text Form Label 2'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text Form Label 2'].style,
                  {
                    alignSelf: 'flex-end',
                    color: palettes.App['Custom Color 11'],
                    fontFamily: 'System',
                    fontSize: 11,
                    fontWeight: '400',
                    lineHeight: 14,
                  }
                ),
                dimensions.width
              )}
            >
              {t(Variables, 'mine_send_time')}
              {fromUnixTimestamp(
                Variables,
                (props.dataItem ?? defaultProps.dataItem)?.item?.release_time,
                'YYYY/MM/DD'
              )}
            </Text>
          </View>
        </View>
        <Divider
          {...GlobalStyles.DividerStyles(theme)['Divider'].props}
          color={palettes.App['Custom Color 4']}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.DividerStyles(theme)['Divider'].style,
              { marginTop: 10 }
            ),
            dimensions.width
          )}
        />
      </View>
    </View>
  );
};

export default withTheme(MyFavoriteOpinionSectionBlock);
