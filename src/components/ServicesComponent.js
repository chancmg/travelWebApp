import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableToolbar from "./tables/tableToolbar";
import TableHeader from "./tables/tableHeader";
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

const ServicesComponent = ({
  classes,
  services,
  saveService,
  updateService,
  onEditService,
  onAddService
}) => (
  <Fragment>
    <Paper className={classes.root}>
      <TableToolbar numSelected={0} onAddService={onAddService} />
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          <TableHeader
            rows={[
              {
                id: "serviceId",
                numeric: false,
                disablePadding: false,
                label: "Service Id"
              },
              {
                id: "serviceDesc",
                numeric: false,
                disablePadding: false,
                label: "Service Description"
              },
              {
                id: "serviceStatus",
                numeric: false,
                disablePadding: false,
                label: "Service Status"
              },
              {
                id: "servicePriority",
                numeric: false,
                disablePadding: false,
                label: "Service Priortity"
              }
            ]}
          />
          <TableBody>
            {services
              .sort((a, b) => {
                if (a.servicePriority > b.servicePriority) return 1;
                if (a.servicePriority < b.servicePriority) return -1;
                return 0;
              })
              .map(n => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={false}
                    tabIndex={-1}
                    key={n.serviceId}
                    selected={false}
                    onClick={() => onEditService(n)}
                  >
                    <TableCell component="th" scope="row" padding="default">
                      {n.serviceId}
                    </TableCell>
                    <TableCell>{n.serviceDesc}</TableCell>
                    <TableCell>{n.serviceStatus}</TableCell>
                    <TableCell>{n.servicePriority}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </Paper>
  </Fragment>
);

ServicesComponent.propTypes = {
  services: PropTypes.array.isRequired,
  saveService: PropTypes.func.isRequired,
  updateService: PropTypes.func.isRequired,
  onEditService: PropTypes.func.isRequired
};

export default withStyles(styles)(ServicesComponent);
