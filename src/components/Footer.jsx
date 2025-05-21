import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="footer">
            <Link to="./Contact"></Link>
            <Link to="./PrivacyPolicy"></Link>
            <Link to="./Partenrs"></Link>
            <Link to="./TermsOfUse"></Link>
            <Link to="./BecomeAnAffiliate"></Link>

        </footer>
    )

}