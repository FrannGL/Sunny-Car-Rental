import { Link } from "@/src/i18n/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarCrash,
  faPeopleArrows,
  faCreditCard,
  faBabyCarriage,
  faUserPlus,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  return (
    <>
      {/* FAQs Section */}
      <section className="faqs-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-50">
              <h2 className="section-title">Preguntas Frecuentes</h2>
            </div>
          </div>
          <br />
          <br />
          <div className="row g-4">
            <div className="col-md-4">
              <div className="faq-card p-4 h-100">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    className="mb-3"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <FontAwesomeIcon
                      icon={faCarCrash}
                      size="1x"
                      className="text-primary"
                    />
                  </div>
                  <h3 className="h5 mb-0">Protección del Vehículo</h3>
                </div>
                <p className="text-muted">
                  Los seguros CDW y LDW cubren daños por choques, robos o
                  accidentes durante el período de alquiler.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="faq-card p-4 h-100">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    className="mb-3"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <FontAwesomeIcon
                      icon={faPeopleArrows}
                      size="1x"
                      className="text-primary"
                    />
                  </div>
                  <h3 className="h5 mb-0">Protección Contra Terceros</h3>
                </div>
                <p className="text-muted">
                  Protección ALI y SLI para vehículos de terceros involucrados
                  en colisiones con tu auto alquilado.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="faq-card p-4 h-100">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    className="mb-3"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      size="1x"
                      className="text-primary"
                    />
                  </div>
                  <h3 className="h5 mb-0">Depósito de Garantía</h3>
                </div>
                <p className="text-muted">
                  Se requiere un depósito de garantía que se bloquea en tu
                  tarjeta y se libera al devolver el vehículo.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="faq-card p-4 h-100">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    className="mb-3"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <FontAwesomeIcon
                      icon={faBabyCarriage}
                      size="1x"
                      className="text-primary"
                    />
                  </div>
                  <h3 className="h5 mb-0">Extras opcionales</h3>
                </div>
                <p className="text-muted">
                  Es posible adicionar extras a tu reserva como GPS y sillas de
                  bebé o de niños. ¡Agrégalas ahora para que no te preocupes por
                  eso durante tu viaje!
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="faq-card p-4 h-100">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    className="mb-3"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      size="1x"
                      className="text-primary"
                    />
                  </div>
                  <h3 className="h5 mb-0">Conductor adicional</h3>
                </div>
                <p className="text-muted">
                  Si otra persona también va a conducir el auto, deberá firmar
                  el contrato como conductor adicional y cumplir con los
                  requisitos para alquilar un auto tales como: documentación
                  necesaria y edad mínima para conducir.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="faq-card p-4 h-100">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    className="mb-3"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <FontAwesomeIcon
                      icon={faRoad}
                      size="1x"
                      className="text-primary"
                    />
                  </div>
                  <h3 className="h5 mb-0">Kilometraje</h3>
                </div>
                <p className="text-muted">
                  Verifica si tu reserva cuenta con kilometraje ilimitado o no.
                  El kilometraje ilimitado significa que puedes andar cuánto
                  quisieras sin pagar ningún valor extra por los kilómetros
                  recorridos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      {/* Benefits Section */}
      {/*     <section className="benefits-section py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="section-title">Ventajas de Sunny Car Rental</h2>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="benefit-card text-center p-4">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-percentage fa-2x text-primary"></i>
                </div>
                <h3 className="h5 mb-3">Descuentos Exclusivos</h3>
                <p className="text-muted">
                  Hasta 30% de descuento en alquileres seleccionados
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="benefit-card text-center p-4">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-car fa-2x text-primary"></i>
                </div>
                <h3 className="h5 mb-3">Amplia Selección</h3>
                <p className="text-muted">
                  Más de 300 compañías de alquiler disponibles
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="benefit-card text-center p-4">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-globe fa-2x text-primary"></i>
                </div>
                <h3 className="h5 mb-3">Cobertura Global</h3>
                <p className="text-muted">
                  Disponible en más de 160 países y 7,000 ciudades
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="benefit-card text-center p-4">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-edit fa-2x text-primary"></i>
                </div>
                <h3 className="h5 mb-3">Modificaciones Gratuitas</h3>
                <p className="text-muted">
                  Modifica tu reserva sin costo adicional
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
