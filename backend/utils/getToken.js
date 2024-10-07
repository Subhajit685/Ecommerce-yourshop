import JWT from "jsonwebtoken"

const getToken = (id, res) => {
    const token = JWT.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1d" })

    res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict", // prevents CSRF
        secure: "true", // use HTTPS in production
    })

    return token
}

export default getToken
