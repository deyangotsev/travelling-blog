import { Link } from 'react-router-dom'
import photo from '../images/error-page.jpg'
const ErrorPage = () => {
  return (
    <>
      <div style={{
        backgroundImage: `url(${photo})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'relative', width: '100%', height: '100vh', color: 'white'
      }} />
      <button> <Link to='/' style={{
        position: 'absolute',
        bottom: '5rem',
        left: '40%',
        backgroundColor: '#fff',
        padding: '10px 20px',
        borderRadius: '10px',
        textDecoration: 'none',
        color: '#722364'
      }}>GO BACK TO HOME PAGE</Link></button>
    </>
  );
};

export default ErrorPage;
