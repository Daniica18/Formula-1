import { Link } from "react-router";

export default function Footer() {
    const year = (new Date()).getFullYear();

    return (
        <footer className="footer_div">
            <div className="footer">
                <Link to="/Contact">Contact</Link>
                <Link to="/PrivacyPolicy">Privacy Policy</Link>
                <Link to="/Partners">Partners</Link>
                <Link to="/TermsOfUse">Terms of use</Link>
                <Link to="/CreateAnAccount">Create an account</Link>
            </div>

            <div className="signature">
                <p>	Group 3 &copy; , {year}</p>
            </div>
        </footer>
    )
}