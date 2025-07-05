export type User = {
  id: number;
  name: string;
  institution: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  linkedin: string;
  image: string; // Path or URL
  status: "Completed" | "In Progress" | "Not Started";
};

export const USERS: User[] = [
  {
    id: 1,
    name: "Alice Tan",
    institution: "University of XYZ",
    age: 21,
    gender: "Female",
    linkedin: "https://www.linkedin.com/in/alice-tan",
    image: "/images/AliceTan.jpg",
    status: "Completed",
  },
  {
    id: 2,
    name: "John Lee",
    institution: "ABC College",
    age: 23,
    gender: "Male",
    linkedin: "https://www.linkedin.com/in/john-lee",
    image: "/images/JohnLee.jpg",
    status: "In Progress",
  },
  {
    id: 3,
    name: "Sarah Lim",
    institution: "DEF Institute",
    age: 22,
    gender: "Female",
    linkedin: "https://www.linkedin.com/in/sarah-lim",
    image: "/images/SarahLim.jpg",
    status: "Not Started",
  },
  {
    id: 4,
    name: "Michael Tan",
    institution: "GHI University",
    age: 24,
    gender: "Male",
    linkedin: "https://www.linkedin.com/in/michael-tan",
    image: "/images/MichaelTan.jpg",
    status: "Completed",
  },
  {
    id: 5,
    name: "Emily Wong",
    institution: "JKL College",
    age: 20,
    gender: "Female",
    linkedin: "https://www.linkedin.com/in/emily-wong",
    image: "/images/EmilyWong.jpg",
    status: "In Progress",
  },
  {
    id: 6,
    name: "David Chan",
    institution: "MNO Institute",
    age: 22,
    gender: "Male",
    linkedin: "https://www.linkedin.com/in/david-chan",
    image: "/images/DavidChan.jpg",
    status: "Completed",
  },
  {
    id: 7,
    name: "Rachel Lim",
    institution: "PQR University",
    age: 21,
    gender: "Female",
    linkedin: "https://www.linkedin.com/in/rachel-lim",
    image: "/images/RachelLim.jpg",
    status: "Not Started",
  },
  {
    id: 8,
    name: "Jason Ng",
    institution: "STU College",
    age: 23,
    gender: "Male",
    linkedin: "https://www.linkedin.com/in/jason-ng",
    image: "/images/JasonNg.jpg",
    status: "Completed",
  },
  {
    id: 9,
    name: "Sophia Tan",
    institution: "VWX Institute",
    age: 22,
    gender: "Female",
    linkedin: "https://www.linkedin.com/in/sophia-tan",
    image: "/images/SophiaTan.jpg",
    status: "In Progress",
  },
  {
    id: 10,
    name: "Kevin Lee",
    institution: "YZA University",
    age: 24,
    gender: "Male",
    linkedin: "https://www.linkedin.com/in/kevin-lee",
    image: "/images/KevinLee.jpg",
    status: "Completed",
  },
];
