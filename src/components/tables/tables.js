import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import TableHeader from "./tableHeader";
import TableToolbar from "./tableToolbar";
const styles = theme => ({
  root: {
    width: "80%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const initalState = {
  order: "asc",
  orderBy: "calories",
  selected: [],
  data: [
    {
      id: 1,
      boxName: "abc",
      environment: "Stage"
    },
    {
      id: 2,
      boxName: "abc",
      environment: "Production"
    },
    {
      id: 3,
      boxName: "abc",
      environment: "Test"
    },
    {
      id: 1,
      boxName: "abc",
      environment: "Stage"
    },
    {
      id: 2,
      boxName: "abc",
      environment: "Production"
    },
    {
      id: 3,
      boxName: "abc",
      environment: "Test"
    },
    {
      id: 1,
      boxName: "abc",
      environment: "Stage"
    },
    {
      id: 2,
      boxName: "abc",
      environment: "Production"
    },
    {
      id: 3,
      boxName: "abc",
      environment: "Test"
    }
  ],
  page: 0,
  rowsPerPage: 10
};

const TableComponent = props => {
  const { classes } = props;
  return (
    <Fragment>
      <Paper className={classes.root}>
        <TableToolbar numSelected={0} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHeader />
            <TableBody>
              {initalState.data
                .slice(
                  initalState.page * initalState.rowsPerPage,
                  initalState.page * initalState.rowsPerPage +
                    initalState.rowsPerPage
                )
                .map(n => {
                  return (
                    <TableRow
                      hover
                      onClick={event => console.log(n.id)}
                      role="checkbox"
                      aria-checked={false}
                      tabIndex={-1}
                      key={n.id}
                      selected={false}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={false} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.boxName}
                      </TableCell>
                      <TableCell>{n.environment}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </Fragment>
  );
};
TableComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TableComponent);
