"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useContact } from "../../context/ContactContext";
import {
  
  ShieldCheck,
  BrushCleaning,
  Building2,
  BriefcaseBusiness,
  Bus,
  MonitorSmartphone,
} from "lucide-react";

export default function ServicesPage() {
  const { openContact } = useContact();

  const scrollToServices = () => {
    const section = document.getElementById("service-navigation");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* ==========================================================
                            HERO SECTION
      ========================================================== */}

      <section className="relative min-h-screen overflow-hidden">

        {/* Background Image */}

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/services-hero.png')",
            
          }}
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#07271f]/95 via-[#07271f]/80 to-black/60" />

        {/* Content */}

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 min-h-screen flex items-center">

          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            {/* Breadcrumb */}

            <div className="flex items-center gap-2 text-green-300 uppercase tracking-[4px] text-sm">

              <Link
                href="/"
                className="hover:text-white transition"
              >
                Home
              </Link>

              <span>/</span>

              <span className="text-white">
                Services
              </span>

            </div>

            {/* Small Heading */}

            <p className="mt-10 text-[#D6AE45] uppercase tracking-[8px] font-semibold">
              OUR SERVICES
            </p>

            {/* Main Heading */}

            <h1 className="mt-6 text-5xl md:text-7xl font-black text-white leading-tight">

              Complete Workforce

              <span className="block text-[#D6AE45]">
                & Facility
              </span>

              Management Solutions

            </h1>

            {/* Description */}

            <p className="mt-10 text-lg md:text-xl text-slate-200 leading-9">

              Since 2014, Savvy Group has been delivering
              professional workforce and facility
              management services across India.

              We provide Security Services,
              Housekeeping, Integrated Facility
              Management (IFM), Hospitality,
              Transportation, Manpower Solutions
              and IT Services under one trusted brand.

            </p>

            {/* Buttons */}

            

          

          </motion.div>

        </div>

       

      </section>

      {/* Sticky Navigation starts here in Part 1B */}

      {/* ===========================================================
                    SECURITY SERVICES
=========================================================== */}

<section
  id="security"
  className="py-28 bg-white"
>
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}

    <div className="text-center mb-20">

      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="uppercase tracking-[6px] text-[#D6AE45] font-semibold"
      >
        PROFESSIONAL PROTECTION
      </motion.span>

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-black mt-6 text-slate-900"
      >
        Security Services
      </motion.h2>

      <div className="w-28 h-1 bg-green-700 rounded-full mx-auto mt-8"></div>

    </div>

    <div className="grid lg:grid-cols-2 gap-20 items-center">

      {/* IMAGE */}

      <motion.div
        initial={{ opacity:0,x:-80 }}
        whileInView={{ opacity:1,x:0 }}
        viewport={{ once:true }}
        transition={{ duration:.8 }}
        className="relative"
      >

        <img
          src="/security.png"
          alt="Security"
          className="rounded-[35px] shadow-2xl"
        />

        {/* Floating Badge */}

        <div className="absolute -top-8 -left-8 bg-green-700 text-white rounded-3xl px-8 py-6 shadow-xl">

          <ShieldCheck size={40}/>

          <p className="mt-3 font-bold">

            Since 2014

          </p>

        </div>

      </motion.div>

      {/* CONTENT */}

      <motion.div
        initial={{ opacity:0,x:80 }}
        whileInView={{ opacity:1,x:0 }}
        viewport={{ once:true }}
        transition={{ duration:.8 }}
      >

        <h3 className="text-4xl font-bold text-slate-900">

          Trusted Security Solutions
          for Every Industry

        </h3>

        <p className="mt-8 text-lg leading-9 text-slate-600">

          Savvy Group delivers highly trained,
          disciplined and professional security
          personnel for corporate offices,
          industrial facilities, hospitals,
          educational institutions,
          residential communities and
          commercial establishments.

          Our security professionals ensure
          safety, compliance, risk prevention
          and uninterrupted business operations.

        </p>

        {/* FEATURES */}

        <div className="grid md:grid-cols-2 gap-5 mt-10">

          {[
            "Corporate Parks",
            "Shopping Malls",
            "Industrial Plants",
            "Residential Societies",
            "Hospitals",
            "Educational Institutes",
            "VIP Protection",
            "Event Security",
            "Emergency Response",
            "Fire Safety Drills",
          ].map((item)=>(

            <div
              key={item}
              className="flex items-center gap-3"
            >

              <div className="w-3 h-3 rounded-full bg-green-700"/>

              <span className="text-slate-700">

                {item}

              </span>

            </div>

          ))}

        </div>

        {/* BUTTONS */}

        <div className="flex gap-5 mt-12">

          <button
            onClick={openContact}
            className="bg-[#D6AE45] hover:bg-[#c69c34] px-8 py-4 rounded-xl font-bold transition shadow-lg"
          >
            Get Free Consultation
          </button>

          

        </div>

      </motion.div>

    </div>

    

  </div>
</section>

{/* ===========================================================
                    HOUSEKEEPING SERVICES
=========================================================== */}

<section
  id="housekeeping"
  className="py-28 bg-[#edf4f1]"
>
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}

    <div className="text-center mb-20">

      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="uppercase tracking-[6px] text-[#D6AE45] font-semibold"
      >
        CLEAN • SAFE • HYGIENIC
      </motion.span>

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-black mt-6 text-slate-900"
      >
        Housekeeping Services
      </motion.h2>

      <div className="w-28 h-1 bg-green-700 rounded-full mx-auto mt-8"></div>

    </div>

    <div className="grid lg:grid-cols-2 gap-20 items-center">

      {/* CONTENT */}

      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .8 }}
      >

        <h3 className="text-4xl font-bold text-slate-900">

          Professional Housekeeping
          That Enhances Every Workplace

        </h3>

        <p className="mt-8 text-lg leading-9 text-slate-600">

          Savvy Group provides trained housekeeping
          professionals to maintain clean, hygienic,
          organized and productive environments.

          Our teams follow standard operating procedures,
          modern cleaning practices and quality audits
          to ensure superior facility maintenance.

        </p>

        {/* Feature Cards */}

        <div className="grid sm:grid-cols-2 gap-5 mt-10">

          {[
            "Daily Cleaning Programs",
            "Deep Cleaning",
            "Waste Disposal",
            "Surface Disinfection",
            "Floor Maintenance",
            "Washroom Hygiene",
            "Society Maintenance",
            "Hospital Cleaning",
            "Mall Housekeeping",
            "Facility Support",
          ].map((item) => (

            <motion.div
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              key={item}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition"
            >

              <div className="flex gap-3 items-center">

                <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">

                  <BrushCleaning
                    size={18}
                    className="text-white"
                  />

                </div>

                <span className="font-medium text-slate-700">

                  {item}

                </span>

              </div>

            </motion.div>

          ))}

        </div>

        {/* Buttons */}

        <div className="flex gap-5 mt-12">

          <button
            onClick={openContact}
            className="bg-[#D6AE45] hover:bg-[#c79d33] px-8 py-4 rounded-xl font-bold transition shadow-lg"
          >
            Request Service
          </button>

        

        </div>

      </motion.div>

      {/* IMAGE */}

      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .8 }}
        className="relative"
      >

        <img
          src="/housekeeping.png"
          alt="Housekeeping Services"
          className="rounded-[35px] shadow-2xl"
        />

        {/* Floating Card */}

        <div className="absolute -bottom-10 left-10 bg-white rounded-3xl shadow-2xl p-8 w-72">

          <h4 className="font-bold text-2xl text-slate-900">

            Quality Assurance

          </h4>

          <p className="mt-3 text-slate-600">

            Every housekeeping professional is
            trained, uniformed, supervised and
            regularly audited to maintain
            exceptional cleanliness standards.

          </p>

        </div>

      </motion.div>

    </div>

  </div>
</section>

{/* ===========================================================
                    INTEGRATED FACILITY MANAGEMENT
=========================================================== */}

<section
  id="ifm"
  className="py-32 bg-white"
>
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}

    <div className="text-center max-w-4xl mx-auto">

      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="uppercase tracking-[6px] text-[#D6AE45] font-semibold"
      >
        FLAGSHIP SERVICE
      </motion.span>

      <motion.h2
        initial={{ opacity: 0,y:20 }}
        whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true }}
        className="mt-5 text-5xl md:text-6xl font-black text-slate-900"
      >
        Integrated Facility
        <span className="block text-green-700">
          Management (IFM)
        </span>
      </motion.h2>

      <p className="mt-10 text-xl leading-9 text-slate-600">

        Savvy Group delivers complete Integrated Facility
        Management solutions by combining manpower,
        housekeeping, maintenance, security, hospitality,
        administration and operations under one management
        system.

        Our IFM solutions improve operational efficiency,
        reduce costs and allow businesses to focus entirely
        on their core operations while we manage everything
        else.

      </p>

    </div>

    {/* Banner */}

    <motion.div
      initial={{ opacity:0,y:50 }}
      whileInView={{ opacity:1,y:0 }}
      viewport={{ once:true }}
      className="mt-20"
    >

      <img
        src="/ifm-banner.png"
        alt="Integrated Facility Management"
        className="rounded-[35px] shadow-2xl"
      />

    </motion.div>

    {/* Services */}

    <div className="mt-24">

      <h3 className="text-4xl font-bold text-center text-slate-900">

        IFM Services Include

      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

        {[
          "Soft Services Management",
          "Hard Services Management",
          "Facility Operations",
          "Utility Management",
          "Vendor Coordination",
          "Asset Maintenance",
          "Administrative Support",
          "Workforce Management",
          "Compliance Monitoring",
          "Site Operations Management",
        ].map((item)=>(

          <motion.div

            key={item}

            whileHover={{
              y:-8,
              scale:1.03,
            }}

            className="bg-[#edf4f1] rounded-3xl p-8 shadow hover:shadow-xl transition"

          >

            <div className="w-14 h-14 rounded-full bg-green-700 flex items-center justify-center text-white text-2xl">

              ✓

            </div>

            <h4 className="mt-6 text-2xl font-bold text-slate-900">

              {item}

            </h4>

          </motion.div>

        ))}

      </div>

    </div>

    {/* Advantages */}

    <div className="mt-28">

      <h3 className="text-4xl font-bold text-center">

        Why Choose Our IFM?

      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

        {[
          "Single Point Accountability",
          "Cost Optimization",
          "Improved Service Standards",
          "Better Compliance Management",
          "Enhanced Operational Efficiency",
          "Experienced Workforce",
          "Centralized Operations",
          "Quality Monitoring",
        ].map((item)=>(

          <motion.div

            key={item}

            whileHover={{
              y:-8,
            }}

            className="rounded-3xl border p-8 text-center"

          >

            <div className="text-5xl text-green-700">

              ★

            </div>

            <h4 className="mt-6 text-xl font-bold text-slate-900">

              {item}

            </h4>

          </motion.div>

        ))}

      </div>

    </div>

    

    {/* CTA */}

    <div className="mt-28 rounded-[40px] bg-gradient-to-r from-green-700 to-[#07271f] text-white p-16 text-center shadow-2xl">

      <h3 className="text-5xl font-black">

        Looking for One Complete Facility Partner?

      </h3>

      <p className="mt-8 text-xl max-w-3xl mx-auto leading-9">

        From manpower and housekeeping to security,
        hospitality, maintenance and administration,
        Savvy Group manages everything through a
        single integrated management system.

      </p>

      <button

        onClick={openContact}

        className="mt-10 bg-[#D6AE45] hover:bg-[#c69c34] text-black px-10 py-5 rounded-xl font-bold text-lg transition"

      >

        Request IFM Consultation

      </button>

    </div>

  </div>
</section>

{/* ===========================================================
                    HOSPITALITY SERVICES
=========================================================== */}

<section
  id="hospitality"
  className="py-32 bg-[#edf4f1]"
>
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    <div className="grid lg:grid-cols-2 gap-20 items-center">

      {/* IMAGE */}

      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .8 }}
        className="relative"
      >

        <img
          src="/hospitality.png"
          alt="Hospitality"
          className="rounded-[35px] shadow-2xl"
        />

        <div className="absolute bottom-8 left-8 bg-white rounded-3xl shadow-xl p-8">

          <h3 className="text-5xl font-black text-green-700">
            24×7
          </h3>

          <p className="text-slate-600 mt-2">
            Hospitality Support
          </p>

        </div>

      </motion.div>

      {/* CONTENT */}

      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .8 }}
      >

        <span className="uppercase tracking-[6px] text-[#D6AE45] font-semibold">
          GUEST HOUSE OPERATIONS
        </span>

        <h2 className="text-5xl font-black mt-6 text-slate-900">

          Hospitality Services

        </h2>

        <div className="w-24 h-1 bg-green-700 rounded-full mt-8"></div>

        <p className="mt-8 text-lg leading-9 text-slate-600">

          With extensive experience managing
          project guest houses across multiple
          states, Savvy Group delivers complete
          hospitality and guest house management
          solutions designed for infrastructure,
          renewable energy and industrial projects.

        </p>

        <div className="grid sm:grid-cols-2 gap-5 mt-12">

          {[
            "Guest House Management",
            "Front Office Operations",
            "Room Management",
            "Housekeeping",
            "Laundry Services",
            "Food & Catering",
            "Utility Management",
            "Security & Safety",
            "Staff Deployment",
            "Vendor Coordination",
          ].map((item) => (

            <motion.div
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              key={item}
              className="bg-white rounded-2xl shadow-md p-5"
            >

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-[#D6AE45] flex items-center justify-center font-bold">

                  ✓

                </div>

                <span className="text-slate-700 font-medium">

                  {item}

                </span>

              </div>

            </motion.div>

          ))}

        </div>

        <div className="flex gap-5 mt-12">

          <button
            onClick={openContact}
            className="bg-[#D6AE45] hover:bg-[#c89e34] transition px-8 py-4 rounded-xl font-bold"
          >

            Get Hospitality Solution

          </button>

          <button
            onClick={openContact}
            className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition px-8 py-4 rounded-xl"
          >

            Contact Us

          </button>

        </div>

      </motion.div>

    </div>

  </div>
</section>

{/* ===========================================================
                TRANSPORTATION SUPPORT SERVICES
=========================================================== */}

<section
  id="transportation"
  className="py-32 bg-white"
>
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}

    <div className="text-center max-w-4xl mx-auto">

      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="uppercase tracking-[6px] text-[#D6AE45] font-semibold"
      >
        PROJECT MOBILITY
      </motion.span>

      <motion.h2
        initial={{ opacity:0,y:20 }}
        whileInView={{ opacity:1,y:0 }}
        viewport={{ once:true }}
        className="text-5xl md:text-6xl font-black mt-6 text-slate-900"
      >
        Transportation
        Support Services
      </motion.h2>

      <p className="mt-8 text-lg leading-9 text-slate-600">

        Savvy Group provides reliable transportation
        support for industrial projects,
        renewable energy sites,
        infrastructure companies
        and corporate operations
        through our trusted transport partners.

      </p>

    </div>

    {/* Timeline */}

    <div className="grid md:grid-cols-3 gap-8 mt-24">

      {[
        {
          no:"01",
          title:"Vehicle Deployment",
        },
        {
          no:"02",
          title:"Driver Coordination",
        },
        {
          no:"03",
          title:"Staff Transportation",
        },
        {
          no:"04",
          title:"Executive Mobility",
        },
        {
          no:"05",
          title:"Vendor Management",
        },
        {
          no:"06",
          title:"Project Support",
        },

      ].map((item)=>(

        <motion.div

          key={item.no}

          whileHover={{
            y:-10,
          }}

          className="relative rounded-3xl border bg-[#edf4f1] p-8 shadow hover:shadow-xl transition"

        >

          <div className="absolute -top-5 left-8 w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">

            {item.no}

          </div>

          <h3 className="mt-8 text-2xl font-bold text-slate-900">

            {item.title}

          </h3>

          <p className="mt-4 text-slate-600">

            Professional transportation
            planning and deployment
            customized for client
            requirements.

          </p>

        </motion.div>

      ))}

    </div>

    {/* Scope */}

    <div className="grid lg:grid-cols-2 gap-20 mt-28 items-center">

      {/* Left */}

      <div>

        <h3 className="text-4xl font-bold">

          Scope of Services

        </h3>

        <div className="space-y-5 mt-10">

          {[
            "Project Site Mobility",
            "Executive Transportation",
            "Driver Arrangement",
            "Vehicle Deployment",
            "Remote Project Support",
            "Vendor Coordination",
            "Billing Administration",
            "Customized Mobility Solutions",
          ].map((item)=>(

            <div
              key={item}
              className="flex gap-4 items-center"
            >

              <div className="w-3 h-3 rounded-full bg-green-700"/>

              <span className="text-lg">

                {item}

              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Right */}

      <div>

        <img

          src="/transportation.png"

          alt="Transportation"

          className="rounded-[35px] shadow-2xl"

        />

      </div>

    </div>

    {/* Gold Strip */}

    <div className="mt-24 bg-[#D6AE45] rounded-[35px] p-12">

      <div className="grid md:grid-cols-4 gap-8 text-center">

        {[
          "Reliable Vendors",
          "Quick Deployment",
          "PAN India Support",
          "24×7 Coordination",
        ].map((item)=>(

          <div key={item}>

            <h3 className="text-4xl">

              ✓

            </h3>

            <p className="mt-3 font-semibold">

              {item}

            </p>

          </div>

        ))}

      </div>

    </div>

    {/* CTA */}

    <div className="text-center mt-20">

      <button

        onClick={openContact}

        className="bg-green-700 hover:bg-green-800 text-white px-10 py-5 rounded-xl font-bold transition"

      >

        Request Transportation Solution

      </button>

    </div>

  </div>
</section>

{/* ===========================================================
                    MANPOWER SERVICES
=========================================================== */}

<section
  id="manpower"
  className="py-32 bg-[#edf4f1]"
>
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}

    <div className="text-center max-w-4xl mx-auto">

      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="uppercase tracking-[6px] text-[#D6AE45] font-semibold"
      >
        PROFESSIONAL WORKFORCE SOLUTIONS
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-black mt-6 text-slate-900"
      >
        Manpower Services
      </motion.h2>

      <p className="mt-8 text-lg leading-9 text-slate-600">

        Savvy Group provides skilled, semi-skilled and
        unskilled manpower across multiple industries.
        We help organizations quickly deploy qualified
        professionals while ensuring compliance,
        productivity and operational excellence.

      </p>

    </div>

    <div className="grid lg:grid-cols-2 gap-20 mt-24 items-center">

      {/* Left Side */}

      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .8 }}
      >

        <div className="grid sm:grid-cols-2 gap-6">

          {/* Card */}

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:border-[#D6AE45] border transition-all"
          >

            <div className="text-5xl">
              👷
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Skilled Workforce
            </h3>

            <p className="mt-4 text-slate-600 leading-8">
              Experienced professionals for industrial,
              engineering and technical operations.
            </p>

          </motion.div>

          {/* Card */}

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:border-[#D6AE45] border transition-all"
          >

            <div className="text-5xl">
              🏭
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Semi Skilled
            </h3>

            <p className="mt-4 text-slate-600 leading-8">
              Reliable manpower for manufacturing,
              production and support activities.
            </p>

          </motion.div>

          {/* Card */}

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:border-[#D6AE45] border transition-all"
          >

            <div className="text-5xl">
              👨‍💼
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Administrative Staff
            </h3>

            <p className="mt-4 text-slate-600 leading-8">
              Office executives, reception,
              back-office and administrative support.
            </p>

          </motion.div>

          {/* Card */}

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:border-[#D6AE45] border transition-all"
          >

            <div className="text-5xl">
              ⚙️
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Payroll Management
            </h3>

            <p className="mt-4 text-slate-600 leading-8">
              End-to-end payroll processing,
              compliance and workforce administration.
            </p>

          </motion.div>

        </div>

      </motion.div>

      {/* Right Side */}

      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .8 }}
        className="relative"
      >

        <img
          src="/manpower.png"
          alt="Manpower Services"
          className="rounded-[35px] shadow-2xl"
        />

        {/* Floating Badge */}

        <div className="absolute -top-18 left-100 bg-green-700 text-white rounded-3xl shadow-xl px-10 py-8">

          <h3 className="text-5xl font-black">
            500+
          </h3>

          <p className="mt-2">
            Professional Workforce
          </p>

        </div>

      </motion.div>

    </div>

  </div>

  {/* ===========================================================
                    GOLD FEATURE STRIP
=========================================================== */}

<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mt-24"
>
  <div className="rounded-[35px] bg-[#D6AE45] p-10 shadow-xl">

    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">

      {[
        "Verified Employees",
        "Quick Deployment",
        "Payroll Support",
        "HR Compliance",
        "PAN India Services",
        "24×7 Assistance",
      ].map((item) => (

        <div key={item}>

          <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center text-3xl shadow-lg">
            ✓
          </div>

          <p className="mt-4 font-semibold text-slate-900">
            {item}
          </p>

        </div>

      ))}

    </div>

  </div>
</motion.div>



{/* ===========================================================
                    CTA
=========================================================== */}

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="mt-28"
>

  <div className="rounded-[40px] bg-gradient-to-r from-green-700 via-green-800 to-[#07271f] text-white p-16 text-center shadow-2xl">

    <h2 className="text-5xl font-black">

      Need Skilled Manpower?

    </h2>

    <p className="mt-8 text-xl max-w-3xl mx-auto leading-9">

      Whether you require skilled,
      semi-skilled, administrative staff
      or complete workforce management,
      Savvy Group delivers reliable
      manpower solutions tailored
      to your business needs.

    </p>

    <button
      onClick={openContact}
      className="mt-10 bg-[#D6AE45] hover:bg-[#c79d33] text-black px-10 py-5 rounded-xl font-bold text-lg transition shadow-xl"
    >
      Request Workforce
    </button>

  </div>

</motion.div>
</section>

{/* ===========================================================
                    IT SOLUTIONS
=========================================================== */}

<section
  id="it"
  className="py-32 bg-[#0b1720] text-white"
>
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}

    <div className="text-center max-w-4xl mx-auto">

      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="uppercase tracking-[6px] text-[#D6AE45] font-semibold"
      >
        SMART TECHNOLOGY SOLUTIONS
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-black mt-6"
      >
        IT Solutions
      </motion.h2>

      <p className="mt-8 text-lg leading-9 text-slate-300">

        Savvy Group delivers reliable IT infrastructure,
        surveillance systems and technical support services
        that help businesses operate securely and efficiently.

      </p>

    </div>

    {/* Service Cards */}

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">

      {/* CCTV */}

      <motion.div
        whileHover={{
          y: -10,
          scale: 1.03,
        }}
        className="bg-[#12222d] rounded-3xl p-10 border border-slate-700 hover:border-[#D6AE45] transition-all"
      >

        <div className="text-6xl">📹</div>

        <h3 className="mt-8 text-3xl font-bold">

          CCTV Installation

        </h3>

        <p className="mt-5 leading-8 text-slate-300">

          Professional surveillance solutions
          for offices, industries, commercial
          buildings and residential projects.

        </p>

      </motion.div>

      {/* Networking */}

      <motion.div
        whileHover={{
          y: -10,
          scale: 1.03,
        }}
        className="bg-[#12222d] rounded-3xl p-10 border border-slate-700 hover:border-[#D6AE45] transition-all"
      >

        <div className="text-6xl">🌐</div>

        <h3 className="mt-8 text-3xl font-bold">

          Networking

        </h3>

        <p className="mt-5 leading-8 text-slate-300">

          Complete LAN, WAN and Wi-Fi
          network setup, maintenance
          and troubleshooting.

        </p>

      </motion.div>

      {/* Computer */}

      <motion.div
        whileHover={{
          y: -10,
          scale: 1.03,
        }}
        className="bg-[#12222d] rounded-3xl p-10 border border-slate-700 hover:border-[#D6AE45] transition-all"
      >

        <div className="text-6xl">🖥️</div>

        <h3 className="mt-8 text-3xl font-bold">

          Computer Services

        </h3>

        <p className="mt-5 leading-8 text-slate-300">

          Desktop, laptop,
          hardware repair,
          upgrades and support.

        </p>

      </motion.div>

      {/* Printer */}

      <motion.div
        whileHover={{
          y: -10,
          scale: 1.03,
        }}
        className="bg-[#12222d] rounded-3xl p-10 border border-slate-700 hover:border-[#D6AE45] transition-all"
      >

        <div className="text-6xl">🖨️</div>

        <h3 className="mt-8 text-3xl font-bold">

          Printer Solutions

        </h3>

        <p className="mt-5 leading-8 text-slate-300">

          Installation,
          servicing,
          maintenance
          and repairs.

        </p>

      </motion.div>

      {/* AMC */}

      <motion.div
        whileHover={{
          y: -10,
          scale: 1.03,
        }}
        className="bg-[#12222d] rounded-3xl p-10 border border-slate-700 hover:border-[#D6AE45] transition-all"
      >

        <div className="text-6xl">⚙️</div>

        <h3 className="mt-8 text-3xl font-bold">

          AMC Services

        </h3>

        <p className="mt-5 leading-8 text-slate-300">

          Annual Maintenance Contracts
          for IT infrastructure,
          hardware and networking.

        </p>

      </motion.div>

      {/* Support */}

      <motion.div
        whileHover={{
          y: -10,
          scale: 1.03,
        }}
        className="bg-gradient-to-br from-green-700 to-[#07271f] rounded-3xl p-10"
      >

        <div className="text-6xl">🛠️</div>

        <h3 className="mt-8 text-3xl font-bold">

          Technical Support

        </h3>

        <p className="mt-5 leading-8 text-slate-200">

          Reliable onsite and remote
          technical support with
          rapid response times.

        </p>

      </motion.div>

    </div>

    {/* CTA */}

    <div className="text-center mt-24">

      <button
        onClick={openContact}
        className="bg-[#D6AE45] hover:bg-[#c79d33] text-black px-10 py-5 rounded-xl font-bold text-lg transition shadow-xl"
      >
        Request IT Solution
      </button>

    </div>

  </div>
</section>

{/* ===========================================================
                    INDUSTRIES WE SERVE
=========================================================== */}

<section
  id="industries"
  className="py-32 bg-white"
>
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}

    <div className="text-center max-w-4xl mx-auto">

      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="uppercase tracking-[6px] text-[#D6AE45] font-semibold"
      >
        INDUSTRIES WE SERVE
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-black mt-6 text-slate-900"
      >
        Trusted Across
        <span className="block text-green-700">
          Multiple Industries
        </span>
      </motion.h2>

      <p className="mt-8 text-lg leading-9 text-slate-600">

        Our workforce and facility management
        solutions are trusted by organizations
        across diverse industries throughout India.

      </p>

    </div>

    {/* Industry Cards */}

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">

      {[
        {
          icon:"🏭",
          title:"Manufacturing",
        },
        {
          icon:"🏥",
          title:"Healthcare",
        },
        {
          icon:"⚡",
          title:"Power & Energy",
        },
        {
          icon:"🏗",
          title:"Construction",
        },
        {
          icon:"🏢",
          title:"Corporate Offices",
        },
        {
          icon:"🏬",
          title:"Commercial Complexes",
        },
        {
          icon:"🚚",
          title:"Logistics & Warehousing",
        },
        {
          icon:"🏘",
          title:"Residential Societies",
        },
        {
          icon:"🎓",
          title:"Educational Institutions",
        },
        {
          icon:"🛒",
          title:"Retail & Shopping Malls",
        },
        {
          icon:"🌿",
          title:"Renewable Energy",
        },
        {
          icon:"🏨",
          title:"Hospitality Projects",
        },

      ].map((industry)=>(

        <motion.div

          key={industry.title}

          whileHover={{
            y:-10,
            scale:1.03,
          }}

          className="bg-[#edf4f1] rounded-3xl p-8 shadow hover:shadow-xl transition border hover:border-[#D6AE45]"

        >

          <div className="text-6xl">

            {industry.icon}

          </div>

          <h3 className="mt-8 text-2xl font-bold text-slate-900">

            {industry.title}

          </h3>

          <p className="mt-4 leading-8 text-slate-600">

            Customized workforce,
            facility management
            and support solutions.

          </p>

        </motion.div>

      ))}

    </div>

    {/* Bottom Banner */}

    <motion.div
      initial={{ opacity:0,y:40 }}
      whileInView={{ opacity:1,y:0 }}
      viewport={{ once:true }}
      className="mt-24"
    >

      <div className="rounded-[40px] bg-gradient-to-r from-[#0F6A5B] to-[#07271f] p-16 text-center text-white shadow-2xl">

        <h2 className="text-5xl font-black">

          Serving Businesses Across India

        </h2>

        <p className="mt-8 text-xl leading-9 max-w-4xl mx-auto">

          Whether you operate a manufacturing plant,
          corporate office, healthcare facility,
          infrastructure project or renewable energy site,
          Savvy Group delivers scalable workforce
          and facility management solutions.

        </p>

      </div>

    </motion.div>

  </div>
</section>

{/* ===========================================================
                    WHY CHOOSE SAVVY GROUP
=========================================================== */}

<section
  id="why-savvy"
  className="py-32 bg-[#edf4f1]"
>
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}

    <div className="text-center max-w-4xl mx-auto">

      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="uppercase tracking-[6px] text-[#D6AE45] font-semibold"
      >
        WHY CHOOSE US
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-black mt-6 text-slate-900"
      >
        Why Businesses Trust
        <span className="block text-green-700">
          Savvy Group
        </span>
      </motion.h2>

      <p className="mt-8 text-lg leading-9 text-slate-600">

        Since 2014, we have been delivering dependable
        workforce and facility management solutions with
        professionalism, quality and long-term commitment.

      </p>

    </div>

    {/* Cards */}

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">

      {/* Card */}

      <motion.div
        whileHover={{
          y: -10,
          scale: 1.03,
        }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">🏆</div>

        <h3 className="mt-8 text-2xl font-bold">
          10+ Years Experience
        </h3>

        <p className="mt-5 leading-8 text-slate-600">
          A decade of experience delivering workforce,
          security and facility management services.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">👥</div>

        <h3 className="mt-8 text-2xl font-bold">
          Professional Workforce
        </h3>

        <p className="mt-5 leading-8 text-slate-600">
          Skilled, semi-skilled and administrative
          professionals deployed across India.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">🇮🇳</div>

        <h3 className="mt-8 text-2xl font-bold">
          PAN India Operations
        </h3>

        <p className="mt-5 leading-8 text-slate-600">
          Supporting projects and organizations across
          multiple states in India.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">⚖️</div>

        <h3 className="mt-8 text-2xl font-bold">
          Compliance Focused
        </h3>

        <p className="mt-5 leading-8 text-slate-600">
          We ensure statutory compliance, payroll
          management and workforce documentation.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">🤝</div>

        <h3 className="mt-8 text-2xl font-bold">
          Client-Centric Approach
        </h3>

        <p className="mt-5 leading-8 text-slate-600">
          Every solution is tailored to the client's
          operational and business requirements.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-gradient-to-br from-[#0F6A5B] to-[#07271f] text-white rounded-[30px] shadow-xl p-10"
      >
        <div className="text-6xl">⭐</div>

        <h3 className="mt-8 text-2xl font-bold">
          One Trusted Partner
        </h3>

        <p className="mt-5 leading-8 text-green-100">
          From Security and Housekeeping to IFM,
          Hospitality, Transportation and IT,
          everything under one roof.
        </p>
      </motion.div>

    </div>

  </div>
</section>


{/* ===========================================================
                    CALL TO ACTION
=========================================================== */}

<section className="py-32 bg-[#0F6A5B] relative overflow-hidden">

  {/* Background Decorations */}

  <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#D6AE45]/10 blur-3xl" />

  <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

  <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .8 }}
      className="text-center"
    >

      <span className="uppercase tracking-[6px] text-[#D6AE45] font-semibold">

        LET'S WORK TOGETHER

      </span>

      <h2 className="mt-6 text-5xl md:text-6xl font-black text-white leading-tight">

        Ready to Strengthen

        <span className="block text-[#D6AE45]">

          Your Workforce?

        </span>

      </h2>

      <p className="max-w-4xl mx-auto mt-10 text-xl leading-9 text-green-100">

        Whether you require Security Services,
        Housekeeping, Integrated Facility Management,
        Hospitality, Transportation, Manpower or
        IT Solutions, Savvy Group is ready to
        deliver reliable, scalable and customized
        workforce solutions for your organization.

      </p>

      {/* Buttons */}

      <div className="flex flex-wrap justify-center gap-6 mt-14">

        <button
          onClick={openContact}
          className="bg-[#D6AE45] hover:bg-[#c79d33] text-black px-10 py-5 rounded-xl font-bold text-lg transition shadow-xl"
        >

          Get Free Consultation

        </button>

      

      </div>

    

    </motion.div>

  </div>

</section>


{/* ===========================================================
                    FOOTER
=========================================================== */}

<footer className="bg-[#071913] text-white">

  {/* Gold Strip */}

  <div className="bg-[#D6AE45] py-4">

    <div className="max-w-7xl mx-auto px-6 text-center">

      <p className="font-semibold tracking-wide text-black">

        Trusted Workforce & Facility Management Partner Since 2014

      </p>

    </div>

  </div>

  {/* Main Footer */}

  <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14">

      {/* Company */}

      <div>

        <img
          src="/logo.png"
          alt="Savvy Group"
          className="h-16"
        />

        <p className="mt-8 leading-8 text-slate-300">

          Savvy Group delivers trusted workforce,
          security, housekeeping, hospitality,
          integrated facility management,
          transportation and IT solutions
          across India.

        </p>

      </div>

      {/* Quick Links */}

      <div>

        <h3 className="text-2xl font-bold">

          Quick Links

        </h3>

        <ul className="space-y-4 mt-8 text-slate-300">

          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/about">
              About Us
            </Link>
          </li>

          <li>
            <Link href="/services">
              Services
            </Link>
          </li>

          <li>
            <Link href="/industries">
              Industries
            </Link>
          </li>

          <li>
            <button onClick={openContact}>
              Contact
            </button>
          </li>

        </ul>

      </div>

      {/* Services */}

      <div>

        <h3 className="text-2xl font-bold">

          Our Services

        </h3>

        <ul className="space-y-4 mt-8 text-slate-300">

          <li>Security Services</li>

          <li>Housekeeping</li>

          <li>Integrated Facility Management</li>

          <li>Hospitality</li>

          <li>Transportation</li>

          <li>Manpower Services</li>

          <li>IT Solutions</li>

        </ul>

      </div>

      {/* Contact */}

      <div>

        <h3 className="text-2xl font-bold">

          Contact

        </h3>

        <div className="space-y-6 mt-8 text-slate-300">

          <div>

            <p className="text-white font-semibold">

              Phone

            </p>

            <p>
              +91 XXXXX XXXXX
            </p>

          </div>

          <div>

            <p className="text-white font-semibold">

              Email

            </p>

            <p>

              info@savvygroup.in

            </p>

          </div>

          <div>

            <p className="text-white font-semibold">

              Office

            </p>

            <p>

              Pune, Maharashtra,
              India

            </p>

          </div>

        </div>

      </div>

    </div>

    {/* Divider */}

    <div className="border-t border-slate-700 mt-20 pt-8">

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">

        <p className="text-slate-400">

          © {new Date().getFullYear()} Savvy Group.
          All Rights Reserved.

        </p>

        <button

          onClick={() => {

            window.scrollTo({
              top:0,
              behavior:"smooth",
            });

          }}

          className="bg-[#D6AE45] hover:bg-[#c79d33] text-black px-6 py-3 rounded-xl font-semibold transition"

        >

          ↑ Back To Top

        </button>

      </div>

    </div>

  </div>

</footer>

    </>
  );
}