var bulkInsert = require("../bulkInsert.js").bulkInsert;

var commitmentPortfolios = require("../../data/commitmentPortfolios.json");
var cmps = commitmentPortfolios.map(p => {
  return {
    commitment: p.CommitmentId,
    responsible_portfolio: p.CommitmentPortfolioId
  };
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("commitment_responsible_portfolio")
    .del()
    .then(_ => bulkInsert(knex, "commitment_responsible_portfolio", cmps));
};
