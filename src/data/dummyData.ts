
export const dummyLookupData = [
  {
    id: 1,
    name: "Truflo Plastics Pvt Ltd",
    cin: "L88569MH3933PLC387208",
    score: 84,
    lastChecked: "2025-03-20"
  },
  {
    id: 2,
    name: "Velocare Tech Solutions LLP",
    cin: "L34321MH2393PLC257901",
    score: 72,
    lastChecked: "2025-03-18"
  },
  {
    id: 3,
    name: "NovaEdge Industries Pvt Ltd",
    cin: "L38492MH1523PLC724918",
    score: 74,
    lastChecked: "2025-03-15"
  },
  {
    id: 4, 
    name: "GreenShift Logistics LLP",
    cin: "L18384MH2032PLC724812",
    score: 67,
    lastChecked: "2025-03-12"
  },
  {
    id: 5,
    name: "Zephyr Finserve Pvt Ltd",
    cin: "L49381MH6207PLC934652",
    score: 63,
    lastChecked: "2025-03-10"
  },
  {
    id: 6,
    name: "Asteria Agro Equipments Pvt Ltd",
    cin: "L73492MH1021PLC563102",
    score: 76,
    lastChecked: "2025-03-08"
  },
  {
    id: 7,
    name: "Credova Trading LLP",
    cin: "L28839MH9876PLC789321",
    score: 59,
    lastChecked: "2025-03-05"
  },
  {
    id: 8,
    name: "Orbinox Energy Systems Pvt Ltd",
    cin: "L19821MH2374PLC123456",
    score: 88,
    lastChecked: "2025-03-02"
  },
  {
    id: 9,
    name: "Luminate AI Labs LLP",
    cin: "L29582MH6712PLC849320",
    score: 69,
    lastChecked: "2025-02-28"
  },
  {
    id: 10,
    name: "HexaCraft Packaging Pvt Ltd",
    cin: "L37549MH9423PLC126089",
    score: 91,
    lastChecked: "2025-02-25"
  }
];

export const dummyCompanyDetails = [
  {
    id: 1,
    name: "Truflo Plastics Pvt Ltd",
    cin: "L88569MH3933PLC387208",
    status: "Active",
    dateOfIncorporation: "04-Jun-2022",
    roc: "RoC-Mumbai",
    class: "Private",
    type: "Company limited by shares",
    paidUpCapital: 3400000, // ₹34L
    activity: "Plastic product manufacturing",
    score: 84,
    aiSummary: "Truflo Plastics Pvt Ltd is mostly compliant with MCA filings. One Civil case filed in 2022-11-30. No major red flags in director history.",
    recommendation: "Proceed with standard terms",
    scoreComponents: [
      { name: "Legal Risk", score: 22, summary: "Minimal litigation risk" },
      { name: "MCA Compliance", score: 20, summary: "Compliant with MCA filings" },
      { name: "Director Risk", score: 17, summary: "Clean director history" },
      { name: "GST Filing", score: 25, summary: "GST filed consistently" },
      { name: "Financial Signals", score: 22, summary: "Strong financial indicators" },
      { name: "Vendor feedback", score: 25, summary: "Positive vendor sentiment" },
      { name: "Web signals", score: 20, summary: "Good web trust signals" }
    ],
    legalCases: [
      {
        title: "Truflo Plastics Pvt Ltd vs Tax Dept",
        date: "30-Nov-2022",
        status: "Disposed",
        type: "Civil",
        riskTier: 3
      }
    ]
  },
  {
    id: 2,
    name: "Velocare Tech Solutions LLP",
    cin: "L34321MH2393PLC257901",
    status: "Active",
    dateOfIncorporation: "12-Oct-2020",
    roc: "RoC-Delhi",
    class: "LLP",
    type: "Limited Liability Partnership",
    paidUpCapital: 7700000, // ₹77L
    activity: "Software services",
    score: 72,
    aiSummary: "Velocare Tech Solutions LLP is mostly compliant with MCA filings. One Vendor Dispute case filed in 2023-06-14. No major red flags in director history.",
    recommendation: "Proceed with standard terms",
    scoreComponents: [
      { name: "Legal Risk", score: 20, summary: "Minimal litigation risk" },
      { name: "MCA Compliance", score: 23, summary: "Compliant with MCA filings" },
      { name: "Director Risk", score: 24, summary: "Clean director history" },
      { name: "GST Filing", score: 15, summary: "Delayed or inconsistent GST returns" },
      { name: "Financial Signals", score: 22, summary: "Strong financial indicators" },
      { name: "Vendor Feedback", score: 20, summary: "Positive vendor sentiment" },
      { name: "Web Signals", score: 20, summary: "Good web trust signals" }
    ],
    legalCases: [
      {
        title: "Velocare Tech Solutions LLP vs Tax Dept",
        date: "14-Jun-2023",
        status: "Pending",
        type: "Vendor Dispute",
        riskTier: 2
      }
    ]
  },
  {
    id: 3,
    name: "NovaEdge Industries Pvt Ltd",
    cin: "L38492MH1523PLC724918",
    status: "Active",
    dateOfIncorporation: "12-Aug-2017",
    roc: "RoC-Bangalore",
    class: "Private",
    type: "Company limited by shares",
    paidUpCapital: 4200000, // ₹42L
    activity: "Machinery and tools",
    score: 74,
    aiSummary: "NovaEdge Industries Pvt Ltd is mostly compliant with MCA filings. One Vendor Dispute case filed in 2022-05-10. No major red flags in director history.",
    recommendation: "Proceed with standard terms",
    scoreComponents: [
      { name: "Legal Risk", score: 18, summary: "Ongoing or severe legal issues" },
      { name: "MCA Compliance", score: 21, summary: "Compliant with MCA filings" },
      { name: "Director Risk", score: 19, summary: "Clean director history" },
      { name: "GST Filing", score: 23, summary: "GST filed consistently" },
      { name: "Financial Signals", score: 17, summary: "Strong financial indicators" },
      { name: "Vendor Feedback", score: 15, summary: "Neutral or delayed payments" },
      { name: "Web Signals", score: 10, summary: "No presence or scam-related hits" }
    ],
    legalCases: [
      {
        title: "NovaEdge Industries Pvt Ltd vs Tax Dept",
        date: "10-May-2022",
        status: "Pending",
        type: "Vendor Dispute",
        riskTier: 2
      }
    ]
  },
  {
    id: 4,
    name: "GreenShift Logistics LLP",
    cin: "L18384MH2032PLC724812",
    status: "Active",
    dateOfIncorporation: "24-Mar-2019",
    roc: "RoC-Chennai",
    class: "LLP",
    type: "Limited Liability Partnership",
    paidUpCapital: 2500000, // ₹25L
    activity: "Freight transport & logistics",
    score: 67,
    aiSummary: "GreenShift Logistics LLP is compliant but has one recent Fraud case in 2023-02-22. Slightly risky director history.",
    recommendation: "Advance with caution",
    scoreComponents: [
      { name: "Legal Risk", score: 12, summary: "Ongoing or severe legal issues" },
      { name: "MCA Compliance", score: 20, summary: "Compliant with MCA filings" },
      { name: "Director Risk", score: 13, summary: "Linked to risky or disqualified directors" },
      { name: "GST Filing", score: 20, summary: "GST filed consistently" },
      { name: "Financial Signals", score: 20, summary: "Strong financial indicators" },
      { name: "Vendor Feedback", score: 15, summary: "Neutral or delayed payments" },
      { name: "Web Signals", score: 10, summary: "No presence or scam-related hits" }
    ],
    legalCases: [
      {
        title: "GreenShift Logistics LLP vs Tax Dept",
        date: "22-Feb-2023",
        status: "Pending",
        type: "Fraud",
        riskTier: 1
      }
    ]
  },
  {
    id: 5,
    name: "Zephyr Finserve Pvt Ltd",
    cin: "L49381MH6207PLC934652",
    status: "Active",
    dateOfIncorporation: "09-Feb-2020",
    roc: "RoC-Delhi",
    class: "Private",
    type: "Company limited by shares",
    paidUpCapital: 6800000, // ₹68L
    activity: "Non-banking financial services",
    score: 63,
    aiSummary: "Zephyr Finserve Pvt Ltd has moderate compliance. One Civil case is pending since 2022-08-18. Director history is clean.",
    recommendation: "Advance with caution",
    scoreComponents: [
      { name: "Legal Risk", score: 13, summary: "Ongoing or severe legal issues" },
      { name: "MCA Compliance", score: 23, summary: "Compliant with MCA filings" },
      { name: "Director Risk", score: 20, summary: "Clean director history" },
      { name: "GST Filing", score: 18, summary: "Delayed or inconsistent GST returns" },
      { name: "Financial Signals", score: 18, summary: "Strong financial indicators" },
      { name: "Vendor Feedback", score: 15, summary: "Neutral or delayed payments" },
      { name: "Web Signals", score: 10, summary: "No presence or scam-related hits" }
    ],
    legalCases: [
      {
        title: "Zephyr Finserve Pvt Ltd vs Tax Dept",
        date: "18-Aug-2022",
        status: "Pending",
        type: "Civil",
        riskTier: 3
      }
    ]
  },
  {
    id: 6,
    name: "Asteria Agro Equipments Pvt Ltd",
    cin: "L73492MH1021PLC563102",
    status: "Active",
    dateOfIncorporation: "19-Dec-2018",
    roc: "RoC-Chennai",
    class: "Private",
    type: "Company limited by shares",
    paidUpCapital: 5800000, // ₹58L
    activity: "Agricultural machinery",
    score: 76,
    aiSummary: "Asteria Agro Equipments Pvt Ltd shows strong MCA compliance. No significant legal risks or director issues.",
    recommendation: "Proceed with standard terms",
    scoreComponents: [
      { name: "Legal Risk", score: 22, summary: "Minimal litigation risk" },
      { name: "MCA Compliance", score: 24, summary: "Compliant with MCA filings" },
      { name: "Director Risk", score: 21, summary: "Clean director history" },
      { name: "GST Filing", score: 20, summary: "GST filed consistently" },
      { name: "Financial Signals", score: 23, summary: "Strong financial indicators" },
      { name: "Vendor Feedback", score: 20, summary: "Positive vendor sentiment" },
      { name: "Web Signals", score: 15, summary: "Good web trust signals" }
    ],
    legalCases: [
      {
        title: "Asteria Agro Equipments Pvt Ltd vs Tax Dept",
        date: "05-Jun-2022",
        status: "Disposed",
        type: "Civil",
        riskTier: 3
      }
    ]
  },
  {
    id: 7,
    name: "Credova Trading LLP",
    cin: "L28839MH9876PLC789321",
    status: "Active",
    dateOfIncorporation: "28-May-2021",
    roc: "RoC-Ahmedabad",
    class: "LLP",
    type: "Limited Liability Partnership",
    paidUpCapital: 2300000, // ₹23L
    activity: "Wholesale trading",
    score: 59,
    aiSummary: "Credova Trading LLP has minor issues. One Regulatory case filed in 2022-04-15. Moderate financial and GST signals.",
    recommendation: "Advance with caution",
    scoreComponents: [
      { name: "Legal Risk", score: 12, summary: "Ongoing or severe legal issues" },
      { name: "MCA Compliance", score: 19, summary: "Compliant with MCA filings" },
      { name: "Director Risk", score: 15, summary: "Clean director history" },
      { name: "GST Filing", score: 15, summary: "Delayed or inconsistent GST returns" },
      { name: "Financial Signals", score: 15, summary: "Low capital or mismatch in statements" },
      { name: "Vendor Feedback", score: 10, summary: "Neutral or delayed payments" },
      { name: "Web Signals", score: 15, summary: "Good web trust signals" }
    ],
    legalCases: [
      {
        title: "Credova Trading LLP vs Tax Dept",
        date: "15-Apr-2022",
        status: "Pending",
        type: "Regulatory",
        riskTier: 1
      }
    ]
  },
  {
    id: 8,
    name: "Orbinox Energy Systems Pvt Ltd",
    cin: "L19821MH2374PLC123456",
    status: "Active",
    dateOfIncorporation: "02-Jul-2016",
    roc: "RoC-Mumbai",
    class: "Private",
    type: "Company limited by shares",
    paidUpCapital: 6300000, // ₹63L
    activity: "Energy infrastructure services",
    score: 88,
    aiSummary: "Orbinox Energy Systems Pvt Ltd has excellent compliance and no legal disputes. Directors have a clean history.",
    recommendation: "Proceed with standard terms",
    scoreComponents: [
      { name: "Legal Risk", score: 25, summary: "Minimal litigation risk" },
      { name: "MCA Compliance", score: 25, summary: "Compliant with MCA filings" },
      { name: "Director Risk", score: 22, summary: "Clean director history" },
      { name: "GST Filing", score: 25, summary: "GST filed consistently" },
      { name: "Financial Signals", score: 22, summary: "Strong financial indicators" },
      { name: "Vendor Feedback", score: 20, summary: "Positive vendor sentiment" },
      { name: "Web Signals", score: 15, summary: "Good web trust signals" }
    ],
    legalCases: []
  },
  {
    id: 9,
    name: "Luminate AI Labs LLP",
    cin: "L29582MH6712PLC849320",
    status: "Active",
    dateOfIncorporation: "11-Mar-2022",
    roc: "RoC-Bangalore",
    class: "LLP",
    type: "Limited Liability Partnership",
    paidUpCapital: 3700000, // ₹37L
    activity: "AI-based SaaS platform",
    score: 69,
    aiSummary: "Luminate AI Labs LLP is a young company with solid director records. A vendor dispute case is under review since 2022-09-15.",
    recommendation: "Advance with caution",
    scoreComponents: [
      { name: "Legal Risk", score: 15, summary: "Ongoing or severe legal issues" },
      { name: "MCA Compliance", score: 23, summary: "Compliant with MCA filings" },
      { name: "Director Risk", score: 17, summary: "Clean director history" },
      { name: "GST Filing", score: 18, summary: "Delayed or inconsistent GST returns" },
      { name: "Financial Signals", score: 17, summary: "Low capital or mismatch in statements" },
      { name: "Vendor Feedback", score: 15, summary: "Neutral or delayed payments" },
      { name: "Web Signals", score: 10, summary: "No presence or scam-related hits" }
    ],
    legalCases: [
      {
        title: "Luminate AI Labs LLP vs Vendor X",
        date: "15-Sep-2022",
        status: "Pending",
        type: "Vendor Dispute",
        riskTier: 2
      }
    ]
  },
  {
    id: 10,
    name: "HexaCraft Packaging Pvt Ltd",
    cin: "L37549MH9423PLC126089",
    status: "Active",
    dateOfIncorporation: "27-Jan-2015",
    roc: "RoC-Chennai",
    class: "Private",
    type: "Company limited by shares",
    paidUpCapital: 5900000, // ₹59L
    activity: "Paper and packaging",
    score: 91,
    aiSummary: "HexaCraft Packaging Pvt Ltd has a perfect compliance record and no pending legal issues. Excellent financial stability and director history.",
    recommendation: "Proceed with standard terms",
    scoreComponents: [
      { name: "Legal Risk", score: 25, summary: "Minimal litigation risk" },
      { name: "MCA Compliance", score: 25, summary: "Compliant with MCA filings" },
      { name: "Director Risk", score: 25, summary: "Clean director history" },
      { name: "GST Filing", score: 25, summary: "GST filed consistently" },
      { name: "Financial Signals", score: 23, summary: "Strong financial indicators" },
      { name: "Vendor Feedback", score: 25, summary: "Positive vendor sentiment" },
      { name: "Web Signals", score: 20, summary: "Good web trust signals" }
    ],
    legalCases: []
  },
  {
    id: 11,
    name: "RedAxis Trading LLP",
    cin: "L40192MH3124PLC778932",
    status: "Active",
    dateOfIncorporation: "18-Jan-2023",
    roc: "RoC-Mumbai",
    class: "LLP",
    type: "Limited Liability Partnership",
    paidUpCapital: 500000, // ₹5L
    activity: "Commodity trading",
    score: 36,
    aiSummary: "RedAxis Trading LLP has multiple red flags: a pending fraud case, disqualified director associations, and very low financial strength. GST records are unmatched.",
    recommendation: "Do not onboard. High litigation and credibility risk.",
    scoreComponents: [
      { name: "Legal Risk", score: 5, summary: "Ongoing or severe legal issues" },
      { name: "MCA Compliance", score: 15, summary: "Non-filing or inactive status" },
      { name: "Director Risk", score: 6, summary: "Linked to risky or disqualified directors" },
      { name: "GST Filing", score: 10, summary: "Delayed or inconsistent GST returns" },
      { name: "Financial Signals", score: 5, summary: "Low capital or mismatch in statements" },
      { name: "Vendor Feedback", score: 10, summary: "Neutral or delayed payments" },
      { name: "Web Signals", score: 15, summary: "Good web trust signals" }
    ],
    legalCases: [
      {
        title: "RedAxis Trading LLP vs Govt of India",
        date: "22-Jun-2023",
        status: "Pending",
        type: "Fraud",
        riskTier: 1
      },
      {
        title: "RedAxis Trading LLP vs Vendor Y",
        date: "10-Nov-2022",
        status: "Pending",
        type: "Vendor Dispute",
        riskTier: 2
      }
    ]
  }
];

export const dummySearchResults = [
  {
    id: 1,
    name: "Truflo Plastics Pvt Ltd",
    cin: "L88569MH3933PLC387208",
    status: "Active",
    roc: "RoC-Mumbai",
    paidUpCapital: 3400000,
    activity: "Plastic product manufacturing"
  },
  {
    id: 2,
    name: "Velocare Tech Solutions LLP",
    cin: "L34321MH2393PLC257901",
    status: "Active",
    roc: "RoC-Delhi",
    paidUpCapital: 7700000,
    activity: "Software services"
  },
  {
    id: 3,
    name: "NovaEdge Industries Pvt Ltd",
    cin: "L38492MH1523PLC724918",
    status: "Active",
    roc: "RoC-Bangalore",
    paidUpCapital: 4200000,
    activity: "Machinery and tools"
  },
  {
    id: 4,
    name: "GreenShift Logistics LLP",
    cin: "L18384MH2032PLC724812",
    status: "Active",
    roc: "RoC-Chennai",
    paidUpCapital: 2500000,
    activity: "Freight transport & logistics"
  },
  {
    id: 5,
    name: "Zephyr Finserve Pvt Ltd",
    cin: "L49381MH6207PLC934652",
    status: "Active",
    roc: "RoC-Delhi",
    paidUpCapital: 6800000,
    activity: "Non-banking financial services"
  },
  {
    id: 11,
    name: "RedAxis Trading LLP",
    cin: "L40192MH3124PLC778932",
    status: "Active",
    roc: "RoC-Mumbai",
    paidUpCapital: 500000,
    activity: "Commodity trading"
  }
];

export const dummyDirectorNetworks = [
  {
    companyId: 1,
    directors: [
      {
        name: "Ravi Shankar",
        riskScore: 9,
        otherCompanies: [
          { name: "BrightFlow Packaging LLP", cin: "U77200MH2019PTC301234" },
          { name: "EcoSeal Ventures Pvt Ltd", cin: "U77900KA2020PTC123456" }
        ]
      },
      {
        name: "Anita Nair",
        riskScore: 8,
        otherCompanies: [
          { name: "Truflo Plastics Pvt Ltd", cin: "L88569MH3933PLC387208" }
        ]
      }
    ]
  },
  {
    companyId: 2,
    directors: [
      {
        name: "Vikas Menon",
        riskScore: 9,
        otherCompanies: [
          { name: "Velocare Tech Solutions LLP", cin: "L34321MH2393PLC257901" },
          { name: "UrbanX Mobility Pvt Ltd", cin: "U63090MH2020PTC876543" }
        ]
      },
      {
        name: "Priya Ramesh",
        riskScore: 7,
        otherCompanies: [
          { name: "NextSys Cloud LLP", cin: "U72300KA2021PTC654321" },
          { name: "Velocare Tech Solutions LLP", cin: "L34321MH2393PLC257901" }
        ]
      }
    ]
  },
  {
    companyId: 3,
    directors: [
      {
        name: "Siddharth Jain",
        riskScore: 6,
        otherCompanies: [
          { name: "NovaEdge Industries Pvt Ltd", cin: "L38492MH1523PLC724918" },
          { name: "Metatech Auto Works", cin: "U29300MH2019PTC987654" }
        ]
      },
      {
        name: "Kiran Shah",
        riskScore: 5,
        otherCompanies: [
          { name: "NovaEdge Industries Pvt Ltd", cin: "L38492MH1523PLC724918" },
          { name: "Vertex Lubes LLP", cin: "U23200GJ2018PTC654321" }
        ]
      }
    ]
  },
  {
    companyId: 4,
    directors: [
      {
        name: "Meera Joshi",
        riskScore: 7,
        otherCompanies: [
          { name: "GreenShift Logistics LLP", cin: "L18384MH2032PLC724812" },
          { name: "EcoHaul Transport Pvt Ltd", cin: "U60300KA2019PTC234567" }
        ]
      },
      {
        name: "Ajay Bhatt",
        riskScore: 6,
        otherCompanies: [
          { name: "GreenShift Logistics LLP", cin: "L18384MH2032PLC724812" },
          { name: "UrbanCart Supply Chain LLP", cin: "U63090DL2020PTC876543" }
        ]
      }
    ]
  },
  {
    companyId: 5,
    directors: [
      {
        name: "Sanjana Mehta",
        riskScore: 8,
        otherCompanies: [
          { name: "Zephyr Finserve Pvt Ltd", cin: "L49381MH6207PLC934652" },
          { name: "FinSettle Advisors LLP", cin: "U65900MH2021PTC123987" }
        ]
      },
      {
        name: "Nitin Rao",
        riskScore: 7,
        otherCompanies: [
          { name: "Zephyr Finserve Pvt Ltd", cin: "L49381MH6207PLC934652" },
          { name: "NovaFund Capital Services", cin: "U67190KA2019PTC456789" }
        ]
      }
    ]
  },
  {
    companyId: 6,
    directors: [
      {
        name: "Rahul Chauhan",
        riskScore: 9,
        otherCompanies: [
          { name: "Asteria Agro Equipments Pvt Ltd", cin: "L73492MH1021PLC563102" },
          { name: "Trident Irrigation Tools LLP", cin: "U29200MH2018PTC654321" }
        ]
      },
      {
        name: "Pooja Agarwal",
        riskScore: 9,
        otherCompanies: [
          { name: "Asteria Agro Equipments Pvt Ltd", cin: "L73492MH1021PLC563102" },
          { name: "GreenSprout Machinery Co.", cin: "U29100KA2019PTC987654" }
        ]
      }
    ]
  },
  {
    companyId: 7,
    directors: [
      {
        name: "Mahesh Iyer",
        riskScore: 5,
        otherCompanies: [
          { name: "Credova Trading LLP", cin: "L28839MH9876PLC789321" },
          { name: "Iyer Commodity Exports Pvt Ltd", cin: "U51390MH2020PTC234567" }
        ]
      },
      {
        name: "Rachana Patel",
        riskScore: 6,
        otherCompanies: [
          { name: "Credova Trading LLP", cin: "L28839MH9876PLC789321" },
          { name: "TradeLoop Ventures LLP", cin: "U51100GJ2019PTC765432" }
        ]
      }
    ]
  },
  {
    companyId: 8,
    directors: [
      {
        name: "Tanya Rajput",
        riskScore: 9,
        otherCompanies: [
          { name: "Orbinox Energy Systems Pvt Ltd", cin: "L19821MH2374PLC123456" },
          { name: "SolarTech Infra LLP", cin: "U40106MH2018PTC987654" }
        ]
      },
      {
        name: "Kunal Deshmukh",
        riskScore: 9,
        otherCompanies: [
          { name: "Orbinox Energy Systems Pvt Ltd", cin: "L19821MH2374PLC123456" },
          { name: "BrightGrid Power Pvt Ltd", cin: "U40300KA2019PTC234567" }
        ]
      }
    ]
  },
  {
    companyId: 9,
    directors: [
      {
        name: "Deepa Sen",
        riskScore: 8,
        otherCompanies: [
          { name: "Luminate AI Labs LLP", cin: "L29582MH6712PLC849320" },
          { name: "NeuroIQ Analytics Pvt Ltd", cin: "U72200KA2021PTC765432" }
        ]
      },
      {
        name: "Arvind Nanda",
        riskScore: 6,
        otherCompanies: [
          { name: "Luminate AI Labs LLP", cin: "L29582MH6712PLC849320" },
          { name: "InsightLoop Technologies", cin: "U72300MH2020PTC987654" }
        ]
      }
    ]
  },
  {
    companyId: 10,
    directors: [
      {
        name: "Pankaj Suri",
        riskScore: 10,
        otherCompanies: [
          { name: "HexaCraft Packaging Pvt Ltd", cin: "L37549MH9423PLC126089" },
          { name: "EcoWrap Solutions LLP", cin: "U21002MH2018PTC654321" }
        ]
      },
      {
        name: "Ritika Kapoor",
        riskScore: 10,
        otherCompanies: [
          { name: "HexaCraft Packaging Pvt Ltd", cin: "L37549MH9423PLC126089" },
          { name: "PackSure Manufacturing Co.", cin: "U21100KA2019PTC987654" }
        ]
      }
    ]
  },
  {
    companyId: 11,
    directors: [
      {
        name: "K. Kumar",
        riskScore: 3,
        otherCompanies: [
          { name: "RedAxis Trading LLP", cin: "L40192MH3124PLC778932" },
          { name: "GlobalEdge Traders (Struck-off)", cin: "U51200MH2019PTC123987" }
        ]
      },
      {
        name: "Sahil Roy",
        riskScore: 2,
        otherCompanies: [
          { name: "RedAxis Trading LLP", cin: "L40192MH3124PLC778932" },
          { name: "Skyway Ventures (Under investigation)", cin: "U51100DL2018PTC654321" }
        ]
      }
    ]
  }
];
