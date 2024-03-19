export const metadata = {
  title: "Grayson and Aimee's Wedding",
  description: 'Hope you can make it!',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}