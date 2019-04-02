import React from "react";
import { connect } from "react-redux";
import ServicesComponent from "../components/ServicesComponent";
import {
  travelSaveServices,
  travelUpdateServices,
  onEditService,
  onAddService
} from "../actions";
const Services = ({
  travelStore,
  saveService,
  updateService,
  editToggle,
  addToggle
}) => (
  <ServicesComponent
    services={travelStore.serviceDetails}
    saveService={saveService}
    updateService={updateService}
    onEditService={data => editToggle(Object.assign({}, data))}
    onAddService={addToggle}
  />
);

const mapStateToProps = state => ({ travelStore: state.travelStore });
const mapDispatchToProps = dispatch => ({
  saveService: data => dispatch(travelSaveServices(data)),
  updateService: data => dispatch(travelUpdateServices(data)),
  editToggle: data => dispatch(onEditService(data)),
  addToggle: () => dispatch(onAddService())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Services);
