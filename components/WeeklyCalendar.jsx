import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout, Text, Icon, useTheme } from '@ui-kitten/components';
import { addDays, subDays, startOfWeek, format } from 'date-fns';
import { useTodos } from '@/contexts/TodoContext';

const WeeklyCalendar = ({ onSelectDate }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(currentWeek);
  const theme = useTheme();
  const todos = useTodos();
  const getWeekDates = date => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const weekDates = getWeekDates(currentWeek);

  const navigateWeek = direction => {
    setCurrentWeek(prevWeek =>
      direction === 'next' ? addDays(prevWeek, 7) : subDays(prevWeek, 7),
    );
  };

  const handleDateSelect = date => {
    setSelectedDate(date);
    // onSelectDate(date);
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
        <TouchableOpacity onPress={() => navigateWeek('prev')}>
          <Icon
            name="arrow-ios-back-outline"
            fill={theme['text-basic-color']}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <Text category="h6">{format(weekDates[0], 'yyyy년 MM월')}</Text>
        <TouchableOpacity onPress={() => navigateWeek('next')}>
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
            onPress={() => handleDateSelect(date)}
            style={{
              alignItems: 'center',
              padding: 8,
              borderRadius: 8,
              backgroundColor:
                format(date, 'yyyy-MM-dd') ===
                format(selectedDate, 'yyyy-MM-dd')
                  ? theme['color-primary-500']
                  : 'transparent',
            }}
          >
            <Text
              category="s1"
              style={{
                color:
                  format(date, 'yyyy-MM-dd') ===
                  format(selectedDate, 'yyyy-MM-dd')
                    ? 'white'
                    : theme['text-basic-color'],
              }}
            >
              {format(date, 'E')}
            </Text>
            <Text
              category="h6"
              style={{
                color:
                  format(date, 'yyyy-MM-dd') ===
                  format(selectedDate, 'yyyy-MM-dd')
                    ? 'white'
                    : theme['text-basic-color'],
              }}
            >
              {format(date, 'd')}
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
                    t =>
                      format(t.date, 'yyyy-MM-dd') ===
                      format(date, 'yyyy-MM-dd'),
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
