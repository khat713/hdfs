// All data below is transcribed directly from Khatmin Thant's research paper
// "Effects of Meditation on Student Academic Performance and Behavior" (EDUC 698)
// and the accompanying figures/tables.

export const meta = {
  title: "Effects of Meditation on Student Academic Performance & Behavior",
  shortTitle: "Meditation in the Classroom",
  author: "Khatmin Thant",
  affiliation: "University of North Carolina at Chapel Hill · School of Education",
  course: "EDUC 698 · Internship in Human Development and Family Science",
  advisor: "Dr. Kara Hume",
  date: "May 5, 2025",
  site: "Carrboro Elementary School",
};

// Pre- vs post-intervention reading scores, per student (Figure: data table).
export const grades: { id: string; pre: number; post: number }[] = [
  { id: "A", pre: 75, post: 80 },
  { id: "B", pre: 29.2, post: 20 },
  { id: "C", pre: 25, post: 70 },
  { id: "D", pre: 87.5, post: 100 },
  { id: "E", pre: 45.8, post: 80 },
  { id: "F", pre: 87.5, post: 100 },
  { id: "G", pre: 87.5, post: 70 },
  { id: "H", pre: 95.8, post: 90 },
  { id: "I", pre: 62.5, post: 60 },
  { id: "J", pre: 50, post: 80 },
  { id: "K", pre: 75, post: 90 },
  { id: "L", pre: 95.8, post: 100 },
  { id: "M", pre: 25, post: 70 },
  { id: "N", pre: 29.2, post: 30 },
  { id: "O", pre: 16.7, post: 40 },
  { id: "P", pre: 91.7, post: 100 },
  { id: "Q", pre: 66.7, post: 80 },
  { id: "R", pre: 95.8, post: 90 },
  { id: "S", pre: 33.3, post: 50 },
  { id: "T", pre: 45.8, post: 90 },
  { id: "U", pre: 91.7, post: 100 },
  { id: "V", pre: 91.7, post: 100 },
  { id: "W", pre: 62.5, post: 70 },
  { id: "X", pre: 70.8, post: 90 },
  { id: "Y", pre: 50, post: 50 },
  { id: "Z", pre: 70.8, post: 100 },
  { id: "AA", pre: 70.8, post: 80 },
  { id: "AB", pre: 41.7, post: 50 },
  { id: "AC", pre: 33.3, post: 60 },
];

export const meanPre = 62.21;
export const meanPost = 76;

// Student post-intervention survey results (Appendix). Percentages of class.
export const surveyFeelings = [
  { label: "Calm", value: 58.8 },
  { label: "Peaceful", value: 55.9 },
  { label: "Sleepy", value: 44.1 },
  { label: "Happy", value: 23.5 },
  { label: "Sad", value: 11.8 },
  { label: "Other", value: 14.6 },
];

export const surveyDonuts: {
  question: string;
  segments: { label: string; value: number; tone: "good" | "mid" | "low" }[];
}[] = [
  {
    question: "Did you like meditating?",
    segments: [
      { label: "Yes", value: 52.9, tone: "good" },
      { label: "Sometimes", value: 41.2, tone: "mid" },
      { label: "No", value: 5.9, tone: "low" },
    ],
  },
  {
    question: "Will you try meditating again?",
    segments: [
      { label: "Yes", value: 82.4, tone: "good" },
      { label: "No", value: 17.6, tone: "low" },
    ],
  },
  {
    question: "Do you think meditating helped you?",
    segments: [
      { label: "Kind of", value: 52.9, tone: "mid" },
      { label: "Yes", value: 35.3, tone: "good" },
      { label: "No", value: 11.8, tone: "low" },
    ],
  },
];

// Classroom composition (Methods · Participants).
export const participants = {
  total: 36,
  girls: 15,
  boys: 21,
  demographics: [
    { label: "White", value: 32 },
    { label: "Black", value: 2 },
    { label: "Asian", value: 2 },
  ],
};

// Real, unedited student quotes from the open-ended survey (Appendix B).
export const studentQuotes = [
  "Meditating helped me start my day.",
  "It helped me clear my mind and focus on being positive. It also helped me take a break from any worries I have.",
  "I liked meditating because it makes me forget my worries and it is quite peaceful.",
  "I enjoyed being next to my friends while meditating… it gives me a sense of peace to be so close to them.",
  "It was great!",
  "For the first question I sometimes get sad because I think of my hamster who is DEAD.",
  "Khat should graduate.",
  "I liked it but I think I would like to do it only on Mondays, Fridays, and any day we have a test.",
  "im tired but then no.",
  "It was fun.",
];

export const literature = [
  {
    authors: "French, Dickerson & Mulder",
    year: 2023,
    finding:
      "Not many of the perceived academic benefits of high-stakes testing have strong evidence to back them — reliance on these exams is “poorly justified by the balance of empirical evidence.”",
    tag: "High-stakes testing",
  },
  {
    authors: "von der Embse et al.",
    year: 2018,
    finding:
      "A 30-year meta-analysis of 238 studies: test anxiety is “significantly and negatively related to a wide range of educational performance,” from standardized tests to GPA.",
    tag: "Test anxiety",
  },
  {
    authors: "Zisopoulou & Varvogli",
    year: 2023,
    finding:
      "Stress-management techniques used by children and adolescents reduce anxiety, stress, and depressive symptoms — improving social skills and academic achievement.",
    tag: "Stress management",
  },
  {
    authors: "Müller et al.",
    year: 2021,
    finding:
      "Classroom-based short physical and mindfulness breaks support attention and reading comprehension, which are known to support overall academic success.",
    tag: "Mindfulness breaks",
  },
];

export const procedure = [
  {
    n: "01",
    title: "Pre-survey the teacher",
    body: "A Google Forms survey captured the teacher’s concerns, expectations, and confidence (4/5 on a Likert scale) before anything began.",
  },
  {
    n: "02",
    title: "Daily guided meditation",
    body: "For two weeks, every class opened with a guided meditation video before instruction — breathing, guided attention, and quiet music.",
  },
  {
    n: "03",
    title: "Practice reading assessment",
    body: "Students took a practice reading check-in mirroring last year’s second-quarter NC check-in, taken seriously but ungraded.",
  },
  {
    n: "04",
    title: "Post-surveys & resource",
    body: "Teacher and students completed post-surveys; a take-home mindfulness resource with QR codes was created for families.",
  },
];

export const references = [
  "Brown, R. (2017). Avoiding overtesting. Illuminate Education.",
  "French, S., Dickerson, A. L., & Mulder, R. A. (2023). A review of the benefits and drawbacks of high-stakes final examinations in higher education. Higher Education, 88.",
  "Müller, C., Otto, B., Sawitzki, V., Kanagalingam, P., Scherer, J.-S., & Lindberg, S. (2021). Short breaks at school. Trends in Neuroscience and Education, 25, 100160.",
  "Sotola, L. K., & Crede, M. (2020). Regarding class quizzes: a meta-analytic synthesis. Educational Psychology Review, 33.",
  "Vaessen, B. E., et al. (2016). Students’ perception of frequent assessments and its relation to motivation and grades. Assessment & Evaluation in Higher Education, 42(6).",
  "von der Embse, N., Jester, D., Roy, D., & Post, J. (2018). Test anxiety effects, predictors, and correlates: a 30-year meta-analytic review. Journal of Affective Disorders, 227(1).",
  "Zisopoulou, T., & Varvogli, L. (2022). Stress management methods in children and adolescents. Hormone Research in Paediatrics, 96(1).",
];

// Resolve asset URLs against Vite's base path.
export const asset = (p: string) => `${import.meta.env.BASE_URL}assets/${p}`;

// Live Google preview of the actual deliverables, embedded straight from Drive
// (the same approach used on alums-declassified). The files are shared publicly,
// so the iframe renders for any visitor — and, unlike the Office viewer, it works
// from localhost too.
export const drive = {
  paper: "1Hs5mQGZPr--vNZFBIsopSlhNv7h6g5IQ7brAlIvPJcc", // native Google Doc
  poster: "1gZk3Poi7wIfAlIDi9Nu2y8gthqefnOPM", // .pptx stored in Drive
};
export const googleEmbed = (id: string, kind: "doc" | "file") =>
  kind === "doc"
    ? `https://docs.google.com/document/d/${id}/preview`
    : `https://drive.google.com/file/d/${id}/preview`;
export const googleView = (id: string, kind: "doc" | "file") =>
  kind === "doc"
    ? `https://docs.google.com/document/d/${id}/view`
    : `https://drive.google.com/file/d/${id}/view`;
