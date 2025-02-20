import React from 'react';
import { Icon, ScreenContainer, Touchable, withTheme } from '@draftbit/ui';
import * as WebBrowser from 'expo-web-browser';
import { Image, Modal, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const MineSettingsScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const [numberInputFour, setNumberInputFour] = React.useState('');
  const [numberInputOne, setNumberInputOne] = React.useState('');
  const [numberInputThree, setNumberInputThree] = React.useState('');
  const [numberInputTwo, setNumberInputTwo] = React.useState('');
  const [ticket_success_modal, setTicket_success_modal] = React.useState(false);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.Brand.appStyle_background },
        dimensions.width
      )}
    >
      {/* Modals View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            position: 'absolute',
          },
          dimensions.width
        )}
      >
        {/* Successful Modal */}
        <>
          {!ticket_success_modal ? null : (
            <Modal
              animationType={'none'}
              supportedOrientations={['portrait', 'landscape']}
              transparent={false}
              presentationStyle={'fullScreen'}
            >
              {/* Modal Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: palettes.App.appStyle_modal,
                    height: '100%',
                    justifyContent: 'center',
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* Success View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: palettes.App.appStyle_white,
                      borderRadius: 52,
                      justifyContent: 'center',
                      paddingBottom: 32,
                      paddingLeft: 32,
                      paddingRight: 32,
                      paddingTop: 40,
                      width: 340,
                    },
                    dimensions.width
                  )}
                >
                  <Image
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    resizeMode={'contain'}
                    source={imageSource(Images['Success'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        { height: 180, marginBottom: 32, width: 180 }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* Success Text View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', marginBottom: 32, width: '100%' },
                      dimensions.width
                    )}
                  >
                    {/* Title Text */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['H4'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['H4'].style,
                          {
                            color: palettes.Brand.appStyle_primary,
                            marginBottom: 16,
                            textAlign: 'auto',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Congratulations!'}
                    </Text>
                    {/* Paragraph Text */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Body L Regular']
                        .props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Body L Regular']
                            .style,
                          {
                            color: palettes.Brand.appStyle_greyscale_900,
                            textAlign: 'center',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {
                        'You have successfully placed an order for National Music Festival. Enjoy the event!'
                      }
                    </Text>
                  </View>
                  {/* Buttons View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { width: '100%' },
                      dimensions.width
                    )}
                  >
                    {/* View Ticket Button */}
                    <View
                      {...GlobalStyles.ViewStyles(theme)[
                        'Light Purple Button 2'
                      ].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ViewStyles(theme)[
                            'Light Purple Button 2'
                          ].style,
                          {
                            backgroundColor: palettes.Brand.appStyle_primary,
                            marginBottom: 12,
                            overflow: 'hidden',
                            position: 'relative',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {/* View Ticket Touchable */}
                      <Touchable
                        onPress={() => {
                          try {
                            navigation.navigate('Mine');
                            setTicket_success_modal(false);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        style={StyleSheet.applyWidth(
                          { height: '100%', width: '100%' },
                          dimensions.width
                        )}
                      >
                        {/* Content View */}
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
                          {/* Button Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Body L Bold']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Body L Bold']
                                  .style,
                                {
                                  color: palettes.App.appStyle_white,
                                  paddingBottom: 18,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 18,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'View E-Ticket'}
                          </Text>
                        </View>
                      </Touchable>
                    </View>
                    {/* Cancel Button */}
                    <View
                      {...GlobalStyles.ViewStyles(theme)[
                        'Light Purple Button 2'
                      ].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ViewStyles(theme)[
                            'Light Purple Button 2'
                          ].style,
                          {
                            backgroundColor: palettes.App.appStyle_primary_100,
                            overflow: 'hidden',
                            position: 'relative',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {/* Cancel Touchable */}
                      <Touchable
                        onPress={() => {
                          try {
                            setTicket_success_modal(false);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        style={StyleSheet.applyWidth(
                          { height: '100%', width: '100%' },
                          dimensions.width
                        )}
                      >
                        {/* Content View */}
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
                          {/* Button Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Body L Bold']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Body L Bold']
                                  .style,
                                {
                                  color: palettes.Brand.appStyle_primary,
                                  paddingBottom: 18,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 18,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Cancel'}
                          </Text>
                        </View>
                      </Touchable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </>
      </View>
      {/* Main Content */}
      <View
        style={StyleSheet.applyWidth(
          {
            flex: 1,
            marginBottom: 120,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 16,
          },
          dimensions.width
        )}
      >
        {/* Page Top */}
        <View
          {...GlobalStyles.ViewStyles(theme)['Page Top 6'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ViewStyles(theme)['Page Top 6'].style,
              { marginBottom: 24 }
            ),
            dimensions.width
          )}
        >
          {/* Back Icon View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: 28,
                justifyContent: 'center',
                marginRight: 16,
                width: 28,
              },
              dimensions.width
            )}
          >
            {/* Back Button Touchable */}
            <Touchable
              onPress={() => {
                try {
                  navigation.goBack();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* Back Icon */}
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(Images['ArrowLeft'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: 20, width: 20 }
                  ),
                  dimensions.width
                )}
              />
            </Touchable>
          </View>
          {/* Screen Title */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['H4'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['H4'].style, {
                flex: 1,
                marginRight: 16,
              }),
              dimensions.width
            )}
          >
            {'通用设置'}
          </Text>
        </View>
        {/* Pin Section */}
        <View
          style={StyleSheet.applyWidth(
            { alignSelf: 'auto', flex: 1, gap: 30 },
            dimensions.width
          )}
        >
          <Touchable>
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
                {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                    { fontSize: 16 }
                  ),
                  dimensions.width
                )}
              >
                {'账户安全'}
              </Text>
              <Icon
                color={palettes.Brand.appStyle_greyscale_400}
                name={'Entypo/chevron-thin-right'}
                size={20}
              />
            </View>
          </Touchable>
          {/* Touchable 2 */}
          <Touchable>
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
                {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                    { fontSize: 16 }
                  ),
                  dimensions.width
                )}
              >
                {'语言'}
              </Text>
              <Icon
                color={palettes.Brand.appStyle_greyscale_400}
                name={'Entypo/chevron-thin-right'}
                size={20}
              />
            </View>
          </Touchable>
          {/* Touchable 3 */}
          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  await WebBrowser.openBrowserAsync('https://www.google.com');
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
                  justifyContent: 'space-between',
                },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                    { fontSize: 16 }
                  ),
                  dimensions.width
                )}
              >
                {'服务协议'}
              </Text>
              <Icon
                color={palettes.Brand.appStyle_greyscale_400}
                name={'Entypo/chevron-thin-right'}
                size={20}
              />
            </View>
          </Touchable>
          {/* Touchable 4 */}
          <Touchable>
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
                {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                    { fontSize: 16 }
                  ),
                  dimensions.width
                )}
              >
                {'隐私政策'}
              </Text>
              <Icon
                color={palettes.Brand.appStyle_greyscale_400}
                name={'Entypo/chevron-thin-right'}
                size={20}
              />
            </View>
          </Touchable>
          {/* Touchable 5 */}
          <Touchable>
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
                {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                    { fontSize: 16 }
                  ),
                  dimensions.width
                )}
              >
                {'清除缓存'}
              </Text>
              <Icon
                color={palettes.Brand.appStyle_greyscale_400}
                name={'Entypo/chevron-thin-right'}
                size={20}
              />
            </View>
          </Touchable>
          {/* Touchable 6 */}
          <Touchable>
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
                {...GlobalStyles.TextStyles(theme)['Body XL Semibold'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Body XL Semibold'].style,
                    { fontSize: 16 }
                  ),
                  dimensions.width
                )}
              >
                {'关于我们'}
              </Text>
              <Icon
                color={palettes.Brand.appStyle_greyscale_400}
                name={'Entypo/chevron-thin-right'}
                size={20}
              />
            </View>
          </Touchable>
        </View>
      </View>
      {/* Continue Button */}
      <View
        {...GlobalStyles.ViewStyles(theme)['Bottom Button'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.ViewStyles(theme)['Bottom Button'].style,
          dimensions.width
        )}
      >
        {/* Button Touchable */}
        <Touchable
          onPress={() => {
            try {
              setTicket_success_modal(true);
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
        >
          {/* Button View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: palettes.Red[500],
                borderWidth: 1,
                height: 50,
                justifyContent: 'center',
                paddingLeft: 18,
                paddingRight: 18,
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Button Text */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Body L Bold'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Body L Bold'].style,
                  { color: palettes.Red[600] }
                ),
                dimensions.width
              )}
            >
              {'退出登录'}
            </Text>
          </View>
        </Touchable>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(MineSettingsScreen);
