const { ValidationError, DBError } = require("objection");
const Account = require("../model/account")
const User = require("../model/user")
const customId = require("custom-id");
const Branch = require("../model/branch");
const Customer = require("../model/customer");
const Transaction = require("../model/transaction")
const accountController = {
  create: async (req, res) => {
    try {
      branchId = parseInt(req.params.branch_id)
      const user = await User.query().findById(req.global.user_id).select("role")
      if (!req.body.customerEmail){
        throw  ValidationError("customerEmail is required property")
      }
      if (user.role == "banker"){
        req.body["accountNumber"] = customId({})
        const branch = await Branch.query().findById(branchId).select("id")
        const customer = await Customer.query().findOne({customerEmail:req.body.customerEmail}).select("id")
        delete req.body.customerEmail
        req.body["branch_id"] = branch.id 
        req.body["customer_id"] = customer.id
        const customerAccountExists = await Account.query().findOne({customer_id:customer.id}).select("id")
        if (customerAccountExists instanceof Object){
          return res.status(400).json({"msg":"Account for this customer already created"})
        }
        const account = await Account.query().insertGraph(req.body)
        return res.status(200).json({"data":{account}})
      }
      else{
        return res.status(404).json({"msg":"You don't have permission to perform this action"})
      }
    } catch (error) {
        if (error instanceof ValidationError){
            res.status(400).json({"err": error.message})
        }
      return console.error(error);
    }
  },
  update: async (req, res) => {
    const user = await User.query().findById(req.global.user_id).select("role")
    if (user.role == "banker"){
      const accountId = parseInt(req.params.account_id)
      const accountUpdated = await Account.query().findById(accountId).patch(req.body);
      if (accountUpdated == 0){
        return  res.status(400).json({"msg": "Account not Found"})
      }
      const account = await Account.query().findById(accountId)
      return res.status(200).json({"data":{account}})
    }
    else{
      return res.status(404).json({"msg":"You don't have permission to perform this action"})
    }
  },
  delete: async (req, res) => {
    const user = await User.query().findById(req.global.user_id).select("role")
    if (user.role == "banker"){
      const accountId = parseInt(req.params.account_id)
      const branchDeleted = await Account.query().deleteById(accountId)
      return res.status(200).json({"msg":"Account Deleted"})
    }
    else{
      return res.status(404).json({"msg":"You don't have permission to perform this action"})
    }
  },
  readById: async (req, res) => {
      const user = await User.query().findById(req.global.user_id).select("role")
      if (user.role == "banker"){
        const accountId = parseInt(req.params.account_id)
        const account = await Account.query().findById(accountId)
        if ( account===undefined){
          return res.status(404).json({"msg": "Not Found"})
        }
        return res.status(200).json({"data":{"item":{account}}})
      }
      else{
        return res.status(404).json({"msg":"You don't have permission to perform this action"})
      }
  },
  readTransactionById: async(req, res)=>{
    const user = await User.query().findById(req.global.user_id).select("role")
      if (user.role == "banker"){
        const accountId = parseInt(req.params.account_id)
        const account = await  Account.query().findById(accountId)
        if ( account===undefined){
          return res.status(404).json({"msg": "Incorrect account id"})
        }
        const transaction = await Transaction.query().where({account_id:accountId})
        return res.status(200).json({"data":{"item":{transaction}}})
      }
      else{
        return res.status(404).json({"msg":"You don't have permission to perform this action"})
      }
  },
  readAllData:  async (req, res) => {
    const user = await User.query().findById(req.global.user_id).select("role")
    if (user.role == "banker"){
      const account = await Account.query()
      return res.status(200).json({"data":{"items":{account}}})
    }
    else{
      return res.status(404).json({"msg":"You don't have permission to perform this action"})
    }
  }
};
module.exports = accountController;
