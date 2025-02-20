import React from 'react';
import { ScreenContainer, WebView, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import HeaderBlock from '../components/HeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CWebView from '../custom-files/CWebView';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  url: 'https://terms.acecamptech.com/privacy/20210726/index.html',
};

const WebViewScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [title, setTitle] = React.useState('');
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */ const handleMessage =
    event => {
      const { data } = event.nativeEvent;
      console.log(data);
    };
  console.log(props.route?.params?.url);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }

      const entry = StatusBar.pushStackEntry?.({ barStyle: 'light-content' });
      return () => StatusBar.popStackEntry?.(entry);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <HeaderBlock title={title} />
      <Utils.CustomCodeErrorBoundary>
        <CWebView.New url={props.route?.params?.url} setTitle={setTitle} />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(WebViewScreen);
