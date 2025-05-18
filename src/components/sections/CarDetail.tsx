"use client";
import MyDatePicker from "@/src/components/elements/MyDatePicker";
import Layout from "@/src/components/layout/Layout";
import useBookingForm from "@/src/hooks/useBookingForm";
import { useCars } from "@/src/hooks/useCars";
import { useClientSession } from "@/src/hooks/useClientSession";
import { Link } from "@/src/i18n/navigation";
import { BookingSchemaType } from "@/src/schemas/booking-schema";
import { Car } from "@/src/types/car";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import ModalVideo from "react-modal-video";
import Slider from "react-slick";

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
    }
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666"
        stroke=""
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    className={
      "slick-next slick-arrow" +
      (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    }
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992"
        stroke=""
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {" "}
      </path>
    </svg>
  </button>
);
export default function CarsDetails3({ car }: { car: Car }) {
  const [isOpen, setOpen] = useState(false);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  const t = useTranslations("featured_cars.car_detail");

  const { user } = useClientSession();
  const { locations } = useCars();

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider2, slider1]);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };

  const settingsThumbs = {
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: false,
    focusOnSelect: true,
    vertical: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 700, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };
  const [isAccordion, setIsAccordion] = useState(null);

  const { register, handleSubmit, setValue, watch, errors } =
    useBookingForm(car);

  const handleAccordion = (key: any) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setValue(name as keyof BookingSchemaType, checked);
    } else {
      setValue(name as keyof BookingSchemaType, value);
    }
  };

  const handleDateChange = (
    field: "pickupDate" | "dropoffDate",
    date: Date
  ) => {
    setValue(field, date);
  };

  const formValues = watch();

  return (
    <>
      <Layout footerStyle={1}>
        <div>
          <section className="box-section box-breadcrumb background-body">
            <div className="container">
              <ul className="breadcrumbs">
                <li>
                  <Link href="/">{t("breadcrumbs.home")}</Link>
                  <span className="arrow-right">
                    <svg
                      width={7}
                      height={12}
                      viewBox="0 0 7 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L6 6L1 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  <Link href="/booking">{t("breadcrumbs.cars_rental")}</Link>
                  <span className="arrow-right">
                    <svg
                      width={7}
                      height={12}
                      viewBox="0 0 7 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L6 6L1 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  <span className="text-breadcrumb">
                    {" "}
                    {car.brand} {car.model} {car.year}
                  </span>
                </li>
              </ul>
            </div>
          </section>
          <section className="box-section box-content-tour-detail background-body pt-0">
            <div className="container">
              <div className="tour-header">
                <div className="row">
                  <div className="col-lg-8">
                    <div
                      className="tour-title-main"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 20,
                      }}
                    >
                      <h4 className="neutral-1000">
                        {car.brand} {car.model} {car.year}
                      </h4>
                      <span
                        style={{
                          backgroundColor:
                            car.status === "available" ? "green" : "red",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "6px",
                          fontSize: "1.5rem",
                          fontWeight: "600",
                        }}
                      >
                        {car.status === "available"
                          ? t("status.available")
                          : t("status.rented")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="tour-metas">
                  <div className="tour-meta-left">
                    <p className="text-md-medium neutral-1000 mr-20 tour-location">
                      <svg
                        className="invert"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M7.99967 0C4.80452 0 2.20508 2.59944 2.20508 5.79456C2.20508 9.75981 7.39067 15.581 7.61145 15.8269C7.81883 16.0579 8.18089 16.0575 8.38789 15.8269C8.60867 15.581 13.7943 9.75981 13.7943 5.79456C13.7942 2.59944 11.1948 0 7.99967 0ZM7.99967 8.70997C6.39211 8.70997 5.0843 7.40212 5.0843 5.79456C5.0843 4.187 6.39214 2.87919 7.99967 2.87919C9.6072 2.87919 10.915 4.18703 10.915 5.79459C10.915 7.40216 9.6072 8.70997 7.99967 8.70997Z"
                          fill="#101010"
                        />
                      </svg>
                      {`${car.location.name}, ${car.location.country}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8">
                  <div className="container-banner-activities">
                    <div className="box-banner-activities">
                      <Slider
                        {...settingsMain}
                        asNavFor={nav2 as any}
                        ref={(slider) => setSlider1(slider as any)}
                        className="banner-activities-detail"
                      >
                        <div className="banner-slide-activity">
                          <img
                            src="/assets/imgs/cars-details/banner.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                        <div className="banner-slide-activity">
                          <img
                            src="/assets/imgs/cars-details/banner2.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                        <div className="banner-slide-activity">
                          <img
                            src="/assets/imgs/cars-details/banner3.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                        <div className="banner-slide-activity">
                          <img
                            src="/assets/imgs/cars-details/banner4.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                        <div className="banner-slide-activity">
                          <img
                            src="/assets/imgs/cars-details/banner5.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                      </Slider>
                      <div className="box-button-abs">
                        <Link className="btn btn-primary rounded-pill" href="#">
                          <svg
                            width={22}
                            height={22}
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 8V2.75C20 2.3375 19.6625 2 19.25 2H14C13.5875 2 13.25 2.3375 13.25 2.75V8C13.25 8.4125 13.5875 8.75 14 8.75H19.25C19.6625 8.75 20 8.4125 20 8ZM19.25 0.5C20.495 0.5 21.5 1.505 21.5 2.75V8C21.5 9.245 20.495 10.25 19.25 10.25H14C12.755 10.25 11.75 9.245 11.75 8V2.75C11.75 1.505 12.755 0.5 14 0.5H19.25Z"
                              fill="currentColor"
                            />
                            <path
                              d="M20 19.25V14C20 13.5875 19.6625 13.25 19.25 13.25H14C13.5875 13.25 13.25 13.5875 13.25 14V19.25C13.25 19.6625 13.5875 20 14 20H19.25C19.6625 20 20 19.6625 20 19.25ZM19.25 11.75C20.495 11.75 21.5 12.755 21.5 14V19.25C21.5 20.495 20.495 21.5 19.25 21.5H14C12.755 21.5 11.75 20.495 11.75 19.25V14C11.75 12.755 12.755 11.75 14 11.75H19.25Z"
                              fill="currentColor"
                            />
                            <path
                              d="M8 8.75C8.4125 8.75 8.75 8.4125 8.75 8V2.75C8.75 2.3375 8.4125 2 8 2H2.75C2.3375 2 2 2.3375 2 2.75V8C2 8.4125 2.3375 8.75 2.75 8.75H8ZM8 0.5C9.245 0.5 10.25 1.505 10.25 2.75V8C10.25 9.245 9.245 10.25 8 10.25H2.75C1.505 10.25 0.5 9.245 0.5 8V2.75C0.5 1.505 1.505 0.5 2.75 0.5H8Z"
                              fill="currentColor"
                            />
                            <path
                              d="M8 20C8.4125 20 8.75 19.6625 8.75 19.25V14C8.75 13.5875 8.4125 13.25 8 13.25H2.75C2.3375 13.25 2 13.5875 2 14V19.25C2 19.6625 2.3375 20 2.75 20H8ZM8 11.75C9.245 11.75 10.25 12.755 10.25 14V19.25C10.25 20.495 9.245 21.5 8 21.5H2.75C1.505 21.5 0.5 20.495 0.5 19.25V14C0.5 12.755 1.505 11.75 2.75 11.75H8Z"
                              fill="currentColor"
                            />
                          </svg>
                          {t("media.see_photos")}
                        </Link>
                        <a
                          className="btn btn-white-md popup-youtube"
                          onClick={() => setOpen(true)}
                        >
                          {" "}
                          <img
                            src="/assets/imgs/page/activities/video.svg"
                            alt="Sunny Car Rental"
                          />
                          {t("media.video_clips")}
                        </a>
                      </div>
                    </div>
                    <div className="slider-thumnail-activities">
                      <Slider
                        {...settingsThumbs}
                        asNavFor={nav1 as any}
                        ref={(slider) => setSlider2(slider as any)}
                        className="slider-nav-thumbnails-activities-detail"
                      >
                        <div className="banner-slide">
                          <img
                            src="/assets/imgs/page/car/banner-thumn.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                        <div className="banner-slide">
                          <img
                            src="/assets/imgs/page/car/banner-thumn2.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                        <div className="banner-slide">
                          <img
                            src="/assets/imgs/page/car/banner-thumn3.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                        <div className="banner-slide">
                          <img
                            src="/assets/imgs/page/car/banner-thumn4.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                        <div className="banner-slide">
                          <img
                            src="/assets/imgs/page/car/banner-thumn5.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                        <div className="banner-slide">
                          <img
                            src="/assets/imgs/page/car/banner-thumn6.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                        <div className="banner-slide">
                          <img
                            src="/assets/imgs/page/car/banner-thumn.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                        <div className="banner-slide">
                          <img
                            src="/assets/imgs/page/car/banner-thumn3.png"
                            alt="Sunny Car Rental"
                          />
                        </div>
                      </Slider>
                    </div>
                  </div>
                  <div className="box-feature-car">
                    <div className="list-feature-car align-items-start">
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/km.svg"
                              alt="Sunny Car Rental"
                            />
                          </div>
                          <div className="feature-info">
                            <p className="text-md-medium neutral-1000">
                              {t("features.year")} {car.year}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/diesel.svg"
                              alt="Sunny Car Rental"
                            />
                          </div>
                          <div className="feature-info">
                            <p className="text-md-medium neutral-1000">
                              {t("features.range")}{" "}
                              {car.gama.charAt(0).toUpperCase() +
                                car.gama.slice(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/auto.svg"
                              alt="Sunny Car Rental"
                            />
                          </div>
                          <div className="feature-info">
                            <p className="text-md-medium neutral-1000">
                              {car.transmission === "automatic"
                                ? t("features.transmission.automatic")
                                : t("features.transmission.manual")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/seat.svg"
                              alt="Sunny Car Rental"
                            />
                          </div>
                          <div className="feature-info">
                            <p className="text-md-medium neutral-1000">
                              {car.passenger_capacity} {t("features.seats")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/bag.svg"
                              alt="Sunny Car Rental"
                            />
                          </div>
                          <div className="feature-info">
                            <p className="text-md-medium neutral-1000">
                              {car.luggage_capacity} {t("features.luggage")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/suv.svg"
                              alt="Sunny Car Rental"
                            />
                          </div>
                          <div className="feature-info">
                            <p className="text-md-medium neutral-1000">SUVs</p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/door.svg"
                              alt="Sunny Car Rental"
                            />
                          </div>
                          <div className="feature-info">
                            <p className="text-md-medium neutral-1000">
                              4 Doors
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item-feature-car w-md-25">
                        <div className="item-feature-car-inner">
                          <div className="feature-image">
                            <img
                              src="/assets/imgs/page/car/lit.svg"
                              alt="Sunny Car Rental"
                            />
                          </div>
                          <div className="feature-info">
                            <p className="text-md-medium neutral-1000">2.5L</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-collapse-expand">
                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 1
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOverview"
                        aria-expanded="false"
                        aria-controls="collapseOverview"
                        onClick={() => handleAccordion(1)}
                      >
                        <h6>{t("overview.title")}</h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 1 ? "collapse" : "collapse show"
                        }
                        id="collapseOverview"
                      >
                        <div className="card card-body">
                          <p className="text-md-regular neutral-500">
                            {t("overview.description")}
                          </p>
                          <p>{t("overview.general_description")}</p>
                        </div>
                      </div>
                    </div>

                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 2
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseItinerary"
                        aria-expanded="false"
                        aria-controls="collapseItinerary"
                        onClick={() => handleAccordion(2)}
                      >
                        <h6>{t("overview.included.title")}</h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 2 ? "collapse" : "collapse show"
                        }
                        id="collapseItinerary"
                      >
                        <div className="card card-body">
                          <ul className="list-checked-green">
                            <li>{t("overview.included.items.insurance")}</li>
                            <li>
                              {t("overview.included.items.roadside_assistance")}
                            </li>
                            <li>
                              {t("overview.included.items.unlimited_miles")}
                            </li>
                            <li>{t("overview.included.items.taxes")}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 3
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseQuestion"
                        aria-expanded="false"
                        aria-controls="collapseQuestion"
                        onClick={() => handleAccordion(3)}
                      >
                        <h6>{t("overview.questions.title")}</h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 3 ? "collapse" : "collapse show"
                        }
                        id="collapseQuestion"
                      >
                        <div className="card card-body">
                          <div className="list-questions">
                            <div className="item-question">
                              <div className="head-question">
                                <p className="text-md-bold neutral-1000">
                                  {t("overview.questions.q1.title")}
                                </p>
                              </div>
                              <div className="content-question">
                                <p className="text-sm-medium neutral-800">
                                  {t("overview.questions.q1.answer")}
                                </p>
                              </div>
                            </div>
                            <div className="item-question">
                              <div className="head-question">
                                <p className="text-md-bold neutral-1000">
                                  {t("overview.questions.q2.title")}
                                </p>
                              </div>
                              <div className="content-question">
                                <p className="text-sm-medium neutral-800">
                                  {t("overview.questions.q2.answer")}
                                </p>
                              </div>
                            </div>
                            <div className="item-question active">
                              <div className="head-question">
                                <p className="text-md-bold neutral-1000">
                                  {t("overview.questions.q3.title")}
                                </p>
                              </div>
                              <div className="content-question">
                                <p className="text-sm-medium neutral-800">
                                  {t("overview.questions.q3.answer")}
                                </p>
                              </div>
                            </div>
                            <div className="item-question">
                              <div className="head-question">
                                <p className="text-md-bold neutral-1000">
                                  {t("overview.questions.q4.title")}
                                </p>
                              </div>
                              <div className="content-question">
                                <p className="text-sm-medium neutral-800">
                                  {t("overview.questions.q4.answer")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <form onSubmit={handleSubmit}>
                    <div className="booking-form">
                      <div className="head-booking-form">
                        <p className="text-xl-bold neutral-1000">
                          {t("form.title")}
                        </p>
                      </div>
                      <div className="content-booking-form">
                        <div className="item-line-booking border-bottom-0 pb-0">
                          <strong className="text-sm-bold neutral-1000">
                            {t("form.pick_up")}
                          </strong>
                          {errors.pickupDate && (
                            <span className="error-message">
                              {errors.pickupDate.message}
                            </span>
                          )}
                          <div className="input-calendar">
                            <MyDatePicker
                              form
                              disablePastDays
                              value={formValues.pickupDate}
                              onChange={(date) =>
                                handleDateChange("pickupDate", date)
                              }
                            />
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.5312 1.3828H13.8595V0.703125C13.8595 0.314789 13.5448 0 13.1564 0C12.7681 0 12.4533 0.314789 12.4533 0.703125V1.3828H5.55469V0.703125C5.55469 0.314789 5.2399 0 4.85156 0C4.46323 0 4.14844 0.314789 4.14844 0.703125V1.3828H3.47678C1.55967 1.3828 0 2.94247 0 4.85954V14.5232C0 16.4403 1.55967 18 3.47678 18H14.5313C16.4483 18 18.008 16.4403 18.008 14.5232V4.85954C18.008 2.94247 16.4483 1.3828 14.5312 1.3828ZM3.47678 2.78905H4.14844V4.16014C4.14844 4.54848 4.46323 4.86327 4.85156 4.86327C5.2399 4.86327 5.55469 4.54848 5.55469 4.16014V2.78905H12.4533V4.16014C12.4533 4.54848 12.7681 4.86327 13.1565 4.86327C13.5448 4.86327 13.8596 4.54848 13.8596 4.16014V2.78905H14.5313C15.6729 2.78905 16.6018 3.71788 16.6018 4.85954V5.53124H1.40625V4.85954C1.40625 3.71788 2.33508 2.78905 3.47678 2.78905ZM14.5312 16.5938H3.47678C2.33508 16.5938 1.40625 15.6649 1.40625 14.5232V6.93749H16.6018V14.5232C16.6018 15.6649 15.6729 16.5938 14.5312 16.5938ZM6.24611 9.70312C6.24611 10.0915 5.93132 10.4062 5.54298 10.4062H4.16018C3.77184 10.4062 3.45705 10.0915 3.45705 9.70312C3.45705 9.31479 3.77184 9 4.16018 9H5.54298C5.93128 9 6.24611 9.31479 6.24611 9.70312ZM14.551 9.70312C14.551 10.0915 14.2362 10.4062 13.8479 10.4062H12.4651C12.0767 10.4062 11.7619 10.0915 11.7619 9.70312C11.7619 9.31479 12.0767 9 12.4651 9H13.8479C14.2362 9 14.551 9.31479 14.551 9.70312ZM10.3945 9.70312C10.3945 10.0915 10.0798 10.4062 9.69142 10.4062H8.30862C7.92028 10.4062 7.60549 10.0915 7.60549 9.70312C7.60549 9.31479 7.92028 9 8.30862 9H9.69142C10.0797 9 10.3945 9.31479 10.3945 9.70312ZM6.24611 13.8516C6.24611 14.2399 5.93132 14.5547 5.54298 14.5547H4.16018C3.77184 14.5547 3.45705 14.2399 3.45705 13.8516C3.45705 13.4632 3.77184 13.1484 4.16018 13.1484H5.54298C5.93128 13.1484 6.24611 13.4632 6.24611 13.8516ZM14.551 13.8516C14.551 14.2399 14.2362 14.5547 13.8479 14.5547H12.4651C12.0767 14.5547 11.7619 14.2399 11.7619 13.8516C11.7619 13.4632 12.0767 13.1484 12.4651 13.1484H13.8479C14.2362 13.1484 14.551 13.4632 14.551 13.8516ZM10.3945 13.8516C10.3945 14.2399 10.0798 14.5547 9.69142 14.5547H8.30862C7.92028 14.5547 7.60549 14.2399 7.60549 13.8516C7.60549 13.4632 7.92028 13.1484 8.30862 13.1484H9.69142C10.0797 13.1484 10.3945 13.4632 10.3945 13.8516Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="item-line-booking">
                          <strong className="text-sm-bold neutral-1000">
                            {t("form.return")}
                          </strong>
                          {errors.dropoffDate && (
                            <span className="error-message">
                              {errors.dropoffDate.message}
                            </span>
                          )}
                          <div className="input-calendar">
                            <MyDatePicker
                              form
                              disablePastDays
                              value={formValues.dropoffDate}
                              onChange={(date) =>
                                handleDateChange("dropoffDate", date)
                              }
                            />
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.5312 1.3828H13.8595V0.703125C13.8595 0.314789 13.5448 0 13.1564 0C12.7681 0 12.4533 0.314789 12.4533 0.703125V1.3828H5.55469V0.703125C5.55469 0.314789 5.2399 0 4.85156 0C4.46323 0 4.14844 0.314789 4.14844 0.703125V1.3828H3.47678C1.55967 1.3828 0 2.94247 0 4.85954V14.5232C0 16.4403 1.55967 18 3.47678 18H14.5313C16.4483 18 18.008 16.4403 18.008 14.5232V4.85954C18.008 2.94247 16.4483 1.3828 14.5312 1.3828ZM3.47678 2.78905H4.14844V4.16014C4.14844 4.54848 4.46323 4.86327 4.85156 4.86327C5.2399 4.86327 5.55469 4.54848 5.55469 4.16014V2.78905H12.4533V4.16014C12.4533 4.54848 12.7681 4.86327 13.1565 4.86327C13.5448 4.86327 13.8596 4.54848 13.8596 4.16014V2.78905H14.5313C15.6729 2.78905 16.6018 3.71788 16.6018 4.85954V5.53124H1.40625V4.85954C1.40625 3.71788 2.33508 2.78905 3.47678 2.78905ZM14.5312 16.5938H3.47678C2.33508 16.5938 1.40625 15.6649 1.40625 14.5232V6.93749H16.6018V14.5232C16.6018 15.6649 15.6729 16.5938 14.5312 16.5938ZM6.24611 9.70312C6.24611 10.0915 5.93132 10.4062 5.54298 10.4062H4.16018C3.77184 10.4062 3.45705 10.0915 3.45705 9.70312C3.45705 9.31479 3.77184 9 4.16018 9H5.54298C5.93128 9 6.24611 9.31479 6.24611 9.70312ZM14.551 9.70312C14.551 10.0915 14.2362 10.4062 13.8479 10.4062H12.4651C12.0767 10.4062 11.7619 10.0915 11.7619 9.70312C11.7619 9.31479 12.0767 9 12.4651 9H13.8479C14.2362 9 14.551 9.31479 14.551 9.70312ZM10.3945 9.70312C10.3945 10.0915 10.0798 10.4062 9.69142 10.4062H8.30862C7.92028 10.4062 7.60549 10.0915 7.60549 9.70312C7.60549 9.31479 7.92028 9 8.30862 9H9.69142C10.0797 9 10.3945 9.31479 10.3945 9.70312ZM6.24611 13.8516C6.24611 14.2399 5.93132 14.5547 5.54298 14.5547H4.16018C3.77184 14.5547 3.45705 14.2399 3.45705 13.8516C3.45705 13.4632 3.77184 13.1484 4.16018 13.1484H5.54298C5.93128 13.1484 6.24611 13.4632 6.24611 13.8516ZM14.551 13.8516C14.551 14.2399 14.2362 14.5547 13.8479 14.5547H12.4651C12.0767 14.5547 11.7619 14.2399 11.7619 13.8516C11.7619 13.4632 12.0767 13.1484 12.4651 13.1484H13.8479C14.2362 13.1484 14.551 13.4632 14.551 13.8516ZM10.3945 13.8516C10.3945 14.2399 10.0798 14.5547 9.69142 14.5547H8.30862C7.92028 14.5547 7.60549 14.2399 7.60549 13.8516C7.60549 13.4632 7.92028 13.1484 8.30862 13.1484H9.69142C10.0797 13.1484 10.3945 13.4632 10.3945 13.8516Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="additional-fields">
                          <div className="item-line-booking">
                            <label className="text-sm-bold neutral-1000">
                              {t("form.payment_method")}
                            </label>
                            {errors.payment_method && (
                              <span className="error-message">
                                {errors.payment_method.message}
                              </span>
                            )}
                            <select
                              {...register("payment_method")}
                              className="input-style"
                              style={{ width: "70%" }}
                            >
                              <option value="">Select a method</option>
                              <option value="credit_card">Credit Card</option>
                              <option value="debit_card">Debit Card</option>
                              <option value="paypal">PayPal</option>
                              <option value="cash">Cash</option>
                            </select>
                          </div>
                          <div
                            className="item-line-booking"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <label className="text-sm-bold neutral-1000">
                                {t("form.driver")}
                              </label>
                              <input
                                {...register("driver")}
                                className="input-style"
                                style={{ width: "70%" }}
                              />
                            </div>

                            {errors.driver && (
                              <span
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                {errors.driver.message}
                              </span>
                            )}
                          </div>
                          <div
                            className="item-line-booking"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <label className="text-sm-bold neutral-1000">
                                {t("form.driver_licence")}
                              </label>
                              <input
                                type="number"
                                {...register("driver_lic", {
                                  valueAsNumber: true,
                                })}
                                className="input-style"
                                style={{ width: "70%" }}
                              />
                            </div>
                            {errors.driver_lic && (
                              <span
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                {errors.driver_lic.message}
                              </span>
                            )}
                          </div>
                          <div
                            className="item-line-booking"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <label className="text-sm-bold neutral-1000">
                                {t("form.additional_driver")}
                              </label>
                              <input
                                {...register("ad_driver")}
                                className="input-style"
                                style={{ width: "70%" }}
                              />
                            </div>

                            {errors.ad_driver && (
                              <span
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                {errors.ad_driver.message}
                              </span>
                            )}
                          </div>
                          <div
                            className="item-line-booking"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <label className="text-sm-bold neutral-1000">
                                {t("form.additional_driver_licence")}
                              </label>
                              <input
                                type="text"
                                {...register("ad_driver_lic", {
                                  setValueAs: (v) =>
                                    v === "" ? undefined : Number(v),
                                })}
                                className="input-style"
                                style={{ width: "70%" }}
                              />
                            </div>

                            {errors.ad_driver_lic && (
                              <span
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                {errors.ad_driver_lic.message}
                              </span>
                            )}
                          </div>
                          <div
                            className="item-line-booking"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 3,
                              }}
                              className="item-line-booking-checkbox"
                            >
                              <label className="text-sm-bold neutral-1000">
                                {t("form.with_gas")}
                              </label>
                              <input
                                {...register("with_gas")}
                                style={{ width: "70%" }}
                                type="checkbox"
                                className="checkbox"
                                checked={formValues.with_gas}
                                onChange={handleChange}
                              />
                            </div>

                            {errors.with_gas && (
                              <span
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                {errors.with_gas.message}
                              </span>
                            )}
                          </div>
                          <div
                            className="item-line-booking"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <label className="text-sm-bold neutral-1000">
                                {t("form.coupon_code")}
                              </label>
                              <input
                                {...register("coupon_code")}
                                className="input-style"
                                style={{ width: "70%" }}
                              />
                            </div>

                            {errors.coupon_code && (
                              <span
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                {errors.coupon_code.message}
                              </span>
                            )}
                          </div>
                          <div
                            className="item-line-booking"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <label className="text-sm-bold neutral-1000">
                                {t("form.pickup_location")}
                              </label>
                              <select
                                {...register("pickup_location_id", {
                                  valueAsNumber: true,
                                })}
                                className="input-style"
                                style={{ width: "60%" }}
                              >
                                <option value="">Select a location</option>
                                {locations.map((location) => (
                                  <option key={location.id} value={location.id}>
                                    {location.name} ({location.country})
                                  </option>
                                ))}
                              </select>
                            </div>

                            {errors.pickup_location_id && (
                              <span
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                {errors.pickup_location_id.message}
                              </span>
                            )}
                          </div>
                          <div
                            className="item-line-booking"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <label className="text-sm-bold neutral-1000">
                                {t("form.return_location")}
                              </label>
                              <select
                                {...register("return_location_id", {
                                  valueAsNumber: true,
                                })}
                                className="input-style"
                                style={{ width: "60%" }}
                              >
                                <option value="">Select a location</option>
                                {locations.map((location) => (
                                  <option key={location.id} value={location.id}>
                                    {location.name} ({location.country})
                                  </option>
                                ))}
                              </select>
                            </div>

                            {errors.return_location_id && (
                              <span
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                {errors.return_location_id.message}
                              </span>
                            )}
                          </div>
                          <div
                            className="item-line-booking"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <label className="text-sm-bold neutral-1000">
                                {t("form.damage_report")}
                              </label>
                              <input
                                {...register("damage_report")}
                                className="input-style"
                                style={{ width: "70%" }}
                              />
                            </div>

                            {errors.damage_report && (
                              <span
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                {errors.damage_report.message}
                              </span>
                            )}
                          </div>

                          <div
                            className="item-line-booking"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <label className="text-sm-bold neutral-1000">
                                {t("form.delivery_type")}
                              </label>
                              <select
                                {...register("delivery_type")}
                                className="input-style"
                                style={{ width: "70%" }}
                              >
                                <option value="physical">
                                  Físico (En persona)
                                </option>
                                <option value="keyless">
                                  Sin llave (Remoto)
                                </option>
                              </select>
                            </div>

                            {errors.delivery_type && (
                              <span
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                {errors.delivery_type.message}
                              </span>
                            )}
                          </div>

                          <div
                            className="item-line-booking"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <label className="text-sm-bold neutral-1000">
                                {t("form.booking_method")}
                              </label>
                              <select
                                {...register("rented_by")}
                                className="input-style"
                                style={{ width: "70%" }}
                              >
                                <option value="web">Web</option>
                                <option value="amovens">Amovens</option>
                                <option value="getaround">Getaround</option>
                              </select>
                            </div>

                            {errors.rented_by && (
                              <span
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                {errors.rented_by.message}
                              </span>
                            )}
                          </div>

                          <div
                            className="item-line-booking"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <label className="text-sm-bold neutral-1000">
                                {t("form.booking_code")}
                              </label>
                              <input
                                {...register("reserve_code")}
                                className="input-style"
                                style={{ width: "70%" }}
                              />
                            </div>

                            {errors.reserve_code && (
                              <span
                                className="error-message"
                                style={{ color: "red" }}
                              >
                                {errors.reserve_code.message}
                              </span>
                            )}
                          </div>

                          <div className="item-line-booking">
                            <label className="text-sm-bold neutral-1000">
                              {t("form.comments")}
                            </label>
                            {errors.comments && (
                              <span className="error-message">
                                {errors.comments.message}
                              </span>
                            )}
                            <textarea
                              {...register("comments")}
                              className="input-style"
                              style={{ width: "70%", resize: "none" }}
                            />
                          </div>
                        </div>
                        <div className="item-line-booking last-item">
                          <strong className="text-md-bold neutral-1000">
                            {t("form.total_paylable")}
                          </strong>
                        </div>
                        <div className="item-line-booking last-item pb-0">
                          <strong className="text-md-medium neutral-1000">
                            {t("form.subtotal")}
                          </strong>
                          <div className="line-booking-right">
                            <p className="text-xl-bold neutral-1000">
                              $ {formValues.subtotal.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="box-button-book">
                          {user ? (
                            <button type="submit" className="btn btn-book">
                              Book Now
                              <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 15L15 8L8 1M15 8L1 8"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          ) : (
                            <Link href="/login" className="btn btn-book">
                              {t("form.login")}
                              <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 15L15 8L8 1M15 8L1 8"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          )}
                        </div>
                        <div className="box-need-help">
                          <Link href="#">
                            <svg
                              width={12}
                              height={14}
                              viewBox="0 0 12 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.83366 3.66667C2.83366 1.92067 4.25433 0.5 6.00033 0.5C7.74633 0.5 9.16699 1.92067 9.16699 3.66667C9.16699 5.41267 7.74633 6.83333 6.00033 6.83333C4.25433 6.83333 2.83366 5.41267 2.83366 3.66667ZM8.00033 7.83333H4.00033C1.88699 7.83333 0.166992 9.55333 0.166992 11.6667C0.166992 12.678 0.988992 13.5 2.00033 13.5H10.0003C11.0117 13.5 11.8337 12.678 11.8337 11.6667C11.8337 9.55333 10.1137 7.83333 8.00033 7.83333Z"
                                fill="currentColor"
                              />
                            </svg>
                            {t("form.need_help")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <ModalVideo
            channel="youtube"
            isOpen={isOpen}
            videoId="JXMWOmuR1hU"
            onClose={() => setOpen(false)}
          />
        </div>
      </Layout>
    </>
  );
}
