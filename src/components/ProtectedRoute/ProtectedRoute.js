import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ loggedIn, children, openLoginModal }) {
  const navigate = useNavigate();

  if (!loggedIn) {
    navigate('/');
    openLoginModal();
  } else {
    return children;
  }
}

export default ProtectedRoute;
