import { useNavigate, useRouteError } from 'react-router-dom';
import Button from '../ui/Button';
import MessagePanel from '../ui/MessagePanel';

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  let errorTitle = 'An Unexpected Error Occurred';
  let errorSubtitle = 'Something went wrong. Please try reloading the page.';
  let img = '/images/error-general.png';
  let btn = (
    <Button
      type="primary"
      label="Back to your notes"
      onClick={() => navigate('/')}
    />
  );

  if (error.status === 404) {
    errorTitle = 'Page Not Found';
    errorSubtitle =
      "We can't find the page you're looking for. It may have been moved or deleted.";
    img = '/images/error-http-404.png';
  }

  return (
    <MessagePanel
      title={errorTitle}
      subtitle={errorSubtitle}
      imageUrl={img}
      button={btn}
    />
  );
}

export default ErrorPage;
