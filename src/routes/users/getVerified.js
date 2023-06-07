import nodemailer from 'nodemailer';
import db from '~/db';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noreplyMqmusic@gmail.com',
      pass: process.env.MAIL_PASSWORD
    }
});

async function getVerified (req, res) {
    const { userId } = req.params;
    const { type, category, socials, username } = req.body;
    console.log(userId, type, category, socials);

    const data = `${type}, ${category}, ${socials}`

    var mailOptions = {
        from: 'noreplyMqmusic@gmail.com',
        to: 'muqoco@gmail.com',
        subject: `Verification request for user ${userId}`,
        text: `Info: username: ${username}, type: ${type}, category: ${category}, ${socials}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

    return db.query({
      text: `update app_user set
        pending_verification = true,
        socials = $2
        where id = $1;
  `,
      values: [userId, data],
    });

    //await res.status(200).end();
}

export default getVerified;