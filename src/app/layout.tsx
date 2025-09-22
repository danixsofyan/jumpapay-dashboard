import { ModeToggle } from '@/components/mode-toggle'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { Plus_Jakarta_Sans } from 'next/font/google'
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata = {
  title: 'Dashboard',
  description: 'Jumpapay Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.className} bg-slate-50 dark:bg-black`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <div className="fixed bottom-4 right-4 z-50">
            <ModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}