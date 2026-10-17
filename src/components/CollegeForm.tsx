import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { CollegeInput } from '../types/api';

interface CollegeFormProps {
  initialCollege?: CollegeInput;
  onSubmit: (payload: CollegeInput) => void | Promise<void>;
  submitting: boolean;
}

const emptyForm: CollegeInput = {
  name: '',
  description: '',
  location: '',
  website: '',
};

const CollegeForm = ({ initialCollege, onSubmit, submitting }: CollegeFormProps) => {
  const [form, setForm] = useState<CollegeInput>(initialCollege ?? emptyForm);

  const updateField = (field: keyof CollegeInput) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void onSubmit({
      ...form,
      website: form.website || undefined,
    });
  };

  return (
    <form className="stack-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input value={form.name} onChange={updateField('name')} minLength={2} maxLength={160} required />
      </label>
      <label>
        Location
        <input value={form.location} onChange={updateField('location')} minLength={2} maxLength={160} required />
      </label>
      <label>
        Website
        <input
          type="url"
          value={form.website || ''}
          onChange={updateField('website')}
          placeholder="https://example.edu"
        />
      </label>
      <label>
        Description
        <textarea
          value={form.description}
          onChange={updateField('description')}
          minLength={1}
          maxLength={2000}
          rows={5}
          required
        />
      </label>
      <button type="submit" className="button" disabled={submitting}>
        {initialCollege ? 'Save college' : 'Create college'}
      </button>
    </form>
  );
};

export default CollegeForm;
