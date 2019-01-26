import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ children }) => (
  <div className="appWrapper">
    <main>
      <div className="row">
        <div className="col s3 m3 l2 sideNav">
          <div className="appNameContainer">
            <img src="./images/local-taxi.png" alt="logo" />
            <h5>Travel App</h5>
          </div>
          <div className="menu-container">
            <div className="menu">
              <li className="item" id="menuitem1">
                <a href="#menuitem1" className="menu-header">
                  <i className="fas fa-cog fa-fw" />
                  Admin
                </a>
                <div className="smenu">
                  <button type="submit">User Management</button>
                  <button type="submit">Service Management</button>
                </div>
              </li>
            </div>
            <div className="menu">
              <li className="item" id="menuitem2">
                <a href="#menuitem2" className="menu-header">
                  <i className="fas fa-info fa-fw" />
                  Service
                </a>
                <div className="smenu">
                  <button type="submit">User Management</button>
                  <button type="submit">Service Management</button>
                </div>
              </li>
            </div>
            <div className="menu">
              <li className="item" id="menuitem3">
                <a href="#menuitem3" className="menu-header">
                  <i className="fas fa-home fa-fw" />
                  Admin
                </a>
                <div className="smenu">
                  <button type="submit">User Management</button>
                  <button type="submit">Service Management</button>
                </div>
              </li>
            </div>
          </div>
          <div className="footer-user">
            <div className="row valign-wrapper">
              <div className="col s2">
                <img src="./images/avatar.jpg" alt="" className="circle responsive-img" />
              </div>
              <div className="col s10">
                <span className="black-text">userName</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col s9 m9 l10 contentWrapper">{children}</div>
      </div>
    </main>
  </div>
);

Dashboard.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Dashboard;
