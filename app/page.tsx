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
import { BikeIcon, ChevronLeft, ChevronRight } from "lucide-react";
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
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Search,
  ClipboardCheck,
  UserRound,
  BarChart3,
  ArrowRight,
} from "lucide-react";

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
      title: "Security Services",
      subtitle: "Vigilance. Discipline. Accountability.",
      description:
        "Trusted Security Solutions For Every Industry.",
      image:"/Hsecurity.png",
      icon: Users,
    },
    {
      title: "Housekeeping Services",
      subtitle: "Cleaner Facilities. Consistent Standards.",
      description:
        "Professional Housekeeping That Enhances Evey Workplace.",
      image:"/service4.png",
      icon: Handshake,
    },
    {
      title: "Integrated Facility Management",
      subtitle: "Multiple Services. One Point of Coordination.",
      description:
        "Maintaining hygienic and productive workplace environments.",
      image:"/ifm-banner.png",
      icon: ClipboardList,
    },
    {
      title: "Hospitality Management",
      subtitle: "Comfortable Stays. Professionally Managed Operations.",
      description: "Supporting organizations through streamlined operations.",
      image:"/hospitality1.png",
      icon: Building2,
    },
    {
      title: "Project mobility",
      subtitle: "Reliable Transportation Support for Project Operations.",
      description:
        "Providing dependable transportation solutions that support business growth.",
      image:"/transportation.png",
      icon: BikeIcon,
    },
    {
      title: "Manpower Services",
      subtitle: "The Right Workforce for the Right Requirement.",
      description:
        "Providing dependable manpower solutions that support business growth.",
      image:"/Service1.png",
      icon: Briefcase,
    },
    {
      title: "Smart Technology Solutions",
      subtitle: "IT Solutions",
      description:
        "Providing advanced CCTV, surveillance, and smart technology solutions for modern businesses.",
      image:"/cctv.png",
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

  const aboutImages = [
  {
    src: "/about.png",
    caption: "Experienced people. Reliable operations.",
    subCaption: "Built on trust and performance.",
  },
  {
    src: "/about-security.png",
    caption: "Professional teams. Stronger protection.",
    subCaption: "Security delivered with responsibility.",
  },
  {
    src: "/about-workforce.png",
    caption: "Skilled workforce. Seamless execution.",
    subCaption: "People who keep operations moving.",
  },
];

const approachImages = [
  {
    src: "/Service1.png",
    caption: "Well-managed facilities.",
    subCaption: "Better productivity. Stronger partnerships.",
  },
  {
    src: "/service4.png",
    caption: "Service excellence at every location.",
    subCaption: "Every day. Every site.",
  },
  {
    src: "/about-operations.png",
    caption: "Reliable operations. Consistent results.",
    subCaption: "Structured for your requirements.",
  },
];

const [aboutImageIndex, setAboutImageIndex] = useState(0);
const [approachImageIndex, setApproachImageIndex] = useState(0);

useEffect(() => {
  const aboutTimer = setInterval(() => {
    setAboutImageIndex((prev) => (prev + 1) % aboutImages.length);
  }, 5000);

  const approachTimer = setInterval(() => {
    setApproachImageIndex((prev) => (prev + 1) % approachImages.length);
  }, 5000);

  return () => {
    clearInterval(aboutTimer);
    clearInterval(approachTimer);
  };
}, []);

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

  if (!email.trim()) {
    toast.error("Please enter your email.");
    return;
  }

  setLoading(true);

  try {
    const data = await subscribeNewsletter(email);

    toast.success(data.message, {
      icon: "📧",
      style: {
        border: "1px solid #D6AE45",
        padding: "16px",
        color: "#0f172a",
      },
    });

    setEmail("");

  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      toast.error(error.message, {
        icon: "⚠️",
      });
    } else {
      toast.error("Unable to subscribe. Please try again.");
    }

  } finally {
    setLoading(false);
  }
};

  // PASTE ABOVE RETURN ↑↑↑

  return (
    <main className="min-h-screen from-slate-50 to-green-50 pt-32 bg-white ">
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

                <p className=" sm:block text-[10px] lg:text-xs tracking-wide text-slate-500">
                  Integrated Business Support & Facility Solutions
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
        pb-8
        bg-white
        "
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
                  We don't just provide solutions—we create opportunities, drive innovation, and deliver results that help businesses grow.
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
              onClick={() => window.location.href = '/services'}
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
                  <div className="w-20 lg:w-28 h-2 bg-[#D4AF37] rounded-full mx-auto mt-5 mb-6"></div>

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
                   Industry professionals empowering businesses with trusted manpower, security, housekeeping, and facility management solutions.
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
        Transforming ideas into successful outcomes through expertise, strategy, and commitment.
      </p>

      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-8">

        <button 
          onClick={() => window.location.href = '/services'}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl">
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
          Experts in delivering integrated workforce, facility management, and business support solutions across industries.
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
        Bringing innovation, technology, and business solutions together under one roof.
      </p>

      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-8">

        <button 
          onClick={() => window.location.href = '/services'}
          className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-4 rounded-xl"
        >
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

      {/* ================= ABOUT US ================= */}
      <section
  id="about"
  className="
    w-full
    overflow-hidden
    bg-[#F8FBF9]
    py-14
    sm:py-16
    md:py-20
    lg:py-24
    xl:py-28
"
>
  <div
    className="
      w-full
      max-w-7xl
      mx-auto
      px-4
      min-[375px]:px-5
      sm:px-6
      md:px-8
      lg:px-10
      xl:px-12
    "
  >

    {/* =====================================================
                        HEADER
    ====================================================== */}

    <div
      className="
        w-full
        max-w-4xl
        mx-auto
        text-center
        mb-10
        sm:mb-12
        md:mb-14
        lg:mb-16
        xl:mb-20
      "
    >

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          flex
          items-center
          justify-center
          gap-3
          sm:gap-4
        "
      >

        <span
          className="
            hidden
            xs:block
            w-6
            sm:w-10
            lg:w-16
            h-[2px]
            bg-[#D6AE45]
          "
        />

        <div className="flex items-center gap-2 sm:gap-3">

          <span
            className="
              w-2.5
              h-2.5
              sm:w-3
              sm:h-3
              rotate-45
              bg-[#006B54]
              shrink-0
            "
          />

          <span
            className="
              text-[#006B54]
              font-bold
              tracking-[3px]
              sm:tracking-[5px]
              text-xs
              sm:text-sm
              md:text-base
              whitespace-nowrap
            "
          >
            ABOUT US
          </span>

          <span
            className="
              w-2.5
              h-2.5
              sm:w-3
              sm:h-3
              rotate-45
              bg-[#006B54]
              shrink-0
            "
          />

        </div>

        <span
          className="
            hidden
            xs:block
            w-6
            sm:w-10
            lg:w-16
            h-[2px]
            bg-[#D6AE45]
          "
        />

      </motion.div>


      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="
          mt-5
          sm:mt-6
          text-[2rem]
          min-[375px]:text-[2.2rem]
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          xl:text-[4rem]
          font-black
          leading-[1.1]
          text-[#0B1730]
        "
      >
        Integrated Solutions.

        <span className="block text-[#006B54] mt-1 sm:mt-2">
          On-Ground Execution.
        </span>

      </motion.h2>


      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 70 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="
          h-1
          bg-[#D6AE45]
          mx-auto
          mt-5
          sm:mt-6
          rounded-full
        "
      />

    </div>


    {/* =====================================================
                    ROW 1
             IMAGE + WHO WE ARE
    ====================================================== */}

    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        sm:gap-7
        md:gap-8
        lg:gap-10
        items-stretch
      "
    >

      {/* =================================================
                          LEFT IMAGE
      ================================================== */}

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="
          relative
          w-full
          h-[300px]
          min-[375px]:h-[320px]
          sm:h-[400px]
          md:h-[450px]
          lg:h-[650px]
          overflow-hidden
          rounded-[22px]
          sm:rounded-[26px]
          lg:rounded-[30px]
          shadow-xl
        "
      >

        <AnimatePresence mode="wait">

          <motion.img
            key={aboutImageIndex}
            src={aboutImages[aboutImageIndex].src}
            alt="Savvy Group workforce"
            initial={{
              opacity: 0,
              scale: 1.05,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.02,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
            "
          />

        </AnimatePresence>


        {/* Gradient */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[45%]
            bg-gradient-to-t
            from-black/75
            via-black/40
            to-transparent
            pointer-events-none
          "
        />


        {/* Caption */}

        <div
          className="
            absolute
            left-4
            right-4
            bottom-4
            sm:left-6
            sm:right-6
            sm:bottom-6
            lg:left-8
            lg:right-8
            lg:bottom-8
            text-white
          "
        >

          <AnimatePresence mode="wait">

            <motion.div
              key={aboutImageIndex}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.5,
              }}
            >

              <p
                className="
                  text-lg
                  min-[375px]:text-xl
                  sm:text-2xl
                  lg:text-3xl
                  font-semibold
                  leading-tight
                "
              >
                {aboutImages[aboutImageIndex].caption}
              </p>

              <p
                className="
                  mt-2
                  text-[#D6AE45]
                  text-sm
                  sm:text-base
                  lg:text-lg
                  font-semibold
                "
              >
                {aboutImages[aboutImageIndex].subCaption}
              </p>

            </motion.div>

          </AnimatePresence>

        </div>

      </motion.div>


      {/* =================================================
                       WHO WE ARE
      ================================================== */}

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="
          w-full
          h-auto
          lg:h-[650px]
          bg-white
          rounded-[22px]
          sm:rounded-[26px]
          lg:rounded-[30px]
          border
          border-gray-100
          shadow-xl
          p-6
          min-[375px]:p-7
          sm:p-8
          md:p-9
          lg:p-10
          xl:p-12
          flex
          flex-col
          justify-center
          overflow-hidden
        "
      >

        {/* Number */}

        <div className="flex items-center gap-3 sm:gap-4">

          <div
            className="
              w-12
              h-12
              sm:w-14
              sm:h-14
              rounded-xl
              bg-[#006B54]
              text-white
              flex
              items-center
              justify-center
              text-lg
              sm:text-xl
              font-bold
              shrink-0
            "
          >
            01
          </div>

          <div>

            <p
              className="
                text-[#006B54]
                font-bold
                tracking-[2px]
                text-xs
                sm:text-sm
              "
            >
              WHO WE ARE
            </p>

            <div
              className="
                w-16
                sm:w-20
                h-[2px]
                bg-[#D6AE45]
                mt-2
              "
            />

          </div>

        </div>

          <br className="hidden sm:block" />
        

        <p
          className="
            text-sm
              sm:text-base
              leading-6
              sm:leading-7
              text-slate-600
          "
        >
          Savvy Group is a professionally managed multi-service
          organisation delivering security, facility management,
          workforce, hospitality, housekeeping, project mobility
          and operational support services.
        </p>


        {/* Feature 1 */}

        <div
          className="
            mt-2
            sm:mt-7
            pt-5
            sm:pt-6
            border-t
            border-gray-200
            flex
            items-start
            gap-3
            sm:gap-4
          "
        >

          <div
            className="
              shrink-0
              w-10
              h-10
              sm:w-12
              sm:h-12
              rounded-xl
              bg-[#E8F4EF]
              text-[#006B54]
              flex
              items-center
              justify-center
            "
          >
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <p
            className="
              text-sm
              sm:text-base
              leading-6
              sm:leading-7
              text-slate-600
            "
          >
            Since 2014, we support organisations with trained
            manpower, structured supervision and responsive
            coordination.
          </p>

        </div>


        {/* Feature 2 */}

        <div
          className="
            mt-4
            sm:mt-5
            pt-4
            sm:pt-5
            border-t
            border-gray-200
            flex
            items-start
            gap-3
            sm:gap-4
          "
        >

          <div
            className="
              shrink-0
              w-10
              h-10
              sm:w-12
              sm:h-12
              rounded-xl
              bg-[#E8F4EF]
              text-[#006B54]
              flex
              items-center
              justify-center
            "
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <p
            className="
              text-sm
              sm:text-base
              leading-6
              sm:leading-7
              text-slate-600
            "
          >
            Our services are structured around site requirements,
            manpower needs, operating conditions and expected
            service standards.
          </p>

        </div>


        {/* Button */}

        <button
          onClick={openContact}
          className="
            mt-6
            sm:mt-7
            self-start
            inline-flex
            items-center
            justify-center
            gap-2
            sm:gap-3
            bg-[#D6AE45]
            hover:bg-[#c79d33]
            text-black
            px-6
            sm:px-7
            py-3.5
            sm:py-4
            rounded-xl
            font-bold
            text-sm
            sm:text-base
            shadow-md
            hover:shadow-lg
            transition-all
            duration-300
            active:scale-95
          "
        >
          Learn More

          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />

        </button>

      </motion.div>

    </div>


    {/* =====================================================
                    ROW 2
              APPROACH + IMAGE
    ====================================================== */}

    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        sm:gap-7
        md:gap-8
        lg:gap-10
        items-stretch
        mt-6
        sm:mt-8
        lg:mt-10
      "
    >

      {/* =================================================
                         OUR APPROACH
      ================================================== */}

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="
          w-full
          h-auto
          lg:h-[650px]
          bg-white
          rounded-[22px]
          sm:rounded-[26px]
          lg:rounded-[30px]
          border
          border-gray-100
          shadow-xl
          p-6
          min-[375px]:p-7
          sm:p-8
          md:p-9
          lg:p-10
          xl:p-12
          flex
          flex-col
          justify-center
          overflow-hidden
        "
      >

        <div className="flex items-center gap-3 sm:gap-4">

          <div
            className="
              w-12
              h-12
              sm:w-14
              sm:h-14
              rounded-xl
              bg-[#006B54]
              text-white
              flex
              items-center
              justify-center
              text-lg
              sm:text-xl
              font-bold
              shrink-0
            "
          >
            02
          </div>

          <div>

            <p
              className="
                text-[#006B54]
                font-bold
                tracking-[2px]
                text-xs
                sm:text-sm
              "
            >
              OUR APPROACH
            </p>

            <div
              className="
                w-16
                sm:w-20
                h-[2px]
                bg-[#D6AE45]
                mt-2
              "
            />

          </div>

        </div>


        <h3
          className="
            mt-6
            sm:mt-7
            lg:mt-8
            text-[1.75rem]
            min-[375px]:text-[1.9rem]
            sm:text-3xl
            md:text-4xl
            lg:text-[2.7rem]
            font-black
            leading-[1.15]
            text-[#0B1730]
          "
        >
          A Structured Approach.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          
        </h3>


       {/* =====================================================
                    PROCESS
===================================================== */}

<div className="mt-7 sm:mt-8 space-y-7">

  {/* ================= ROW 1 ================= */}

  <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start">

    {/* Understand */}

    <div className="flex flex-col items-center text-center">

      <div
        className="
          w-11 h-11
          sm:w-14 sm:h-14
          rounded-full
          bg-[#006B54]
          text-white
          flex items-center justify-center
          shadow-md
        "
      >
        <Search className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      <p className="mt-2 sm:mt-3 text-[11px] sm:text-sm font-semibold text-slate-700">
        Understand
      </p>

    </div>


    {/* Arrow */}

    <div className="flex items-center justify-center pt-4 sm:pt-5">
      <span className="text-[#D6AE45] text-lg sm:text-xl font-bold">
        →
      </span>
    </div>


    {/* Plan */}

    <div className="flex flex-col items-center text-center">

      <div
        className="
          w-11 h-11
          sm:w-14 sm:h-14
          rounded-full
          bg-[#006B54]
          text-white
          flex items-center justify-center
          shadow-md
        "
      >
        <ClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      <p className="mt-2 sm:mt-3 text-[11px] sm:text-sm font-semibold text-slate-700">
        Plan
      </p>

    </div>


    {/* Arrow */}

    <div className="flex items-center justify-center pt-4 sm:pt-5">
      <span className="text-[#D6AE45] text-lg sm:text-xl font-bold">
        →
      </span>
    </div>


    {/* Mobilise */}

    <div className="flex flex-col items-center text-center">

      <div
        className="
          w-11 h-11
          sm:w-14 sm:h-14
          rounded-full
          bg-[#006B54]
          text-white
          flex items-center justify-center
          shadow-md
        "
      >
        <UserRound className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      <p className="mt-2 sm:mt-3 text-[11px] sm:text-sm font-semibold text-slate-700">
        Mobilise
      </p>

    </div>

  </div>


  {/* ================= ROW 2 ================= */}

  <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start">

    {/* Manage */}

    <div className="flex flex-col items-center text-center">

      <div
        className="
          w-11 h-11
          sm:w-14 sm:h-14
          rounded-full
          bg-[#006B54]
          text-white
          flex items-center justify-center
          shadow-md
        "
      >
        <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      <p className="mt-2 sm:mt-3 text-[11px] sm:text-sm font-semibold text-slate-700">
        Manage
      </p>

    </div>


    {/* Arrow */}

    <div className="flex items-center justify-center pt-4 sm:pt-5">
      <span className="text-[#D6AE45] text-lg sm:text-xl font-bold">
        →
      </span>
    </div>


    {/* Monitor */}

    <div className="flex flex-col items-center text-center">

      <div
        className="
          w-11 h-11
          sm:w-14 sm:h-14
          rounded-full
          bg-[#006B54]
          text-white
          flex items-center justify-center
          shadow-md
        "
      >
        <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      <p className="mt-2 sm:mt-3 text-[11px] sm:text-sm font-semibold text-slate-700">
        Monitor
      </p>

    </div>


    {/* Arrow */}

    <div className="flex items-center justify-center pt-4 sm:pt-5">
      <span className="text-[#D6AE45] text-lg sm:text-xl font-bold">
        →
      </span>
    </div>


    {/* Improve */}

    <div className="flex flex-col items-center text-center">

      <div
        className="
          w-11 h-11
          sm:w-14 sm:h-14
          rounded-full
          bg-[#006B54]
          text-white
          flex items-center justify-center
          shadow-md
        "
      >
        <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      <p className="mt-2 sm:mt-3 text-[11px] sm:text-sm font-semibold text-slate-700">
        Improve
      </p>

    </div>

  </div>

</div>


{/* =====================================================
                    DESCRIPTION
===================================================== */}

<div
  className="
    mt-7
    sm:mt-8
    pt-5
    sm:pt-6
    border-t
    border-gray-200
  "
>
  <p
    className="
      text-sm
      sm:text-base
      lg:text-lg
      leading-7
      sm:leading-8
      text-slate-600
    "
  >
    We combine experience, compliance and responsive
    execution to deliver consistent and reliable
    service outcomes.
  </p>
</div>

      </motion.div>


      {/* =================================================
                          RIGHT IMAGE
      ================================================== */}

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="
          relative
          w-full
          h-[300px]
          min-[375px]:h-[320px]
          sm:h-[400px]
          md:h-[450px]
          lg:h-[650px]
          overflow-hidden
          rounded-[22px]
          sm:rounded-[26px]
          lg:rounded-[30px]
          shadow-xl
        "
      >

        <AnimatePresence mode="wait">

          <motion.img
            key={approachImageIndex}
            src={approachImages[approachImageIndex].src}
            alt="Savvy Group operations"
            initial={{
              opacity: 0,
              scale: 1.05,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.02,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
            "
          />

        </AnimatePresence>


        {/* Gradient */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[45%]
            bg-gradient-to-t
            from-black/75
            via-black/40
            to-transparent
            pointer-events-none
          "
        />


        {/* Caption */}

        <div
          className="
            absolute
            left-4
            right-4
            bottom-4
            sm:left-6
            sm:right-6
            sm:bottom-6
            lg:left-8
            lg:right-8
            lg:bottom-8
            text-white
          "
        >

          <AnimatePresence mode="wait">

            <motion.div
              key={approachImageIndex}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.5,
              }}
            >

              <p
                className="
                  text-lg
                  min-[375px]:text-xl
                  sm:text-2xl
                  lg:text-3xl
                  font-semibold
                  leading-tight
                "
              >
                {approachImages[approachImageIndex].caption}
              </p>

              <p
                className="
                  mt-2
                  text-[#D6AE45]
                  text-sm
                  sm:text-base
                  lg:text-lg
                  font-semibold
                "
              >
                {approachImages[approachImageIndex].subCaption}
              </p>

            </motion.div>

          </AnimatePresence>

        </div>

      </motion.div>

    </div>

  </div>
</section>

    
 {/* OUR SERVICES */}
<section id="services" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAF9]">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-14 lg:mb-16">
      <p className="uppercase tracking-[4px] text-[#005C5C] font-semibold text-sm">
        OUR SERVICES
      </p>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4">
        Workforce Solutions
      </h2>

      <p className="text-slate-500 text-base sm:text-lg lg:text-xl mt-4 max-w-2xl mx-auto">
        Delivering Reliable Manpower And Business Support Services
      </p>
    </div>

    {/* First 6 Services */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

      {services.slice(0, 6).map((service, index) => {
        const Icon = service.icon;

        return (
          <div
            key={index}
            className="group bg-white rounded-[30px] p-5 lg:p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            {/* Image */}
            <div className="relative rounded-[25px]">

              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[220px] sm:h-[240px] lg:h-[260px] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute -bottom-5 right-5 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#005C5C] border-4 border-white flex items-center justify-center shadow-lg">
                <Icon className="w-7 h-7 lg:w-9 lg:h-9 text-[#D6AE45]" />
              </div>

            </div>

            {/* Content */}

            <p className="mt-8 text-[#005C5C] text-base lg:text-lg font-medium">
              {service.subtitle}
            </p>

            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mt-3 leading-tight min-h-[80px]">
              {service.title}
            </h3>

            <div className="border-t border-slate-200 my-6"></div>

            <p className="text-slate-600 text-sm sm:text-base leading-7 lg:leading-8">
              {service.description}
            </p>

          </div>
        );
      })}
    </div>

    {/* Explore More */}
    <div className="relative my-20 text-center">

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-24 bg-[#0C8F89]/20 blur-[90px] rounded-full"></div>

      <div className="relative">

        

        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
          Explore Our Complete Service Portfolio
        </h3>

        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
          Discover additional workforce, transportation, facility management,
          technology and business support services tailored to your needs.
        </p>

        <Link
          href="/services"
          className="
          mt-8
          inline-flex
          items-center
          gap-3
          rounded-full
          bg-gradient-to-r
          from-[#005C5C]
          to-[#008080]
          px-10
          py-4
          text-white
          font-semibold
          text-lg
          shadow-xl
          transition-all
          duration-500
          hover:scale-105
          hover:shadow-[0_20px_45px_rgba(0,92,92,0.35)]
          group
          "
        >
          Explore More Services

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2"
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

  </div>

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
          To be India's most trusted partner for integrated facility management and workforce solutions, 
          delivering excellence through security services, housekeeping, hospitality, manpower outsourcing, 
          transportation, and business support. We aspire to build long-term client relationships by providing 
          reliable, innovative, and sustainable solutions that enhance operational efficiency, create safer workplaces, 
          and contribute to the growth of businesses across India.
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
          Our mission is to deliver reliable, customized, and high-quality integrated facility 
          management and workforce solutions that enable businesses to focus on their core operations. 
          Through skilled professionals, strong statutory compliance, continuous training, operational 
          excellence, and a customer-first approach, we are committed to providing security services, 
          housekeeping, guest house management, transportation, catering, manpower outsourcing, and business 
          support services with the highest standards of quality, safety, and professionalism.
        </p>

      </div>

    </div>

  </div>
</section>

</section>
      {/* WHY CHOOSE US */}
<section id="why-us" className="pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24 bg-[#F8FAF9]">
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

<section className="bg-[#f6f7f9] relative py-12 sm:py-16 lg:py-24">
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
        Delivering integrated workforce, security, housekeeping, guest house management,
         transportation, and facility management solutions across multiple states.
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

            <p className="text-[#D6AE45] font-semibold mt-2">
              States Covered
            </p>

            <p className="text-slate-500 mt-3 text-sm">
              Maharashtra, Gujarat, Uttar Pradesh, Rajasthan, Madhya Pradesh, Karnataka, Tamil Nadu
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

            <p className="text-[#D6AE45] font-semibold mt-2">
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
                  end={1000}
                  duration={3}
                  separator=","
                />
              )}
              +
            </h3>

            <p className="text-[#D6AE45] font-semibold mt-2">
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

            <p className="text-[#D6AE45] font-semibold mt-2">
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

      <div className="relative flex justify-center items-center order-first lg:order-last w-full">

  <div className="w-full flex justify-center">

    <object
      data="in.svg"
      type="image/svg+xml"
      aria-label="Savvy Group presence across India"
      className="
        w-[94vw]
        max-w-[520px]
        sm:w-[85vw]
        sm:max-w-[600px]
        md:w-[75vw]
        md:max-w-[650px]
        lg:w-[700px]
        lg:max-w-[700px]
        xl:w-[850px]
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

            <h4 className=" text-slate-900 font-bold text-lg">
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

            <h4 className="text-slate-900 font-bold text-lg">
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

            <h4 className="text-slate-900 font-bold text-lg">
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

            <h4 className="text-slate-900 font-bold text-lg">
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
        href="https://wa.me/919518381413"
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
        href="tel:+919518381413"
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
                className="text-[#D6AE45] w-full p-5 rounded-md shadow-md outline-none focus:ring-2 focus:ring-orange-500"
              />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="text-[#D6AE45] w-full p-5 rounded-md shadow-md outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="text-[#D6AE45] w-full p-5 rounded-md shadow-md outline-none focus:ring-2 focus:ring-orange-500"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="text-[#D6AE45] w-full p-5 rounded-md shadow-md outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <textarea
              rows={6}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="text-[#D6AE45] w-full p-5 rounded-md shadow-md outline-none resize-none focus:ring-2 focus:ring-orange-500"
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

        

        <p className="text-slate-300 text-sm sm:text-base leading-7 sm:leading-8 mb-8 text-justify">
          Whether the requirement is security, workforce deployment, 
          facility management, guest house operations, catering, 
          housekeeping, project mobility or CCTV surveillance, 
          Savvy Group provides solutions structured around actual operating requirements.
        </p>

        <img
          src="/Logo.png"
          alt="Savvy Group"
          className="h-16 sm:h-20 mb-6"
        />

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
            { name: "About Us", href: "/#bout" },
            { name: "Our Presence", href: "/#presence" },
            { name: "Services", href: "/#services" },
            { name: "Contact Us", href: "/#contact" },
          ].map((item) => (

            <li
              key={item.name}
              className="group flex items-center gap-3 text-slate-300 hover:text-[#D6AE45] cursor-pointer transition-all duration-300"
              
            >



              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
              />

              {item.name}

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
            "Security Services",
            "Housekeeping Services",
            "Integrated Facility Management",
            "Hospitality Services",
            "Project Vehicle Services",
            "Smart Technology Solutions",
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
                +91 7720020699
              </span>
              
              

            </div>
            <div className="flex items-center gap-3">

              <Phone
                size={18}
                className="text-[#D6AE45] shrink-0"
              />

              <span className="text-base sm:text-lg lg:text-xl font-semibold break-all">
                +91 20 4109 8877
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
                1st floor, balaji complex, Vinayak nagar, Pimple gurav, pune-411061
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
