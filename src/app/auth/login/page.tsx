import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="https://jumpapay.com" className="flex items-center gap-2 self-center font-medium">
          <Image
            src="/images/logo-jumpapay-primary.png"
            alt="JumpaPay Logo"
            className="mx-auto h-10 w-auto"
            width={100}
            height={50}
          />
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
