import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
    children: React.ReactNode;
 }
export default function Layout({children} : LayoutProps) {
    return(
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    )
}