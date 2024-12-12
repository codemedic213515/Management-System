import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  console.log('email')

  // Create a MySQL connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })

  try {
    // Query the database for user credentials and status
    const [rows] = await connection.execute(
      'SELECT id, name, email, image, status, suspend FROM User WHERE email = ? AND password = ?',
      [email, password]
    )

    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0] as any

      // Check if the user's status is suspended
      if (user.suspend === 'true') {
        return NextResponse.json(
          {
            message: ['Your account is suspended. Please contact support.']
          },
          {
            status: 403, // Forbidden
            statusText: 'Account Suspended'
          }
        )
      }

      // If login is successful
      return NextResponse.json(user)
    } else {
      return NextResponse.json(
        {
          message: ['Email or Password is invalid']
        },
        {
          status: 401,
          statusText: 'Unauthorized Access'
        }
      )
    }
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      {
        message: ['An error occurred while processing your request']
      },
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    )
  } finally {
    await connection.end()
  }
}
