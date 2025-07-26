import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './DashboardHeader.css';
var DashboardHeader = React.memo(function () {
    return (_jsx("div", { className: "dashboard-header", children: _jsx("div", { className: "header-top-row", children: _jsxs("div", { className: "header-title-section", children: [_jsx("h1", { className: "dashboard-title", children: "Real-time News Matching Dashboard" }), _jsx("p", { className: "dashboard-summary", children: "This dashboard provides a real-time news matching simulation, displaying live article and user feeds, and real-time matches based on interest overlap." })] }) }) }));
});
export default DashboardHeader;
