import bcrypt from 'bcryptjs'
import userData from './userdata'

export const queryLogin = async (name, password) => {
    let data = await userData.query();
    let nameList = data.map(item => item.name);
    if (nameList.includes(name)) {
        // 继续检查密码
        let pasHash = data[nameList.indexOf(name)].password;
        let checkPassWord = bcrypt.compareSync(password, pasHash); // 此处需要解密
        if (checkPassWord) {
            // 通过jwt生成token
            return {
                status: 200,
                code: '000',
                message: '登录成功',
                data: {},
            }
        } else {
            return {
                status: 200,
                code: '100',
                message: '密码错误,重新输入',
                data: {},
            }
        }
    } else {
        return {
            code: '200', // 没有账号，需要注册
            status: 200,
            message: '没有此账号，需要注册'
        }
    }
}

/**
 * 保存注册信息
 * 1. 密码加密
 * 2. 加密后保存入数据库
 *  */ 
export const saveUserInfo = async (userInfoObj) => {
    const password = userInfoObj.password;
    // 加密
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    const userObj = Object.assign({}, userInfoObj, {
        password: hashPassword,
        confirmPassword: hashPassword,
    })
    let dataResponse = await userData.save(userObj);
    // console.log(dataResponse, '--dataResponse'); // 返回的是处理之后的响应
    return dataResponse;
}