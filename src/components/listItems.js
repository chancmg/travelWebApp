import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { PropTypes } from "prop-types";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LayersIcon from "@material-ui/icons/Layers";
import { Link } from "react-router-dom";

class ListItemLink extends React.Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;

  render() {
    const { icon, primary } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }
}

ListItemLink.propTypes = {
  icon: PropTypes.node.isRequired,
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired
};

export const mainListItems = (
  <div>
    <ListItemLink to="/" primary="Home" icon={<DashboardIcon />} />
    <ListItemLink to="/services" primary="Services" icon={<LayersIcon />} />
  </div>
);
