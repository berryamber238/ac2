import React from 'react';
import {
  ActionSheet,
  ActionSheetCancel,
  ActionSheetItem,
  ExpoImage,
  Icon,
  LinearGradient,
  ScreenContainer,
  SimpleStyleScrollView,
  SimpleStyleSwipeableList,
  SwipeableItem,
  SwipeableItemButton,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import FetchLoadingBlock from '../components/FetchLoadingBlock';
import MyFavoriteMinuteBlock from '../components/MyFavoriteMinuteBlock';
import MyFavoriteOpinionSectionBlock from '../components/MyFavoriteOpinionSectionBlock';
import NoDataBlock from '../components/NoDataBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { folder_name: '默认', id: 220 };

const MineMyFavoritesDetailScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [action, setAction] = React.useState('');
  const [action_enable, setAction_enable] = React.useState(false);
  const [add_folder_item_shown, setAdd_folder_item_shown] =
    React.useState(false);
  const [delete_folder_index, setDelete_folder_index] = React.useState(0);
  const [delete_folder_shown, setDelete_folder_shown] = React.useState(false);
  const [edit_folder_index, setEdit_folder_index] = React.useState(0);
  const [favorite_item_ids, setFavorite_item_ids] = React.useState([]);
  const [folder_input_text, setFolder_input_text] = React.useState('');
  const [follow_user, setFollow_user] = React.useState([
    {
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
    {
      id: 42,
      item: {
        id: 70502081,
        free: false,
        type: 'minute',
        title:
          '自动驾驶2025年行业展望及头部车企研发进展对比【Michael调研纪要】',
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
    {
      id: 38,
      item: {
        id: 70502080,
        free: false,
        type: 'original',
        title: '关于OpenAI的2025年预测：力推Agent以及融入物理世界/引入融资',
        badges: [],
        repost: false,
        summary:
          '首先是，Sam Altman在文章中的主要观点。关于 AI 经济学的三点重要观察。\n\n1）AI 模型的智能水平与训练、运行它的资源总和的对数大致相等，投入资金能获得持续可预测的收益。\n\n｜这一点非常惊人，原文使用了log，原文是“The intelligence of an Al model roughly equals the log of theresources used to train and run it. These resources are chieflytraining compute, data, and inference compute. lt appears that youcan spend arbitrary amounts of money and get continuous andpredictable gains; the scaling laws that predict this are accurate overmany orders of magnitude.”这就意味着盲目增加训练的算力和数据，会出现极大的边际效用递减。\n\n2）使用特定水平 AI 的成本每 12 个月约下降 10 倍，如 GPT-4 到 GPT-4o 的 token 成本在一年半内下降约 150 倍，远超摩尔定律带来的成本变化速度，低价促使 AI 应用更加广泛。\n\n｜这意味着推理成本的大幅降低，会给AI应用的寒武纪爆发铺垫极好的环境和空间。\n\n3）线性增长的 AI 智能所创造的社会经济价值呈超指数增长，这使得指数级增长的 AI 投资在短期内不会停止。\n\n｜进一步推动AI虚拟世界和物理世界的融合和连接。',
        highlights: null,
        industry_ids: [3520],
        organization: {
          id: 10000014,
          logo: null,
          name: '华兴泛亚1',
          state: 'passed',
          fund_type_ids: [1, 7],
          share_display_name: '华兴泛亚1',
          organization_type_id: 5,
        },
        release_time: 1739430088,
        current_price: 300,
        original_price: 300,
        custom_sector_ids: [3],
        has_article_speech: null,
        co_host_organizations: [],
      },
      item_id: 70502080,
      item_type: 'Article',
      created_at: 1739974035,
      updated_at: 1739974035,
      favorite_id: 220,
    },
  ]);
  const [follow_user_page, setFollow_user_page] = React.useState(0);
  const [is_loading, setIs_loading] = React.useState(false);
  const [is_selected_all, setIs_selected_all] = React.useState(false);
  const [new_folder_name, setNew_folder_name] = React.useState(
    props.route?.params?.folder_name ?? defaultProps.folder_name
  );
  const [show_action_menu, setShow_action_menu] = React.useState(false);
  const [to_id, setTo_id] = React.useState(0);
  const [refreshingViewFetch2ScrollView, setRefreshingViewFetch2ScrollView] =
    React.useState(false);
  const getOpinionData = item => {
    const newItem = {};
    newItem.data = item;
    return newItem;
  };

  const toggleSelectAll = () => {
    if (is_selected_all) {
      setFavorite_item_ids([]);
    } else {
      const newArray = follow_user.map(item => item.item.id);
      setFavorite_item_ids(newArray);
      console.log(newArray);
    }
    setIs_selected_all(!is_selected_all);
  };
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { justifyContent: 'space-between' },
        dimensions.width
      )}
    >
      {/* View 2 */}
      <View>
        <LinearGradient
          endX={100}
          endY={100}
          startX={0}
          startY={0}
          {...GlobalStyles.LinearGradientStyles(theme)['Linear Gradient'].props}
          color1={palettes.App['Custom Color 75']}
          color2={palettes.App['Custom Color 76']}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.LinearGradientStyles(theme)['Linear Gradient'].style,
              { position: 'absolute' }
            ),
            dimensions.width
          )}
        />
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: safeAreaInsets.top,
            },
            dimensions.width
          )}
        >
          <Icon
            color={palettes.App['Custom #ffffff']}
            name={'AntDesign/left'}
            size={24}
            style={StyleSheet.applyWidth({ marginLeft: 8 }, dimensions.width)}
          />
          <View
            style={StyleSheet.applyWidth(
              { flex: 1, height: 1 },
              dimensions.width
            )}
          />
          <Touchable
            onPress={() => {
              try {
                setShow_action_menu(true);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* Icon 2 */}
            <Icon
              color={palettes.App['Custom #ffffff']}
              name={'Feather/more-vertical'}
              size={24}
              style={StyleSheet.applyWidth(
                { marginRight: 8 },
                dimensions.width
              )}
            />
          </Touchable>
        </View>
        {/* View 2 */}
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
                color: palettes.App['Custom #ffffff'],
                fontFamily: 'System',
                fontSize: 18,
                fontWeight: '700',
                letterSpacing: 0.2,
                lineHeight: 20,
                marginBottom: 16,
                marginLeft: 8,
                marginRight: 8,
                marginTop: 16,
              },
              dimensions.width
            )}
          >
            {new_folder_name}
          </Text>
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={'disk'}
            contentPosition={'center'}
            resizeMode={'cover'}
            transitionDuration={300}
            transitionEffect={'cross-dissolve'}
            transitionTiming={'ease-in-out'}
            {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
            source={imageSource(Images['icfolderflag'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                {
                  height: 52,
                  marginRight: 8,
                  marginTop: 8,
                  opacity: 0.14,
                  width: 52,
                }
              ),
              dimensions.width
            )}
          />
        </View>
      </View>

      <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
        {/* Fetch 2 */}
        <AceCampTestApi.FetchFavoritesItemsGET
          favorite_id={props.route?.params?.id ?? defaultProps.id}
          handlers={{
            on401: fetch2Data => {
              try {
                console.log(fetch2Data?.statusText);
              } catch (err) {
                console.error(err);
              }
            },
            on4xx: fetch2Data => {
              try {
                console.log('error');
              } catch (err) {
                console.error(err);
              }
            },
            onData: fetch2Data => {
              try {
                console.log(fetch2Data);
                setFollow_user(fetch2Data?.data);
                setFollow_user_page(2);
              } catch (err) {
                console.error(err);
              }
            },
          }}
          page={1}
          retry={1}
        >
          {({ loading, error, data, refetchFavoritesItems }) => {
            const fetch2Data = data?.json;
            if (loading) {
              return <FetchLoadingBlock />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return (
                <>
                  {/* No-Data 2 */}
                  <NoDataBlock />
                </>
              );
            }

            return (
              <>
                <SimpleStyleScrollView
                  bounces={true}
                  horizontal={false}
                  keyboardShouldPersistTaps={'never'}
                  nestedScrollEnabled={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshingViewFetch2ScrollView}
                      onRefresh={() => {
                        const handler = async () => {
                          try {
                            setRefreshingViewFetch2ScrollView(true);
                            await refetchFavoritesItems();
                            setRefreshingViewFetch2ScrollView(false);
                          } catch (err) {
                            console.error(err);
                            setRefreshingViewFetch2ScrollView(false);
                          }
                        };
                        handler();
                      }}
                    />
                  }
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={StyleSheet.applyWidth(
                    { alignSelf: 'flex-start' },
                    dimensions.width
                  )}
                >
                  <SimpleStyleSwipeableList
                    data={fetch2Data?.data}
                    disableScrollWhenSwiping={true}
                    estimatedItemSize={50}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(swipeableListData, index) =>
                      swipeableListData?.id ??
                      swipeableListData?.uuid ??
                      index?.toString() ??
                      JSON.stringify(swipeableListData)
                    }
                    keyboardShouldPersistTaps={'never'}
                    listComponent={'FlatList'}
                    listKey={'View->Fetch 2->Scroll View->Swipeable List'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item, index }) => {
                      const swipeableListData = item;
                      return (
                        <>
                          <Touchable
                            onPress={() => {
                              try {
                                console.log();
                                if (favorite_item_ids.includes(undefined)) {
                                  setFavorite_item_ids(favorite_item_ids);
                                } else {
                                  setFavorite_item_ids(favorite_item_ids);
                                }

                                if (
                                  favorite_item_ids?.length >=
                                  follow_user?.length
                                ) {
                                  setIs_selected_all(true);
                                } else {
                                  setIs_selected_all(false);
                                }
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            disabled={!action_enable}
                            disabledOpacity={100}
                          >
                            <SwipeableItem
                              closeOnPress={true}
                              friction={20}
                              swipeActivationPercentage={80}
                              swipeToClosePercent={50}
                              swipeToOpenPercent={50}
                              {...GlobalStyles.SwipeableItemStyles(theme)[
                                'Swipeable Item'
                              ].props}
                              disableLeftSwipe={true}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.SwipeableItemStyles(theme)[
                                    'Swipeable Item'
                                  ].style,
                                  { alignItems: 'center', flexDirection: 'row' }
                                ),
                                dimensions.width
                              )}
                            >
                              <>
                                {!action_enable ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { paddingLeft: 16 },
                                      dimensions.width
                                    )}
                                  >
                                    <ExpoImage
                                      allowDownscaling={true}
                                      cachePolicy={'disk'}
                                      contentPosition={'center'}
                                      resizeMode={'cover'}
                                      source={imageSource(
                                        'https://static.draftbit.com/images/placeholder-image.png'
                                      )}
                                      transitionDuration={300}
                                      transitionEffect={'cross-dissolve'}
                                      transitionTiming={'ease-in-out'}
                                      {...GlobalStyles.ExpoImageStyles(theme)[
                                        'SVG 2'
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.ExpoImageStyles(theme)[
                                            'SVG 2'
                                          ].style,
                                          { height: 20, width: 20 }
                                        ),
                                        dimensions.width
                                      )}
                                    />
                                  </View>
                                )}
                              </>
                              {/* View 2 */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { alignSelf: 'stretch', flexGrow: 1 },
                                  dimensions.width
                                )}
                              >
                                <Touchable
                                  onPress={() => {
                                    try {
                                      console.log('cccc');
                                      navigation.push('WebViewScreen', {
                                        url:
                                          Constants['base_url'] +
                                          '/viewpoint/detail/' +
                                          (swipeableListData?.item?.parent_id
                                            ? swipeableListData?.item?.parent_id
                                            : swipeableListData?.item?.id),
                                      });
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  disabled={action_enable}
                                  disabledOpacity={100}
                                >
                                  <>
                                    {!(
                                      swipeableListData?.item_type === 'Opinion'
                                    ) ? null : (
                                      <MyFavoriteOpinionSectionBlock
                                        dataItem={swipeableListData}
                                      />
                                    )}
                                  </>
                                </Touchable>
                                {/* Touchable 2 */}
                                <Touchable
                                  onPress={() => {
                                    try {
                                      navigation.push('ArticleDetailScreen', {
                                        article_info_id:
                                          swipeableListData?.item?.id,
                                      });
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  disabled={action_enable}
                                  disabledOpacity={100}
                                >
                                  <>
                                    {swipeableListData?.item_type ===
                                    'Opinion' ? null : (
                                      <MyFavoriteMinuteBlock
                                        dataItem={swipeableListData}
                                      />
                                    )}
                                  </>
                                </Touchable>
                              </View>
                            </SwipeableItem>
                          </Touchable>
                        </>
                      );
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                  />
                </SimpleStyleScrollView>
                <>
                  {!(
                    fetch2Data?.code !== 200 || fetch2Data?.data?.length === 0
                  ) ? null : (
                    <NoDataBlock />
                  )}
                </>
              </>
            );
          }}
        </AceCampTestApi.FetchFavoritesItemsGET>
      </View>
      {/* 底部菜单 */}
      <>
        {!action_enable ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.App['Custom Color 14'],
                bottom: 0,
                flexDirection: 'row',
                height: 40,
                justifyContent: 'space-between',
                padding: 8,
              },
              dimensions.width
            )}
          >
            <View>
              {/* Touchable 4 */}
              <Touchable
                onPress={() => {
                  try {
                    toggleSelectAll();
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
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
                    source={imageSource(
                      is_selected_all
                        ? Images['icselectactive']
                        : Images['icselectdefault']
                    )}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                        {
                          height: 16,
                          marginBottom: 8,
                          marginLeft: 8,
                          marginRight: 8,
                          marginTop: 8,
                          width: 16,
                        }
                      ),
                      dimensions.width
                    )}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Brand.itemTextNomal,
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 16,
                      },
                      dimensions.width
                    )}
                  >
                    {t(Variables, 'common_all_select')}
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
                  justifyContent: 'flex-end',
                },
                dimensions.width
              )}
            >
              <Touchable activeOpacity={100} disabled={true}>
                {/* 取消收藏 */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(theme.typography.body1, {
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.Brand.itemTextNomal,
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: action_enable
                            ? palettes.Brand.itemTextNomal
                            : '#C6D0D9',
                        },
                      ],
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 16,
                      marginLeft: 16,
                    }),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'mine_collection_cancel_folder')}
                </Text>
              </Touchable>
              {/* Touchable 2 */}
              <Touchable>
                {/* 复制到 */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(theme.typography.body1, {
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.Brand.itemTextNomal,
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: action_enable
                            ? palettes.Brand.itemTextNomal
                            : '#C6D0D9',
                        },
                      ],
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 16,
                      marginLeft: 16,
                    }),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'mine_collection_copy_to')}
                </Text>
              </Touchable>
              {/* Touchable 3 */}
              <Touchable>
                {/* 移动到 */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(theme.typography.body1, {
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.Brand.itemTextNomal,
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: action_enable
                            ? palettes.Brand.itemTextNomal
                            : '#C6D0D9',
                        },
                      ],
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 16,
                      marginLeft: 16,
                    }),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'mine_collection_move_to')}
                </Text>
              </Touchable>
            </View>
          </View>
        )}
      </>
      <ActionSheet visible={show_action_menu}>
        <ActionSheetItem
          color={theme.colors.text.strong}
          onPress={() => {
            try {
              setAction_enable(true);
              setShow_action_menu(false);
            } catch (err) {
              console.error(err);
            }
          }}
          {...GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
            .props}
          label={'shanchu '}
          style={StyleSheet.applyWidth(
            GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
              .style,
            dimensions.width
          )}
        />
        <ActionSheetCancel
          label={'Cancel'}
          onPress={() => {
            try {
              setShow_action_menu(false);
            } catch (err) {
              console.error(err);
            }
          }}
        />
      </ActionSheet>
    </ScreenContainer>
  );
};

export default withTheme(MineMyFavoritesDetailScreen);
