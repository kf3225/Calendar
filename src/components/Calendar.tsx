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
  IconButton,
  TableFooter,
} from '@material-ui/core';
import _ from 'lodash';
import {
  KeyboardArrowRightRounded,
  KeyboardArrowLeftRounded,
} from '@material-ui/icons';
import { WEEKDAYS } from '../constants/Week';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      width: theme.spacing(6),
      backgroundColor: theme.palette.grey[500],
      color: theme.palette.common.white,
      border: theme.palette.common.white,
      fontSize: 12,
    },
    body: {
      width: theme.spacing(6),
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 300,
      width: 400,
    },
    small: {
      margin: theme.spacing(0),
      width: theme.spacing(3),
      height: theme.spacing(3),
      fontSize: 14,
      textAlign: 'center',
      backgroundColor: 'royalblue',
    },
  }),
);

interface Props {
  calendarArr: Date[][];
  date: Date;
  getMonth: (plusNum: number, today: Date) => void;
}

const Calendar: FC<Props> = ({ calendarArr, date = new Date(), getMonth }) => {
  const classes = useStyles();

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
        {calendarArr.map((week) => (
          <StyledTableRow>
            {week.map((day) => (
              <StyledTableCell key={day.toString()} align="center">
                {day.getDate()}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} />
          <TableCell>
            <IconButton size="small" onClick={() => getMonth(-1, date)}>
              <KeyboardArrowLeftRounded />
            </IconButton>
          </TableCell>
          <TableCell colSpan={2} align="center">
            <Typography component="h3">
              {`${date.getFullYear()}/${date.getMonth() + 1}`}
            </Typography>
          </TableCell>
          <TableCell>
            <IconButton size="small" onClick={() => getMonth(1, date)}>
              <KeyboardArrowRightRounded />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Calendar;
