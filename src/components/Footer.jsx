import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="footer">
            <Link to="/Contact">Contact</Link>
            <Link to="/PrivacyPolicy">Privacy Policy</Link>
            <Link to="/Partners">Partners</Link>
            <Link to="/TermsOfUse">Terms of use</Link>
            <Link to="/BecomeAnAffiliate">Become an affiliate</Link>
        </footer>
    )
}