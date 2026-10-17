import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StatusBanner from '../components/StatusBanner';
import type { RegisterPayload } from '../types/api';
import { getErrorMessage } from '../types/api';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterPayload>({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const updateField =
    (field: keyof RegisterPayload) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await register(form);
      navigate('/', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page auth-page">
      <h1>Create an account</h1>
      <p className="muted">Public registration is limited to students and teachers.</p>
      <StatusBanner tone="danger">{error}</StatusBanner>
      <form className="stack-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input value={form.name} onChange={updateField('name')} minLength={2} required />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={updateField('email')} required />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={updateField('password')} minLength={8} required />
        </label>
        <label>
          Role
          <select value={form.role} onChange={updateField('role')}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>
        <button type="submit" className="button" disabled={submitting}>
          Register
        </button>
      </form>
      <p>
        Already registered? <Link to="/login">Sign in</Link>
      </p>
    </section>
  );
};

export default RegisterPage;
