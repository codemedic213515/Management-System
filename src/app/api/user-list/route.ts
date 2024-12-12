// src/app/api/user-list/route.ts

import { NextResponse, NextRequest } from 'next/server'
import pool from '@/libs/db' // Adjust the path according to your structure
import bcrypt from 'bcrypt'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  console.log('Search Parameters:', searchParams)

  try {
    // Check if there are any search parameters
    if (!searchParams.has('id')) {
      // If no 'id' parameter, fetch all users
      const connection = await pool.getConnection() // Get a connection from the pool
      const [rows] = await connection.query('SELECT * FROM user') // Query the users table
      connection.release() // Release the connection back to the pool

      return NextResponse.json(rows) // Return all users as JSON
    } else {
      // If 'id' parameter exists, fetch user by ID
      const userId = searchParams.get('id') // Get user ID from query params

      if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
      }

      const connection = await pool.getConnection() // Get a connection from the pool
      const [rows] = await connection.query('SELECT * FROM user WHERE id = ?', [userId]) // Filter by user ID
      connection.release() // Release the connection back to the pool

      if (rows.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      return NextResponse.json(rows[0]) // Return the matched user as JSON
    }
  } catch (error) {
    console.error('Database query failed:', error)
    return NextResponse.json({ error: 'Failed to fetch user(s)' }, { status: 500 })
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json()
    const { name, email, password, avatar, country, role, username, contact, currentplan, status, avatarColor } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 })
    }

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const connection = await pool.getConnection()
    const query =
      'INSERT INTO user (name, email, password, avatar, country, role, username, contact, currentplan, status, avatarColor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const values = [
      name,
      email,
      hashedPassword, // Save the hashed password
      avatar,
      country,
      role,
      username,
      contact,
      currentplan,
      status,
      avatarColor
    ]

    const [result] = await connection.query(query, values)
    connection.release()

    return NextResponse.json({ message: 'User added successfully.', userId: result.insertId }, { status: 201 })
  } catch (error: any) {
    console.error('Failed to add user:', error.message)
    return NextResponse.json({ error: 'Failed to add user.', details: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url)
  console.log('Search Parameters:', searchParams)
  try {
    const userId = searchParams.get('id') // Get user ID from query params

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }
    const connection = await pool.getConnection() // Get a connection from the pool
    const [rows] = await connection.query('DELETE * FROM user WHERE id = ?', [userId]) // Filter by user ID
    connection.release() // Release the connection back to the pool

    return NextResponse.json([userId]) // Return the matched user as JSON
  } catch (error) {
    console.error('Database query failed:', error)
    return NextResponse.json({ error: 'Failed to delete user(s)' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  console.log('HTTP Method:', req.method)
  try {
    console.log('aa')
    const body = await req.json() // Parse the incoming JSON request body
    const { id, name, username, email, status, taxID, contact, language, country, suspend, password } = body

    // Validate that ID is provided
    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 })
    }

    const connection = await pool.getConnection()

    // Build dynamic update query
    const updates = []
    const values = []
    console.log('bb')
    if (name) {
      updates.push('name = ?'), values.push(name)
    }
    if (username) {
      updates.push('username = ?'), values.push(username)
    }
    if (email) {
      updates.push('email = ?'), values.push(email)
    }
    if (status) {
      updates.push('status = ?'), values.push(status)
    }
    if (taxID) {
      updates.push('taxID = ?'), values.push(taxID)
    }
    if (contact) {
      updates.push('contact = ?'), values.push(contact)
    }
    if (language) {
      updates.push('language = ?'), values.push(JSON.stringify(language)) // Store as JSON or adjust as necessary
    }
    if (country) {
      updates.push('country = ?'), values.push(country)
    }
    if (suspend) {
      updates.push('suspend = ?'), values.push(suspend)
    }
    if (password) {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      updates.push('password = ?'), values.push(hashedPassword)
    }
    // Add ID at the end of the values array for the WHERE clause
    values.push(id)

    // Execute update query only if there are fields to update
    if (updates.length > 0) {
      const queryString = `UPDATE user SET ${updates.join(', ')} WHERE id = ?`
      const [result] = await connection.query(queryString, values)

      connection.release()
      console.log('cc')
      if (result.affectedRows === 0) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }

      return NextResponse.json({ message: 'User updated successfully' }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'No fields to update' }, { status: 400 })
    }
  } catch (error) {
    console.error('Database query failed:', error)
    return NextResponse.json({ message: 'Failed to update user' }, { status: 500 })
  }
}
