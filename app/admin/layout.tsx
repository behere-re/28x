import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-nav mx-auto px-6 md:px-8 py-10 md:py-14">
      {children}
    </div>
  )
}
