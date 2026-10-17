import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <section className="page auth-page">
      <p className="eyebrow">Account</p>
      <h1>{user.name}</h1>
      <dl className="details-list">
        <div>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{user.role}</dd>
        </div>
      </dl>
    </section>
  );
};

export default ProfilePage;
