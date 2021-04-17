const { Model } = require("objection");
const { AccountModel } = require("./account")
const { CustomerModel } = require("./customer")
class TransactionModel extends Model {
  static get tableName() {
    return "Transaction";
  }

  static get idColumn() {
    return ["id"];
  }

  static relationMappings = {
    accountId: {
      relation: Model.HasManyRelation,
      modelClass: AccountModel,
      join: {
        from: 'Transaction.id',
        to: 'Account.id'
      },
    }
  };

  static get jsonSchema() {
    return {
      type: "object",
      required: ["amount", "date", "type"],

      // Properties defined as objects or arrays are
      // automatically converted to JSON strings when
      // writing to database and back to objects and arrays
      // when reading from database. To override this
      // behaviour, you can override the
      // User.jsonAttributes property.

      properties: {
        id: { type: "string" },
        date: { type: "date"},
        type: {
          type: "string",
          enum: ["withdrawal", "deposit"],
        },
        amount: { type: "number"}
      },
    };
  }
}

module.exports = TransactionModel;
