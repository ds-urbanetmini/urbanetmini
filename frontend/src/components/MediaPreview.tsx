import { getMediaUrl } from '../services/incidentApi';
import { Incident } from '../types/Incident';

interface Props {
  incident: Incident;
}

export function MediaPreview({ incident }: Props) {
  const mediaSource = getMediaUrl(incident.mediaUrl);

  if (incident.mediaType === 'image') {
    return <img className="media-preview" src={mediaSource} alt={`Evidencia de ${incident.code}`} />;
  }

  if (incident.mediaType === 'video') {
    return (
      <video className="media-preview" controls>
        <source src={mediaSource} />
        Tu navegador no puede reproducir este video.
      </video>
    );
  }

  return (
    <audio className="audio-preview" controls>
      <source src={mediaSource} />
      Tu navegador no puede reproducir este audio.
    </audio>
  );
}
