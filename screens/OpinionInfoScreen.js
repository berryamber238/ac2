import React from 'react';
import {
  AccordionGroup,
  Button,
  Checkbox,
  Circle,
  Divider,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  LinearGradient,
  LoadingIndicator,
  ScreenContainer,
  Shadow,
  SimpleStyleFlashList,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Swiper,
  SwiperItem,
  TextField,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Modal,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as TestApi from '../apis/TestApi.js';
import EmptyViewBlock from '../components/EmptyViewBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as CoverView from '../custom-files/CoverView';
import * as Toast from '../custom-files/Toast';
import * as gf from '../custom-files/gf';
import LabelPickerCancelBtnPress from '../global-functions/LabelPickerCancelBtnPress';
import ShowToast from '../global-functions/ShowToast';
import StringFormat from '../global-functions/StringFormat';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import getArticleType from '../global-functions/getArticleType';
import getNameById from '../global-functions/getNameById';
import getNoteStatus from '../global-functions/getNoteStatus';
import setUndefined from '../global-functions/setUndefined';
import splitList from '../global-functions/splitList';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as DateUtils from '../utils/DateUtils';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { id: 3329 };

const OpinionInfoScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [comment_list, setComment_list] = React.useState([]);
  const [comment_text, setComment_text] = React.useState('');
  const [favorite_ids, setFavorite_ids] = React.useState([]);
  const [id, setId] = React.useState('');
  const [is_add_favorite_loading, setIs_add_favorite_loading] =
    React.useState(false);
  const [is_comment_submiting, setIs_comment_submiting] = React.useState(false);
  const [is_favorite, setIs_favorite] = React.useState(false);
  const [is_followed, setIs_followed] = React.useState(false);
  const [is_following, setIs_following] = React.useState(false);
  const [is_input_focus, setIs_input_focus] = React.useState(false);
  const [is_loading, setIs_loading] = React.useState(false);
  const [is_show_add_favorite_modal, setIs_show_add_favorite_modal] =
    React.useState(false);
  const [new_favorite_folder_name, setNew_favorite_folder_name] =
    React.useState('');
  const [page, setPage] = React.useState(1);
  const [recommand_data_list, setRecommand_data_list] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [reply_to_id, setReply_to_id] = React.useState(0);
  const [show_confirm_modal, setShow_confirm_modal] = React.useState(false);
  const [total_record, setTotal_record] = React.useState(0);
  const [textFieldValue, setTextFieldValue] = React.useState('');
  const doDislike = item => {
    if (item.sns_action_flag.disliked) {
      item.dislike_count = item.dislike_count - 1;
      item.sns_action_flag.disliked = false;
    } else {
      item.dislike_count = item.dislike_count + 1;
      item.sns_action_flag.disliked = true;
    }
    setRefresh(!refresh);
    return item;
  };

  const doLike = item => {
    if (item.sns_action_flag.liked) {
      item.like_count = item.like_count - 1;
      item.sns_action_flag.liked = false;
    } else {
      item.like_count = item.like_count + 1;
      item.sns_action_flag.liked = true;
    }
    setRefresh(!refresh);
    return item;
  };

  const getDefaultFavorite = data => {
    const newArr = data
      .filter(item => {
        return item.default_favorite;
      })
      .map(item => {
        return item.id;
      });

    return newArr;
  };

  const toggleFavoriteCheck = id => {
    if (favorite_ids.includes(id)) {
      const newArr = favorite_ids.filter(item => {
        return item !== id;
      });
      return newArr;
    } else {
      favorite_ids.push(id);
      const newArr = [].concat(favorite_ids);
      return newArr;
    }
  };
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestSnsActionsDoPOST = AceCampTestApi.useSnsActionsDoPOST();
  const aceCampTestCommentsAddPOST = AceCampTestApi.useCommentsAddPOST();
  const aceCampTestFavoritesAddPOST = AceCampTestApi.useFavoritesAddPOST();
  const fetchScrollViewRef = React.useRef();
  const fetchKeyboardAvoidingViewViewTextInputRef = React.useRef();

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={false}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App['Custom #ffffff'],
          height: dimensions.height,
        },
        dimensions.width
      )}
    >
      <AceCampTestApi.FetchOpinionInfoGET
        handlers={{
          onData: fetchData => {
            try {
              console.log(fetchData);
              /* hidden 'If/Else' action */
              setIs_followed(fetchData?.data?.user?.sns_action_flag?.followed);
              setIs_favorite(fetchData?.data?.sns_action_flag?.favorited);
            } catch (err) {
              console.error(err);
            }
          },
        }}
        id={props.route?.params?.id ?? defaultProps.id}
      >
        {({ loading, error, data, refetchOpinionInfo }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return (
            <>
              {/* 标题 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: palettes.App.appStyle_white,
                    borderBottomWidth: 1,
                    borderColor: palettes.App['Custom #d8d8d8'],
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 5,
                    paddingLeft: 14,
                    paddingRight: 14,
                    paddingTop: 5,
                    position: 'absolute',
                    top: 0,
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
                  color={palettes.Brand.appStyle_primary}
                  icon={'AntDesign/left'}
                  size={22}
                />
                {/* Title */}
                <Text
                  accessible={true}
                  selectable={false}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'flex-start',
                      flexShrink: 1,
                      fontFamily: 'System',
                      fontSize: 18,
                      fontWeight: '600',
                      letterSpacing: 0.2,
                      lineHeight: 32,
                      marginLeft: 10,
                      marginRight: 10,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                >
                  {fetchData?.data?.type === 'stock'
                    ? fetchData?.data?.stock_tracing?.tracing_corporation
                        ?.name +
                      ('(' +
                        (fetchData?.data?.stock_tracing?.tracing_corporation
                          ?.ticker +
                          ')'))
                    : fetchData?.data?.title}
                </Text>
                {/* 分享Btn */}
                <IconButton
                  color={palettes.Brand.appStyle_primary}
                  icon={'AntDesign/sharealt'}
                  size={22}
                />
              </View>

              <SimpleStyleScrollView
                bounces={true}
                horizontal={false}
                keyboardShouldPersistTaps={'never'}
                nestedScrollEnabled={false}
                ref={fetchScrollViewRef}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={StyleSheet.applyWidth(
                  { height: '100%', marginBottom: safeAreaInsets.bottom + 50 },
                  dimensions.width
                )}
              >
                {/* Container */}
                <View>
                  {/* 主题 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 60,
                        paddingLeft: 16,
                        paddingRight: 16,
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
                          fetchData?.data?.expected_trend === 'bearish'
                        ) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor:
                                  palettes.App['Custom Color 21'],
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
                              {...GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Text Form Label 2'
                                  ].style,
                                  {
                                    color: palettes.App.White,
                                    fontFamily: 'System',
                                    fontSize: 12,
                                    fontWeight: '400',
                                    lineHeight: 14,
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
                          fetchData?.data?.expected_trend === 'bullish'
                        ) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor:
                                  palettes.App['Custom Color 12'],
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
                              {...GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Text Form Label 2'
                                  ].style,
                                  {
                                    color: palettes.App.White,
                                    fontFamily: 'System',
                                    fontSize: 12,
                                    fontWeight: '400',
                                    lineHeight: 14,
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
                          fetchData?.data?.expected_trend === 'none'
                        ) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor:
                                  palettes.App['Custom Color 22'],
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
                              {...GlobalStyles.TextStyles(theme)[
                                'Text Form Label 2'
                              ].props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)[
                                    'Text Form Label 2'
                                  ].style,
                                  {
                                    color: palettes.App.White,
                                    fontFamily: 'System',
                                    fontSize: 12,
                                    fontWeight: '400',
                                    lineHeight: 14,
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
                          { alignItems: 'flex-start', flexDirection: 'row' },
                          dimensions.width
                        )}
                      >
                        {/* 主题 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text Title']
                            .props}
                          allowFontScaling={false}
                          numberOfLines={1}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text Title']
                                .style,
                              { lineHeight: 24 }
                            ),
                            dimensions.width
                          )}
                        >
                          {fetchData?.data?.type === 'stock'
                            ? fetchData?.data?.stock_tracing
                                ?.tracing_corporation?.name +
                              ('(' +
                                (fetchData?.data?.stock_tracing
                                  ?.tracing_corporation?.ticker +
                                  ')'))
                            : undefined}
                        </Text>
                      </View>
                    </View>
                    {/* 实际涨跌幅 */}
                    <View>
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color:
                              fetchData?.data?.stock_tracing?.actual_change >= 0
                                ? '#ff4b4b'
                                : '#3fcab9',
                            fontFamily: 'System',
                            fontSize: 18,
                            fontWeight: '700',
                            letterSpacing: 0.2,
                            lineHeight: 24,
                          },
                          dimensions.width
                        )}
                      >
                        {fetchData?.data?.stock_tracing?.actual_change}
                        {'%'}
                      </Text>
                    </View>
                  </View>
                  {/* 板块关注 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 12,
                        paddingLeft: 16,
                        paddingRight: 16,
                      },
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
                            color: 'rgb(95, 103, 114)',
                            fontSize: 13,
                            lineHeight: 24,
                            marginRight: null,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'common_section')}
                      {'：'}
                      {getNameById(
                        Variables,
                        4,
                        fetchData?.data?.stock_tracing?.tracing_corporation
                          ?.industry_id
                      )}
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
                            color: 'rgb(160, 160, 160)',
                            fontSize: 13,
                            lineHeight: 24,
                            marginRight: null,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'common_read')}{' '}
                      {fetchData?.data?.view_count}{' '}
                      {t(Variables, 'mine_collection')}{' '}
                      {fetchData?.data?.favorite_count}
                    </Text>
                  </View>
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.Gray[100]}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'].style,
                        { height: 2, marginTop: 10 }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* 作者 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingBottom: 10,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 10,
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
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(`${fetchData?.data?.user?.avatar}`)}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            {
                              borderRadius: 20,
                              height: 32,
                              marginRight: 10,
                              width: 32,
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
                            fontFamily: 'System',
                            fontSize: 14,
                            fontWeight: '700',
                            letterSpacing: 0.2,
                            lineHeight: 24,
                          },
                          dimensions.width
                        )}
                      >
                        {fetchData?.data?.user?.name}
                      </Text>
                    </View>
                    {/* 关注 */}
                    <View>
                      <Touchable
                        onPress={() => {
                          const handler = async () => {
                            try {
                              setIs_following(true);
                              const result = (
                                await aceCampTestSnsActionsDoPOST.mutateAsync({
                                  action: is_followed ? 'unfollow' : 'follow',
                                  target_id: fetchData?.data?.user?.id,
                                  target_type: 'User',
                                })
                              )?.json;
                              setIs_followed(
                                result?.code === 200
                                  ? !is_followed
                                  : is_followed
                              );
                              ShowToast(
                                result?.code === 200
                                  ? t(Variables, 'toast_operated_successfully')
                                  : `${t(Variables, 'live_load_fail')}:${
                                      result?.code
                                    }`,
                                undefined,
                                undefined
                              );
                              setIs_following(false);
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              backgroundColor: 'rgb(228, 238, 248)',
                              borderRadius: 3,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              paddingBottom: 4,
                              paddingLeft: 14,
                              paddingRight: 14,
                              paddingTop: 4,
                            },
                            dimensions.width
                          )}
                        >
                          <>
                            {is_following || is_followed ? null : (
                              <Icon
                                color={palettes.Brand.appStyle_primary}
                                name={'AntDesign/plus'}
                                size={12}
                                style={StyleSheet.applyWidth(
                                  { marginRight: 4 },
                                  dimensions.width
                                )}
                              />
                            )}
                          </>
                          <>
                            {!is_following ? null : (
                              <LoadingIndicator
                                color={theme.colors.branding.primary}
                                size={14}
                                style={StyleSheet.applyWidth(
                                  { marginRight: 4 },
                                  dimensions.width
                                )}
                                type={'chase'}
                              />
                            )}
                          </>
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand.appStyle_primary,
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {is_followed
                              ? t(Variables, 'common_followed')
                              : t(Variables, 'tab_circle_follow')}
                          </Text>
                        </View>
                      </Touchable>
                    </View>
                  </View>
                  {/* Divider 2 */}
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.Gray[100]}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'].style,
                        { height: 4 }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* 持续追踪 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { overflow: 'hidden' },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderBottomWidth: 2,
                          borderColor: 'rgb(248, 248, 248)',
                          flexDirection: 'row',
                          paddingBottom: 5,
                          paddingTop: 5,
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.Brand.appStyle_primary,
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 20,
                            height: 20,
                            marginRight: 8,
                            width: 3,
                          },
                          dimensions.width
                        )}
                      />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Text Title'].style,
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'opinion_continuous_tracking')}
                      </Text>
                    </View>
                    <SimpleStyleFlatList
                      data={fetchData?.data?.tracing_opinions}
                      decelerationRate={'normal'}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(listData, index) =>
                        listData?.id ??
                        listData?.uuid ??
                        index?.toString() ??
                        JSON.stringify(listData)
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={'Fetch->Scroll View->Container->持续追踪->List'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      pagingEnabled={false}
                      renderItem={({ item, index }) => {
                        const listData = item;
                        return (
                          <>
                            {/* 持续追踪正文 */}
                            <Utils.CustomCodeErrorBoundary>
                              <AccordionGroup
                                caretSize={24}
                                iconSize={24}
                                {...GlobalStyles.AccordionGroupStyles(theme)[
                                  'Accordion'
                                ].props}
                                caretColor={palettes.App['Custom Color 5']}
                                closedColor={palettes.App['Custom Color 5']}
                                expanded={true}
                                label={
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      {...GlobalStyles.TextStyles(theme)[
                                        'Text Title'
                                      ].props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)[
                                            'Text Title'
                                          ].style,
                                          {
                                            fontFamily: 'System',
                                            fontSize: 14,
                                            fontWeight: '600',
                                            lineHeight: 24,
                                            marginRight: null,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {fromUnixTimestamp(
                                        Variables,
                                        listData?.release_time,
                                        'YYYY/MM/DD'
                                      )}{' '}
                                      {t(Variables, 'opinion_append')}{' '}
                                    </Text>
                                    {/* 观点变化 */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignSelf: 'flex-start',
                                          backgroundColor: [
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                palettes.App['Custom Color 15'],
                                            },
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value:
                                                listData?.core_points_updated
                                                  ? palettes.App[
                                                      'Custom Color 15'
                                                    ]
                                                  : palettes.App[
                                                      'Custom Color 34'
                                                    ],
                                            },
                                          ],
                                          borderRadius: 4,
                                          paddingLeft: 4,
                                          paddingRight: 4,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.App['Custom #ffffff'],
                                            fontFamily: 'System',
                                            fontSize: 12,
                                            fontWeight: '400',
                                            letterSpacing: 0.2,
                                            lineHeight: 22,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.core_points_updated
                                          ? t(Variables, 'opinion_changed')
                                          : t(Variables, 'opinion_not_change')}
                                      </Text>
                                    </View>
                                  </View>
                                }
                                openColor={palettes.App['Custom Color 5']}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.AccordionGroupStyles(theme)[
                                      'Accordion'
                                    ].style,
                                    {
                                      fontFamily: 'System',
                                      fontSize: 14,
                                      fontWeight: '600',
                                      letterSpacing: 0.2,
                                      lineHeight: 24,
                                      marginLeft: 14,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      paddingLeft: 21,
                                      paddingRight: 16,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* 实际涨跌幅 */}
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
                                          color: 'rgb(93, 103, 113)',
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '400',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {t(Variables, 'opinion_actual_change')}
                                      {' :'}
                                    </Text>
                                    {/* Text 2 */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color:
                                            listData?.stock_tracing
                                              ?.actual_change >= 0
                                              ? palettes.App['Custom Color 15']
                                              : palettes.App['Custom Color 21'],
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '600',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {listData?.stock_tracing?.actual_change >=
                                      0
                                        ? '+'
                                        : '-'}
                                      {listData?.stock_tracing?.actual_change}
                                      {'%'}
                                    </Text>
                                  </View>
                                  {/* 作者观点 */}
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
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: 'rgb(93, 103, 113)',
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '400',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {t(Variables, 'opinion_author_opinion')}
                                      {' :'}
                                    </Text>
                                    {/* 观点文本-正面 */}
                                    <>
                                      {!(
                                        listData?.expected_trend === 'bullish'
                                      ) ? null : (
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              backgroundColor:
                                                palettes.App['Custom Color 12'],
                                              borderRadius: 4,
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
                                            {...GlobalStyles.TextStyles(theme)[
                                              'Text Form Label 2'
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              StyleSheet.compose(
                                                GlobalStyles.TextStyles(theme)[
                                                  'Text Form Label 2'
                                                ].style,
                                                {
                                                  color: palettes.App.White,
                                                  fontFamily: 'System',
                                                  fontSize: 12,
                                                  fontWeight: '400',
                                                  lineHeight: 14,
                                                }
                                              ),
                                              dimensions.width
                                            )}
                                          >
                                            {t(
                                              Variables,
                                              'tab_create_point_personal_1'
                                            )}
                                          </Text>
                                        </View>
                                      )}
                                    </>
                                    {/* 观点文本-谨慎 */}
                                    <>
                                      {!(
                                        listData?.expected_trend === 'bearish'
                                      ) ? null : (
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              backgroundColor:
                                                palettes.App['Custom Color 21'],
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
                                            {...GlobalStyles.TextStyles(theme)[
                                              'Text Form Label 2'
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              StyleSheet.compose(
                                                GlobalStyles.TextStyles(theme)[
                                                  'Text Form Label 2'
                                                ].style,
                                                {
                                                  color: palettes.App.White,
                                                  fontFamily: 'System',
                                                  fontSize: 12,
                                                  fontWeight: '400',
                                                  lineHeight: 14,
                                                }
                                              ),
                                              dimensions.width
                                            )}
                                          >
                                            {t(
                                              Variables,
                                              'tab_create_point_personal_3'
                                            )}
                                          </Text>
                                        </View>
                                      )}
                                    </>
                                    {/* 观点文本-中性 */}
                                    <>
                                      {!(
                                        listData?.expected_trend === 'none'
                                      ) ? null : (
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              backgroundColor:
                                                palettes.App['Custom Color 22'],
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
                                            {...GlobalStyles.TextStyles(theme)[
                                              'Text Form Label 2'
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              StyleSheet.compose(
                                                GlobalStyles.TextStyles(theme)[
                                                  'Text Form Label 2'
                                                ].style,
                                                {
                                                  color: palettes.App.White,
                                                  fontFamily: 'System',
                                                  fontSize: 12,
                                                  fontWeight: '400',
                                                  lineHeight: 14,
                                                }
                                              ),
                                              dimensions.width
                                            )}
                                          >
                                            {t(
                                              Variables,
                                              'tab_create_point_personal_2'
                                            )}
                                          </Text>
                                        </View>
                                      )}
                                    </>
                                  </View>
                                  {/* 预期涨跌幅 */}
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
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: 'rgb(93, 103, 113)',
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '400',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {t(
                                        Variables,
                                        'tab_create_point_preview_rate'
                                      )}
                                      {' :'}
                                    </Text>
                                    {/* Text 2 */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: palettes.App['Custom Color 5'],
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '600',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {listData?.stock_tracing
                                        ?.expected_change >= undefined
                                        ? '+'
                                        : '-'}
                                      {listData?.stock_tracing?.expected_change}
                                      {'%'}
                                    </Text>
                                  </View>
                                  {/* 预期时间 */}
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
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: 'rgb(93, 103, 113)',
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '400',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {t(
                                        Variables,
                                        'tab_create_point_preview_time'
                                      )}
                                      {' :'}
                                    </Text>
                                    {/* Text 2 */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: palettes.App['Custom Color 5'],
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '600',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {listData?.stock_tracing?.duration === 3
                                        ? t(
                                            Variables,
                                            'tab_create_point_preview_time_1'
                                          )
                                        : listData?.stock_tracing?.duration ===
                                          6
                                        ? t(
                                            Variables,
                                            'tab_create_point_preview_time_2'
                                          )
                                        : listData?.stock_tracing?.duration ===
                                          12
                                        ? 'tab_create_point_preview_time_5'
                                        : listData?.stock_tracing?.duration ===
                                          24
                                        ? t(
                                            Variables,
                                            'tab_create_point_preview_time_4'
                                          )
                                        : t(
                                            Variables,
                                            'tab_create_point_preview_time_5'
                                          )}
                                    </Text>
                                  </View>
                                  {/* 预期时间 2 */}
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
                                    {/* Text 2 */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: palettes.Gray[400],
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '600',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'('}
                                      {fromUnixTimestamp(
                                        Variables,
                                        listData?.stock_tracing?.start_time,
                                        'YYYY/MM/DD'
                                      )}
                                      {'-'}
                                      {DateUtils.format(
                                        DateUtils.addMonths(
                                          new Date(
                                            fromUnixTimestamp(
                                              Variables,
                                              listData?.stock_tracing
                                                ?.start_time,
                                              'YYYY-MM-DD HH:mm:ss'
                                            )
                                          ),
                                          listData?.stock_tracing?.duration
                                        ),
                                        'YYYY/MM/DD'
                                      )}
                                      {')'}
                                    </Text>
                                  </View>
                                  {/* 初始价格 */}
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
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: 'rgb(93, 103, 113)',
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '400',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {t(Variables, 'opinion_initial_price')}
                                      {' :'}
                                    </Text>
                                    {/* Text 2 */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: palettes.App['Custom Color 5'],
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '600',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {listData?.stock_tracing?.initial_price}{' '}
                                      {
                                        listData?.stock_tracing
                                          ?.tracing_corporation?.currency
                                      }
                                    </Text>
                                  </View>
                                  {/* 初始价格 2 */}
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
                                    {/* Text 2 */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: palettes.Gray[400],
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '600',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'('}
                                      {fromUnixTimestamp(
                                        Variables,
                                        listData?.initial_price_time,
                                        'YYYY/MM/DD'
                                      )}
                                      {')'}
                                    </Text>
                                  </View>
                                  {/* 近期终期价格 */}
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
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: 'rgb(93, 103, 113)',
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '400',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {t(Variables, 'opinion_current_price')}
                                      {' :'}
                                    </Text>
                                    {/* Text 2 */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: palettes.App['Custom Color 5'],
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '600',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {listData?.stock_tracing?.current_price}{' '}
                                      {
                                        listData?.stock_tracing
                                          ?.tracing_corporation?.currency
                                      }
                                    </Text>
                                  </View>
                                  {/* 近期终期价格 2 */}
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
                                    {/* Text 2 */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: palettes.Gray[400],
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '600',
                                          letterSpacing: 0.2,
                                          lineHeight: 24,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'('}
                                      {fromUnixTimestamp(
                                        Variables,
                                        listData?.current_price_updated_at,
                                        'YYYY/MM/DD'
                                      )}
                                      {')'}
                                    </Text>
                                  </View>
                                  <View>
                                    <Utils.CustomCodeErrorBoundary>
                                      <gf.RenderHtml
                                        source={{
                                          html: `${listData?.content}`,
                                        }}
                                      />
                                    </Utils.CustomCodeErrorBoundary>
                                  </View>
                                  {/* 点赞评论 */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        flexDirection: 'row',
                                        marginBottom: 10,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <Touchable
                                      onPress={() => {
                                        const handler = async () => {
                                          try {
                                            const result = (
                                              await aceCampTestSnsActionsDoPOST.mutateAsync(
                                                {
                                                  action: listData
                                                    ?.sns_action_flag?.liked
                                                    ? 'unlike'
                                                    : 'like',
                                                  target_id: listData?.id,
                                                  target_type: 'Opinion',
                                                }
                                              )
                                            )?.json;
                                            if (result?.code !== 200) {
                                              return;
                                            }
                                            doLike(undefined);
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        };
                                        handler();
                                      }}
                                    >
                                      {/* 点赞 */}
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
                                        <Icon
                                          color={
                                            (listData?.sns_action_flag?.liked
                                              ? palettes.Brand.appStyle_primary
                                              : palettes.Gray[500]) ??
                                            palettes.Gray[500]
                                          }
                                          name={'AntDesign/like2'}
                                          size={14}
                                          style={StyleSheet.applyWidth(
                                            { marginRight: 5 },
                                            dimensions.width
                                          )}
                                        />
                                        <Text
                                          accessible={true}
                                          selectable={false}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: [
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: palettes.Gray[500],
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: listData
                                                    ?.sns_action_flag?.liked
                                                    ? palettes.Brand
                                                        .appStyle_primary
                                                    : palettes.Gray[500],
                                                },
                                              ],
                                              fontFamily: 'System',
                                              fontSize: 11,
                                              fontWeight: '400',
                                              letterSpacing: 0.2,
                                              lineHeight: 14,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.like_count}
                                        </Text>
                                      </View>
                                    </Touchable>
                                    {/* Touchable 2 */}
                                    <Touchable
                                      onPress={() => {
                                        const handler = async () => {
                                          try {
                                            const result = (
                                              await aceCampTestSnsActionsDoPOST.mutateAsync(
                                                {
                                                  action: listData
                                                    ?.sns_action_flag?.disliked
                                                    ? 'undislike'
                                                    : 'dislike',
                                                  target_id: listData?.id,
                                                  target_type: 'Opinion',
                                                }
                                              )
                                            )?.json;
                                            if (result?.code !== 200) {
                                              return;
                                            }
                                            doDislike(undefined);
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        };
                                        handler();
                                      }}
                                      style={StyleSheet.applyWidth(
                                        { marginLeft: 15 },
                                        dimensions.width
                                      )}
                                    >
                                      {/* 不喜欢 */}
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
                                        <Icon
                                          color={
                                            (listData?.sns_action_flag?.disliked
                                              ? palettes.Brand.appStyle_primary
                                              : palettes.Gray[500]) ??
                                            palettes.Gray[500]
                                          }
                                          name={'AntDesign/dislike2'}
                                          size={14}
                                          style={StyleSheet.applyWidth(
                                            { marginRight: 5 },
                                            dimensions.width
                                          )}
                                        />
                                        <Text
                                          accessible={true}
                                          selectable={false}
                                          style={StyleSheet.applyWidth(
                                            {
                                              color: [
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: palettes.Gray[500],
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: listData
                                                    ?.sns_action_flag?.disliked
                                                    ? palettes.Brand
                                                        .appStyle_primary
                                                    : palettes.Gray[500],
                                                },
                                              ],
                                              fontFamily: 'System',
                                              fontSize: 11,
                                              fontWeight: '400',
                                              letterSpacing: 0.2,
                                              lineHeight: 14,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.dislike_count}
                                        </Text>
                                      </View>
                                    </Touchable>
                                  </View>
                                </View>

                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      borderColor: 'rgb(248, 248, 248)',
                                      borderRightWidth: 2,
                                      flexDirection: 'row',
                                      height: 1000,
                                      left: 10,
                                      position: 'absolute',
                                      top: 0,
                                    },
                                    dimensions.width
                                  )}
                                />
                              </AccordionGroup>
                            </Utils.CustomCodeErrorBoundary>
                            <Circle
                              {...GlobalStyles.CircleStyles(theme)['Circle']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.CircleStyles(theme)['Circle']
                                    .style,
                                  {
                                    height: 10,
                                    left: [
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 5,
                                      },
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: 5.5,
                                      },
                                    ],
                                    position: 'absolute',
                                    top: 14,
                                    width: 10,
                                  }
                                ),
                                dimensions.width
                              )}
                            />
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      snapToAlignment={'start'}
                      extraData={refresh}
                      style={StyleSheet.applyWidth(
                        { overflow: 'hidden' },
                        dimensions.width
                      )}
                    />
                  </View>
                  {/* Divider 2 2 */}
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.Gray[100]}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'].style,
                        { height: 4 }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* 观点正文 */}
                  <View>
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          borderBottomWidth: 2,
                          borderColor: 'rgb(248, 248, 248)',
                          flexDirection: 'row',
                          paddingBottom: 5,
                          paddingTop: 5,
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: palettes.Brand.appStyle_primary,
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 20,
                            height: 20,
                            marginRight: 8,
                            width: 3,
                          },
                          dimensions.width
                        )}
                      />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                        style={StyleSheet.applyWidth(
                          GlobalStyles.TextStyles(theme)['Text Title'].style,
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'opinion_research_details')}
                      </Text>
                    </View>

                    <AccordionGroup
                      caretSize={24}
                      iconSize={24}
                      {...GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                        .props}
                      caretColor={palettes.App['Custom Color 5']}
                      closedColor={palettes.App['Custom Color 5']}
                      expanded={true}
                      label={`${fromUnixTimestamp(
                        Variables,
                        fetchData?.data?.release_time,
                        'YYYY/MM/DD'
                      )} ${t(Variables, 'common_release')}`}
                      openColor={palettes.App['Custom Color 5']}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                            .style,
                          {
                            fontFamily: 'System',
                            fontSize: 14,
                            fontWeight: '600',
                            letterSpacing: 0.2,
                            lineHeight: 24,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          { paddingLeft: 16, paddingRight: 16 },
                          dimensions.width
                        )}
                      >
                        {/* 实际涨跌幅 */}
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
                                color: 'rgb(93, 103, 113)',
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'opinion_actual_change')}
                            {' :'}
                          </Text>
                          {/* Text 2 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color:
                                  fetchData?.data?.stock_tracing
                                    ?.actual_change >= 0
                                    ? palettes.App['Custom Color 15']
                                    : palettes.App['Custom Color 21'],
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '600',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.data?.stock_tracing?.actual_change >= 0
                              ? '+'
                              : '-'}
                            {fetchData?.data?.stock_tracing?.actual_change}
                            {'%'}
                          </Text>
                        </View>
                        {/* 作者观点 */}
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
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: 'rgb(93, 103, 113)',
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'opinion_author_opinion')}
                            {' :'}
                          </Text>
                          {/* 观点文本-正面 */}
                          <>
                            {!(
                              fetchData?.data?.stock_tracing?.actual_change >= 0
                            ) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    backgroundColor:
                                      palettes.App['Custom Color 12'],
                                    borderRadius: 4,
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
                                  {...GlobalStyles.TextStyles(theme)[
                                    'Text Form Label 2'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)[
                                        'Text Form Label 2'
                                      ].style,
                                      {
                                        color: palettes.App.White,
                                        fontFamily: 'System',
                                        fontSize: 12,
                                        fontWeight: '400',
                                        lineHeight: 14,
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
                        </View>
                        {/* 预期涨跌幅 */}
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
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: 'rgb(93, 103, 113)',
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'tab_create_point_preview_rate')}
                            {' :'}
                          </Text>
                          {/* Text 2 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App['Custom Color 5'],
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '600',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.data?.stock_tracing?.expected_change >=
                            0
                              ? '+'
                              : '-'}
                            {fetchData?.data?.stock_tracing?.expected_change}
                            {'%'}
                          </Text>
                        </View>
                        {/* 预期时间 */}
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
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: 'rgb(93, 103, 113)',
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'tab_create_point_preview_time')}
                            {' :'}
                          </Text>
                          {/* Text 2 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App['Custom Color 5'],
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '600',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.data?.stock_tracing?.duration === 3
                              ? t(Variables, 'tab_create_point_preview_time_1')
                              : undefined
                              ? t(Variables, 'tab_create_point_preview_time_2')
                              : undefined
                              ? 'tab_create_point_preview_time_5'
                              : undefined
                              ? t(Variables, 'tab_create_point_preview_time_4')
                              : t(Variables, 'tab_create_point_preview_time_5')}
                          </Text>
                        </View>
                        {/* 预期时间 2 */}
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
                          {/* Text 2 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Gray[400],
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '600',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {'('}
                            {fromUnixTimestamp(
                              Variables,
                              fetchData?.data?.stock_tracing?.start_time,
                              'YYYY/MM/DD'
                            )}
                            {'-'}
                            {DateUtils.format(
                              DateUtils.addMonths(
                                new Date(
                                  fromUnixTimestamp(
                                    Variables,
                                    fetchData?.data?.stock_tracing?.start_time,
                                    'YYYY-MM-DD HH:mm:ss'
                                  )
                                ),
                                fetchData?.data?.stock_tracing?.duration
                              ),
                              'YYYY/MM/DD'
                            )}
                            {')'}
                          </Text>
                        </View>
                        {/* 初始价格 */}
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
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: 'rgb(93, 103, 113)',
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'opinion_initial_price')}
                            {' :'}
                          </Text>
                          {/* Text 2 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App['Custom Color 5'],
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '600',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.data?.stock_tracing?.initial_price}{' '}
                            {
                              fetchData?.data?.stock_tracing
                                ?.tracing_corporation?.currency
                            }
                          </Text>
                        </View>
                        {/* 初始价格 2 */}
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
                          {/* Text 2 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Gray[400],
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '600',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {'('}
                            {fromUnixTimestamp(
                              Variables,
                              fetchData?.data?.initial_price_time,
                              'YYYY/MM/DD'
                            )}
                            {')'}
                          </Text>
                        </View>
                        {/* 近期终期价格 */}
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
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: 'rgb(93, 103, 113)',
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '400',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'opinion_current_price')}
                            {' :'}
                          </Text>
                          {/* Text 2 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App['Custom Color 5'],
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '600',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {fetchData?.data?.stock_tracing?.current_price}{' '}
                            {
                              fetchData?.data?.stock_tracing
                                ?.tracing_corporation?.currency
                            }
                          </Text>
                        </View>
                        {/* 近期终期价格 2 */}
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
                          {/* Text 2 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Gray[400],
                                fontFamily: 'System',
                                fontSize: 14,
                                fontWeight: '600',
                                letterSpacing: 0.2,
                                lineHeight: 24,
                              },
                              dimensions.width
                            )}
                          >
                            {'('}
                            {fromUnixTimestamp(
                              Variables,
                              fetchData?.data?.current_price_updated_at,
                              'YYYY/MM/DD'
                            )}
                            {')'}
                          </Text>
                        </View>

                        <View>
                          <Utils.CustomCodeErrorBoundary>
                            <gf.RenderHtml
                              source={{ html: `${fetchData?.data?.content}` }}
                            />
                          </Utils.CustomCodeErrorBoundary>
                        </View>
                      </View>
                    </AccordionGroup>
                  </View>
                  {/* 免责声明 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: palettes.App['Custom Color 31'],
                        borderRadius: 4,
                        marginLeft: 16,
                        marginRight: 16,
                        marginTop: 20,
                        paddingBottom: 20,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 20,
                        zIndex: 500,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: 'rgb(158, 165, 167)',
                          fontFamily: 'System',
                          fontSize: 12,
                          fontWeight: '400',
                          lineHeight: 24,
                        },
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'article_detail_copyright')}
                    </Text>
                  </View>
                  {/* Divider 2 2 2 */}
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.Gray[100]}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'].style,
                        { height: 4, marginTop: 16 }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* 相关推荐-标题 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginBottom: 10,
                        marginTop: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    <LinearGradient
                      color1={palettes.App['Custom Color 33']}
                      color2={palettes.App['Custom Color 33']}
                      color3={'rgba(0, 0, 0, 0)'}
                      endX={0}
                      endY={5}
                      startX={200}
                      startY={5}
                      style={StyleSheet.applyWidth(
                        { flex: 1, height: 2 },
                        dimensions.width
                      )}
                    />
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: 'rgb(95, 136, 247)',
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '600',
                          letterSpacing: 0.2,
                          lineHeight: 24,
                          marginLeft: 20,
                          marginRight: 20,
                        },
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'article_detail_recommand')}
                    </Text>
                    {/* Linear Gradient 3 */}
                    <LinearGradient
                      color1={palettes.App['Custom Color 33']}
                      color2={palettes.App['Custom Color 33']}
                      color3={'rgba(0, 0, 0, 0)'}
                      endX={100}
                      endY={5}
                      startX={0}
                      startY={5}
                      style={StyleSheet.applyWidth(
                        { flex: 1, height: 2 },
                        dimensions.width
                      )}
                    />
                  </View>
                  {/* 相关推荐 */}
                  <View
                    style={StyleSheet.applyWidth(
                      { paddingLeft: 16, paddingRight: 16 },
                      dimensions.width
                    )}
                  >
                    <AceCampTestApi.FetchArticleInfoSimilarGET
                      handlers={{
                        onData: fetchData => {
                          try {
                            const result = splitList(fetchData?.data, 5);
                            setRecommand_data_list(result);
                            console.log(result);
                          } catch (err) {
                            console.error(err);
                          }
                        },
                      }}
                      source_id={props.route?.params?.id ?? defaultProps.id}
                      source_type={'Opinion'}
                    >
                      {({
                        loading,
                        error,
                        data,
                        refetchArticleInfoSimilar,
                      }) => {
                        const fetchData = data?.json;
                        if (loading) {
                          return <ActivityIndicator />;
                        }

                        if (
                          error ||
                          data?.status < 200 ||
                          data?.status >= 300
                        ) {
                          return <ActivityIndicator />;
                        }

                        return (
                          <Swiper
                            data={recommand_data_list}
                            dotActiveColor={theme.colors.branding.primary}
                            dotColor={theme.colors.text.light}
                            dotsTouchable={true}
                            hideDots={false}
                            keyExtractor={(swiperData, index) =>
                              swiperData?.id ??
                              swiperData?.uuid ??
                              index?.toString() ??
                              JSON.stringify(swiperData)
                            }
                            listKey={
                              'Fetch->Scroll View->Container->相关推荐->Fetch->Swiper'
                            }
                            minDistanceForAction={0.2}
                            minDistanceToCapture={5}
                            renderItem={({ item, index }) => {
                              const swiperData = item;
                              return (
                                <SwiperItem>
                                  <SimpleStyleFlashList
                                    data={swiperData}
                                    estimatedItemSize={50}
                                    horizontal={false}
                                    inverted={false}
                                    keyExtractor={(flashListData, index) =>
                                      flashListData?.id ??
                                      flashListData?.uuid ??
                                      index?.toString() ??
                                      JSON.stringify(flashListData)
                                    }
                                    listKey={JSON.stringify(swiperData)}
                                    numColumns={1}
                                    onEndReachedThreshold={0.5}
                                    renderItem={({ item, index }) => {
                                      const flashListData = item;
                                      return (
                                        <Touchable
                                          onPress={() => {
                                            try {
                                              navigation.push(
                                                'ArticleDetailScreen',
                                                {
                                                  article_info_id:
                                                    flashListData?.source_id,
                                                }
                                              );
                                            } catch (err) {
                                              console.error(err);
                                            }
                                          }}
                                        >
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  palettes.App[
                                                    'Custom Color 31'
                                                  ],
                                                borderRadius: 4,
                                                marginBottom: 5,
                                                marginTop: 5,
                                                paddingBottom: 5,
                                                paddingLeft: 5,
                                                paddingRight: 5,
                                                paddingTop: 5,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  paddingBottom: 3,
                                                  paddingTop: 3,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <Text
                                                accessible={true}
                                                selectable={false}
                                                ellipsizeMode={'tail'}
                                                numberOfLines={1}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    fontFamily: 'System',
                                                    fontSize: 14,
                                                    fontWeight: '600',
                                                    letterSpacing: 0.2,
                                                    lineHeight: 24,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {flashListData?.source_type ===
                                                'Event'
                                                  ? flashListData?.source.name
                                                  : flashListData?.source.title}
                                              </Text>
                                            </View>
                                            {/* View 2 */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: 'center',
                                                  flexDirection: 'row',
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    borderColor:
                                                      palettes.App
                                                        .Peoplebit_Light_Stone_Gray,
                                                    borderRadius: 4,
                                                    borderWidth: 1,
                                                    paddingBottom: 2,
                                                    paddingLeft: 4,
                                                    paddingRight: 4,
                                                    paddingTop: 2,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Text
                                                  accessible={true}
                                                  selectable={false}
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      color:
                                                        palettes.App[
                                                          'Custom Color 34'
                                                        ],
                                                      fontFamily: 'System',
                                                      fontSize: 13,
                                                      fontWeight: '400',
                                                      letterSpacing: 0.2,
                                                      lineHeight: 17,
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {getArticleType(
                                                    Variables,
                                                    flashListData?.source_type
                                                  )}
                                                </Text>
                                              </View>

                                              <Text
                                                accessible={true}
                                                selectable={false}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color:
                                                      palettes.App[
                                                        'Custom Color 34'
                                                      ],
                                                    fontFamily: 'System',
                                                    fontSize: 13,
                                                    fontWeight: '400',
                                                    letterSpacing: 0.2,
                                                    lineHeight: 17,
                                                    marginLeft: 10,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {fromUnixTimestamp(
                                                  Variables,
                                                  flashListData?.source
                                                    .release_time,
                                                  'YYYY/MM/DD HH:mm'
                                                )}
                                              </Text>
                                            </View>
                                          </View>
                                        </Touchable>
                                      );
                                    }}
                                    showsHorizontalScrollIndicator={true}
                                    showsVerticalScrollIndicator={true}
                                  />
                                </SwiperItem>
                              );
                            }}
                            vertical={false}
                            {...GlobalStyles.SwiperStyles(theme)['Swiper']
                              .props}
                            loop={true}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.SwiperStyles(theme)['Swiper']
                                  .style,
                                { height: 400 }
                              ),
                              dimensions.width
                            )}
                            timeout={5000}
                          />
                        );
                      }}
                    </AceCampTestApi.FetchArticleInfoSimilarGET>
                  </View>
                  {/* Divider 2 2 2 2 */}
                  <Divider
                    {...GlobalStyles.DividerStyles(theme)['Divider'].props}
                    color={palettes.Gray[100]}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.DividerStyles(theme)['Divider'].style,
                        { height: 4 }
                      ),
                      dimensions.width
                    )}
                  />
                  <AceCampTestApi.FetchCommentListGET
                    handlers={{
                      onData: fetchData => {
                        try {
                          setComment_list(fetchData?.data);
                          setTotal_record(fetchData?.meta?.total);
                          setPage(2);
                        } catch (err) {
                          console.error(err);
                        }
                      },
                    }}
                    page={1}
                    per_page={15}
                    subject_id={props.route?.params?.id ?? defaultProps.id}
                    subject_type={'Opinion'}
                  >
                    {({ loading, error, data, refetchCommentList }) => {
                      const fetchData = data?.json;
                      if (loading) {
                        return <ActivityIndicator />;
                      }

                      if (error || data?.status < 200 || data?.status >= 300) {
                        return <ActivityIndicator />;
                      }

                      return (
                        <>
                          {/* 评论 */}
                          <View>
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  borderBottomWidth: 2,
                                  borderColor: 'rgb(248, 248, 248)',
                                  flexDirection: 'row',
                                  paddingBottom: 5,
                                  paddingTop: 5,
                                },
                                dimensions.width
                              )}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor:
                                      palettes.Brand.appStyle_primary,
                                    borderBottomRightRadius: 20,
                                    borderTopRightRadius: 20,
                                    height: 20,
                                    marginRight: 8,
                                    width: 3,
                                  },
                                  dimensions.width
                                )}
                              />
                              <Text
                                accessible={true}
                                selectable={false}
                                {...GlobalStyles.TextStyles(theme)['Text Title']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.TextStyles(theme)['Text Title']
                                    .style,
                                  dimensions.width
                                )}
                              >
                                {t(Variables, 'my_point_comment_num')}
                              </Text>
                            </View>
                            {/* View 2 */}
                            <View>
                              <SimpleStyleFlatList
                                data={comment_list}
                                decelerationRate={'normal'}
                                horizontal={false}
                                inverted={false}
                                keyExtractor={(listData, index) =>
                                  listData?.id ??
                                  listData?.uuid ??
                                  index?.toString() ??
                                  JSON.stringify(listData)
                                }
                                keyboardShouldPersistTaps={'never'}
                                listKey={
                                  'Fetch->Scroll View->Container->Fetch->评论->View 2->List'
                                }
                                nestedScrollEnabled={false}
                                numColumns={1}
                                onEndReachedThreshold={0.5}
                                pagingEnabled={false}
                                renderItem={({ item, index }) => {
                                  const listData = item;
                                  return (
                                    <>
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            paddingLeft: 16,
                                            paddingRight: 16,
                                            paddingTop: 10,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        <>
                                          {!listData?.user?.avatar ? null : (
                                            <Image
                                              resizeMode={'cover'}
                                              {...GlobalStyles.ImageStyles(
                                                theme
                                              )['Image'].props}
                                              source={imageSource(
                                                `${listData?.user?.avatar}`
                                              )}
                                              style={StyleSheet.applyWidth(
                                                StyleSheet.compose(
                                                  GlobalStyles.ImageStyles(
                                                    theme
                                                  )['Image'].style,
                                                  { height: 32, width: 32 }
                                                ),
                                                dimensions.width
                                              )}
                                            />
                                          )}
                                        </>
                                        {/* Image 2 */}
                                        <>
                                          {listData?.user?.avatar ? null : (
                                            <Image
                                              resizeMode={'cover'}
                                              {...GlobalStyles.ImageStyles(
                                                theme
                                              )['Image'].props}
                                              source={imageSource(
                                                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANcAAADYCAYAAAB4K3ZgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABbNSURBVHgB7Z17lhNHlsZvpFRFlaGMxKtNT48pZhbgopnpY6b/oFiBYQXACsArAFYArIBiBcYrsPzHTJ8zZ+ZQvYBphIe2ebZUbYp6SMrouJISslR6pJQRmV+k7u8cjKQqMCXll/feL27cUCRA86yhK0u0Wxl8fZeWmuerqkkCLIqETGGxHKXtVU1qNTC/KAjOKdIVrWnVfBwVfkz83DxO+neaP2NEpprmz5jfe4/Ni3UKw+ch6XpIYXOXjm2KGLNFxOWISESKgnUWEGm9Zt5sIyoWUT6wCI0AN0mZX0Z4bepsiujcIeKyxC+NndUSddaDoHRZa7VmIsgaeYMRG5lIp8MfNYW1M9VjmySkRsQ1I/3IdJXFZKLS1WnSOHR6ES6oidjSIeKagjeNX02KVzZiUlf9ikzpUBzVFNVaYfvx2epKjYREiLgm0BPUwjdKhzeKFJ1mRYSWHBHXELh+Kgd0XWl9WwQ1mkhoYdh5KKnjYURcfbiGWqEP61oFt8zTdRKmgoUWarrXIaqdrS7XSRBxsaiOBbu3JErZobvmptSTVkj35l1kcysurqVUUL5uFm9vkOCKWlu3781rbTZ34uoaFKp8hyT1y4woZTxTXd6gOWJuxCWiyp95E1nhxfW68X5NqdJ9ElHBwCJr6fbNoqeLhRVXz6jYu0PGqCABEqVoo8jGRyHF9WZr5464fx6h9IN2qB4WTWSFElfXAVTlR3l2nguzUcR6rBDi6i4AB7v3xVYvBMa+p5tFiGLei+tVY/tqSalHkgIWDEV3Tx9fvkce4624utFK7bCorpJQSHquIl3xNYoF5CFcW62o3acirGLDtXNZqacvGx+8dHy9i1xvtnbvi70+f/ho23sjru42EKW+m6dNisJBeo5i55ov21u8SAvZtFhQ+qkIa77hNFGp0lNexyQPgBfXu629O4EKvhM3UPiIprtvtj7cJ3Bg00JZuxImge4mQopL6ishKcgCg0sLWVgLin4QYQlJiOx6rssJDChx8fYQNi6kN1CYDl3huhxtPQxGXG//vn/dvEE/iHEhzEpJqftITiJEzcXC0mFngwTBBiB9iblHrndbu7dEWIJVulZ9/hEsV3HxGlao9QMSBNsACCy3tFBSQSETckwRcxGXCEvIlJwElrm4+iPOfiBByJIcBJapuHgdS+x2IS9UULpx6vPFx5QRmYkr6ryQBWIhT7TuXMhqy0ombqEIS0BBmZKEr0fKgEzEVVYk484EEHSFb/SNhnZemjgXF69lkYySFoDgG31b7X5HjnEqLu6+CHV4lwQBj3XXGy6dGRq9PVn0jAQBGJcOohNxiYEh+INqtrW+4GKzpZO0cCGgOyIswQ90hXe9uzA4rIur2+Uucy8Er9Br7cB+k6/VtLCXDvJOYunAEPyjrdtXbB7IZzVy9eosEZbgJwuq/MhmemhNXLyeJXWW4DO99a+9R2QJK2mh2O5CkTBrs9d+Uz36hFJiRVxvmzvPJGr5w94e0f6+JgSWlxSVFwgKnoVY0ksXqlXVpBSUKSW9Lgy9SoIXtNtEr151qNUmCE6eVFQ5jjU+s5se9tzDbykFqX4qTge1HOfjFX9rhDDCYvb3CROtbv/CG3tTkEpcsljsF8YJo19/xUgHI8KQYCmrcqq1r5nF1YtasljsC5wOctRCY28PS+wDrKeZ4juzuHrz3AUf4Ojw888dQoRFjxy9Siq4M+va10ziet14f0PSQX/gdBCpzhok7CBHL13Zp9mi10xWvFjv/sA11us3wKHBcPaLgD77DPkEYdUs6yPnp7Xmp45cErX8gVOuBmCdNch+C7ruIo5eszT2Tn27kKjlDy9edGgP1eqOsbKi6Mxp/OO525rOT7Pva6qfSKKWP3Cd5YOwGGRDIw4vPU3z/VNFLolafsDtTS/+iukODqNcJjr3ZYl8oKyXqklrr8SRS6KWH0TtTT6BbsfHmcY5TCyuQJVgTuwTRoPW3pQUbDv+E0YHt5KueyUSl0QtP9jawmtvSsrOLnlC8nWvROJSqnSdBGhQ25uS0gn9uSkkjV4TxdWfq71OAjTc3uRL3TIM2O74oehKhz6sT/quieKa1n4Usge9vSkJfomLd6QEtyZ9z1hxNRqNitb6KgmwcI3lczoY0fHE0IixPmm/11hxtWjBCEumOaHiS3tTEnyy4yNKVBobeMaKS4wMbLgh1/d0ME6r7Vf0UioYq4+R4hIjAxuus3Z2/LTdR7G/R56hK+NSw5HiKpPUWqj4bruPwic7PmLcKICR4lJKTXRDhOxB3lWcFt8cwx5qbdSa11BxvW7sr0lHBiZv3xWrzorjp7h0pUXbQ7O8oeIyqyaSEgLCtruv7U1J8NCO76IpSC6uQKlvSICC6yyOWkXGRzueCVRweVhqeEhcPZdQrZEAhe/tTUnxzY7voSu79P6QZg6Jq0SddRKgKEJ7U1L8s+N7DFtQPiQupcqSEgLBa1lFtN1H4WfkGl5KDam5wnUSIOAa5A34WDTbtD2N0OyuN3b0ufhrB8T1prGzLr2EOPi6qzgNftrxPVq721fizwcilxYjAwTEQxOyoAU/w3AMQenygacHvigWPARFbW9KAjuivrqigT7YiyuRC4witzclxVdTY7Du+igubnmSeit/5sl2H4WvdjzT2f1wIXocfHrQWiUhV7jGam7NZzoYx9fIxYSk1qPHwbAXhewp0q7itPhqxzNKqa+ix8GwF4XsefkS5xDwvPHZjo+3DsYMDTEz8sKnQxOywGs7nnQlMjW64uIpT2Jm5AMfmjCvtvsofLbjmcjU6IqrTUsStXLAx0MTssJnU6NNapV/76eFkhLmwTy2NyXFZzs+6O/i74pLtvRnj8+HJmSBz5FLx8WlVHCOhMyY5/ampPhsx5f6znuUFoqZkSHzsqs4DT7b8bpvDkrNlTHS3pQM7+34hq70xSU2fBYgHppQLk91LHZm+G7Hb9P2atAfWy04BrW96Z9+G1CQ+PDebPHZ1FgitRqUqCRRKwMQD02oVpWJXKYAL2FGL5/t+NCkhoGijojLMYiHJnA6eKLaC1mLiwSJ393xAYsrFHE5BNF2D8ynzungp+cEidfd8Ry5QrHhnYG6q7hapW46GBF/jITPdrwyJiHoPasYIB6asLysqHL84Me+sIBZc/k9rEYdD8yC1yoJ1kE8NIHrrDOnD99PyyWChCN/22OBSeRyAOqhCSf67uAgqJGL8fTgky4iLgcgtjetrKjur2GgGhqM593xgk0Q25vitvswWFyo0Wtv39Mxa6Guirgsgnpowqh0ME4Amhl6OyBUqeMiLkugHpowLh2Ms3iEIPHVjteK6iIuSyDuKp6UDsaB7S8Ut3C+QT00IUk6GIG6kOyzHW9SbV0nYWZQdxUnTQcjUJt3GV/teIlcKUBtb5omHYxYXMQVl492vA7D5yKuFKDuKj5zWk2d5pWArwRf7XiTFpbqJEwN6qEJx4+rbv/gtKDWXIyPdrwm1Qw0lZokTAXqruJZ0sE4qAvJaHvhkhBQ2Aw61BFxTQnqoQlpt+wjO4a+0TFGYXC2ulwnITGohyZUqyq1OMSOt0eH00J+YJKBOgkTQT00IW06+OnvIVj2W+QVR+lovT/OWktqOAHkQxPiW/bTAL31xLPzKkwm0YtcWus/kzAW1EMTbKSDEajNu4xfdrze5P9GQ0Elco0B9dAEW+lgxJEjuOrya1hNT0/9TybcJGEoyIcm2EoHI5A3Te7t+RO5okywb2jIQvIoUA9NsJkORrC4UAXmkx0f9g3C/smS4hYO4907zPamI4t208E4qA28Ptnxmjqfaq7eWpc4hnFQ25t4oOcXX7gLL6jTdxlf7PglOhY3NBgldVcf1PYmZnCgp22Q6y4/7HjVZBueH318K8WO/wTioQnMsIGetkFeSPbDjtcfg1TskxLHkEE8NIEZNdDTNsgLyT7Y8fEg9fHT6lCpRnMOsu1+woE7OAzU6buMD3Z8QLr26XGfeTc1UHcVM9Nu2U+DRK50tCgYlhZ2n9ZoTkE8NIGx3YUx+f9H0CDb8eZfVo/vMjn4qenwR5pDEA9NiMgqHYyDHL2Q7XizSlI78Pzgl+fPjkc9NIHJMh2Mg9zAuw8cuUxpcSA4HRDX6epybd7qLtT2pqzTwTio03cZ5LrLVOy1+PMhn9781F2o05uYPNLBCOSFZFRxDdZbzOG3cU7qLtRDExie4JRHOhgBvZAMascP1lvd1wZfKNPeBhUc1EMTmDzTwYiFstjx09IK248HXzv0KVarVa65alRg3r7FtN0ZHuiZd1pWBnYLGTw7XjXPVldqg68O/xg1FTY15Dpr+wNmajHrQE/bLICvdaHZ8eGIUmrUPbJGBQS5vYnTwVMnMZwE5E2TDJodr0g9Gfb60LeQLfmijVtDbm9ibG/ZTwvyqSdoddcCLSUXF6M1PaYCgWy7V3O03UeBvGkSSVxK0Ua0f2uQkeIy//4NKgiou4oZBHdwGDKsJiFh+P2oL418C/sLYjXyHORdxQxaOhiBvNaFErl44fhU9eiTUV8f/8lq/T15DuqhCQxiOhiB3LzLINjxwxaOD3x93Bd7C8r+9hqiHprAoKaDEcjNuwyCHd8K6d64r4/9dHlB2VdjA/XQhAjUdDACefouA2DH1yadEDTxEx7l4SODfGgCg5wORiAbGkzedVeSoDPxLextQ/HL2EA9NIHhDgyX6aCt4TroC8l5iouNjDPV5Y1J35fs7dPjc0skUA9NYHigp8sJTt3JVbv2fnbkBt487fhQ64dJvi/RJ83RS3vQsYHc3sS4HOjp4mcvLxAs+UauZKVS4tuoSqjWPEHdVczw/iyXAz1fvur94DYvOhlWcxjuyEh61HHiTxvdlkc9NIFxbbtzKuwiTUIXVx52/CT7PU7iT7y7z0sryOiF3N7EuNyyP5gO2ozcyM27TNZ2/DRRi5nqdlqm3Qdo0Qu9vcn1BCeeax8XlE1xLS6CiyvjBoFpohYzlbh60SuAcg5RD01gXKeDHLEHrfeWxbt5CXytK8v6etqoxUz99p2uLj1AcQ5RD02IcJ0Ouo7Y6DVXlnb8tFGLmeneFOjwW8oZdNvddTo4aqHc9t0cfXZ8FtEr1OG9aaMWM5O4+m32NcoJ9F3FWaSDoxbKbV9s6NEr7LiNXpylhRRs0AzMfgXk2LWBemhCRN7poE2Bzb0db67zWaIWM7O4ul0bOsy8Yx750ATG9UDPJH2TNu/m6A28Lu34pD2Eo0j11i3Q/u0srXnkQxOYPNNBV8BvPXFox5t71BVKQaorIWtrHrm9iXE50HMad9Bmyoy+adLV9TCL9T5I6kuBrXnKwNxAnt7E8B4tlwM9p9lGoy0GN/Tpuy7seE4HZ7HeB7Fyn21rukkO2d7GPTSBQUsHOxaNVPTpu07s+BQmRhwrV0T3H+LIPeQ37x1wncW43LKfd3sX+qZJptW2F704HUxjYsSx9rYZ9/AuOUgPkQ9NYFxv2Z9lV7XNi42Bb+DdIyvYSgcjrN6TeumhPfcQ+dAEpoju4DCQp+8yndDSe2QpHYywemX00kM77iF6exPjMh3kOmLWdND2Ll34tS4LdrzW+qGtdDDC+tvG7qEinWpiFHp7E+M6HURyR+G7NFKKq7dY/NltsoyTe1JJ791M0zmPbru7Tge50z/N5s95at5lOqk6UnQz7WLxKJxcIb3F5c61Weov9F3FPMHJ9UDPtEfKWm/eLRE0aex4rdW3NuusOM6ukjPVY5vT1l/ou4oZlxOcGBtRu2W53w49cjGzOKS8lcR2nRXH6S24W39NMTUK+dAEhjswXE5wQjVx0GsuZgY7vvab6tG75BDnPtCpXqFYm/R9yIcmMK4HejK2TBwX/XbwddcUdjz7Aa67iphMTNay3r02zuDgAh7ddj910h930IW44E89SXhj5uuQDQxXdVacTMTFBgf/QMMExqlQ2gLeNa637LtIB20LbPEIQZPYjjdGWxbCYjJbHuwtMB92EJEPTWCyOEfLxZqe7e3v6AvJSex4bVLBrtGWEZm+ZT0HUV2LniMfmhBxwtPFYtujJeBHW0+w4107g8PI/H7UGw9AN9F3FTM+poMRoeVgiN68y4yy41lYrp3BYeQS7PkOUn/ecu7WpMHXdDBCW45c6NN3mWF2fF7CYnLLpC9d/HzDWDe5zz8cha/pYETHduQCr7mYwciVp7CYXN+yry8ee4AoMJ/TQVf4sJAc3w2Qt7CY3O9HLDCtQ5gU0fd0MML2hkkGfSE5suMRhMVABHtOEVEExhOcXN6l2SFFXnoYB3r04p5KFGExMJk0C6zTpgvmYW5HFPFAT5cTnLJMB10ca4o/2pq+RREWA1Wm/vEPxza1arHA6pQxWaSDg2dp+QauuHRTd/SVbg0PBJwHdOlCtW4ExpvX6pQhvEfLZRcCp4NZHnfkInKB1lz1Trt95dK/r9QIDEiDlQW2YyKYyaAzmUXvess+X+hbwBtAk4LWvGv+OZt6r3Xlj3+oZtbSNA2wqxdXLlSbl37/+Q2ttdNx2Vmkg3n0T7YcHFAANTde64eLJsO5dKlaJ1DglwYvXVy5G4Yh9yPWyQGut+yjn8oyDTDNu2Zt9OuLK7cvmBswAePBujvRf/zb509c1GFZpIN5jS1wsqcr/+m7pr5qXUAzLkbhhbgYrsO+/v2x87bSxKKmgxGuXMmFck6podZPjpg6HLW+GoY34oqwlSbOQzroQmDlBcoY3eyngdfQ08BBvBMXE6WJs7qJRU4H47g4Lzjjta6a3mt7kwYOgr+PYAJ/+t/3N5SiO+bhapLv53Tw3JfuF4sRTIzf/S6gI5a3ivBMyXfvXP9sHK3UPV9FFeFl5Ipz6eKxjaRRLIuBnkjuYOigPziDTZNeR6s43keuOP/1P3+/GgTBfRoRxU6edD93kDveURpzz34R0Gef2f2Iefzdixcuuvp1k6ff8s2SCoL3kSsO12IxR7Ee/5rrgZ4M2rCdjovI5eItNAvCR1T7fJGExRQqcsX509PGKunSXUXBda6zOB10WYxzKvgabEScq0j9f3+xplqTArZuIndZpKGw4opgkZ0+sXj3+PHgOjmCLW9OldD2abEr6mIt76f/D9O2V9V0R99DbLa1SeHFFfFLY2fVBLBH5uE6WYbdM8STWXh/2qmT9sX14kVoaq+ZxDUXooqYG3FFvGnsrBtn0dj3diIZbyP5+RfMjneeA+Jivv0MSw1zJaqIuRNXBEeyEoV304gMNR2McCUunjfJ+9MSMJeiiphbcUWwyBZI3w6V+kYlXIiO4PFoyFOc2CH97Vn74hq/kNxtV3qsQ3oyr6KKmHtxxXnd2OFuD45k65O+l9e0nv+EfW6zK3Ftb2t6+erQTaUWavp+OWht+NYD6AoR1xB6KaO+TWOi2U8/YR/Ux/DSw7kv7Z+5+mkhWaLUOERcE4gMEFLB5Uho6OlghBtx6aa5qTx+/qwjgpqAiGsKekLTV//yLLxsnq6RB/zrv6QXl7lI6qHW3ytST/ggDRISIeKakW4HSLiwbi64b0hpFtoqATKbuHRTsdOn6ce2EVRWh8UVDRGXJf7zv9+vBSUTzVRoBBd8RSCR7dw/B1SeMBKNI5P5T02H+s8mBa5leUBckRFxOeLp00Zlt11e04FaC0ivLh4pfbWwqNcCRRXKEO7Q+DT3onuqZ10ptclCMh//5nta2jxfVeLuOUDElTHPGrpylLZXA1Kr2vwKSVdKQXDOpGCr/HU2TUxdZwSophAhp3GqqbviUU2znFAPQ73FEclEIhbO5jYdrYuIskXEBQ6LcYl2Dwltl5aaIhZs/gH+xoFU0kx6/gAAAABJRU5ErkJggg=='
                                              )}
                                              style={StyleSheet.applyWidth(
                                                StyleSheet.compose(
                                                  GlobalStyles.ImageStyles(
                                                    theme
                                                  )['Image'].style,
                                                  { height: 32, width: 32 }
                                                ),
                                                dimensions.width
                                              )}
                                            />
                                          )}
                                        </>
                                        <View
                                          style={StyleSheet.applyWidth(
                                            { marginLeft: 6 },
                                            dimensions.width
                                          )}
                                        >
                                          <Text
                                            accessible={true}
                                            selectable={false}
                                            {...GlobalStyles.TextStyles(theme)[
                                              'Text Title'
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              StyleSheet.compose(
                                                GlobalStyles.TextStyles(theme)[
                                                  'Text Title'
                                                ].style,
                                                {
                                                  fontFamily: 'System',
                                                  fontSize: 12,
                                                  fontWeight: '600',
                                                  lineHeight: 14,
                                                  marginRight: null,
                                                }
                                              ),
                                              dimensions.width
                                            )}
                                          >
                                            {listData?.user?.name}
                                          </Text>
                                          {/* Text 2 */}
                                          <Text
                                            accessible={true}
                                            selectable={false}
                                            {...GlobalStyles.TextStyles(theme)[
                                              'Text Title'
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              StyleSheet.compose(
                                                GlobalStyles.TextStyles(theme)[
                                                  'Text Title'
                                                ].style,
                                                {
                                                  color:
                                                    palettes.App[
                                                      'text placeholder'
                                                    ],
                                                  fontFamily: 'System',
                                                  fontSize: 12,
                                                  fontWeight: '400',
                                                  lineHeight: 14,
                                                  marginRight: null,
                                                }
                                              ),
                                              dimensions.width
                                            )}
                                          >
                                            {listData?.user?.sns_career_name}
                                          </Text>
                                        </View>
                                      </View>
                                      {/* View 2 */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            paddingBottom: 10,
                                            paddingLeft: 16,
                                            paddingRight: 16,
                                            paddingTop: 10,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        <Text
                                          accessible={true}
                                          selectable={false}
                                          {...GlobalStyles.TextStyles(theme)[
                                            'Text Title'
                                          ].props}
                                          style={StyleSheet.applyWidth(
                                            StyleSheet.compose(
                                              GlobalStyles.TextStyles(theme)[
                                                'Text Title'
                                              ].style,
                                              {
                                                fontFamily: 'System',
                                                fontSize: 14,
                                                fontWeight: '400',
                                                lineHeight: 19.6,
                                                marginRight: null,
                                              }
                                            ),
                                            dimensions.width
                                          )}
                                        >
                                          {listData?.content}
                                        </Text>
                                      </View>
                                      {/* View 3 */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingLeft: 16,
                                            paddingRight: 16,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {/* 日期 */}
                                        <View>
                                          <Text
                                            accessible={true}
                                            selectable={false}
                                            style={StyleSheet.applyWidth(
                                              {
                                                color: palettes.Gray[400],
                                                fontFamily: 'System',
                                                fontSize: 12,
                                                fontWeight: '300',
                                                letterSpacing: 0.2,
                                                lineHeight: 14,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {fromUnixTimestamp(
                                              Variables,
                                              listData?.created_at,
                                              'YYYY/MM/DD'
                                            )}
                                          </Text>
                                        </View>
                                        {/* 点赞评论 */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            { flexDirection: 'row' },
                                            dimensions.width
                                          )}
                                        >
                                          <Touchable
                                            onPress={() => {
                                              const handler = async () => {
                                                try {
                                                  const result = (
                                                    await aceCampTestSnsActionsDoPOST.mutateAsync(
                                                      {
                                                        action: listData
                                                          ?.sns_action_flag
                                                          .liked
                                                          ? 'unlike'
                                                          : 'like',
                                                        target_id: listData?.id,
                                                        target_type: 'Comment',
                                                      }
                                                    )
                                                  )?.json;
                                                  if (result?.code !== 200) {
                                                    return;
                                                  }
                                                  doLike(listData);
                                                } catch (err) {
                                                  console.error(err);
                                                }
                                              };
                                              handler();
                                            }}
                                          >
                                            {/* 点赞 */}
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
                                              <Icon
                                                color={
                                                  (listData?.sns_action_flag
                                                    ?.liked
                                                    ? palettes.Brand
                                                        .appStyle_primary
                                                    : palettes.Gray[500]) ??
                                                  palettes.Gray[500]
                                                }
                                                name={'AntDesign/like2'}
                                                size={14}
                                                style={StyleSheet.applyWidth(
                                                  { marginRight: 5 },
                                                  dimensions.width
                                                )}
                                              />
                                              <Text
                                                accessible={true}
                                                selectable={false}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color: [
                                                      {
                                                        minWidth:
                                                          Breakpoints.Mobile,
                                                        value:
                                                          palettes.Gray[500],
                                                      },
                                                      {
                                                        minWidth:
                                                          Breakpoints.Mobile,
                                                        value: listData
                                                          ?.sns_action_flag
                                                          ?.liked
                                                          ? palettes.Brand
                                                              .appStyle_primary
                                                          : palettes.Gray[500],
                                                      },
                                                    ],
                                                    fontFamily: 'System',
                                                    fontSize: 11,
                                                    fontWeight: '400',
                                                    letterSpacing: 0.2,
                                                    lineHeight: 14,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {listData?.like_count}
                                              </Text>
                                            </View>
                                          </Touchable>
                                          {/* Touchable 2 */}
                                          <Touchable
                                            onPress={() => {
                                              const handler = async () => {
                                                try {
                                                  const result = (
                                                    await aceCampTestSnsActionsDoPOST.mutateAsync(
                                                      {
                                                        action: listData
                                                          ?.sns_action_flag
                                                          .disliked
                                                          ? 'undislike'
                                                          : 'dislike',
                                                        target_id: listData?.id,
                                                        target_type: 'Comment',
                                                      }
                                                    )
                                                  )?.json;
                                                  if (result?.code !== 200) {
                                                    return;
                                                  }
                                                  doDislike(listData);
                                                } catch (err) {
                                                  console.error(err);
                                                }
                                              };
                                              handler();
                                            }}
                                            style={StyleSheet.applyWidth(
                                              { marginLeft: 15 },
                                              dimensions.width
                                            )}
                                          >
                                            {/* 不喜欢 */}
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
                                              <Icon
                                                color={
                                                  (listData?.sns_action_flag
                                                    ?.disliked
                                                    ? palettes.Brand
                                                        .appStyle_primary
                                                    : palettes.Gray[500]) ??
                                                  palettes.Gray[500]
                                                }
                                                name={'AntDesign/dislike2'}
                                                size={14}
                                                style={StyleSheet.applyWidth(
                                                  { marginRight: 5 },
                                                  dimensions.width
                                                )}
                                              />
                                              <Text
                                                accessible={true}
                                                selectable={false}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    color: [
                                                      {
                                                        minWidth:
                                                          Breakpoints.Mobile,
                                                        value:
                                                          palettes.Gray[500],
                                                      },
                                                      {
                                                        minWidth:
                                                          Breakpoints.Mobile,
                                                        value: listData
                                                          ?.sns_action_flag
                                                          ?.disliked
                                                          ? palettes.Brand
                                                              .appStyle_primary
                                                          : palettes.Gray[500],
                                                      },
                                                    ],
                                                    fontFamily: 'System',
                                                    fontSize: 11,
                                                    fontWeight: '400',
                                                    letterSpacing: 0.2,
                                                    lineHeight: 14,
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                {listData?.dislike_count}
                                              </Text>
                                            </View>
                                          </Touchable>
                                          {/* Touchable 3 */}
                                          <Touchable
                                            onPress={() => {
                                              try {
                                                setReply_to_id(listData?.id);
                                                fetchKeyboardAvoidingViewViewTextInputRef.current.focus();
                                              } catch (err) {
                                                console.error(err);
                                              }
                                            }}
                                            style={StyleSheet.applyWidth(
                                              { marginLeft: 15 },
                                              dimensions.width
                                            )}
                                          >
                                            {/* 评论 */}
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
                                              <Icon
                                                color={palettes.Gray[500]}
                                                name={
                                                  'FontAwesome/commenting-o'
                                                }
                                                size={14}
                                                style={StyleSheet.applyWidth(
                                                  { marginRight: 5 },
                                                  dimensions.width
                                                )}
                                              />
                                            </View>
                                          </Touchable>
                                        </View>
                                      </View>
                                    </>
                                  );
                                }}
                                showsHorizontalScrollIndicator={true}
                                showsVerticalScrollIndicator={true}
                                snapToAlignment={'start'}
                                extraData={refresh}
                              />
                              <>
                                {comment_list?.length >= total_record ? null : (
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { alignItems: 'center' },
                                      dimensions.width
                                    )}
                                  >
                                    <Button
                                      accessible={true}
                                      iconPosition={'left'}
                                      onPress={() => {
                                        const handler = async () => {
                                          try {
                                            if (is_loading) {
                                              return;
                                            }
                                            if (
                                              comment_list?.length >=
                                              total_record
                                            ) {
                                              return;
                                            }
                                            setIs_loading(true);
                                            const result = (
                                              await AceCampTestApi.commentListGET(
                                                Constants,
                                                {
                                                  page: 1,
                                                  per_page: 15,
                                                  subject_id:
                                                    props.route?.params?.id ??
                                                    defaultProps.id,
                                                  subject_type: 'Opinion',
                                                }
                                              )
                                            )?.json;
                                            if (result?.code !== 200) {
                                              setIs_loading(false);
                                              if (true) {
                                                return;
                                              }
                                            } else {
                                            }

                                            setComment_list(result?.data);
                                            setPage(page + 1);
                                            setIs_loading(false);
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        };
                                        handler();
                                      }}
                                      {...GlobalStyles.ButtonStyles(theme)[
                                        'Button (default)'
                                      ].props}
                                      disabled={
                                        !comment_list ||
                                        comment_list?.length >= total_record
                                      }
                                      loading={is_loading}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.ButtonStyles(theme)[
                                            'Button (default)'
                                          ].style,
                                          {
                                            backgroundColor:
                                              palettes.App['Custom #ffffff'],
                                            color:
                                              palettes.Brand.appStyle_primary,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                      title={`${
                                        comment_list &&
                                        comment_list?.length < total_record
                                          ? t(
                                              Variables,
                                              'opinion_comment_get_more'
                                            )
                                          : t(
                                              Variables,
                                              'opinion_comment_no_more'
                                            )
                                      }`}
                                    />
                                  </View>
                                )}
                              </>
                            </View>
                          </View>
                        </>
                      );
                    }}
                  </AceCampTestApi.FetchCommentListGET>
                </View>
              </SimpleStyleScrollView>
              <>
                {!Constants['is_login'] ? null : (
                  <KeyboardAvoidingView
                    enabled={true}
                    keyboardVerticalOffset={0}
                    androidBehavior={'height'}
                    behavior={'padding'}
                    iosBehavior={'position'}
                    iosKeyboardVerticalOffset={10}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          backgroundColor: palettes.App['Custom #ffffff'],
                          borderColor: palettes.Gray[200],
                          borderTopWidth: 1,
                          bottom: safeAreaInsets.bottom,
                          flex: 1,
                          flexDirection: 'row',
                          flexGrow: 1,
                          justifyContent: 'flex-start',
                          paddingBottom: [
                            { minWidth: Breakpoints.Mobile, value: 10 },
                            {
                              minWidth: Breakpoints.Mobile,
                              value: is_input_focus ? 10 : 0,
                            },
                          ],
                          paddingLeft: 4,
                          paddingRight: 4,
                          paddingTop: 10,
                          position: 'absolute',
                        },
                        dimensions.width
                      )}
                    >
                      {/* 点赞 */}
                      <>
                        {is_input_focus ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor: 'rgb(224, 237, 247)',
                                borderRadius: 20,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginLeft: 10,
                                paddingBottom: 6,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 6,
                              },
                              dimensions.width
                            )}
                          >
                            <Touchable
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    const result = (
                                      await aceCampTestSnsActionsDoPOST.mutateAsync(
                                        {
                                          action: fetchData?.data
                                            ?.sns_action_flag?.liked
                                            ? 'unlike'
                                            : 'like',
                                          target_id: fetchData?.data?.id,
                                          target_type: 'Opinion',
                                        }
                                      )
                                    )?.json;
                                    if (result?.code > 200) {
                                      return;
                                    }
                                    doLike(fetchData?.data);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  color={palettes.Brand.appStyle_primary}
                                  name={'AntDesign/like1'}
                                  size={14}
                                  style={StyleSheet.applyWidth(
                                    { marginRight: 4 },
                                    dimensions.width
                                  )}
                                />
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: palettes.Brand.appStyle_primary,
                                      fontFamily: 'System',
                                      fontSize: 14,
                                      fontWeight: '600',
                                      lineHeight: 19,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {fetchData?.data?.like_count}
                                </Text>
                              </View>
                            </Touchable>
                            {/* Text 2 */}
                            <Text
                              accessible={true}
                              selectable={false}
                              {...GlobalStyles.TextStyles(theme)['Text Title']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text Title']
                                    .style,
                                  {
                                    color: palettes.Gray[400],
                                    fontFamily: 'System',
                                    fontSize: 14,
                                    fontWeight: '300',
                                    lineHeight: 22,
                                    marginLeft: 4,
                                    marginRight: 4,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'|'}
                            </Text>
                            {/* Touchable 2 */}
                            <Touchable
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    const result = (
                                      await aceCampTestSnsActionsDoPOST.mutateAsync(
                                        {
                                          action: fetchData?.data
                                            ?.sns_action_flag?.disliked
                                            ? 'undisliked'
                                            : 'dislike',
                                          target_id: fetchData?.data?.id,
                                          target_type: 'Opinion',
                                        }
                                      )
                                    )?.json;
                                    if (result?.code) {
                                      return;
                                    }
                                    doDislike(fetchData?.data);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                            >
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Icon 2 */}
                                <Icon
                                  color={palettes.Brand.appStyle_primary}
                                  name={'AntDesign/dislike1'}
                                  size={14}
                                  style={StyleSheet.applyWidth(
                                    { marginRight: 4 },
                                    dimensions.width
                                  )}
                                />
                                {/* Text 3 */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  {...GlobalStyles.TextStyles(theme)[
                                    'Text Title'
                                  ].props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.TextStyles(theme)[
                                        'Text Title'
                                      ].style,
                                      {
                                        color: palettes.Brand.appStyle_primary,
                                        fontFamily: 'System',
                                        fontSize: 14,
                                        fontWeight: '600',
                                        lineHeight: 19,
                                        marginRight: null,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {fetchData?.data?.dislike_count}
                                </Text>
                              </View>
                            </Touchable>
                          </View>
                        )}
                      </>
                      {/* 评论输入框 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(244, 248, 249)',
                            borderRadius: 20,
                            flexGrow: 1,
                            marginLeft: 10,
                            marginRight: 10,
                            paddingLeft: 8,
                          },
                          dimensions.width
                        )}
                      >
                        <TextInput
                          autoCapitalize={'none'}
                          autoCorrect={true}
                          changeTextDelay={500}
                          onBlur={() => {
                            try {
                              setIs_input_focus(false);
                              setReply_to_id(setUndefined());
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          onChangeText={newTextInputValue => {
                            try {
                              setComment_text(newTextInputValue);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          onFocus={() => {
                            try {
                              setIs_input_focus(true);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          webShowOutline={true}
                          {...GlobalStyles.TextInputStyles(theme)['Login Input']
                            .props}
                          placeholder={`${t(
                            Variables,
                            'opinion_comment_write'
                          )}`.toString()}
                          ref={fetchKeyboardAvoidingViewViewTextInputRef}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextInputStyles(theme)['Login Input']
                                .style,
                              {
                                backgroundColor: null,
                                fontFamily: 'System',
                                fontWeight: '400',
                                lineHeight: 16,
                                width: null,
                              }
                            ),
                            dimensions.width
                          )}
                          value={comment_text}
                        />
                      </View>
                      {/* 回到顶部&收藏 */}
                      <>
                        {is_input_focus ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                flexDirection: 'row',
                                flexShrink: 1,
                                marginRight: 12,
                              },
                              dimensions.width
                            )}
                          >
                            {/* Touchable 2 */}
                            <Touchable
                              onPress={() => {
                                try {
                                  fetchScrollViewRef.current?.scrollTo({
                                    x: 0,
                                    y: 0,
                                    animated: true,
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              <Icon
                                name={'AntDesign/arrowup'}
                                size={20}
                                style={StyleSheet.applyWidth(
                                  { marginRight: 6 },
                                  dimensions.width
                                )}
                              />
                            </Touchable>

                            <Touchable
                              onPress={() => {
                                try {
                                  setShow_confirm_modal(true);
                                  /* hidden 'If/Else' action */
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                            >
                              {/* Icon 2 */}
                              <Icon
                                color={
                                  (is_favorite
                                    ? '#fbd179'
                                    : palettes.App['Custom Color 52']) ??
                                  palettes.App['Custom Color 52']
                                }
                                name={'FontAwesome/star'}
                                size={18}
                                style={StyleSheet.applyWidth(
                                  { marginLeft: 6 },
                                  dimensions.width
                                )}
                              />
                            </Touchable>
                          </View>
                        )}
                      </>
                      <>
                        {!is_input_focus ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              { flexShrink: 1, marginRight: 12 },
                              dimensions.width
                            )}
                          >
                            <Button
                              accessible={true}
                              iconPosition={'left'}
                              onPress={() => {
                                const handler = async () => {
                                  try {
                                    setIs_comment_submiting(true);
                                    const result = (
                                      await aceCampTestCommentsAddPOST.mutateAsync(
                                        {
                                          content: comment_text,
                                          reply_to_id: reply_to_id
                                            ? reply_to_id
                                            : setUndefined(),
                                          subject_id: reply_to_id
                                            ? setUndefined()
                                            : fetchData?.data?.id,
                                          subject_type: 'Opinion',
                                        }
                                      )
                                    )?.json;
                                    if (result?.code === 200) {
                                    } else {
                                      ShowToast(
                                        `${result?.code}:${t(
                                          Variables,
                                          'live_load_fail'
                                        )}`,
                                        undefined,
                                        undefined
                                      );
                                      setIs_comment_submiting(false);
                                      if (true) {
                                        return;
                                      }
                                    }

                                    Keyboard.dismiss();
                                    setComment_text(setUndefined());
                                    ShowToast(
                                      t(
                                        Variables,
                                        'toast_submitted_successfully'
                                      ),
                                      'top',
                                      undefined
                                    );
                                    setRefresh(!refresh);
                                    setReply_to_id(setUndefined());
                                    setIs_comment_submiting(false);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                };
                                handler();
                              }}
                              disabled={comment_text?.length === 0}
                              loading={is_comment_submiting}
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    comment_text?.length > 0
                                      ? palettes.Brand.appStyle_primary
                                      : palettes.App['Custom Color 27'],
                                  borderRadius: 4,
                                  fontFamily: 'System',
                                  fontSize: 14,
                                  fontWeight: '400',
                                  letterSpacing: 0.2,
                                  lineHeight: 20,
                                  paddingBottom: 0,
                                  paddingTop: 0,
                                },
                                dimensions.width
                              )}
                              title={`${t(Variables, 'common_submit')}`}
                            />
                          </View>
                        )}
                      </>
                    </View>
                  </KeyboardAvoidingView>
                )}
              </>
            </>
          );
        }}
      </AceCampTestApi.FetchOpinionInfoGET>
      {/* 背景图层 */}
      <>
        {!show_confirm_modal ? null : (
          <CoverView.AnimatedView isVisible={show_confirm_modal} />
        )}
      </>
      {/* 收藏Modal */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        {...GlobalStyles.ModalStyles(theme)['Modal'].props}
        animationType={'slide'}
        presentationStyle={'overFullScreen'}
        style={StyleSheet.applyWidth(
          GlobalStyles.ModalStyles(theme)['Modal'].style,
          dimensions.width
        )}
        transparent={true}
        visible={show_confirm_modal}
      >
        <Touchable
          onPress={() => {
            try {
              /* hidden 'Run a Custom Function' action */
              setShow_confirm_modal(false);
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ height: '40%' }, dimensions.width)}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App['Custom Color 4'],
                height: '100%',
                opacity: 0,
                width: '100%',
              },
              dimensions.width
            )}
          />
        </Touchable>

        <TestApi.FetchFavoritesGET
          handlers={{
            onData: fetchData => {
              try {
                const result = getDefaultFavorite(fetchData?.data);
                setFavorite_ids(result);
              } catch (err) {
                console.error(err);
              }
            },
          }}
          ts={222}
        >
          {({ loading, error, data, refetchFavorites }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {/* Popup view */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.appStyle_white,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      flexDirection: 'column',
                      height: '60%',
                      paddingBottom: safeAreaInsets.bottom + 60,
                    },
                    dimensions.width
                  )}
                >
                  {/* Title View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        paddingLeft: 16,
                        paddingRight: 16,
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
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(228, 238, 248)',
                            borderRadius: 16,
                            marginRight: 8,
                            padding: 6,
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          color={palettes.Brand.appStyle_primary}
                          name={'MaterialCommunityIcons/folder-open'}
                          size={14}
                        />
                      </View>
                      {/* Title */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Body XL Semibold']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Body XL Semibold']
                              .style,
                            {
                              alignSelf: 'auto',
                              flex: null,
                              fontFamily: 'System',
                              fontWeight: '600',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {t(Variables, 'mine_collection_select_folder')}
                      </Text>
                    </View>
                    <IconButton
                      onPress={() => {
                        try {
                          setShow_confirm_modal(false);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      color={palettes.App['Custom Color 4']}
                      icon={'AntDesign/close'}
                      size={24}
                    />
                  </View>
                  {/* 收藏夹列表 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        marginLeft: 16,
                        marginRight: 16,
                        marginTop: 20,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Tip'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Tip'].style,
                          {
                            alignSelf: 'center',
                            fontFamily: 'System',
                            fontWeight: '400',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {t(Variables, 'opinion_comment_no_more')}
                    </Text>
                    <SimpleStyleFlatList
                      data={fetchData?.data}
                      decelerationRate={'normal'}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(listData, index) =>
                        listData?.id ??
                        listData?.uuid ??
                        index?.toString() ??
                        JSON.stringify(listData)
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={'收藏Modal->Fetch->Popup view->收藏夹列表->List'}
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      pagingEnabled={false}
                      renderItem={({ item, index }) => {
                        const listData = item;
                        return (
                          <>
                            <Touchable
                              onPress={() => {
                                try {
                                  const result = toggleFavoriteCheck(
                                    listData?.id
                                  );
                                  setFavorite_ids(result);
                                  console.log(result);
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
                                    justifyContent: 'space-between',
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                              >
                                <View>
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    {...GlobalStyles.TextStyles(theme)[
                                      'Text Title'
                                    ].props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)[
                                          'Text Title'
                                        ].style,
                                        {
                                          fontFamily: 'System',
                                          fontSize: 14,
                                          fontWeight: '600',
                                          lineHeight: 19.6,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {listData?.name}
                                  </Text>
                                  {/* Text 2 */}
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    {...GlobalStyles.TextStyles(theme)[
                                      'Text Tip'
                                    ].props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)[
                                          'Text Tip'
                                        ].style,
                                        {
                                          color:
                                            palettes.App['Custom Color_16'],
                                          fontFamily: 'System',
                                          fontSize: 13,
                                          fontWeight: '400',
                                          marginRight: null,
                                          marginTop: 4,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {StringFormat(
                                      t(Variables, 'mine_collection_num'),
                                      [].concat([listData?.item_count])
                                    )}
                                  </Text>
                                </View>
                                {/* View 2 */}
                                <View>
                                  <Checkbox
                                    onCheck={() => {
                                      const checkboxValue = undefined;
                                      try {
                                        /* 'Run a Custom Function' action requires configuration: choose a custom function */
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                    onPress={newCheckboxValue => {
                                      const checkboxValue = newCheckboxValue;
                                      try {
                                        setFavorite_ids(
                                          toggleFavoriteCheck(listData?.id)
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                    defaultValue={favorite_ids.includes(
                                      listData?.id
                                    )}
                                  />
                                </View>
                              </View>
                            </Touchable>
                            <Divider
                              color={theme.colors.border.base}
                              {...GlobalStyles.DividerStyles(theme)['Divider']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.DividerStyles(theme)['Divider']
                                    .style,
                                  { marginBottom: 8, marginTop: 8 }
                                ),
                                dimensions.width
                              )}
                            />
                          </>
                        );
                      }}
                      snapToAlignment={'start'}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      style={StyleSheet.applyWidth(
                        { width: '100%' },
                        dimensions.width
                      )}
                    />
                  </View>
                </View>
                {/* 按钮 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      bottom: [
                        { minWidth: Breakpoints.Mobile, value: 0 },
                        {
                          minWidth: Breakpoints.Mobile,
                          value: safeAreaInsets.bottom,
                        },
                      ],
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      height: 50,
                      justifyContent: 'space-around',
                      paddingLeft: 16,
                      paddingRight: 16,
                      position: 'absolute',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/* 新建收藏夹 */}
                  <Button
                    accessible={true}
                    onPress={() => {
                      try {
                        setIs_show_add_favorite_modal(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                    icon={'AntDesign/addfolder'}
                    iconPosition={'left'}
                    iconSize={14}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button'].style,
                        {
                          backgroundColor: palettes.App['Custom #ffffff'],
                          borderColor: palettes.App['Custom Color 4'],
                          borderWidth: 1,
                          color: palettes.App['Custom Color 4'],
                          width: '35%',
                        }
                      ),
                      dimensions.width
                    )}
                    title={`${t(Variables, 'mine_collection_create_folder')}`}
                  />
                  {/* 确定收藏 */}
                  <Button
                    accessible={true}
                    onPress={() => {
                      const handler = async () => {
                        try {
                          if (!favorite_ids || favorite_ids?.length === 0) {
                            return;
                          }
                          const result = (
                            await aceCampTestSnsActionsDoPOST.mutateAsync({
                              action: 'favorite',
                              favorite_ids: favorite_ids,
                              target_id:
                                props.route?.params?.id ?? defaultProps.id,
                              target_type: 'Opinion',
                            })
                          )?.json;
                          if (result?.code === 200) {
                            ShowToast(
                              t(Variables, 'toast_favorite_successfully'),
                              'top',
                              undefined
                            );
                            setIs_favorite(true);
                          } else {
                            ShowToast(
                              t(Variables, 'common_network_error'),
                              'top',
                              undefined
                            );
                          }

                          setShow_confirm_modal(false);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                    disabled={!favorite_ids || favorite_ids?.length === 0}
                    iconPosition={'left'}
                    iconSize={14}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button'].style,
                        { width: '55%' }
                      ),
                      dimensions.width
                    )}
                    title={`${t(Variables, 'common_ok_more')}`}
                  />
                </View>
                {/* 新建收藏夹背景 */}
                <>
                  {!is_show_add_favorite_modal ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.App['Custom Color 5'],
                          height: '100%',
                          left: 0,
                          opacity: 0.45,
                          position: 'absolute',
                          top: 0,
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    />
                  )}
                </>
                {/* 新建收藏夹 */}
                <>
                  {!is_show_add_favorite_modal ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignSelf: 'center',
                          paddingLeft: 16,
                          paddingRight: 16,
                          position: 'absolute',
                          top: dimensions.height / 2 - 100,
                          width: '85%',
                        },
                        dimensions.width
                      )}
                    >
                      <Shadow
                        offsetX={0}
                        offsetY={0}
                        showShadowCornerBottomEnd={true}
                        showShadowCornerBottomStart={true}
                        showShadowCornerTopEnd={true}
                        showShadowCornerTopStart={true}
                        showShadowSideBottom={true}
                        showShadowSideEnd={true}
                        showShadowSideStart={true}
                        showShadowSideTop={true}
                        paintInside={false}
                      >
                        {/* 新建收藏夹 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: palettes.App['Custom #ffffff'],
                              borderRadius: 6,
                              flex: 1,
                              padding: 16,
                              width: dimensions.width * 0.85 - 32,
                              zIndex: 200,
                            },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                alignSelf: 'center',
                                fontFamily: 'System',
                                fontSize: 16,
                                fontWeight: '700',
                                letterSpacing: 0.2,
                                lineHeight: 19.6,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'mine_collection_create_folder')}
                          </Text>

                          <View
                            style={StyleSheet.applyWidth(
                              { paddingTop: 25 },
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: palettes.App['Custom Color 15'],
                                  fontFamily: 'System',
                                  fontSize: 14,
                                  fontWeight: '600',
                                  letterSpacing: 0.2,
                                  lineHeight: 19.6,
                                },
                                dimensions.width
                              )}
                            >
                              {'*'}
                              <Text
                                accessible={true}
                                selectable={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    color: palettes.App['Custom Color 5'],
                                    fontFamily: 'System',
                                    fontSize: 14,
                                    fontWeight: '600',
                                    letterSpacing: 0.2,
                                    lineHeight: 19.6,
                                  },
                                  dimensions.width
                                )}
                              >
                                {t(Variables, 'mine_collection_folder_name')}
                              </Text>
                            </Text>

                            <View
                              style={StyleSheet.applyWidth(
                                { marginBottom: 12, marginTop: 12 },
                                dimensions.width
                              )}
                            >
                              <TextField
                                autoCapitalize={'none'}
                                autoCorrect={true}
                                changeTextDelay={500}
                                onChangeText={newStyledTextFieldValue => {
                                  const textFieldValue =
                                    newStyledTextFieldValue;
                                  try {
                                    setNew_favorite_folder_name(
                                      newStyledTextFieldValue
                                    );
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                type={'solid'}
                                underlineColor={theme.colors.text.light}
                                activeBorderColor={
                                  palettes.Brand.appStyle_primary
                                }
                                blurOnSubmit={true}
                                maxLength={20}
                                placeholder={t(
                                  Variables,
                                  'mine_collection_more_input'
                                )}
                                returnKeyLabel={''}
                                returnKeyType={'done'}
                                style={StyleSheet.applyWidth(
                                  {
                                    alignSelf: 'center',
                                    borderColor: palettes.Gray[200],
                                    borderRadius: 4,
                                    borderWidth: 1,
                                    flex: 1,
                                    fontFamily: 'System',
                                    fontSize: 14,
                                    fontWeight: '400',
                                    letterSpacing: 0.2,
                                    lineHeight: 16,
                                    paddingBottom: 6,
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    paddingTop: 6,
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                                value={new_favorite_folder_name}
                                webShowOutline={false}
                              />
                            </View>
                            {/* View 2 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flexDirection: 'row-reverse',
                                  justifyContent: 'space-between',
                                },
                                dimensions.width
                              )}
                            >
                              {/* 确定 */}
                              <Button
                                accessible={true}
                                iconPosition={'left'}
                                onPress={() => {
                                  const handler = async () => {
                                    try {
                                      if (is_add_favorite_loading) {
                                        return;
                                      }
                                      if (
                                        new_favorite_folder_name?.length === 0
                                      ) {
                                        return;
                                      }
                                      setIs_add_favorite_loading(true);
                                      const result = (
                                        await aceCampTestFavoritesAddPOST.mutateAsync(
                                          { name: new_favorite_folder_name }
                                        )
                                      )?.json;
                                      console.log(result);
                                      if (result?.code === 200) {
                                        ShowToast(
                                          t(
                                            Variables,
                                            'toast_operated_successfully'
                                          ),
                                          undefined,
                                          undefined
                                        );
                                        await refetchFavorites();
                                        setIs_show_add_favorite_modal(false);
                                      } else {
                                        ShowToast(
                                          `${t(
                                            Variables,
                                            'common_network_error'
                                          )}:${result?.code}`,
                                          'top',
                                          undefined
                                        );
                                      }

                                      setIs_add_favorite_loading(false);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  };
                                  handler();
                                }}
                                disabled={
                                  new_favorite_folder_name?.length === 0
                                }
                                loading={is_add_favorite_loading}
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor:
                                      palettes.Brand.appStyle_primary,
                                    borderRadius: 4,
                                    color: palettes.App['Custom #ffffff'],
                                    fontFamily: 'System',
                                    fontSize: 14,
                                    fontWeight: '400',
                                    letterSpacing: 3,
                                    lineHeight: 19.6,
                                    width: '48%',
                                  },
                                  dimensions.width
                                )}
                                title={`${t(Variables, 'common_ok_more')}`}
                              />
                              {/* 取消 */}
                              <Button
                                accessible={true}
                                iconPosition={'left'}
                                onPress={() => {
                                  try {
                                    setIs_show_add_favorite_modal(false);
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor:
                                      palettes.App['Custom #ffffff'],
                                    borderColor: palettes.Gray[200],
                                    borderRadius: 4,
                                    borderWidth: 1,
                                    color: palettes.App['Custom Color 5'],
                                    fontFamily: 'System',
                                    fontSize: 14,
                                    fontWeight: '400',
                                    height: 50,
                                    letterSpacing: 3,
                                    lineHeight: 19.6,
                                    width: '48%',
                                  },
                                  dimensions.width
                                )}
                                title={`${t(Variables, 'common_no_more')}`}
                              />
                            </View>
                          </View>
                        </View>
                      </Shadow>
                    </View>
                  )}
                </>
              </>
            );
          }}
        </TestApi.FetchFavoritesGET>
      </Modal>
      <Utils.CustomCodeErrorBoundary>
        <Toast.ele />
      </Utils.CustomCodeErrorBoundary>
      <>
        {getNoteStatus(Variables) === 0 ? null : (
          <EmptyViewBlock type={getNoteStatus(Variables)} />
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(OpinionInfoScreen);
