import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry Supply Token Error, try again</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset your password {query.token}</p>
      <Reset token={query?.token} />
    </div>
  );
}
