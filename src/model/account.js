const { Model } = require("objection");
const { BranchModel } = require("./branch")
const { CustomerModel } = require("./customer")

class AccountModel extends Model {
  static get tableName() {
    return "Account";
  }

  static get idColumn() {
    return ["id"];
  }

  static relationMappings = {
    branch: {
      relation: Model.HasOneRelation,
      modelClass: BranchModel,
      join: {
        from: 'Account.id',
        to: 'Branch.id'
      }
    }
  }
  static relationMappings = {
    customer: {
      relation: Model.HasOneRelation,
      modelClass: CustomerModel,
      join: {
        from: 'Account.id',
        to: 'Customer.id'
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["accountNumber", "accountName"],

      // Properties defined as objects or arrays are
      // automatically converted to JSON strings when
      // writing to database and back to objects and arrays
      // when reading from database. To override this
      // behaviour, you can override the
      // User.jsonAttributes property.

      properties: {
        id: { type: "string" },
        accountNumber: { type: "string" },
        accountName: { type: "string" },
        balance: { type: "number", default:0 }

      },
    };
  }
}

module.exports = AccountModel;
