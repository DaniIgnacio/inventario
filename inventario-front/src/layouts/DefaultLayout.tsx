import { Children } from "react";
import { Link } from "react-router-dom";


interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout ({children}){
    return(
        <>
        <header className="main-header"> 
                <h1 className="logo">Inventario Oporto</h1> 
                <nav>
                    <ul className="nav-links"> 
                        <li>
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li>
                            <Link to="/signup" className="nav-link">Signup</Link> 
                        </li>
                    </ul>
                </nav>
            </header>

            <main>{children}</main>
    </>
    )
}