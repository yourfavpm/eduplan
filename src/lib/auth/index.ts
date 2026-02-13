import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
        ? SupabaseAdapter({
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
        })
        : undefined,
    providers: [
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
            ? [GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            })]
            : []),
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // TODO: Implement email/password authentication
                // For now, return null (will be implemented later)
                return null
            }
        })
    ],
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/auth/error',
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user && token.role) {
                session.user.role = token.role as string
            }
            return session
        }
    }
})
