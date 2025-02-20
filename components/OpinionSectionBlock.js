import React from 'react';
import { Divider, Icon, Touchable, withTheme } from '@draftbit/ui';
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
    data: {
      id: 3254,
      type: 'stock',
      user: {
        id: 50517705,
        name: 'Burry',
        avatar:
          'https://image.acecamptech.com/avatar/50517705/0.9402162046600999.jpg',
        deleted: false,
        is_self: false,
        identity: 'unreal',
        nickname: 'Burry',
        position: '',
        fund_type_ids: [],
        sns_career_name: '',
        organization_name: '',
        tournament_winner: null,
        management_scale_id: null,
        organization_type_id: 3,
        organization_identity: 'hide',
      },
      title: '',
      content:
        '笔者之前写过一篇QRVO业绩暴雷 https://www.acecamptech.com/viewpoint/detail/3201 ，今天它的同行SWKS也暴雷了：Non-GAAP net income of $1.55 per diluted share, down from $2.20 a year earlier. Analysts polled by Capital IQ expected $1.52.Revenue for the quarter ended Sept. 27 was $1.02 billion, compared with $1.22 billion a year earlier. Analysts expected $1.02 billion.For Q1, the company is projecting non-GAAP EPS of $1.57 at the midpoint of the revenue range between $1.05 billion and $1.08 billion. Analysts polled by Capital IQ are looking for $1.72 and $1.10 billion, respectively.公司CEO解释原因是：weak demand from automotive and industrial clients. Slowing sales of electric vehicles at a time when some customers are clearing excess inventory have hit demand.事实上美国制造业回流如火如荼，中国电动车销量继续大涨，SWKS的理由并不充分，更多是它自己在竞争中落后了，被中国企业卷死，还气急败坏发起专利诉讼。来源：巨潮网SWKS已经连续8个季度收入下滑，明年估计还要下滑，这已经不是cyclical downturn，它是secular loser了。',
      visible: true,
      parent_id: null,
      like_count: 1,
      start_time: 1731506101,
      updated_at: 1731506572,
      view_count: 1883,
      cover_image: null,
      release_time: 1731506101,
      comment_count: 0,
      dislike_count: 0,
      stock_tracing: {
        duration: 36,
        start_time: 1731506101,
        actual_change: 0,
        current_price: '83.09',
        initial_price: '83.09',
        expected_change: -30,
        tracing_corporation: {
          id: 15087,
          name: '思佳讯',
          ticker: 'US.SWKS',
          currency: 'USD',
        },
      },
      expected_trend: 'bearish',
      favorite_count: 0,
      related_topics: [],
      sns_action_flag: {
        liked: false,
        disliked: false,
        favorited: false,
        following: false,
        favorite_ids: [],
      },
      recent_view_time: 1731584382,
      expected_start_time: 1731506101,
      tournament_like_count: 0,
    },
    item_id: 3254,
    item_type: 'Opinion',
    updated_at: 1731506572,
  },
  gotoScreen: () => {},
};

const OpinionSectionBlock = props => {
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
      <Touchable
        onPress={() => {
          try {
            props.gotoScreen?.(
              'Opinion',
              (props.dataItem ?? defaultProps.dataItem)?.data?.id
            );
          } catch (err) {
            console.error(err);
          }
        }}
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
                  (props.dataItem ?? defaultProps.dataItem)?.data
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
                  (props.dataItem ?? defaultProps.dataItem)?.data
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
                  (props.dataItem ?? defaultProps.dataItem)?.data
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
                  {(props.dataItem ?? defaultProps.dataItem)?.data?.type ===
                  'industry'
                    ? (props.dataItem ?? defaultProps.dataItem)?.data?.title
                    : (props.dataItem ?? defaultProps.dataItem)?.data
                        ?.stock_tracing?.tracing_corporation?.name}
                  {(props.dataItem ?? defaultProps.dataItem)?.data?.type ===
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
                              : (props.dataItem ?? defaultProps.dataItem)
                                  ?.source?.expected_trend === 'bullish'
                              ? palettes.App['Custom Color 12']
                              : palettes.App['Custom Color 22'],
                        },
                      ],
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '400',
                    }
                  ),
                  dimensions.width
                )}
              >
                {
                  (props.dataItem ?? defaultProps.dataItem)?.data?.stock_tracing
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
              {!(props.dataItem ?? defaultProps.dataItem)?.data?.user
                ?.avatar ? null : (
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(
                    `${
                      (props.dataItem ?? defaultProps.dataItem)?.data?.user
                        ?.avatar
                    }`
                  )}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      {
                        borderRadius: 16,
                        height: 25,
                        marginRight: 10,
                        width: 25,
                      }
                    ),
                    dimensions.width
                  )}
                />
              )}
            </>
            {/* Image 2 */}
            <>
              {(props.dataItem ?? defaultProps.dataItem)?.data?.user
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
                      {
                        borderRadius: 16,
                        height: 25,
                        marginRight: 10,
                        width: 25,
                      }
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
                  { fontFamily: 'System', fontSize: 14, fontWeight: '600' }
                ),
                dimensions.width
              )}
            >
              {(props.dataItem ?? defaultProps.dataItem)?.data?.user?.name}
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
              numberOfLines={2}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text Title'].style,
                  {
                    color: palettes.App['Custom Color 23'],
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 18,
                  }
                ),
                dimensions.width
              )}
            >
              {(props.dataItem ?? defaultProps.dataItem)?.data?.content}
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
            {/* View 3 */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flex: 1, flexDirection: 'row' },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Title'].style,
                    {
                      color: 'rgb(152, 163, 172)',
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'common_likes')}{' '}
                {(props.dataItem ?? defaultProps.dataItem)?.data?.like_count}
              </Text>
              {/* Text 3 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Title'].style,
                    {
                      color: 'rgb(152, 163, 172)',
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      marginLeft: 8,
                      marginRight: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'my_point_comment_num')}{' '}
                {(props.dataItem ?? defaultProps.dataItem)?.data?.comment_count}
              </Text>
              {/* Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Title'].style,
                    {
                      color: 'rgb(152, 163, 172)',
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                    }
                  ),
                  dimensions.width
                )}
              >
                {t(Variables, 'common_read')}{' '}
                {(props.dataItem ?? defaultProps.dataItem)?.data?.view_count}
              </Text>
            </View>

            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
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
                      fontWeight: '700',
                    }
                  ),
                  dimensions.width
                )}
              >
                {fromUnixTimestamp(
                  Variables,
                  (props.dataItem ?? defaultProps.dataItem)?.data
                    ?.recent_view_time,
                  'YYYY-MM-DD HH:mm'
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
      </Touchable>
    </View>
  );
};

export default withTheme(OpinionSectionBlock);
