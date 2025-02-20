import React, { useState, Fragment, useCallback, useMemo, useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Calendar, CalendarUtils, LocaleConfig } from 'react-native-calendars';

// Define and export your components as named exports here.

// You can use components exported from this file within a Custom Code component as
// <CustomCode.MyExampleComponent />

const getDate = count => {
  const date = new Date();
  return date;
};
export const renderCalendarWithMarkedDatesAndHiddenArrows = ({
  lang,
  onMonthChange,
  markedDatesList,
  onDaySelect,
}) => {
  const [selected, setSelected] = useState();

  const marked = React.useMemo(() => {
    const newMarked = markedDatesList.reduce((acc, cur, index) => {
      acc[cur] = {
        dotColor: 'red',
        marked: true,
      };
      return acc;
    }, {});
    newMarked[selected] = {
      selected: true,
    };
    return newMarked;
  }, [selected, markedDatesList]);

  LocaleConfig.locales['en'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'Today',
  };
  LocaleConfig.locales['cn'] = {
    monthNames: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    monthNamesShort: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    dayNames: ['日', '一', '二', '三', '四', '五', '六'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    today: '今日',
  };
  LocaleConfig.defaultLocale = 'cn';

  const onDayPress = useCallback(day => {
    setSelected(day.dateString);
    onDaySelect(day.dateString);
  }, []);

  return (
    <Fragment>
      <Calendar
        style={styles.calendar}
        monthFormat={lang === 'en' ? 'MMMM yyyy' : 'yyyy, MMM'}
        theme={{
          calendarBackground: '#ffffff00',
          selectedDayBackgroundColor: '#3fcab9',
          dayTextColor: '#ffffff',
          todayTextColor: '#3fcab9',
          selectedDayTextColor: '#ffffff',
          monthTextColor: '#ffffff',
          textMonthFontSize: 18,
          textDisabledColor: 'gray',
          weekVerticalMargin: 15,
          'stylesheet.calendar.header': {
            week: {
              marginTop: 12,
              paddingVertical: 6,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: '#cccccc',
              borderTopColor: '#cccccc',
              borderBottomWidth: 0.5,
              borderTopWidth: 0.5,
              color: 'black',
            },
          },
        }}
        firstDay={0}
        markedDates={marked}
        onDayPress={onDayPress}
        hideArrows={false}
        enableSwipeMonths={true}
        onMonthChange={onMonthChange}
      />
    </Fragment>
  );
};
const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
    backgroundColor: '#ffffff00',
  },
  switchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  switchText: {
    margin: 10,
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  disabledText: {
    color: 'grey',
  },
  defaultText: {
    color: 'purple',
  },
  customCalendar: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  customDay: {
    textAlign: 'center',
  },
  customHeader: {
    backgroundColor: '#FCC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -4,
    padding: 8,
  },
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BBF2',
  },
});
