var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var reduce = function (row, memo) {
  memo = {
    loads: memo.loads || 0,
    impressions: memo.impressions || 0,
    displays: memo.displays || 0,
    loadRate: memo.loadRate || 0,
    displayRate: memo.displayRate || 0
  }
  memo.loads = row.type === 'load' ? memo.loads + 1 : memo.loads
  memo.impressions = row.type === 'impression' ? memo.impressions + 1 : memo.impressions
  memo.displays = row.type === 'display' ? memo.displays + 1 : memo.displays
  memo.loadRate = memo.loads / memo.impressions
  memo.displayRate = memo.displays / memo.loads
  return memo
}

var calculations = [
  {
    title: 'Impressions',
    value: 'impressions',
    template: function (val, row) {
      return row.impressions
    },
    sortBy: function (row) {
      return isNaN(row.impressions) ? 0 : row.impressions
    }
  },
  {
    title: 'Loads',
    value: 'loads',
    template: function (val, row) {
      return row.loads
    },
    sortBy: function (row) {
      return isNaN(row.loads) ? 0 : row.loads
    }
  },
  {
    title: 'Displays',
    value: 'displays',
    template: function (val, row) {
      return row.displays
    },
    sortBy: function (row) {
      return isNaN(row.displays) ? 0 : row.displays
    }
  },
  {
    title: 'Load Rate',
    value: 'loadRate',
    template: function (val, row) {
      return (row.loadRate * 100).toFixed(1) + '%'
    },
    sortBy: function (row) {
      return isNaN(row.loadRate) ? 0 : row.loadRate
    }
  },
  {
    title: 'Display Rate',
    value: 'displayRate',
    template: function (val, row) {
      return (row.displayRate * 100).toFixed(1) + '%'
    },
    sortBy: function (row) {
      return isNaN(row.displayRate) ? 0 : row.displayRate
    }
  }
]

var dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'}
]

module.exports = createReactClass({
  render () {
    return (
      <ReactPivot
        rows={rows}
        dimensions={dimensions}
        reduce={reduce}
        calculations={calculations}
      />
    )
  }
})
