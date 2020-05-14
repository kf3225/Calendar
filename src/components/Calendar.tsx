import React, { FC, useState } from 'react';
import {
  Theme,
  createStyles,
  makeStyles,
  Paper,
  Table,
  TableHead,
  TableRow,
  withStyles,
  TableCell,
  TableBody,
  Typography,
  Button,
  IconButton,
  TableFooter,
} from '@material-ui/core';
import _ from 'lodash';
import { ArrowLeftRounded, ArrowRightRounded } from '@material-ui/icons';

const WEEKDAYS = [
  { idx: 1, type: 'SUN' },
  { idx: 2, type: 'MON' },
  { idx: 3, type: 'TUE' },
  { idx: 4, type: 'WED' },
  { idx: 5, type: 'THU' },
  { idx: 6, type: 'FRI' },
  { idx: 7, type: 'SAT' },
];

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.grey[500],
      color: theme.palette.common.white,
      border: theme.palette.common.white,
      fontSize: 12,
    },
    body: {
      fontSize: 12,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    width: 400,
  },
});

const Calendar: FC = () => {
  const [date, setDate] = useState(new Date());
  const classes = useStyles();
  const daysOfThisMonth = createCalendarArray(_.cloneDeep(date));

  return (
    <Table
      className={classes.table}
      aria-label="customized table"
      component={Paper}
    >
      <TableHead>
        <TableRow>
          {WEEKDAYS.map((wd) => (
            <StyledTableCell align="center">{wd.type}</StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {daysOfThisMonth.map((week) => (
          <StyledTableRow>
            {week.map((day) => (
              <StyledTableCell key={day.toString()} align="center">
                <Typography variant="button">{day.getDate()}</Typography>
              </StyledTableCell>
            ))}
          </StyledTableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} />
          <TableCell>
            <IconButton
              size="small"
              onClick={() => setDate(getFormerEOrNextMont(-1, date))}
            >
              <ArrowLeftRounded />
            </IconButton>
          </TableCell>
          <TableCell colSpan={2} align="center">
            <Typography variant="button">
              {`${date.getFullYear()}/${date.getMonth() + 1}`}
            </Typography>
          </TableCell>
          <TableCell>
            <IconButton
              size="small"
              onClick={() => setDate(getFormerEOrNextMont(1, date))}
            >
              <ArrowRightRounded />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

const createCalendarArray = (date: Date) => {
  date.setDate(1);

  const weekTypeOfFirstDay = WEEKDAYS[date.getDay()];

  const dayTypeCount = weekTypeOfFirstDay.idx;
  date.setDate(date.getDate() - dayTypeCount);
  let calendarArr = [];
  let weekArr = [];

  for (let i = 1; i <= 42; i++) {
    date.setDate(date.getDate() + 1);
    weekArr.push(_.cloneDeep(date));

    if (i % 7 === 0) {
      calendarArr.push(weekArr);
      weekArr = [];
    }
  }
  return calendarArr;
};

const getFormerEOrNextMont = (i: number, date: Date) => {
  date.setMonth(date.getMonth() + i);
  return _.cloneDeep(date);
};

export default Calendar;
