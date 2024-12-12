// src/lib/db.ts
import { createPool } from 'mysql2/promise'

const pool = createPool({
  host: process.env.DB_HOST, // Your database host
  user: process.env.DB_USER, // Your database user
  password: process.env.DB_PASSWORD, // Your database password
  database: process.env.DB_NAME // Your database name
})

export default pool
