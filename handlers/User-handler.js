const { connect, disconnect } = require('../util/connect');
const { User } = require('../model/user');
var logger = require('morgan');

class UserRepository {

    constructor() {
        connect();
    }

    async getUser(user) {
        const users = await User.findOne({"username": user});
        console.log('users:::', users);
        return users;
    }

    async createUser(user) {
        let data = {};
        try {
            data = await User.create(user);
        } catch(err) {
            console.log('Error::' + err);
        }
        return data;
    }

    async updateUser(user,body) {
        let data = {};
        try {
            data = await User.updateOne(
               { "_id" : user },
               { $set: { "username" : body.username,"name": body.name, updatedAt: Date.now()}}
            );
         } catch (e) {
            print(e);
         }
        return data;
    }

    async deleteUser(Id) {
        let data = {};
        try {
            data = await User.deleteOne({_id : Id});
        } catch(err) {
            console.log('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

    async deleteAll() {
        let data = {};
        try {
            data = await User.deleteMany({});
        } catch(err) {
            console.log('Error::' + err);
        }
        return data;
    }

}

module.exports = new UserRepository();