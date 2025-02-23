import React from 'react';
import { Divider, ExpoImage, Icon, Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import t from '../global-functions/t';
import timesAgo from '../global-functions/timesAgo';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  item: {
    id: 62,
    type: 'stock',
    user: {
      id: 10000412,
      name: 'Test LL',
      avatar: null,
      deleted: false,
      is_self: true,
      identity: 'real',
      nickname: '用户10000412',
      position: 'Chairman',
      fund_type_ids: [7, 5],
      sns_career_name: '私募股权投资/风险投资 Chairman',
      organization_name: '',
      management_scale_id: null,
      organization_type_id: 5,
      organization_identity: 'hide',
    },
    state: 'draft',
    title: '',
    parent: null,
    content:
      'Thanks for letting me know and for the weekend and the weekend and for the day and the weekend and the weekend and for me I will 😁 the day 😊😀😀😀😀😁',
    user_id: 10000412,
    viewers: [],
    visible: true,
    outdated: false,
    is_author: true,
    parent_id: null,
    created_at: 1737195383,
    disclaimer: true,
    expired_at: 1744990132,
    industries: [{ id: 3520, name: '制药、生物科技和生命科学' }],
    like_count: 0,
    start_time: 1737214132,
    tournament: null,
    updated_at: 1737214133,
    view_count: 0,
    attachments: [],
    contributed: false,
    cover_image: null,
    share_count: 0,
    corporations: [],
    industry_ids: [3520],
    release_time: 1737195383,
    comment_count: 0,
    dislike_count: 0,
    stock_tracing: {
      duration: 3,
      start_time: 1737214132,
      actual_change: 0,
      current_price: '0.0',
      initial_price: '0.0',
      expected_change: 50,
      tracing_corporation: {
        id: 3,
        name: '国华网安',
        ticker: 'SZ.000004',
        currency: 'CNY',
        industry_id: 3520,
        follower_count: 0,
        sns_action_flag: { following: false },
      },
    },
    tournament_id: null,
    expected_trend: 'bullish',
    favorite_count: 0,
    related_topics: [],
    corporation_ids: [],
    rejected_reason: null,
    recent_view_time: 1737195383,
    custom_sector_ids: [],
    tournament_winner: null,
    initial_price_time: 1737214132,
    latest_cover_image: null,
    merged_attachments: [],
    core_points_updated: true,
    expected_start_time: 1737214132,
    family_tournament_id: null,
    in_closed_tournament: false,
    is_tournament_winner: false,
    recommended_opinions: [],
    tracing_opinion_count: 0,
    current_price_updated_at: null,
    last_tracing_release_time: 1737195383,
    has_pending_tracing_opinion: false,
    merged_recommended_opinions: [],
  },
  onDelete: () => {},
  onRecall: () => {},
};

const MyOpinionSectionBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  return (
    <View
      style={StyleSheet.applyWidth(
        { width: dimensions.width - 32 },
        dimensions.width
      )}
    >
      <Touchable
        onPress={() => {
          try {
            if ((props.item ?? defaultProps.item)?.state === 'passed') {
              navigation.push('WebViewScreen', {
                url:
                  (props.item ?? defaultProps.item)?.type === 'stock'
                    ? (props.item ?? defaultProps.item)?.parent_id
                      ? Constants['base_url'] +
                        '/viewpoint/detail/' +
                        (props.item ?? defaultProps.item)?.parent_id
                      : Constants['base_url'] +
                        '/viewpoint/detail/' +
                        (props.item ?? defaultProps.item)?.id
                    : Constants['base_url'] +
                      ('/viewpoint/detail/' +
                        (props.item ?? defaultProps.item)?.id),
              });
            } else {
              navigation.push('WebViewScreen', {
                url:
                  Constants['base_url'] +
                  ('/viewpoint/preview?id=' +
                    (props.item ?? defaultProps.item)?.id),
              });
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {/* 本营观点 */}
        <View>
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
              {/* 草稿 */}
              <>
                {!(
                  (props.item ?? defaultProps.item)?.state === 'draft'
                ) ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      { marginRight: 10 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.App['Custom Color 67'],
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '700',
                          letterSpacing: 0.2,
                          lineHeight: 24,
                        },
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'tab_create_point_draft')}
                    </Text>
                  </View>
                )}
              </>
              {/* 审核中 */}
              <>
                {!(
                  (props.item ?? defaultProps.item)?.state === 'pending'
                ) ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      { marginRight: 10 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.App['Custom Color 22'],
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '700',
                          letterSpacing: 0.2,
                          lineHeight: 24,
                        },
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'mine_under_review')}
                    </Text>
                  </View>
                )}
              </>
              {/* 驳回 */}
              <>
                {!(
                  (props.item ?? defaultProps.item)?.state === 'rejected'
                ) ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      { marginRight: 10 },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.App['Custom Color 12'],
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '700',
                          letterSpacing: 0.2,
                          lineHeight: 24,
                        },
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'common_reject')}
                    </Text>
                  </View>
                )}
              </>
              {/* 观点文本-谨慎 */}
              <>
                {!(
                  (props.item ?? defaultProps.item)?.expected_trend ===
                  'bearish'
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
                  (props.item ?? defaultProps.item)?.expected_trend ===
                  'bullish'
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
                  (props.item ?? defaultProps.item)?.expected_trend === 'none'
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
              {/* 主题 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'flex-start', flexDirection: 'row' },
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
                      {
                        flex: 1,
                        fontSize: 16,
                        lineHeight: 24,
                        marginRight: null,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {(props.item ?? defaultProps.item)?.type === 'stock'
                    ? (props.item ?? defaultProps.item)?.stock_tracing
                        ?.tracing_corporation?.name
                    : (props.item ?? defaultProps.item)?.title}
                  {(props.item ?? defaultProps.item)?.type === 'stock'
                    ? '(' +
                      (props.item ?? defaultProps.item)?.stock_tracing
                        ?.tracing_corporation?.ticker +
                      ')'
                    : undefined}
                </Text>
              </View>
            </View>
            {/* 百分比 */}
            <>
              {!(
                (props.item ?? defaultProps.item)?.type === 'stock' &&
                (props.item ?? defaultProps.item)?.state === 'passed'
              ) ? null : (
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
                                (props.item ?? defaultProps.item)
                                  ?.expected_trend === 'bullish'
                                  ? palettes.App['Custom Color 21']
                                  : (props.item ?? defaultProps.item)
                                      ?.expected_trend === 'bearish'
                                  ? palettes.App['Custom Color 12']
                                  : palettes.App['Custom Color 22'],
                            },
                          ],
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '400',
                          marginRight: null,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      (props.item ?? defaultProps.item)?.stock_tracing
                        ?.expected_change
                    }
                    {'%'}
                  </Text>
                </View>
              )}
            </>
          </View>
          {/* 驳回理由 */}
          <>
            {!(
              (props.item ?? defaultProps.item)?.state === 'rejected'
            ) ? null : (
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
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color 12'],
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'mine_reject_reason')}
                  {(props.item ?? defaultProps.item)?.rejected_reason}
                </Text>
              </View>
            )}
          </>
          {/* 简介 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-start',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 6,
              },
              dimensions.width
            )}
          >
            {/* 内容 */}
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
                    flex: 1,
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 24,
                  }
                ),
                dimensions.width
              )}
            >
              {(props.item ?? defaultProps.item)?.content}
            </Text>
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              resizeMode={'cover'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              {...GlobalStyles.ExpoImageStyles(theme)['Image 2'].props}
              source={imageSource(
                `${(props.item ?? defaultProps.item)?.cover_image}`
              )}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['Image 2'].style,
                  { height: 50, width: 80 }
                ),
                dimensions.width
              )}
            />
          </View>

          <Touchable
            onPress={() => {
              try {
                if ((props.item ?? defaultProps.item)?.type === 'stock') {
                  navigation.push('WebViewScreen', {
                    url: (props.item ?? defaultProps.item)?.parent_id
                      ? Constants['base_url'] +
                        ('/personalCenter/interactive/' +
                          (props.item ?? defaultProps.item)?.parent_id +
                          '?type=opinion')
                      : Constants['base_url'] +
                        ('/personalCenter/interactive/' +
                          (props.item ?? defaultProps.item)?.id +
                          '?type=opinion'),
                  });
                } else {
                  navigation.push('WebViewScreen', {
                    url:
                      Constants['base_url'] +
                      '/personalCenter/interactive/' +
                      (props.item ?? defaultProps.item)?.id +
                      '?type=opinion',
                  });
                }
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* 类别与作者 */}
            <>
              {!(
                (props.item ?? defaultProps.item)?.state === 'passed'
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 6,
                    },
                    dimensions.width
                  )}
                >
                  {/* View 3 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: palettes.App['Custom Color 14'],
                        borderRadius: 4,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 8,
                      },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row' },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: 'rgb(152, 163, 172)',
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 20,
                            marginRight: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'common_read')}{' '}
                        {(props.item ?? defaultProps.item)?.view_count}
                      </Text>
                      {/* Text 4 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: 'rgb(152, 163, 172)',
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 20,
                            marginRight: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'my_point_agree_num')}{' '}
                        {(props.item ?? defaultProps.item)?.like_count}
                      </Text>
                      {/* Text 3 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: 'rgb(152, 163, 172)',
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 20,
                            marginRight: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'my_point_disagree_num')}{' '}
                        {(props.item ?? defaultProps.item)?.dislike_count}
                      </Text>
                      {/* Text 2 */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: 'rgb(152, 163, 172)',
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 20,
                            marginRight: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'mine_collection')}{' '}
                        {(props.item ?? defaultProps.item)?.favorite_count}
                      </Text>
                    </View>
                    <Icon
                      color={palettes.App['Custom Color 64']}
                      name={'AntDesign/right'}
                      size={18}
                    />
                  </View>
                </View>
              )}
            </>
          </Touchable>

          <View
            style={StyleSheet.applyWidth(
              {
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 6,
                width: '100%',
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                { justifyContent: 'center' },
                dimensions.width
              )}
            >
              <>
                {!(
                  (props.item ?? defaultProps.item)?.state === 'passed'
                ) ? null : (
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
                          alignSelf: 'flex-end',
                          color: palettes.App['Custom Color 11'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          lineHeight: 16,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'my_point_send_time')}
                    {timesAgo(
                      Variables,
                      (props.item ?? defaultProps.item)?.created_at
                    )}
                  </Text>
                )}
              </>
              {/* Text 2 */}
              <>
                {(props.item ?? defaultProps.item)?.state ===
                'passed' ? null : (
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
                          alignSelf: 'flex-end',
                          color: palettes.App['Custom Color 11'],
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          lineHeight: 16,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {fromUnixTimestamp(
                      Variables,
                      (props.item ?? defaultProps.item)?.updated_at,
                      'YYYY/MM/DD HH:mm'
                    )}
                  </Text>
                )}
              </>
            </View>
            {/* View 4 */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'row' },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    props.onDelete?.(
                      (props.item ?? defaultProps.item)?.parent_id
                        ? (props.item ?? defaultProps.item)?.parent_id
                        : (props.item ?? defaultProps.item)?.id
                    );
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* 删除 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App['Custom #ffffff'],
                      borderColor: palettes.App['Custom Color 65'],
                      borderRadius: 16,
                      borderWidth: 1,
                      marginRight: 10,
                      paddingBottom: 3,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 3,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Brand.itemTextNomal,
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 19.6,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_delete')}
                  </Text>
                </View>
              </Touchable>

              <Touchable>
                {/* 追加 */}
                <>
                  {!(
                    (props.item ?? defaultProps.item)?.state === 'passed'
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.Brand.appStyle_primary,
                          borderRadius: 16,
                          paddingBottom: 3,
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 3,
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
                            fontSize: 12,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 19.6,
                          },
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'my_point_append')}
                      </Text>
                    </View>
                  )}
                </>
              </Touchable>
              {/* Touchable 3 */}
              <Touchable
                onPress={() => {
                  try {
                    navigation.push('CreatePointScreen', {
                      id: (props.item ?? defaultProps.item)?.id,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* 编辑 */}
                <>
                  {!(
                    (props.item ?? defaultProps.item)?.state === 'draft' ||
                    (props.item ?? defaultProps.item)?.state === 'rejected'
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.Brand.appStyle_primary,
                          borderRadius: 16,
                          paddingBottom: 3,
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 3,
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
                            fontSize: 12,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 19.6,
                          },
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'common_edit')}
                      </Text>
                    </View>
                  )}
                </>
              </Touchable>
              {/* Touchable 2 */}
              <Touchable
                onPress={() => {
                  try {
                    props.onRecall?.((props.item ?? defaultProps.item)?.id);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* 撤回 */}
                <>
                  {!(
                    (props.item ?? defaultProps.item)?.state === 'pending'
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          borderColor: palettes.App['Custom Color 59'],
                          borderRadius: 16,
                          borderWidth: 1,
                          paddingBottom: 3,
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 3,
                        },
                        dimensions.width
                      )}
                    >
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App['Custom Color 59'],
                            fontFamily: 'System',
                            fontSize: 12,
                            fontWeight: '400',
                            letterSpacing: 0.2,
                            lineHeight: 19.6,
                          },
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'common_recall')}
                      </Text>
                    </View>
                  )}
                </>
              </Touchable>
            </View>
          </View>
          <Divider
            {...GlobalStyles.DividerStyles(theme)['Divider'].props}
            color={palettes.App['Custom Color 4']}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.DividerStyles(theme)['Divider'].style,
                { marginTop: 6 }
              ),
              dimensions.width
            )}
          />
        </View>
      </Touchable>
    </View>
  );
};

export default withTheme(MyOpinionSectionBlock);
