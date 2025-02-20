import React from 'react';
import {
  Icon,
  ScreenContainer,
  SimpleStyleMasonryFlashList,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Image, ImageBackground, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as GlobalStyles from '../GlobalStyles.js';
import TitleSectionBlock from '../components/TitleSectionBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import StringFormat from '../global-functions/StringFormat';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const VipInfoScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <ImageBackground
        {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].props}
        resizeMode={'stretch'}
        source={imageSource(Images['icmyvipbg'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].style,
            {
              height: dimensions.height,
              position: 'absolute',
              width: dimensions.width,
            }
          ),
          dimensions.width
        )}
      />
      <TitleSectionBlock title={'mine_my_vip'} />
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', flexDirection: 'row', margin: 24 },
          dimensions.width
        )}
      >
        <>
          {Constants['user_info']?.avatar ? null : (
            <Image
              resizeMode={'cover'}
              {...GlobalStyles.ImageStyles(theme)['Image'].props}
              source={imageSource(Images['icheadercompany'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ImageStyles(theme)['Image'].style,
                  {
                    borderColor: palettes.App['Custom Color 61'],
                    borderRadius: 18,
                    borderWidth: 2,
                    height: 34,
                    width: 34,
                  }
                ),
                dimensions.width
              )}
            />
          )}
        </>
        {/* Image 3 */}
        <>
          {!Constants['user_info']?.avatar ? null : (
            <Image
              resizeMode={'cover'}
              {...GlobalStyles.ImageStyles(theme)['Image'].props}
              source={imageSource(`${Constants['user_info']?.avatar}`)}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ImageStyles(theme)['Image'].style,
                  {
                    borderColor: palettes.App['Custom Color 61'],
                    borderRadius: 18,
                    borderWidth: 2,
                    height: 34,
                    width: 34,
                  }
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
              color: palettes.App['Custom #ffffff'],
              fontFamily: 'System',
              fontSize: 20,
              fontWeight: '600',
              letterSpacing: 0.2,
              lineHeight: 24,
              marginLeft: 15,
            },
            dimensions.width
          )}
        >
          {Constants['user_info']?.name}
        </Text>
        {/* Image 2 */}
        <Image
          resizeMode={'cover'}
          {...GlobalStyles.ImageStyles(theme)['Image'].props}
          source={imageSource(Images['icvip'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
              height: 20,
              marginLeft: 15,
              width: 20,
            }),
            dimensions.width
          )}
        />
      </View>
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            borderRadius: 12,
            height: 154,
            justifyContent: 'space-between',
            margin: 24,
            overflow: 'hidden',
            zIndex: 100,
          },
          dimensions.width
        )}
      >
        <ImageBackground
          resizeMode={'cover'}
          {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background']
            .props}
          source={imageSource(Images['icplanvipbg'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ImageBackgroundStyles(theme)['Image Background']
                .style,
              { height: 154, position: 'absolute', width: '100%' }
            ),
            dimensions.width
          )}
        />
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: [
                { minWidth: Breakpoints.Mobile, value: 'rgba(0, 0, 0, 0.4)' },
                {
                  minWidth: Breakpoints.Mobile,
                  value: Constants['user_info']?.vip_infos[0].available
                    ? '#00000066'
                    : '#A7A7A7AD',
                },
              ],
              borderBottomLeftRadius: 8,
              paddingBottom: 4,
              paddingLeft: 12,
              paddingRight: 10,
              paddingTop: 4,
              position: 'absolute',
              right: 0,
              top: 0,
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
                lineHeight: 16,
              },
              dimensions.width
            )}
          >
            {Constants['user_info']?.vip_infos[0].available
              ? t(Variables, 'mine_vip_in_use')
              : t(Variables, 'mine_not_use')}
          </Text>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            { marginLeft: 16, marginTop: 16 },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App['Custom Color 62'],
                fontFamily: 'System',
                fontSize: 20,
                fontWeight: '600',
                letterSpacing: 0.2,
                lineHeight: 22,
              },
              dimensions.width
            )}
          >
            {Constants['user_info']?.vip_infos[0].title}
          </Text>
          {/* Text 3 */}
          <>
            {!(
              Constants['user_info']?.vip_infos[0].card_type === 'ppv'
            ) ? null : (
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color 62'],
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                  },
                  dimensions.width
                )}
              >
                {StringFormat(
                  t(Variables, 'mine_delay_can_use'),
                  [].concat([Constants['user_info']?.vip_infos[0].card.delay])
                )}
              </Text>
            )}
          </>
          {/* Text 2 */}
          <>
            {!(
              Constants['user_info']?.vip_infos[0].card_type === 'ppv'
            ) ? null : (
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color 62'],
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                  },
                  dimensions.width
                )}
              >
                {StringFormat(
                  t(Variables, 'mine_balance_num'),
                  []
                    .concat([Constants['user_info']?.vip_infos[0].balance])
                    .concat([Constants['user_info']?.vip_infos[0].card.quota])
                )}
              </Text>
            )}
          </>
          <>
            {!(
              Constants['user_info']?.vip_infos[0].card_type === 'camp_vip'
            ) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                <Icon
                  color={palettes.Brand.appStyle_primary}
                  name={'Foundation/info'}
                  size={24}
                  style={StyleSheet.applyWidth(
                    { marginLeft: 16 },
                    dimensions.width
                  )}
                />
                {/* Text 4 */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.Brand.appStyle_primary,
                      fontFamily: 'System',
                      fontSize: 16,
                      fontWeight: '600',
                      letterSpacing: 0.2,
                      lineHeight: 20,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'vip_owner_title')}
                </Text>
              </View>
            )}
          </>
        </View>
        {/* View 3 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
              paddingLeft: 16,
              paddingRight: 16,
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App['Custom Color 62'],
                fontFamily: 'System',
                fontSize: 14,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 14,
              },
              dimensions.width
            )}
          >
            {Constants['user_info']?.vip_infos[0].available
              ? t(Variables, 'mine_can_use_time')
              : undefined}
            {fromUnixTimestamp(
              Variables,
              Constants['user_info']?.vip_infos[0].expire,
              'YYYY/MM/DD'
            )}
          </Text>

          <Touchable
            onPress={() => {
              try {
                navigation.push('WebViewScreen', {
                  url: Constants['base_url'] + '/vip_turn',
                });
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App['Custom Color 62'],
                  borderRadius: 16,
                  paddingBottom: 6,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 6,
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
                    fontSize: 16,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 20,
                  },
                  dimensions.width
                )}
              >
                {t(Variables, 'mine_renew_now')}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
      {/* View 3 */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: palettes.App['Custom #ffffff'],
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: 50,
            marginTop: -50,
            width: '100%',
          },
          dimensions.width
        )}
      />
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        style={StyleSheet.applyWidth(
          { backgroundColor: palettes.App['Custom #ffffff'], flex: 1 },
          dimensions.width
        )}
      >
        <SimpleStyleMasonryFlashList
          data={Constants['user_info']?.vip_infos[0].card.plan_info}
          estimatedItemSize={50}
          keyExtractor={(masonryListData, index) =>
            masonryListData?.id ??
            masonryListData?.uuid ??
            index?.toString() ??
            JSON.stringify(masonryListData)
          }
          listKey={'Scroll View->Masonry List'}
          onEndReachedThreshold={0.5}
          renderItem={({ item, index }) => {
            const masonryListData = item;
            return (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: [
                      {
                        minWidth: Breakpoints.Mobile,
                        value: palettes.App['Custom Color 63'],
                      },
                      {
                        minWidth: Breakpoints.Mobile,
                        value:
                          masonryListData?.price !== 'free'
                            ? '#f6f7f8'
                            : undefined,
                      },
                    ],
                    borderRadius: 8,
                    height: 140,
                    justifyContent: 'center',
                    marginBottom: 8,
                    marginLeft: 8,
                    marginRight: 8,
                    marginTop: 8,
                    paddingBottom: 16,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 16,
                  },
                  dimensions.width
                )}
              >
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(`${masonryListData?.icon}`)}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 32, width: 32 }
                    ),
                    dimensions.width
                  )}
                />
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.App['Custom Color 62'],
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value:
                            masonryListData?.price !== 'free'
                              ? '#a3a3a3'
                              : undefined,
                        },
                      ],
                      fontFamily: 'System',
                      fontSize: 13,
                      fontWeight: '400',
                      letterSpacing: 0.6,
                      lineHeight: 20,
                      marginTop: 8,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                >
                  {masonryListData?.title}
                </Text>
                {/* Text 2 */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: [
                        {
                          minWidth: Breakpoints.Mobile,
                          value: palettes.App['Custom Color 61'],
                        },
                        {
                          minWidth: Breakpoints.Mobile,
                          value:
                            masonryListData?.price !== 'free'
                              ? '#a3a3a3'
                              : undefined,
                        },
                      ],
                      fontFamily: 'System',
                      fontSize: 13,
                      fontWeight: '400',
                      letterSpacing: 0.6,
                      lineHeight: 20,
                      marginTop: 8,
                      textAlign: 'center',
                    },
                    dimensions.width
                  )}
                >
                  {masonryListData?.price === 'free'
                    ? masonryListData?.limit > 0
                      ? StringFormat(
                          t(Variables, 'mine_vip_time'),
                          [].concat([masonryListData?.limit])
                        )
                      : t(Variables, 'mine_vip_free')
                    : t(Variables, 'mine_vip_need_pay')}
                </Text>
              </View>
            );
          }}
          numColumns={3}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={StyleSheet.applyWidth(
            { paddingLeft: 16, paddingRight: 16 },
            dimensions.width
          )}
        />
      </SimpleStyleScrollView>

      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes.App['Custom #ffffff'],
            height: 60,
            paddingBottom: safeAreaInsets.bottom,
          },
          dimensions.width
        )}
      >
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color 7'],
              height: 1,
              width: '80%',
            },
            dimensions.width
          )}
        />
        <Touchable
          onPress={() => {
            try {
              navigation.push('WebViewScreen', {
                url: Constants['base_url'] + '/vip_turn',
              });
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
                marginBottom: 10,
                marginTop: 10,
              },
              dimensions.width
            )}
          >
            <Image
              resizeMode={'cover'}
              {...GlobalStyles.ImageStyles(theme)['Image'].props}
              source={imageSource(Images['icvipplan'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ImageStyles(theme)['Image'].style,
                  { height: 24, width: 24 }
                ),
                dimensions.width
              )}
            />
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color 2'],
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '600',
                  letterSpacing: 0.2,
                  lineHeight: 20,
                  marginLeft: 8,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'mine_vip_plan')}
            </Text>
          </View>
        </Touchable>
        {/* View 3 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color 7'],
              height: 1,
              width: '80%',
            },
            dimensions.width
          )}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(VipInfoScreen);
