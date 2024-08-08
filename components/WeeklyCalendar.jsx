import { DateContext } from '@/contexts/DateContext';
import { LoginContext } from '@/contexts/LoginContext';
import useTodoStore from '@/contexts/TodoStore';
import { convertGmtToKst } from '@/utils/convertTimezone';
import { isTodoIncludedInTodayView } from '@/utils/dateUtils';
import {
  handleLogEvent,
  WEEKLYCALENDAR_DAYITEM_CLICK_EVENT,
  WEEKLYCALENDAR_NAVIGATEWEEK_CLICK_EVENT,
} from '@/utils/logEvent';
import { Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import moment from 'moment';
import 'moment/locale/ko';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

const WeeklyCalendar = () => {
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const [currentDate, setcurrentDate] = useState(moment());
  const theme = useTheme();
  const { userId } = useContext(LoginContext);
  const todos = useTodoStore(state => state.todos);
  const getWeekDates = date => {
    const start = date.clone().startOf('ISOWeek');
    const r = Array.from({ length: 7 }, (_, i) =>
      moment(convertGmtToKst(new Date(start.clone().add(i, 'days')))),
    );
    return r;
  };
  const [weekDates, setwWeekDates] = useState(getWeekDates(currentDate));

  const navigateWeek = direction => {
    setcurrentDate(prevDate =>
      direction === 'next'
        ? prevDate.clone().add(7, 'd')
        : prevDate.clone().subtract(7, 'd'),
    );
  };
  useEffect(() => {
    setwWeekDates(getWeekDates(currentDate));
  }, [currentDate]);
  useEffect(() => {
    moment().isBetween(weekDates[0], weekDates[6])
      ? setSelectedDate(currentDate)
      : setSelectedDate(weekDates[0]);
  }, [weekDates, setSelectedDate, currentDate]);

  const handleDateSelect = date => {
    setSelectedDate(date);
  };

  return (
    <Layout style={{ padding: 16 }}>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleLogEvent(WEEKLYCALENDAR_NAVIGATEWEEK_CLICK_EVENT, {
              time: new Date().toISOString(),
              userId: userId,
              week: selectedDate.format('YYYY-MM-DD'),
              direction: 'prev',
            });
            navigateWeek('prev');
          }}
        >
          <Icon
            name="arrow-ios-back-outline"
            fill={theme['text-basic-color']}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <Text category="h6">{selectedDate.format('yyyy년 MM월')}</Text>
        <TouchableOpacity
          onPress={() => {
            navigateWeek('next');
            handleLogEvent(WEEKLYCALENDAR_NAVIGATEWEEK_CLICK_EVENT, {
              time: new Date().toISOString(),
              userId: userId,
              week: selectedDate.format('YYYY-MM-DD'),
              direction: 'next',
            });
          }}
        >
          <Icon
            name="arrow-ios-forward-outline"
            fill={theme['text-basic-color']}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </Layout>
      <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {weekDates.map((date, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              handleLogEvent(WEEKLYCALENDAR_DAYITEM_CLICK_EVENT, {
                time: new Date().toISOString(),
                userId: userId,
                day: date.format('YYYY-MM-DD'),
              });
              handleDateSelect(date);
            }}
            style={{
              alignItems: 'center',
              padding: 8,
              borderRadius: 8,
              backgroundColor: date.isSame(selectedDate, 'day')
                ? theme['color-primary-500']
                : 'transparent',
            }}
          >
            <Text
              category="s1"
              style={{
                color: date.isSame(selectedDate, 'day')
                  ? 'white'
                  : theme['text-basic-color'],
              }}
            >
              {date.format('ddd')}
            </Text>
            <Text
              category="h6"
              style={{
                color: date.isSame(selectedDate, 'day')
                  ? 'white'
                  : theme['text-basic-color'],
              }}
            >
              {date.format('D')}
            </Text>
            <Layout
              style={{
                backgroundColor: theme['color-primary-300'],
                borderRadius: 12,
                padding: 4,
                marginTop: 4,
              }}
            >
              <Text category="c1" style={{ color: theme['color-basic-800'] }}>
                {
                  todos.filter(
                    todo =>
                      isTodoIncludedInTodayView(
                        todo.startDate,
                        todo.endDate,
                        date.format('YYYY-MM-DD'),
                      ) && !todo.isCompleted,
                  ).length
                }
              </Text>
            </Layout>
          </TouchableOpacity>
        ))}
      </Layout>
    </Layout>
  );
};

export default WeeklyCalendar;
