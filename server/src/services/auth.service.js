const DB = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
    users = DB.Users;

    async login(data) {

        if(!data) {
            throw HttpException(400, "You're not data");
        }

        const findUser = await this.findUserByEmail(data.email).catch(err => console.log(err));

        if (!findUser) {
            throw HttpException(400, "User not found");
        }

        const comparePassword = await this.comparePassword({
            password: data.password,
            hashedPassword: findUser.password
        });

        if (!comparePassword) HttpException(400, "You're password not matching");

        const { token } = this.createToken(findUser);
        return { token, user: { id: findUser.id, email: findUser.email, role: findUser.role } };
    }

    async findUserByEmail(email) {
        const findUser = await this.users.findOne({
            where: {
                email
            }
        }).catch(err => console.log(err));

        return findUser;
    }

    async comparePassword(data) {
        if(!data) {
            throw HttpException(400, "You're not password");
        }

        return await bcrypt.compare(
            data.password,
            data.hashedPassword
        );
    }

    createToken(user) {
        const store = { id: user.id, email: user.email, role: user.role};
        const secret = process.env.JWT_SECRET;
        const expiresIn = "24h";

        return {
            expiresIn,
            token: `Bearer ${jwt.sign(store, secret, {expiresIn})}`
        }
    }
}

module.exports = AuthService;
