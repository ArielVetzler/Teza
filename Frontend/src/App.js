var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from 'react';
import ArticleFeed from './components/ArticleFeed/ArticleFeed';
import UserFeed from './components/UserFeed/UserFeed';
import MatchStream from './components/MatchStream/MatchStream';
import DashboardHeader from './components/DashboardHeader/DashboardHeader';
import './App.css';
var WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';
var App = function () {
    var _a = useState([]), articles = _a[0], setArticles = _a[1];
    var _b = useState([]), users = _b[0], setUsers = _b[1];
    var _c = useState([]), matches = _c[0], setMatches = _c[1];
    var ws = useRef(null);
    var connectWebSocket = useCallback(function () {
        if (ws.current)
            ws.current.close();
        ws.current = new WebSocket(WS_URL);
        ws.current.onopen = function () {
            console.log('WebSocket connected');
        };
        ws.current.onmessage = function (event) {
            var message = JSON.parse(event.data);
            var type = message.type;
            var data = message.data;
            switch (type) {
                case 'new_article':
                    setArticles(function (prev) {
                        var newArticles = __spreadArray(__spreadArray([], prev, true), [data], false);
                        return newArticles.length > 20 ? newArticles.slice(1) : newArticles;
                    });
                    break;
                case 'new_user':
                    setUsers(function (prev) {
                        var newUsers = __spreadArray(__spreadArray([], prev, true), [data], false);
                        return newUsers.length > 20 ? newUsers.slice(1) : newUsers;
                    });
                    break;
                case 'new_matches':
                    setMatches(function (prev) {
                        var newMatches = __spreadArray(__spreadArray([], prev, true), [JSON.parse(data[0])], false);
                        return newMatches.length > 20 ? newMatches.slice(1) : newMatches;
                    });
                    break;
                default:
                    console.warn('Unknown message type:', type);
            }
        };
        ws.current.onclose = function () {
            console.log('WebSocket disconnected');
        };
        ws.current.onerror = function (error) {
            console.error('WebSocket error:', error);
        };
    }, []);
    var disconnectWebSocket = useCallback(function () {
        if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING)) {
            ws.current.close();
        }
    }, []);
    useEffect(function () {
        connectWebSocket();
        return function () {
            disconnectWebSocket();
        };
    }, [connectWebSocket, disconnectWebSocket]);
    return (_jsxs("div", { className: "app-container", children: [_jsx("div", { className: "decorative-left" }), _jsxs("div", { className: "main-content", children: [_jsx(DashboardHeader, {}), _jsxs("div", { className: "grid-container", children: [_jsx(ArticleFeed, { articles: articles }), _jsx(UserFeed, { users: users }), _jsx(MatchStream, { matches: matches })] })] }), _jsx("div", { className: "decorative-right" })] }));
};
export default App;
