import React from 'react';
import {
  Icon,
  IconButton,
  ScreenContainer,
  SimpleStyleFlashList,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as TestApi from '../apis/TestApi.js';
import EmptyViewBlock from '../components/EmptyViewBlock';
import OrganizerArticleBlock from '../components/OrganizerArticleBlock';
import OrganizerEventBlock from '../components/OrganizerEventBlock';
import OrganizerMinuteBlock from '../components/OrganizerMinuteBlock';
import OrganizerOverallBlock from '../components/OrganizerOverallBlock';
import OrganizerSpotlightBlock from '../components/OrganizerSpotlightBlock';
import RecommandSectionBlock from '../components/RecommandSectionBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CTabView from '../custom-files/CTabView';
import * as Shadow from '../custom-files/Shadow';
import * as gf from '../custom-files/gf';
import arrayIdToString from '../global-functions/arrayIdToString';
import getNoteStatus from '../global-functions/getNoteStatus';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { organization_id: '' };

const OrganizerScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [count, setCount] = React.useState(0);
  const [expandTxt, setExpandTxt] = React.useState(
    t(Variables, 'event_detail_open')
  );
  const [expanded, setExpanded] = React.useState(false);
  const [firstLayout, setFirstLayout] = React.useState(true);
  const [fullHeight, setFullHeight] = React.useState(200);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [isTruncated, setIsTruncated] = React.useState(false);
  const [lines, setLines] = React.useState(100);
  const getCompanyList = companys => {
    let result = '';
    if (companys) {
      companys.forEach((data, index) => {
        result += `${data.name}  ${data.ticker}   `;
        if (index % 2 == 1) {
          result += `
`;
        }
      });
    }

    return result;
  };

  const getHeadHeight = eve => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    console.log(eve.nativeEvent.layout.height);
    setHeaderHeight(eve.nativeEvent.layout.height);
  };

  const newTest = e => {
    // if(!firstLayout) {
    //         return;
    // }
    // setFirstLayout(false)
    setFullHeight(e.nativeEvent.layout.height + e.nativeEvent.layout.y + 50);

    // e.nativeEvent.layout.height
    // const fullHeight = e.nativeEvent.target.scrollHeight;
    // console.log(fullHeight)
    // const lineLength = e.nativeEvent.lines.length
    // let f = 0;
    // let h = 0;
    // f = lineLength * 28 + 30
    // if(lineLength > 3) {

    //      h = 28*3+30;
    //      setIsTruncated(true);
    //      setFullHeight(f)
    //      setHeight(h)
    //      setExpandTxt(gf.t(Variables,"event_detail_open"))
    //      setLines(3)
    //     //需要显示扩展
    // }else {
    //      h = f ;
    //      setHeight(f)
    //      setFullHeight(f)
    //      setIsTruncated(false);
    //      setLines(lineLength)
    // }
    // console.log(lineLength)
    // console.log (f)
    // console.log (h)

    //  gf.Animated.timing(heightAnim, {
    //       toValue: h, // 切换高度，展开时为300，收起时为100
    //       duration: 100, // 动画持续时间
    //       useNativeDriver: false, // 因为我们在动画中改变的是高度，所以不能使用原生驱动
    //     }).start();

    //     onTextLayout={eve => {
    //       try {
    //         test(Variables, eve);
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     }}
  };

  const toggleExpand = () => {
    if (!expanded) {
      setExpandTxt(gf.t(Variables, 'event_detail_close'));
    } else {
      setExpandTxt(gf.t(Variables, 'event_detail_open'));
    }

    gf.Animated.timing(heightAnim, {
      toValue: expanded ? 135 : fullHeight, // 切换高度，展开时为300，收起时为100
      duration: 500, // 动画持续时间
      useNativeDriver: false, // 因为我们在动画中改变的是高度，所以不能使用原生驱动
    }).start(() => {});
    // gf.Animated.timing(rotateAnim, {
    //       toValue: 1, // 目标值为1
    //       duration: 500, // 动画持续时间
    //       useNativeDriver: false, // 使用原生驱动
    //     }).start(() => {
    //       // 动画完成后重置动画值
    //       rotateAnim.setValue(0);
    //     });
    setExpanded(!expanded);
  };
  const destContainer = React.useRef(null);
  const destContent = React.useRef(null);

  const heightAnim = React.useRef(new gf.Animated.Value(135)).current;
  const rotateAnim = React.useRef(new gf.Animated.Value(0)).current;

  const oid =
    props.route?.params?.organization_id ?? defaultProps.organization_id;

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  const tabViewHeaders = [
    {
      key: 'overall',
      title: 'common_overall',
      params: { organization_id: oid, count: count },
    },
    {
      key: 'spotlight',
      title: 'home_special',
      params: { organization_id: oid },
    },
    { key: 'event', title: 'tab_events', params: { organization_id: oid } },
    {
      key: 'minute',
      title: 'mine_note_collection',
      params: { organization_id: oid },
    },
    { key: 'point', title: 'tab_vote_point', params: { organization_id: oid } },
  ];

  const scene = {
    overall: OrganizerOverallBlock,
    spotlight: OrganizerSpotlightBlock,
    event: OrganizerEventBlock,
    minute: OrganizerMinuteBlock,
    point: OrganizerArticleBlock,
  };
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['Custom Color 19'] },
        dimensions.width
      )}
    >
      <SimpleStyleScrollView
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes.App['Custom Color 19'],
            height: dimensions.height + headerHeight,
          },
          dimensions.width
        )}
      >
        <AceCampTestApi.FetchOrganizerInfoGET
          organization_id={
            props.route?.params?.organization_id ?? defaultProps.organization_id
          }
        >
          {({ loading, error, data, refetchOrganizerInfo }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {/* 头部 */}
                <>
                  {!(fetchData?.code === 200) ? null : (
                    <View
                      onLayout={event => {
                        try {
                          /* hidden 'Run a Custom Function' action */
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        { width: '100%' },
                        dimensions.width
                      )}
                    >
                      <ImageBackground
                        {...GlobalStyles.ImageBackgroundStyles(theme)[
                          'Image Background'
                        ].props}
                        resizeMode={'cover'}
                        source={imageSource(
                          'https://static.acecamptech.com/www/static/media/about-us-triangle.d82f58523629603ba56d.png'
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageBackgroundStyles(theme)[
                              'Image Background'
                            ].style,
                            {
                              height: safeAreaInsets.top + fullHeight + 80,
                              opacity: 1,
                              position: 'absolute',
                              top: 0,
                              width: '100%',
                            }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* 标题 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: safeAreaInsets.top + 5,
                            paddingLeft: 16,
                            paddingRight: 16,
                            zIndex: 10,
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
                          {/* 返回按钮 */}
                          <IconButton
                            onPress={() => {
                              try {
                                navigation.goBack();
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            color={palettes.App.White}
                            icon={'AntDesign/left'}
                            size={24}
                            style={StyleSheet.applyWidth(
                              { marginRight: 10 },
                              dimensions.width
                            )}
                          />
                          {/* 标题 */}
                          <Text
                            accessible={true}
                            selectable={false}
                            ellipsizeMode={'clip'}
                            numberOfLines={1}
                            style={StyleSheet.applyWidth(
                              {
                                fontFamily: 'System',
                                fontSize: 24,
                                fontWeight: '700',
                                letterSpacing: 0.2,
                                lineHeight: 30,
                              },
                              dimensions.width
                            )}
                          >
                            {t(Variables, 'mine_home')}
                          </Text>
                        </View>
                        {/* 分享按钮 */}
                        <IconButton
                          color={palettes.Brand.appStyle_primary}
                          icon={'AntDesign/sharealt'}
                          size={24}
                        />
                      </View>
                      {/* 简介 */}
                      <View
                        onLayout={event => {
                          try {
                            /* hidden 'Run a Custom Function' action */
                            /* hidden 'Log to Console' action */
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'flex-start',
                            overflow: 'hidden',
                            paddingBottom: 4,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            zIndex: 10,
                          },
                          dimensions.width
                        )}
                      >
                        <Utils.CustomCodeErrorBoundary>
                          <gf.Animated.View
                            style={{
                              height: heightAnim,
                              width: '100%',
                            }}
                          >
                            <BlurView
                              {...GlobalStyles.BlurViewStyles(theme)[
                                'Blur View'
                              ].props}
                              experimentalBlurMethod={'dimezisBlurView'}
                              intensity={50}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.BlurViewStyles(theme)[
                                    'Blur View'
                                  ].style,
                                  {
                                    alignItems: 'flex-start',
                                    borderBottomLeftRadius: 4,
                                    borderBottomRightRadius: 4,
                                    borderTopLeftRadius: 4,
                                    borderTopRightRadius: 4,
                                    flexBasis: 1,
                                    flexShrink: null,
                                    justifyContent: 'space-between',
                                    overflow: 'hidden',
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                    paddingTop: 16,
                                    width: '100%',
                                  }
                                ),
                                dimensions.width
                              )}
                              tint={'light'}
                            >
                              <SimpleStyleScrollView
                                bounces={true}
                                horizontal={false}
                                keyboardShouldPersistTaps={'never'}
                                nestedScrollEnabled={false}
                                showsHorizontalScrollIndicator={true}
                                showsVerticalScrollIndicator={true}
                                scrollEnabled={false}
                              >
                                {/* 头像 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Image
                                    resizeMode={'cover'}
                                    {...GlobalStyles.ImageStyles(theme)['Image']
                                      .props}
                                    source={imageSource(
                                      `${fetchData?.data?.logo}`
                                    )}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.ImageStyles(theme)['Image']
                                          .style,
                                        {
                                          borderRadius: 15,
                                          height: 30,
                                          marginRight: 10,
                                          width: 30,
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
                                        fontSize: 18,
                                        fontWeight: '700',
                                        letterSpacing: 0.2,
                                        lineHeight: 24,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {fetchData?.data?.name}
                                  </Text>
                                </View>
                                {/* 简介内容 */}
                                <>
                                  {fetchData?.data?.industry_ids?.length ===
                                  0 ? null : (
                                    <View
                                      style={StyleSheet.applyWidth(
                                        { marginTop: 10 },
                                        dimensions.width
                                      )}
                                    >
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.Brand.appStyle_primary,
                                            fontFamily: 'System',
                                            fontSize: 13,
                                            fontWeight: '600',
                                            letterSpacing: 0.2,
                                            lineHeight: 19,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {'● '}
                                        {t(Variables, 'common_sector_focus')}
                                        {'  '}
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
                                                fontSize: 13,
                                                fontWeight: '400',
                                                lineHeight: 19,
                                              }
                                            ),
                                            dimensions.width
                                          )}
                                        >
                                          {arrayIdToString(
                                            Variables,
                                            4,
                                            fetchData?.data?.industry_ids,
                                            ','
                                          )}
                                        </Text>
                                      </Text>
                                    </View>
                                  )}
                                </>
                                {/* 简介内容 2 */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { marginTop: 10 },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: palettes.Brand.appStyle_primary,
                                        fontFamily: 'System',
                                        fontSize: 13,
                                        fontWeight: '600',
                                        letterSpacing: 0.2,
                                        lineHeight: 19,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'● '}
                                    {t(Variables, 'organizer_intro')}
                                    {'  '}
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
                                            fontSize: 13,
                                            fontWeight: '400',
                                            lineHeight: 19,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {fetchData?.data?.description}
                                    </Text>
                                  </Text>
                                </View>
                                {/* 简介内容 3 */}
                                <View
                                  onLayout={event => {
                                    try {
                                      newTest(event);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  style={StyleSheet.applyWidth(
                                    { marginTop: 10 },
                                    dimensions.width
                                  )}
                                >
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: palettes.Brand.appStyle_primary,
                                        fontFamily: 'System',
                                        fontSize: 13,
                                        fontWeight: '600',
                                        letterSpacing: 0.2,
                                        lineHeight: 19,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'● '}
                                    {t(Variables, 'organizer_companys')}
                                    {'  '}
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
                                            fontSize: 13,
                                            fontWeight: '400',
                                            lineHeight: 19,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {getCompanyList(
                                        fetchData?.data?.corporations
                                      )}
                                    </Text>
                                  </Text>
                                </View>
                              </SimpleStyleScrollView>

                              <Touchable
                                onPress={() => {
                                  try {
                                    toggleExpand();
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                              >
                                <View
                                  onLayout={event => {
                                    try {
                                      /* hidden 'Run a Custom Function' action */
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      marginBottom: 8,
                                      marginTop: 8,
                                      width: '100%',
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
                                          color:
                                            palettes.Brand.appStyle_primary,
                                          fontFamily: 'System',
                                          fontSize: 12,
                                          fontWeight: '400',
                                          lineHeight: 20,
                                          marginRight: null,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {expandTxt}
                                  </Text>
                                  <>
                                    {!expanded ? null : (
                                      <Icon
                                        color={palettes.Brand.appStyle_primary}
                                        name={'AntDesign/up'}
                                        size={12}
                                      />
                                    )}
                                  </>
                                  {/* Icon 2 */}
                                  <>
                                    {expanded ? null : (
                                      <Icon
                                        color={palettes.Brand.appStyle_primary}
                                        name={'AntDesign/down'}
                                        size={12}
                                      />
                                    )}
                                  </>
                                </View>
                              </Touchable>
                            </BlurView>
                          </gf.Animated.View>
                        </Utils.CustomCodeErrorBoundary>
                      </View>
                    </View>
                  )}
                </>
              </>
            );
          }}
        </AceCampTestApi.FetchOrganizerInfoGET>
        <Utils.CustomCodeErrorBoundary>
          <CTabView.TabViewExample
            color={['#ffffff', '#ffffff']}
            fontSize={14}
            iconIndex={-1}
            showFilter={false}
            padding={10}
            scene={scene}
            headers={tabViewHeaders}
          ></CTabView.TabViewExample>
        </Utils.CustomCodeErrorBoundary>
      </SimpleStyleScrollView>
      <>
        {getNoteStatus(Variables) === 0 ? null : (
          <EmptyViewBlock type={getNoteStatus(Variables)} />
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(OrganizerScreen);
