export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[600px] mx-auto border-x border-grey-2">
      {children}
    </div>
  );
}
