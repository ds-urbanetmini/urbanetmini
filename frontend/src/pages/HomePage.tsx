interface Props {
  onStart: () => void;
  onMunicipalPanel: () => void;
}

export function HomePage({ onStart, onMunicipalPanel }: Props) {
  return (
    <section className="hero card">
      <p className="eyebrow">Urbanet Mini</p>
      <h1>Registro de incidencias municipales</h1>
      <p>
        Sistema académico para registrar incidencias en la vía pública con evidencia multimedia y consulta municipal.
      </p>
      <div className="hero-actions">
        <button className="primary-button" onClick={onStart}>
          Registrar incidencia
        </button>
        <button className="secondary-button" onClick={onMunicipalPanel}>
          Panel municipal
        </button>
      </div>
    </section>
  );
}
