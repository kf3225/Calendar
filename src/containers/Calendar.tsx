import React, { FC, useState, useEffect } from 'react';
import _ from 'lodash';
import { WEEKDAYS } from '../constants/Week';
import CalendarComponent from '../components/Calendar';

const useCalendarInfo = (
  today: Date,
  initialCalendarArr: Date[][],
): [
  Date[][],
  Date,
  Date,
  (date: Date) => void,
  () => (num: number) => void,
  () => void,
] => {
  const [date, setDate] = useState(today);
  const [calendarArr, setCalendar] = useState(initialCalendarArr);
  const [weekPlans, setWeekPlans] = useState(getWeekPlans(today));
  const [selectedDate, setSelectedDate] = useState(today);

  const goBackOrNextMonth = () => {
    return (num: number) => {
      setDate(
        (prevDate) =>
          new Date(prevDate.getFullYear(), prevDate.getMonth() + num, 1),
      );
    };
  };

  const selectDate = (selectedDate: Date) => setSelectedDate(selectedDate);

  const reset = () => setDate(today);

  useEffect(() => {
    const makeArr = () => {
      console.log(date);
      const calendarArrByDate = createCalendarArray(date);
      setCalendar(calendarArrByDate);
    };
    makeArr();
    setWeekPlans(getWeekPlans(selectedDate));
  }, [date, selectedDate]);

  return [
    calendarArr,
    date,
    selectedDate,
    selectDate,
    goBackOrNextMonth,
    reset,
  ];
};

const CalendarContainer: FC = () => {
  const today = new Date();
  const initialCalendarArr = createCalendarArray(today);
  const [
    calendarArr,
    date,
    selectedDate,
    selectDate,
    goBackOrNextMonth,
    reset,
  ] = useCalendarInfo(today, initialCalendarArr);
  return (
    <CalendarComponent
      calendarArr={calendarArr}
      date={date}
      selectedeDate={selectedDate}
      selectDate={selectDate}
      goBackOrNextMonth={goBackOrNextMonth}
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

const getWeekPlans = (date: Date): Date[] => {
  const baseDate = _.cloneDeep(date);
  baseDate.setMonth(baseDate.getMonth());

  const settingDate = (date: Date) => (num: number): Date => {
    const cpDate = _.cloneDeep(date);
    cpDate.setDate(cpDate.getDate() + num);
    return cpDate;
  };

  return [
    settingDate(baseDate)(-2),
    settingDate(baseDate)(-1),
    baseDate,
    settingDate(baseDate)(1),
    settingDate(baseDate)(2),
  ];
};

export default CalendarContainer;
