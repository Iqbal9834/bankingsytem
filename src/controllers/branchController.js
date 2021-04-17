const { ValidationError, DBError } = require("objection");
const Branch = require("../model/branch")
const User = require("../model/user")
const branchControllers = {
  create: async (req, res) => {
    try {
      const user = await User.query().findById(req.global.user_id).select("role")
      if (user.role == "banker"){
        const branch = await Branch.query().insert(req.body);
        return res.status(200).json({"data":{branch}})
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
      const branchId = parseInt(req.params.branch_id)
      const branchUpdated = await Branch.query().findById(branchId).patch(req.body);
      if (branchUpdated == 0){
        return  res.status(400).json({"msg": "Branch not Found"})
      }
      const branch = await Branch.query().findById(branchId)
      return res.status(200).json({"data":{branch}})
    }
    else{
      return res.status(404).json({"msg":"You don't have permission to perform this action"})
    }
  },
  delete: async (req, res) => {
    const user = await User.query().findById(req.global.user_id).select("role")
    if (user.role == "banker"){
      const branchId = parseInt(req.params.branch_id)
      const branchDeleted = await Branch.query().deleteById(branchId)
      return res.status(200).json({"msg":"Branch Deleted"})
    }
    else{
      return res.status(404).json({"msg":"You don't have permission to perform this action"})
    }
  },
  readById: async (req, res) => {
      const user = await User.query().findById(req.global.user_id)
      if (user.role == "banker"){
        const branchId = parseInt(req.params.branch_id)
        const branch = await Branch.query().findById(branchId)
        if ( branch===undefined){
          return res.status(404).json({"msg": "Not Found"})
        }
        return res.status(200).json({"data":{"item":{branch}}})
      }
      else{
        return res.status(404).json({"msg":"You don't have permission to perform this action"})
      }
  },
  readAllData:  async (req, res) => {
    const user = await User.query().findById(req.global.user_id).select("role")
    if (user.role == "banker"){
      const branch = await Branch.query().select("branchName", "branchCity", "assets")
      return res.status(200).json({"data":{"items":{branch}}})
    }
    else{
      return res.status(404).json({"msg":"You don't have permission to perform this action"})
    }
  }
};
module.exports = branchControllers;
