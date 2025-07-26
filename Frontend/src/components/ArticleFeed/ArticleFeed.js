import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Card from '../Card/Card';
import './ArticleFeed.css';
export default React.memo(function ArticleFeed(_a) {
    var articles = _a.articles;
    var maxTagsToShow = 4;
    return (_jsxs(Card, { children: [_jsx("h2", { className: "feed-title", children: _jsxs("span", { children: [_jsx("span", { className: "feed-dot blue" }), "Live Article Feed"] }) }), _jsx("div", { className: "title-separator" }), _jsx("div", { className: "feed-content", children: articles.map(function (article, index) {
                    return (_jsx(Card, { className: "article-card", children: _jsxs("div", { className: "feed-item", children: [_jsx("h3", { className: "feed-item-title", children: article.title }), article.content && _jsx("p", { className: "feed-item-summary", children: article.content }), _jsxs("div", { className: "tag-container", children: [(article.llm_tags && article.llm_tags.length > 0 ? article.llm_tags : article.tags || []).slice(0, maxTagsToShow).map(function (tag) { return (_jsx("span", { className: "tag", children: tag }, tag)); }), (article.llm_tags && article.llm_tags.length > 0 ? article.llm_tags : article.tags || []).length > maxTagsToShow && (_jsxs("span", { className: "tag", children: ["+", (article.llm_tags && article.llm_tags.length > 0 ? article.llm_tags : article.tags || []).length - maxTagsToShow, " more"] }))] })] }) }, "".concat(article.id, "-").concat(index)));
                }) })] }));
});
