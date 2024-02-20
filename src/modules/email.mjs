import { createTransport } from 'nodemailer'
import config from '../config.mjs'
const transport = createTransport(config.email)
export async function sendVerificationEmail(email, id, token) {
  await transport.sendMail({
    from: 'iks.mr2016@yandex.ru',
    to: 'iks.mr2016@yandex.ru',
    subject: 'Email verification',
    text: `http://localhost:3000/verificate/${id}/${token}`,
  })
}