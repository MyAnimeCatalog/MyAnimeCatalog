import Navbar from './Navbar';

//This component basically makes sure each page has the Navbar.
export default function Layout({ children } : {children: React.ReactNode}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}