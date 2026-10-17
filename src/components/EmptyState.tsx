interface EmptyStateProps {
  title: string;
  message: string;
}

const EmptyState = ({ title, message }: EmptyStateProps) => (
  <div className="empty-state">
    <h3>{title}</h3>
    <p>{message}</p>
  </div>
);

export default EmptyState;
