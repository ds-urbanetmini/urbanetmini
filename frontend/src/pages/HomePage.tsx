interface Props {
  onStart: () => void;
}

export function HomePage({ onStart }: Props) {
  return (
    <section className="hero card">
      <p className="eyebrow">Urbanet Mini</p>
      <h1>Registro de incidencias municipales</h1>
      <p>
        Versión inicial del proyecto para registrar incidencias en la vía pública con evidencia multimedia.
      </p>
      <button className="primary-button" onClick={onStart}>
        Registrar incidencia
      </button>
    </section>
  );
}
