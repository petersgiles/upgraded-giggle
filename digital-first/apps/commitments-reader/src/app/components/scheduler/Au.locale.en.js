/*

Bryntum Scheduler (TRIAL VERSION) 2.0.0
Copyright(c) 2019 Bryntum AB
https://bryntum.com/contact
https://bryntum.com/license

*/
!(function(e, n) {
    'object' == typeof exports && 'object' == typeof module
      ? (module.exports = n())
      : 'function' == typeof define && define.amd
      ? define('En', [], n)
      : 'object' == typeof exports
      ? (exports.En = n())
      : ((e.bryntum = e.bryntum || {}),
        (e.bryntum.locales = e.bryntum.locales || {}),
        (e.bryntum.locales.En = n()))
  })(window, function() {
    return (function(e) {
      var n = {}
      function t(r) {
        if (n[r]) return n[r].exports
        var o = (n[r] = { i: r, l: !1, exports: {} })
        return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports
      }
      return (
        (t.m = e),
        (t.c = n),
        (t.d = function(e, n, r) {
          t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: r })
        }),
        (t.r = function(e) {
          'undefined' != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(e, '__esModule', { value: !0 })
        }),
        (t.t = function(e, n) {
          if ((1 & n && (e = t(e)), 8 & n)) return e
          if (4 & n && 'object' == typeof e && e && e.__esModule) return e
          var r = Object.create(null)
          if (
            (t.r(r),
            Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
            2 & n && 'string' != typeof e)
          )
            for (var o in e)
              t.d(
                r,
                o,
                function(n) {
                  return e[n]
                }.bind(null, o)
              )
          return r
        }),
        (t.n = function(e) {
          var n =
            e && e.__esModule
              ? function() {
                  return e.default
                }
              : function() {
                  return e
                }
          return t.d(n, 'a', n), n
        }),
        (t.o = function(e, n) {
          return Object.prototype.hasOwnProperty.call(e, n)
        }),
        (t.p = ''),
        t((t.s = 4))
      )
    })({
      4: function(e, n, t) {
        'use strict'
        t.r(n)
        var r = {
            localeName: 'En',
            localeDesc: 'English',
            TemplateColumn: {
              noTemplate: 'TemplateColumn needs a template',
              noFunction: 'TemplateColumn.template must be a function'
            },
            ColumnStore: {
              columnTypeNotFound: function(e) {
                return "Column type '".concat(e.type, "' not registered")
              }
            },
            InstancePlugin: {
              fnMissing: function(e) {
                return 'Trying to chain fn '
                  .concat(e.plugIntoName, '#')
                  .concat(e.fnName, ', but plugin fn ')
                  .concat(e.pluginName, '#')
                  .concat(e.fnName, ' does not exist')
              },
              overrideFnMissing: function(e) {
                return 'Trying to override fn '
                  .concat(e.plugIntoName, '#')
                  .concat(e.fnName, ', but plugin fn ')
                  .concat(e.pluginName, '#')
                  .concat(e.fnName, ' does not exist')
              }
            },
            ColumnPicker: {
              columnsMenu: 'Columns',
              hideColumn: 'Hide column',
              hideColumnShort: 'Hide'
            },
            Filter: {
              applyFilter: 'Apply filter',
              filter: 'Filter',
              editFilter: 'Edit filter',
              on: 'On',
              before: 'Before',
              after: 'After',
              equals: 'Equals',
              lessThan: 'Less than',
              moreThan: 'More than',
              removeFilter: 'Remove filter'
            },
            FilterBar: {
              enableFilterBar: 'Show filter bar',
              disableFilterBar: 'Hide filter bar'
            },
            Group: {
              groupAscending: 'Group ascending',
              groupDescending: 'Group descending',
              groupAscendingShort: 'Ascending',
              groupDescendingShort: 'Descending',
              stopGrouping: 'Stop grouping',
              stopGroupingShort: 'Stop'
            },
            Search: { searchForValue: 'Search for value' },
            Sort: {
              sortAscending: 'Sort ascending',
              sortDescending: 'Sort descending',
              multiSort: 'Multi sort',
              removeSorter: 'Remove sorter',
              addSortAscending: 'Add ascending sorter',
              addSortDescending: 'Add descending sorter',
              toggleSortAscending: 'Change to ascending',
              toggleSortDescending: 'Change to descending',
              sortAscendingShort: 'Ascending',
              sortDescendingShort: 'Descending',
              removeSorterShort: 'Remove',
              addSortAscendingShort: '+ Ascending',
              addSortDescendingShort: '+ Descending'
            },
            Tree: {
              noTreeColumn:
                'To use the tree feature one column must be configured with tree: true'
            },
            Grid: {
              featureNotFound: function(e) {
                return "Feature '".concat(
                  e,
                  "' not available, make sure you have imported it"
                )
              },
              invalidFeatureNameFormat: function(e) {
                return "Invalid feature name '".concat(
                  e,
                  "', must start with a lowercase letter"
                )
              },
              removeRow: 'Delete row',
              removeRows: 'Delete rows',
              loadMask: 'Loading...',
              loadFailedMessage: 'Data loading failed.',
              moveColumnLeft: 'Move to left section',
              moveColumnRight: 'Move to right section'
            },
            Field: {
              invalidValue: 'Invalid field value',
              minimumValueViolation: 'Minimum value violation',
              maximumValueViolation: 'Maximum value violation',
              fieldRequired: 'This field is required',
              validateFilter: 'Value must be selected from the list'
            },
            DateField: { invalidDate: 'Invalid date input' },
            TimeField: { invalidTime: 'Invalid time input' },
            DateHelper: {
              locale: 'en-AU',
              shortWeek: 'W',
              shortQuarter: 'q',
              week: 'Week',
              weekStartDay: 0,
              unitNames: [
                { single: 'millisecond', plural: 'ms', abbrev: 'ms' },
                { single: 'second', plural: 'seconds', abbrev: 's' },
                { single: 'minute', plural: 'minutes', abbrev: 'min' },
                { single: 'hour', plural: 'hours', abbrev: 'h' },
                { single: 'day', plural: 'days', abbrev: 'd' },
                { single: 'week', plural: 'weeks', abbrev: 'w' },
                { single: 'month', plural: 'months', abbrev: 'mon' },
                { single: 'quarter', plural: 'quarters', abbrev: 'q' },
                { single: 'year', plural: 'years', abbrev: 'yr' }
              ],
              unitAbbreviations: [
                ['mil'],
                ['s', 'sec'],
                ['m', 'min'],
                ['h', 'hr'],
                ['d'],
                ['w', 'wk'],
                ['mo', 'mon', 'mnt'],
                ['q', 'quar', 'qrt'],
                ['y', 'yr']
              ]
            },
            BooleanCombo: { Yes: 'Yes', No: 'No' }
          },
          o = {
            ExcelExporter: { 'No resource assigned': 'No resource assigned' },
            Dependencies: {
              from: 'From',
              to: 'To',
              valid: 'Valid',
              invalid: 'Invalid',
              'Checking…': 'Checking…'
            },
            EventEdit: {
              Name: 'Name',
              Resource: 'Commitment',
              Start: 'Start',
              End: 'End',
              Save: 'Save',
              Delete: 'Delete',
              Cancel: 'Cancel',
              'Edit event': 'Edit event'
            },
            Scheduler: {
              addEvent: 'Add event',
              deleteEvent: 'Delete event',
              unassignEvent: 'Unassign event'
            },
            HeaderContextMenu: {
              pickZoomLevel: 'Zoom',
              activeDateRange: 'Date range',
              startText: 'Start date',
              endText: 'End date',
              todayText: 'Today'
            },
            EventFilter: { filterEvents: 'Filter tasks', byName: 'By name' },
            TimeRanges: { showCurrentTimeLine: 'Show current timeline' },
            PresetManager: {
              minuteAndHour: { topDateFormat: 'ddd DD/MM, hA' },
              hourAndDay: { topDateFormat: 'ddd DD/MM' },
              weekAndDay: { displayDateFormat: 'hh:mm A' , middleDateFormat: 'MMM YYYY' },
            }
          }
        for (var i in r) o[i] = r[i]
        n.default = o
      }
    }).default
  })
  