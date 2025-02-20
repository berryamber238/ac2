import React from 'react';
import {
  IconButton,
  ScreenContainer,
  SimpleStyleFlatList,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AceCampTestApi from '../apis/AceCampTestApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Calendar from '../custom-files/Calendar';
import * as HttpClient from '../custom-files/HttpClient';
import fromUnixTimestamp from '../global-functions/fromUnixTimestamp';
import t from '../global-functions/t';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useWindowDimensions from '../utils/useWindowDimensions';

const CalendarScreen = props => {
  const { theme, navigation } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const getTimestamp = now => {
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // 计算本月第一周的第一天
    const firstWeekFirstDay = new Date(firstDayOfMonth);
    firstWeekFirstDay.setDate(
      firstDayOfMonth.getDate() - firstDayOfMonth.getDay()
    );

    // 计算本月最后一周的最后一天
    const lastWeekLastDay = new Date(lastDayOfMonth);
    lastWeekLastDay.setDate(
      lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay())
    );

    return (
      firstWeekFirstDay.getTime() / 1000 +
      ',' +
      lastWeekLastDay.getTime() / 1000
    );
  };
  const [current_price, setCurrent_price] = React.useState(0);
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [eventData, setEventData] = React.useState({});
  const [is_guest, setIs_guest] = React.useState(false);
  const [marked, setMarked] = React.useState([]);
  const [meeting_list, setMeeting_list] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState('');
  const [timestamp, setTimestamp] = React.useState(getTimestamp(new Date()));
  const getMarkedList = data => {
    initMeetingData(data);
    return data.map(dateObj => {
      const { day, month, year } = dateObj;
      const formattedDay = String(day).padStart(2, '0');
      const formattedMonth = String(month).padStart(2, '0');
      return `${year}-${formattedMonth}-${formattedDay}`;
    });
  };

  const initMeetingData = dateArray => {
    const formattedDateObject = dateArray.reduce((acc, dateObj) => {
      const { day, month, year, meetings } = dateObj;
      // 使用 String.prototype.padStart() 方法确保月份和日期是两位数
      const formattedDay = String(day).padStart(2, '0');
      const formattedMonth = String(month).padStart(2, '0');
      const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
      acc[formattedDate] = meetings;
      return acc;
    }, {});

    setEventData(formattedDateObject);
  };

  const onMonthChanged = date => {
    const now = new Date(date.timestamp);
    // 获取本月的第一天和最后一天
    const newTs = getTimestamp(now);

    // const url = HttpClient.apiEndpoints["meeting_list"]

    // const response = await HttpClient.fetcher(url.url+"?month_timestamp=" + newTs + "&time_zone_code=Asia/Shanghai" ,url.method);
    // const data = await response.json();
    // const newMarked = getMarkedList(data.data)
    // setMarked(newMarked);

    setTimestamp(newTs);
  };
  React.useEffect(() => {
    if (eventData[selectedDay]) setMeeting_list(eventData[selectedDay]);
  }, [selectedDay]);
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App['Custom Color 60'] },
        dimensions.width
      )}
    >
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
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginLeft: 10,
              paddingLeft: 4,
              paddingRight: 4,
              position: 'absolute',
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
                color: palettes.App['Custom #ffffff'],
                flexShrink: 1,
                fontFamily: 'System',
                fontSize: 16,
                fontWeight: '400',
                letterSpacing: 0.2,
                lineHeight: 28,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {t(Variables, 'event_calendar')}
          </Text>
        </View>
        {/* 返回Btn */}
        <IconButton
          onPress={() => {
            try {
              navigation.goBack();
            } catch (err) {
              console.error(err);
            }
          }}
          color={palettes.App['Custom #ffffff']}
          icon={'AntDesign/left'}
          size={22}
        />
      </View>

      <View>
        <Utils.CustomCodeErrorBoundary>
          <Calendar.renderCalendarWithMarkedDatesAndHiddenArrows
            lang={'CN'}
            markedDatesList={marked}
            onMonthChange={onMonthChanged}
            onDaySelect={setSelectedDay}
          />
        </Utils.CustomCodeErrorBoundary>
      </View>
      {/* View 2 */}
      <View>
        <SimpleStyleFlatList
          data={meeting_list}
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
          listKey={'sackVwR5'}
          nestedScrollEnabled={false}
          numColumns={1}
          onEndReachedThreshold={0.5}
          pagingEnabled={false}
          renderItem={({ item, index }) => {
            const listData = item;
            return (
              <Touchable
                onPress={() => {
                  try {
                    navigation.push('EventDetailScreen', {
                      event_id: listData?.event?.id,
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 8,
                      marginLeft: 16,
                      marginRight: 16,
                      marginTop: 15,
                      opacity: 1,
                      paddingBottom: 5,
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingTop: 5,
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    numberOfLines={1}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '600',
                        letterSpacing: 0.2,
                        lineHeight: 24,
                      },
                      dimensions.width
                    )}
                  >
                    {listData?.event?.name}
                  </Text>
                  {/* Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Gray[400],
                        fontFamily: 'System',
                        fontSize: 12,
                        fontWeight: '400',
                        letterSpacing: 0.2,
                        lineHeight: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {fromUnixTimestamp(
                      Variables,
                      listData?.start_time,
                      'HH:mm'
                    )}
                    {'-'}
                    {fromUnixTimestamp(Variables, listData?.end_time, 'HH:mm')}
                  </Text>
                </View>
              </Touchable>
            );
          }}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          snapToAlignment={'start'}
        />
      </View>

      <AceCampTestApi.FetchMeetingMonthListGET
        handlers={{
          onData: fetchData => {
            try {
              /* hidden 'Log to Console' action */
              /* hidden 'Set Variable' action */
              const result = getMarkedList(fetchData?.data);
              setMarked(result);
              /* hidden 'Run a Custom Function' action */
            } catch (err) {
              console.error(err);
            }
          },
        }}
        month_timestamp={timestamp}
      >
        {({ loading, error, data, refetchMeetingMonthList }) => {
          const fetchData = data?.json;
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error || data?.status < 200 || data?.status >= 300) {
            return <ActivityIndicator />;
          }

          return null;
        }}
      </AceCampTestApi.FetchMeetingMonthListGET>
    </ScreenContainer>
  );
};

export default withTheme(CalendarScreen);
