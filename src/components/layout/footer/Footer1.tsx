import { useTranslations } from "next-intl";

export default function Footer1() {
  const t = useTranslations("footer");

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-12 text-center text-md-start">
                <h5 className="color-white wow fadeInDown">
                  {t("contact.title")}
                </h5>
              </div>
            </div>
          </div>

          <section className="box-section box-contact-form">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mb-30">
                  <h2 className="text-white mb-25">
                    {" "}
                    {t("contact.contact_title")}{" "}
                  </h2>
                  <div className="form-contact">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="text-sm-medium text-white">
                            {t("contact.first_name")}
                          </label>
                          <input
                            className="form-control username"
                            type="text"
                            placeholder="Jose"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="text-sm-medium text-white">
                            {t("contact.last_name")}
                          </label>
                          <input
                            className="form-control username"
                            type="text"
                            placeholder="..."
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="text-sm-medium text-white">
                            {t("contact.email")}
                          </label>
                          <input
                            className="form-control email"
                            type="email"
                            placeholder="email@domain.com"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="text-sm-medium text-white">
                            {t("contact.phone")}
                          </label>
                          <input
                            className="form-control phone"
                            type="text"
                            placeholder="+99"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="text-sm-medium text-white">
                            {t("contact.message")}
                          </label>
                          <textarea
                            className="form-control"
                            rows={6}
                            placeholder="Mensaje ..."
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <button className="btn btn-book">
                          {t("contact.send")}
                          <svg
                            width={17}
                            height={16}
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-30">
                  <div className="ps-lg-5">
                    <h4 className="text-white">{t("location.title")}</h4>
                    <p className="neutral-500 mb-30">{t("location.address")}</p>
                    <iframe
                      className="h-520 rounded-3"
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d70000!2d-0.375!3d39.4667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ses!4v1715000000000!5m2!1sen!2ses"
                      width="100%"
                      height={650}
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="footer-bottom mt-50">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-6 text-md-center text-center mb-20">
                <p className="text-sm color-white">
                  {t("copyright", { year: new Date().getFullYear() })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
