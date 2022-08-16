import { Link } from 'react-router-dom';

const LinkComponent = ({ title, to }) => {
    return (
        <Link to={to}>
            <div>
                <span>{title}</span>
            </div>
        </Link>
    )
}

export default LinkComponent