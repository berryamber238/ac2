import React from 'react';
import { Divider, ExpoImage, Touchable, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import t from '../global-functions/t';
import timesAgo from '../global-functions/timesAgo';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  item: {
    id: 131,
    image: null,
    topic: { id: 10, title: '讨论标题讨论标题', enabled: true },
    content: 'abcd',
    reply_to: {
      id: 130,
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
      image: null,
      content: 'test',
      deleted: false,
      created_at: 1739356776,
    },
    created_at: 1739384681,
  },
  onDelete: () => {},
};

const MyCommentSectionBlock = props => {
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
            navigation.push('WebViewScreen', {
              url:
                Constants['base_url'] +
                ('/topic/detail/' +
                  (props.item ?? defaultProps.item)?.topic?.id),
            });
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
                { alignItems: 'flex-start', flex: 1, flexDirection: 'row' },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  { marginRight: 5 },
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
                  source={imageSource(Images['icrecommendtopic'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                      { height: 22, width: 22 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
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
                  ellipsizeMode={'tail'}
                  numberOfLines={2}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text Title'].style,
                      {
                        color: palettes.App['Custom Color 72'],
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
                  {(props.item ?? defaultProps.item)?.topic?.title}
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
                    color: palettes.App['Custom Color 2'],
                    flex: 1,
                    fontFamily: 'System',
                    fontSize: 13,
                    fontWeight: '400',
                    lineHeight: 24,
                  }
                ),
                dimensions.width
              )}
            >
              {(props.item ?? defaultProps.item)?.content}
            </Text>
          </View>
          {/* 回复内容 */}
          <>
            {!(props.item ?? defaultProps.item)?.reply_to ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-start',
                    backgroundColor: palettes.App['Custom Color 14'],
                    borderRadius: 4,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 8,
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
                        color: palettes.App['Custom Color 4'],
                        flex: 1,
                        fontFamily: 'System',
                        fontSize: 13,
                        fontWeight: '400',
                        lineHeight: 24,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {(props.item ?? defaultProps.item)?.reply_to?.user?.name}
                  {':'}
                  {(props.item ?? defaultProps.item)?.reply_to?.content}
                </Text>
              </View>
            )}
          </>
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
              {/* 时间 */}
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
                      (props.item ?? defaultProps.item)?.created_at
                    )}
                  </Text>
                </View>
              </View>
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
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App['Custom #ffffff'],
                      borderColor: palettes.App['Custom Color 65'],
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

export default withTheme(MyCommentSectionBlock);
