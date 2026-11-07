import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark p-3" data-bs-theme="dark">
            <div className="container">
                <Link href="/" className="navbar-brand text-white">
                    Home
                </Link>

                <div className="navbar-nav ms-auto">
                    <Link href="/dashboard" className="nav-link text-white">
                        Dashboard
                    </Link>

                    <Link href="/about" className="nav-link text-white">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;