exports.up = function(knex) {
    return knex.schema.createTable("Branch", function (table) {
        table.increments("id").primary().unsigned();
        table.timestamps(true, true);
        table.string("branchName", 50).notNull();
        table.string("branchCity", 120).notNull();
        table.float("assets")
      })
      .createTable("Customer", function (table) {
        table.increments("id").primary().unsigned();
        table.timestamps(true, true);
        table.string("customerPhone", 12).notNull();
        table.string("customerEmail", 255).unique()
        table.string("customerName", 20).notNull();
        table.string("customerStreet", 95).notNull();
        table.string("customerCity", 35).notNull();
      })
      .createTable("Account", function (table) {
        table.increments("id").primary().unsigned();
        table.timestamps(true, true);
        table.string("accountNumber", 18).notNull();
        table.string("accountName", 255).notNull()
        table.float("balance").notNull()
        table.integer("branch_id").references('id')
        table.integer("customer_id").references('id')
      })
      .createTable("Transaction", function (table) {
        table.increments("id").primary().unsigned();
        table.timestamps(true, true);
        table.dateTime("date").notNull()
        table.float("amount").notNull()
        table.integer("account_id").references("id").notNull()
        table.enu("type", ["withdrawal", "deposit"]).notNull();
      }).then(() => {
        console.log('Transaction Table is Created!');
      })
};


exports.down = function(knex) {
  
};
