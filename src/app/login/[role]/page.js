import LoginForm from "@/components/auth/LoginForm";

export default async function RoleLoginPage({ params }) {
  const { role } = await params;
  return <LoginForm role={role} />;
}
