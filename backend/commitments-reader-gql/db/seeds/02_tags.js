var tags = require("./tags.json");
var commitmentTypes = require("../../data/commitmentTypes.json");
var criticalDates = require("../../data/criticalDates.json");
var portfolios = require("../../data/portfolios.json");

var parents = tags.filter(t => !t.parent);
var portfolioGroup = portfolios.map(_ => ({
  parent: "portfolio-group",
  id: _.Id,
  title: _.Name
}));

var criticalDateGroup = criticalDates.map(_ => ({
  parent: "critical-date-group",
  id: _.Id,
  title: _.Name
}));

var commitmentTypeGroup = commitmentTypes.map(_ => ({
  parent: "commitment-type-group",
  id: _.Id,
  title: _.Name
}));

var statusGroup = tags.filter(t => t.parent === "status-group");
var partyGroup = tags.filter(t => t.parent === "party-group");
var statesGroup = tags.filter(t => t.parent === "states-group");
var electorateGroups = statesGroup
  .map(s => s.id)
  .reduce((acc, item) => {
    acc[item] = tags.filter(t => t.parent === item);
    return acc;
  }, {});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("tag")
    .del()
    .then(_ => knex("tag").insert(parents))
    .then(_ => knex("tag").insert(criticalDateGroup))
    .then(_ => knex("tag").insert(portfolioGroup))
    .then(_ => knex("tag").insert(statesGroup))
    .then(_ => knex("tag").insert(electorateGroups["ACT"]))
    .then(_ => knex("tag").insert(electorateGroups["NSW"]))
    .then(_ => knex("tag").insert(electorateGroups["NT"]))
    .then(_ => knex("tag").insert(electorateGroups["Qld"]))
    .then(_ => knex("tag").insert(electorateGroups["WA"]))
    .then(_ => knex("tag").insert(electorateGroups["VIC"]))
    .then(_ => knex("tag").insert(electorateGroups["TAS"]))
    .then(_ => knex("tag").insert(commitmentTypeGroup));
};
