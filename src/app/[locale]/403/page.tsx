import Layout from "@/src/components/layout/Layout";
import { Link } from "@/src/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Error403() {
  const t = useTranslations("error_403");

  return (
    <Layout footerStyle={1}>
      <div className="container pt-140 pb-170">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h1>403</h1>
              <h5>{t("title")}</h5>
              <p className="text-md-medium neutral-500 text-center">
                {t("message")} <br />
                {t("action")}
              </p>
              <Link href="/login" className="btn btn-primary mt-30">
                <Image
                  alt={t("alt.arrow")}
                  width={20}
                  height={20}
                  src="/assets/imgs/template/icons/arrow-left.svg"
                />
                {t("button")}
              </Link>
              <img src="/assets/imgs/template/404.png" alt={t("alt.image")} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
