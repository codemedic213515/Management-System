// app/api/auth/register/route.ts

import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json()

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
    }

    // Connect to the database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    })
    // Check if user already exists
    const [existingUsers] = await connection.execute('SELECT * FROM User WHERE email = ?', [email])

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert new user into the database
    await connection.execute('INSERT INTO User (name, email, password) VALUES (?, ?, ?)', [
      username,
      email,
      hashedPassword
    ])

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 })
  }
}
