"use client";

import "swiper/css";
import "swiper/css/autoplay";


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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { info } from "console";

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

      <section className="relative min-h-screen overflow-hidden overflow-x-hidden">

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

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 min-h-screen flex items-center">

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
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

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
        className="text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl font-black mt-6 text-slate-900"
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

        <div className="absolute -top-6 lg:p-8 -left-8 bg-green-700 text-white rounded-3xl px-8 py-6 shadow-xl">

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

        <p className="mt-8 text-lg leading-9 text-slate-600 text-justify">

          Savvy Group provides professionally managed security 
          services for industrial establishments, corporate premises, 
          residential developments, hospitals, infrastructure projects, 
          renewable-energy sites and other operating environments.

        </p>

        {/* FEATURES */}

        <div className="grid md:grid-cols-2 gap-5 mt-10">

          {[
            "Manned Guarding Services",
            "Security Guards",
            "Security Supervisors",
            "Ex-Servicemen Deployment",
            "Access Control & Visitor Management",
            "Gate & Material Movement Control",
            "Patrolling & Perimeter Monitoring",
            "Emergency Response Support",
            "Bouncer Services for Events",
            "Fire & Safety Support",
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
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

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
        className="text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl font-black mt-6 text-slate-900"
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

        <p className="mt-8 text-lg leading-9 text-slate-600 text-justify">

          Savvy Group provides professionally managed housekeeping and facility-support 
          manpower for corporate offices, hospitals, industrial facilities, project locations, 
          residential developments and commercial establishments.
          Our housekeeping programmes are structured around defined cleaning schedules, 
          trained personnel, supervisory checks and hygiene standards suited to each facility.


        </p>

        {/* Feature Cards */}

        <div className="grid sm:grid-cols-2 gap-5 mt-10">

          {[
            "Daily Housekeeping Operations",
            "Office & Corporate Housekeeping",
            "Deep Cleaning Support",
            "Washroom Cleaning & Hygiene Management",
            "Floor & Surface Cleaning",
            "Waste Collection & Disposal Coordination",
            "Pantry Support Services",
            "Trained Housekeeping Personnel",
            "Housekeeping Supervisors",
            "Site-Specific Cleaning Schedules",
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

        <div className="absolute -bottom-10 left-10 bg-white rounded-3xl shadow-2xl p-6 lg:p-8 w-72">

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
  className="py-16 md:py-20 lg:py-32 bg-white"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

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
        className="mt-5 text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl font-black text-slate-900"
      >
        Integrated Facility
        <span className="block text-green-700">
          Management (IFM)
        </span>
      </motion.h2>

      <p className="mt-10 text-xl leading-9 text-slate-600 text-justify">

        Savvy Group provides skilled, semi-skilled and unskilled manpower across 
        industrial, corporate, healthcare, hospitality, infrastructure and project environments.
        Our manpower solutions are structured around client requirements, employee documentation, 
        deployment planning, attendance management and statutory compliance.


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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:p-8 mt-16">

        {[
          "Recruitment & Sourcing",
          "Employee Documentation",
          "Deployment Coordination",
          "Attendance Management",
          "Payroll Support",
          "PF & ESIC Compliance",
          "Labour Compliance Support",
          "Replacement Coordination",
          "Site Supervision",
          

        ].map((item)=>(

          <motion.div

            key={item}

            whileHover={{
              y:-8,
              scale:1.03,
            }}

            className="bg-[#edf4f1] rounded-3xl p-6 lg:p-8 shadow hover:shadow-xl transition"

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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:p-8 mt-16">

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

            className="rounded-3xl border p-6 lg:p-8 text-center"

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

      <p className="mt-8 text-xl max-w-3xl mx-auto leading-9 text-justify">

        Savvy Group provides end-to-end hospitality and accommodation-management 
        services for corporate teams, renewable-energy projects, infrastructure companies, 
        construction organisations and remote project locations.

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
  className="py-16 md:py-20 lg:py-32 bg-[#edf4f1]"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

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

        <div className="absolute bottom-8 left-8 bg-white rounded-3xl shadow-xl p-6 lg:p-8">

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
            "Catering & Food Services",
            "Site Facility Support",
            "Property Identification & Coordination",
            "Guest House Setup",
            "Breakfast, Lunch & Dinner Operations",
            "Corporate & Project-Site Catering",
            "Drinking Water",
            "Tea & Refreshments",
            "Housekeeping Material",

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
  className="py-16 md:py-20 lg:py-32 bg-white"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

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
        className="text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl font-black mt-6 text-slate-900"
      >
        Project Vechicle Services
      </motion.h2>

      <p className="mt-8 text-lg leading-9 text-slate-600 text-justify">

        Savvy Group provides vehicle deployment and transportation coordination for industrial projects, 
        renewable-energy sites, infrastructure companies and corporate operations through structured mobility support.
        Our project mobility services are particularly suited to organisations operating across remote or multiple 
        project locations where dependable vehicle availability and local coordination are essential.


      </p>

    </div>

    {/* Timeline */}

    <div className="grid md:grid-cols-3 gap-6 lg:p-8 mt-24">

      {[
        {
          no:"01",
          title:"Vehicle Deployment",
          info:"Reliable project vehicle deployment tailored to site-specific operational requirements."
        },
        {
          no:"02",
          title:"single Point of Contact",
          info:"A single point of contact for managing all project vehicle-related communications and logistics."
        },
        {
          no:"03",
          title:"Project Site Mobility",
          info:"Seamless mobility solutions for project sites, ensuring efficient transportation of personnel and equipment."
        },
        {
          no:"04",
          title:"Vendor Coordination",
          info:"Coordination with multiple vehicle vendors to ensure timely availability and maintenance of vehicles."
        },
        {
          no:"05",
          title:"Flexible Vehicle Solutions",
          info:"Customized vehicle solutions to meet the unique needs of each project."
        },
        {
          no:"06",
          title:"PAN India Support",
          info:"Comprehensive support services across all regions of India."
        },

      ].map((item)=>(

        <motion.div

          key={item.no}

          whileHover={{
            y:-10,
          }}

          className="relative rounded-3xl border bg-[#edf4f1] p-6 lg:p-8 shadow hover:shadow-xl transition"

        >

          <div className="absolute -top-5 left-8 w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">

            {item.no}

          </div>

          <h3 className="mt-8 text-2xl font-bold text-slate-900">

            {item.title}

          </h3>

          <p className="mt-4 text-slate-600">

            {item.info}

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
            "Scope Of Services",
            "project Vehicle Deployment",
            "Site Mobility Solutions",
            "Single Point of Contact",
            "Vendor Coordination",
            "Monthly Vechicle Hiring",
            "PAN India project Support",
            "Customized Vehicle Solutions",
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

      <div className="grid md:grid-cols-4 gap-6 lg:p-8 text-center">

        {[
          "Single Point of Contact",
          "Reliable Vehicle Deployment",
          "PAN India Support",
          "Simplified Billing & Invoicing",
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

        Request Vehicle Solution

      </button>

    </div>

  </div>
</section>

{/* ===========================================================
                    MANPOWER SERVICES
=========================================================== */}

<section
  id="manpower"
  className="py-16 md:py-20 lg:py-32 bg-[#edf4f1]"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

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
        className="text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl font-black mt-6 text-slate-900"
      >
        Manpower Services
      </motion.h2>

      <p className="mt-8 text-lg leading-9 text-slate-600">

        Savvy Group provides skilled, semi-skilled, and unskilled manpower solutions across industries, corporate offices, hospitals, warehouses, logistics, hospitality, and infrastructure projects. We deploy reliable professionals ranging from office support staff to technical and operational personnel, ensuring productivity, compliance, and seamless workforce management.

      </p>

    </div>

    <div
  className="
  grid
  grid-cols-1
  lg:grid-cols-2
  gap-10
  lg:gap-20
  mt-14
  lg:mt-24
  items-center
  "
>

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
            className="bg-white rounded-3xl p-6 lg:p-8 shadow-md hover:shadow-2xl hover:border-[#D6AE45] border transition-all"
          >

            <div className="text-5xl">
              👷
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Skilled Workforce
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              Qualified professionals for engineering, technical operations, machine handling, electrical, mechanical, fabrication, maintenance, and supervisory roles.
            </p>

          </motion.div>

          {/* Card */}

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="bg-white rounded-3xl p-6 lg:p-8 shadow-md hover:shadow-2xl hover:border-[#D6AE45] border transition-all"
          >

            <div className="text-5xl">
              🏭
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Semi Skilled
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              Production operators, helpers, warehouse associates, packers, loaders, assembly line staff, housekeeping supervisors, and field support personnel.
            </p>

          </motion.div>

          {/* Card */}

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="bg-white rounded-3xl p-6 lg:p-8 shadow-md hover:shadow-2xl hover:border-[#D6AE45] border transition-all"
          >

            <div className="text-5xl">
              👨‍💼
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
            Office & Corporate Support
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              Office Boys, Office Assistants, Receptionists, Data Entry Operators, Admin Assistants, HR Support, Account Assistants, and Back Office Executives.
            </p>

          </motion.div>

          {/* Card */}

          <motion.div
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="bg-white rounded-3xl p-6 lg:p-8 shadow-md hover:shadow-2xl hover:border-[#D6AE45] border transition-all"
          >

            <div className="text-5xl">
              👨‍🍳
            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Hospitality & Kitchen Staff
            </h3>

            <p className="mt-4 text-slate-600 leading-7">
              Cooks, Assistant Cooks, Kitchen Helpers, Stewards, Utility Staff, Housekeeping Staff, Guest House Attendants, and Catering Support.
            </p>

          </motion.div>

        </div>

      </motion.div>

      {/* Right Side */}

      <motion.div
  initial={{ opacity: 0, x: 80 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="relative pt-10 lg:pt-16"
>

        <img
  src="/manpower.png"
  alt="Manpower Services"
  className="
    w-full
    h-[320px]
    sm:h-[420px]
    lg:h-[650px]
    object-cover
    rounded-[25px]
    lg:rounded-[35px]
    shadow-2xl
  "
/>

        {/* Floating Badge */}

        <div
  className="
    absolute
    left-1/2
    -translate-x-1/2
    bottom-0
    translate-y-1/2

    bg-[#0B8F3A]
    text-white

    rounded-3xl
    shadow-2xl

    px-6 py-5
    sm:px-8 sm:py-6
    lg:px-10 lg:py-7

    z-20
  "
>

          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none text-center">
    500+
  </h3>

           <p className="mt-2 text-sm sm:text-base lg:text-xl font-medium text-center whitespace-nowrap">
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

    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 lg:p-8 text-center">

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
  className="py-16 md:py-20 lg:py-32 bg-[#0b1720] text-white"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

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
        className="text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl font-black mt-6"
      >
        Technology Services
      </motion.h2>

      <p className="mt-8 text-lg leading-9 text-slate-300">

        Savvy Group delivers reliable IT infrastructure,
        surveillance systems and technical support services
        that help businesses operate securely and efficiently.

      </p>

    </div>

    {/* Service Cards */}

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:p-8 mt-24">

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
        Request Technology Support
      </button>

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

{/* ===========================================================
                    INDUSTRIES WE SERVE
=========================================================== */}

<section
  id="industries"
  className="py-16 md:py-20 lg:py-32 bg-white"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

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
        className="text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl font-black mt-6 text-slate-900"
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

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:p-8 mt-24">

      {[
        {
          icon:"🏭",
          title:"Manufacturing & Industrial",
        },
        {
          icon:"🏥",
          title:"Healthcare",
        },
        {
          icon:"🏗",
          title:"Infrastructure & Construction",
        },
        {
          icon:"🏢",
          title:"Corporate Commercial",
        },
        {
          icon:"🚚",
          title:"Logistics & Warehousing",
        },
        {
          icon:"🏘",
          title:"Real Estate & Residential",
        },
        {
          icon:"🎓",
          title:"Educational Institutions",
        },
        {
          icon:"🌿",
          title:"Renewable Energy & Power",
        },

      ].map((industry)=>(

        <motion.div

          key={industry.title}

          whileHover={{
            y:-10,
            scale:1.03,
          }}

          className="bg-[#edf4f1] rounded-3xl p-6 lg:p-8 shadow hover:shadow-xl transition border hover:border-[#D6AE45]"

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
  className="py-16 md:py-20 lg:py-32 bg-[#edf4f1]"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

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
        className="text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl font-black mt-6 text-slate-900"
      >
        Why Businesses Trust
        <span className="block text-green-700">
          Savvy Group
        </span>
      </motion.h2>

      <p className="mt-8 text-lg leading-9 text-slate-600 text-justify">

        Savvy Group combines workforce capability with practical 
        on-ground execution, allowing organisations to manage multiple 
        essential services through one accountable partner.

      </p>

    </div>

    {/* Cards */}

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:p-8 mt-24">

      {/* Card */}

      <motion.div
        whileHover={{
          y: -10,
          scale: 1.03,
        }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">🧰</div>

        <h3 className="mt-8 text-2xl font-bold">
          MULTI-SERVICE CAPABILITY
        </h3>

        <p className="mt-5 leading-8 text-slate-600 text-justify">
          Security, manpower, housekeeping, hospitality, facility support and mobility services under one group.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">🪧 </div>

        <h3 className="mt-8 text-2xl font-bold">
          MULTI-STATE MOBILISATION
        </h3>

        <p className="mt-5 leading-8 text-slate-600 text-justify">
          Ability to establish and manage operations across different states and project locations.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">👷</div>

        <h3 className="mt-8 text-2xl font-bold">
          PROJECT-SITE EXPERIENCE
        </h3>

        <p className="mt-5 leading-8 text-slate-600 text-justify">
          Experience supporting renewable-energy, infrastructure and remote operating environments where rapid mobilisation and continuous coordination are critical.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">🎯</div>

        <h3 className="mt-8 text-2xl font-bold">
          SINGLE-POINT ACCOUNTABILITY
        </h3>

        <p className="mt-5 leading-8 text-slate-600 text-justify">
          One operating partner coordinating manpower, service delivery, local vendors and day-to-day requirements.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">🎓</div>

        <h3 className="mt-8 text-2xl font-bold">
          TRAINED & SUPERVISED WORKFORCE
        </h3>

        <p className="mt-5 leading-8 text-slate-600 text-justify">
          Structured recruitment, deployment and supervision across different workforce categories.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">⚖️</div>

        <h3 className="mt-8 text-2xl font-bold">
          STATUTORY COMPLIANCE
        </h3>

        <p className="mt-5 leading-8 text-slate-600 text-justify">
          Focus on PF, ESIC, labour documentation and applicable statutory requirements.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">👀</div>

        <h3 className="mt-8 text-2xl font-bold">
          RESPONSIVE OPERATIONS
        </h3>

        <p className="mt-5 leading-8 text-slate-600 text-justify">
          Operational teams remain connected with clients and site representatives to address manpower and service requirements quickly.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-white rounded-[30px] shadow-lg p-10 border hover:border-[#D6AE45] transition-all"
      >
        <div className="text-6xl">🔀</div>

        <h3 className="mt-8 text-2xl font-bold">
          FLEXIBLE SERVICE MODELS
        </h3>

        <p className="mt-5 leading-8 text-slate-600 text-justify">
          Solutions can be customised around manpower strength, project duration, site conditions and client operating requirements.
        </p>
      </motion.div>

      {/* Card */}

      <motion.div
        whileHover={{ y: -10, scale: 1.03 }}
        className="bg-gradient-to-br from-[#0F6A5B] to-[#07271f] text-white rounded-[30px] shadow-xl p-10"
      >
        <div className="text-6xl">24/7</div>

        <h3 className="mt-8 text-2xl font-bold">
          24×7 OPERATIONAL SUPPORT
        </h3>

        <p className="mt-5 leading-8 text-green-100">
          Support for critical services and project locations requiring continuous operational coordination.
        </p>
      </motion.div>

    </div>

  </div>
</section>


{/* ===========================================================
                    CALL TO ACTION
=========================================================== */}

<section className="py-16 md:py-20 lg:py-32 bg-[#0F6A5B] relative overflow-hidden">

  {/* Background Decorations */}

  <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#D6AE45]/10 blur-3xl" />

  <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

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

      <h2 className="mt-6 text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl font-black text-white leading-tight">

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

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20">

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
             +91 7720020699
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

            1st floor, balaji complex, Vinayak nagar, Pimple gurav, pune-411061

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