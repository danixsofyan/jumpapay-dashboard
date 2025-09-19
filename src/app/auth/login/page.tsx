import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="https://jumpapay.com" className="flex items-center gap-2 self-center font-medium">
          <img
            src="https://jumpapay.com/assets/images/logo.png"
            alt="JumpaPay Logo"
            className="mx-auto h-10 w-auto"
          />
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
