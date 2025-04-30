import Layout from "@/src/components/layout/Layout";
import { Link } from "@/src/i18n/navigation";
import Image from "next/image";

export default function Error403() {
  return (
    <Layout footerStyle={1}>
      <div className="container pt-140 pb-170">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h1>403</h1>
              <h5>Access Denied</h5>
              <p className="text-md-medium neutral-500 text-center">
                You do not have permission to access this page. <br />
                Please log in or return to the homepage.
              </p>
              <Link href="/login" className="btn btn-primary mt-30">
                <Image
                  alt="arrow-left"
                  width={20}
                  height={20}
                  src="/assets/imgs/template/icons/arrow-left.svg"
                />
                Go to Login
              </Link>
              <img src="/assets/imgs/template/404.png" alt="Forbidden Access" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
