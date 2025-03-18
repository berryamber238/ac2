import React from 'react';
import { Button, ScreenContainer, Touchable, withTheme } from '@draftbit/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import * as reactNativeToastMessage from 'react-native-toast-message';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as DrawerNav from '../custom-files/DrawerNav';
import * as HttpClient from '../custom-files/HttpClient';
import * as Toast from '../custom-files/Toast';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const DrawerNavScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const gotoScreen = (screen, id) => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    ///sdfsdf
    switch (screen) {
      case 'LoginScreen':
        navigation.navigate('BottomTabNavigator', {
          screen: 'Tickets',
          params: { screen: 'LoginScreen' },
        });
        break;
      case 'Article':
      case 'Minute':
        navigation.push('ArticleDetailScreen', { article_info_id: id });
        break;
      case 'Event':
        navigation.push('EventDetailScreen', { event_id: id });
        break;
      case 'Spotlight':
        navigation.push('SpotlightDetailScreen', { spotlightId: id });
        break;
      case 'Opinion':
        navigation.push('OpinionInfoScreen', { id: id });
        break;
      case 'SearchPage':
        navigation.push('SearchPageScreen', {});
        break;
      case 'Calendar':
        navigation.push('CalendarScreen', {});
        break;
      case 'MessageCenter':
        navigation.push('MessageCenterScreen', {});
        break;
      case 'DailyUpdate':
        navigation.push('DailyUpdateScreen', {});
        break;
    }
  };

  const show = () => {
    reactNativeToastMessage.default.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };
  React.useEffect(() => {
    console.log('=============');
    console.log(Variables.customer_info);
  }, [Variables.customer_info]);
  React.useEffect(() => {
    const getUserInfo = async () => {
      const url = HttpClient.apiEndpoints['me_info'];
      const response = await HttpClient.fetcher(url.url, url.method);
      const responseCookies = await AsyncStorage.getItem('cookies');
      const responseStr = await response.json();
      console.log(responseStr);
      if (response.ok && response.data) {
        setGlobalVariableValue({ key: 'user_info', value: responseStr.data });
        setGlobalVariableValue({ key: 'cookie', value: responseCookies });
        setGlobalVariableValue({ key: 'is_login', value: true });
        setGlobalVariableValue({
          key: 'is_vip',
          value: responseStr.data.has_vip,
        });
      } else {
        setGlobalVariableValue({ key: 'is_login', value: false });
        setGlobalVariableValue({ key: 'is_vip', value: false });
      }
    };

    getUserInfo();
  }, []);
  React.useEffect(() => {
    const handler = async () => {
      try {
        const result = (await AceCampTestApi.dimensionsGET(Constants))?.json;
        setGlobalVariableValue({
          key: 'ace_dic',
          value: result,
        });
        const customer_info_data = (
          await AceCampTestApi.customerServiceGET(Constants, {
            Wechat_Appid: Constants['wechat_app_id'],
            Wechat_Code: Constants['wechat_app_code'],
          })
        )?.json;
        setGlobalVariableValue({
          key: 'customer_info',
          value:
            customer_info_data?.data?.length > 0
              ? customer_info_data?.data
              : [
                  {
                    name: 'Lu Yu',
                    email: 'luyu@acecamptech.com',
                    avatar:
                      'https://wework.qpic.cn/wwpic3az/654320_Q8xGVqwjTXqivOC_1727064850/0',
                    phone_number: '+8613261690696',
                    customer_service_url:
                      'https://work.weixin.qq.com/kfid/kfc4932588fb2a00cf5',
                  },
                ],
        });
        const my_info = (await AceCampTestApi.myInfoGET(Constants))?.json;
        if (my_info?.data) {
          setGlobalVariableValue({
            key: 'user_info',
            value: my_info?.data,
          });
          setGlobalVariableValue({
            key: 'is_login',
            value: true,
          });
          setGlobalVariableValue({
            key: 'is_vip',
            value: true,
          });
        } else {
          setGlobalVariableValue({
            key: 'is_login',
            value: false,
          });
        }

        /* hidden 'Log to Console' action */
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, []);
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
      <Utils.CustomCodeErrorBoundary>
        <>
          <DrawerNav.CustomDrawer
            gotoScreen={gotoScreen}
          ></DrawerNav.CustomDrawer>
        </>
      </Utils.CustomCodeErrorBoundary>
      {/* Fetch component: no endpoint configured */ null}
    </ScreenContainer>
  );
};

export default withTheme(DrawerNavScreen);
