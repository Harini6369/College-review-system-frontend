import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createCollege, deleteCollege, listColleges } from '../api/collegesApi';
import CollegeForm from '../components/CollegeForm';
import EmptyState from '../components/EmptyState';
import StatusBanner from '../components/StatusBanner';
import type { College, CollegeInput } from '../types/api';
import { getErrorMessage } from '../types/api';

const AdminCollegesPage = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadColleges = async () => {
    const response = await listColleges({ limit: 50, sortBy: 'name', sortOrder: 'asc' });
    setColleges(response.data);
  };

  useEffect(() => {
    loadColleges().catch((err) => setError(getErrorMessage(err)));
  }, []);

  const handleCreate = async (payload: CollegeInput) => {
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      await createCollege(payload);
      setMessage('College created.');
      await loadColleges();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (college: College) => {
    const confirmed = window.confirm(`Delete ${college.name}? Reviews will also be removed.`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteCollege(college.id);
      setMessage('College deleted.');
      await loadColleges();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Manage colleges</h1>
        </div>
      </header>

      <StatusBanner tone="danger">{error}</StatusBanner>
      <StatusBanner>{message}</StatusBanner>

      <div className="split-layout">
        <div className="card">
          <h2>Add a college</h2>
          <CollegeForm onSubmit={handleCreate} submitting={submitting} />
        </div>

        <div className="stack">
          {colleges.length === 0 ? (
            <EmptyState title="No colleges yet" message="Create the first college on the left." />
          ) : (
            colleges.map((college) => (
              <article key={college.id} className="card compact-card">
                <div>
                  <h3>{college.name}</h3>
                  <p className="muted">{college.location}</p>
                </div>
                <div className="row-actions">
                  <Link className="button button-ghost" to={`/admin/colleges/${college.id}`}>
                    Edit
                  </Link>
                  <button type="button" className="button button-danger" onClick={() => handleDelete(college)}>
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminCollegesPage;
