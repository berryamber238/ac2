import React from 'react';
import {
  Button,
  DatePicker,
  Icon,
  TextField,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { close: () => {}, show: () => {} };

const AITaskTelBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [areaCodeId, setAreaCodeId] = React.useState(100);
  const [areaCodeValue, setAreaCodeValue] = React.useState(86);
  const [area_code, setArea_code] = React.useState('');
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [focus, setFocus] = React.useState(0);
  const [password, setPassword] = React.useState('');
  const [phoneInputValue, setPhoneInputValue] = React.useState('');
  const [schedule_time, setSchedule_time] = React.useState(new Date());
  const [styledTextFieldValue, setStyledTextFieldValue] = React.useState('');
  const [tel, setTel] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [userError, setUserError] = React.useState(false);
  const [vCodeStatus, setVCodeStatus] = React.useState('');
  const selectedAreaCodeCallback = (id, code) => {
    setAreaCodeValue(code);
    setAreaCodeId(id);
    props.show?.();
  };
  const aceCampTestAiSchedulersPOST = AceCampTestApi.useAiSchedulersPOST();
  React.useEffect(() => {
    try {
      props.show?.();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App['Custom #ffffff'],
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          padding: 16,
          width: '90%',
        },
        dimensions.width
      )}
    >
      <View>
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text Title'].props}
          style={StyleSheet.applyWidth(
            GlobalStyles.TextStyles(theme)['Text Title'].style,
            dimensions.width
          )}
        >
          {'电话会议录制'}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text Title'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text Title'].style,
                {
                  color: 'rgb(151, 151, 151)',
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                }
              ),
              dimensions.width
            )}
          >
            {'(暂不支持白名单会议)'}
          </Text>
        </Text>
      </View>
      {/* View 2 */}
      <View style={StyleSheet.applyWidth({ marginTop: 20 }, dimensions.width)}>
        <View>
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['13 Regular'].style,
                { color: palettes.App['Custom Color 59'] }
              ),
              dimensions.width
            )}
          >
            {'* '}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['13 Regular'].style,
                dimensions.width
              )}
            >
              {'会议名称'}
            </Text>
          </Text>
          <TextField
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newStyledTextFieldValue => {
              try {
                setTitle(newStyledTextFieldValue);
              } catch (err) {
                console.error(err);
              }
            }}
            type={'solid'}
            underlineColor={theme.colors.text.light}
            webShowOutline={true}
            {...GlobalStyles.TextFieldStyles(theme)['Styled Text Field'].props}
            activeBorderColor={palettes.Brand.appStyle_primary}
            placeholder={'请输入会议名称'}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextFieldStyles(theme)['Styled Text Field'].style,
                {
                  borderColor: 'rgb(226, 229, 231)',
                  borderRadius: 4,
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                  marginTop: 8,
                  paddingBottom: 8,
                  paddingTop: 8,
                }
              ),
              dimensions.width
            )}
            value={title}
          />
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['13 Regular'].style,
                { color: palettes.App['Custom Color 59'] }
              ),
              dimensions.width
            )}
          >
            {'* '}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['13 Regular'].style,
                dimensions.width
              )}
            >
              {'会议开始时间'}
            </Text>
          </Text>
          <DatePicker
            autoDismissKeyboard={true}
            disabled={false}
            label={'Date'}
            leftIconMode={'inset'}
            onDateChange={newDatePickerValue => {
              try {
                setSchedule_time(newDatePickerValue);
              } catch (err) {
                console.error(err);
              }
            }}
            type={'solid'}
            {...GlobalStyles.DatePickerStyles(theme)['Date Picker'].props}
            borderColorActive={palettes.Brand.appStyle_primary}
            date={schedule_time}
            format={'yyyy-mm-dd HH:MM'}
            hideLabel={true}
            inline={false}
            mode={'datetime'}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.DatePickerStyles(theme)['Date Picker'].style,
                {
                  backgroundColor: palettes.App['Custom #ffffff'],
                  borderColor: 'rgb(226, 229, 231)',
                  borderRadius: 4,
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                  marginTop: 8,
                  paddingBottom: 10,
                  paddingTop: 10,
                }
              ),
              dimensions.width
            )}
          />
        </View>
        {/* View 3 */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['13 Regular'].style,
                { color: palettes.App['Custom Color 59'] }
              ),
              dimensions.width
            )}
          >
            {'* '}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['13 Regular'].style,
                dimensions.width
              )}
            >
              {'会议拨入号'}
            </Text>
          </Text>
          {/* 手机号录入框 */}
          <View
            {...GlobalStyles.ViewStyles(theme)['Login Form Container'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ViewStyles(theme)['Login Form Container'].style,
                {
                  borderColor:
                    focus === 1
                      ? palettes.Brand.Primary
                      : userError
                      ? palettes.Brand.Error
                      : '#E2E5E7FF',
                  borderWidth: focus === 1 || userError ? 1 : 1,
                }
              ),
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.push('MineCountryCodeListScreen', {
                    id: areaCodeId,
                    callback: (id, code) => selectedAreaCodeCallback(id, code),
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text Form Label'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text Form Label'].style,
                    {
                      color: palettes.Brand.appStyle_primary,
                      fontFamily: 'Urbanist_400Regular',
                      fontSize: 14,
                      paddingRight: 2,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'+'}
                {areaCodeValue}
              </Text>
            </Touchable>
            <Icon
              color={palettes.Brand.Primary}
              name={'AntDesign/down'}
              size={14}
              style={StyleSheet.applyWidth(
                { marginRight: 4 },
                dimensions.width
              )}
            />
            {/* phone input */}
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onBlur={() => {
                try {
                  setFocus(0);
                } catch (err) {
                  console.error(err);
                }
              }}
              onChangeText={newPhoneInputValue => {
                try {
                  setPhoneInputValue(newPhoneInputValue);
                  if (newPhoneInputValue.trim()?.length > 4) {
                    setVCodeStatus('no');
                  } else {
                    setArea_code(newPhoneInputValue);
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              onFocus={() => {
                try {
                  setFocus(1);
                  setUserError(false);
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.TextInputStyles(theme)['Login Input'].props}
              keyboardType={'numeric'}
              maxLength={11}
              placeholder={'区号' ?? 'Email'}
              returnKeyType={'next'}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Login Input'].style,
                  {
                    borderColor: 'rgb(226, 229, 231)',
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    flex: null,
                    fontFamily: 'System',
                    fontWeight: '400',
                    width: 80,
                  }
                ),
                dimensions.width
              )}
              textContentType={'emailAddress'}
              value={area_code}
              webShowOutline={false}
            />
            {/* phone input 2 */}
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onBlur={() => {
                try {
                  setFocus(0);
                } catch (err) {
                  console.error(err);
                }
              }}
              onChangeText={newPhoneInput2Value => {
                try {
                  setPhoneInputValue(newPhoneInput2Value);
                  if (newPhoneInput2Value.trim()?.length > 4) {
                    setVCodeStatus('no');
                  } else {
                    setTel(newPhoneInput2Value);
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              onFocus={() => {
                try {
                  setFocus(1);
                  setUserError(false);
                } catch (err) {
                  console.error(err);
                }
              }}
              {...GlobalStyles.TextInputStyles(theme)['Login Input'].props}
              keyboardType={'numeric'}
              maxLength={11}
              placeholder={
                t(Variables, 'login_enter_your_phone').toString() ?? 'Email'
              }
              returnKeyType={'next'}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Login Input'].style,
                  { fontFamily: 'System', fontWeight: '400' }
                ),
                dimensions.width
              )}
              textContentType={'emailAddress'}
              value={tel}
              webShowOutline={false}
            />
          </View>
        </View>
        {/* View 4 */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['13 Regular'].style,
                { color: palettes.App['Custom Color 59'] }
              ),
              dimensions.width
            )}
          >
            {null}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['13 Regular'].props}
              style={StyleSheet.applyWidth(
                GlobalStyles.TextStyles(theme)['13 Regular'].style,
                dimensions.width
              )}
            >
              {'会议密码'}
            </Text>
          </Text>
          <TextField
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newStyledTextFieldValue => {
              try {
                setPassword(newStyledTextFieldValue);
              } catch (err) {
                console.error(err);
              }
            }}
            type={'solid'}
            underlineColor={theme.colors.text.light}
            webShowOutline={true}
            {...GlobalStyles.TextFieldStyles(theme)['Styled Text Field'].props}
            activeBorderColor={palettes.Brand.appStyle_primary}
            placeholder={
              '针对参会需要密码的会议，不填写密码将无法进入会议并录制'
            }
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextFieldStyles(theme)['Styled Text Field'].style,
                {
                  borderColor: 'rgb(226, 229, 231)',
                  borderRadius: 4,
                  fontFamily: 'System',
                  fontSize: 14,
                  fontWeight: '400',
                  marginTop: 8,
                  paddingBottom: 8,
                  paddingTop: 8,
                }
              ),
              dimensions.width
            )}
            value={password}
          />
        </View>
        <Button
          accessible={true}
          iconPosition={'left'}
          onPress={() => {
            const handler = async () => {
              try {
                (
                  await aceCampTestAiSchedulersPOST.mutateAsync({
                    area_code: area_code,
                    autocall: true,
                    country_code_id: areaCodeId,
                    password: password,
                    source_type: 'autocall',
                    tel: area_code + tel,
                    title: title,
                  })
                )?.json;
                props.close?.();
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
              theme.typography.button,
              {
                backgroundColor: palettes.Brand.appStyle_primary,
                borderRadius: 4,
                marginTop: 16,
              }
            ),
            dimensions.width
          )}
          title={'加入任务'}
        />
      </View>
    </View>
  );
};

export default withTheme(AITaskTelBlock);
