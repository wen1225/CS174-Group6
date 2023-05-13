import "./styles/footer.scss"
import { Link } from "react-router-dom"

export function Footer() {
    return (
        <footer>
            <nav>
                <Link to="privacy" className="link" id="privacy">Privacy Policy</Link>
                <Link to="terms" className="link">Terms of Use</Link>
            </nav>
            <p id="copyright">
                &copy; San Jose State University
            </p>
        </footer>
    )
}