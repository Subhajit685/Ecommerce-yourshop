import nodemailer from "nodemailer"

const sendMail = async (option) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        service: process.env.SMTP_SERVICR,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.PASSWORD,
        },
    })

    const mailOption = {
        from: process.env.SMTP_MAIL,
        to: option.email,
        subject: option.subject,
        text: option.message,
    }
    try {

        await transporter.sendMail(mailOption)
    } catch (error) {
        console.log(error)
    }

}

export default sendMail