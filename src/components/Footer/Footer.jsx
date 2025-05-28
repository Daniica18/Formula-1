import { Link } from "react-router";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
    const year = (new Date()).getFullYear();

    return (
        <footer className="footer_div">
            <div className="marketing">
                <div className="appPhoto">
                    <p>DOWNLOAD THE OFFICIAL F1 APP</p>
                    <img src="./img/GooglePlay.jpg" alt="" />
                    <img src="./img/AppStore.jpg" alt="" />
                </div>
                <div className="appLink">
                    <FacebookIcon />
                    <InstagramIcon />
                    <XIcon />
                    <YouTubeIcon />
                </div>
            </div>
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