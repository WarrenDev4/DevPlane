export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pageWrapper">
      <header className="backgroundNavbar" />
      <section className="pageSection">
        <div className="overlay">{children}</div>
      </section>
    </div>
  );
}
