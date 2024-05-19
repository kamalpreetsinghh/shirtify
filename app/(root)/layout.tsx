import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <MobileNav />
      <main className="root-container">{children}</main>
    </>
  );
};

export default RootLayout;
