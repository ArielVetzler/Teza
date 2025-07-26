import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Card from '../Card/Card';
import './UserFeed.css';
var UserFeed = React.memo(function (_a) {
    var users = _a.users;
    var maxTagsToShow = 4;
    return (_jsxs(Card, { children: [_jsx("h2", { className: "feed-title", children: _jsxs("span", { children: [_jsx("span", { className: "feed-dot green" }), "Live User Feed"] }) }), _jsx("div", { className: "title-separator" }), _jsx("div", { className: "feed-content", children: users.map(function (user) {
                    var isDiverse = user.tags.length > 5; // Example threshold for diverse
                    var diversityClass = isDiverse ? 'diverse' : 'casual';
                    return (_jsx(Card, { className: "user-card", children: _jsxs("div", { className: "feed-item", children: [_jsxs("div", { className: "user-header", children: [_jsxs("div", { className: "user-info", children: [_jsx("span", { className: "user-icon", children: "\uD83D\uDC64" }), " ", _jsx("h3", { className: "feed-item-id", children: user.id.substring(0, 10) })] }), _jsx("span", { className: "user-diversity-label ".concat(diversityClass), children: isDiverse ? '✨ Diverse' : '🌿 Casual' })] }), _jsxs("div", { className: "tag-container", children: [_jsx("span", { className: "tags-prefix", children: "Tags:" }), user.tags.slice(0, maxTagsToShow).map(function (tag) { return (_jsx("span", { className: "tag", children: tag }, tag)); }), user.tags.length > maxTagsToShow && (_jsxs("span", { className: "tag", children: ["+", user.tags.length - maxTagsToShow, " more"] }))] })] }) }, user.id));
                }) })] }));
});
export default UserFeed;
