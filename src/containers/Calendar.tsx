import React, { FC, useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import _ from 'lodash';
import { WEEKDAYS } from '../constants/Week';
import Calendar from '../components/Calendar';

const useCalendarInfo = (
  today: Date,
  initialCalendarArr: Date[][],
): [Date[][], Date, (plusNum: number, today: Date) => void] => {
  const [date, setDate] = useState(today);
  const [calendarArr, setCalendar] = useState(initialCalendarArr);

  const getMonth = (i: number, baseDate: Date) => {
    baseDate.setMonth(baseDate.getMonth() + i);
    setDate(baseDate);
  };

  useEffect(() => {
    const makeArr = () => {
      const calendarArrByDate = createCalendarArray(date);
      setCalendar(calendarArrByDate)
    }
    makeArr()
  }, [date]);

  return [calendarArr, date, getMonth];
};

const CalendarContainer: FC = () => {
  const today = new Date();
  const initialCalendarArr = createCalendarArray(today);
  const [calendarArr, date, getMonth] = useCalendarInfo(
    today,
    initialCalendarArr,
  );
  return <Calendar calendarArr={calendarArr} date={date} getMonth={getMonth} />;
};

const createCalendarArray = (date: Date) => {
  const copyDate = _.cloneDeep(date);
  copyDate.setDate(1);

  const weekTypeOfFirstDay = WEEKDAYS[copyDate.getDay()];

  const dayTypeCount = weekTypeOfFirstDay.idx;
  copyDate.setDate(copyDate.getDate() - dayTypeCount);
  let calendarArr = [];
  let weekArr = [];

  for (let i = 1; i <= 42; i++) {
    copyDate.setDate(copyDate.getDate() + 1);
    weekArr.push(_.cloneDeep(copyDate));

    if (i % 7 === 0) {
      calendarArr.push(weekArr);
      weekArr = [];
    }
  }
  return calendarArr;
};

const getColorOfDateCharacter = (date: Date, day: Date): string => {
  return date.getMonth() === day.getMonth() ? 'grey' : 'silver';
};

const isToday = (today: Date, day: Date) => {
  return (
    today.getFullYear() === day.getFullYear() &&
    today.getMonth() === day.getMonth() &&
    today.getDate() === day.getDate()
  );
};

export default CalendarContainer;
