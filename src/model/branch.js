const { Model } = require("objection");

class BranchModel extends Model {
  static get tableName() {
    return "Branch";
  }

  static get idColumn() {
    return ["id"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["branchName", "branchCity", "assets"],

      // Properties defined as objects or arrays are
      // automatically converted to JSON strings when
      // writing to database and back to objects and arrays
      // when reading from database. To override this
      // behaviour, you can override the
      // User.jsonAttributes property.

      properties: {
        id: { type: "string" },
        branchName: { type: "string" },
        branchCity: { type: "string" },
        assets: { type: "number"}
      },
    };
  }
}

module.exports = BranchModel;
