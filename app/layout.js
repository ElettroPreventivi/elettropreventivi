export const metadata = {
  title: 'ElettroPreventivi',
  description: 'Preventivi elettrici assistiti da IA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body style={{
        margin: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#F3F1EA',
        color: '#1B1D1F',
        minHeight: '100vh',
      }}>
        {children}
      </body>
    </html>
  );
}
