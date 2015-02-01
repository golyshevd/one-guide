'use strict';

var BaseAdapter = /** @type BaseAdapter */ require('./base-adapter');
var Config = require('eslint/lib/config');

var eslint = require('eslint');
var inherit = require('inherit');
var linter = eslint.linter;

/**
 * @class EslintAdapter
 * @extends BaseAdapter
 * */
var EslintAdapter = inherit(BaseAdapter, /**@lends EslintAdapter.prototype */ {

    /**
     * @private
     * @memberOf {EslintAdapter}
     * @method
     *
     * @param {Object} params
     * @param {String} params.configFile
     *
     * @constructs
     * */
    __constructor: function (params) {
        this.__base(params);
        this.config = new Config({
            configFile: this.params.configFile
        }).useSpecificConfig;
    },

    /**
     * @public
     * @memberOf {EslintAdapter}
     * @method
     *
     * @param {Buffer|String} content
     * @param {String} filename
     *
     * @returns {Array}
     * */
    findFileIssues: function (content, filename) {
        return linter.verify(content, this.config, filename);
    },

    /**
     * @public
     * @memberOf {EslintAdapter}
     * @method
     *
     * @param {Object} issue
     * @param {String} filename
     *
     * @returns {Object}
     * */
    formatFileIssue: function (issue, filename) {
        delete issue.node;
        delete issue.source;
        delete issue.ruleId;
        issue.filename = filename;
        return issue;
    }
});

module.exports = EslintAdapter;