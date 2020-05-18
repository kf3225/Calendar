import React, { FC, useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import _ from 'lodash';
import { WEEKDAYS } from '../constants/Week';
import CalendarComponent from '../components/Calendar';

const useCalendarInfo = (
  today: Date,
  initialCalendarArr: Date[][],
): [Date[][], Date, () => void, () => void, () => void] => {
  const [date, setDate] = useState(today);
  const [calendarArr, setCalendar] = useState(initialCalendarArr);

  const calendarIncrement = () =>
    setDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1),
    );
  const calendarDecrement = () =>
    setDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1),
    );

  const reset = () => setDate(today);

  useEffect(() => {
    const makeArr = () => {
      const calendarArrByDate = createCalendarArray(date);
      setCalendar(calendarArrByDate);
    };
    makeArr();
  }, [date]);

  return [calendarArr, date, calendarIncrement, calendarDecrement, reset];
};

const CalendarContainer: FC = () => {
  const today = new Date();
  const initialCalendarArr = createCalendarArray(today);
  const [
    calendarArr,
    date,
    calendarIncrement,
    calendarDecrement,
    reset,
  ] = useCalendarInfo(today, initialCalendarArr);
  return (
    <CalendarComponent
      calendarArr={calendarArr}
      date={date}
      calendarIncrement={calendarIncrement}
      calendarDecrement={calendarDecrement}
      reset={reset}
    />
  );
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

export default CalendarContainer;
