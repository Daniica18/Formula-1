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
                    <Link to='https://play.google.com/store/apps/details?id=com.softpauer.f1timingapp2014.basic&hl=en_GB'>
                        <img src="./img/GooglePlay.jpg" alt="" />
                    </Link>
                    <Link to='https://apps.apple.com/gb/app/formula-1/id835022598'>
                        <img src="./img/AppStore.jpg" alt="" />
                    </Link>
                </div>
                <div className="appLink">
                    <Link to='https://www.facebook.com/Formula1'>
                        <FacebookIcon />
                    </Link>
                    <Link to='https://x.com/f1'>
                        <XIcon />
                    </Link>
                    <Link to='https://www.instagram.com/f1/'>
                        <InstagramIcon />
                    </Link>
                    <Link to='https://www.youtube.com/F1'>
                        <YouTubeIcon />
                    </Link>
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
        </footer >
    )
}