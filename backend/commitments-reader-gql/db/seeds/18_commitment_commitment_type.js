var bulkInsert = require("../bulkInsert.js").bulkInsert;

var commitmentCommitmentTypes = require("../../data/commitmentCommitmentTypes.json");
var cmps = commitmentCommitmentTypes.map(p => {
  return {
    commitment: p.CommitmentId,
    commitment_type: p.CommitmentTypeId
  };
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("commitment_commitment_type")
    .del()
    .then(_ => bulkInsert(knex, "commitment_commitment_type", cmps));
};
