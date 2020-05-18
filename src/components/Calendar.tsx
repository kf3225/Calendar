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
        backgroundColor: theme.palette.grey[greyNum],
        color: theme.palette.common.white,
        border: theme.palette.common.white,
        textAlign: 'center',
        fontSize: 12,
      },
      body: {
        color: theme.palette.grey[greyNum],
        fontSize: 12,
        textAlign: 'center',
        padding: theme.spacing(0),
      },
    }),
  )(TableCell);
};

const styledButton = (date?: Date, today?: Date) => {
  const greyNum =
    date && today ? (date.getMonth() === today.getMonth() ? 600 : 400) : 600;

  return withStyles((theme: Theme) =>
    createStyles({
      root: {
        color: theme.palette.grey[greyNum],
        fontSize: 12,
        textAlign: 'center',
        padding: theme.spacing(2),
      },
    }),
  )(Button);
};

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
      padding: theme.spacing(0),
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
  calendarIncrement: () => void;
  calendarDecrement: () => void;
  reset: () => void;
}

const Calendar: FC<Props> = ({
  calendarArr,
  date = new Date(),
  calendarIncrement,
  calendarDecrement,
  reset,
}) => {
  const classes = useStyles();

  return (
    <Table
      className={classes.table}
      aria-label="customized table"
      component={Paper}
    >
      <TableHead>
        <TableRow>
          {WEEKDAYS.map((wd) => {
            const StyledTableCell = styledTableCell();
            return <StyledTableCell>{wd.type}</StyledTableCell>;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {calendarArr.map((week) => (
          <StyledTableRow>
            {week.map((day) => {
              const StyledTableCell = styledTableCell(day, date);
              const StyledButton = styledButton(day, date);
              return (
                <StyledTableCell key={day.toString()}>
                  <StyledButton>{day.getDate()}</StyledButton>
                </StyledTableCell>
              );
            })}
          </StyledTableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            <Button variant="outlined" onClick={() => reset()}>
              今月
            </Button>
          </TableCell>
          <TableCell>
            <IconButton size="small" onClick={() => calendarDecrement()}>
              <KeyboardArrowLeftRounded />
            </IconButton>
          </TableCell>
          <TableCell colSpan={2} align="center">
            <Typography component="h3">
              {`${date.getFullYear()}/${date.getMonth() + 1}`}
            </Typography>
          </TableCell>
          <TableCell>
            <IconButton size="small" onClick={() => calendarIncrement()}>
              <KeyboardArrowRightRounded />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Calendar;
