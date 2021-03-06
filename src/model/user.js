const { Model } = require("objection");

class UserModel extends Model {
  static get tableName() {
    return "User";
  }

  static get idColumn() {
    return ["id"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["full_name", "email", "mobileNumber", "role", "password"],

      // Properties defined as objects or arrays are
      // automatically converted to JSON strings when
      // writing to database and back to objects and arrays
      // when reading from database. To override this
      // behaviour, you can override the
      // User.jsonAttributes property.

      properties: {
        id: { type: "string" },
        full_name: { type: "string" },
        email: { type: "string", index: { unique: true } },
        password: {
          type: "string",
        },
        mobileNumber: { type: "string" },
        role: {
          type: "string",
          enum: ["customer", "banker"],
          default: "customer",
        },
      },
    };
  }
}

module.exports = UserModel;
