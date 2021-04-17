const { Model } = require("objection");

class CustomerModel extends Model {
  static get tableName() {
    return "Customer";
  }

  static get idColumn() {
    return ["id"];
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["customerName", "customerStreet", "customerCity", "customerPhone", "customerEmail"],

      // Properties defined as objects or arrays are
      // automatically converted to JSON strings when
      // writing to database and back to objects and arrays
      // when reading from database. To override this
      // behaviour, you can override the
      // User.jsonAttributes property.

      properties: {
        id: { type: "string" },
        customerPhone: { type: "string" },
        customerEmail: { type: "string" },
        customerName: { type: "string" },
        customerStreet: { type: "string" },
        customerCity: { type: "string" },
      },
    };
  }
}

module.exports = CustomerModel;
