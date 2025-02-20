import React from 'react';
import { Button, SimpleStyleScrollView, withTheme } from '@draftbit/ui';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as GlobalStyles from '../GlobalStyles.js';
import FilterSectionBlock from '../components/FilterSectionBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as DataContext from '../custom-files/DataContext';
import * as gf from '../custom-files/gf';
import DicValueToI18n from '../global-functions/DicValueToI18n';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  currentRoute: { icon: 'Entypo/home', name: 'RouteOne', label: 'Route 1' },
  routes: [
    { icon: 'Entypo/home', name: 'RouteOne', label: 'Route 1' },
    { icon: 'Entypo/home', name: 'RouteTwo', label: 'Route 2' },
    { icon: 'Entypo/home', name: 'RouteThree', label: 'Route 3' },
  ],
};

const FilterScreenBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [content_language_preference, setContent_language_preference] =
    React.useState(['zh-CN']);
  const [custom_sector_ids, setCustom_sector_ids] = React.useState([]);
  const [opinion_search, setOpinion_search] = React.useState(['all']);
  const [recommend_search, setRecommend_search] = React.useState([]);
  const [resetFuncList, setResetFuncList] = React.useState({});
  const [tabIndex, setTabIndex] = React.useState(0);
  const confirmBtnPress = navigation => {
    const confirmedFilterData = {};

    confirmedFilterData.content_language_preference =
      content_language_preference;

    confirmedFilterData.custom_sector_ids = custom_sector_ids;

    confirmedFilterData.recommend_search = recommend_search;

    confirmedFilterData.opinion_search = opinion_search;

    confirmFilter(confirmedFilterData);

    props.navigation.closeDrawer();
  };

  const generateData = Variables => {
    const result = {};

    result.name = gf.t(Variables, 'common_section');
    const lang = Variables['current_lang'];
    const dataList = Variables['ace_dic'].data.industries.map(item => {
      return {
        key: item.id,
        value: lang === 'CN' ? item.sc_name : item.en_name,
      };
    });

    result.items = dataList;
    return result;
  };

  const resetData = Variables => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules.

    /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */

    setContent_language_preference(
      Variables.current_lang === 'CN' ? ['zh-CN'] : ['en']
    );
    setCustom_sector_ids([]);
    setRecommend_search([]);
    try {
      resetFuncList.content_language_preference(
        Variables.current_lang === 'CN' ? ['zh-CN'] : ['en']
      );
    } catch (e) {}
    try {
      resetFuncList.custom_sector_ids([]);
    } catch (e) {}
    try {
      resetFuncList.recommend_search([]);
    } catch (e) {}

    try {
      resetFuncList.opinion_search(['all']);
    } catch (e) {}
  };

  const setResetCallback = (name, func) => {
    if (!resetFuncList[name]) {
      resetFuncList[name] = func;
    }
  };
  const sharedData = React.useContext(DataContext.DataContext)?.sharedData;
  const confirmFilter = React.useContext(
    DataContext.DataContext
  )?.confirmFilter;
  const currentPosition = React.useContext(
    DataContext.DataContext
  )?.currentPosition;

  React.useEffect(() => {
    if (currentPosition) {
      setTabIndex(currentPosition);
    }
  }, [currentPosition]);
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          justifyContent: 'flex-start',
          marginBottom: 40,
          marginTop: safeAreaInsets.top,
        },
        dimensions.width
      )}
    >
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
        style={StyleSheet.applyWidth(
          { paddingLeft: 10, paddingRight: 10 },
          dimensions.width
        )}
      >
        <View>
          {/* 语言 */}
          <>
            {tabIndex > 1 ? null : (
              <FilterSectionBlock
                callbackFunc={(data, func) => {
                  try {
                    setContent_language_preference(data);
                    setResetCallback('content_language_preference', func);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                canChooseMutiple={false}
                choosedValues={content_language_preference}
                filterData={DicValueToI18n(Variables, {
                  name: 'common_language',
                  items: [
                    { key: 'zh-CN', value: 'content_only_zh_cn' },
                    { key: 'en', value: 'content_only_en' },
                    { key: 'both', value: 'content_both' },
                  ],
                })}
                showTip={false}
              />
            )}
          </>
          {/* 过滤 */}
          <>
            {tabIndex > 1 ? null : (
              <FilterSectionBlock
                callbackFunc={(data, func) => {
                  try {
                    setRecommend_search(data);
                    setResetCallback('recommend_search', func);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                canChooseMutiple={true}
                choosedValues={custom_sector_ids}
                filterData={DicValueToI18n(Variables, {
                  name: 'filter_shown_name',
                  items: [
                    { key: 'vip', value: 'filter_shown_vip' },
                    { key: 'follow', value: 'filter_shown_follow' },
                  ],
                })}
                showTip={false}
              />
            )}
          </>
          {/* 本营圈过滤 */}
          <>
            {!(tabIndex === 3) ? null : (
              <FilterSectionBlock
                callbackFunc={(data, func) => {
                  try {
                    setOpinion_search(data);
                    setResetCallback('opinion_search', func);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                canChooseMutiple={false}
                choosedValues={opinion_search}
                filterData={DicValueToI18n(Variables, {
                  name: 'filter_shown_name',
                  items: [
                    { key: 'opinion_only', value: 'tab_drop_show_point' },
                    { key: 'followed_only', value: 'filter_shown_follow' },
                    { key: 'all', value: 'common_view_all' },
                  ],
                })}
                showTip={false}
              />
            )}
          </>
          {/* 板块 */}
          <FilterSectionBlock
            callbackFunc={(data, func) => {
              try {
                setCustom_sector_ids(data);
                setResetCallback('custom_sector_ids', func);
              } catch (err) {
                console.error(err);
              }
            }}
            canChooseMutiple={true}
            choosedValues={recommend_search}
            filterData={generateData(Variables)}
            showTip={true}
          />
        </View>

        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            },
            dimensions.width
          )}
        >
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                resetData(Variables);
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
                {
                  backgroundColor: palettes.App.White,
                  borderColor: palettes.Slate[300],
                  borderRadius: 4,
                  borderWidth: 1,
                  color: palettes.App['Custom Color 5'],
                  marginRight: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                  width: '28%',
                }
              ),
              dimensions.width
            )}
            title={`${t(Variables, 'common_reset')}`}
          />
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                confirmBtnPress(navigation);
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
                {
                  backgroundColor: palettes.Brand.appStyle_primary,
                  borderRadius: 4,
                  marginLeft: 10,
                  width: '28%',
                }
              ),
              dimensions.width
            )}
            title={`${t(Variables, 'common_yes')}`}
          />
        </View>
      </SimpleStyleScrollView>
    </View>
  );
};

export default withTheme(FilterScreenBlock);
