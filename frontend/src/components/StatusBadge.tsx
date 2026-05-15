import { IncidentStatus } from '../types/Incident';

interface Props {
  status: IncidentStatus;
}

export function StatusBadge({ status }: Props) {
  return <span className={`status-badge status-${status.replace(' ', '-').toLowerCase()}`}>{status}</span>;
}
