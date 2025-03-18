import React from 'react';
import {
  IconButton,
  ScreenContainer,
  SimpleStyleScrollView,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as ConfirmDialog from '../custom-files/ConfirmDialog';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const AccountCancellationScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [tip_modal_visiable, setTip_modal_visiable] = React.useState(false);
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
              {t(Variables, 'setting_apply_account_cancellation')}
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
      >
        <View style={StyleSheet.applyWidth({ padding: 16 }, dimensions.width)}>
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['15 Regular'].style,
                { fontFamily: 'System', fontWeight: '600' }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'setting_account_cancellation_start')}
          </Text>
          {/* Text 2 */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                fontFamily: 'System',
                fontSize: 22,
                fontWeight: '700',
                lineHeight: 24,
                marginBottom: 16,
                marginTop: 16,
              },
              dimensions.width
            )}
          >
            {t(Variables, 'setting_notes_to_users')}
          </Text>
          {/* Text 3 */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['15 Regular'].style,
                theme.typography.body1,
                { fontFamily: 'System', fontWeight: '600', lineHeight: 30 }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'setting_notes_to_users_one')}
          </Text>
          {/* Text 4 */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['15 Regular'].style,
                theme.typography.body1,
                {
                  fontFamily: 'System',
                  fontWeight: '600',
                  lineHeight: 30,
                  marginTop: 24,
                }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'setting_notes_to_users_two')}
          </Text>
          {/* Text 5 */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['15 Regular'].style,
                theme.typography.body1,
                {
                  fontFamily: 'System',
                  fontWeight: '600',
                  lineHeight: 30,
                  marginTop: 24,
                }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'setting_notes_to_users_three')}
          </Text>
          {/* Text 6 */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['15 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['15 Regular'].style,
                theme.typography.body1,
                {
                  fontFamily: 'System',
                  fontWeight: '600',
                  lineHeight: 30,
                  marginTop: 24,
                }
              ),
              dimensions.width
            )}
          >
            {t(Variables, 'setting_notes_to_users_four')}
          </Text>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingLeft: 16,
              paddingRight: 16,
            },
            dimensions.width
          )}
        >
          <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
            <Touchable
              onPress={() => {
                try {
                  if (Constants['user_info']?.organization_user?.is_owner) {
                    setTip_modal_visiable(true);
                  } else {
                    navigation.push('AccountCancellationCheckScreen');
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* View 3 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: palettes.App['Custom Color 14'],
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
                      color: palettes.App.appStyle_black,
                      fontFamily: 'System',
                      fontSize: 14,
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 16,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'setting_apply_account')}
                </Text>
              </View>
            </Touchable>
          </View>
          {/* View 2 */}
          <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
            {/* Touchable 2 */}
            <Touchable
              onPress={() => {
                try {
                  navigation.goBack();
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { marginLeft: 10 },
                dimensions.width
              )}
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
                      fontWeight: '400',
                      letterSpacing: 0.2,
                      lineHeight: 16,
                    },
                    dimensions.width
                  )}
                >
                  {t(Variables, 'setting_think_more')}
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
      </SimpleStyleScrollView>
      {/* 删除提示框 */}
      <Utils.CustomCodeErrorBoundary>
        <ConfirmDialog.ConfirmDialog
          title={t(Variables, 'common_tips')}
          message={t(Variables, 'setting_manage_account')}
          confirmBtn={t(Variables, 'common_ok_more')}
          onConfirm={() => {
            setTip_modal_visiable(false);
          }}
          visible={tip_modal_visiable}
        />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(AccountCancellationScreen);
