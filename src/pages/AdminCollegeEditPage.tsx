import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCollege, updateCollege } from '../api/collegesApi';
import CollegeForm from '../components/CollegeForm';
import StatusBanner from '../components/StatusBanner';
import type { CollegeInput } from '../types/api';
import { getErrorMessage } from '../types/api';

const AdminCollegeEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [college, setCollege] = useState<CollegeInput | null>(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    getCollege(id)
      .then((response) => {
        const data = response.data;
        setCollege({
          name: data.name,
          description: data.description,
          location: data.location,
          website: data.website || '',
        });
      })
      .catch((err) => setError(getErrorMessage(err)));
  }, [id]);

  const handleSubmit = async (payload: CollegeInput) => {
    if (!id) {
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      await updateCollege(id, payload);
      navigate('/admin/colleges');
    } catch (err) {
      setError(getErrorMessage(err));
      setSubmitting(false);
    }
  };

  if (!college && !error) {
    return <p className="page-status">Loading college...</p>;
  }

  return (
    <section className="page auth-page">
      <Link to="/admin/colleges" className="back-link">
        Back to colleges
      </Link>
      <h1>Edit college</h1>
      <StatusBanner tone="danger">{error}</StatusBanner>
      {college && <CollegeForm initialCollege={college} onSubmit={handleSubmit} submitting={submitting} />}
    </section>
  );
};

export default AdminCollegeEditPage;
