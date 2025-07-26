import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Controls.css';
var Controls = function (_a) {
    var onToggleGeneration = _a.onToggleGeneration, onReset = _a.onReset, isRunning = _a.isRunning;
    return (_jsxs("div", { className: "controls-container", children: [_jsx("button", { onClick: onToggleGeneration, className: "control-button toggle-button", children: isRunning ? 'Pause' : 'Play' }), _jsx("button", { onClick: onReset, className: "control-button reset-button", children: "Reset" })] }));
};
export default Controls;
