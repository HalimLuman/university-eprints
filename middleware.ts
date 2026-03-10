import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token }) => !!token, // allow any logged-in user
  },
});

export const config = {
  matcher: [
    "/api/eprint/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/deposit/:path*",
  ],
};
