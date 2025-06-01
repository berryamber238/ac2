import React from 'react';
import { ExpoImage, SimpleStyleFlatList, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  livePagers: [
    {
      liveId: '123456',
      uisList: [0],
      localUid: 0,
      isHomeScreen: true,
      isLocalScreen: true,
    },
    {
      liveId: '654321',
      uisList: [3, 4, 5],
      localUid: 1,
      isHomeScreen: false,
      isLocalScreen: false,
    },
    {
      liveId: '789012',
      uisList: [6, 7, 8],
      localUid: 2,
      isHomeScreen: false,
      isLocalScreen: false,
    },
    {
      liveId: '345678',
      uisList: [9, 10, 11],
      localUid: 3,
      isHomeScreen: false,
      isLocalScreen: false,
    },
  ],
};

const LivePagerItemBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [livePager1, setLivePager1] = React.useState({});
  const [livePager2, setLivePager2] = React.useState({});
  const [livePager3, setLivePager3] = React.useState({});
  const [livePager4, setLivePager4] = React.useState({});
  const getLiveAttribute = (liveId, uid) => {
    const live = Variables['sp_live_name_space' + liveId];
    if (live) {
      return live['live_' + uid];
    } else {
      return undefined;
    }
    // return Variables['sp_live_name_space' + liveId]?.['live_'+uid];
  };

  const getLiveAttributeBackground = liveId => {
    const live = Variables['sp_live_name_space' + liveId];
    if (live) {
      return live['setBackgroundUrl'];
    }

    return Images['bgliveacecamp'];
  };

  const getLiveAttributeMute = (liveId, uid) => {
    const attribute = getLiveAttribute(liveId, uid);
    if (attribute) {
      return attribute.mute;
    }
    return true;
  };

  const getLiveAttributeName = (liveId, uid) => {
    const attribute = getLiveAttribute(liveId, uid);
    if (attribute) {
      return attribute.name;
    } else {
      return t(Variables, 'live_set_no');
    }
  };

  const getLiveAttributeVolume = (liveId, uid) => {
    const attribute = getLiveAttribute(liveId, uid);
    if (attribute) {
      if (attribute.volume === -1 || attribute.mute) {
        return Images['icvoicemute'];
      } else if (attribute.volume === 0) {
        return Images['icvoicevolumeno'];
      } else if (attribute.volume < 50) {
        return Images['icvoicevolume1'];
      } else if (attribute.volume < 150) {
        return Images['icvoicevolume2'];
      } else if (attribute.volume) {
        return Images['icvoicevolume3'];
      } else {
        return Images['icvoicevolumeno'];
      }
    }
    return Images['icvoicevolumeno'];
  };

  const show_first_view = livePager => {
    if (livePager.isHomeScreen) {
      if (livePager.isLocalScreen) {
        if (
          livePager.uisList.length === 1 &&
          livePager.localUid === livePager.uisList[0]
        ) {
          return true;
        } else {
          if (livePager.uisList.length > 0) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        if (
          livePager.uisList.length > 0 &&
          livePager.localUid !== livePager.uisList[0]
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return true;
    }
  };

  const show_img_no_live = livePager => {
    if (livePager.isHomeScreen) {
      if (livePager.isLocalScreen) {
        if (
          livePager.uisList.length === 1 &&
          livePager.localUid === livePager.uisList[0]
        ) {
          return false;
        } else {
          if (livePager.uisList.length > 0) {
            return false;
          } else {
            return true;
          }
        }
      } else {
        if (
          livePager.uisList.length > 0 &&
          livePager.localUid !== livePager.uisList[0]
        ) {
          return false;
        } else {
          true;
        }
      }
    } else {
      return false;
    }
  };
  React.useEffect(() => {
    try {
      setLivePager1(
        (props.livePagers ?? defaultProps.livePagers) &&
          (props.livePagers ?? defaultProps.livePagers)[0]
      );
      setLivePager2(
        (props.livePagers ?? defaultProps.livePagers) &&
          (props.livePagers ?? defaultProps.livePagers)[1]
      );
      setLivePager3(
        (props.livePagers ?? defaultProps.livePagers) &&
          (props.livePagers ?? defaultProps.livePagers)[2]
      );
      setLivePager4(
        (props.livePagers ?? defaultProps.livePagers) &&
          (props.livePagers ?? defaultProps.livePagers)[3]
      );
      /* 'Set Variable' action requires configuration: choose a variable */
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <View
      style={StyleSheet.applyWidth(
        { height: '100%', width: '100%' },
        dimensions.width
      )}
    >
      <SimpleStyleFlatList
        data={props.livePagers ?? defaultProps.livePagers}
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
        listKey={'List'}
        nestedScrollEnabled={false}
        numColumns={1}
        onEndReachedThreshold={0.5}
        renderItem={({ item, index }) => {
          const listData = item;
          return (
            <View
              style={StyleSheet.applyWidth(
                {
                  height: [
                    { minWidth: Breakpoints.Mobile, value: '100%' },
                    { minWidth: Breakpoints.Mobile, value: dimensions.height },
                  ],
                  width: [
                    { minWidth: Breakpoints.Mobile, value: '100%' },
                    { minWidth: Breakpoints.Mobile, value: dimensions.width },
                  ],
                },
                dimensions.width
              )}
            >
              {/* top */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, flexDirection: 'row' },
                  dimensions.width
                )}
              >
                {/* live01-home-local */}
                <>
                  {!(
                    listData?.isHomeScreen && listData?.isLocalScreen
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { flex: 1, justifyContent: 'flex-end' },
                        dimensions.width
                      )}
                    >
                      {/* img_no_live */}
                      <>
                        {!(listData?.uisList?.length === 0) ? null : (
                          <ExpoImage
                            allowDownscaling={true}
                            cachePolicy={'disk'}
                            contentPosition={'center'}
                            resizeMode={'cover'}
                            transitionDuration={300}
                            transitionEffect={'cross-dissolve'}
                            transitionTiming={'ease-in-out'}
                            {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                              .props}
                            source={imageSource(
                              getLiveAttributeBackground(listData?.liveId)
                            )}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                  .style,
                                {
                                  bottom: 0,
                                  height: '100%',
                                  left: 0,
                                  position: 'absolute',
                                  right: 0,
                                  top: 0,
                                  width: '100%',
                                }
                              ),
                              dimensions.width
                            )}
                          />
                        )}
                      </>
                      {/* first_view */}
                      <>
                        {listData?.uisList?.length === 0 ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                bottom: 0,
                                left: 0,
                                position: 'absolute',
                                right: 0,
                                top: 0,
                              },
                              dimensions.width
                            )}
                          />
                        )}
                      </>
                      {/* local_view */}
                      <>
                        {listData?.uisList?.length === 1 &&
                        listData?.localUid === listData?.uisList?.[0] ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor:
                                  palettes.App.Studily_Forrest_Shade,
                                height: 160,
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                width: 90,
                              },
                              dimensions.width
                            )}
                          />
                        )}
                      </>
                      {/* img_change_camera */}
                      <ExpoImage
                        allowDownscaling={true}
                        cachePolicy={'disk'}
                        contentPosition={'center'}
                        resizeMode={'cover'}
                        transitionDuration={300}
                        transitionEffect={'cross-dissolve'}
                        transitionTiming={'ease-in-out'}
                        {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                        source={imageSource(Images['icchangecamera'])}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                            {
                              height: 28,
                              position: 'absolute',
                              right: 8,
                              top: 8,
                              width: 28,
                            }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* voice_01 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: 36,
                            flexDirection: 'row',
                            height: 26,
                            justifyContent: 'space-between',
                            marginBottom: 8,
                            marginLeft: 8,
                            paddingLeft: 6,
                            paddingRight: 6,
                            width: 88,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Text_01 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.App['Custom #ffffff'],
                              fontFamily: 'System',
                              fontSize: 12,
                              fontWeight: '400',
                            },
                            dimensions.width
                          )}
                        >
                          {getLiveAttributeName(
                            listData?.liveId,
                            listData?.uisList?.[0]
                          )}
                        </Text>
                        {/* Image_01 */}
                        <ExpoImage
                          allowDownscaling={true}
                          cachePolicy={'disk'}
                          contentPosition={'center'}
                          resizeMode={'cover'}
                          transitionDuration={300}
                          transitionEffect={'cross-dissolve'}
                          transitionTiming={'ease-in-out'}
                          {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                            .props}
                          source={imageSource(
                            getLiveAttributeVolume(
                              listData?.liveId,
                              listData?.uisList?.[0]
                            )
                          )}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                .style,
                              { height: 18, width: 18 }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    </View>
                  )}
                </>
                {/* live01-home-not-local */}
                <>
                  {!(
                    listData?.isHomeScreen && !listData?.isLocalScreen
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { flex: 1, justifyContent: 'flex-end' },
                        dimensions.width
                      )}
                    >
                      {/* first_view */}
                      <>
                        {!(
                          listData?.uisList?.length > 0 &&
                          listData?.localUid !== listData?.uisList?.[0]
                        ) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                bottom: 0,
                                left: 0,
                                position: 'absolute',
                                right: 0,
                                top: 0,
                              },
                              dimensions.width
                            )}
                          />
                        )}
                      </>
                      {/* img_no_live */}
                      <>
                        {listData?.uisList?.length > 0 &&
                        listData?.localUid !== listData?.uisList?.[0] ? null : (
                          <ExpoImage
                            allowDownscaling={true}
                            cachePolicy={'disk'}
                            contentPosition={'center'}
                            resizeMode={'cover'}
                            transitionDuration={300}
                            transitionEffect={'cross-dissolve'}
                            transitionTiming={'ease-in-out'}
                            {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                              .props}
                            source={imageSource(
                              getLiveAttributeBackground(listData?.liveId)
                            )}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                  .style,
                                {
                                  bottom: 0,
                                  height: '100%',
                                  left: 0,
                                  position: 'absolute',
                                  right: 0,
                                  top: 0,
                                  width: '100%',
                                }
                              ),
                              dimensions.width
                            )}
                          />
                        )}
                      </>
                      {/* img_full_screen */}
                      <>
                        {!(
                          listData?.uisList?.length > 0 &&
                          listData?.localUid !== listData?.uisList?.[0]
                        ) ? null : (
                          <ExpoImage
                            allowDownscaling={true}
                            cachePolicy={'disk'}
                            contentPosition={'center'}
                            resizeMode={'cover'}
                            transitionDuration={300}
                            transitionEffect={'cross-dissolve'}
                            transitionTiming={'ease-in-out'}
                            {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                              .props}
                            source={imageSource(Images['icfullscreen'])}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                  .style,
                                {
                                  bottom: 8,
                                  height: 28,
                                  position: 'absolute',
                                  right: 8,
                                  width: 28,
                                }
                              ),
                              dimensions.width
                            )}
                          />
                        )}
                      </>
                      {/* voice_01 */}
                      <>
                        {!(
                          listData?.uisList?.length > 0 &&
                          listData?.localUid !== listData?.uisList?.[0]
                        ) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: 36,
                                flexDirection: 'row',
                                height: 26,
                                justifyContent: 'space-between',
                                marginBottom: 8,
                                marginLeft: 8,
                                paddingLeft: 6,
                                paddingRight: 6,
                                width: 88,
                              },
                              dimensions.width
                            )}
                          >
                            {/* Text_01 */}
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: palettes.App['Custom #ffffff'],
                                  fontFamily: 'System',
                                  fontSize: 12,
                                  fontWeight: '400',
                                },
                                dimensions.width
                              )}
                            >
                              {getLiveAttributeName(
                                listData?.liveId,
                                listData?.uisList?.[0]
                              )}
                            </Text>
                            {/* Image_01 */}
                            <ExpoImage
                              allowDownscaling={true}
                              cachePolicy={'disk'}
                              contentPosition={'center'}
                              resizeMode={'cover'}
                              transitionDuration={300}
                              transitionEffect={'cross-dissolve'}
                              transitionTiming={'ease-in-out'}
                              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                .props}
                              source={imageSource(
                                getLiveAttributeVolume(
                                  listData?.liveId,
                                  listData?.uisList?.[0]
                                )
                              )}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                    .style,
                                  { height: 18, width: 18 }
                                ),
                                dimensions.width
                              )}
                            />
                          </View>
                        )}
                      </>
                    </View>
                  )}
                </>
                {/* live01-not-home */}
                <>
                  {!!listData?.isHomeScreen ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { flex: 1, justifyContent: 'flex-end' },
                        dimensions.width
                      )}
                    >
                      {/* img_no_live */}
                      <>
                        {!show_img_no_live(listData) ? null : (
                          <ExpoImage
                            allowDownscaling={true}
                            cachePolicy={'disk'}
                            contentPosition={'center'}
                            resizeMode={'cover'}
                            transitionDuration={300}
                            transitionEffect={'cross-dissolve'}
                            transitionTiming={'ease-in-out'}
                            {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                              .props}
                            source={imageSource(Images['bgliveacecamp'])}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                  .style,
                                {
                                  bottom: 0,
                                  height: '100%',
                                  left: 0,
                                  position: 'absolute',
                                  right: 0,
                                  top: 0,
                                  width: '100%',
                                }
                              ),
                              dimensions.width
                            )}
                          />
                        )}
                      </>
                      {/* first_view */}
                      <>
                        {!show_first_view(listData) ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                bottom: 0,
                                left: 0,
                                position: 'absolute',
                                right: 0,
                                top: 0,
                              },
                              dimensions.width
                            )}
                          />
                        )}
                      </>
                      {/* local_view */}
                      <>
                        {(listData?.isLocalScreen &&
                          listData?.uisList?.length === 1 &&
                          listData?.uisList?.[0] === listData?.localUid) ||
                        !listData?.isLocalScreen ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor:
                                  palettes.App.Studily_Forrest_Shade,
                                height: 160,
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                width: 90,
                              },
                              dimensions.width
                            )}
                          />
                        )}
                      </>
                      {/* img_full_screen */}
                      <>
                        {!(
                          listData?.isHomeScreen &&
                          !listData?.isLocalScreen &&
                          listData?.uisList?.length > 0 &&
                          listData?.localUid !== listData?.uisList?.[0]
                        ) ? null : (
                          <ExpoImage
                            allowDownscaling={true}
                            cachePolicy={'disk'}
                            contentPosition={'center'}
                            resizeMode={'cover'}
                            transitionDuration={300}
                            transitionEffect={'cross-dissolve'}
                            transitionTiming={'ease-in-out'}
                            {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                              .props}
                            source={imageSource(Images['icfullscreen'])}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                  .style,
                                {
                                  bottom: 8,
                                  height: 28,
                                  position: 'absolute',
                                  right: 8,
                                  width: 28,
                                }
                              ),
                              dimensions.width
                            )}
                          />
                        )}
                      </>
                      {/* voice_01 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: 36,
                            flexDirection: 'row',
                            height: 26,
                            justifyContent: 'space-between',
                            marginBottom: 8,
                            marginLeft: 8,
                            paddingLeft: 6,
                            paddingRight: 6,
                            width: 88,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Text_01 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.App['Custom #ffffff'],
                              fontFamily: 'System',
                              fontSize: 12,
                              fontWeight: '400',
                            },
                            dimensions.width
                          )}
                        >
                          {getLiveAttributeName(
                            listData?.liveId,
                            listData?.uisList?.length === 1
                              ? undefined
                              : undefined
                          )}
                        </Text>
                        {/* Image_01 */}
                        <ExpoImage
                          allowDownscaling={true}
                          cachePolicy={'disk'}
                          contentPosition={'center'}
                          resizeMode={'cover'}
                          transitionDuration={300}
                          transitionEffect={'cross-dissolve'}
                          transitionTiming={'ease-in-out'}
                          {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                            .props}
                          source={imageSource(Images['icvoicevolumeno'])}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                .style,
                              { height: 18, width: 18 }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    </View>
                  )}
                </>
                {/* live02 */}
                <>
                  {!(
                    !listData?.isHomeScreen && listData?.uisList >= 3
                  ) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        { flex: 1, justifyContent: 'flex-end' },
                        dimensions.width
                      )}
                    >
                      {/* second_view */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            bottom: 0,
                            left: 0,
                            position: 'absolute',
                            right: 0,
                            top: 0,
                          },
                          dimensions.width
                        )}
                      />
                      {/* voice_01 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: 36,
                            flexDirection: 'row',
                            height: 26,
                            justifyContent: 'space-between',
                            marginBottom: 8,
                            marginLeft: 8,
                            paddingLeft: 6,
                            paddingRight: 6,
                            width: 88,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Text_02 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.App['Custom #ffffff'],
                              fontFamily: 'System',
                              fontSize: 12,
                              fontWeight: '400',
                            },
                            dimensions.width
                          )}
                        >
                          {'Lorem ipsum dolor sit amet'}
                        </Text>
                        {/* Image_02 */}
                        <ExpoImage
                          allowDownscaling={true}
                          cachePolicy={'disk'}
                          contentPosition={'center'}
                          resizeMode={'cover'}
                          transitionDuration={300}
                          transitionEffect={'cross-dissolve'}
                          transitionTiming={'ease-in-out'}
                          {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                            .props}
                          source={imageSource(Images['icvoicevolumeno'])}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                .style,
                              { height: 18, width: 18 }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    </View>
                  )}
                </>
              </View>
              {/* bottom */}
              <>
                {!(
                  !listData?.isHomeScreen && listData?.uisList?.length >= 2
                ) ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      { flex: 1, flexDirection: 'row', marginTop: 7 },
                      dimensions.width
                    )}
                  >
                    {/* live03 */}
                    <>
                      {!(listData?.uisList?.length >= 2) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1, justifyContent: 'flex-end' },
                            dimensions.width
                          )}
                        >
                          {/* third_view */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                bottom: 0,
                                left: 0,
                                position: 'absolute',
                                right: 0,
                                top: 0,
                              },
                              dimensions.width
                            )}
                          />
                          {/* voice_01 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: 36,
                                flexDirection: 'row',
                                height: 26,
                                justifyContent: 'space-between',
                                marginBottom: 8,
                                marginLeft: 8,
                                paddingLeft: 6,
                                paddingRight: 6,
                                width: 88,
                              },
                              dimensions.width
                            )}
                          >
                            {/* Text_03 */}
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: palettes.App['Custom #ffffff'],
                                  fontFamily: 'System',
                                  fontSize: 12,
                                  fontWeight: '400',
                                },
                                dimensions.width
                              )}
                            >
                              {'Lorem ipsum dolor sit amet'}
                            </Text>
                            {/* Image_03 */}
                            <ExpoImage
                              allowDownscaling={true}
                              cachePolicy={'disk'}
                              contentPosition={'center'}
                              resizeMode={'cover'}
                              transitionDuration={300}
                              transitionEffect={'cross-dissolve'}
                              transitionTiming={'ease-in-out'}
                              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                .props}
                              source={imageSource(Images['icvoicevolumeno'])}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                    .style,
                                  { height: 18, width: 18 }
                                ),
                                dimensions.width
                              )}
                            />
                          </View>
                        </View>
                      )}
                    </>
                    {/* live04 */}
                    <>
                      {!(
                        !listData?.isHomeScreen &&
                        listData?.uisList?.length >= 4
                      ) ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1, justifyContent: 'flex-end' },
                            dimensions.width
                          )}
                        >
                          {/* fourth_view */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                bottom: 0,
                                left: 0,
                                position: 'absolute',
                                right: 0,
                                top: 0,
                              },
                              dimensions.width
                            )}
                          />
                          {/* voice_01 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: 36,
                                flexDirection: 'row',
                                height: 26,
                                justifyContent: 'space-between',
                                marginBottom: 8,
                                marginLeft: 8,
                                paddingLeft: 6,
                                paddingRight: 6,
                                width: 88,
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
                                },
                                dimensions.width
                              )}
                            >
                              {'Lorem ipsum dolor sit amet'}
                            </Text>
                            <ExpoImage
                              allowDownscaling={true}
                              cachePolicy={'disk'}
                              contentPosition={'center'}
                              resizeMode={'cover'}
                              transitionDuration={300}
                              transitionEffect={'cross-dissolve'}
                              transitionTiming={'ease-in-out'}
                              {...GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                .props}
                              source={imageSource(Images['icvoicevolumeno'])}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ExpoImageStyles(theme)['SVG 2']
                                    .style,
                                  { height: 18, width: 18 }
                                ),
                                dimensions.width
                              )}
                            />
                          </View>
                        </View>
                      )}
                    </>
                  </View>
                )}
              </>
            </View>
          );
        }}
        snapToAlignment={'start'}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['Text Title'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.TextStyles(theme)['Text Title'].style,
            theme.typography.body1,
            {}
          ),
          dimensions.width
        )}
      >
        {t(Variables, undefined)}
      </Text>
    </View>
  );
};

export default withTheme(LivePagerItemBlock);
