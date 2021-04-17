const { ValidationError } = require("objection");
const Customer = require("../model/customer")
const User = require("../model/user")
const customerController = {
  create: async (req, res) => {
    try {
      const user = await User.query().findById(req.global.user_id).select("role");
      if (user.role == "banker"){
        const customer = await Customer.query().insert(req.body);
        return res.status(200).json({"data":{customer}})
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
      const customerId = parseInt(req.params.customer_id)
      const user = await User.query().findById(req.global.user_id).select("role")
      if (user.role == "banker"){
        const branchUpdated = await Customer.query().findById(customerId).patch(req.body);
        if (branchUpdated == 0){
            return  res.status(400).json({"msg": "Customer not Found"})
          }
        const customer = await Customer.query().findById(customerId)
        return res.status(200).json({"data":{customer}})
      }
      else{
        return res.status(404).json({"msg":"You don't have permission to perform this action"})
      }
  },
  delete: async (req, res) => {
    const customerId = parseInt(req.params.customer_id)
    const user = await User.query().findById(req.global.user_id).select("role")
      if (user.role == "banker"){
        const branchDeleted = await Customer.query().deleteById(customerId)
        return res.status(200).json({"msg":"Customer Deleted"})
      }
      else{
        return res.status(404).json({"msg":"You don't have permission to perform this action"})
      }
  },
  readById: async (req, res) => {
      const customerId = parseInt(req.params.customer_id)
      const user = await User.query().findById(req.global.user_id).select("role")
      if (user.role == "banker"){
        const customer = await Customer.query().findById(customerId)
        if ( customer===undefined){
          return res.status(404).json({"msg": "Not Found"})
        }
        return res.status(200).json({"data":{"item":{customer}}})
      }
      else{
        return res.status(404).json({"msg":"You don't have permission to perform this action"})
      }
  },
  readAllData:  async (req, res) => {
    const user = await User.query().findById(req.global.user_id).select("   role")
    if (user.role == "banker"){
        const customer = await Customer.query()
        return res.status(200).json({"data":{"items":{customer}}})
    }
    else{
        return res.status(404).json({"msg":"You don't have permission to perform this action"})
    }
  }
};
module.exports = customerController;
