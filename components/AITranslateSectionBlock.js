import React from 'react';
import {
  ExpoImage,
  LinearGradient,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import AITranslateTextBlock from '../components/AITranslateTextBlock';
import FetchLoadingBlock from '../components/FetchLoadingBlock';
import NoDataBlock from '../components/NoDataBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as gf from '../custom-files/gf';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import msToTime from '../global-functions/msToTime';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const AITranslateSectionBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [refresh, setRefresh] = React.useState(false);
  const [show_menu, setShow_menu] = React.useState(false);
  const [source_type, setSource_type] = React.useState('text');
  const [trans_list, setTrans_list] = React.useState([]);
  const close = () => {
    actionSheetRef.current.hide();
    setRefresh(!refresh);
  };

  const show = () => {
    actionSheetRef.current.show();
  };
  const actionSheetRef = React.useRef();

  return (
    <View>
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
          <AITranslateTextBlock callback={() => close()} type={source_type} />
        </gf.ActionSheet>
      </Utils.CustomCodeErrorBoundary>
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
          {...GlobalStyles.LinearGradientStyles(theme)['Linear Gradient'].props}
          color1={palettes.App['Custom Color 13']}
          color2={palettes.App['Custom #ffffff']}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.LinearGradientStyles(theme)['Linear Gradient'].style,
              { position: 'absolute', top: 0 }
            ),
            dimensions.width
          )}
        />
        {/* View 4 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 16,
              paddingBottom: 0,
            },
            dimensions.width
          )}
        >
          <Touchable
            onPress={() => {
              try {
                show();
                setSource_type('text');
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ width: '30%' }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  borderRadius: 4,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 10,
                  overflow: 'hidden',
                },
                dimensions.width
              )}
            >
              <LinearGradient
                endX={100}
                startX={0}
                {...GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                  .props}
                color1={palettes.App['Custom Color 98']}
                color2={palettes.App['Custom Color 100']}
                color3={palettes.App['Custom Color 101']}
                endY={50}
                startY={50}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                      .style,
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 8,
                      paddingLeft: 8,
                      paddingRight: 8,
                      paddingTop: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['16_Title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['16_Title'].style,
                      {
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '700',
                        lineHeight: 20,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'ai_translate_text')}
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
                  source={imageSource(Images['aiarrow'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                      { height: 20, width: 20 }
                    ),
                    dimensions.width
                  )}
                />
              </LinearGradient>
            </View>
          </Touchable>
          {/* Touchable 2 */}
          <Touchable
            onPress={() => {
              try {
                setSource_type('doc');
                show();
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ width: '30%' }, dimensions.width)}
          >
            {/* View 3 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  borderRadius: 4,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 10,
                  overflow: 'hidden',
                },
                dimensions.width
              )}
            >
              <LinearGradient
                endX={100}
                startX={0}
                {...GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                  .props}
                color1={palettes.App['Custom Color 98']}
                color2={palettes.App['Custom Color 100']}
                color3={palettes.App['Custom Color 101']}
                endY={50}
                startY={50}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                      .style,
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 8,
                      paddingLeft: 8,
                      paddingRight: 8,
                      paddingTop: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['16_Title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['16_Title'].style,
                      {
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '700',
                        lineHeight: 20,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'ai_translate_doc')}
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
                  source={imageSource(Images['aiarrow'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                      { height: 20, width: 20 }
                    ),
                    dimensions.width
                  )}
                />
              </LinearGradient>
            </View>
          </Touchable>
          {/* Touchable 3 */}
          <Touchable
            onPress={() => {
              try {
                show();
                setSource_type('article');
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ width: '30%' }, dimensions.width)}
          >
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  borderRadius: 4,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                },
                dimensions.width
              )}
            >
              <LinearGradient
                endX={100}
                startX={0}
                {...GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                  .props}
                color1={palettes.App['Custom Color 98']}
                color2={palettes.App['Custom Color 100']}
                color3={palettes.App['Custom Color 101']}
                endY={50}
                startY={50}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.LinearGradientStyles(theme)['Linear Gradient']
                      .style,
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 8,
                      paddingLeft: 8,
                      paddingRight: 8,
                      paddingTop: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['16_Title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['16_Title'].style,
                      {
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '700',
                        lineHeight: 20,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'ai_translate_article')}
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
                  source={imageSource(Images['aiarrow'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                      { height: 20, width: 20 }
                    ),
                    dimensions.width
                  )}
                />
              </LinearGradient>
            </View>
          </Touchable>
        </View>

        <AceCampTestApi.FetchAiTranslatesListGET
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
          per_page={100}
          refresh={refresh}
        >
          {({ loading, error, data, refetchAiTranslatesList }) => {
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
                    listKey={'View->Fetch->Scroll View->List 2'}
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
                                {!(list2Data?.state === 'finished') ? null : (
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
                                      {'已翻译'}
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
                                {'            '}
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
                                        color: palettes.App['Custom Color 23'],
                                        fontFamily: 'System',
                                        fontSize: 13,
                                        fontWeight: '400',
                                        letterSpacing: 0.3,
                                        lineHeight: 15,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {list2Data?.target === 'en'
                                      ? t(Variables, 'ai_translate_c_to_e')
                                      : t(Variables, 'ai_translate_e_to_c')}
                                  </Text>
                                </View>
                                {/* Text 3 */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignSelf: 'flex-end',
                                      color: palettes.App['Custom Color 23'],
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
                                {!(list2Data?.state === 'pending') ? null : (
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
                                      {'翻译中'}
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
        </AceCampTestApi.FetchAiTranslatesListGET>
      </View>
    </View>
  );
};

export default withTheme(AITranslateSectionBlock);
