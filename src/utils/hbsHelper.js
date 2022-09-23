const formatString = require('./format-str')
const hbs = require('hbs')
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('ifNotEquals', function(arg1, arg2, options) {
    return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('ifLessThan', function(arg1, arg2, options) {
    return (arg1 < arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('formatTime', function (date) {
    return formatString.formatDate(date);
});
hbs.registerHelper('formatTimeForEdit', function (date) {
    return formatString.formatDateForEdit(date);
});
hbs.registerHelper('cutString', function (str, len) {
    return formatString.cutString(str, len);
});
hbs.registerHelper('substring', function (str, len) {
    if (str == undefined) return '';
    return str.substring(0, len);
});
hbs.registerHelper('formatUrl', function (str) {
    return formatString.formatUrl(str);
});
hbs.registerHelper('for', function(from, to, incr, block) {
    var accum = '';
    for(var i = from; i < to; i += incr)
        accum += block.fn(i);
    return accum;
});
hbs.registerHelper('setVar', function(varName, varValue, options) {
    options.data.root[varName] = varValue;
});
hbs.registerHelper('plus', function(var1, var2) {
    return Number(var1) + Number(var2);
});

hbs.registerHelper('tolower', function(var1) {
    return var1.toLowerCase();
});

hbs.registerHelper('ifTextContent', function(var1, var2, options) {
    return (var1.includes(var2)) ? options.fn(this) : options.inverse(this);
});