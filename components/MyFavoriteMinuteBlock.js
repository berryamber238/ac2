import React from 'react';
import { ExpoImage, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import arrayIdToString from '../global-functions/arrayIdToString';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  dataItem: {
    id: 42,
    item: {
      id: 70502081,
      free: false,
      type: 'minute',
      title: '自动驾驶2025年行业展望及头部车企研发进展对比【Michael调研纪要】',
      badges: [],
      repost: false,
      summary:
        '主要看点：\n1.\t自动驾驶行业在未来1至2年的技术路线的关键趋势，高速和城市NOA的发展现状及难点\n2.\t当前国内主机厂智能驾驶方面的竞争格局，传统主机厂的布局策略与特点\n3.\t无图方案的应用前景，智能驾驶行业的格局演变\n4.\t智驾普及的趋势下，智驾系统软硬件的成本变化趋势\n5.\tDeepSeek对智驾系统的影响',
      highlights: null,
      industry_ids: [6010],
      organization: {
        id: 10000014,
        logo: null,
        name: '华兴泛亚1',
        state: 'passed',
        fund_type_ids: [1, 7],
        share_display_name: '华兴泛亚1',
        organization_type_id: 5,
      },
      release_time: 1739430450,
      current_price: 300,
      original_price: 300,
      custom_sector_ids: [2],
      has_article_speech: null,
      co_host_organizations: [],
    },
    item_id: 70502081,
    item_type: 'Minute',
    created_at: 1739975584,
    updated_at: 1739975584,
    favorite_id: 220,
  },
  gotoScreen: () => {},
};

const MyFavoriteMinuteBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [numberOfLines, setNumberOfLines] = React.useState(0);
  const [showAction, setShowAction] = React.useState(false);

  return (
    <View>
      <View
        style={StyleSheet.applyWidth(
          {
            paddingBottom: 12,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 12,
          },
          dimensions.width
        )}
      >
        <>
          {!(
            (props.dataItem ?? defaultProps.dataItem)?.item?.badges &&
            ((props.dataItem ?? defaultProps.dataItem)?.item?.badges).includes(
              'hot'
            )
          ) ? null : (
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
              resizeMode={'contain'}
              source={imageSource(Images['ichot'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                  { height: 20, marginRight: 8, width: 20 }
                ),
                dimensions.width
              )}
            />
          )}
        </>
        {/* View 4 */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row' },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text Title'].props}
            numberOfLines={2}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text Title'].style,
                theme.typography.body1,
                {
                  color: palettes.App['Custom Color 74'],
                  fontSize: 16,
                  lineHeight: 20,
                  marginRight: null,
                }
              ),
              dimensions.width
            )}
          >
            {(props.dataItem ?? defaultProps.dataItem)?.item?.title}
          </Text>
        </View>

        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              alignSelf: 'flex-start',
              backgroundColor: palettes.App['Custom Color 14'],
              borderRadius: 4,
              flexDirection: 'row',
              marginTop: 8,
              paddingBottom: 5,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 5,
            },
            dimensions.width
          )}
        >
          {/* 默认 */}
          <>
            {!!(props.dataItem ?? defaultProps.dataItem)?.item?.organization
              ?.logo ? null : (
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                resizeMode={'cover'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                source={imageSource(Images['icheadercompany'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { borderRadius: 8, height: 16, width: 16 }
                  ),
                  dimensions.width
                )}
              />
            )}
          </>
          {/* 头像 */}
          <>
            {!(props.dataItem ?? defaultProps.dataItem)?.item?.organization
              ?.logo ? null : (
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
                  `${
                    (props.dataItem ?? defaultProps.dataItem)?.item
                      ?.organization?.logo
                  }`
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { borderRadius: 8, height: 16, width: 16 }
                  ),
                  dimensions.width
                )}
              />
            )}
          </>
          <>
            {!(props.dataItem ?? defaultProps.dataItem)?.item
              ?.organization ? null : (
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(theme.typography.body1, {
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                    marginLeft: 8,
                  }),
                  dimensions.width
                )}
              >
                {
                  (props.dataItem ?? defaultProps.dataItem)?.item?.organization
                    ?.name
                }
              </Text>
            )}
          </>
          <>
            {!(
              (props.dataItem ?? defaultProps.dataItem)?.item
                ?.co_host_organizations &&
              (props.dataItem ?? defaultProps.dataItem)?.item
                ?.co_host_organizations?.length > 0
            ) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom Color 68'],
                    borderRadius: 100,
                    height: 16,
                    marginLeft: 8,
                    marginRight: 8,
                    width: 2,
                  },
                  dimensions.width
                )}
              />
            )}
          </>
          {/* Image 2 */}
          <>
            {!(
              (props.dataItem ?? defaultProps.dataItem)?.item
                ?.co_host_organizations &&
              (props.dataItem ?? defaultProps.dataItem)?.item
                ?.co_host_organizations?.length > 0
            ) ? null : (
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                resizeMode={'cover'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                source={imageSource(Images['icheadercompany'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                    { borderRadius: 8, height: 16, width: 16 }
                  ),
                  dimensions.width
                )}
              />
            )}
          </>
          {/* Text 2 */}
          <>
            {!(
              (props.dataItem ?? defaultProps.dataItem)?.item
                ?.co_host_organizations &&
              (props.dataItem ?? defaultProps.dataItem)?.item
                ?.co_host_organizations?.length > 0
            ) ? null : (
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                    marginLeft: 8,
                  },
                  dimensions.width
                )}
              >
                {
                  (props.dataItem ?? defaultProps.dataItem)?.item?.organization
                    ?.name
                }
              </Text>
            )}
          </>
        </View>
        {/* Text 2 */}
        <>
          {!(
            (props.dataItem ?? defaultProps.dataItem)?.item?.summary &&
            (props.dataItem ?? defaultProps.dataItem)?.item?.summary?.length > 0
          ) ? null : (
            <Text
              accessible={true}
              selectable={false}
              numberOfLines={3}
              style={StyleSheet.applyWidth(
                {
                  fontFamily: 'System',
                  fontSize: 13,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 20,
                  marginTop: 8,
                },
                dimensions.width
              )}
            >
              {(props.dataItem ?? defaultProps.dataItem)?.item?.summary}
            </Text>
          )}
        </>
        {/* View 3 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'row', flexShrink: 1 },
              dimensions.width
            )}
          >
            {/* View 2 */}
            <>
              {!(
                (props.dataItem ?? defaultProps.dataItem)?.item_type ===
                'Minute'
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderColor: palettes.App['Custom Color 17'],
                      borderWidth: 1,
                      marginRight: 8,
                      paddingLeft: 4,
                      paddingRight: 4,
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
                        color: palettes.App['Custom Color 17'],
                        fontFamily: 'System',
                        fontSize: 10,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 14,
                      }),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'mine_note_collection')}
                  </Text>
                </View>
              )}
            </>
            {/* View 3 */}
            <>
              {!(
                (props.dataItem ?? defaultProps.dataItem)?.item_type ===
                'Article'
              ) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderColor: palettes.App['Custom Color 17'],
                      borderWidth: 1,
                      marginRight: 8,
                      paddingLeft: 4,
                      paddingRight: 4,
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
                        color: palettes.App['Custom Color 17'],
                        fontFamily: 'System',
                        fontSize: 10,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 14,
                      }),
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'tab_articles')}
                  </Text>
                </View>
              )}
            </>
            <>
              {(props.dataItem ?? defaultProps.dataItem)?.item?.free ? null : (
                <ExpoImage
                  allowDownscaling={true}
                  cachePolicy={'disk'}
                  contentPosition={'center'}
                  transitionDuration={300}
                  transitionEffect={'cross-dissolve'}
                  transitionTiming={'ease-in-out'}
                  {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                  resizeMode={'center'}
                  source={imageSource(Images['ichomevip'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                      { height: 16, marginRight: 8, width: 30 }
                    ),
                    dimensions.width
                  )}
                />
              )}
            </>
            <Text
              accessible={true}
              selectable={false}
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color 4'],
                  flexShrink: 1,
                  fontFamily: 'System',
                  fontSize: 12,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 20,
                },
                dimensions.width
              )}
            >
              {arrayIdToString(
                Variables,
                4,
                (props.dataItem ?? defaultProps.dataItem)?.item?.industry_ids,
                '、'
              )}
            </Text>
          </View>

          <Text
            accessible={true}
            selectable={false}
            numberOfLines={1}
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'flex-end',
                color: palettes.App['Custom Color 4'],
                fontFamily: 'System',
                fontSize: 12,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 20,
              },
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
      {/* View 4 */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes.App['Custom Color 10'],
            height: 1,
            width: '100%',
          },
          dimensions.width
        )}
      />
    </View>
  );
};

export default withTheme(MyFavoriteMinuteBlock);
