import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { listColleges } from '../api/collegesApi';
import CollegeCard from '../components/CollegeCard';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import StatusBanner from '../components/StatusBanner';
import type { College, ListCollegesQuery, PaginationMeta } from '../types/api';
import { getErrorMessage } from '../types/api';

const CollegesPage = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<ListCollegesQuery & { page: number; limit: number }>({
    search: '',
    location: '',
    sortBy: 'averageRating',
    sortOrder: 'desc',
    page: 1,
    limit: 6,
  });

  useEffect(() => {
    const loadColleges = async () => {
      try {
        setError('');
        const response = await listColleges(filters);
        setColleges(response.data);
        setMeta(response.meta ?? null);
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };

    void loadColleges();
  }, [filters]);

  const updateFilter =
    (field: keyof ListCollegesQuery) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFilters((current) => ({
        ...current,
        page: 1,
        [field]: event.target.value,
      }));
    };

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Browse</p>
          <h1>Find a college by reviews</h1>
        </div>
      </header>

      <form className="filter-bar" onSubmit={(event: FormEvent) => event.preventDefault()}>
        <input placeholder="Search by name" value={filters.search} onChange={updateFilter('search')} />
        <input placeholder="Filter by location" value={filters.location} onChange={updateFilter('location')} />
        <select value={filters.sortBy} onChange={updateFilter('sortBy')}>
          <option value="averageRating">Average rating</option>
          <option value="name">Name</option>
          <option value="createdAt">Newest</option>
        </select>
      </form>

      <StatusBanner tone="danger">{error}</StatusBanner>

      {colleges.length === 0 && !error ? (
        <EmptyState title="No colleges found" message="Try a different name or location." />
      ) : (
        <div className="card-grid">
          {colleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}

      <Pagination meta={meta} onPageChange={(page) => setFilters((current) => ({ ...current, page }))} />
    </section>
  );
};

export default CollegesPage;
