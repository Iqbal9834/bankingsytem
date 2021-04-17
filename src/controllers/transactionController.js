const { ValidationError} = require("objection");
const Account = require("../model/account");
const Transaction = require("../model/transaction");
const User = require("../model/user")
const get_current_datetime = require("../util/datetime")
const transactionControllers = {
  create: async (req, res) => {
    try {
      const accountNumber = req.body.accountNumber
      delete req.body.accountNumber
      req.body["amount"] = parseInt(req.body.amount)
      const user = await User.query().findById(req.global.user_id).select("role")
      const account = await Account.query().findOne({accountNumber:accountNumber}).select("id","balance")
      req.body["account_id"] = account.id
      if (req.body.amount>account.balance && req.body.type=='withdrawal'){
          return res.status(400).json({"msg":"no sufficient balance"})
      }
      if (user.role == "banker"){
        const now = get_current_datetime()
        req.body["date"]=now
        const transaction = await Transaction.query().insert(req.body);
        if (req.body.type=='withdrawal'){
            const remainBalance = account.balance-req.body.amount;
            await Account.query().findOne({accountNumber:accountNumber}).patch({balance:remainBalance})
          }
        else{
            const remainBalance = account.balance+req.body.amount
            await Account.query().findOne({accountNumber:accountNumber}).patch({balance:remainBalance})
        }
        
        return res.status(200).json({"data":{transaction}})
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
      const transactionId = parseInt(req.params.transaction_id)
      const branchUpdated = await Transaction.query().findById(transactionId).patch(req.body);
      if (branchUpdated == 0){
        return  res.status(400).json({"msg": "Transaction not Found"})
      }
      const transaction = await Transaction.query().findById(transactionId)
      return res.status(200).json({"data":{transaction}})
    }
    else{
      return res.status(404).json({"msg":"You don't have permission to perform this action"})
    }
  },
  delete: async (req, res) => {
    const user = await User.query().findById(req.global.user_id).select("role")
    if (user.role == "banker"){
      const transactionId = parseInt(req.params.transaction_id)
      const branchDeleted = await Transaction.query().deleteById(transactionId)
      return res.status(200).json({"msg":"Transaction Deleted"})
    }
    else{
      return res.status(404).json({"msg":"You don't have permission to perform this action"})
    }
  },
  readById: async (req, res) => {
      const user = await User.query().findById(req.global.user_id)
      if (user.role == "banker"){
        const transactionId = parseInt(req.params.transaction_id)
        const transaction = await Transaction.query().findById(transactionId)
        if ( transaction===undefined){
          return res.status(404).json({"msg": "Not Found"})
        }
        return res.status(200).json({"data":{"item":{transaction}}})
      }
      else{
        return res.status(404).json({"msg":"You don't have permission to perform this action"})
      }
  }
}
module.exports = transactionControllers;
