'use strict';

var React = require('react');
var $ = require('jquery'); //for ajax et al
var APP = require('./components/App.jsx')

module.exports = React.renderComponent(<APP />, document.body);
