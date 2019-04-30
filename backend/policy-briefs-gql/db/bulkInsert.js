const bulkInsert = function(knex, tablename, rows) {
  let i = 0;
  let data = [];
  while (i < 100 && rows.length) {
    data.push(rows.pop());
    i++;
  }

  if (rows.length) {
    return knex(tablename)
      .insert(data)
      .then(_ => bulkInsert(knex, tablename, rows));
  } else {
    return knex(tablename).insert(data);
  }
};

module.exports.bulkInsert = bulkInsert;
