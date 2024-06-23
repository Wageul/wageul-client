export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[600px] px-[20px] min-h-screen mx-auto bg-background">
      {children}
    </div>
  );
}
