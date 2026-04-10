export interface CostCategory {
  title: string;
  items: { label: string; value: string }[];
}

export interface DestinationContent {
  slug: string;
  countryName: string;
  flag: string;
  hero: {
    headline: string;
    subheadline: string;
    text: string;
  };
  atAGlance: { label: string; value: string }[];
  whyStudy: { title: string; description: string; icon?: React.ReactNode }[];
  popularCourses: string[];
  topUniversities: string[];
  costs: CostCategory[];
  scholarships: string[];
  intakes?: string[];
  requirements: string[];
  successStories?: { studentName: string; course: string; university: string; quote: string }[];
  faqs?: { question: string; answer: string }[];
}

export const DESTINATION_DETAILS: Record<string, DestinationContent> = {
  "uk": {
    slug: "uk",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    hero: {
      headline: "Study in the United Kingdom",
      subheadline: "World-Class Universities • Scholarships • Post-Study Work Opportunities",
      text: "Start your journey to studying in the UK with EduPlan360. Get admission guidance, visa support and scholarship advice from experienced counsellors.",
    },
    atAGlance: [
      { label: "Capital", value: "London" },
      { label: "Language", value: "English" },
      { label: "Universities", value: "350+" },
      { label: "International Students", value: "480,000+" },
      { label: "Average Tuition", value: "£10k – £38k" },
      { label: "Post Study Work Visa", value: "2 Years" },
    ],
    whyStudy: [
      { title: "World-Class Universities", description: "Home to some of the oldest and most prestigious universities." },
      { title: "Globally Recognised Degrees", description: "UK qualifications are instantly recognized and respected worldwide." },
      { title: "Shorter Degree Duration", description: "Most undergraduate degrees take 3 years, and masters take 1 year." },
      { title: "Work While Studying", description: "Work up to 20 hours a week during your studies." },
      { title: "International Student Community", description: "A highly diverse student population from all over the globe." },
      { title: "Post Study Work Opportunities", description: "The Graduate Route allows you to stay to work for 2 years." },
    ],
    popularCourses: ["Business & Management", "Data Science", "Artificial Intelligence", "Engineering", "Nursing & Healthcare", "Law", "Finance & Accounting", "Cybersecurity"],
    topUniversities: ["University of Wolverhampton", "University of Roehampton", "Canterbury Christ Church University", "University of Derby", "BPP University", "Ravensbourne University London"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Foundation", value: "£8k – £12k" },
          { label: "Undergraduate", value: "£10k – £20k" },
          { label: "Masters", value: "£12k – £25k" },
        ],
      },
      {
        title: "Living Costs",
        items: [
          { label: "Accommodation", value: "£400 – £800" },
          { label: "Food", value: "£150 – £300" },
          { label: "Transport", value: "£50 – £120" },
          { label: "Other Expenses", value: "£150 – £250" },
        ],
      },
    ],
    scholarships: ["Chevening Scholarship", "Commonwealth Scholarship", "GREAT Scholarship", "University Merit Scholarships"],
    intakes: ["September Intake — Main Intake", "January Intake — Secondary Intake", "May Intake — Limited Courses"],
    requirements: ["Academic transcripts", "Passport", "English test (IELTS / PTE)", "Statement of Purpose", "Reference letters", "CV (for Masters)"],
    faqs: [
      { question: "Can Nigerian students study in the UK without IELTS?", answer: "Many UK universities wave the IELTS requirement if you have a minimum score (usually C6) in WAEC/NECO English." },
      { question: "How much does it cost to study in the UK?", answer: "Tuition generally ranges from £10,000 to £25,000 yearly depending on the university and program level." },
      { question: "Can students work while studying?", answer: "Yes, international students can work up to 20 hours per week during term time and full-time during holidays." },
      { question: "How long does visa processing take?", answer: "UK student visa processing typically takes 3 to 4 weeks once biometrics are submitted." },
    ],
  },
  "australia": {
    slug: "australia",
    countryName: "Australia",
    flag: "🇦🇺",
    hero: {
      headline: "Study in Australia",
      subheadline: "World-class Universities • Globally Recognised Degrees • High Quality of Life",
      text: "EduPlan360 provides expert support to help you gain admission into top Australian universities and successfully secure your student visa.",
    },
    atAGlance: [
      { label: "Capital", value: "Canberra" },
      { label: "Language", value: "English" },
      { label: "Currency", value: "Australian Dollar (AUD)" },
      { label: "Universities", value: "40+" },
      { label: "International Students", value: "700,000+" },
      { label: "Average Tuition", value: "AUD 20,000 – 45,000 per year" },
      { label: "Post Study Work Visa", value: "2 – 6 years depending on degree" },
    ],
    whyStudy: [
      { title: "World-Class Education", description: "Australia is home to some of the world’s leading universities known for research excellence." },
      { title: "Post Study Work Opportunities", description: "Graduates may remain in Australia for several years through the Temporary Graduate Visa." },
      { title: "Multicultural Environment", description: "Students from more than 190 countries study in Australia." },
      { title: "Work While Studying", description: "International students can work part-time while studying." },
      { title: "Safe and High Quality of Life", description: "Australia consistently ranks among the safest and most livable countries." },
    ],
    popularCourses: ["Business and Management", "Engineering", "Computer Science", "Data Science", "Nursing", "Public Health", "Artificial Intelligence", "Cybersecurity"],
    topUniversities: ["University of Melbourne", "Australian National University", "University of Sydney", "Monash University", "University of Queensland", "University of New South Wales"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Undergraduate", value: "AUD 20,000 – 40,000 per year" },
          { label: "Masters", value: "AUD 22,000 – 45,000 per year" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "AUD 1,200 – 2,000 per month" },
        ],
      },
    ],
    scholarships: ["Australia Awards Scholarship", "Destination Australia Scholarship", "University Merit Scholarships", "Research Training Program Scholarships"],
    requirements: ["Academic transcripts", "Passport", "English proficiency test (IELTS/PTE)", "Statement of purpose", "Reference letters"],
  },
  "canada": {
    slug: "canada",
    countryName: "Canada",
    flag: "🇨🇦",
    hero: {
      headline: "Study in Canada",
      subheadline: "High Quality Education • Safe Environment • Immigration Opportunities",
      text: "Canada offers globally respected education, diverse cultures, and excellent post-graduation career opportunities. EduPlan360 supports students through admission, visa applications, and scholarship opportunities.",
    },
    atAGlance: [
      { label: "Capital", value: "Ottawa" },
      { label: "Language", value: "English & French" },
      { label: "Currency", value: "Canadian Dollar (CAD)" },
      { label: "Universities", value: "100+" },
      { label: "International Students", value: "800,000+" },
      { label: "Average Tuition", value: "CAD 15,000 – 35,000 per year" },
      { label: "Post Study Work Permit", value: "Up to 3 years" },
    ],
    whyStudy: [
      { title: "High Quality Education", description: "Canadian universities are globally respected for their academic excellence." },
      { title: "Post Graduation Work Permit", description: "Students may work in Canada after graduation, paving the way for immigration." },
      { title: "Immigration Opportunities", description: "Many graduates pursue permanent residency through Canadian immigration programs." },
      { title: "Safe and Inclusive Environment", description: "Canada is known for its multicultural, open, and welcoming society." },
    ],
    popularCourses: ["Business Administration", "Engineering", "Data Science", "Information Technology", "Artificial Intelligence", "Healthcare", "Finance"],
    topUniversities: ["University of Toronto", "University of British Columbia", "McGill University", "University of Alberta", "University of Waterloo", "University of Calgary"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Undergraduate", value: "CAD 15,000 – 30,000" },
          { label: "Masters", value: "CAD 18,000 – 35,000" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "CAD 1,000 – 1,500 per month" },
        ],
      },
    ],
    scholarships: ["Vanier Canada Graduate Scholarship", "Canadian Commonwealth Scholarship", "University Entrance Scholarships"],
    requirements: ["Academic transcripts", "English proficiency (IELTS/PTE)", "Passport", "Statement of purpose", "Reference letters"],
  },
  "germany": {
    slug: "germany",
    countryName: "Germany",
    flag: "🇩🇪",
    hero: {
      headline: "Study in Germany",
      subheadline: "Tuition-Free Education • Strong Engineering • Global Economy",
      text: "Germany is one of the most affordable study destinations in Europe, offering high-quality education and strong career opportunities.",
    },
    atAGlance: [
      { label: "Capital", value: "Berlin" },
      { label: "Language", value: "German / English programs available" },
      { label: "Currency", value: "Euro (€)" },
      { label: "Universities", value: "400+" },
      { label: "Average Tuition", value: "Low or Free at public universities" },
    ],
    whyStudy: [
      { title: "Tuition-Free Education", description: "Many public universities charge minimal tuition fees." },
      { title: "Strong Engineering Programs", description: "Germany is globally recognised for engineering and technology education." },
      { title: "Research Opportunities", description: "Germany invests heavily in research and innovation." },
      { title: "Strong Economy", description: "Graduates can access career opportunities in Europe’s largest economy." },
    ],
    popularCourses: ["Mechanical Engineering", "Automotive Engineering", "Artificial Intelligence", "Business Management", "Computer Science"],
    topUniversities: ["Technical University of Munich", "Heidelberg University", "RWTH Aachen University", "University of Stuttgart", "Ludwig Maximilian University Munich"],
    costs: [
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "€800 – €1,200 per month" },
        ],
      },
    ],
    scholarships: ["DAAD Scholarships", "Deutschlandstipendium", "University Research Scholarships"],
    requirements: ["Academic transcripts", "Passport", "English/German test scores", "Statement of Purpose"],
  },
  "ireland": {
    slug: "ireland",
    countryName: "Ireland",
    flag: "🇮🇪",
    hero: {
      headline: "Study in Ireland",
      subheadline: "European Technology Hub • Globally Recognised Degrees",
      text: "Ireland is a leading destination for international students interested in technology, innovation, and global career opportunities.",
    },
    atAGlance: [
      { label: "Capital", value: "Dublin" },
      { label: "Language", value: "English" },
      { label: "Currency", value: "Euro (€)" },
      { label: "Universities", value: "30+" },
      { label: "Average Tuition", value: "€10,000 – €25,000" },
    ],
    whyStudy: [
      { title: "European Technology Hub", description: "Ireland hosts major global tech companies including Google, Apple, Meta, and Microsoft." },
      { title: "Post Study Work Opportunities", description: "Graduates may remain in Ireland to work after completing their degree." },
      { title: "Globally Recognised Degrees", description: "Irish universities maintain strong global reputations." },
    ],
    popularCourses: ["Data Science", "Artificial Intelligence", "Cybersecurity", "Business Analytics", "Software Engineering"],
    topUniversities: ["Trinity College Dublin", "University College Dublin", "University College Cork", "National University of Ireland Galway", "Dublin City University"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Undergraduate", value: "€10,000 – €20,000" },
          { label: "Masters", value: "€12,000 – €25,000" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "€900 – €1,500 per month" },
        ],
      },
    ],
    scholarships: ["Government of Ireland Scholarships", "University Merit Scholarships", "Research Council Scholarships"],
    requirements: ["Academic transcripts", "Passport", "English proficiency", "Statement of Purpose"],
  },
  "new-zealand": {
    slug: "new-zealand",
    countryName: "New Zealand",
    flag: "🇳🇿",
    hero: {
      headline: "Study in New Zealand",
      subheadline: "High-Quality Education • Safe Environment • Excellent Post-study Rights",
      text: "Students in New Zealand benefit from a welcoming multicultural society, a high quality of life, and the opportunity to work during and after studies.",
    },
    atAGlance: [
      { label: "Capital", value: "Wellington" },
      { label: "Language", value: "English" },
      { label: "Currency", value: "New Zealand Dollar (NZD)" },
      { label: "Universities", value: "8" },
      { label: "International Students", value: "120,000+" },
      { label: "Average Tuition", value: "NZD 22,000 – NZD 35,000 per year" },
    ],
    whyStudy: [
      { title: "Globally Recognised", description: "All 8 New Zealand universities rank consistently high globally." },
      { title: "Safe & Welcoming", description: "New Zealand is renowned for its low crime rate and peaceful atmosphere." },
      { title: "Post-Study Work", description: "Strong opportunities to remain under the Post-Study Work Visa." },
      { title: "High Quality of Life", description: "Enjoy an incredible work/life balance with beautiful natural landscapes." },
    ],
    popularCourses: ["Business Administration", "Engineering", "Computer Science", "Information Technology", "Environmental Science", "Tourism and Hospitality"],
    topUniversities: ["University of Auckland", "University of Otago", "Victoria University of Wellington", "University of Canterbury", "Massey University"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Undergraduate", value: "NZD 22,000 – 32,000 per year" },
          { label: "Postgraduate", value: "NZD 26,000 – 35,000 per year" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "NZD 1,200 – 1,800 per month" },
        ],
      },
    ],
    scholarships: ["New Zealand Government Scholarships", "University International Scholarships", "Commonwealth Scholarships"],
    requirements: ["Academic transcripts", "Passport", "English proficiency test (IELTS/PTE)", "Statement of purpose", "Recommendation letters"],
  },
  "greece": {
    slug: "greece",
    countryName: "Greece",
    flag: "🇬🇷",
    hero: {
      headline: "Study in Greece",
      subheadline: "Affordable European Education • Rich Cultural Heritage",
      text: "Greece offers international students the opportunity to study in Europe while experiencing a vibrant academic environment, especially in tourism and maritime studies.",
    },
    atAGlance: [
      { label: "Capital", value: "Athens" },
      { label: "Language", value: "Greek / English" },
      { label: "Currency", value: "Euro (€)" },
      { label: "Universities", value: "25+" },
      { label: "International Students", value: "30,000+" },
      { label: "Average Tuition", value: "€4,000 – €10,000 per year" },
    ],
    whyStudy: [
      { title: "Affordable European Education", description: "Tuition and living costs are highly competitive in the EU." },
      { title: "Rich Cultural Heritage", description: "Study in the birthplace of Western academia." },
      { title: "English-Taught Programs", description: "A growing number of fully English-taught bachelor and master degrees." },
      { title: "Tourism & Maritime Focus", description: "World-class education in hospitality and shipping industries." },
    ],
    popularCourses: ["Tourism Management", "Maritime Studies", "Business Administration", "International Relations", "History and Archaeology"],
    topUniversities: ["National and Kapodistrian University of Athens", "Aristotle University of Thessaloniki", "University of Crete", "Athens University of Economics and Business"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Undergraduate", value: "€4,000 – €8,000 per year" },
          { label: "Masters", value: "€6,000 – €10,000 per year" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "€600 – €1,000 per month" },
        ],
      },
    ],
    scholarships: ["Greek Government Scholarships", "University Scholarships", "Erasmus+ Scholarships"],
    requirements: ["Academic transcripts", "Passport", "English language proficiency", "Statement of purpose", "Recommendation letters"],
  },
  "finland": {
    slug: "finland",
    countryName: "Finland",
    flag: "🇫🇮",
    hero: {
      headline: "Study in Finland",
      subheadline: "Innovative Education System • Technology Hub • Safe Quality of Life",
      text: "Finland offers a wide range of English-taught programs and provides students with access to world-class academic facilities.",
    },
    atAGlance: [
      { label: "Capital", value: "Helsinki" },
      { label: "Language", value: "Finnish / English programs available" },
      { label: "Currency", value: "Euro (€)" },
      { label: "Universities", value: "35+" },
      { label: "International Students", value: "25,000+" },
      { label: "Average Tuition", value: "€8,000 – €18,000 per year" },
    ],
    whyStudy: [
      { title: "Innovative Education", description: "Finland is globally recognised for pioneering education systems." },
      { title: "Strong Tech Ecosystem", description: "Outstanding programs in AI, gaming, engineering, and IT." },
      { title: "Safe & High Quality of Life", description: "Consistently ranked as one of the happiest countries in the world." },
    ],
    popularCourses: ["Artificial Intelligence", "Information Technology", "Engineering", "Business Analytics", "Education"],
    topUniversities: ["University of Helsinki", "Aalto University", "Tampere University", "University of Turku", "University of Oulu"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Average Range", value: "€8,000 – €18,000 per year" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "€700 – €1,200 per month" },
        ],
      },
    ],
    scholarships: ["Finnish Government Scholarships", "University Tuition Waivers", "Erasmus+ Scholarships"],
    requirements: ["Academic transcripts", "Passport", "English proficiency", "Statement of purpose", "Recommendation letters"],
  },
  "hungary": {
    slug: "hungary",
    countryName: "Hungary",
    flag: "🇭🇺",
    hero: {
      headline: "Study in Hungary",
      subheadline: "Affordable European Education • Historic Universities",
      text: "Hungary is an increasingly popular study destination for international students due to its affordable tuition fees and high-quality education.",
    },
    atAGlance: [
      { label: "Capital", value: "Budapest" },
      { label: "Language", value: "Hungarian / English" },
      { label: "Currency", value: "Hungarian Forint" },
      { label: "Universities", value: "65+" },
      { label: "International Students", value: "35,000+" },
      { label: "Average Tuition", value: "€3,000 – €7,000 per year" },
    ],
    whyStudy: [
      { title: "Affordable European Education", description: "Very low cost footprint compared to Western Europe." },
      { title: "High Quality Universities", description: "Excellent historic universities with strong medical and STEM programs." },
      { title: "Central Location", description: "Easy and affordable travel to the rest of the European Union." },
    ],
    popularCourses: ["Medicine", "Business Administration", "Engineering", "Computer Science", "International Relations"],
    topUniversities: ["University of Debrecen", "Eötvös Loránd University", "Budapest University of Technology and Economics", "Semmelweis University"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Undergraduate", value: "€3,000 – €6,000 per year" },
          { label: "Masters", value: "€4,000 – €7,000 per year" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "€500 – €900 per month" },
        ],
      },
    ],
    scholarships: ["Stipendium Hungaricum Scholarship", "University Scholarships", "Government Scholarships"],
    requirements: ["Academic transcripts", "Passport", "English proficiency test", "Statement of purpose"],
  },
  "spain": {
    slug: "spain",
    countryName: "Spain",
    flag: "🇪🇸",
    hero: {
      headline: "Study in Spain",
      subheadline: "Culturally Vibrant • Top Business Schools • Affordable Living",
      text: "Spain is particularly known for its strong business schools and programs in tourism, offering an excellent lifestyle.",
    },
    atAGlance: [
      { label: "Capital", value: "Madrid" },
      { label: "Language", value: "Spanish / English" },
      { label: "Currency", value: "Euro (€)" },
      { label: "Universities", value: "80+" },
      { label: "International Students", value: "200,000+" },
      { label: "Average Tuition", value: "€6,000 – €20,000 per year" },
    ],
    whyStudy: [
      { title: "Globally Respected Business Schools", description: "Spain houses some of the elite business academies in Europe." },
      { title: "Rich Cultural Environment", description: "A highly immersive and dynamic European lifestyle." },
      { title: "Growing English Programs", description: "Rapid expansion of fully English-taught bachelor and masters degrees." },
      { title: "Affordable Living Costs", description: "More affordable than many northern EU counterparts." },
    ],
    popularCourses: ["Business Administration", "International Business", "Tourism and Hospitality", "Architecture", "Engineering"],
    topUniversities: ["University of Barcelona", "Autonomous University of Madrid", "University of Valencia", "IE Business School"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Undergraduate", value: "€6,000 – €15,000 per year" },
          { label: "Masters", value: "€8,000 – €20,000 per year" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "€700 – €1,200 per month" },
        ],
      },
    ],
    scholarships: ["Spanish Government Scholarships", "Erasmus+ Scholarships", "University Merit Scholarships"],
    requirements: ["Academic transcripts", "Passport", "English or Spanish test", "Statement of purpose", "Recommendation letters"],
  },
  "japan": {
    slug: "japan",
    countryName: "Japan",
    flag: "🇯🇵",
    hero: {
      headline: "Study in Japan",
      subheadline: "Technology Hub • Unique Culture • High-Quality Education",
      text: "Japan offers international students the opportunity to study in one of the world’s most technologically advanced countries.",
    },
    atAGlance: [
      { label: "Capital", value: "Tokyo" },
      { label: "Language", value: "Japanese / English" },
      { label: "Currency", value: "Japanese Yen" },
      { label: "Universities", value: "780+" },
      { label: "International Students", value: "300,000+" },
      { label: "Average Tuition", value: "$6,000 – $10,000 per year" },
    ],
    whyStudy: [
      { title: "Strong Technology Sector", description: "Leader in global robotics, engineering, and electronics innovation." },
      { title: "High-Quality Universities", description: "World-class education infrastructure and deep research funding." },
      { title: "Unique Cultural Experience", description: "A beautiful blend of extreme modernism and deep historical tradition." },
    ],
    popularCourses: ["Engineering", "Robotics", "Artificial Intelligence", "Business Administration", "International Relations"],
    topUniversities: ["University of Tokyo", "Kyoto University", "Osaka University", "Tokyo Institute of Technology"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Undergraduate", value: "$6,000 – $8,000 per year" },
          { label: "Masters", value: "$7,000 – $10,000 per year" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "$800 – $1,200 per month" },
        ],
      },
    ],
    scholarships: ["MEXT Scholarship", "JASSO Scholarship", "University Scholarships"],
    requirements: ["Academic transcripts", "Passport", "English or Japanese proficiency", "Statement of purpose"],
  },
  "france": {
    slug: "france",
    countryName: "France",
    flag: "🇫🇷",
    hero: {
      headline: "Study in France",
      subheadline: "Prestigious Universities • Business Schools • Cultural Excellence",
      text: "France is home to some of the world’s most prestigious universities and business schools. The country offers a wide range of English-taught programs.",
    },
    atAGlance: [
      { label: "Capital", value: "Paris" },
      { label: "Language", value: "French / English" },
      { label: "Currency", value: "Euro (€)" },
      { label: "Universities", value: "250+" },
      { label: "International Students", value: "400,000+" },
      { label: "Average Tuition", value: "€7,000 – €20,000 per year" },
      { label: "Post Study Work Visa", value: "2 years" },
    ],
    whyStudy: [
      { title: "Recognised Business Schools", description: "French Grandes Écoles frequently top global finance and management rankings." },
      { title: "Strong Engineering Programs", description: "Excellent networks of highly specialized engineering and STEM academies." },
      { title: "Cultural & Academic Excellence", description: "Hub of European arts, cuisine, humanities, and profound intellectual history." },
    ],
    popularCourses: ["Business Administration", "International Business", "Fashion Design", "Engineering", "International Relations"],
    topUniversities: ["Sorbonne University", "Université PSL", "HEC Paris", "ESCP Business School"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Undergraduate", value: "€7,000 – €12,000 per year" },
          { label: "Masters", value: "€10,000 – €20,000 per year" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "€800 – €1,300 per month" },
        ],
      },
    ],
    scholarships: ["Eiffel Excellence Scholarship", "French Government Scholarships", "University Scholarships"],
    requirements: ["Academic transcripts", "Passport", "English or French proficiency", "Statement of purpose", "Recommendation letters"],
  },
  "usa": {
    slug: "usa",
    countryName: "United States",
    flag: "🇺🇸",
    hero: {
      headline: "Study in the United States",
      subheadline: "Global Innovation • Ivy League Excellence • Unmatched Career Growth",
      text: "The US is home to the world’s most prestigious universities and offers unparalleled opportunities for research, innovation, and career development.",
    },
    atAGlance: [
      { label: "Capital", value: "Washington, D.C." },
      { label: "Language", value: "English" },
      { label: "Currency", value: "US Dollar ($)" },
      { label: "Universities", value: "4,000+" },
      { label: "International Students", value: "1,000,000+" },
      { label: "Average Tuition", value: "$20,000 – $55,000 per year" },
      { label: "Post Study Work (OPT)", value: "1 – 3 years" },
    ],
    whyStudy: [
      { title: "Academic Excellence", description: "The US hosts the largest number of top-ranked universities globally." },
      { title: "Flexible Curriculum", description: "Switch majors or customize your degree as you learn." },
      { title: "Research & Innovation", description: "Access cutting-edge technology and massive research funding." },
      { title: "Career Opportunities", description: "Optional Practical Training (OPT) allows you to work in your field after graduation." },
    ],
    popularCourses: ["Computer Science", "Business Administration", "Engineering", "Data Science", "Biotechnology", "Psychology"],
    topUniversities: ["Harvard University", "Stanford University", "MIT", "UC Berkeley", "Columbia University", "Georgia Tech"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Public Universities", value: "$20,000 – $35,000" },
          { label: "Private Universities", value: "$35,000 – $60,000" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "$1,200 – $2,500 per month" },
        ],
      },
    ],
    scholarships: ["Fulbright Program", "Hubert Humphrey Fellowship", "University Merit Scholarships", "STEM Scholarships"],
    requirements: ["Transcripts", "Standardized tests (SAT/GRE/GMAT)", "English proficiency (TOEFL/IELTS)", "Statement of Purpose", "Recommendation letters"],
  },
  "netherlands": {
    slug: "netherlands",
    countryName: "Netherlands",
    flag: "🇳🇱",
    hero: {
      headline: "Study in the Netherlands",
      subheadline: "Innovation Hub • English-Taught Programs • Exceptional Value",
      text: "Experience progressive education in a highly international and English-speaker friendly environment in the heart of Europe.",
    },
    atAGlance: [
      { label: "Capital", value: "Amsterdam" },
      { label: "Language", value: "Dutch / English" },
      { label: "Currency", value: "Euro (€)" },
      { label: "Universities", value: "50+" },
      { label: "Average Tuition", value: "€8,000 – €20,000 per year" },
      { label: "Post Study Work", value: "1 Year (Orientation Year)" },
    ],
    whyStudy: [
      { title: "English-Taught Degrees", description: "Over 2,000 programs are taught entirely in English." },
      { title: "High Quality Education", description: "Dutch higher education is consistently ranked among the world’s best." },
      { title: "International Hub", description: "Highly diverse community with students from 160+ countries." },
      { title: "Career Prospects", description: "The Orientation Year allows you to search for work in a thriving economy." },
    ],
    popularCourses: ["International Business", "Engineering", "Psychology", "Sustainable Energy", "Communication Science"],
    topUniversities: ["University of Amsterdam", "Delft University of Technology", "Utrecht University", "Erasmus University Rotterdam"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Research Universities", value: "€8,000 – €15,000" },
          { label: "Applied Sciences", value: "€7,000 – €12,000" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "€800 – €1,200 per month" },
        ],
      },
    ],
    scholarships: ["Holland Scholarship", "Orange Tulip Scholarship", "Erasmus+ Scholarships"],
    requirements: ["Transcripts", "Passport", "English proficiency", "Motivation letter", "CV"],
  },
  "poland": {
    slug: "poland",
    countryName: "Poland",
    flag: "🇵🇱",
    hero: {
      headline: "Study in Poland",
      subheadline: "Affordable European Education • Quality Medical & Tech Programs",
      text: "Poland offers high-quality education at some of the most competitive prices in the European Union.",
    },
    atAGlance: [
      { label: "Capital", value: "Warsaw" },
      { label: "Language", value: "Polish / English" },
      { label: "Currency", value: "Polish Złoty (PLN)" },
      { label: "Universities", value: "400+" },
      { label: "Average Tuition", value: "€2,000 – €5,000 per year" },
    ],
    whyStudy: [
      { title: "High Affordability", description: "Very low tuition and living costs compared to Western Europe." },
      { title: "Quality Medical Training", description: "Renowned globally for medical and dental education in English." },
      { title: "Growing Economy", description: "Strong job market for international graduates in IT and finance." },
    ],
    popularCourses: ["Medicine", "Dentistry", "Computer Science", "Engineering", "International Business"],
    topUniversities: ["University of Warsaw", "Jagiellonian University", "Warsaw University of Technology", "Medical University of Lublin"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "General Programs", value: "€2,000 – €4,000" },
          { label: "Medical Degrees", value: "€8,000 – €12,000" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "€400 – €700 per month" },
        ],
      },
    ],
    scholarships: ["Poland My First Choice Scholarship", "Stefan Banach Scholarship", "University Merit Scholarships"],
    requirements: ["Transcripts", "Passport", "English proficiency", "Medical certificate (for health courses)"],
  },
  "dubai": {
    slug: "dubai",
    countryName: "United Arab Emirates (Dubai)",
    flag: "🇦🇪",
    hero: {
      headline: "Study in the UAE",
      subheadline: "Global Business Hub • Luxury Lifestyle • Branch University Campuses",
      text: "Study at internationally recognized universities in one of the most dynamic business hubs in the world.",
    },
    atAGlance: [
      { label: "Capital", value: "Abu Dhabi" },
      { label: "Main Hub", value: "Dubai" },
      { label: "Language", value: "Arabic / English" },
      { label: "Universities", value: "60+ (Inc. Branch campuses)" },
      { label: "Average Tuition", value: "$15,000 – $30,000 per year" },
    ],
    whyStudy: [
      { title: "International Branch Campuses", description: "Obtain UK, US, or Australian degrees while living in Dubai." },
      { title: "Safe & Modern Environment", description: "Consistently ranked among the safest countries with world-class infra." },
      { title: "Networking & Growth", description: "Direct access to top global companies and startups." },
    ],
    popularCourses: ["Hospitality Management", "Business Administration", "Architecture", "Logistics", "Media"],
    topUniversities: ["Middlesex University Dubai", "Heriot-Watt Dubai", "University of Wollongong Dubai", "American University in Dubai"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Undergraduate", value: "$15,000 – $25,000" },
          { label: "Masters", value: "$20,000 – $35,000" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "$1,000 – $1,800 per month" },
        ],
      },
    ],
    scholarships: ["University Merit Scholarships", "Corporate Partnerships", "Government Sponsorships"],
    requirements: ["Transcripts", "Passport", "English proficiency", "Reference letters"],
  },
  "south-korea": {
    slug: "south-korea",
    countryName: "South Korea",
    flag: "🇰🇷",
    hero: {
      headline: "Study in South Korea",
      subheadline: "High-Tech Innovation • Rich Culture • Academic Excellence",
      text: "Explore cutting-edge technology and vibrant culture while studying at some of Asia's top-ranked universities.",
    },
    atAGlance: [
      { label: "Capital", value: "Seoul" },
      { label: "Language", value: "Korean / English" },
      { label: "Currency", value: "South Korean Won (KRW)" },
      { label: "Universities", value: "300+" },
      { label: "Average Tuition", value: "$4,000 – $10,000 per year" },
    ],
    whyStudy: [
      { title: "Cutting-Edge Technology", description: "Leader in global electronics, automotive, and robotics." },
      { title: "K-Culture Experience", description: "Immerse yourself in a globally dominant cultural wave." },
      { title: "High Research Standards", description: "Excellent facilities and deep government backing for STEM." },
    ],
    popularCourses: ["Computer Engineering", "Business & Finance", "Artificial Intelligence", "Media & Cultural Studies", "Chemistry"],
    topUniversities: ["Seoul National University", "KAIST", "Korea University", "Yonsei University"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Public Universities", value: "$4,000 – $6,000" },
          { label: "Private Universities", value: "$6,000 – $10,000" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "$800 – $1,300 per month" },
        ],
      },
    ],
    scholarships: ["Global Korea Scholarship (GKS)", "University Merit Scholarships", "Samsung Global Scholarship"],
    requirements: ["Academic transcripts", "Passport", "English/Korean test scores", "Personal statement"],
  },
  "malta": {
    slug: "malta",
    countryName: "Malta",
    flag: "🇲🇹",
    hero: {
      headline: "Study in Malta",
      subheadline: "English-Speaking EU Member • Affordable Mediterranean Living",
      text: "Study in a sun-drenched European island where English is an official language and costs are highly competitive.",
    },
    atAGlance: [
      { label: "Capital", value: "Valletta" },
      { label: "Language", value: "English / Maltese" },
      { label: "Currency", value: "Euro (€)" },
      { label: "Universities", value: "Public & Private colleges" },
      { label: "Average Tuition", value: "€6,000 – €12,000 per year" },
    ],
    whyStudy: [
      { title: "English-Speaking Environment", description: "Easy integration for international students with English as an official language." },
      { title: "Affordable European Hub", description: "Low living costs and tuition compared to mainland EU." },
      { title: "Gateway to the EU", description: "Secure an EU residency while gaining high-quality education." },
    ],
    popularCourses: ["Tourism & Hospitality", "Business Administration", "Information Technology", "Health Sciences", "Game Design"],
    topUniversities: ["University of Malta", "American University of Malta", "Global College Malta"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Average Range", value: "€6,000 – €12,000" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "€700 – €1,000 per month" },
        ],
      },
    ],
    scholarships: ["Malta Government Scholarships", "University Entrance Awards", "Erasmus+ Scholarships"],
    requirements: ["Academic transcripts", "Passport", "English proficiency", "Motivation letter"],
  },
  "turkey": {
    slug: "turkey",
    countryName: "Turkey",
    flag: "🇹🇷",
    hero: {
      headline: "Study in Turkey",
      subheadline: "East Meets West • Modern Universities • Rich History",
      text: "Experience high-quality education in a country that bridges Europe and Asia, offering incredible value and cultural depth.",
    },
    atAGlance: [
      { label: "Capital", value: "Ankara" },
      { label: "Major Hub", value: "Istanbul" },
      { label: "Language", value: "Turkish / English" },
      { label: "Currency", value: "Turkish Lira (TRY)" },
      { label: "Universities", value: "200+" },
      { label: "Average Tuition", value: "$1,000 – $8,000 per year" },
    ],
    whyStudy: [
      { title: "Modern Campus Life", description: "High-end campus facilities and modern academic infrastructure." },
      { title: "Highly Affordable", description: "One of the most cost-effective destinations for quality education." },
      { title: "Strategic Location", description: "A unique cultural and economic bridge between continents." },
    ],
    popularCourses: ["Architecture", "Medicine", "International Relations", "Computer Engineering", "Art & Design"],
    topUniversities: ["Koç University", "Sabancı University", "Middle East Technical University", "Istanbul Technical University"],
    costs: [
      {
        title: "Tuition Fees",
        items: [
          { label: "Public Unis", value: "$600 – $2,000" },
          { label: "Private Unis", value: "$5,000 – $15,000" },
        ],
      },
      {
        title: "Living Expenses",
        items: [
          { label: "Average Cost", value: "$500 – $800 per month" },
        ],
      },
    ],
    scholarships: ["Türkiye Bursları", "University Merit Scholarships", "Success Scholarships"],
    requirements: ["Transcripts", "Passport", "English proficiency", "Internal university exams (sometimes)"],
  },
};
