import { useEffect, useState } from 'react';
import { listUsers } from '../api/usersApi';
import StatusBanner from '../components/StatusBanner';
import type { User } from '../types/api';
import { getErrorMessage } from '../types/api';

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    listUsers({ limit: 50 })
      .then((response) => setUsers(response.data))
      .catch((err) => setError(getErrorMessage(err)));
  }, []);

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Users</h1>
        </div>
      </header>
      <StatusBanner tone="danger">{error}</StatusBanner>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminUsersPage;
