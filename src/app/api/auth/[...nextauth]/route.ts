import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'
import mysql from 'mysql2/promise'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null // Return null if email or password is not provided
        }

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
            'SELECT id, name, email, avatar, password,status, suspend FROM User WHERE email = ?',
            [credentials.email]
          )

          if (Array.isArray(rows) && rows.length > 0) {
            const user = rows[0]

            // Check if the user's account is suspended
            if (user.suspend === 'true') {
              return null // Prevent login for suspended accounts
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
            if (isPasswordValid) {
              return { id: user.id, name: user.name, email: user.email }
            }
          }
        } catch (error) {
          console.error('Database error:', error)
        } finally {
          await connection.end() // Ensure connection is closed
        }

        return null // Return null if no valid user is found or password is incorrect
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
    updateAge: 60 * 60
  }
})

export { handler as GET, handler as POST }
