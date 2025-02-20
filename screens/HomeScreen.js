import React from 'react';
import {
  ActionSheet,
  ActionSheetCancel,
  ActionSheetItem,
  Icon,
  IconButton,
  Link,
  ScreenContainer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import HotBlock from '../components/HotBlock';
import OpinionBlock from '../components/OpinionBlock';
import RecommendBlock from '../components/RecommendBlock';
import SpotlightBlock from '../components/SpotlightBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CTabView from '../custom-files/CTabView';
import * as DataContext from '../custom-files/DataContext';
import * as DrawerNav from '../custom-files/DrawerNav';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const HomeScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [actionId, setActionId] = React.useState(0);
  const [showAction, setShowAction] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textInputValue2, setTextInputValue2] = React.useState('');
  const [updateCount, setUpdateCount] = React.useState(0);
  const actionsheetFunc = feedsId => {
    setActionId(feedsId);
    setShowAction(true);
  };

  const getShown = () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    return activeViewShown;
  };

  const go = screen => {
    gotoScreen(screen);
  };

  const showSlideMenu = () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
    navigation.toggleDrawer?.();
  };
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

  const FirstLayer = React.useRef();
  const drawer = React.useRef();
  const updatePosition = React.useContext(
    DataContext.DataContext
  )?.updatePosition;
  const activeViewShown = React.useContext(
    DataContext.DataContext
  )?.activeViewShown;
  const feedsId = React.useContext(DataContext.DataContext)?.feedsId;
  const gotoScreen = React.useContext(DataContext.DataContext)?.gotoScreen;
  const tabViewHeaders = [
    { key: 'recommend', title: 'home_recommend' },
    { key: 'hot', title: 'home_popular' },
    { key: 'spotlight', title: 'home_special' },
    { key: 'opinion', title: 'tab_circle' },
  ];

  const scene = {
    recommend: RecommendBlock,
    hot: HotBlock,
    spotlight: SpotlightBlock,
    opinion: OpinionBlock,
  };
  // navigation.getParent().getState().routes[0].name="ssssss"
  // navigation.getParent().getState().routeNames.name="ssssss"

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasBottomSafeArea={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.Brand.appStyle_background,
          position: 'relative',
        },
        dimensions.width
      )}
    >
      {/* Main Content */}
      <View
        {...GlobalStyles.ViewStyles(theme)['Main Content 3'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.ViewStyles(theme)['Main Content 3'].style,
          dimensions.width
        )}
      >
        {/* 顶部搜索框 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 16,
              paddingRight: 16,
            },
            dimensions.width
          )}
        >
          <IconButton
            onPress={() => {
              try {
                go('Calendar');
              } catch (err) {
                console.error(err);
              }
            }}
            color={palettes.Brand.appStyle_primary}
            icon={'MaterialCommunityIcons/calendar-month-outline'}
            size={24}
            style={StyleSheet.applyWidth({ marginRight: 8 }, dimensions.width)}
          />
          {/* Icon Button 2 */}
          <IconButton
            onPress={() => {
              try {
                go('MessageCenter');
              } catch (err) {
                console.error(err);
              }
            }}
            color={palettes.Brand.appStyle_primary}
            icon={'MaterialCommunityIcons/chat-alert-outline'}
            size={24}
          />
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderColor: 'rgb(157, 181, 243)',
                borderRadius: 30,
                borderWidth: 1.5,
                flex: 1,
                flexDirection: 'row',
                height: 35,
                marginLeft: 8,
                marginRight: 8,
                paddingLeft: 8,
                paddingRight: 8,
              },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  /* hidden 'Toggle Drawer' action */
                  go('SearchPage');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
            >
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'row' },
                  dimensions.width
                )}
              >
                <Icon
                  color={palettes.App['Custom Color 9']}
                  name={'EvilIcons/search'}
                  size={20}
                />
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text Title'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text Title'].style,
                      theme.typography.body1,
                      {
                        color: palettes.Gray[400],
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '400',
                        lineHeight: 20,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {t(Variables, 'events_search_default')}
                </Text>
              </View>
            </Touchable>
          </View>
          <Link
            accessible={true}
            onPress={() => {
              try {
                go('DailyUpdate');
              } catch (err) {
                console.error(err);
              }
            }}
            selectable={false}
            {...GlobalStyles.LinkStyles(theme)['Link'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.LinkStyles(theme)['Link'].style, {
                color: palettes.Brand.appStyle_primary,
                fontFamily: 'System',
                fontSize: 14,
                fontWeight: '600',
              }),
              dimensions.width
            )}
            title={`${t(Variables, 'today_update_count')}${updateCount}`}
          />
        </View>
        {/* 标签页切换组件 */}
        <View
          style={StyleSheet.applyWidth(
            { flex: 1, justifyContent: 'flex-start' },
            dimensions.width
          )}
        >
          <Utils.CustomCodeErrorBoundary>
            <CTabView.TabViewExample
              color={['#2b33e6', '#748593']}
              fontSize={16}
              iconIndex={1}
              showFilter={true}
              padding={16}
              filterFunc={showSlideMenu}
              actionFunc={actionsheetFunc}
              gotoScreen={gotoScreen}
              scene={scene}
              headers={tabViewHeaders}
              updatePosition={updatePosition}
            ></CTabView.TabViewExample>
          </Utils.CustomCodeErrorBoundary>
        </View>
      </View>

      <ActionSheet visible={getShown()}>
        <ActionSheetItem
          color={theme.colors.text.strong}
          {...GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
            .props}
          label={t(Variables, 'home_care_industry')}
          style={StyleSheet.applyWidth(
            GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
              .style,
            dimensions.width
          )}
        />
        {/* Action Sheet Item 2 */}
        <ActionSheetItem
          color={theme.colors.text.strong}
          {...GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
            .props}
          label={t(Variables, 'home_care_stock')}
          style={StyleSheet.applyWidth(
            GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
              .style,
            dimensions.width
          )}
        />
        {/* Action Sheet Item 3 */}
        <ActionSheetItem
          color={theme.colors.text.strong}
          {...GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
            .props}
          label={t(Variables, 'home_care_content')}
          style={StyleSheet.applyWidth(
            GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
              .style,
            dimensions.width
          )}
        />
        <ActionSheetCancel label={'Cancel'} />
      </ActionSheet>
    </ScreenContainer>
  );
};

export default withTheme(HomeScreen);
