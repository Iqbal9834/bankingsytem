exports.up = function (knex) {
  return knex.schema.createTable("User", function (table) {
    table.increments("id").primary().unsigned();
    table.timestamps(true, true);
    table.string("full_name", 26).notNullable()
    table.string("email", 255).unique().notNullable()
    table.string("password", 256).notNullable()
    table.string("mobileNumber", 12).unique().notNullable()
    table.string("address", 255).notNullable()
    table.enu("role", ["customer", "banker"]).notNullable();
  }).then(() => {
    console.log('User Table is Created!');
  })
}

exports.down = function (knex) {};
