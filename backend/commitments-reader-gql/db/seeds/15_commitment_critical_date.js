var bulkInsert = require("../bulkInsert.js").bulkInsert;

var commitmentCriticalDates = require("../../data/commitmentCriticalDates.json");
var cmps = commitmentCriticalDates.map(p => {
  return {
    commitment: p.CommitmentId,
    critical_date: p.CriticalDateId
  };
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("commitment_critical_date")
    .del()
    .then(_ => bulkInsert(knex, "commitment_critical_date", cmps));
};
