import mongoose from '../db'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    password: String,
    phone: Number,
    confirmPassword: String,
  });
  
  const MyModel = mongoose.model('users', userSchema);
  
  
  class Mongodb {
    constructor () {
  
    }
  // 查询--login
    query () {
       return new Promise((resolve, reject) => {
         MyModel.find({}, (err, res) => {
           if(err) {
             reject(err)
           }
           resolve(res)
         })
       })
    }
  // 注册 保存
    save (obj) {
       const m = new MyModel(obj)
       return new Promise((resolve, reject)=> {
        // 先查询 数据库中 是否有重复注册名
        MyModel.find({name: obj.name}, (err, res) => {
          if (err) {
            reject(err)
          } else {
            if (res.length === 0) { // 新注册
              m.save((err, res) => {
                if (err) {
                  reject(err)
                }
                resolve({
                    status: 200,
                    code: '000',
                    message: '注册成功',
                    data: {},
                })
              })
            } else { // 已注册过
              resolve({
                status: 200,
                code: '2145175461',
                message: '注册失败，当前注册名已存在，请输入新的注册名',
                data: {},
              })
            }
          }
        })
       })
       
    }
  }
  export default new Mongodb()
//   module.exports = new Mongodb()