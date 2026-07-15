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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 pt-32">
      {/* ================= NAVBAR ================= */}

      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="w-full bg-white/95 backdrop-blur-xl shadow-xl border-b border-slate-200 px-16 h-[100px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Savvy Group"
              className="w-16 h-16 object-contain"
            />

            <div>
              <h1 className="text-3xl font-bold text-slate-900">Savvy Group</h1>

              <p className="text-xs tracking-wide text-slate-500">
                Think Beyond Your Boundaries
              </p>
            </div>
          </div>

          {/* Menu */}
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
                className="relative text-[15px] font-semibold uppercase tracking-wide text-slate-700 hover:text-[#005C5C] transition-all duration-300
            after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:w-0 after:bg-[#D6AE45]
            after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Button */}
          <a
            href="#contact"
            className="hidden md:flex items-center justify-center bg-[#D6AE45] hover:bg-[#c39c35] text-black px-8 py-4 rounded-xl font-semibold tracking-wide shadow-lg transition-all duration-300"
          >
            <button onClick={openContact}>Contact Now →</button>
          </a>
        </div>
      </nav>

      {/* Hero Slider */}
      <section id="home" className="max-w-7xl mx-auto px-10 py-5">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSlideChange={() => console.log("slide changed")}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
              <div>
                <span className="bg-yellow-50 text-[#D4AF37] px-4 py-2 rounded-full">
                  Welcome to Savvy Group
                </span>

                <h1 className="text-7xl font-bold mt-8 leading-tight text-slate-900">
                  Beyond Services.
                  <br />
                  <span className="text-green-600">
                    Building Possibilities.
                  </span>
                </h1>

                <p className="mt-8 text-xl text-gray-600 max-w-xl">
                  We do not just provide solutions. We create opportunities,
                  drive innovation and deliver results that help businesses
                  grow.
                </p>

                <div className="flex gap-4 mt-10">
                  <button  className="bg-green-600 text-white px-8 py-4 rounded-xl">
                    Explore Services
                  </button>

                  <button onClick={openContact} className="border border-green-600 text-green-600 px-8 py-4 rounded-xl">
                    Contact Us
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center relative">
                {/* Blurred Logo Background */}
                <img
                  src="/logo.png"
                  alt="Savvy Group Logo"
                  className="w-[1000px] object-contain opacity-15 blur-2x"
                />

                {/* Content */}
                <div className="absolute text-center max-w-lg">
                  <div className="w-24 h-2 bg-[#D4AF37] mx-auto mb-6 rounded-full"></div>
                  <p className="uppercase tracking-[0.4em] text-[#D4AF37] text-sm font-semibold mb-6">
                    Experts • Innovation • Growth
                  </p>

                  <h2
                    className="text-5xl md:text-6xl font-bold text-black tracking-wide"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    INDUSTRY EXPERTS
                  </h2>

                  <div className="w-24 h-2 bg-[#D4AF37] mx-auto mt-4 mb-8 rounded-full"></div>

                  <p
                    className=" text-bold mt-8 text-xl text-slate-700 leading-10 font-normal max-w-xl mx-auto"
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
            <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
              <div>
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                  Innovation & Excellence
                </span>

                <h1 className="text-7xl font-bold mt-8 leading-tight text-slate-900">
                  Where Ideas
                  <br />
                  <span className="text-blue-600">Meet Execution.</span>
                </h1>

                <p className="mt-8 text-xl text-gray-600 max-w-xl">
                  Transforming concepts into successful outcomes through
                  expertise, strategy and commitment.
                </p>

                <div className="flex gap-4 mt-10">
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-xl">
                    Learn More
                  </button>

                  <button onClick={openContact} className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl">
                    Contact Us
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center relative">
                {/* Blurred Logo Background */}
                <img
                  src="/logo.png"
                  alt="Savvy Group Logo"
                  className="w-[1000px] object-contain opacity-15 blur-2x"
                />

                {/* Content */}
                <div className="absolute text-center max-w-lg">
                  <div className="w-24 h-2 bg-[#4e1add] mx-auto mb-6 rounded-full"></div>
                  <p className="uppercase tracking-[0.4em] text-blue-600 text-sm font-semibold mb-6">
                    People • Experience • Excellence
                  </p>

                  <h2
                    className="text-5xl md:text-5xl font-bold text-black tracking-wide"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    COMPREHENSIVE TEAM
                  </h2>

                  <div className="w-24 h-2 bg-[#4e1add] mx-auto mt-4 mb-8 rounded-full"></div>

                  <p
                    className=" text-bold mt-8 text-xl text-slate-700 leading-10 font-normal max-w-xl mx-auto"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Experts in Human Resources, Industrial Relations, and
                    Operations from industry backgrounds.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="grid md:grid-cols-2 gap-12 items-center min-h-[600px]">
              <div>
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                  Future Ready Solutions
                </span>

                <h1 className="text-7xl font-bold mt-8 leading-tight text-slate-900">
                  Think Bigger.
                  <br />
                  <span className="text-green-600">Build Smarter.</span>
                  <br />
                  Grow Faster.
                </h1>

                <p className="mt-8 text-xl text-gray-600 max-w-xl">
                  Bringing innovation, technology and business solutions
                  together under one roof.
                </p>

                <div className="flex gap-4 mt-10">
                  <button className="bg-green-600 text-white px-8 py-4 rounded-xl">
                    Get Started
                  </button>

                  <button onClick={openContact} className="border border-green-600 text-green-600 px-8 py-4 rounded-xl">
                    Contact Us
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center relative">
                {/* Blurred Logo Background */}
                <img
                  src="/logo.png"
                  alt="Savvy Group Logo"
                  className="w-[1000px] object-contain opacity-15 blur-2x"
                />

                {/* Content */}
                <div className="absolute text-center max-w-lg">
                  <div className="w-24 h-2 bg-[#08ed2e] mx-auto mb-6 rounded-full"></div>
                  <p className="uppercase tracking-[0.4em] text-green-700 text-sm font-semibold mb-6">
                    Quality • Reliability • Commitment
                  </p>

                  <h2
                    className="text-5xl md:text-5xl font-bold text-black tracking-wide"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    SERVICE EXCELLENCE
                  </h2>

                  <div className="w-24 h-2 bg-[#08ed2e] mx-auto mt-4 mb-8 rounded-full"></div>

                  <p
                    className=" text-bold mt-8 text-xl text-slate-700 leading-10 font-normal max-w-xl mx-auto"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Committed to delivering quality, consistent, and
                    uninterrupted services for clients.
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* About Us Section */}
      {/* About Us Section */}
      {/* ABOUT US */}
      <section id="about" className="py-28 px-6 md:px-16 bg-[#edf4f1]">
        <div className="max-w-7xl mx-auto">
          {/* Section Tag */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 bg-green-600 rotate-45"></div>
            <span className="uppercase tracking-widest text-sm font-semibold text-slate-700">
              About Us
            </span>
          </div>

          {/* Heading */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mt-20">
            {/* Left Side */}
            <div>
              <h2 className="text-6xl font-bold text-slate-900 leading-tight">
                Empowering Businesses Through Expert Workforce Solutions
              </h2>
            </div>

            {/* Right Side */}
            <div>
              {/* Green Accent Line */}
              <div className="w-20 h-1 bg-green-600 rounded-full mb-8"></div>

              <p
                className="text-xl text-slate-700 leading-10 text-justify"
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

              <button className="mt-10 bg-[#D6AE45] hover:bg-[#c39c35] text-black px-8 py-4 rounded-xl font-semibold tracking-wide shadow-lg transition-all duration-300">
                Contact Now →
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-16 mt-10 items-center">
            {/* Left Side */}
            <div className="space-y-10">
              {/* Item 1 */}
              <div className="flex gap-6">
                <div className="min-w-[80px] h-[80px] rounded-full bg-green-700 text-white flex items-center justify-center text-3xl font-bold">
                  01
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">
                    Industry Expertise
                  </h3>

                  <p className="text-slate-600 text-lg leading-relaxed">
                    Experienced professionals with deep knowledge of Human
                    Resources, Industrial Relations and Operations Management
                    across multiple industries.
                  </p>
                </div>
              </div>

              <hr className="border-slate-300" />

              {/* Item 2 */}
              <div className="flex gap-6">
                <div className="min-w-[80px] h-[80px] rounded-full bg-green-700 text-white flex items-center justify-center text-3xl font-bold">
                  02
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">
                    Reliable Workforce Solutions
                  </h3>

                  <p className="text-slate-600 text-lg leading-relaxed">
                    Delivering dependable manpower, security services,
                    housekeeping and business support solutions tailored to
                    client requirements.
                  </p>
                </div>
              </div>

              <hr className="border-slate-300" />

              {/* Item 3 */}
              <div className="flex gap-6">
                <div className="min-w-[80px] h-[80px] rounded-full bg-green-700 text-white flex items-center justify-center text-3xl font-bold">
                  03
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">
                    Long-Term Partnership
                  </h3>

                  <p className="text-slate-600 text-lg leading-relaxed">
                    We help organizations improve workforce performance,
                    operational efficiency and achieve sustainable business
                    growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="relative overflow-hidden rounded-[40px]">
              {/* Image */}
              <img
                src="/about.png"
                alt="Savvy Group Team"
                className="w-full h-full object-cover rounded-[40px]"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-[20px]" />

              {/* Quote Box */}
              <div className="absolute bottom-5 left-8 right-8 bg-black/80 backdrop-blur-md text-white py-3 px-6 rounded-2xl">
                <p
                  className="text-base md:text-lg italic text-center leading-8"
                  style={{ fontFamily: "Book Antiqua" }}
                >
                  {quotes[currentQuote]}
                </p>

                <p className="text-center mt-2 text-green-300 font-semibold">
                  — Savvy Group
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* service */}
      {/* service */}
      {/* service */}

      <section id="services" className="py-24 bg-[#F8FAF9] ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[4px] text-[#005C5C] font-semibold">
              OUR SERVICES
            </p>

            <h2 className="text-5xl font-bold text-slate-900 mt-4">
              Workforce Solutions
            </h2>

            <p className="text-slate-500 text-xl mt-4">
              Delivering Reliable Manpower And Business Support Services
            </p>
          </div>

          <div className="overflow-hidden pb-22">
            <div
              className="flex gap-8 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 422}px)`,
              }}
            >
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <div
                    key={index}
                    className="
            w-[390px]
            flex-shrink-0
            bg-white
            rounded-[30px]
            p-6
            shadow-lg
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-300
          "
                  >
                    <div className="relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-[260px] object-cover rounded-[25px]"
                      />

                      <div className="absolute -bottom-5 right-5 w-20 h-20 rounded-full bg-[#005C5C] border-4 border-white flex items-center justify-center shadow-lg">
                        <Icon size={34} color="#D6AE45" />
                      </div>
                    </div>

                    <p className="mt-10 text-[#005C5C] text-lg">
                      {service.subtitle}
                    </p>

                    <h3 className="text-3xl font-bold text-slate-900 mt-4 leading-tight min-h-[90px]">
                      {service.title}
                    </h3>

                    <div className="border-t border-slate-200 my-6"></div>

                    <p className="text-slate-600 leading-8">
                      {service.description}
                    </p>
                  </div>
                );
              })}

              
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-14 h-14 rounded-full bg-[#005C5C] text-white text-2xl disabled:opacity-40"
          >
            ←
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= services.length - 3}
            className="w-14 h-14 rounded-full bg-[#005C5C] text-white text-2xl disabled:opacity-40"
          >
            →
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 rounded-full border border-[#0b7466] bg-white px-8 py-4 text-[15px] font-semibold text-[#0b7466] shadow-md transition-all duration-300 hover:bg-[#0b7466] hover:text-white hover:shadow-xl"
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
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-us" className="py-24 bg-[#F8FAF9]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <p className="uppercase tracking-[4px] text-[#005C5C] font-semibold">
              WHY CHOOSE US
            </p>

            <h2 className="text-5xl font-bold text-slate-900 mt-4">
              The Trusted Partner For Workforce Excellence
            </h2>

            <p className="text-slate-500 text-xl mt-4">
              Delivering Reliable Workforce Solutions With Quality, Commitment
              And Expertise
            </p>
          </div>

          {/* Cards */}
          <div className="flex h-[650px] overflow-hidden rounded-[30px]">
            {/* Card 1 */}
            <div className="group relative flex-1 hover:flex-[2] transition-all duration-700 cursor-pointer overflow-hidden border-r border-white">
              <img
                src="/why1.jpg"
                alt="Industry Expertise"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-[#005C5C]/75"></div>

              <h1 className="absolute top-10 left-10 text-[100px] font-bold text-white/20">
                01
              </h1>

              <div className="absolute bottom-12 left-10 right-10 text-white">
                <span className="border border-[#D6AE45] px-6 py-2 rounded-full text-[#D6AE45]">
                  Expertise
                </span>

                <h3 className="text-4xl font-bold mt-8">Industry Expertise</h3>

                <p className="mt-6 text-lg leading-8 opacity-0 group-hover:opacity-100 transition duration-500">
                  Our professionals bring deep expertise in Human Resources,
                  Industrial Relations, Security Services and Operations
                  Management.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative flex-1 hover:flex-[2] transition-all duration-700 cursor-pointer overflow-hidden border-r border-white">
              <img
                src="/why2.png"
                alt="Reliable Workforce"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-[#005C5C]/75"></div>

              <h1 className="absolute top-10 left-10 text-[100px] font-bold text-white/20">
                02
              </h1>

              <div className="absolute bottom-12 left-10 right-10 text-white">
                <span className="border border-[#D6AE45] px-6 py-2 rounded-full text-[#D6AE45]">
                  Workforce
                </span>

                <h3 className="text-4xl font-bold mt-8">Reliable Workforce</h3>

                <p className="mt-6 text-lg leading-8 opacity-0 group-hover:opacity-100 transition duration-500">
                  We provide skilled and dependable manpower solutions tailored
                  to meet the unique requirements of every client.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative flex-1 hover:flex-[2] transition-all duration-700 cursor-pointer overflow-hidden border-r border-white">
              <img
                src="/why3.png"
                alt="Pan India Presence"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-[#005C5C]/75"></div>

              <h1 className="absolute top-10 left-10 text-[100px] font-bold text-white/20">
                03
              </h1>

              <div className="absolute bottom-12 left-10 right-10 text-white">
                <span className="border border-[#D6AE45] px-6 py-2 rounded-full text-[#D6AE45]">
                  Presence
                </span>

                <h3 className="text-4xl font-bold mt-8">Pan India Presence</h3>

                <p className="mt-6 text-lg leading-8 opacity-0 group-hover:opacity-100 transition duration-500">
                  Our growing network enables us to deliver workforce and
                  support solutions across multiple states in India.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative flex-1 hover:flex-[2] transition-all duration-700 cursor-pointer overflow-hidden">
              <img
                src="/why4.png"
                alt="Client Success"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-[#005C5C]/75"></div>

              <h1 className="absolute top-10 left-10 text-[100px] font-bold text-white/20">
                04
              </h1>

              <div className="absolute bottom-12 left-10 right-10 text-white">
                <span className="border border-[#D6AE45] px-6 py-2 rounded-full text-[#D6AE45]">
                  Partnership
                </span>

                <h3 className="text-4xl font-bold mt-8">Client Success</h3>

                <p className="mt-6 text-lg leading-8 opacity-0 group-hover:opacity-100 transition duration-500">
                  We build long-term partnerships through quality service,
                  operational excellence and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PRESENCE ACROSS INDIA */}

      <section className="bg-[#f6f7f9] relative pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <p className="uppercase tracking-[4px] text-[#D6AE45] font-semibold mb-6"></p>

          <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            OUR PRESENCE
            <span className="text-[#D6AE45]">
              <h1> ACROSS INDIA</h1>
            </span>
          </h2>

          <p className="text-slate-600 text-xl mt-8 leading-9">
            Delivering reliable manpower, security services, housekeeping,
            industrial relations and business support solutions across multiple
            states.
          </p>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT CONTENT */}
            <div>
              {/* Stats Grid */}
              <div ref={ref} className="grid grid-cols-2 gap-5 mt-12">
                {/* Card 1 */}
                <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center mb-4">
                    <MapPinned size={30} className="text-[#D6AE45]" />
                  </div>

                  <h3 className="text-4xl font-bold text-slate-900 tabular-nums">
                    {inView && <CountUp end={7} duration={10} />}+
                  </h3>

                  <p className="font-semibold mt-2">States Covered</p>

                  <p className="text-slate-500 mt-3 text-sm">
                    Maharashtra, Gujarat & Uttar Pradesh
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center mb-4">
                    <Building2 size={30} className="text-[#D6AE45]" />
                  </div>

                  <h3 className="text-4xl font-bold text-slate-900 tabular-nums">
                    {inView && <CountUp end={100} duration={2.5} />}+
                  </h3>

                  <p className="font-semibold mt-2">Clients Served</p>

                  <p className="text-slate-500 mt-3 text-sm">
                    Trusted across industries
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center mb-4">
                    <Users size={30} className="text-[#D6AE45]" />
                  </div>

                  <h3 className="text-4xl font-bold text-slate-900 tabular-nums">
                    {inView && (
                      <CountUp end={5000} duration={3} separator="," />
                    )}
                    +
                  </h3>

                  <p className="font-semibold mt-2">Workforce Managed</p>

                  <p className="text-slate-500 mt-3 text-sm">
                    Skilled manpower deployed
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full border flex items-center justify-center mb-4">
                    <ShieldCheck size={30} className="text-[#D6AE45]" />
                  </div>

                  <h3 className="text-4xl font-bold text-slate-900 tabular-nums">
                    {inView && <CountUp end={99} duration={2} />}%
                  </h3>

                  <p className="font-semibold mt-2">Satisfaction</p>

                  <p className="text-slate-500 mt-3 text-sm">
                    Reliable & professional service
                  </p>
                </div>
              </div>

              {/* Bottom Highlight Card */}

              <div className="mt-6 bg-white rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#005C5C]/10 flex items-center justify-center">
                    <Sparkles size={26} className="text-[#005C5C]" />
                  </div>

                  <div>
                    <h4 className="font-bold text-xl text-slate-900">
                      Proudly Serving Across India
                    </h4>

                    <p className="text-slate-500 mt-1">
                      Expanding workforce solutions nationwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE MAP */}

            <div className="relative flex justify-center">
              <object data="in.svg" width="1000" height="800"></object>
            </div>
          </div>

          {/* Bottom Feature Bar */}

          <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 mt-15">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="flex gap-4">
                <BriefcaseBusiness className="text-[#D6AE45]" />
                <div>
                  <h4 className="font-bold">Skilled Workforce</h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Qualified manpower solutions
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <ShieldCheck className="text-[#D6AE45]" />
                <div>
                  <h4 className="font-bold">Security Services</h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Professional security personnel
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Handshake className="text-[#D6AE45]" />
                <div>
                  <h4 className="font-bold">Industrial Relations</h4>
                  <p className="text-slate-500 text-sm mt-1">
                    Strong employer-employee harmony
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="text-[#D6AE45]" />
                <div>
                  <h4 className="font-bold">Business Support</h4>
                  <p className="text-slate-500 text-sm mt-1">
                    End-to-end workforce support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:16 mt-12">
          <div className="text-center mb-16">
            <span className="text-[#f7931e] uppercase tracking-[4px] font-semibold">
              Our Purpose
            </span>

            <h2 className="text-5xl font-bold text-[#0f172a] mt-4">
              Vision & Mission
            </h2>

            <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
              Driving growth through professional workforce solutions, security
              services, housekeeping, industrial relations and business support
              across India.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 text-3xl">
                👁️
              </div>

              <h3 className="text-3xl font-bold text-[#0f172a] mb-4">
                Our Vision
              </h3>

              <p className="text-gray-600 leading-8 text-justify">
                To be India's most trusted and preferred partner for integrated manpower, security, 
                housekeeping, and facility management solutions. We aim to empower organizations through 
                innovative, scalable, and sustainable services while building safer workplaces, stronger 
                communities, and lasting business relationships. By consistently delivering excellence, 
                reliability, and value, we aspire to become the first choice for businesses seeking dependable
                workforce and operational support across the nation.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 text-3xl">
                🎯
              </div>

              <h3 className="text-3xl font-bold text-[#0f172a] mb-4">
                Our Mission
              </h3>

              <p className="text-gray-600 leading-8 text-justify">
                Our mission is to provide reliable, customized, and high-quality manpower and 
                facility management solutions that help businesses achieve operational excellence.
                 We are committed to maintaining the highest standards of safety, professionalism, 
                 and customer satisfaction through continuous training, innovation, and ethical practices. 
                 By building transparent, long-term partnerships and delivering skilled workforce solutions, 
                 we create lasting value for our clients, employees, and the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef4f7] py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <span className="uppercase tracking-[4px] text-[#005C5C] text-sm font-semibold">
            TESTIMONIAL
          </span>

          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mt-4 mb-16">
            Human Resources Services
          </h2>

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
            loop={true}
            spaceBetween={40}
            slidesPerView={2}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            className="!overflow-visible"
          >
            {/* Card 1 */}
            <SwiperSlide>
              <div>
                <div className="relative bg-white rounded-[35px] shadow-xl px-10 py-8">
                  <div className="absolute -top-4 left-8 bg-[#FFD86B] px-7 py-2 rounded-full">
                    <span className="text-[#005C5C] text-base tracking-wider">
                      ★★★★★
                    </span>
                  </div>

                  <p className="mt-8 text-slate-700 text-lg leading-8">
                    Working with Savvy Group has been a game-changer for our
                    business. Their team provided expert guidance on
                    streamlining our HR processes and workforce management.
                  </p>
                </div>

                <div className="flex items-center gap-5 mt-8">
                  <img
                    src="/testimonials/user1.jpg"
                    alt=""
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />

                  <div>
                    <h3 className="text-[#005C5C] text-2xl font-bold">
                      HR Manager
                    </h3>

                    <p className="text-gray-600">Manufacturing Company</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Card 2 */}
            <SwiperSlide>
              <div>
                <div className="relative bg-white rounded-[35px] shadow-xl px-10 py-8">
                  <div className="absolute -top-4 left-8 bg-[#FFD86B] px-7 py-2 rounded-full">
                    <span className="text-[#005C5C] text-base tracking-wider">
                      ★★★★★
                    </span>
                  </div>

                  <p className="mt-8 text-slate-700 text-lg leading-8">
                    The security personnel deployed by Savvy Group are highly
                    trained and professional. Their commitment to quality
                    service exceeded our expectations.
                  </p>
                </div>

                <div className="flex items-center gap-5 mt-8">
                  <img
                    src="/testimonials/user2.jpg"
                    alt=""
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />

                  <div>
                    <h3 className="text-[#005C5C] text-2xl font-bold">
                      Facility Head
                    </h3>

                    <p className="text-gray-600">Corporate Office</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Card 3 */}
            <SwiperSlide>
              <div>
                <div className="relative bg-white rounded-[35px] shadow-xl px-10 py-8">
                  <div className="absolute -top-4 left-8 bg-[#FFD86B] px-7 py-2 rounded-full">
                    <span className="text-[#005C5C] text-base tracking-wider">
                      ★★★★★
                    </span>
                  </div>

                  <p className="mt-8 text-slate-700 text-lg leading-8">
                    Excellent manpower solutions and quick deployment.
                    Professional approach and highly responsive team.
                  </p>
                </div>

                <div className="flex items-center gap-5 mt-8">
                  <img
                    src="/testimonials/user3.jpg"
                    alt=""
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />

                  <div>
                    <h3 className="text-[#005C5C] text-2xl font-bold">
                      Operations Manager
                    </h3>

                    <p className="text-gray-600">Logistics Company</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Card 4 */}
            <SwiperSlide>
              <div>
                <div className="relative bg-white rounded-[35px] shadow-xl px-10 py-8">
                  <div className="absolute -top-4 left-8 bg-[#FFD86B] px-7 py-2 rounded-full">
                    <span className="text-[#005C5C] text-base tracking-wider">
                      ★★★★★
                    </span>
                  </div>

                  <p className="mt-8 text-slate-700 text-lg leading-8">
                    Their housekeeping and support staff have significantly
                    improved operational efficiency at our premises.
                  </p>
                </div>

                <div className="flex items-center gap-5 mt-8">
                  <img
                    src="/testimonials/user4.jpg"
                    alt=""
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />

                  <div>
                    <h3 className="text-[#005C5C] text-2xl font-bold">
                      Admin Head
                    </h3>

                    <p className="text-gray-600">Retail Chain</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Bottom Navigation */}
          <div className="flex justify-center gap-5 mt-12">
            <button className="testimonial-prev w-14 h-14 rounded-full bg-white shadow-lg hover:bg-[#005C5C] hover:text-white transition-all duration-300">
              ←
            </button>

            <button className="testimonial-next w-14 h-14 rounded-full bg-white shadow-lg hover:bg-[#005C5C] hover:text-white transition-all duration-300">
              →
            </button>
          </div>
        </div>
      </section>

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

      <section id="contact" className="bg-[#f8f8f8] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-20">
            <div className="w-10 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>

            <p className="tracking-[4px] text-sm font-semibold text-slate-700">
              CONTACT
            </p>

            <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-800 mt-6">
              Contact Information
            </h2>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* WhatsApp */}
            <a
              href="https://wa.me/918551873862"
              className="group text-center p-10 rounded-3xl transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-3"
            >
              <img
                src="/WhatsApp.svg"
                alt="WhatsApp"
                className="w-20 h-20 mx-auto mb-6 transition-all duration-500 group-hover:scale-110"
              />

              <h3 className="text-4xl font-serif font-bold text-slate-800 group-hover:text-orange-500">
                WhatsApp
              </h3>

              <div className="w-12 h-1 bg-orange-500 mx-auto my-6 rounded-full"></div>

              <p className="uppercase tracking-[4px] text-xs text-slate-600">
                Just a message away.
              </p>
            </a>

            {/* Maps */}
            <a
              href="https://maps.app.goo.gl/K7DRMQWwdXCVXhut9"
              className="group text-center p-10 rounded-3xl transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-3"
            >
              <img
                src="/Maps.svg"
                alt="Map"
                className="w-20 h-20 mx-auto mb-6 transition-all duration-500 group-hover:scale-110"
              />

              <h3 className="text-4xl font-serif font-bold text-slate-800 group-hover:text-orange-500">
                Google Maps
              </h3>

              <div className="w-12 h-1 bg-orange-500 mx-auto my-6 rounded-full"></div>

              <p className="uppercase tracking-[4px] text-xs text-slate-600">
                Finding it difficult to reach us?
              </p>
            </a>

            {/* Call */}
            <a
              href="tel:+918551873862"
              className="group text-center p-10 rounded-3xl transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-3"
            >
              <img
                src="/call.svg"
                alt="Call"
                className="w-20 h-20 mx-auto mb-6 transition-all duration-500 group-hover:scale-110"
              />

              <h3 className="text-4xl font-serif font-bold text-slate-800 group-hover:text-orange-500">
                Call Us
              </h3>

              <div className="w-12 h-1 bg-orange-500 mx-auto my-6 rounded-full"></div>

              <p className="uppercase tracking-[4px] text-xs text-slate-600">
                24 × 7 At Your Service
              </p>
            </a>
          </div>
        </div>
      </section>

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

        <section id="clients" className="py-24 overflow-hidden bg-[#F5FAFA]">
  <div className="max-w-7xl mx-auto px-6">
    {/* Heading */}
    <div className="text-center mb-16">
      <div className="flex items-center justify-center gap-4 mb-5">
        <span className="w-16 h-[2px] bg-[#D6AE45]" />
        <span className="uppercase tracking-[5px] text-[#D6AE45] text-sm font-semibold">
          OUR CLIENTS
        </span>
        <span className="w-16 h-[2px] bg-[#D6AE45]" />
      </div>

      <h2 className="text-5xl md:text-6xl font-bold text-slate-900">
        Trusted by Leading Companies
      </h2>

      <p className="mt-5 max-w-3xl mx-auto text-lg text-slate-600 leading-8">
        We proudly partner with organizations across industries,
        delivering reliable manpower, security, housekeeping and
        business support services.
      </p>
    </div>

    {/* ================= FIRST ROW ================= */}

    <Swiper
      modules={[Autoplay]}
      loop={true}
      speed={3500}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: false,
      }}
      allowTouchMove={false}
      spaceBetween={20}
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
      className="mb-6 mt-12"
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
          <div className="w-[220px] h-[140px] mx-auto bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-500 flex items-center justify-center p-15">
            <img
              src={logo}
              alt=""
              className="max-w-[200px] max-h-[120px] object-contain transition-all duration-500 hover:scale-110"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* ================= SECOND ROW ================= */}

    <Swiper
      modules={[Autoplay]}
      loop={true}
      speed={3500}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,
      }}
      allowTouchMove={false}
      spaceBetween={20}
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
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
          <div className="w-[220px] h-[140px] mx-auto bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-500 flex items-center justify-center p-15">
            <img
              src={logo}
              alt=""
              className="max-w-[200px] max-h-[120px] object-contain transition-all duration-500 hover:scale-110"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>
      </section>

      <footer className="relative bg-[#041A1A] text-white overflow-hidden border-t border-[#D6AE45]/30">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#D6AE45] blur-[180px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#005C5C] blur-[180px]" />
        </div>

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-[#062626]/80"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <img src="/Logo.png" alt="Savvy Group" className="h-20 mb-6" />

              <div className="flex gap-3 mt-8">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D6AE45] flex items-center justify-center transition-all"
                >
                  <FaFacebookF size={18} />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D6AE45] flex items-center justify-center transition-all"
                >
                  <FaInstagram size={18} />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D6AE45] flex items-center justify-center transition-all"
                >
                  <FaLinkedinIn size={18} />
                </a>
              </div>

              <p className="text-slate-300 leading-9 text-lg">
                At the heart of our philosophy lies the belief that a thriving
                workplace is rooted in trust, professionalism, commitment and
                continuous growth.
              </p>

              {/* Newsletter */}
              <div className="mt-8 flex">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-5 py-4 bg-black/30 border border-slate-700 rounded-l-xl outline-none"
                />

                <button className="bg-[#005C5C] hover:bg-[#D6AE45] transition px-5 rounded-r-xl">
                  <Send size={22} />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <span className="text-[#D6AE45]">•</span>
                Quicklinks
              </h3>

              <ul className="space-y-5">
                {[
                  "About Us",
                  "Our Presence",
                  "Services",
                  "Testimonials",
                  "Contact Us",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-slate-300 hover:text-[#D6AE45] cursor-pointer transition"
                  >
                    <ArrowUpRight size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <span className="text-[#D6AE45]">•</span>
                Our Services
              </h3>

              <ul className="space-y-5">
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
                    className="flex items-center gap-3 text-slate-300 hover:text-[#D6AE45] cursor-pointer transition"
                  >
                    <ArrowUpRight size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <span className="text-[#D6AE45]">•</span>
                Contact Info
              </h3>

              <div className="space-y-8">
                <div className="border-b border-slate-800 pb-5">
                  <p className="text-[#D6AE45] mb-2">Call Us</p>

                  <div className="flex items-center gap-3">
                    <Phone size={18} />
                    <span className="text-xl font-semibold">
                      +91 85518 73862
                    </span>
                  </div>
                </div>

                <div className="border-b border-slate-800 pb-5">
                  <p className="text-[#D6AE45] mb-2">Email</p>

                  <div className="flex items-center gap-3">
                    <Mail size={18} />
                    <span className="text-lg">info@savvygroups.com</span>
                  </div>
                </div>

                <div>
                  <p className="text-[#D6AE45] mb-2">Location</p>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-1" />

                    <span className="text-lg">Pune, Maharashtra, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#005C5C] text-white shadow-2xl hover:scale-110 transition"
          >
            ↑
          </button>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-16 pt-8 text-center">
            <p className="text-slate-400">
              © 2026 Savvy Group. All Rights Reserved.
            </p>

            <div className="w-24 h-[2px] bg-[#D6AE45] mx-auto mt-4"></div>
          </div>
        </div>
      </footer>
    </main>
  );
}
