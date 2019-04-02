import React, { Fragment } from "react";
import Dashboard from "../components/dashboard";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./home";
import Services from "./services";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  drawerOnToggle,
  userMenuOnToggle,
  serviceDialogOnToggle,
  formOnChange,
  formOnSubmit
} from "../actions";
const DashboardPage = props => {
  const {
    travelStore,
    toggleDrawer,
    toggleUserMenu,
    onFormChange,
    onFormToggle,
    onFormSubmit
  } = props;
  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter basename="/">
        <Dashboard
          open={travelStore.DRAWER_OPEN}
          toggleDrawer={toggleDrawer}
          toggleMenu={toggleUserMenu}
          anchorEl={travelStore.menuAnchor}
          menuOpen={Boolean(travelStore.menuAnchor)}
          username={travelStore.usersList ? travelStore.usersList.userName : ""}
          userEmail={travelStore.usersList ? travelStore.usersList.emailId : ""}
          lastLogin={
            travelStore.usersList ? travelStore.usersList.lastLoginTs : ""
          }
          dialog_open={travelStore.SERVICE_DIALOG_OPEN}
          onFormToggle={onFormToggle}
          onFormChange={onFormChange}
          onFormSubmit={() => onFormSubmit(travelStore)}
          type={travelStore.form_type}
          serviceData={travelStore.editableService}
        >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/services" component={Services} />
          </Switch>
        </Dashboard>
      </BrowserRouter>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  travelStore: state.travelStore
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: action => dispatch(drawerOnToggle(action)),
  toggleUserMenu: target => dispatch(userMenuOnToggle(target)),
  onFormToggle: action => dispatch(serviceDialogOnToggle(action)),
  onFormChange: (value, key) => dispatch(formOnChange(value, key)),
  onFormSubmit: data => dispatch(formOnSubmit(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
