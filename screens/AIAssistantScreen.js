import React from 'react';
import {
  ExpoImage,
  Icon,
  LinearGradient,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  TabView,
  TabViewItem,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import AITaskTelBlock from '../components/AITaskTelBlock';
import AITranslateSectionBlock from '../components/AITranslateSectionBlock';
import AITranslateTextBlock from '../components/AITranslateTextBlock';
import AIUploadTranscribeBlock from '../components/AIUploadTranscribeBlock';
import FetchLoadingBlock from '../components/FetchLoadingBlock';
import NoDataBlock from '../components/NoDataBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as gf from '../custom-files/gf';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import msToTime from '../global-functions/msToTime';
import t from '../global-functions/t';
import uploadImage from '../global-functions/uploadImage';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import selectFileUtil from '../utils/selectFile';
import showAlertUtil from '../utils/showAlert';
import useWindowDimensions from '../utils/useWindowDimensions';

const AIAssistantScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [company_list, setCompany_list] = React.useState([]);
  const [filename, setFilename] = React.useState('');
  const [fileurl, setFileurl] = React.useState('');
  const [is_loading, setIs_loading] = React.useState(false);
  const [is_searching, setIs_searching] = React.useState(false);
  const [show_ai_schedulers, setShow_ai_schedulers] = React.useState(false);
  const [show_menu, setShow_menu] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [trans_list, setTrans_list] = React.useState([
    {
      id: 1183637847,
      qa: null,
      state: 'failed',
      title: 'test',
      remark: '转换失败，请联系管理员',
      asr_url: null,
      premium: false,
      speaker: true,
      task_id: 'DKHJQ20250225061910397MsbyQEHT0nJxMUlQ',
      user_id: 10000412,
      duration: 0,
      keywords: [],
      language: 'mix',
      mimetype: 'audio/aac',
      aigc_type: 'standard',
      keypoints: null,
      skip_aigc: null,
      sub_title: '',
      aigc_state: 'pending',
      created_at: 1740435429,
      industries: [],
      keynumbers: null,
      source_url:
        'https://acetube.acecamptech.com/replay/20250225/a9816b1f-dfb7-4279-8792-939d9470acb5.aac?Expires=1742166534&OSSAccessKeyId=LTAI4G9F8BTE1fSbUAFwdTEE&Signature=UgK7NJ7a94t4%2Bxz90q0hfcpxPgM%3D',
      updated_at: 1740435620,
      webvtt_url: null,
      result_type: 'pts',
      source_type: 'live',
      industry_ids: [],
      proper_nouns: [],
      organization_user: {
        id: 20001159,
        name: '用户10000412',
        user_id: 10000412,
        position_id: 3,
        user_avatar: null,
        dismissed_at: null,
        position_name: 'CIO',
      },
      ai_assistant_language: 'auto',
      risks_and_opportunities: null,
      ai_rewrite_display_option: 'original',
    },
    {
      id: 1183637846,
      qa: null,
      state: 'failed',
      title:
        '加快推动《交通运输大规模设备》aaaaaa111111aaaaaa111111aaaaaa111111aaaaaa111111aaaaaa111111aaaaaa111111 2024/06/07 16:00 ~ 2024/06/30 17:00 (Asia/Hong_Kong)',
      remark: '转换失败，请联系管理员',
      asr_url: null,
      premium: false,
      speaker: true,
      task_id: 'DKHJQ20250225054741300eRfSmP7krAvZC5yq',
      user_id: 10000412,
      duration: 0,
      keywords: [],
      language: 'mix',
      mimetype: 'audio/aac',
      aigc_type: 'standard',
      keypoints: null,
      skip_aigc: false,
      sub_title: '',
      aigc_state: 'pending',
      created_at: 1740433646,
      industries: [
        {
          id: 3520,
          name: '制药、生物科技和生命科学',
          en_name: 'Pharmaceuticals, Biotechnology & Life Sciences',
          sc_name: '制药、生物科技和生命科学',
          tc_name: '製薬、生物科技與生命科學',
          custom_sector_id: null,
        },
        {
          id: 4010,
          name: '银行',
          en_name: 'Banks',
          sc_name: '银行',
          tc_name: '銀行',
          custom_sector_id: null,
        },
        {
          id: 6010,
          name: '房地产',
          en_name: 'Real Estate',
          sc_name: '房地产',
          tc_name: '房地產',
          custom_sector_id: null,
        },
      ],
      keynumbers: null,
      source_url:
        'https://acetube.acecamptech.com/replay/20250225/4ec38e62-4c07-4b01-a15f-c2b2fd434b02.aac?Expires=1742166534&OSSAccessKeyId=LTAI4G9F8BTE1fSbUAFwdTEE&Signature=zVZAzl7xZPiwpVHFB5xp%2Fvh5Q7I%3D',
      updated_at: 1740433674,
      webvtt_url: null,
      result_type: 'pts',
      source_type: 'live',
      industry_ids: [3520, 4010, 6010],
      proper_nouns: [],
      organization_user: {
        id: 20001159,
        name: '用户10000412',
        user_id: 10000412,
        position_id: 3,
        user_avatar: null,
        dismissed_at: null,
        position_name: 'CIO',
      },
      ai_assistant_language: 'auto',
      risks_and_opportunities: null,
      ai_rewrite_display_option: 'original',
    },
    {
      id: 1183637845,
      qa: null,
      state: 'failed',
      title: '20221208_China-consumer-report-CN.pdf',
      remark: '转换失败，请重试',
      asr_url: null,
      premium: false,
      speaker: true,
      task_id: null,
      user_id: 10000412,
      duration: null,
      keywords: [],
      language: 'mix',
      mimetype: null,
      aigc_type: 'standard',
      keypoints: null,
      skip_aigc: false,
      sub_title: '',
      aigc_state: 'pending',
      created_at: 1740431951,
      industries: [],
      keynumbers: null,
      source_url:
        'https://file.ca3test.com/transcribe/10000412/0.7815086563034574.pdf?Expires=1742148534&OSSAccessKeyId=LTAI4G1WTPMth9cJT2e1etaN&Signature=6fN0pifRMvgm94LLGXJD5ioN%2B%2BM%3D',
      updated_at: 1740432001,
      webvtt_url: null,
      result_type: 'pts',
      source_type: 'text',
      industry_ids: [],
      proper_nouns: [],
      organization_user: {
        id: 20001159,
        name: '用户10000412',
        user_id: 10000412,
        position_id: 3,
        user_avatar: null,
        dismissed_at: null,
        position_name: 'CIO',
      },
      ai_assistant_language: 'auto',
      risks_and_opportunities: null,
      ai_rewrite_display_option: 'original',
    },
    {
      id: 1183637844,
      qa: null,
      state: 'failed',
      title:
        '财政部 税务总局关于横琴粤澳深度合作区 企业所得税优惠政策的通知.pdf',
      remark: '转换失败，请重试',
      asr_url: null,
      premium: false,
      speaker: true,
      task_id: null,
      user_id: 10000412,
      duration: null,
      keywords: [],
      language: 'mix',
      mimetype: null,
      aigc_type: 'standard',
      keypoints: null,
      skip_aigc: false,
      sub_title: '',
      aigc_state: 'pending',
      created_at: 1740430867,
      industries: [
        {
          id: 5510,
          name: '公用事业',
          en_name: 'Utilities',
          sc_name: '公用事业',
          tc_name: '公用事業',
          custom_sector_id: null,
        },
      ],
      keynumbers: null,
      source_url:
        'https://file.ca3test.com/transcribe/10000412/0.06106494042575861.pdf?Expires=1742148534&OSSAccessKeyId=LTAI4G1WTPMth9cJT2e1etaN&Signature=5Bx1sbgTjg462GlD3KNFhkk9z6g%3D',
      updated_at: 1740430869,
      webvtt_url: null,
      result_type: 'pts',
      source_type: 'text',
      industry_ids: [5510],
      proper_nouns: [],
      organization_user: {
        id: 20001159,
        name: '用户10000412',
        user_id: 10000412,
        position_id: 3,
        user_avatar: null,
        dismissed_at: null,
        position_name: 'CIO',
      },
      ai_assistant_language: 'auto',
      risks_and_opportunities: null,
      ai_rewrite_display_option: 'original',
    },
  ]);
  const close = () => {
    actionSheetRef.current.hide();
    transcribeAction.current.hide();
    telAction.current.hide();
    setShow_ai_schedulers(false);
  };

  const show = () => {
    actionSheetRef.current.show();
  };

  const showTelAction = () => {
    telAction.current.show();
  };

  const showTranscribe = () => {
    transcribeAction.current.show();
  };
  const actionSheetRef = React.useRef();
  const transcribeAction = React.useRef();
  const telAction = React.useRef();
  const safeAreaInsets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    const entry = StatusBar.pushStackEntry?.({ barStyle: 'dark-content' });
    return () => StatusBar.popStackEntry?.(entry);
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App['Custom #ffffff'],
          paddingTop: safeAreaInsets.top,
        },
        dimensions.width
      )}
    >
      {/* 标题及搜索框 */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes.App.White,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 16,
            paddingRight: 16,
            zIndex: 100,
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
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={'disk'}
            contentPosition={'center'}
            resizeMode={'cover'}
            transitionDuration={300}
            transitionEffect={'cross-dissolve'}
            transitionTiming={'ease-in-out'}
            {...GlobalStyles.ExpoImageStyles(theme)['Image 4'].props}
            source={imageSource(Images['logo'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['Image 4'].style,
                { height: 22, width: 22 }
              ),
              dimensions.width
            )}
          />
          {/* Image 2 */}
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={'disk'}
            transitionDuration={300}
            transitionTiming={'ease-in-out'}
            {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
            contentPosition={'left'}
            resizeMode={'contain'}
            source={imageSource(Images['aiassistant'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                { height: 20, marginLeft: 5, width: 35 }
              ),
              dimensions.width
            )}
            transitionEffect={'flip-from-right'}
          />
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.Brand.appStyle_primary,
                fontFamily: 'System',
                fontSize: 20,
                fontWeight: '700',
                letterSpacing: 0.2,
                lineHeight: 22,
                marginLeft: 4,
                marginRight: null,
              },
              dimensions.width
            )}
          >
            {t(Variables, 'ai_common_name')}
          </Text>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginLeft: 10,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderColor: 'rgba(43, 51, 230, 0.3)',
                borderRadius: 20,
                borderWidth: 1,
                flexDirection: 'row',
                paddingRight: 8,
                width: '100%',
              },
              dimensions.width
            )}
          >
            <Icon
              color={palettes.App['Custom Color 9']}
              name={'Ionicons/search'}
              size={16}
              style={StyleSheet.applyWidth({ marginLeft: 8 }, dimensions.width)}
            />
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                const textInputValue = newTextInputValue;
                try {
                  setTextInputValue(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              onChangeTextDelayed={newTextInputValue => {
                const handler = async () => {
                  const textInputValue = newTextInputValue;
                  try {
                    if (newTextInputValue?.length > 0) {
                      setIs_searching(true);
                      const suggest_result = (
                        await AceCampTestApi.searchSuggestGET(Constants, {
                          keyword: newTextInputValue,
                        })
                      )?.json;
                      console.log(suggest_result);
                      setCompany_list(
                        [].concat(suggest_result?.data?.corporations)
                      );
                    } else {
                      setIs_searching(false);
                      setIs_loading(true);
                      await refetchCompanyPopulars();
                    }
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              webShowOutline={true}
              {...GlobalStyles.TextInputStyles(theme)['Login Input'].props}
              placeholder={t(
                Variables,
                'ai_list_search_placeholder'
              ).toString()}
              placeholderTextColor={palettes.App['Custom Color 9']}
              returnKeyType={'search'}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Login Input'].style,
                  {
                    fontFamily: 'System',
                    fontSize: 12,
                    fontWeight: '400',
                    lineHeight: 14,
                    paddingBottom: null,
                    paddingLeft: 6,
                    paddingTop: null,
                    width: '70%',
                  }
                ),
                dimensions.width
              )}
              value={textInputValue}
            />
          </View>
        </View>
      </View>

      <TabView
        iconPosition={'top'}
        indicatorColor={theme.colors.branding.primary}
        initialTabIndex={0}
        keyboardDismissMode={'auto'}
        pressColor={theme.colors.branding.primary}
        swipeEnabled={true}
        tabBarPosition={'top'}
        activeColor={palettes.Brand.appStyle_primary}
        scrollEnabled={false}
        style={StyleSheet.applyWidth(
          {
            fontFamily: 'System',
            fontSize: 12,
            fontWeight: '600',
            letterSpacing: 0.2,
            lineHeight: 14,
            marginTop: -5,
            textDecorationLine: 'none',
          },
          dimensions.width
        )}
        tabsBackgroundColor={palettes.App['Custom #ffffff']}
      >
        {/* 转录纪要 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
            dimensions.width
          )}
          title={t(Variables, 'ai_record')}
        >
          <View
            style={StyleSheet.applyWidth(
              { height: '100%', width: '100%' },
              dimensions.width
            )}
          >
            <LinearGradient
              endX={100}
              endY={100}
              startX={0}
              startY={0}
              {...GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                .props}
              color1={palettes.App['Custom Color 13']}
              color2={palettes.App['Custom #ffffff']}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                    .style,
                  { position: 'absolute', top: 0 }
                ),
                dimensions.width
              )}
            />
            <AceCampTestApi.FetchTranscribesListGET
              handlers={{
                onData: fetchData => {
                  try {
                    setTrans_list(fetchData?.data);
                  } catch (err) {
                    console.error(err);
                  }
                },
              }}
              page={1}
              per_page={15}
            >
              {({ loading, error, data, refetchTranscribesList }) => {
                const fetchData = data?.json;
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
                      horizontal={false}
                      keyboardShouldPersistTaps={'never'}
                      nestedScrollEnabled={false}
                      bounces={false}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      style={StyleSheet.applyWidth(
                        { height: '100%', width: '100%' },
                        dimensions.width
                      )}
                    >
                      {/* List 2 */}
                      <SimpleStyleFlatList
                        data={trans_list}
                        decelerationRate={'normal'}
                        horizontal={false}
                        inverted={false}
                        keyExtractor={(list2Data, index) =>
                          list2Data?.id ??
                          list2Data?.uuid ??
                          index?.toString() ??
                          JSON.stringify(list2Data)
                        }
                        keyboardShouldPersistTaps={'never'}
                        listKey={
                          'Tab View->转录纪要->View->Fetch->Scroll View->List 2'
                        }
                        nestedScrollEnabled={false}
                        numColumns={1}
                        onEndReachedThreshold={0.5}
                        pagingEnabled={false}
                        renderItem={({ item, index }) => {
                          const list2Data = item;
                          return (
                            <Touchable
                              onPress={() => {
                                try {
                                  navigation.push('AITranscribeDetailScreen', {
                                    id: list2Data?.id,
                                  });
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
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
                                distance={5}
                                paintInside={false}
                                startColor={palettes.App['Custom Color 103']}
                                stretch={false}
                                style={StyleSheet.applyWidth(
                                  {
                                    borderRadius: 4,
                                    marginBottom: 16,
                                    marginLeft: 16,
                                    marginRight: 16,
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                              >
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor:
                                        palettes.App['Custom #ffffff'],
                                      borderRadius: 4,
                                      padding: 8,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* 成功 */}
                                  <>
                                    {!(
                                      list2Data?.state === 'finished'
                                    ) ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            backgroundColor:
                                              palettes.App['Custom Color 81'],
                                            left: 8,
                                            paddingBottom: 2,
                                            paddingLeft: 4,
                                            paddingRight: 4,
                                            paddingTop: 2,
                                            position: 'absolute',
                                            top: 9,
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
                                                palettes.App['Custom Color 82'],
                                              fontFamily: 'System',
                                              fontSize: 10,
                                              fontWeight: '400',
                                              lineHeight: 14,
                                              marginRight: null,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {'已转写'}
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                  {/* Text 2 */}
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    ellipsizeMode={'tail'}
                                    numberOfLines={2}
                                    style={StyleSheet.applyWidth(
                                      {
                                        fontFamily: 'System',
                                        fontSize: 14,
                                        fontWeight: '700',
                                        letterSpacing: 0.3,
                                        lineHeight: 20,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'             '}
                                    {list2Data?.title}
                                  </Text>
                                  {/* View 2 */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 5,
                                      },
                                      dimensions.width
                                    )}
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
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.App['Custom Color 23'],
                                            fontFamily: 'System',
                                            fontSize: 13,
                                            fontWeight: '400',
                                            letterSpacing: 0.3,
                                            lineHeight: 15,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {list2Data?.source_type === 'live'
                                          ? '音频'
                                          : '文档'}
                                      </Text>
                                      {/* Text 2 */}
                                      <>
                                        {!(
                                          list2Data?.source_type !== 'text'
                                        ) ? null : (
                                          <Text
                                            accessible={true}
                                            selectable={false}
                                            style={StyleSheet.applyWidth(
                                              {
                                                color:
                                                  palettes.App[
                                                    'Custom Color 23'
                                                  ],
                                                fontFamily: 'System',
                                                fontSize: 13,
                                                fontWeight: '400',
                                                letterSpacing: 0.3,
                                                lineHeight: 15,
                                                marginLeft: 10,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {'时长'}
                                            {list2Data?.duration
                                              ? msToTime(list2Data?.duration)
                                              : '00:00'}
                                          </Text>
                                        )}
                                      </>
                                    </View>
                                    {/* Text 3 */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignSelf: 'flex-end',
                                          color:
                                            palettes.App['Custom Color 23'],
                                          fontFamily: 'System',
                                          fontSize: 13,
                                          fontWeight: '400',
                                          letterSpacing: 0.3,
                                          lineHeight: 15,
                                          marginLeft: 10,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {fromUnixTimestamp(
                                        Variables,
                                        list2Data?.created_at,
                                        'YYYY/MM/DD HH:mm'
                                      )}
                                    </Text>
                                  </View>
                                  {/* 转写中 */}
                                  <>
                                    {!(
                                      list2Data?.state === 'pending'
                                    ) ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            backgroundColor:
                                              'rgba(251, 182, 11, 0.15)',
                                            left: 8,
                                            paddingBottom: 2,
                                            paddingLeft: 4,
                                            paddingRight: 4,
                                            paddingTop: 2,
                                            position: 'absolute',
                                            top: 9,
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
                                                palettes.App['Custom Color 83'],
                                              fontFamily: 'System',
                                              fontSize: 10,
                                              fontWeight: '400',
                                              lineHeight: 14,
                                              marginRight: null,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {'转写中'}
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                  {/* 失败 */}
                                  <>
                                    {!(list2Data?.state === 'failed') ? null : (
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            backgroundColor:
                                              'rgba(243, 50, 31, 0.15)',
                                            left: 8,
                                            paddingBottom: 2,
                                            paddingLeft: 8,
                                            paddingRight: 8,
                                            paddingTop: 2,
                                            position: 'absolute',
                                            top: 9,
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
                                                palettes.App['Custom Color 15'],
                                              fontFamily: 'System',
                                              fontSize: 10,
                                              fontWeight: '400',
                                              lineHeight: 14,
                                              marginRight: null,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {'失 败'}
                                        </Text>
                                      </View>
                                    )}
                                  </>
                                </View>
                              </Shadow>
                            </Touchable>
                          );
                        }}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        snapToAlignment={'start'}
                        style={StyleSheet.applyWidth(
                          { paddingBottom: 16, paddingTop: 16 },
                          dimensions.width
                        )}
                      />
                    </SimpleStyleScrollView>
                    <>
                      {!(
                        fetchData?.code === 200 && trans_list?.length === 0
                      ) ? null : (
                        <NoDataBlock />
                      )}
                    </>
                  </>
                );
              }}
            </AceCampTestApi.FetchTranscribesListGET>
          </View>
        </TabViewItem>
        {/* AI翻译 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
            dimensions.width
          )}
          title={t(Variables, 'ai_translate')}
        >
          <AITranslateSectionBlock />
        </TabViewItem>
        {/* 录制任务 */}
        <TabViewItem
          {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
            dimensions.width
          )}
          title={t(Variables, 'ai_record_task')}
        />
      </TabView>
      {/* View 3 */}
      <>
        {!show_ai_schedulers ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                bottom: 0,
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                width: '100%',
                zIndex: 1000,
              },
              dimensions.width
            )}
          >
            <Shadow
              offsetX={0}
              offsetY={0}
              paintInside={true}
              showShadowCornerBottomEnd={true}
              showShadowCornerBottomStart={true}
              showShadowCornerTopEnd={true}
              showShadowCornerTopStart={true}
              showShadowSideBottom={true}
              showShadowSideEnd={true}
              showShadowSideStart={true}
              showShadowSideTop={true}
            >
              <AITaskTelBlock
                close={() => {
                  try {
                    close();
                  } catch (err) {
                    console.error(err);
                  }
                }}
              />
            </Shadow>
          </View>
        )}
      </>
      <View
        style={StyleSheet.applyWidth(
          { bottom: 16, position: 'absolute', right: 16, zIndex: 300 },
          dimensions.width
        )}
      >
        <Touchable
          onPress={() => {
            try {
              setShow_menu(!show_menu);
            } catch (err) {
              console.error(err);
            }
          }}
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
            source={imageSource(Images['plusbtn'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                { height: 50, width: 50 }
              ),
              dimensions.width
            )}
          />
        </Touchable>
      </View>
      {/* View 2 */}
      <>
        {!show_menu ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                bottom: 0,
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: 200,
              },
              dimensions.width
            )}
          >
            <BlurView
              {...GlobalStyles.BlurViewStyles(theme)['Blur View'].props}
              experimentalBlurMethod={'dimezisBlurView'}
              intensity={20}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.BlurViewStyles(theme)['Blur View'].style,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 200,
                  }
                ),
                dimensions.width
              )}
              tint={'light'}
            >
              <Touchable
                onPress={() => {
                  try {
                    setShow_menu(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { height: '100%', width: '100%' },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'center',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          const result = await selectFileUtil({
                            returnNameAndValue: true,
                            multiple: false,
                            outputBase64: true,
                          });
                          /* hidden 'Log to Console' action */
                          const url = await uploadImage(result, 'transcribe');
                          setFilename(result?.name);
                          setFileurl(url);
                          showTranscribe();
                          /* hidden 'Show Alert' action */
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
                          height: 60,
                          justifyContent: 'center',
                          width: 300,
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
                        resizeMode={'cover'}
                        source={imageSource(Images['addbtn'])}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                            { height: 60, position: 'absolute', width: 300 }
                          ),
                          dimensions.width
                        )}
                      />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text Title'].style,
                            theme.typography.body1,
                            { color: palettes.App['Custom #ffffff'] }
                          ),
                          dimensions.width
                        )}
                      >
                        {'上传手机音视频/文档'}
                      </Text>
                    </View>
                  </Touchable>
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        height: 60,
                        justifyContent: 'center',
                        marginTop: 10,
                        width: 300,
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
                      resizeMode={'cover'}
                      source={imageSource(Images['addbtnlight'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                          { height: 60, position: 'absolute', width: 300 }
                        ),
                        dimensions.width
                      )}
                    />
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Title'].style,
                          theme.typography.body1,
                          { color: palettes.App.appStyle_black }
                        ),
                        dimensions.width
                      )}
                    >
                      {'多平台会议录制'}
                    </Text>
                  </View>
                  {/* Touchable 2 */}
                  <Touchable
                    onPress={() => {
                      try {
                        setShow_ai_schedulers(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* View 4 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          height: 60,
                          justifyContent: 'center',
                          marginTop: 10,
                          width: 300,
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
                        resizeMode={'cover'}
                        source={imageSource(Images['addbtnlight'])}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                            { height: 60, position: 'absolute', width: 300 }
                          ),
                          dimensions.width
                        )}
                      />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text Title'].style,
                            theme.typography.body1,
                            { color: palettes.App.appStyle_black }
                          ),
                          dimensions.width
                        )}
                      >
                        {'电话会议录制'}
                      </Text>
                    </View>
                  </Touchable>
                  {/* View 3 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        height: 60,
                        justifyContent: 'center',
                        marginTop: 10,
                        width: 300,
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
                      resizeMode={'cover'}
                      source={imageSource(Images['addbtnlight'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                          { height: 60, position: 'absolute', width: 300 }
                        ),
                        dimensions.width
                      )}
                    />
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text Title'].style,
                          theme.typography.body1,
                          { color: palettes.App.appStyle_black }
                        ),
                        dimensions.width
                      )}
                    >
                      {'现场实时录制'}
                    </Text>
                  </View>
                </View>
              </Touchable>
            </BlurView>
          </View>
        )}
      </>
      {/* 上传文件 */}
      <Utils.CustomCodeErrorBoundary>
        <gf.ActionSheet
          indicatorStyle={{
            marginTop: 10,
            width: 150,
          }}
          gestureEnabled
          drawUnderStatusBar
          ref={transcribeAction}
        >
          <AIUploadTranscribeBlock
            callback={() => {
              try {
                close();
                setShow_menu(false);
              } catch (err) {
                console.error(err);
              }
            }}
            filename={filename}
            fileurl={fileurl}
          />
        </gf.ActionSheet>
      </Utils.CustomCodeErrorBoundary>
      {/* ai翻译 */}
      <Utils.CustomCodeErrorBoundary>
        <gf.ActionSheet
          indicatorStyle={{
            marginTop: 10,
            width: 150,
          }}
          gestureEnabled
          drawUnderStatusBar
          ref={actionSheetRef}
        >
          <AITranslateTextBlock />
        </gf.ActionSheet>
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(AIAssistantScreen);
