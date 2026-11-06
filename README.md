# serviQ Frontend

## Setup
1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_API_URL=http://localhost:5000/api` for local backend development.
3. Run `npm install` and `npm run dev`.

## Role-specific sign in
- `/login/customer`
- `/login/provider`
- `/login/admin`

The login endpoint verifies the requested role. A customer cannot sign in through the provider or administrator portal, and role switching is not available inside the workspace. Administrator accounts must be provisioned privately; public registration supports customers and service providers only.
