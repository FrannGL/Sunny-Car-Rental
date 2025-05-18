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
import { useTranslations } from "next-intl";

export default function App() {
  const t = useTranslations("faqs");

  return (
    <>
      <section className="faqs-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-50">
              <h2 className="section-title">{t("title")}</h2>
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
                  <h3 className="h5 mb-0">
                    {t("cards.vehicle_protection.title")}
                  </h3>
                </div>
                <p className="text-muted">
                  {t("cards.vehicle_protection.description")}
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
                  <h3 className="h5 mb-0">{t("cards.third_party.title")}</h3>
                </div>
                <p className="text-muted">
                  {t("cards.third_party.description")}
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
                  <h3 className="h5 mb-0">{t("cards.deposit.title")}</h3>
                </div>
                <p className="text-muted">{t("cards.deposit.description")}</p>
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
                  <h3 className="h5 mb-0">{t("cards.extras.title")}</h3>
                </div>
                <p className="text-muted">{t("cards.extras.description")}</p>
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
                  <h3 className="h5 mb-0">
                    {t("cards.additional_driver.title")}
                  </h3>
                </div>
                <p className="text-muted">
                  {t("cards.additional_driver.description")}
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
                  <h3 className="h5 mb-0">{t("cards.mileage.title")}</h3>
                </div>
                <p className="text-muted">{t("cards.mileage.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
    </>
  );
}
