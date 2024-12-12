import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const { email } = await req.json()

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })

  try {
    const [rows] = await connection.execute('SELECT * FROM User WHERE email = ?', [email])

    if (Array.isArray(rows) && rows.length > 0) {
      const resetToken = crypto.randomBytes(20).toString('hex')
      const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

      await connection.execute('UPDATE User SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?', [
        resetToken,
        resetTokenExpiry,
        email
      ])

      // Send email with reset link
      const transporter = nodemailer.createTransport({
        // Configure your email service here
      })

      await transporter.sendMail({
        from: 'your-email@example.com',
        to: email,
        subject: 'Password Reset',
        text: `Click this link to reset your password: http://yourdomain.com/reset-password?token=${resetToken}`
      })

      return NextResponse.json({ message: 'Password reset email sent' })
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  } finally {
    await connection.end()
  }
}
