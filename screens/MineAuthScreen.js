import React from 'react';
import {
  ExpoImage,
  IconButton,
  ScreenContainer,
  SimpleStyleScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as Toast from '../custom-files/Toast';
import ShowToast from '../global-functions/ShowToast';
import t from '../global-functions/t';
import uploadImage from '../global-functions/uploadImage';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openImagePickerUtil from '../utils/openImagePicker';
import useWindowDimensions from '../utils/useWindowDimensions';

const MineAuthScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [company, setCompany] = React.useState('');
  const [company_err, setCompany_err] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [email_err, setEmail_err] = React.useState(false);
  const [file_data, setFile_data] = React.useState('');
  const [file_url, setFile_url] = React.useState('');
  const [name, setName] = React.useState('');
  const [name_err, setName_err] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const safeAreaInsets = useSafeAreaInsets();
  const aceCampTestGoAuthPOST = AceCampTestApi.useGoAuthPOST();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    const entry = StatusBar.pushStackEntry?.({ barStyle: 'dark-content' });
    return () => StatusBar.popStackEntry?.(entry);
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      {/* 主题栏 */}
      <View>
        {/* 标题 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              height: 45,
              justifyContent: 'space-between',
              marginTop: safeAreaInsets.top,
              paddingBottom: 5,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 5,
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
            color={palettes.App.appStyle_black}
            icon={'AntDesign/left'}
            size={24}
            style={StyleSheet.applyWidth(
              { left: 16, position: 'absolute', top: 11 },
              dimensions.width
            )}
          />
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                paddingLeft: 4,
                paddingRight: 4,
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Title */}
            <Text
              accessible={true}
              selectable={false}
              adjustsFontSizeToFit={true}
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={StyleSheet.applyWidth(
                {
                  alignSelf: 'flex-start',
                  color: palettes.App.appStyle_black,
                  flexShrink: 1,
                  fontFamily: 'System',
                  fontSize: 18,
                  fontWeight: '600',
                  letterSpacing: 0.2,
                  lineHeight: 22,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {t(Variables, 'mine_identity_auth')}
            </Text>
          </View>
        </View>
      </View>

      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        style={StyleSheet.applyWidth(
          { height: '100%', paddingLeft: 28, paddingRight: 28, width: '100%' },
          dimensions.width
        )}
      >
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: palettes.App.appStyle_black,
              fontFamily: 'System',
              fontSize: 14,
              fontWeight: '400',
              letterSpacing: 0.2,
              lineHeight: 16,
              marginTop: 24,
            },
            dimensions.width
          )}
        >
          {t(Variables, 'register_select_info')}
        </Text>

        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color 89'],
              borderRadius: 8,
              height: 238,
              marginTop: 14,
              padding: 16,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth({ marginTop: 6 }, dimensions.width)}
          >
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color 2'],
                  fontFamily: 'System',
                  fontSize: 13,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 15,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'register_business_card')}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  { color: palettes.Brand.appStyle_primary },
                  dimensions.width
                )}
              >
                {t(Variables, 'register_recommend')}
              </Text>
              {/* Text 2 */}
              <Text accessible={true} selectable={false}>
                {t(Variables, 'register_more_equity')}
              </Text>
            </Text>
          </View>

          <Touchable
            onPress={() => {
              const handler = async () => {
                try {
                  const file_info = await openImagePickerUtil({
                    mediaTypes: 'Images',
                    allowsEditing: false,
                    quality: 0.5,
                    allowsMultipleSelection: false,
                    selectionLimit: 0,
                    outputBase64: true,
                  });

                  const url = await uploadImage(file_info, 'business_card');
                  if (url) {
                    ShowToast(
                      t(Variables, 'toast_operated_successfully'),
                      'bottom',
                      undefined
                    );
                    setFile_data(file_info);
                    setFile_url(url);
                  } else {
                    ShowToast(
                      t(Variables, 'common_network_error'),
                      'bottom',
                      'error'
                    );
                  }
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
          >
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: 'rgba(43, 51, 230, 0.1)',
                  borderColor: palettes.Brand.appStyle_primary,
                  borderRadius: 8,
                  borderStyle: 'dashed',
                  height: 168,
                  justifyContent: 'center',
                  marginTop: 14,
                  padding: 8,
                },
                dimensions.width
              )}
            >
              {/* img_card */}
              <>
                {!file_url ? null : (
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={'disk'}
                    contentPosition={'center'}
                    transitionDuration={300}
                    transitionEffect={'cross-dissolve'}
                    transitionTiming={'ease-in-out'}
                    {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                    resizeMode={'contain'}
                    source={imageSource(file_data)}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                        { height: '100%', width: '100%' }
                      ),
                      dimensions.width
                    )}
                  />
                )}
              </>
              {/* img_add_card */}
              <>
                {file_url ? null : (
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={'disk'}
                    contentPosition={'center'}
                    transitionDuration={300}
                    transitionEffect={'cross-dissolve'}
                    transitionTiming={'ease-in-out'}
                    {...GlobalStyles.ExpoImageStyles(theme)['SVG 2'].props}
                    resizeMode={'center'}
                    source={imageSource(Images['icaddblue'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)['SVG 2'].style,
                        { height: 20, width: 20 }
                      ),
                      dimensions.width
                    )}
                  />
                )}
              </>
            </View>
          </Touchable>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color 89'],
              borderRadius: 8,
              marginTop: 14,
              padding: 16,
            },
            dimensions.width
          )}
        >
          <View>
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color 2'],
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 16,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'common_name')}
            </Text>

            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App['Custom #ffffff'],
                  borderColor: [
                    {
                      minWidth: Breakpoints.Mobile,
                      value: palettes.App['Custom Color 6'],
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value: name_err ? '#ff4b4b' : undefined,
                    },
                  ],
                  borderRadius: 4,
                  borderWidth: 1,
                  height: 45,
                  justifyContent: 'center',
                  marginTop: 8,
                },
                dimensions.width
              )}
            >
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setName(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                numberOfLines={1}
                placeholder={t(
                  Variables,
                  'register_enter_your_name'
                ).toString()}
                placeholderTextColor={palettes.App['Custom Color 4']}
                style={StyleSheet.applyWidth(
                  {
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 16,
                    marginLeft: 10,
                  },
                  dimensions.width
                )}
                value={name}
              />
            </View>
            {/* Text 2 */}
            <>
              {!name_err ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color 59'],
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 14,
                      paddingTop: 4,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'warning_name_required')}
                </Text>
              )}
            </>
          </View>
          {/* View 2 */}
          <View>
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color 2'],
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 16,
                  marginTop: 24,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'register_work_email')}
            </Text>

            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App['Custom #ffffff'],
                  borderColor: palettes.App['Custom Color 6'],
                  borderRadius: 4,
                  borderWidth: 1,
                  height: 45,
                  justifyContent: 'center',
                  marginTop: 8,
                },
                dimensions.width
              )}
            >
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setEmail(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                numberOfLines={1}
                placeholder={t(
                  Variables,
                  'register_enter_your_work_email'
                ).toString()}
                placeholderTextColor={palettes.App['Custom Color 4']}
                style={StyleSheet.applyWidth(
                  {
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 16,
                    marginLeft: 10,
                  },
                  dimensions.width
                )}
                value={email}
              />
            </View>
            {/* Text 2 */}
            <>
              {!email_err ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color 59'],
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 14,
                      paddingTop: 4,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'warning_work_email_required')}
                </Text>
              )}
            </>
          </View>
          {/* View 3 */}
          <View>
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color 2'],
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                  letterSpacing: 0.2,
                  lineHeight: 16,
                  marginTop: 24,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'register_company_name')}
            </Text>

            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App['Custom #ffffff'],
                  borderColor: palettes.App['Custom Color 6'],
                  borderRadius: 4,
                  borderWidth: 1,
                  height: 45,
                  justifyContent: 'center',
                  marginTop: 8,
                },
                dimensions.width
              )}
            >
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setCompany(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                numberOfLines={1}
                placeholder={t(
                  Variables,
                  'register_enter_your_company_name'
                ).toString()}
                placeholderTextColor={palettes.App['Custom Color 4']}
                style={StyleSheet.applyWidth(
                  {
                    fontFamily: 'System',
                    fontSize: 14,
                    fontWeight: '400',
                    letterSpacing: 0.2,
                    lineHeight: 16,
                    marginLeft: 10,
                  },
                  dimensions.width
                )}
                value={company}
              />
            </View>
            {/* Text 2 */}
            <>
              {!company_err ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color 59'],
                      fontFamily: 'System',
                      fontSize: 12,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 14,
                      paddingTop: 4,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'warning_company_name_required')}
                </Text>
              )}
            </>
          </View>
        </View>

        <Touchable
          onPress={() => {
            const handler = async () => {
              try {
                let can_submit = true;
                if (!name) {
                  setName_err(true);
                  can_submit = false;
                } else {
                  setName_err(false);
                }

                if (!email) {
                  setEmail_err(true);
                  can_submit = false;
                } else {
                  setEmail_err(false);
                }

                if (!company) {
                  setCompany_err(true);
                  can_submit = false;
                } else {
                  setCompany_err(false);
                }

                if (!can_submit) {
                  return;
                }
                const result = (
                  await aceCampTestGoAuthPOST.mutateAsync({
                    business_card: file_url,
                    company_name: company,
                    name: name,
                    work_email: email,
                  })
                )?.json;
                if (result?.code === 200) {
                  ShowToast(
                    t(Variables, 'toast_submitted_successfully'),
                    'bottom',
                    undefined
                  );
                } else {
                }
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
        >
          {/* View 3 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.Brand.appStyle_primary,
                borderRadius: 4,
                height: 45,
                justifyContent: 'center',
                marginTop: 24,
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
                  fontSize: 14,
                  fontWeight: '700',
                  letterSpacing: 0.2,
                  lineHeight: 16,
                },
                dimensions.width
              )}
            >
              {t(Variables, 'common_submit')}
            </Text>
          </View>
        </Touchable>
      </SimpleStyleScrollView>
      <Utils.CustomCodeErrorBoundary>
        <Toast.ele />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(MineAuthScreen);
