import React from 'react';
import { Divider, Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import t from '../global-functions/t';
import timesAgo from '../global-functions/timesAgo';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  item: {
    id: 10,
    gift: 0,
    user: {
      id: 10000412,
      name: 'Test LL',
      avatar: null,
      deleted: false,
      is_self: false,
      identity: 'real',
      nickname: '用户10000412',
      position: 'Chairman',
      fund_type_ids: [7, 5],
      sns_career_name: '私募股权投资/风险投资 Chairman',
      organization_name: '',
      tournament_winner: null,
      management_scale_id: null,
      organization_type_id: 5,
      organization_identity: 'hide',
    },
    vote: {
      id: 10,
      name: '',
      type: 'single',
      total_votes: null,
      vote_options: [
        { id: 25, name: '投票选项1', vote_count: null, vote_percent: null },
        { id: 26, name: '投票选项2', vote_count: null, vote_percent: null },
      ],
      total_voted_users: null,
    },
    intro:
      '<p>讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题讨论标题</p>',
    state: 'draft',
    title: '讨论标题讨论标题',
    user_id: 10000412,
    show_vote: true,
    created_at: 1739184992,
    industries: [
      { id: 1010, name: '能源' },
      { id: 1510, name: '原材料' },
    ],
    updated_at: 1739184999,
    view_count: 0,
    corporations: [
      { id: 3, name: '国华网安', ticker: 'SZ.000004', currency: 'CNY' },
      { id: 5, name: '深振业A', ticker: 'SZ.000006', currency: 'CNY' },
    ],
    industry_ids: [1010, 1510],
    release_time: null,
    comment_count: 0,
    corporation_ids: [3, 5],
    rejected_reason: null,
    information_links: [
      {
        url: 'https://www.ca3test.com/topic/add',
        host: null,
        title: null,
        keywords: null,
        image_url: null,
        description: null,
      },
      {
        url: 'https://www.ca3test.com/community',
        host: null,
        title: null,
        keywords: null,
        image_url: null,
        description: null,
      },
    ],
    joined_for_the_first_time: null,
  },
  onDelete: () => {},
  onRecall: () => {},
};

const MyTopicSectionBlock = props => {
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
                  Constants['base_url'] +
                  ('/topic/detail/' + (props.item ?? defaultProps.item)?.id),
              });
            } else {
              navigation.push('WebViewScreen', {
                url:
                  Constants['base_url'] +
                  ('/topic/preview?id=' +
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
                  {'#'}
                  {(props.item ?? defaultProps.item)?.title}
                  {'#'}
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
              {t(Variables, 'tab_vote_intro')}
              {(props.item ?? defaultProps.item)?.title}
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
                        {t(Variables, 'tab_vote_short')}{' '}
                        {(props.item ?? defaultProps.item)?.comment_count}
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
                        {t(Variables, 'tab_vote_point')}{' '}
                        {
                          (props.item ?? defaultProps.item)
                            ?.related_opinion_count
                        }
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
                        {t(Variables, 'tab_events')}{' '}
                        {(props.item ?? defaultProps.item)?.related_event_count}
                      </Text>
                    </View>
                  </View>
                )}
              </>
              {/* 时间 */}
              <>
                {(props.item ?? defaultProps.item)?.state ===
                'passed' ? null : (
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
                        {timesAgo(
                          Variables,
                          (props.item ?? defaultProps.item)?.updated_at
                        )}
                      </Text>
                    </View>
                  </View>
                )}
              </>
            </View>
            {/* View 4 */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row' },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    props.onDelete?.((props.item ?? defaultProps.item)?.id);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* 删除 */}
                <>
                  {!(
                    (props.item ?? defaultProps.item)?.state !== 'passed'
                  ) ? null : (
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
                  )}
                </>
              </Touchable>
              {/* Touchable 3 */}
              <Touchable
                onPress={() => {
                  try {
                    navigation.push('CreateTopicScreen', {
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
                          borderColor: palettes.Brand.appStyle_primary,
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

export default withTheme(MyTopicSectionBlock);
