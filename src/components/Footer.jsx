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
                <Link to="/BecomeAnAffiliate">Become an affiliate</Link>
            </div>

            <div className="footer">
                <p>	Group 3 &copy; , {year}</p>
            </div>
        </footer>
    )
}