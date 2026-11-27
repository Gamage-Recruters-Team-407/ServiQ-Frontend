
export const demoServices = {
  "electrical-repairs": {
    id: "electrical-repairs",
    title: "Home Electrical Repairs",
    category: "Electrical Services",
    emoji: "⚡",
    tagline: "Safe and reliable electrical solutions for your home.",
    description:
      "Compare local electrical service providers for common household repairs, lighting issues, faulty sockets, switches and safety inspections. Review provider information and sample starting rates before choosing a professional.",
    duration: "1–3 hours depending on the repair",
    included: [
      "Initial electrical inspection",
      "Switch and socket fault assessment",
      "Lighting and fixture checks",
      "Basic safety recommendations",
    ],
    excluded: [
      "Replacement electrical components",
      "Major wiring or installation work",
      "Additional labour outside the agreed scope",
    ],
    faqs: [
      {
        question: "Is the starting price the final price?",
        answer:
          "No. The displayed amount is an example starting rate. Actual charges depend on the problem, materials, travel and additional work.",
      },
      {
        question: "Are replacement parts included?",
        answer:
          "Replacement parts and major repairs are quoted separately unless the provider confirms otherwise.",
      },
      {
        question: "Can I make a booking now?",
        answer:
          "This is a frontend demo. Real booking and payment functions will be integrated with their respective modules later.",
      },
    ],
    providers: [
      {
        id: "elec-01",
        name: "BrightSpark Electricals",
        initials: "BE",
        profession: "Professional Electrical Services",
        location: "Kandy",
        experience: 8,
        rating: 4.9,
        reviewCount: 128,
        price: 2500,
        priceUnit: "inspection visit",
        verified: true,
        available: true,
        responseTime: "Usually within 1 hour",
        bio: "Experienced electrical service team specializing in residential fault detection, lighting repairs and routine maintenance.",
        skills: ["Fault detection", "Lighting", "Socket repairs"],
      },
      {
        id: "elec-02",
        name: "VoltCare Solutions",
        initials: "VC",
        profession: "Independent Electrical Technician",
        location: "Peradeniya",
        experience: 6,
        rating: 4.8,
        reviewCount: 96,
        price: 3000,
        priceUnit: "inspection visit",
        verified: true,
        available: true,
        responseTime: "Usually within 2 hours",
        bio: "Provides home electrical diagnostics, fixture replacement and routine electrical safety inspections.",
        skills: ["Diagnostics", "Safety checks", "Fixtures"],
      },
      {
        id: "elec-03",
        name: "HomeFix Electrical",
        initials: "HE",
        profession: "Home Maintenance Provider",
        location: "Katugastota",
        experience: 4,
        rating: 4.7,
        reviewCount: 62,
        price: 2000,
        priceUnit: "inspection visit",
        verified: false,
        available: false,
        responseTime: "Not accepting demo requests",
        bio: "Offers household maintenance, basic electrical inspections and minor fixture repair services.",
        skills: ["Maintenance", "Inspection", "Minor repairs"],
      },
    ],
  },

  plumbing: {
    id: "plumbing",
    title: "Plumbing Repairs & Maintenance",
    category: "Plumbing & Sanitation",
    emoji: "🚰",
    tagline: "Quality plumbing services for everyday household problems.",
    description:
      "Find help for leaking pipes, faulty taps, blocked drains and bathroom fittings. Browse example provider profiles and compare starting inspection rates.",
    duration: "1–3 hours depending on the issue",
    included: [
      "Basic plumbing inspection",
      "Tap and visible pipe leak checks",
      "Drainage inspection",
      "Repair advice",
    ],
    excluded: [
      "Replacement pipes and fittings",
      "Major renovation work",
      "Additional materials and specialist repairs",
    ],
    faqs: [
      {
        question: "Does the price include spare parts?",
        answer:
          "No. Materials and replacement fittings are normally quoted separately.",
      },
      {
        question: "Can providers handle emergency repairs?",
        answer:
          "Emergency coverage depends on the provider and must be confirmed through real availability data.",
      },
      {
        question: "Are these actual quotations?",
        answer:
          "No. All prices are fictional examples for frontend development.",
      },
    ],
    providers: [
      {
        id: "plumb-01",
        name: "AquaFix Plumbing",
        initials: "AP",
        profession: "Plumbing Service Company",
        location: "Kandy",
        experience: 9,
        rating: 4.9,
        reviewCount: 104,
        price: 2300,
        priceUnit: "inspection visit",
        verified: true,
        available: true,
        responseTime: "Usually within 1 hour",
        bio: "Home plumbing repairs with experience in water supply systems, leaking taps and pipe maintenance.",
        skills: ["Leak repairs", "Water systems", "Bathroom fittings"],
      },
      {
        id: "plumb-02",
        name: "PipeCare Lanka",
        initials: "PL",
        profession: "Independent Plumber",
        location: "Gampola",
        experience: 5,
        rating: 4.7,
        reviewCount: 74,
        price: 2000,
        priceUnit: "inspection visit",
        verified: true,
        available: true,
        responseTime: "Usually within 3 hours",
        bio: "Handles blocked drains, leaking pipes and general plumbing maintenance.",
        skills: ["Drainage", "Pipes", "General repairs"],
      },
    ],
  },

  "air-conditioning": {
    id: "air-conditioning",
    title: "Air Conditioner Servicing",
    category: "Air Conditioning",
    emoji: "❄️",
    tagline: "Keep your home cool with dependable AC maintenance.",
    description:
      "Compare service professionals for air conditioner inspection, cleaning and maintenance. Find sample starting rates for common residential AC service visits.",
    duration: "1–3 hours per unit",
    included: [
      "General AC inspection",
      "Basic filter assessment",
      "Airflow and drainage checks",
      "Service recommendations",
    ],
    excluded: [
      "Refrigerant replacement",
      "Compressor and major electrical repairs",
      "Specialist chemical cleaning",
    ],
    faqs: [
      {
        question: "Does the price include chemical cleaning?",
        answer:
          "Specialist cleaning may require a separate quotation.",
      },
      {
        question: "Are prices charged per AC unit?",
        answer:
          "The sample providers display the pricing unit for their starting rate.",
      },
      {
        question: "Can I check actual technician availability?",
        answer:
          "Not in this demo. Availability is placeholder information.",
      },
    ],
    providers: [
      {
        id: "ac-01",
        name: "CoolAir Technicians",
        initials: "CT",
        profession: "AC Maintenance Company",
        location: "Kandy",
        experience: 7,
        rating: 4.8,
        reviewCount: 115,
        price: 3500,
        priceUnit: "AC inspection",
        verified: true,
        available: true,
        responseTime: "Usually within 2 hours",
        bio: "Provides residential split AC inspections, cleaning assessments and cooling system maintenance.",
        skills: ["Split AC", "Maintenance", "Diagnostics"],
      },
      {
        id: "ac-02",
        name: "ClimateCare Services",
        initials: "CS",
        profession: "HVAC Service Provider",
        location: "Colombo",
        experience: 10,
        rating: 4.9,
        reviewCount: 139,
        price: 4200,
        priceUnit: "AC inspection",
        verified: true,
        available: false,
        responseTime: "Not accepting demo requests",
        bio: "Experienced in home cooling systems, regular servicing and preventive inspections.",
        skills: ["HVAC", "Airflow", "Inspection"],
      },
    ],
  },

  "home-cleaning": {
    id: "home-cleaning",
    title: "Home Deep Cleaning",
    category: "Cleaning Services",
    emoji: "🧹",
    tagline: "Fresh, clean and comfortable living spaces.",
    description:
      "Discover sample home cleaning providers offering general and deep cleaning services. Compare example package prices and the types of cleaning included.",
    duration: "3–6 hours depending on property size",
    included: [
      "General surface cleaning",
      "Kitchen and bathroom cleaning",
      "Floor sweeping and mopping",
      "Basic cleaning scope assessment",
    ],
    excluded: [
      "Specialist carpet and sofa treatment",
      "Pest control",
      "Additional rooms outside the selected package",
    ],
    faqs: [
      {
        question: "Are cleaning materials included?",
        answer:
          "The exact scope depends on the provider's confirmed service package.",
      },
      {
        question: "Can I request extra rooms?",
        answer:
          "Additional areas may result in an updated quotation.",
      },
      {
        question: "Are these real cleaning companies?",
        answer:
          "No. The companies listed here are fictional demo records.",
      },
    ],
    providers: [
      {
        id: "clean-01",
        name: "FreshNest Cleaning",
        initials: "FN",
        profession: "Residential Cleaning Company",
        location: "Kandy",
        experience: 6,
        rating: 4.8,
        reviewCount: 87,
        price: 4500,
        priceUnit: "basic cleaning package",
        verified: true,
        available: true,
        responseTime: "Usually within 2 hours",
        bio: "Provides residential cleaning services with special attention to kitchens, bathrooms and general living areas.",
        skills: ["Deep cleaning", "Bathrooms", "Kitchen cleaning"],
      },
      {
        id: "clean-02",
        name: "SparkleHome Lanka",
        initials: "SH",
        profession: "Home Cleaning Service",
        location: "Colombo",
        experience: 4,
        rating: 4.6,
        reviewCount: 59,
        price: 4000,
        priceUnit: "basic cleaning package",
        verified: false,
        available: true,
        responseTime: "Usually within 4 hours",
        bio: "Offers general household cleaning packages for apartments and small houses.",
        skills: ["Apartments", "Floor care", "General cleaning"],
      },
    ],
  },

  carpentry: {
    id: "carpentry",
    title: "Carpentry & Furniture Repairs",
    category: "Carpentry & Woodwork",
    emoji: "🔨",
    tagline: "Skilled woodwork and furniture maintenance services.",
    description:
      "Explore example carpentry providers for furniture repairs, doors, cabinets and general household woodwork. Compare their experience and sample assessment fees.",
    duration: "Depends on the project",
    included: [
      "Initial carpentry inspection",
      "Basic measurements",
      "Furniture or woodwork assessment",
      "Repair recommendations",
    ],
    excluded: [
      "Timber and additional materials",
      "New furniture fabrication",
      "Major installations",
    ],
    faqs: [
      {
        question: "Are materials included?",
        answer:
          "Materials such as timber, hinges and fittings are usually quoted separately.",
      },
      {
        question: "Can I request custom furniture?",
        answer:
          "Custom furniture requires a separate specification and quotation.",
      },
      {
        question: "Are these provider ratings real?",
        answer:
          "No. All ratings and review counts are dummy data.",
      },
    ],
    providers: [
      {
        id: "carp-01",
        name: "TimberCraft Works",
        initials: "TW",
        profession: "Professional Carpentry Workshop",
        location: "Kandy",
        experience: 12,
        rating: 4.9,
        reviewCount: 92,
        price: 3000,
        priceUnit: "assessment visit",
        verified: true,
        available: true,
        responseTime: "Usually within 3 hours",
        bio: "Carpentry team specializing in door repairs, cabinets, furniture adjustments and home woodwork.",
        skills: ["Cabinetry", "Doors", "Furniture"],
      },
      {
        id: "carp-02",
        name: "WoodCare Professionals",
        initials: "WP",
        profession: "Independent Carpentry Team",
        location: "Matale",
        experience: 7,
        rating: 4.7,
        reviewCount: 68,
        price: 2600,
        priceUnit: "assessment visit",
        verified: true,
        available: true,
        responseTime: "Usually within 2 hours",
        bio: "Offers furniture restoration, minor timber repairs and household carpentry maintenance.",
        skills: ["Restoration", "Wood repairs", "Fittings"],
      },
    ],
  },
};

export const demoServiceLinks = Object.values(demoServices).map(
  (service) => ({
    id: service.id,
    title: service.title,
    emoji: service.emoji,
  })
);

export function getDemoService(id) {
  if (id === "demo" || id === "1") {
    return demoServices["electrical-repairs"];
  }

  return demoServices[id] ?? null;
}
