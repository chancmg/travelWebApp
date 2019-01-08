import React from 'react';

const Dashboard = () =>{
    return (<div className = "appWrapper">
    <main>
     <div className="row">
     <div className="col s3 m3 l2 sideNav">
     <div className="appNameContainer">
     <img src="./images/local-taxi.png" alt="logo"/>
     <h5>Travel App</h5>
     </div>
     </div>
     <div className="col s9 m9 l10 contentWrapper">
     <div className="dashboardActiveBar">
     </div>
     </div>
     </div>
    </main>
    </div>);
};

export default Dashboard;
