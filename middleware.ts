import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      
      // Correctly checks for "dashboard"
      if (req.nextUrl.pathname.startsWith("/admin"))
        return token?.user.role === "admin" || token?.user?.role === "superadmin";

      // For any other routes, check if token exists
      return !!token;
    },
  },
});

// Correct matcher configuration
export const config = { matcher: ["/admin/:path*"] };
