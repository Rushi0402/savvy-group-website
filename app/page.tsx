"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Josefin_Sans } from "next/font/google";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/navigation";
import { Phone } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { ArrowUpRight, Send, Mail } from "lucide-react";
import { PhoneCall, MessageCircleMore } from "lucide-react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMap } from "react-icons/hi";
import { useContact } from "../context/ContactContext";
import { submitContact } from "../lib/api";
import { subscribeNewsletter } from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import {
  Users,
  ShieldCheck,
  Briefcase,
  Building2,
  ClipboardList,
  Handshake,
  MapPin,
  MapPinned,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const josefin = Josefin_Sans({
  subsets: ["latin"],
});

export default function Home() {
  // PASTE HERE ↓↓↓

  const { openContact } = useContact();

  const services = [
    {
      title: "Human Resource Management",
      subtitle: "Find Top Talent",
      description:
        "Providing skilled manpower solutions tailored to organizational requirements.",
      image: "/service1.png",
      icon: Users,
    },
    {
      title: "Industrial Relations",
      subtitle: "Workplace Harmony",
      description:
        "Building strong employer-employee relationships through effective workforce management.",
      image: "/service2.jpg",
      icon: Handshake,
    },
    {
      title: "Security Services",
      subtitle: "Reliable Protection",
      description:
        "Professional security personnel ensuring safety and operational continuity.",
      image: "/service3.png",
      icon: ShieldCheck,
    },
    {
      title: "Housekeeping Services",
      subtitle: "Clean Environment",
      description:
        "Maintaining hygienic and productive workplace environments.",
      image: "/service4.png",
      icon: ClipboardList,
    },
    {
      title: "Operations Management",
      subtitle: "Efficient Processes",
      description: "Supporting organizations through streamlined operations.",
      image: "/service5.jpg",
      icon: Building2,
    },
    {
      title: "Business Support Services",
      subtitle: "Growth Support",
      description:
        "Delivering dependable support solutions for business growth.",
      image: "/service6.jpg",
      icon: Briefcase,
    },
  ];

  const [showNavbar, setShowNavbar] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 10) {
        setShowNavbar(true);
      } else if (currentScroll > lastScroll) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < services.length - 3) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const quotes = [
    "Building Productive Workplaces Through Trusted Partnerships.",
    "Empowering Organizations With Skilled and Reliable Manpower.",
    "Delivering Workforce Solutions That Drive Business Success.",
    "Strengthening Operations Through Expertise and Professionalism.",
    "Connecting Businesses With the Right People for Success.",
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await submitContact(formData);

      if (data.success) {
        toast.success(data.message, {
          icon: "✅",
          style: {
            border: "1px solid #D6AE45",
            padding: "16px",
            color: "#0f172a",
          },
        });

        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });

        // If this is inside ContactModal.tsx
        // closeContact();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);

    console.log(process.env.NEXT_PUBLIC_API_URL);

    try {
      const data = await subscribeNewsletter(email);

      if (data.success) {
        toast.success(data.message, {
          icon: "📧",
          style: {
            border: "1px solid #D6AE45",
            padding: "16px",
            color: "#0f172a",
          },
        });

        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);

      toast.error("Unable to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  // PASTE ABOVE RETURN ↑↑↑

  return (
    <main className="min-h-screen from-slate-50 to-green-50 pt-32">
      {/* ================= NAVBAR ================= */}

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl shadow-xl border-b border-slate-200">
          <div className="max-w-[1600px] mx-auto h-[90px] lg:h-[100px] px-5 sm:px-8 lg:px-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 lg:gap-4">
              <img
                src="/Logo.png"
                alt="Savvy Group"
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
              />

              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                  Savvy Group
                </h1>

                <p className="hidden sm:block text-[10px] lg:text-xs tracking-wide text-slate-500">
                  Think Beyond Your Boundaries
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-12">
              {[
                "Home",
                "About",
                "Services",
                "Projects",
                "Clients",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="
              relative
              text-[15px]
              font-semibold
              uppercase
              tracking-wide
              text-slate-700
              transition-all
              duration-300
              hover:text-[#005C5C]
              after:absolute
              after:left-0
              after:-bottom-2
              after:h-[2px]
              after:w-0
              after:bg-[#D6AE45]
              after:transition-all
              after:duration-300
              hover:after:w-full
            "
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop Contact Button */}
            <button
              onClick={openContact}
              className="
          hidden
          md:flex
          items-center
          justify-center
          bg-[#D6AE45]
          hover:bg-[#c39c35]
          text-black
          px-6
          lg:px-8
          py-3
          lg:py-4
          rounded-xl
          font-semibold
          tracking-wide
          shadow-lg
          transition-all
          duration-300
          hover:scale-105
        "
            >
              Contact Now →
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2"
            >
              {mobileOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              mobileOpen ? "max-h-[450px]" : "max-h-0"
            }`}
          >
            <div className="bg-white border-t border-slate-200">
              {[
                "Home",
                "About",
                "Services",
                "Projects",
                "Clients",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="
              block
              px-6
              py-4
              font-semibold
              uppercase
              tracking-wide
              text-slate-700
              hover:bg-slate-50
            "
                >
                  {item}
                </a>
              ))}

              <div className="p-6">
                <button
                  onClick={() => {
                    openContact();
                    setMobileOpen(false);
                  }}
                  className="
              w-full
              bg-[#D6AE45]
              hover:bg-[#c39c35]
              text-black
              py-4
              rounded-xl
              font-semibold
              shadow-lg
              transition-all
            "
                >
                  Contact Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Slider */}
      <section
        id="home"
        className="
        max-w-7xl
        mx-auto
        px-5
        sm:px-6
        lg:px-8
        pb-12"
      >
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSlideChange={() => console.log("slide changed")}>
        <SwiperSlide>
        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-12
          lg:gap-16
          items-center
          min-h-[calc(100vh-100px)]
          py-6
        "
            >
              {/* Left Content */}
              <div className="order-2 lg:order-1 text-center lg:text-left">
                <span className="inline-block bg-yellow-50 text-[#D4AF37] px-5 py-2 rounded-full text-sm">
                  Welcome to Savvy Group
                </span>

                <h1
                  className="
              mt-6
              font-bold
              leading-tight
              text-slate-900
              text-4xl
              sm:text-5xl
              md:text-6xl
              xl:text-7xl
            "
                >
                  Beyond Services.
                  <br />
                  <span className="text-green-600">
                    Building Possibilities.
                  </span>
                </h1>

                <p
                  className="
              mt-6
              text-gray-600
              leading-8
              max-w-xl
              mx-auto
              lg:mx-0
              text-base
              md:text-lg
              lg:text-xl
            "
                >
                  We do not just provide solutions. We create opportunities,
                  drive innovation and deliver results that help businesses
                  grow.
                </p>

                <div
                  className="
              flex
              flex-col
              sm:flex-row
              justify-center
              lg:justify-start
              gap-4
              mt-10
            "
                >
                  <button
                    className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-8
                py-4
                rounded-xl
                transition
              "
                  >
                    Explore Services
                  </button>

                  <button
                    onClick={openContact}
                    className="
                border
                border-green-600
                text-green-600
                hover:bg-green-50
                px-8
                py-4
                rounded-xl
                transition
              "
                  >
                    Contact Us
                  </button>
                </div>
              </div>

              {/* Right Content */}
              <div
                className="
            order-1
            lg:order-2
            relative
            flex
            justify-center
            items-center
          "
              >
                <img
              src="/Logo.png"
              alt="Savvy Group"
              className="
              w-[250px]
              sm:w-[350px]
              md:w-[450px]
              lg:w-[600px]
              xl:w-[720px]
              object-contain
              opacity-10
            "
                />

                <div
                  className="
              absolute
              text-center
              px-4
              max-w-xs
              sm:max-w-md
              lg:max-w-lg
            "
                >
                  <div className="w-20 lg:w-28 h-2 bg-[#D4AF37] rounded-full mx-auto mb-6"></div>

                  <p
                    className="
                uppercase
                tracking-[0.2em]
                lg:tracking-[0.45em]
                text-[#D4AF37]
                text-[10px]
                sm:text-xs
                lg:text-sm
                font-semibold
                mb-4
              "
                  >
                    Experts • Innovation • Growth
                  </p>

                  <h2
                    className="
                font-bold
                leading-tight
                text-black
                text-3xl
                sm:text-4xl
                lg:text-5xl
                xl:text-6xl
              "
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    INDUSTRY
                    <br />
                    EXPERTS
                  </h2>

                  <div className="w-20 lg:w-28 h-2 bg-[#D4AF37] rounded-full mx-auto mt-5 mb-6"></div>

                  <p
                    className="
                text-slate-700
                leading-7
                lg:leading-9
                text-sm
                sm:text-base
                lg:text-lg
              "
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Experienced professionals with deep knowledge of
                    Manufacturing and Corporate sector needs.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-100px)] py-10">

    {/* Left Content */}
    <div className="text-center lg:text-left order-2 lg:order-1">

      <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs sm:text-sm">
        Innovation & Excellence
      </span>

      <h1 className="mt-6 lg:mt-8 font-bold leading-tight text-slate-900 text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
        Where Ideas
        <br />
        <span className="text-blue-600">
          Meet Execution.
        </span>
      </h1>

      <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-8">
        Transforming concepts into successful outcomes through expertise,
        strategy and commitment.
      </p>

      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-8">

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl">
          Learn More
        </button>

        <button
          onClick={openContact}
          className="border border-blue-600 text-blue-600 hover:bg-blue-50 transition px-8 py-4 rounded-xl"
        >
          Contact Us
        </button>

      </div>

    </div>

    {/* Right Content */}
    <div className="relative flex justify-center items-center order-1 lg:order-2">

      {/* Background Logo */}
      <img
        src="/Logo.png"
        alt="Savvy Group Logo"
        className="
          w-[260px]
          sm:w-[360px]
          md:w-[480px]
          lg:w-[620px]
          xl:w-[760px]
          object-contain
          opacity-10
        "
      />

      {/* Overlay Content */}
      <div className="absolute text-center px-4 max-w-xs sm:max-w-md lg:max-w-lg">

        <div className="w-20 lg:w-28 h-2 bg-[#4e1add] mx-auto mb-6 rounded-full"></div>

        <p className="uppercase tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.45em] text-blue-600 text-[10px] sm:text-xs lg:text-sm font-semibold mb-5">
          People • Experience • Excellence
        </p>

        <h2
          className="font-bold text-black leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          UNIVERSAL
          <br />
          TEAM
        </h2>

        <div className="w-20 lg:w-24 h-2 bg-[#4e1add] mx-auto mt-5 mb-6 rounded-full"></div>

        <p
          className="text-slate-700 text-sm sm:text-base lg:text-lg leading-7 lg:leading-9 max-w-md mx-auto"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Experts in Human Resources, Industrial Relations, and Operations
          from industry backgrounds.
        </p>

      </div>

    </div>

  </div>
</SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-100px)] py-10">

    {/* Left Content */}
    <div className="text-center lg:text-left order-2 lg:order-1">

      <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs sm:text-sm">
        Future Ready Solutions
      </span>

      <h1 className="mt-6 lg:mt-8 font-bold leading-tight text-slate-900 text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
        Think Bigger.
        <br />
        <span className="text-green-600">
          Build Smarter.
        </span>
        <br />
        Grow Faster.
      </h1>

      <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-8">
        Bringing innovation, technology and business solutions together under
        one roof.
      </p>

      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-8">

        <button className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-4 rounded-xl">
          Get Started
        </button>

        <button
          onClick={openContact}
          className="border border-green-600 text-green-600 hover:bg-green-50 transition px-8 py-4 rounded-xl"
        >
          Contact Us
        </button>

      </div>

    </div>

    {/* Right Content */}
    <div className="relative flex justify-center items-center order-1 lg:order-2">

      {/* Background Logo */}
      <img
        src="/Logo.png"
        alt="Savvy Group Logo"
        className="
          w-[260px]
          sm:w-[360px]
          md:w-[480px]
          lg:w-[620px]
          xl:w-[760px]
          object-contain
          opacity-10
        "
      />

      {/* Overlay Content */}
      <div className="absolute text-center px-4 max-w-xs sm:max-w-md lg:max-w-lg">

        <div className="w-20 lg:w-28 h-2 bg-[#08ed2e] mx-auto mb-6 rounded-full"></div>

        <p className="uppercase tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.45em] text-green-700 text-[10px] sm:text-xs lg:text-sm font-semibold mb-5">
          Standard • Security • Devotion
        </p>

        <h2
          className="font-bold text-black leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          SERVICE
          <br />
          EXCELLENCE
        </h2>

        <div className="w-20 lg:w-24 h-2 bg-[#08ed2e] mx-auto mt-5 mb-6 rounded-full"></div>

        <p
          className="text-slate-700 text-sm sm:text-base lg:text-lg leading-7 lg:leading-9 max-w-md mx-auto"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Committed to delivering quality, consistent, and uninterrupted
          services for clients.
        </p>

      </div>

    </div>

  </div>
</SwiperSlide>
        </Swiper>
      </section>

      
      {/* ABOUT US */}


      <section
  id="about"
  className="py-16 sm:py-20 lg:py-28 px-5 sm:px-8 lg:px-16 bg-[#edf4f1]"
>
  <div className="max-w-7xl mx-auto">

    {/* Section Tag */}
    <div className="flex items-center gap-2 mb-6">
      <div className="w-3 h-3 bg-green-600 rotate-45"></div>

      <span className="uppercase tracking-widest text-xs sm:text-sm font-semibold text-slate-700">
        About Us
      </span>
    </div>

    {/* Heading */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mt-8 lg:mt-20">

      {/* Left */}
      <div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight text-center lg:text-left">
          Empowering Businesses Through Expert Workforce Solutions
        </h2>

      </div>

      {/* Right */}
      <div>

        <div className="w-20 h-1 bg-green-600 rounded-full mb-6 lg:mb-8 mx-auto lg:mx-0"></div>

        <p
          className="text-base sm:text-lg lg:text-xl text-slate-700 leading-8 lg:leading-10 text-justify"
          style={{ fontFamily: "Book Antiqua" }}
        >
          Since 2014, Savvy Resources & Management has been empowering
          businesses with reliable manpower and workforce solutions. Our
          expertise spans security services, housekeeping, industrial
          operations, and business support functions. Through a commitment
          to excellence, professionalism, and client success, we enable
          organizations to achieve operational efficiency and long-term
          growth.
        </p>

        <button
          className="
            mt-8
            w-full
            sm:w-auto
            bg-[#D6AE45]
            hover:bg-[#c39c35]
            text-black
            px-8
            py-4
            rounded-xl
            font-semibold
            tracking-wide
            shadow-lg
            transition-all
            duration-300
          "
        >
          Contact Now →
        </button>

      </div>

    </div>

    {/* Bottom Content */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-14 lg:mt-20 items-center">

      {/* Left */}
      <div className="space-y-10">

        {/* Item 1 */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">

          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-700 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0 mx-auto sm:mx-0">
            01
          </div>

          <div className="text-center sm:text-left">

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Industry Expertise
            </h3>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Experienced professionals with deep knowledge of Human
              Resources, Industrial Relations and Operations Management
              across multiple industries.
            </p>

          </div>

        </div>

        <hr className="border-slate-300" />

        {/* Item 2 */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">

          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-700 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0 mx-auto sm:mx-0">
            02
          </div>

          <div className="text-center sm:text-left">

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Reliable Workforce Solutions
            </h3>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Delivering dependable manpower, security services,
              housekeeping and business support solutions tailored to
              client requirements.
            </p>

          </div>

        </div>

        <hr className="border-slate-300" />

        {/* Item 3 */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">

          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-700 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0 mx-auto sm:mx-0">
            03
          </div>

          <div className="text-center sm:text-left">

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Long-Term Partnership
            </h3>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We help organizations improve workforce performance,
              operational efficiency and achieve sustainable business
              growth.
            </p>

          </div>

        </div>

      </div>

      {/* Right Image */}
      <div className="relative overflow-hidden rounded-[25px] lg:rounded-[40px]">

        <img
          src="/about.png"
          alt="Savvy Group Team"
          className="w-full h-[350px] sm:h-[450px] lg:h-full object-cover rounded-[25px] lg:rounded-[40px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-[25px] lg:rounded-[40px]" />

        {/* Quote */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 bg-black/80 backdrop-blur-md text-white py-4 px-5 rounded-2xl">

          <p
            className="text-sm sm:text-base lg:text-lg italic text-center leading-7"
            style={{ fontFamily: "Book Antiqua" }}
          >
            {quotes[currentQuote]}
          </p>

          <p className="text-center mt-3 text-green-300 font-semibold text-sm sm:text-base">
            — Savvy Group
          </p>

        </div>

      </div>

    </div>

  </div>
</section>

    
      {/* our service */}

<section id="services" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAF9]">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
    {/* Heading */}
    <div className="text-center mb-14 lg:mb-16">
      <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#005C5C] font-semibold text-xs sm:text-sm">
        OUR SERVICES
      </p>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4">
        Workforce Solutions
      </h2>

      <p className="text-slate-500 text-base sm:text-lg lg:text-xl mt-4 max-w-2xl mx-auto">
        Delivering Reliable Manpower And Business Support Services
      </p>
    </div>

    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={30}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      }}
    >
      {services.map((service, index) => {
        const Icon = service.icon;

        return (
          <SwiperSlide key={index}>
            <div
              className="
                bg-white
                rounded-[30px]
                p-5
                lg:p-6
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                h-full
              "
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[220px] sm:h-[240px] lg:h-[260px] object-cover rounded-[25px]"
                />

                <div className="absolute -bottom-4 right-5 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#005C5C] border-4 border-white flex items-center justify-center shadow-lg">
                  <Icon
                    className="w-7 h-7 lg:w-9 lg:h-9 text-[#D6AE45]"
                  />
                </div>
              </div>

              {/* Content */}
              <p className="mt-8 text-[#005C5C] text-base lg:text-lg">
                {service.subtitle}
              </p>

              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mt-3 leading-tight min-h-[70px] lg:min-h-[90px]">
                {service.title}
              </h3>

              <div className="border-t border-slate-200 my-6"></div>

              <p className="text-slate-600 text-sm sm:text-base leading-7 lg:leading-8">
                {service.description}
              </p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>

    <div className="mt-12 flex justify-center">
      <Link
        href="/services"
        className="
          group
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-[#005C5C]
          bg-white
          px-6
          sm:px-8
          py-3
          sm:py-4
          text-sm
          sm:text-base
          font-semibold
          text-[#005C5C]
          shadow-lg
          transition-all
          duration-300
          hover:bg-[#005C5C]
          hover:text-white
        "
      >
        Explore More Services

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  </div>
</section>

      {/* WHY CHOOSE US */}
<section id="why-us" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAF9]">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-12 lg:mb-16">
      <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#005C5C] font-semibold text-xs sm:text-sm">
        WHY CHOOSE US
      </p>

      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
        The Trusted Partner For Workforce Excellence
      </h2>

      <p className="mt-4 text-base sm:text-lg lg:text-xl text-slate-500 max-w-3xl mx-auto">
        Delivering Reliable Workforce Solutions With Quality, Commitment And
        Expertise
      </p>
    </div>

    {/* ===================== */}
    {/* Desktop Layout */}
    {/* ===================== */}

    <div className="hidden lg:flex h-[650px] overflow-hidden rounded-[30px]">

      {/* Card 1 */}
      <div className="group relative flex-1 hover:flex-[2] transition-all duration-700 overflow-hidden border-r border-white cursor-pointer">

        <img
          src="/why1.jpg"
          alt="Industry Expertise"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#005C5C]/75"></div>

        <h1 className="absolute top-10 left-10 text-[90px] font-bold text-white/20">
          01
        </h1>

        <div className="absolute bottom-12 left-10 right-10 text-white">

          <span className="border border-[#D6AE45] px-6 py-2 rounded-full text-[#D6AE45]">
            Expertise
          </span>

          <h3 className="text-4xl font-bold mt-8">
            Industry Expertise
          </h3>

          <p className="mt-6 text-lg leading-8 opacity-0 group-hover:opacity-100 transition duration-500">
            Our professionals bring deep expertise in Human Resources,
            Industrial Relations, Security Services and Operations
            Management.
          </p>

        </div>

      </div>

      {/* Card 2 */}

      <div className="group relative flex-1 hover:flex-[2] transition-all duration-700 overflow-hidden border-r border-white cursor-pointer">

        <img
          src="/why2.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#005C5C]/75"></div>

        <h1 className="absolute top-10 left-10 text-[90px] font-bold text-white/20">
          02
        </h1>

        <div className="absolute bottom-12 left-10 right-10 text-white">

          <span className="border border-[#D6AE45] px-6 py-2 rounded-full text-[#D6AE45]">
            Workforce
          </span>

          <h3 className="text-4xl font-bold mt-8">
            Reliable Workforce
          </h3>

          <p className="mt-6 text-lg leading-8 opacity-0 group-hover:opacity-100 transition">
            We provide skilled and dependable manpower solutions tailored
            to every client.
          </p>

        </div>

      </div>

      {/* Card 3 */}

      <div className="group relative flex-1 hover:flex-[2] transition-all duration-700 overflow-hidden border-r border-white cursor-pointer">

        <img
          src="/why3.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#005C5C]/75"></div>

        <h1 className="absolute top-10 left-10 text-[90px] font-bold text-white/20">
          03
        </h1>

        <div className="absolute bottom-12 left-10 right-10 text-white">

          <span className="border border-[#D6AE45] px-6 py-2 rounded-full text-[#D6AE45]">
            Presence
          </span>

          <h3 className="text-4xl font-bold mt-8">
            Pan India Presence
          </h3>

          <p className="mt-6 text-lg leading-8 opacity-0 group-hover:opacity-100 transition">
            Workforce and business support across India.
          </p>

        </div>

      </div>

      {/* Card 4 */}

      <div className="group relative flex-1 hover:flex-[2] transition-all duration-700 overflow-hidden cursor-pointer">

        <img
          src="/why4.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#005C5C]/75"></div>

        <h1 className="absolute top-10 left-10 text-[90px] font-bold text-white/20">
          04
        </h1>

        <div className="absolute bottom-12 left-10 right-10 text-white">

          <span className="border border-[#D6AE45] px-6 py-2 rounded-full text-[#D6AE45]">
            Partnership
          </span>

          <h3 className="text-4xl font-bold mt-8">
            Client Success
          </h3>

          <p className="mt-6 text-lg leading-8 opacity-0 group-hover:opacity-100 transition">
            Long-term partnerships through quality and commitment.
          </p>

        </div>

      </div>

    </div>

    {/* ===================== */}
    {/* Mobile / Tablet */}
    {/* ===================== */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">

      {[
        {
          no: "01",
          image: "/why1.jpg",
          tag: "Expertise",
          title: "Industry Expertise",
          desc: "Our professionals bring deep expertise in Human Resources, Industrial Relations, Security Services and Operations Management.",
        },
        {
          no: "02",
          image: "/why2.png",
          tag: "Workforce",
          title: "Reliable Workforce",
          desc: "We provide skilled and dependable manpower solutions tailored to every client.",
        },
        {
          no: "03",
          image: "/why3.png",
          tag: "Presence",
          title: "Pan India Presence",
          desc: "Our growing network enables us to deliver workforce solutions across India.",
        },
        {
          no: "04",
          image: "/why4.png",
          tag: "Partnership",
          title: "Client Success",
          desc: "We build long-term partnerships through quality service and customer satisfaction.",
        },
      ].map((card) => (
        <div
          key={card.no}
          className="relative rounded-3xl overflow-hidden h-[420px] shadow-xl"
        >
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-[#005C5C]/75"></div>

          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">

            <h1 className="absolute top-6 right-6 text-6xl font-bold text-white/20">
              {card.no}
            </h1>

            <span className="inline-block w-fit border border-[#D6AE45] text-[#D6AE45] px-5 py-2 rounded-full text-sm">
              {card.tag}
            </span>

            <h3 className="mt-6 text-2xl font-bold">
              {card.title}
            </h3>

            <p className="mt-4 leading-7 text-white/90">
              {card.desc}
            </p>

          </div>

        </div>
      ))}

    </div>

  </div>
</section>

      {/* OUR PRESENCE ACROSS INDIA */}

<section className="bg-[#f6f7f9] relative py-16 sm:py-20 lg:py-24">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
    {/* Heading */}

    <div className="text-center lg:text-left">
      <p className="uppercase tracking-[3px] sm:tracking-[4px] text-[#D6AE45] font-semibold text-xs sm:text-sm">
        OUR PRESENCE
      </p>

      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
        OUR PRESENCE
        <span className="block text-[#D6AE45] mt-2">
          ACROSS INDIA
        </span>
      </h2>

      <p className="text-slate-600 text-base sm:text-lg lg:text-xl mt-6 leading-8 max-w-3xl">
        Delivering reliable manpower, security services, housekeeping,
        industrial relations and business support solutions across
        multiple states.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-12">

      {/* LEFT CONTENT */}

      <div>

        {/* Stats */}

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >

          {/* Card */}

          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center mb-4">
              <MapPinned className="w-7 h-7 text-[#D6AE45]" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">
              {inView && <CountUp end={7} duration={2.5} />}+
            </h3>

            <p className="font-semibold mt-2">
              States Covered
            </p>

            <p className="text-slate-500 mt-3 text-sm">
              Maharashtra, Gujarat & Uttar Pradesh
            </p>

          </div>

          {/* Card */}

          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center mb-4">
              <Building2 className="w-7 h-7 text-[#D6AE45]" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">
              {inView && <CountUp end={100} duration={2.5} />}+
            </h3>

            <p className="font-semibold mt-2">
              Clients Served
            </p>

            <p className="text-slate-500 mt-3 text-sm">
              Trusted across industries
            </p>

          </div>

          {/* Card */}

          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-[#D6AE45]" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">
              {inView && (
                <CountUp
                  end={5000}
                  duration={3}
                  separator=","
                />
              )}
              +
            </h3>

            <p className="font-semibold mt-2">
              Workforce Managed
            </p>

            <p className="text-slate-500 mt-3 text-sm">
              Skilled manpower deployed
            </p>

          </div>

          {/* Card */}

          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7 text-[#D6AE45]" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">
              {inView && (
                <CountUp end={99} duration={2} />
              )}
              %
            </h3>

            <p className="font-semibold mt-2">
              Satisfaction
            </p>

            <p className="text-slate-500 mt-3 text-sm">
              Reliable & professional service
            </p>

          </div>

        </div>

        {/* Highlight Card */}

        <div className="mt-6 bg-white rounded-3xl p-6 shadow-lg">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-[#005C5C]/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7 text-[#005C5C]" />
            </div>

            <div>

              <h4 className="font-bold text-lg sm:text-xl text-slate-900">
                Proudly Serving Across India
              </h4>

              <p className="text-slate-500 mt-1 text-sm sm:text-base">
                Expanding workforce solutions nationwide.
              </p>

            </div>

          </div>

        </div>

      </div>
            {/* RIGHT SIDE MAP */}

      <div className="relative flex justify-center items-center order-first lg:order-last">

        <div className="w-full flex justify-center">

          <object
            data="in.svg"
            type="image/svg+xml"
            className="
              w-full
              max-w-[340px]
              sm:max-w-[450px]
              md:max-w-[550px]
              lg:max-w-[700px]
              xl:max-w-[850px]
              h-auto
            "
          >
            Your browser does not support SVG.
          </object>

        </div>

      </div>

    </div>

    {/* Bottom Feature Bar */}

    <div className="mt-12 lg:mt-16 bg-white rounded-3xl shadow-xl p-6 sm:p-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">

        {/* Feature 1 */}

        <div className="flex items-start gap-4">

          <div className="w-12 h-12 rounded-full bg-[#D6AE45]/10 flex items-center justify-center shrink-0">
            <BriefcaseBusiness className="w-6 h-6 text-[#D6AE45]" />
          </div>

          <div>

            <h4 className="font-bold text-lg">
              Skilled Workforce
            </h4>

            <p className="text-slate-500 text-sm mt-2 leading-6">
              Qualified manpower solutions for industries of every size.
            </p>

          </div>

        </div>

        {/* Feature 2 */}

        <div className="flex items-start gap-4">

          <div className="w-12 h-12 rounded-full bg-[#D6AE45]/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#D6AE45]" />
          </div>

          <div>

            <h4 className="font-bold text-lg">
              Security Services
            </h4>

            <p className="text-slate-500 text-sm mt-2 leading-6">
              Professional security personnel trained for every environment.
            </p>

          </div>

        </div>

        {/* Feature 3 */}

        <div className="flex items-start gap-4">

          <div className="w-12 h-12 rounded-full bg-[#D6AE45]/10 flex items-center justify-center shrink-0">
            <Handshake className="w-6 h-6 text-[#D6AE45]" />
          </div>

          <div>

            <h4 className="font-bold text-lg">
              Industrial Relations
            </h4>

            <p className="text-slate-500 text-sm mt-2 leading-6">
              Maintaining strong employer-employee relationships for long-term growth.
            </p>

          </div>

        </div>

        {/* Feature 4 */}

        <div className="flex items-start gap-4">

          <div className="w-12 h-12 rounded-full bg-[#D6AE45]/10 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-[#D6AE45]" />
          </div>

          <div>

            <h4 className="font-bold text-lg">
              Business Support
            </h4>

            <p className="text-slate-500 text-sm mt-2 leading-6">
              Complete workforce management and operational support services.
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>
</section>

{/* VISION AND MISSION */}

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-12 lg:mb-16">

      <span className="text-[#f7931e] uppercase tracking-[3px] sm:tracking-[4px] font-semibold text-xs sm:text-sm">
        Our Purpose
      </span>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] mt-4">
        Vision & Mission
      </h2>

      <p className="text-gray-500 text-base sm:text-lg mt-4 max-w-3xl mx-auto leading-7 sm:leading-8">
        Driving growth through professional workforce solutions, security
        services, housekeeping, industrial relations and business support
        across India.
      </p>

    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      {/* Vision Card */}
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 text-2xl sm:text-3xl">
          👁️
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-4">
          Our Vision
        </h3>

        <p className="text-gray-600 text-sm sm:text-base leading-7 sm:leading-8 text-justify">
          To be India's most trusted and preferred partner for integrated
          manpower, security, housekeeping, and facility management
          solutions. We aim to empower organizations through innovative,
          scalable, and sustainable services while building safer
          workplaces, stronger communities, and lasting business
          relationships. By consistently delivering excellence,
          reliability, and value, we aspire to become the first choice for
          businesses seeking dependable workforce and operational support
          across the nation.
        </p>

      </div>

      {/* Mission Card */}
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">

        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 text-2xl sm:text-3xl">
          🎯
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-4">
          Our Mission
        </h3>

        <p className="text-gray-600 text-sm sm:text-base leading-7 sm:leading-8 text-justify">
          Our mission is to provide reliable, customized, and high-quality
          manpower and facility management solutions that help businesses
          achieve operational excellence. We are committed to maintaining
          the highest standards of safety, professionalism, and customer
          satisfaction through continuous training, innovation, and
          ethical practices. By building transparent, long-term
          partnerships and delivering skilled workforce solutions, we
          create lasting value for our clients, employees, and the
          communities we serve.
        </p>

      </div>

    </div>

  </div>
</section>


    {/* TESTIMONIAL */}

      <section className="bg-[#eef4f7] py-16 sm:py-20 lg:py-24 overflow-hidden">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

    {/* Heading */}

    <div className="text-center lg:text-left mb-12 lg:mb-16">

      <span className="uppercase tracking-[3px] sm:tracking-[4px] text-[#005C5C] text-xs sm:text-sm font-semibold">
        TESTIMONIAL
      </span>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mt-4">
        Human Resources Services
      </h2>

    </div>

    <Swiper
      modules={[Navigation, Autoplay]}
      navigation={{
        nextEl: ".testimonial-next",
        prevEl: ".testimonial-prev",
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop
      spaceBetween={30}
      slidesPerView={2}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      }}
      className="!overflow-visible"
    >
      {/* Card 1 */}

      <SwiperSlide>
        <div className="h-full">

          <div className="relative bg-white rounded-[25px] lg:rounded-[35px] shadow-xl px-6 sm:px-8 lg:px-10 py-6 lg:py-8 h-full">

            <div className="absolute -top-4 left-6 lg:left-8 bg-[#FFD86B] px-5 lg:px-7 py-2 rounded-full">

              <span className="text-[#005C5C] text-sm lg:text-base tracking-wider">
                ★★★★★
              </span>

            </div>

            <p className="mt-8 text-slate-700 text-base lg:text-lg leading-7 lg:leading-8 min-h-[160px]">
              Working with Savvy Group has been a game-changer for our
              business. Their team provided expert guidance on
              streamlining our HR processes and workforce management.
            </p>

          </div>

          <div className="flex items-center gap-4 lg:gap-5 mt-6 lg:mt-8">

            <img
              src="/testimonials/user1.jpg"
              alt=""
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />

            <div>

              <h3 className="text-[#005C5C] text-xl lg:text-2xl font-bold">
                HR Manager
              </h3>

              <p className="text-gray-600 text-sm lg:text-base">
                Manufacturing Company
              </p>

            </div>

          </div>

        </div>
      </SwiperSlide>

      {/* Card 2 */}

      <SwiperSlide>
        <div className="h-full">

          <div className="relative bg-white rounded-[25px] lg:rounded-[35px] shadow-xl px-6 sm:px-8 lg:px-10 py-6 lg:py-8 h-full">

            <div className="absolute -top-4 left-6 lg:left-8 bg-[#FFD86B] px-5 lg:px-7 py-2 rounded-full">

              <span className="text-[#005C5C] text-sm lg:text-base tracking-wider">
                ★★★★★
              </span>

            </div>

            <p className="mt-8 text-slate-700 text-base lg:text-lg leading-7 lg:leading-8 min-h-[160px]">
              The security personnel deployed by Savvy Group are highly
              trained and professional. Their commitment to quality
              service exceeded our expectations.
            </p>

          </div>

          <div className="flex items-center gap-4 lg:gap-5 mt-6 lg:mt-8">

            <img
              src="/testimonials/user2.jpg"
              alt=""
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />

            <div>

              <h3 className="text-[#005C5C] text-xl lg:text-2xl font-bold">
                Facility Head
              </h3>

              <p className="text-gray-600 text-sm lg:text-base">
                Corporate Office
              </p>

            </div>

          </div>

        </div>
      </SwiperSlide>

      {/* Card 3 */}

      <SwiperSlide>
        <div className="h-full">

          <div className="relative bg-white rounded-[25px] lg:rounded-[35px] shadow-xl px-6 sm:px-8 lg:px-10 py-6 lg:py-8 h-full">

            <div className="absolute -top-4 left-6 lg:left-8 bg-[#FFD86B] px-5 lg:px-7 py-2 rounded-full">

              <span className="text-[#005C5C] text-sm lg:text-base tracking-wider">
                ★★★★★
              </span>

            </div>

            <p className="mt-8 text-slate-700 text-base lg:text-lg leading-7 lg:leading-8 min-h-[160px]">
              Excellent manpower solutions and quick deployment.
              Professional approach and highly responsive team.
            </p>

          </div>

          <div className="flex items-center gap-4 lg:gap-5 mt-6 lg:mt-8">

            <img
              src="/testimonials/user3.jpg"
              alt=""
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />

            <div>

              <h3 className="text-[#005C5C] text-xl lg:text-2xl font-bold">
                Operations Manager
              </h3>

              <p className="text-gray-600 text-sm lg:text-base">
                Logistics Company
              </p>

            </div>

          </div>

        </div>
      </SwiperSlide>

      {/* Card 4 */}

      <SwiperSlide>
        <div className="h-full">

          <div className="relative bg-white rounded-[25px] lg:rounded-[35px] shadow-xl px-6 sm:px-8 lg:px-10 py-6 lg:py-8 h-full">

            <div className="absolute -top-4 left-6 lg:left-8 bg-[#FFD86B] px-5 lg:px-7 py-2 rounded-full">

              <span className="text-[#005C5C] text-sm lg:text-base tracking-wider">
                ★★★★★
              </span>

            </div>

            <p className="mt-8 text-slate-700 text-base lg:text-lg leading-7 lg:leading-8 min-h-[160px]">
              Their housekeeping and support staff have significantly
              improved operational efficiency at our premises.
            </p>

          </div>

          <div className="flex items-center gap-4 lg:gap-5 mt-6 lg:mt-8">

            <img
              src="/testimonials/user4.jpg"
              alt=""
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />

            <div>

              <h3 className="text-[#005C5C] text-xl lg:text-2xl font-bold">
                Admin Head
              </h3>

              <p className="text-gray-600 text-sm lg:text-base">
                Retail Chain
              </p>

            </div>

          </div>

        </div>
      </SwiperSlide>

    </Swiper>

    {/* Navigation */}

    <div className="flex justify-center gap-4 sm:gap-5 mt-10 lg:mt-12">

      <button className="testimonial-prev w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-lg hover:bg-[#005C5C] hover:text-white transition-all duration-300">
        ←
      </button>

      <button className="testimonial-next w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-lg hover:bg-[#005C5C] hover:text-white transition-all duration-300">
        →
      </button>

    </div>

  </div>
</section>
{/* ================= NEWSLETTER SECTION ================= */}

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Dotted Line */}
          <div className="border-t-4 border-dotted border-gray-300 mb-20"></div>

          {/* Newsletter Card */}
          <div
            className="relative overflow-hidden rounded-lg"
            style={{
              backgroundImage: "url('/NLbg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 py-24 px-8 text-center">
              {/* Top Label */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-10 h-1 bg-orange-500 rounded-full mb-4"></div>

                <span className="tracking-[4px] text-white text-sm font-semibold">
                  NEWSLETTER
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-12">
                Subscribe to our newsletter
              </h2>

              {/* Form */}
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col md:flex-row justify-center gap-4 max-w-2xl mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="flex-1 px-8 py-5 rounded-md bg-white text-gray-800 outline-none disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-black font-bold tracking-[3px] px-10 py-5 rounded-md transition flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>

                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    "SUBSCRIBE"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}

      <section
  id="contact"
  className="bg-[#f8f8f8] py-16 sm:py-20 lg:py-24 px-5 sm:px-6 lg:px-8"
>
  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-12 lg:mb-20">

      <div className="w-10 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>

      <p className="tracking-[3px] sm:tracking-[4px] text-xs sm:text-sm font-semibold text-slate-700 uppercase">
        CONTACT
      </p>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-slate-800 mt-4 sm:mt-6 leading-tight">
        Contact Information
      </h2>

    </div>

    {/* Contact Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">

      {/* WhatsApp */}
      <a
        href="https://wa.me/918551873862"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white lg:bg-transparent text-center p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg lg:shadow-none transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-3"
      >

        <img
          src="/WhatsApp.svg"
          alt="WhatsApp"
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 transition-all duration-500 group-hover:scale-110"
        />

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-800 group-hover:text-orange-500">
          WhatsApp
        </h3>

        <div className="w-12 h-1 bg-orange-500 mx-auto my-5 lg:my-6 rounded-full"></div>

        <p className="uppercase tracking-[2px] sm:tracking-[4px] text-xs text-slate-600 leading-6">
          Just a message away.
        </p>

      </a>

      {/* Google Maps */}
      <a
        href="https://maps.app.goo.gl/K7DRMQWwdXCVXhut9"
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-white lg:bg-transparent text-center p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg lg:shadow-none transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-3"
      >

        <img
          src="/Maps.svg"
          alt="Google Maps"
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 transition-all duration-500 group-hover:scale-110"
        />

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-800 group-hover:text-orange-500">
          Google Maps
        </h3>

        <div className="w-12 h-1 bg-orange-500 mx-auto my-5 lg:my-6 rounded-full"></div>

        <p className="uppercase tracking-[2px] sm:tracking-[4px] text-xs text-slate-600 leading-6">
          Finding it difficult to reach us?
        </p>

      </a>

      {/* Call */}
      <a
        href="tel:+918551873862"
        className="group bg-white lg:bg-transparent text-center p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg lg:shadow-none transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-3 sm:col-span-2 lg:col-span-1"
      >

        <img
          src="/call.svg"
          alt="Call Us"
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 transition-all duration-500 group-hover:scale-110"
        />

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-800 group-hover:text-orange-500">
          Call Us
        </h3>

        <div className="w-12 h-1 bg-orange-500 mx-auto my-5 lg:my-6 rounded-full"></div>

        <p className="uppercase tracking-[2px] sm:tracking-[4px] text-xs text-slate-600 leading-6">
          24 × 7 At Your Service
        </p>

      </a>

    </div>

  </div>
</section>

      {/* ================= CONTACT FORM ================= */}

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <div className="w-10 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>

            <p className="tracking-[4px] text-sm font-semibold text-slate-700">
              CONTACT
            </p>

            <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-800 mt-8">
              Give your valuable suggestions
            </h2>

            <p className="mt-8 text-gray-500 text-lg">
              Feel free to share your feedback with us!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-5 bg-white rounded-md shadow-md outline-none focus:ring-2 focus:ring-orange-500"
              />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-5 bg-white rounded-md shadow-md outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-5 bg-white rounded-md shadow-md outline-none focus:ring-2 focus:ring-orange-500"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-5 bg-white rounded-md shadow-md outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <textarea
              rows={6}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full p-5 bg-white rounded-md shadow-md outline-none resize-none focus:ring-2 focus:ring-orange-500"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="relative overflow-hidden bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-black font-bold tracking-[3px] px-12 py-5 rounded-md transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center min-w-[280px]"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  "SEND A MESSAGE"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ===================== OUR CLIENTS ===================== */}

<section
  id="clients"
  className="py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#F5FAFA]"
>
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
    {/* Heading */}
    <div className="text-center mb-12 lg:mb-16">

      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5">
        <span className="w-10 sm:w-16 h-[2px] bg-[#D6AE45]" />

        <span className="uppercase tracking-[3px] sm:tracking-[5px] text-[#D6AE45] text-xs sm:text-sm font-semibold">
          OUR CLIENTS
        </span>

        <span className="w-10 sm:w-16 h-[2px] bg-[#D6AE45]" />
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900">
        Trusted by Leading Companies
      </h2>

      <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-slate-600 leading-7 sm:leading-8">
        We proudly partner with organizations across industries,
        delivering reliable manpower, security, housekeeping and
        business support services.
      </p>

    </div>

    {/* ================= FIRST ROW ================= */}

    <Swiper
      modules={[Autoplay]}
      loop
      speed={3500}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: false,
      }}
      allowTouchMove={false}
      spaceBetween={16}
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        480: {
          slidesPerView: 2.5,
          spaceBetween: 14,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 18,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
      className="mt-10 mb-6"
    >
      {[
        "/Client1.png",
        "/client2.png",
        "/client3.png",
        "/client4.png",
        "/client5.png",
        "/client6.png",
        "/client7.png",
      ].map((logo, index) => (
        <SwiperSlide key={index}>
          <div className="mx-auto flex h-[100px] sm:h-[120px] lg:h-[140px] w-full max-w-[170px] sm:max-w-[190px] lg:max-w-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:p-6 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">

            <img
              src={logo}
              alt={`Client ${index + 1}`}
              className="max-h-[60px] sm:max-h-[80px] lg:max-h-[110px] max-w-full object-contain transition-transform duration-500 hover:scale-110"
            />

          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* ================= SECOND ROW ================= */}

    <Swiper
      modules={[Autoplay]}
      loop
      speed={3500}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,
      }}
      allowTouchMove={false}
      spaceBetween={16}
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        480: {
          slidesPerView: 2.5,
          spaceBetween: 14,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 18,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
    >
      {[
        "/client8.png",
        "/client9.png",
        "/client10.png",
        "/client11.png",
        "/client12.png",
        "/client13.png",
        "/client14.png",
      ].map((logo, index) => (
        <SwiperSlide key={index}>
          <div className="mx-auto flex h-[100px] sm:h-[120px] lg:h-[140px] w-full max-w-[170px] sm:max-w-[190px] lg:max-w-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:p-6 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">

            <img
              src={logo}
              alt={`Client ${index + 8}`}
              className="max-h-[60px] sm:max-h-[80px] lg:max-h-[110px] max-w-full object-contain transition-transform duration-500 hover:scale-110"
            />

          </div>
        </SwiperSlide>
      ))}
    </Swiper>

  </div>
</section>
      </section>

{/* ================= FOOTER ================= */}

      <footer className="relative overflow-hidden border-t border-[#D6AE45]/30 bg-[#041A1A] text-white">

  {/* Background Glow */}
  <div className="absolute inset-0 opacity-10">

    <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#D6AE45] blur-[150px]" />

    <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#005C5C] blur-[150px]" />

  </div>

  {/* Overlay */}

  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-[#062626]/80" />

  <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-12">

      {/* ================= COMPANY ================= */}

      <div>

        <img
          src="/Logo.png"
          alt="Savvy Group"
          className="h-16 sm:h-20 mb-6"
        />

        <p className="text-slate-300 text-sm sm:text-base leading-7 sm:leading-8 mb-8">
          At the heart of our philosophy lies the belief that a thriving
          workplace is rooted in trust, professionalism, commitment and
          continuous growth.
        </p>

        {/* Social */}

        <div className="flex gap-3 mb-8">

          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D6AE45] flex items-center justify-center transition-all duration-300"
          >
            <FaFacebookF size={18} />
          </a>

          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D6AE45] flex items-center justify-center transition-all duration-300"
          >
            <FaInstagram size={18} />
          </a>

          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D6AE45] flex items-center justify-center transition-all duration-300"
          >
            <FaLinkedinIn size={18} />
          </a>

        </div>

        {/* Newsletter */}

        <div>

          <h4 className="text-lg font-semibold mb-4">
            Subscribe Newsletter
          </h4>

          <div className="flex flex-col sm:flex-row">

            <input
              type="email"
              placeholder="Email Address"
              className="
                w-full
                px-5
                py-4
                bg-black/30
                border
                border-slate-700
                rounded-xl
                sm:rounded-r-none
                outline-none
                placeholder:text-slate-400
              "
            />

            <button
              className="
                mt-3
                sm:mt-0
                sm:w-16
                bg-[#005C5C]
                hover:bg-[#D6AE45]
                transition-all
                rounded-xl
                sm:rounded-l-none
                flex
                items-center
                justify-center
                py-4
              "
            >
              <Send size={22} />
            </button>

          </div>

        </div>

      </div>

      {/* ================= QUICK LINKS ================= */}

      <div>

        <h3 className="text-2xl lg:text-3xl font-bold mb-8 flex items-center gap-3">

          <span className="text-[#D6AE45] text-3xl">
            •
          </span>

          Quick Links

        </h3>

        <ul className="space-y-4">

          {[
            "About Us",
            "Our Presence",
            "Services",
            "Testimonials",
            "Contact Us",
          ].map((item) => (

            <li
              key={item}
              className="group flex items-center gap-3 text-slate-300 hover:text-[#D6AE45] cursor-pointer transition-all duration-300"
            >

              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
              />

              {item}

            </li>

          ))}

        </ul>

      </div>

      <div>

        <h3 className="text-2xl lg:text-3xl font-bold mb-8 flex items-center gap-3">

          <span className="text-[#D6AE45] text-3xl">•</span>

          Our Services

        </h3>

        <ul className="space-y-4">

          {[
            "Human Resource Management",
            "Industrial Relations",
            "Security Services",
            "Housekeeping Services",
            "Operations Management",
            "Business Support",
          ].map((item) => (

            <li
              key={item}
              className="group flex items-center gap-3 text-slate-300 hover:text-[#D6AE45] transition-all duration-300 cursor-pointer"
            >

              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
              />

              <span className="leading-7">
                {item}
              </span>

            </li>

          ))}

        </ul>

      </div>

      {/* ================= CONTACT INFO ================= */}

      <div>

        <h3 className="text-2xl lg:text-3xl font-bold mb-8 flex items-center gap-3">

          <span className="text-[#D6AE45] text-3xl">•</span>

          Contact Info

        </h3>

        <div className="space-y-8">

          {/* Phone */}

          <div className="border-b border-slate-800 pb-5">

            <p className="text-[#D6AE45] text-sm uppercase tracking-wider mb-3">
              Call Us
            </p>

            <div className="flex items-center gap-3">

              <Phone
                size={18}
                className="text-[#D6AE45] shrink-0"
              />

              <span className="text-base sm:text-lg lg:text-xl font-semibold break-all">
                +91 85518 73862
              </span>

            </div>

          </div>

          {/* Email */}

          <div className="border-b border-slate-800 pb-5">

            <p className="text-[#D6AE45] text-sm uppercase tracking-wider mb-3">
              Email
            </p>

            <div className="flex items-center gap-3">

              <Mail
                size={18}
                className="text-[#D6AE45] shrink-0"
              />

              <span className="text-sm sm:text-base lg:text-lg break-all">
                info@savvygroups.com
              </span>

            </div>

          </div>

          {/* Address */}

          <div>

            <p className="text-[#D6AE45] text-sm uppercase tracking-wider mb-3">
              Location
            </p>

            <div className="flex items-start gap-3">

              <MapPin
                size={18}
                className="text-[#D6AE45] mt-1 shrink-0"
              />

              <span className="text-sm sm:text-base lg:text-lg leading-7">
                Pune, Maharashtra, India
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

    {/* ================= SCROLL BUTTON ================= */}

    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="
        fixed
        bottom-5
        right-5
        sm:bottom-8
        sm:right-8
        w-12
        h-12
        sm:w-14
        sm:h-14
        rounded-full
        bg-[#005C5C]
        hover:bg-[#D6AE45]
        text-white
        shadow-2xl
        hover:scale-110
        transition-all
        duration-300
        z-50
      "
    >
      ↑
    </button>

    {/* ================= COPYRIGHT ================= */}

    <div className="border-t border-white/10 mt-14 lg:mt-16 pt-8 text-center">

      <p className="text-slate-400 text-sm sm:text-base leading-7">
        © 2026 Savvy Group. All Rights Reserved.
      </p>

      <div className="w-20 sm:w-24 h-[2px] bg-[#D6AE45] mx-auto mt-4"></div>

    </div>

  </div>

</footer>
    </main>
  );
}
