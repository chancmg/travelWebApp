import React from "react";
import Proptypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const TableHeader = ({ rows }) => {
  return (
    <TableHead>
      <TableRow>
        {rows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={row.disablePadding ? "none" : "default"}
          >
            {row.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
TableHeader.propTypes = {
  rows: Proptypes.array.isRequired
};

export default TableHeader;
