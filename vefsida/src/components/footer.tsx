import facebookIcon from '../assets/facebook.svg';
import githubIcon from '../assets/Github.svg';
import instagramIcon from '../assets/instagram.svg';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="contact-us">
                <h4 className='contactUs-h4'>Hafðu samband</h4>
                <p>@: example@example.com</p>
                <p>Sími: 000-0000</p>
                <p>kt: 000000-0000</p>
            </div>
            <div className="address">
                <h4 className='address-h4'>Heimilisfáng</h4>
                <p>Tækniskólinn Háteigsvegi</p>
                <p>105 Reykjavík</p>
            </div>
            <div className="social-media-icons">
                <img src={facebookIcon} alt="Facebook" />
                <img src={githubIcon} alt="Github" />
                <img src={instagramIcon} alt="Instagram" />
            </div>
        </footer>
    );
}

export default Footer;
