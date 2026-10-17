import { Link } from 'react-router-dom';
import type { College } from '../types/api';

interface CollegeCardProps {
  college: College;
}

const CollegeCard = ({ college }: CollegeCardProps) => (
  <article className="card college-card">
    <div className="card-top">
      <p className="eyebrow">{college.location}</p>
      <p className="rating-chip">
        {college.averageRating.toFixed(2)}
        <span> / {college.reviewCount} reviews</span>
      </p>
    </div>
    <h3>
      <Link to={`/colleges/${college.id}`}>{college.name}</Link>
    </h3>
    <p className="muted">{college.description}</p>
  </article>
);

export default CollegeCard;
