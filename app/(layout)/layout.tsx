 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-primary-green">{children}</div>
  );
}