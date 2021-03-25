exports.up = function (knex) {
  return knex.schema.createTable("user", function (table) {
    table.increments("id").primary();
    table.timestamps();
    table.string("full_name"),
    table.string("email");
    table.string("password"),
    table.string("mobileNumber"),
    table.string("address");
    table.enu("role", ["customer", "banker"]).notNullable();
  });
};

exports.down = function (knex) {};
