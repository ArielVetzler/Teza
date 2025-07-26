import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Card from '../Card/Card';
import './MatchStream.css';
var MatchStream = React.memo(function (_a) {
    var matches = _a.matches;
    return (_jsxs(Card, { children: [_jsx("h2", { className: "feed-title", children: _jsxs("span", { children: [_jsx("span", { className: "feed-dot orange" }), "Match Stream"] }) }), _jsx("div", { className: "title-separator" }), _jsx("div", { className: "feed-content", children: matches.map(function (match, index) {
                    return (_jsx(Card, { className: "match-card", children: _jsxs("div", { className: "feed-item", children: [_jsxs("p", { className: "feed-item-text", children: [_jsx("span", { className: "feed-item-bold", children: "Match! " }), " Article: ", _jsx("span", { className: "feed-item-link", children: match.article_name }), " & User: ", _jsx("span", { className: "feed-item-link", children: match.user_id.substring(0, 10) })] }), _jsxs("p", { className: "feed-item-text", children: [_jsx("span", { className: "feed-item-bold", children: "Score:" }), " ", _jsx("span", { className: "feed-item-score", children: match.score.toFixed(2) })] }), _jsxs("div", { className: "tag-container", children: [_jsx("span", { className: "feed-item-bold", children: "Matching Tags:" }), match.matched_tags.map(function (tag) { return (_jsx("span", { className: "tag green", children: tag }, tag)); })] })] }) }, "".concat(match.article_id, "-").concat(match.user_id, "-").concat(index)));
                }) })] }));
});
export default MatchStream;
