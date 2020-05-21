import React, { FC, useState } from 'react';
import {
  Theme,
  createStyles,
  withStyles,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  TableFooter,
  makeStyles,
  Button,
  ThemeProvider,
} from '@material-ui/core';
import _ from 'lodash';
import {
  KeyboardArrowRightRounded,
  KeyboardArrowLeftRounded,
} from '@material-ui/icons';
import { WEEKDAYS } from '../constants/Week';

const styledTableCell = (date?: Date, today?: Date) => {
  const greyNum =
    date && today ? (date.getMonth() === today.getMonth() ? 600 : 400) : 600;

  return withStyles((theme: Theme) =>
    createStyles({
      head: {
        textAlign: 'center',
        fontSize: 12,
        minWidth: '30px',
        maxWidth: '30px',
        minHeight: '50px',
        maxHeigth: '50px',
        padding: theme.spacing(0),
        margin: theme.spacing(0),
      },
      body: {
        color: theme.palette.grey[greyNum],
        fontSize: 12,
        textAlign: 'center',
        minWidth: '30px',
        maxWidth: '30px',
        minHeight: '30px',
        maxHeigth: '30px',
        padding: theme.spacing(0),
        margin: theme.spacing(0),
      },
      footer: {
        color: theme.palette.grey[greyNum],
        fontSize: 12,
        textAlign: 'center',
        padding: theme.spacing(0),
        margin: theme.spacing(0),
      },
    }),
  )(TableCell);
};

const styledButton = (day: Date, date: Date) => {
  const today = new Date();
  const isToday =
    day.getFullYear() === today.getFullYear() &&
    day.getMonth() === today.getMonth() &&
    day.getDate() === today.getDate();

  const isThisMonth = day.getMonth() === date.getMonth();

  return withStyles((theme: Theme) =>
    isToday
      ? createStyles({
          root: {
            fontSize: 12,
            color: theme.palette.common.white,
            background: theme.palette.primary.light,
            minWidth: '30px',
            maxWidth: '30px',
            minHeight: '30px',
            maxHeigth: '30px',
            padding: theme.spacing(0),
            margin: theme.spacing(0),
            textAlign: 'center',
          },
        })
      : isThisMonth
      ? createStyles({
          root: {
            fontSize: 12,
            color: theme.palette.primary.main,
            minWidth: '30px',
            maxWidth: '30px',
            minHeight: '30px',
            maxHeigth: '30px',
            padding: theme.spacing(0),
            margin: theme.spacing(0),
            textAlign: 'center',
          },
        })
      : createStyles({
          root: {
            fontSize: 12,
            color: theme.palette.action.disabled,
            minWidth: '30px',
            maxWidth: '30px',
            minHeight: '30px',
            maxHeigth: '30px',
            padding: theme.spacing(0),
            margin: theme.spacing(0),
            textAlign: 'center',
          },
        }),
  )(Button);
};

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        padding: theme.spacing(0),
        margin: theme.spacing(0),
      },
    },
  }),
)(TableRow);

interface Props {
  calendarArr: Date[][];
  date: Date;
  weekPlans: Date[],
  selectDate: (date: Date) => void;
  calendarIncrement: () => void;
  calendarDecrement: () => void;
  reset: () => void;
}

const Calendar: FC<Props> = ({
  calendarArr,
  date = new Date(),
  selectDate,
  calendarIncrement,
  calendarDecrement,
  reset,
}) => {
  const StyledTableCell = styledTableCell();

  return (
    <Table style={{ minWidth: '250px', maxWidth: '250px' }} component={Paper}>
      <TableHead>
        <TableRow>
          {WEEKDAYS.map((wd) => {
            return <StyledTableCell>{wd.type}</StyledTableCell>;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {calendarArr.map((week) => (
          <StyledTableRow>
            {week.map((day) => {
              day.setMonth(day.getMonth() + 1)
              const StyledTableCell = styledTableCell(day, date);
              const StyledButton = styledButton(day, date);
              return (
                <StyledTableCell key={day.toString()}>
                  <StyledButton onClick={() => selectDate(day)}>{day.getDate()}</StyledButton>
                </StyledTableCell>
              );
            })}
          </StyledTableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <StyledTableCell colSpan={3}>
            <Button variant="text" onClick={() => reset()}>
              今月
            </Button>
          </StyledTableCell>
          <StyledTableCell>
            <IconButton size="small" onClick={() => calendarDecrement()}>
              <KeyboardArrowLeftRounded />
            </IconButton>
          </StyledTableCell>
          <StyledTableCell colSpan={2} align="center">
            <Typography component="h3">
              {`${date.getFullYear()}/${date.getMonth() + 1}`}
            </Typography>
          </StyledTableCell>
          <StyledTableCell>
            <IconButton size="small" onClick={() => calendarIncrement()}>
              <KeyboardArrowRightRounded />
            </IconButton>
          </StyledTableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Calendar;
