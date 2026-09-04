// CSE Department Comprehensive Realistic Demo Dataset
// Institution: National Institute of Technology (NIT) - CSE Department

export interface DepartmentInfo {
  code: string;
  name: string;
  shortName: string;
  college: string;
  campus: string;
  hod: {
    name: string;
    designation: string;
    qualification: string;
    email: string;
    phone: string;
    avatar: string;
  };
  building: string;
  academicYear: string;
  currentSemester: string;
  established: number;
  totalStudents: number;
  totalFaculty: number;
  avgAttendance: number;
  placementRate: number;
}

export interface FacultyMember {
  id: string;
  empId: string;
  name: string;
  designation: "Professor" | "Associate Professor" | "Assistant Professor" | "Guest Faculty";
  qualification: string;
  department: string;
  email: string;
  phone: string;
  subjects: string[];
  experienceYears: number;
  attendanceRate: number;
  status: "Active" | "On Leave" | "Sabbatical";
  avatar: string;
  officeRoom: string;
  specialization: string;
  joiningDate: string;
  publicationsCount: number;
  isSpotlight?: boolean;
  spotlightBadge?: string;
  spotlightCategory?: "month" | "attendance" | "research";
}

export interface StudentRecord {
  id: string;
  usn: string;
  name: string;
  email: string;
  phone: string;
  gender: "Male" | "Female";
  year: 1 | 2 | 3 | 4;
  semester: number;
  section: "A" | "B" | "C";
  cgpa: number;
  backlogs: number;
  attendanceRate: number;
  status: "Active" | "At Risk" | "Suspended";
  avatar: string;
  dob: string;
  parentName: string;
  parentPhone: string;
  address: string;
  placedCompany?: string;
  placedPackage?: number;
}

export interface SubjectCourse {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  type: "Theory" | "Lab" | "Elective" | "Project" | "Seminar";
  facultyName: string;
  facultyId: string;
  syllabusCompletion: number; // percentage
  enrolledStudentsCount: number;
  description: string;
}

export interface TimetableEntry {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  period: number;
  timeSlot: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  room: string;
  semester: number;
  section: "A" | "B" | "C";
  type: "Lecture" | "Lab" | "Tutorial";
}

export interface LeaveItem {
  id: string;
  applicantType: "Faculty" | "Student";
  applicantName: string;
  applicantId: string;
  applicantRoleOrUsn: string;
  avatar: string;
  leaveType: "Casual Leave" | "Medical Leave" | "On Duty" | "Academic Leave";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedDate: string;
  approverRemarks?: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: "Academic" | "Examination" | "Placement" | "Event" | "Holiday" | "Urgent";
  description: string;
  publishedBy: string;
  publishedDate: string;
  targetAudience: "All" | "Faculty" | "Students" | "3rd Year" | "4th Year";
  priority: "Normal" | "High" | "Urgent";
  attachmentName?: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: "Hackathon" | "Workshop" | "Seminar" | "FDP" | "Contest" | "Industrial Visit";
  date: string;
  time: string;
  venue: string;
  organizer: string;
  description: string;
  registrations: number;
  maxCapacity: number;
  status: "Upcoming" | "Ongoing" | "Completed";
  badgeColor: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  team: string[];
  teamUsns: string[];
  guide: string;
  domain: string;
  techStack: string;
  abstract: string;
  status: "Idea" | "Planning" | "Development" | "Testing" | "Completed";
  githubUrl: string;
  demoUrl?: string;
  progressPercent: number;
}

export interface PlacementItem {
  id: string;
  companyName: string;
  logo: string;
  role: string;
  packageLPA: number;
  location: string;
  eligibilityCgpa: number;
  maxBacklogs: number;
  deadline: string;
  driveDate: string;
  appliedCount: number;
  selectedCount: number;
  status: "Open" | "In Progress" | "Completed";
}

export interface AssignmentItem {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  dueDate: string;
  maxMarks: number;
  submittedCount: number;
  totalStudents: number;
  status: "Active" | "Grading" | "Completed";
  description: string;
}

export interface StudyMaterialItem {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  semester: number;
  module: number;
  fileType: "PDF" | "PPT" | "DOC" | "Video" | "Code";
  fileSize: string;
  facultyName: string;
  uploadDate: string;
  downloadUrl: string;
}

export const DEPARTMENT_DATA: DepartmentInfo = {
  code: "CSE",
  name: "Department of Computer Science & Engineering",
  shortName: "CSE Dept",
  college: "National Institute of Technology",
  campus: "Main Campus, Bangalore",
  hod: {
    name: "Dr. Ramesh Kumar",
    designation: "Professor & Head of Department",
    qualification: "Ph.D (IISc Bangalore), M.Tech (IIT Kharagpur)",
    email: "hod.cse@nitcampus.ac.in",
    phone: "+91 98450 12345",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  building: "Sir M. Visvesvaraya Block, 3rd Floor",
  academicYear: "2026-27",
  currentSemester: "Odd Semester (Jul - Dec 2026)",
  established: 1988,
  totalStudents: 748,
  totalFaculty: 34,
  avgAttendance: 88.4,
  placementRate: 92.6,
};

export const DEMO_FACULTY: FacultyMember[] = [
  {
    id: "fac-1",
    empId: "CSE-FAC-001",
    name: "Dr. Ramesh Kumar",
    designation: "Professor",
    qualification: "Ph.D (IISc Bangalore), B.Tech (IITK)",
    department: "Computer Science & Engineering",
    email: "ramesh.kumar@nitcampus.ac.in",
    phone: "+91 98450 12345",
    subjects: ["Artificial Intelligence", "Advanced Computer Architecture"],
    experienceYears: 21,
    attendanceRate: 98.5,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-301 (HOD Chamber)",
    specialization: "Artificial Intelligence, High Performance Computing",
    joiningDate: "2008-06-15",
    publicationsCount: 38,
    isSpotlight: true,
    spotlightBadge: "Faculty of the Month",
    spotlightCategory: "month",
  },
  {
    id: "fac-2",
    empId: "CSE-FAC-002",
    name: "Dr. Priya Sharma",
    designation: "Professor",
    qualification: "Ph.D (IIT Bombay), M.Tech (NITK)",
    department: "Computer Science & Engineering",
    email: "priya.sharma@nitcampus.ac.in",
    phone: "+91 98451 23456",
    subjects: ["Database Management Systems", "Big Data Analytics"],
    experienceYears: 18,
    attendanceRate: 99.2,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-304",
    specialization: "Distributed Databases, Data Mining",
    joiningDate: "2011-08-01",
    publicationsCount: 29,
    isSpotlight: true,
    spotlightBadge: "Highest Attendance (99.2%)",
    spotlightCategory: "attendance",
  },
  {
    id: "fac-3",
    empId: "CSE-FAC-003",
    name: "Dr. Anand K. Rao",
    designation: "Professor",
    qualification: "Ph.D (IIT Madras), PostDoc (NUS Singapore)",
    department: "Computer Science & Engineering",
    email: "anand.rao@nitcampus.ac.in",
    phone: "+91 98452 34567",
    subjects: ["Operating Systems", "Distributed Systems"],
    experienceYears: 16,
    attendanceRate: 96.8,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-308",
    specialization: "Cloud Architecture, OS Kernel Virtualization",
    joiningDate: "2014-01-10",
    publicationsCount: 42,
    isSpotlight: true,
    spotlightBadge: "Top Research Citations (42 Papers)",
    spotlightCategory: "research",
  },
  {
    id: "fac-4",
    empId: "CSE-FAC-004",
    name: "Dr. Meenakshi Sundaram",
    designation: "Associate Professor",
    qualification: "Ph.D (Anna University), M.E (College of Engg Guindy)",
    department: "Computer Science & Engineering",
    email: "meenakshi.s@nitcampus.ac.in",
    phone: "+91 98453 45678",
    subjects: ["Computer Networks", "Cryptography & Network Security"],
    experienceYears: 14,
    attendanceRate: 95.0,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-312",
    specialization: "Network Security, Wireless Sensor Networks",
    joiningDate: "2015-07-20",
    publicationsCount: 22,
  },
  {
    id: "fac-5",
    empId: "CSE-FAC-005",
    name: "Dr. Rajesh Varma",
    designation: "Associate Professor",
    qualification: "Ph.D (IIIT Hyderabad), M.Tech (NIT Trichy)",
    department: "Computer Science & Engineering",
    email: "rajesh.varma@nitcampus.ac.in",
    phone: "+91 98454 56789",
    subjects: ["Machine Learning", "Deep Neural Networks"],
    experienceYears: 12,
    attendanceRate: 94.4,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-315",
    specialization: "Natural Language Processing, Computer Vision",
    joiningDate: "2017-02-01",
    publicationsCount: 19,
  },
  {
    id: "fac-6",
    empId: "CSE-FAC-006",
    name: "Prof. Kavita Nair",
    designation: "Associate Professor",
    qualification: "M.Tech (IIT Delhi), Pursuing Ph.D",
    department: "Computer Science & Engineering",
    email: "kavita.nair@nitcampus.ac.in",
    phone: "+91 98455 67890",
    subjects: ["Software Engineering", "Object Oriented System Design"],
    experienceYears: 11,
    attendanceRate: 93.8,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-318",
    specialization: "Agile Methodologies, Software Testing",
    joiningDate: "2018-08-15",
    publicationsCount: 11,
  },
  {
    id: "fac-7",
    empId: "CSE-FAC-007",
    name: "Prof. Suresh Kulkarni",
    designation: "Assistant Professor",
    qualification: "M.Tech (IIT Roorkee), B.E (RVCE)",
    department: "Computer Science & Engineering",
    email: "suresh.kulkarni@nitcampus.ac.in",
    phone: "+91 98456 78901",
    subjects: ["Data Structures & Applications", "Algorithms Lab"],
    experienceYears: 7,
    attendanceRate: 97.0,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-320",
    specialization: "Competitive Programming, Graph Theory",
    joiningDate: "2020-01-05",
    publicationsCount: 6,
  },
  {
    id: "fac-8",
    empId: "CSE-FAC-008",
    name: "Prof. Ananya Roy",
    designation: "Assistant Professor",
    qualification: "M.Tech (NIT Rourkela)",
    department: "Computer Science & Engineering",
    email: "ananya.roy@nitcampus.ac.in",
    phone: "+91 98457 89012",
    subjects: ["Fullstack Web Technologies", "Cloud Computing"],
    experienceYears: 6,
    attendanceRate: 96.2,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-322",
    specialization: "Microservices Architecture, Next.js, Node.js",
    joiningDate: "2021-07-15",
    publicationsCount: 4,
  },
  {
    id: "fac-9",
    empId: "CSE-FAC-009",
    name: "Prof. Vikramaditya Patil",
    designation: "Assistant Professor",
    qualification: "M.Tech (IIT Guwahati)",
    department: "Computer Science & Engineering",
    email: "vikram.patil@nitcampus.ac.in",
    phone: "+91 98458 90123",
    subjects: ["Automata Theory & Compiler Design"],
    experienceYears: 8,
    attendanceRate: 94.0,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-324",
    specialization: "Formal Methods, LLVM Compilers",
    joiningDate: "2019-03-01",
    publicationsCount: 8,
  },
  {
    id: "fac-10",
    empId: "CSE-FAC-010",
    name: "Prof. Deepa Menon",
    designation: "Assistant Professor",
    qualification: "M.Tech (NIT Calicut)",
    department: "Computer Science & Engineering",
    email: "deepa.menon@nitcampus.ac.in",
    phone: "+91 98459 01234",
    subjects: ["Microcontrollers & IoT", "Embedded Systems Lab"],
    experienceYears: 5,
    attendanceRate: 95.5,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-326",
    specialization: "Edge AI, ESP32/Raspberry Pi Embedded Architectures",
    joiningDate: "2022-08-01",
    publicationsCount: 3,
  },
  {
    id: "fac-11",
    empId: "CSE-FAC-011",
    name: "Prof. Amit Deshmukh",
    designation: "Assistant Professor",
    qualification: "M.Tech (VJTI Mumbai)",
    department: "Computer Science & Engineering",
    email: "amit.deshmukh@nitcampus.ac.in",
    phone: "+91 98460 12345",
    subjects: ["Theory of Computation", "Discrete Mathematics"],
    experienceYears: 6,
    attendanceRate: 92.5,
    status: "On Leave",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-328",
    specialization: "Complexity Theory, Combinatorics",
    joiningDate: "2021-02-15",
    publicationsCount: 5,
  },
  {
    id: "fac-12",
    empId: "CSE-FAC-012",
    name: "Prof. Sneha Hegde",
    designation: "Assistant Professor",
    qualification: "M.Tech (BMSCE)",
    department: "Computer Science & Engineering",
    email: "sneha.hegde@nitcampus.ac.in",
    phone: "+91 98461 23456",
    subjects: ["Python for Data Science", "Information Security"],
    experienceYears: 4,
    attendanceRate: 98.0,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-330",
    specialization: "Cyber Threat Intelligence, Python Data Analytics",
    joiningDate: "2023-01-10",
    publicationsCount: 2,
  },
  {
    id: "fac-13",
    empId: "CSE-FAC-013",
    name: "Dr. Balaji Srinivasan",
    designation: "Guest Faculty",
    qualification: "Ph.D (Stanford), Former Principal Scientist (Microsoft Research)",
    department: "Computer Science & Engineering",
    email: "balaji.s@nitcampus.ac.in",
    phone: "+91 98462 34567",
    subjects: ["Quantum Computing", "Generative AI Systems"],
    experienceYears: 25,
    attendanceRate: 91.0,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    officeRoom: "CS-Visiting Suite",
    specialization: "Quantum Algorithms, Large Language Models",
    joiningDate: "2024-08-01",
    publicationsCount: 65,
  },
];

export const DEMO_STUDENTS: StudentRecord[] = [
  {
    id: "stu-1",
    usn: "1NT23CS001",
    name: "Aarav Sharma",
    email: "aarav.cs23@nitcampus.ac.in",
    phone: "+91 98765 01001",
    gender: "Male",
    year: 3,
    semester: 5,
    section: "A",
    cgpa: 9.42,
    backlogs: 0,
    attendanceRate: 94.5,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    dob: "2004-05-14",
    parentName: "Sunil Sharma",
    parentPhone: "+91 94480 12001",
    address: "#42, Indiranagar, Bangalore",
    placedCompany: "Google",
    placedPackage: 38.5,
  },
  {
    id: "stu-2",
    usn: "1NT23CS002",
    name: "Ananya Patel",
    email: "ananya.cs23@nitcampus.ac.in",
    phone: "+91 98765 01002",
    gender: "Female",
    year: 3,
    semester: 5,
    section: "A",
    cgpa: 9.68,
    backlogs: 0,
    attendanceRate: 98.2,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    dob: "2004-08-22",
    parentName: "Bhavesh Patel",
    parentPhone: "+91 94480 12002",
    address: "#108, HSR Layout Sector 2, Bangalore",
    placedCompany: "Microsoft",
    placedPackage: 44.0,
  },
  {
    id: "stu-3",
    usn: "1NT23CS003",
    name: "Rohan Verma",
    email: "rohan.cs23@nitcampus.ac.in",
    phone: "+91 98765 01003",
    gender: "Male",
    year: 3,
    semester: 5,
    section: "A",
    cgpa: 8.85,
    backlogs: 0,
    attendanceRate: 91.0,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    dob: "2004-03-10",
    parentName: "Dinesh Verma",
    parentPhone: "+91 94480 12003",
    address: "Koramangala 4th Block, Bangalore",
  },
  {
    id: "stu-4",
    usn: "1NT23CS004",
    name: "Diya Iyer",
    email: "diya.cs23@nitcampus.ac.in",
    phone: "+91 98765 01004",
    gender: "Female",
    year: 3,
    semester: 5,
    section: "A",
    cgpa: 9.15,
    backlogs: 0,
    attendanceRate: 92.4,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    dob: "2004-11-05",
    parentName: "Subramanian Iyer",
    parentPhone: "+91 94480 12004",
    address: "Malleshwaram 15th Cross, Bangalore",
    placedCompany: "Cisco",
    placedPackage: 24.0,
  },
  {
    id: "stu-5",
    usn: "1NT23CS005",
    name: "Siddharth Nair",
    email: "siddharth.cs23@nitcampus.ac.in",
    phone: "+91 98765 01005",
    gender: "Male",
    year: 3,
    semester: 5,
    section: "A",
    cgpa: 7.20,
    backlogs: 1,
    attendanceRate: 71.4,
    status: "At Risk",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    dob: "2004-01-19",
    parentName: "Gopinath Nair",
    parentPhone: "+91 94480 12005",
    address: "Whitefield Main Road, Bangalore",
  },
  {
    id: "stu-6",
    usn: "1NT23CS006",
    name: "Tanvi Joshi",
    email: "tanvi.cs23@nitcampus.ac.in",
    phone: "+91 98765 01006",
    gender: "Female",
    year: 3,
    semester: 5,
    section: "B",
    cgpa: 8.95,
    backlogs: 0,
    attendanceRate: 89.0,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    dob: "2004-07-30",
    parentName: "Makarand Joshi",
    parentPhone: "+91 94480 12006",
    address: "JP Nagar 7th Phase, Bangalore",
  },
  {
    id: "stu-7",
    usn: "1NT23CS007",
    name: "Vikramaditya Rao",
    email: "vikramaditya.cs23@nitcampus.ac.in",
    phone: "+91 98765 01007",
    gender: "Male",
    year: 3,
    semester: 5,
    section: "B",
    cgpa: 8.60,
    backlogs: 0,
    attendanceRate: 86.5,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    dob: "2004-09-12",
    parentName: "Narasimha Rao",
    parentPhone: "+91 94480 12007",
    address: "Basavanagudi, Bangalore",
  },
  {
    id: "stu-8",
    usn: "1NT23CS008",
    name: "Ishita Sen",
    email: "ishita.cs23@nitcampus.ac.in",
    phone: "+91 98765 01008",
    gender: "Female",
    year: 3,
    semester: 5,
    section: "B",
    cgpa: 9.30,
    backlogs: 0,
    attendanceRate: 95.0,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    dob: "2004-04-18",
    parentName: "Debashis Sen",
    parentPhone: "+91 94480 12008",
    address: "Hebbal, Bangalore",
    placedCompany: "Amazon",
    placedPackage: 32.0,
  },
  {
    id: "stu-9",
    usn: "1NT23CS009",
    name: "Aditya Hegde",
    email: "aditya.cs23@nitcampus.ac.in",
    phone: "+91 98765 01009",
    gender: "Male",
    year: 3,
    semester: 5,
    section: "C",
    cgpa: 6.85,
    backlogs: 2,
    attendanceRate: 67.8,
    status: "At Risk",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    dob: "2004-06-25",
    parentName: "Shankar Hegde",
    parentPhone: "+91 94480 12009",
    address: "Yelahanka New Town, Bangalore",
  },
  {
    id: "stu-10",
    usn: "1NT23CS010",
    name: "Sneha Reddy",
    email: "sneha.cs23@nitcampus.ac.in",
    phone: "+91 98765 01010",
    gender: "Female",
    year: 3,
    semester: 5,
    section: "C",
    cgpa: 8.78,
    backlogs: 0,
    attendanceRate: 91.5,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    dob: "2004-10-15",
    parentName: "Malla Reddy",
    parentPhone: "+91 94480 12010",
    address: "Electronic City Phase 1, Bangalore",
  },
  {
    id: "stu-11",
    usn: "1NT22CS014",
    name: "Karan Malhotra",
    email: "karan.cs22@nitcampus.ac.in",
    phone: "+91 98765 02014",
    gender: "Male",
    year: 4,
    semester: 7,
    section: "A",
    cgpa: 9.54,
    backlogs: 0,
    attendanceRate: 96.0,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    dob: "2003-02-11",
    parentName: "Rajiv Malhotra",
    parentPhone: "+91 94480 13014",
    address: "BTM Layout 2nd Stage, Bangalore",
    placedCompany: "Google",
    placedPackage: 42.0,
  },
  {
    id: "stu-12",
    usn: "1NT22CS028",
    name: "Pooja Deshmukh",
    email: "pooja.cs22@nitcampus.ac.in",
    phone: "+91 98765 02028",
    gender: "Female",
    year: 4,
    semester: 7,
    section: "B",
    cgpa: 9.10,
    backlogs: 0,
    attendanceRate: 93.2,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    dob: "2003-09-08",
    parentName: "Prakash Deshmukh",
    parentPhone: "+91 94480 13028",
    address: "Rajajinagar 1st Block, Bangalore",
    placedCompany: "Oracle",
    placedPackage: 19.5,
  },
  {
    id: "stu-13",
    usn: "1NT24CS005",
    name: "Nikhil Chawla",
    email: "nikhil.cs24@nitcampus.ac.in",
    phone: "+91 98765 03005",
    gender: "Male",
    year: 2,
    semester: 3,
    section: "A",
    cgpa: 8.90,
    backlogs: 0,
    attendanceRate: 94.0,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    dob: "2005-04-03",
    parentName: "Sanjay Chawla",
    parentPhone: "+91 94480 14005",
    address: "Kalyan Nagar, Bangalore",
  },
  {
    id: "stu-14",
    usn: "1NT24CS032",
    name: "Meera Kulkarni",
    email: "meera.cs24@nitcampus.ac.in",
    phone: "+91 98765 03032",
    gender: "Female",
    year: 2,
    semester: 3,
    section: "B",
    cgpa: 9.25,
    backlogs: 0,
    attendanceRate: 96.5,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    dob: "2005-12-14",
    parentName: "Anil Kulkarni",
    parentPhone: "+91 94480 14032",
    address: "Jayanagar 4th Block, Bangalore",
  },
  {
    id: "stu-15",
    usn: "1NT25CS011",
    name: "Arjun Venkat",
    email: "arjun.cs25@nitcampus.ac.in",
    phone: "+91 98765 04011",
    gender: "Male",
    year: 1,
    semester: 1,
    section: "A",
    cgpa: 9.05,
    backlogs: 0,
    attendanceRate: 97.0,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    dob: "2006-03-21",
    parentName: "Venkataraman S.",
    parentPhone: "+91 94480 15011",
    address: "Banashankari 3rd Stage, Bangalore",
  },
];

export const DEMO_SUBJECTS: SubjectCourse[] = [
  {
    id: "sub-1",
    code: "CS501",
    name: "Database Management Systems",
    credits: 4,
    semester: 5,
    type: "Theory",
    facultyName: "Dr. Priya Sharma",
    facultyId: "fac-2",
    syllabusCompletion: 68,
    enrolledStudentsCount: 186,
    description: "Relational algebra, SQL, normal forms, transaction ACID properties, concurrency control, and index structures.",
  },
  {
    id: "sub-2",
    code: "CS502",
    name: "Operating Systems",
    credits: 4,
    semester: 5,
    type: "Theory",
    facultyName: "Dr. Anand K. Rao",
    facultyId: "fac-3",
    syllabusCompletion: 62,
    enrolledStudentsCount: 186,
    description: "Process management, CPU scheduling, thread synchronization, deadlocks, virtual memory paging, file systems.",
  },
  {
    id: "sub-3",
    code: "CS503",
    name: "Computer Networks",
    credits: 4,
    semester: 5,
    type: "Theory",
    facultyName: "Dr. Meenakshi Sundaram",
    facultyId: "fac-4",
    syllabusCompletion: 74,
    enrolledStudentsCount: 186,
    description: "OSI and TCP/IP stack, routing protocols, flow & error control, transport protocols (TCP/UDP), application layer DNS/HTTP.",
  },
  {
    id: "sub-4",
    code: "CS504",
    name: "Automata Theory & Compiler Design",
    credits: 4,
    semester: 5,
    type: "Theory",
    facultyName: "Prof. Vikramaditya Patil",
    facultyId: "fac-9",
    syllabusCompletion: 55,
    enrolledStudentsCount: 186,
    description: "DFA/NFA, context-free grammars, lexical analysis, LL/LR parsing, intermediate representation code generation.",
  },
  {
    id: "sub-5",
    code: "CS505L",
    name: "DBMS & Networks Laboratory",
    credits: 2,
    semester: 5,
    type: "Lab",
    facultyName: "Prof. Ananya Roy",
    facultyId: "fac-8",
    syllabusCompletion: 80,
    enrolledStudentsCount: 186,
    description: "Hands-on SQL schema design, stored procedures, triggers, socket programming in C, Wireshark packet capture.",
  },
  {
    id: "sub-6",
    code: "CS701",
    name: "Artificial Intelligence & Expert Systems",
    credits: 4,
    semester: 7,
    type: "Theory",
    facultyName: "Dr. Ramesh Kumar",
    facultyId: "fac-1",
    syllabusCompletion: 70,
    enrolledStudentsCount: 172,
    description: "Heuristic search, A*, Minimax alpha-beta pruning, knowledge graphs, Bayesian inference, propositional logic.",
  },
  {
    id: "sub-7",
    code: "CS702",
    name: "Machine Learning & Deep Neural Nets",
    credits: 4,
    semester: 7,
    type: "Theory",
    facultyName: "Dr. Rajesh Varma",
    facultyId: "fac-5",
    syllabusCompletion: 65,
    enrolledStudentsCount: 172,
    description: "Supervised & unsupervised learning, gradient descent, CNNs, Transformers, attention mechanisms, PyTorch pipelines.",
  },
  {
    id: "sub-8",
    code: "CS301",
    name: "Data Structures & Applications",
    credits: 4,
    semester: 3,
    type: "Theory",
    facultyName: "Prof. Suresh Kulkarni",
    facultyId: "fac-7",
    syllabusCompletion: 60,
    enrolledStudentsCount: 194,
    description: "Arrays, stacks, queues, linked lists, AVL trees, B-trees, hashing, graph traversals (BFS/DFS), heaps.",
  },
];

export const DEMO_TIMETABLE: TimetableEntry[] = [
  // Monday
  { id: "tt-1", day: "Monday", period: 1, timeSlot: "09:00 AM - 10:00 AM", subjectCode: "CS501", subjectName: "DBMS", facultyName: "Dr. Priya Sharma", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-2", day: "Monday", period: 2, timeSlot: "10:00 AM - 11:00 AM", subjectCode: "CS502", subjectName: "Operating Systems", facultyName: "Dr. Anand K. Rao", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-3", day: "Monday", period: 3, timeSlot: "11:15 AM - 12:15 PM", subjectCode: "CS503", subjectName: "Computer Networks", facultyName: "Dr. Meenakshi S.", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-4", day: "Monday", period: 4, timeSlot: "01:15 PM - 02:15 PM", subjectCode: "CS504", subjectName: "Automata & Compilers", facultyName: "Prof. Vikram Patil", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-5", day: "Monday", period: 5, timeSlot: "02:15 PM - 04:15 PM", subjectCode: "CS505L", subjectName: "DBMS & OS Lab (Batch 1)", facultyName: "Prof. Ananya Roy", room: "Lab-3", semester: 5, section: "A", type: "Lab" },

  // Tuesday
  { id: "tt-6", day: "Tuesday", period: 1, timeSlot: "09:00 AM - 10:00 AM", subjectCode: "CS503", subjectName: "Computer Networks", facultyName: "Dr. Meenakshi S.", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-7", day: "Tuesday", period: 2, timeSlot: "10:00 AM - 11:00 AM", subjectCode: "CS501", subjectName: "DBMS", facultyName: "Dr. Priya Sharma", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-8", day: "Tuesday", period: 3, timeSlot: "11:15 AM - 12:15 PM", subjectCode: "CS504", subjectName: "Automata & Compilers", facultyName: "Prof. Vikram Patil", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-9", day: "Tuesday", period: 4, timeSlot: "01:15 PM - 02:15 PM", subjectCode: "CS502", subjectName: "Operating Systems", facultyName: "Dr. Anand K. Rao", room: "CS-201", semester: 5, section: "A", type: "Lecture" },

  // Wednesday
  { id: "tt-10", day: "Wednesday", period: 1, timeSlot: "09:00 AM - 10:00 AM", subjectCode: "CS502", subjectName: "Operating Systems", facultyName: "Dr. Anand K. Rao", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-11", day: "Wednesday", period: 2, timeSlot: "10:00 AM - 11:00 AM", subjectCode: "CS504", subjectName: "Automata & Compilers", facultyName: "Prof. Vikram Patil", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-12", day: "Wednesday", period: 3, timeSlot: "11:15 AM - 12:15 PM", subjectCode: "CS501", subjectName: "DBMS", facultyName: "Dr. Priya Sharma", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-13", day: "Wednesday", period: 4, timeSlot: "01:15 PM - 03:15 PM", subjectCode: "CS505L", subjectName: "Networks Lab (Batch 2)", facultyName: "Prof. Suresh K.", room: "Lab-2", semester: 5, section: "A", type: "Lab" },

  // Thursday
  { id: "tt-14", day: "Thursday", period: 1, timeSlot: "09:00 AM - 10:00 AM", subjectCode: "CS501", subjectName: "DBMS", facultyName: "Dr. Priya Sharma", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-15", day: "Thursday", period: 2, timeSlot: "10:00 AM - 11:00 AM", subjectCode: "CS503", subjectName: "Computer Networks", facultyName: "Dr. Meenakshi S.", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-16", day: "Thursday", period: 3, timeSlot: "11:15 AM - 12:15 PM", subjectCode: "CS502", subjectName: "Operating Systems", facultyName: "Dr. Anand K. Rao", room: "CS-201", semester: 5, section: "A", type: "Lecture" },

  // Friday
  { id: "tt-17", day: "Friday", period: 1, timeSlot: "09:00 AM - 10:00 AM", subjectCode: "CS504", subjectName: "Automata & Compilers", facultyName: "Prof. Vikram Patil", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-18", day: "Friday", period: 2, timeSlot: "10:00 AM - 11:00 AM", subjectCode: "CS503", subjectName: "Computer Networks", facultyName: "Dr. Meenakshi S.", room: "CS-201", semester: 5, section: "A", type: "Lecture" },
  { id: "tt-19", day: "Friday", period: 3, timeSlot: "11:15 AM - 12:15 PM", subjectCode: "CS501", subjectName: "DBMS Tutorial", facultyName: "Dr. Priya Sharma", room: "CS-201", semester: 5, section: "A", type: "Tutorial" },
];

export const DEMO_LEAVES: LeaveItem[] = [
  {
    id: "lv-1",
    applicantType: "Faculty",
    applicantName: "Prof. Amit Deshmukh",
    applicantId: "fac-11",
    applicantRoleOrUsn: "Assistant Professor",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    leaveType: "Academic Leave",
    startDate: "2026-09-08",
    endDate: "2026-09-12",
    days: 5,
    reason: "Presenting research paper at IEEE International Conference on Formal Methods, Singapore.",
    status: "Pending",
    appliedDate: "2026-09-02",
  },
  {
    id: "lv-2",
    applicantType: "Faculty",
    applicantName: "Prof. Kavita Nair",
    applicantId: "fac-6",
    applicantRoleOrUsn: "Associate Professor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    leaveType: "Medical Leave",
    startDate: "2026-09-05",
    endDate: "2026-09-06",
    days: 2,
    reason: "Acute viral fever with medical certificate enclosed.",
    status: "Pending",
    appliedDate: "2026-09-03",
  },
  {
    id: "lv-3",
    applicantType: "Student",
    applicantName: "Siddharth Nair",
    applicantId: "stu-5",
    applicantRoleOrUsn: "1NT23CS005 (Sem 5A)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    leaveType: "On Duty",
    startDate: "2026-09-10",
    endDate: "2026-09-11",
    days: 2,
    reason: "Participating in Inter-NIT National Basketball Championship at NIT Surathkal.",
    status: "Approved",
    appliedDate: "2026-08-30",
    approverRemarks: "Approved by HOD. Sports OD sanctioned.",
  },
  {
    id: "lv-4",
    applicantType: "Student",
    applicantName: "Tanvi Joshi",
    applicantId: "stu-6",
    applicantRoleOrUsn: "1NT23CS006 (Sem 5B)",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    leaveType: "Casual Leave",
    startDate: "2026-09-15",
    endDate: "2026-09-16",
    days: 2,
    reason: "Family wedding in Pune.",
    status: "Pending",
    appliedDate: "2026-09-03",
  },
  {
    id: "lv-5",
    applicantType: "Faculty",
    applicantName: "Dr. Rajesh Varma",
    applicantId: "fac-5",
    applicantRoleOrUsn: "Associate Professor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    leaveType: "On Duty",
    startDate: "2026-08-28",
    endDate: "2026-08-29",
    days: 2,
    reason: "External PhD examiner duty at NIT Calicut.",
    status: "Approved",
    appliedDate: "2026-08-20",
    approverRemarks: "Duty sanctioned. Classes compensated by Prof. Deepa.",
  },
];

export const DEMO_NOTICES: NoticeItem[] = [
  {
    id: "not-1",
    title: "Schedule for Continuous Internal Evaluation 1 (CIE-1) - Odd Sem 2026",
    category: "Examination",
    description: "The first internal assessment (CIE-1) for 3rd, 5th, and 7th Semester B.Tech CSE will commence from September 22, 2026. Hall tickets and seating arrangements will be published on the portal 3 days prior. Maximum marks: 50, Duration: 90 Minutes.",
    publishedBy: "Dean (Academic) & HOD CSE",
    publishedDate: "2026-09-02",
    targetAudience: "All",
    priority: "Urgent",
    attachmentName: "CIE1_TimeTable_Sep2026.pdf",
  },
  {
    id: "not-2",
    title: "Google India On-Campus Placement Drive 2027 Batch (SDE-1)",
    category: "Placement",
    description: "Google University Programs team is visiting NIT campus on October 4, 2026 for 2027 graduating batch. Eligible: CSE & ISE students with CGPA >= 8.5 and 0 active backlogs. Compensation: ₹38.5 LPA CTC. Register on placement portal before Sept 15.",
    publishedBy: "Department Placement Coordinator",
    publishedDate: "2026-09-03",
    targetAudience: "4th Year",
    priority: "High",
    attachmentName: "Google_SDE1_JobProfile.pdf",
  },
  {
    id: "not-3",
    title: "Annual National Hackathon: HackNIT 2026 Registrations Open",
    category: "Event",
    description: "Department of CSE in association with ACM & IEEE Student Chapters is hosting HackNIT 2026 (36-hour offline hackathon) with prize pool of ₹3,00,000. Themes: Agentic AI, Web3, Smart Cities, HealthTech.",
    publishedBy: "ACM Student Chapter & HOD Office",
    publishedDate: "2026-09-01",
    targetAudience: "All",
    priority: "Normal",
  },
  {
    id: "not-4",
    title: "Faculty Development Program (FDP) on Generative AI & LLM Systems",
    category: "Academic",
    description: "One-week AICTE-ATAL sponsored FDP for faculty and research scholars from October 12 to 17, 2026. Resource persons from NVIDIA, Microsoft Research, and IISc Bangalore.",
    publishedBy: "Dr. Ramesh Kumar (HOD - CSE)",
    publishedDate: "2026-08-31",
    targetAudience: "Faculty",
    priority: "High",
  },
];

export const DEMO_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "HackNIT 2026: 36-Hour National Hackathon",
    type: "Hackathon",
    date: "2026-09-26 - 2026-09-27",
    time: "09:00 AM onwards",
    venue: "CSE Central Computing Lab & Auditorium",
    organizer: "CSE ACM & IEEE Chapters",
    description: "Inter-college premier hackathon featuring tracks on Autonomous Agents, Healthcare AI, Distributed Ledger, and Green Tech.",
    registrations: 148,
    maxCapacity: 200,
    status: "Upcoming",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    id: "evt-2",
    title: "Hands-on Workshop: Kubernetes & Production Cloud Deployments",
    type: "Workshop",
    date: "2026-09-18",
    time: "02:00 PM - 05:30 PM",
    venue: "Lab-4 (Cloud Center of Excellence)",
    organizer: "Prof. Ananya Roy & DevOps Club",
    description: "Live cluster provisioning, Helm charts, CI/CD pipelines, and zero-downtime canary rollouts on AWS EKS.",
    registrations: 60,
    maxCapacity: 60,
    status: "Upcoming",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "evt-3",
    title: "Guest Lecture: Building Scalable Vector Databases for Agentic Workflows",
    type: "Seminar",
    date: "2026-09-15",
    time: "11:00 AM - 01:00 PM",
    venue: "Visvesvaraya Seminar Hall",
    organizer: "Dr. Priya Sharma",
    description: "Distinguished speaker: Mr. S. Ramanathan, Principal Architect at Pinecone / ex-Google Cloud.",
    registrations: 110,
    maxCapacity: 150,
    status: "Upcoming",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
  },
];

export const DEMO_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Autonomous Drone Swarm Navigation with Distributed Reinforcement Learning",
    team: ["Karan Malhotra", "Aarav Sharma", "Rohan Verma"],
    teamUsns: ["1NT22CS014", "1NT23CS001", "1NT23CS003"],
    guide: "Dr. Ramesh Kumar (Professor & HOD)",
    domain: "Artificial Intelligence & Robotics",
    techStack: "Python, PyTorch, ROS2, Gazebo, OpenCV",
    abstract: "Decentralized obstacle avoidance and multi-agent payload delivery system using Proximal Policy Optimization (PPO) running on low-power edge GPUs.",
    status: "Development",
    githubUrl: "https://github.com/nit-cse/drone-swarm-rl",
    demoUrl: "https://drones.nitcampus.ac.in",
    progressPercent: 78,
  },
  {
    id: "proj-2",
    title: "VeriDegree: Tamper-Proof Academic Credential Verification on Ethereum",
    team: ["Ananya Patel", "Diya Iyer", "Tanvi Joshi"],
    teamUsns: ["1NT23CS002", "1NT23CS004", "1NT23CS006"],
    guide: "Dr. Meenakshi Sundaram",
    domain: "Web3 & Blockchain",
    techStack: "Solidity, Next.js, IPFS, Ethers.js, Tailwind CSS",
    abstract: "Zero-knowledge proof enabled verifiable credentials for degree certificates and transcripts, preventing resume fraud with instant QR verification.",
    status: "Testing",
    githubUrl: "https://github.com/nit-cse/veridegree",
    demoUrl: "https://veridegree.nitcampus.ac.in",
    progressPercent: 92,
  },
  {
    id: "proj-3",
    title: "Real-Time AI Glaucoma & Retinopathy Screening for Rural Health Centers",
    team: ["Pooja Deshmukh", "Vikramaditya Rao", "Ishita Sen"],
    teamUsns: ["1NT22CS028", "1NT23CS007", "1NT23CS008"],
    guide: "Dr. Rajesh Varma",
    domain: "Healthcare AI / Computer Vision",
    techStack: "FastAPI, TensorFlow Lite, React Native, MobileNetV3",
    abstract: "Offline-first mobile screening tool analyzing fundus photography with 96.4% sensitivity, providing instant triage recommendations for peripheral health clinics.",
    status: "Completed",
    githubUrl: "https://github.com/nit-cse/retina-ai-triage",
    demoUrl: "https://retina-demo.nitcampus.ac.in",
    progressPercent: 100,
  },
];

export const DEMO_PLACEMENTS: PlacementItem[] = [
  {
    id: "plc-1",
    companyName: "Google",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80&auto=format&fit=crop&q=80",
    role: "Software Development Engineer (SDE-1)",
    packageLPA: 38.5,
    location: "Bengaluru / Hyderabad",
    eligibilityCgpa: 8.5,
    maxBacklogs: 0,
    deadline: "2026-09-15",
    driveDate: "2026-10-04",
    appliedCount: 94,
    selectedCount: 6,
    status: "Open",
  },
  {
    id: "plc-2",
    companyName: "Microsoft",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&auto=format&fit=crop&q=80",
    role: "Software Engineer - Azure Core",
    packageLPA: 44.0,
    location: "Bengaluru / Noida",
    eligibilityCgpa: 8.0,
    maxBacklogs: 0,
    deadline: "2026-09-20",
    driveDate: "2026-10-10",
    appliedCount: 112,
    selectedCount: 8,
    status: "Open",
  },
  {
    id: "plc-3",
    companyName: "Cisco Systems",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&auto=format&fit=crop&q=80",
    role: "Network Software Engineer",
    packageLPA: 24.0,
    location: "Bengaluru",
    eligibilityCgpa: 7.5,
    maxBacklogs: 0,
    deadline: "2026-09-12",
    driveDate: "2026-09-28",
    appliedCount: 135,
    selectedCount: 14,
    status: "In Progress",
  },
  {
    id: "plc-4",
    companyName: "Amazon Web Services (AWS)",
    logo: "https://images.unsplash.com/photo-1523474255658-4af61b1c5d56?w=80&auto=format&fit=crop&q=80",
    role: "Cloud Support Associate & SDE",
    packageLPA: 32.0,
    location: "Bengaluru / Chennai",
    eligibilityCgpa: 7.8,
    maxBacklogs: 0,
    deadline: "2026-09-25",
    driveDate: "2026-10-16",
    appliedCount: 120,
    selectedCount: 10,
    status: "Open",
  },
];

export const DEMO_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: "asg-1",
    title: "Assignment 2: B+ Tree Index Implementation & Query Optimizer Analysis",
    subjectCode: "CS501",
    subjectName: "Database Management Systems",
    facultyName: "Dr. Priya Sharma",
    dueDate: "2026-09-16",
    maxMarks: 20,
    submittedCount: 54,
    totalStudents: 62,
    status: "Active",
    description: "Design and implement in C++ or Java an in-memory B+ Tree with insertion, deletion, and range scan capabilities. Analyze explain plans on 100k records.",
  },
  {
    id: "asg-2",
    title: "Lab Assignment 3: Multi-Threaded UNIX Shell Simulation with Piping & Redirection",
    subjectCode: "CS502",
    subjectName: "Operating Systems",
    facultyName: "Dr. Anand K. Rao",
    dueDate: "2026-09-14",
    maxMarks: 25,
    submittedCount: 58,
    totalStudents: 62,
    status: "Active",
    description: "Write a mini POSIX shell in C implementing fork(), execvp(), dup2() for pipelines (cmd1 | cmd2) and file I/O redirection (<, >).",
  },
  {
    id: "asg-3",
    title: "Assignment 1: Lexical Analyzer & LR(1) Parsing Table Generator",
    subjectCode: "CS504",
    subjectName: "Automata & Compilers",
    facultyName: "Prof. Vikram Patil",
    dueDate: "2026-09-20",
    maxMarks: 20,
    submittedCount: 22,
    totalStudents: 62,
    status: "Active",
    description: "Construct canonical collection of LR(1) items for arithmetic grammar and identify shift/reduce conflicts.",
  },
];

export const DEMO_MATERIALS: StudyMaterialItem[] = [
  {
    id: "mat-1",
    title: "Module 3: Transaction Processing, Serializability & Concurrency Control",
    subjectCode: "CS501",
    subjectName: "DBMS",
    semester: 5,
    module: 3,
    fileType: "PDF",
    fileSize: "4.8 MB",
    facultyName: "Dr. Priya Sharma",
    uploadDate: "2026-08-28",
    downloadUrl: "#",
  },
  {
    id: "mat-2",
    title: "Module 2: CPU Scheduling Algorithms & Deadlock Avoidance (Banker's Algorithm)",
    subjectCode: "CS502",
    subjectName: "Operating Systems",
    semester: 5,
    module: 2,
    fileType: "PPT",
    fileSize: "6.2 MB",
    facultyName: "Dr. Anand K. Rao",
    uploadDate: "2026-08-25",
    downloadUrl: "#",
  },
  {
    id: "mat-3",
    title: "Module 4: Transport Layer Protocols (TCP Sliding Window & Congestion Control)",
    subjectCode: "CS503",
    subjectName: "Computer Networks",
    semester: 5,
    module: 4,
    fileType: "PDF",
    fileSize: "3.5 MB",
    facultyName: "Dr. Meenakshi S.",
    uploadDate: "2026-09-01",
    downloadUrl: "#",
  },
  {
    id: "mat-4",
    title: "Lab Manual: Socket Programming in C & Network Protocol Analysis",
    subjectCode: "CS505L",
    subjectName: "DBMS & Networks Lab",
    semester: 5,
    module: 1,
    fileType: "PDF",
    fileSize: "2.1 MB",
    facultyName: "Prof. Ananya Roy",
    uploadDate: "2026-08-18",
    downloadUrl: "#",
  },
];

export const DEMO_NOTIFICATIONS = [
  {
    id: "ntf-1",
    title: "Leave Application Received",
    message: "Prof. Amit Deshmukh submitted an Academic Leave request for IEEE Singapore (5 days).",
    time: "10 minutes ago",
    type: "leave",
    unread: true,
  },
  {
    id: "ntf-2",
    title: "New Placement Drive Added",
    message: "Google India SDE-1 drive opened for 2027 batch. 94 students eligible.",
    time: "1 hour ago",
    type: "placement",
    unread: true,
  },
  {
    id: "ntf-3",
    title: "Attendance Shortage Alert",
    message: "5 students in 5th Semester Section C have fallen below 75% threshold.",
    time: "3 hours ago",
    type: "attendance",
    unread: false,
  },
  {
    id: "ntf-4",
    title: "CIE-1 Timetable Published",
    message: "Continuous Internal Evaluation 1 timetable has been notified to all semesters.",
    time: "Yesterday",
    type: "exam",
    unread: false,
  },
];

// =================== EXTENDED COLLEGE MODULES DATA ===================

export interface FeeRecord {
  id: string;
  studentName: string;
  usn: string;
  semester: number;
  academicYear: string;
  totalFee: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: string;
  status: "Paid" | "Partial" | "Pending" | "Overdue";
  receiptNo?: string;
  paymentDate?: string;
}

export const DEMO_FEES: FeeRecord[] = [
  {
    id: "fee-1",
    studentName: "Aarav Sharma",
    usn: "1NT23CS001",
    semester: 5,
    academicYear: "2026-27",
    totalFee: 125000,
    paidAmount: 125000,
    pendingAmount: 0,
    dueDate: "2026-08-31",
    status: "Paid",
    receiptNo: "NIT-CSE-REC-2026-0891",
    paymentDate: "2026-08-15",
  },
  {
    id: "fee-2",
    studentName: "Diya Nair",
    usn: "1NT23CS002",
    semester: 5,
    academicYear: "2026-27",
    totalFee: 125000,
    paidAmount: 75000,
    pendingAmount: 50000,
    dueDate: "2026-09-30",
    status: "Partial",
    receiptNo: "NIT-CSE-REC-2026-0942",
    paymentDate: "2026-08-20",
  },
  {
    id: "fee-3",
    studentName: "Rohan Verma",
    usn: "1NT23CS003",
    semester: 5,
    academicYear: "2026-27",
    totalFee: 125000,
    paidAmount: 0,
    pendingAmount: 125000,
    dueDate: "2026-09-15",
    status: "Pending",
  },
  {
    id: "fee-4",
    studentName: "Ananya Iyer",
    usn: "1NT23CS004",
    semester: 5,
    academicYear: "2026-27",
    totalFee: 125000,
    paidAmount: 125000,
    pendingAmount: 0,
    dueDate: "2026-08-31",
    status: "Paid",
    receiptNo: "NIT-CSE-REC-2026-0774",
    paymentDate: "2026-08-10",
  },
  {
    id: "fee-5",
    studentName: "Vikram Malhotra",
    usn: "1NT23CS005",
    semester: 5,
    academicYear: "2026-27",
    totalFee: 125000,
    paidAmount: 0,
    pendingAmount: 125000,
    dueDate: "2026-08-25",
    status: "Overdue",
  },
];

export interface AdmissionApplicant {
  id: string;
  appNumber: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  entranceExam: string;
  rank: number;
  category: string;
  status: "Applied" | "Under Review" | "Approved" | "Admitted" | "Rejected";
  admissionYear: string;
  applicationDate: string;
}

export const DEMO_ADMISSIONS: AdmissionApplicant[] = [
  {
    id: "adm-1",
    appNumber: "NIT-CSE-2026-0104",
    fullName: "Kavya Sunder",
    email: "kavya.sunder@gmail.com",
    phone: "+91 98450 11223",
    program: "B.Tech Computer Science & Engineering",
    entranceExam: "JEE Main / State CET",
    rank: 1420,
    category: "General / Merit",
    status: "Admitted",
    admissionYear: "2026-27",
    applicationDate: "2026-07-12",
  },
  {
    id: "adm-2",
    appNumber: "NIT-CSE-2026-0188",
    fullName: "Nikhil Joshi",
    email: "nikhil.j@outlook.com",
    phone: "+91 97312 44556",
    program: "B.Tech Computer Science & Engineering",
    entranceExam: "JEE Main / State CET",
    rank: 2180,
    category: "OBC",
    status: "Approved",
    admissionYear: "2026-27",
    applicationDate: "2026-07-20",
  },
  {
    id: "adm-3",
    appNumber: "NIT-CSE-2026-0245",
    fullName: "Tanvi Saxena",
    email: "tanvi.saxena@gmail.com",
    phone: "+91 99001 88990",
    program: "B.Tech CSE (AI & Machine Learning)",
    entranceExam: "JEE Main",
    rank: 3105,
    category: "General",
    status: "Under Review",
    admissionYear: "2026-27",
    applicationDate: "2026-08-02",
  },
  {
    id: "adm-4",
    appNumber: "NIT-CSE-2026-0312",
    fullName: "Farhan Qureshi",
    email: "farhan.q@yahoo.com",
    phone: "+91 94480 33445",
    program: "B.Tech Computer Science & Engineering",
    entranceExam: "State CET",
    rank: 4520,
    category: "General",
    status: "Applied",
    admissionYear: "2026-27",
    applicationDate: "2026-08-15",
  },
];

export interface StudentResult {
  id: string;
  semester: number;
  subjectCode: string;
  subjectName: string;
  credits: number;
  cieMarks: number; // Max 50
  seeMarks: number; // Max 50
  totalMarks: number; // Max 100
  grade: "S" | "A" | "B" | "C" | "D" | "E" | "F";
  gradePoints: number;
}

export const DEMO_STUDENT_RESULTS: StudentResult[] = [
  {
    id: "res-1",
    semester: 4,
    subjectCode: "CS401",
    subjectName: "Design & Analysis of Algorithms",
    credits: 4,
    cieMarks: 46,
    seeMarks: 44,
    totalMarks: 90,
    grade: "S",
    gradePoints: 10,
  },
  {
    id: "res-2",
    semester: 4,
    subjectCode: "CS402",
    subjectName: "Operating Systems Principles",
    credits: 4,
    cieMarks: 42,
    seeMarks: 43,
    totalMarks: 85,
    grade: "A",
    gradePoints: 9,
  },
  {
    id: "res-3",
    semester: 4,
    subjectCode: "CS403",
    subjectName: "Microcontrollers & Embedded Systems",
    credits: 3,
    cieMarks: 40,
    seeMarks: 41,
    totalMarks: 81,
    grade: "A",
    gradePoints: 9,
  },
  {
    id: "res-4",
    semester: 4,
    subjectCode: "CS404",
    subjectName: "Discrete Mathematical Structures",
    credits: 4,
    cieMarks: 48,
    seeMarks: 46,
    totalMarks: 94,
    grade: "S",
    gradePoints: 10,
  },
  {
    id: "res-5",
    semester: 4,
    subjectCode: "CS405L",
    subjectName: "Algorithms & OS Laboratory",
    credits: 2,
    cieMarks: 47,
    seeMarks: 48,
    totalMarks: 95,
    grade: "S",
    gradePoints: 10,
  },
];

export interface FacultyWorkloadItem {
  id: string;
  facultyName: string;
  empId: string;
  designation: string;
  subjects: string[];
  sections: string[];
  weeklyHours: number;
  assignedClasses: number;
  availableHours: number;
  status: "Underloaded" | "Balanced" | "Overloaded";
}

export const DEMO_FACULTY_WORKLOAD: FacultyWorkloadItem[] = [
  {
    id: "fw-1",
    facultyName: "Dr. Ramesh Kumar",
    empId: "CSE-FAC-001",
    designation: "Professor & HOD",
    subjects: ["CS701: High Performance Computing"],
    sections: ["7th Sem A"],
    weeklyHours: 8,
    assignedClasses: 4,
    availableHours: 4,
    status: "Balanced",
  },
  {
    id: "fw-2",
    facultyName: "Dr. Priya Sharma",
    empId: "CSE-FAC-002",
    designation: "Associate Professor",
    subjects: ["CS501: Database Management Systems", "CS505L: DBMS Lab"],
    sections: ["5th Sem A", "5th Sem B"],
    weeklyHours: 16,
    assignedClasses: 8,
    availableHours: 0,
    status: "Balanced",
  },
  {
    id: "fw-3",
    facultyName: "Prof. Amit Deshmukh",
    empId: "CSE-FAC-003",
    designation: "Assistant Professor",
    subjects: ["CS503: Computer Networks", "CS702: Cloud Architecture"],
    sections: ["5th Sem A", "7th Sem B"],
    weeklyHours: 20,
    assignedClasses: 10,
    availableHours: -2,
    status: "Overloaded",
  },
  {
    id: "fw-4",
    facultyName: "Prof. Ananya Roy",
    empId: "CSE-FAC-004",
    designation: "Assistant Professor",
    subjects: ["CS301: Data Structures", "CS505L: Networks Lab"],
    sections: ["3rd Sem B", "5th Sem A"],
    weeklyHours: 14,
    assignedClasses: 7,
    availableHours: 2,
    status: "Balanced",
  },
  {
    id: "fw-5",
    facultyName: "Prof. Rajesh Kulkarni",
    empId: "CSE-FAC-005",
    designation: "Guest Faculty",
    subjects: ["CS603: DevOps & Containerization"],
    sections: ["6th Sem A"],
    weeklyHours: 6,
    assignedClasses: 3,
    availableHours: 6,
    status: "Underloaded",
  },
];

export interface MentoringRecord {
  id: string;
  studentName: string;
  usn: string;
  semester: number;
  section: string;
  attendance: number;
  cgpa: number;
  backlogs: number;
  riskLevel: "Low" | "Moderate" | "High";
  lastMeetingDate: string;
  notes: string;
  mentorName: string;
}

export const DEMO_MENTORING: MentoringRecord[] = [
  {
    id: "men-1",
    studentName: "Aarav Sharma",
    usn: "1NT23CS001",
    semester: 5,
    section: "A",
    attendance: 86.4,
    cgpa: 8.92,
    backlogs: 0,
    riskLevel: "Low",
    lastMeetingDate: "2026-08-28",
    notes: "Consistently excels in algorithmic problem-solving. Preparing for Google placement drive.",
    mentorName: "Dr. Priya Sharma",
  },
  {
    id: "men-2",
    studentName: "Diya Nair",
    usn: "1NT23CS002",
    semester: 5,
    section: "A",
    attendance: 79.2,
    cgpa: 8.45,
    backlogs: 0,
    riskLevel: "Low",
    lastMeetingDate: "2026-08-25",
    notes: "Active in IEEE student branch. Advised to maintain focus on DBMS internals.",
    mentorName: "Dr. Priya Sharma",
  },
  {
    id: "men-3",
    studentName: "Rohan Verma",
    usn: "1NT23CS003",
    semester: 5,
    section: "A",
    attendance: 71.8,
    cgpa: 6.84,
    backlogs: 1,
    riskLevel: "Moderate",
    lastMeetingDate: "2026-08-30",
    notes: "Attendance shortage warning issued for CS502 (Operating Systems). Remedy classes scheduled.",
    mentorName: "Dr. Priya Sharma",
  },
  {
    id: "men-4",
    studentName: "Vikram Malhotra",
    usn: "1NT23CS005",
    semester: 5,
    section: "B",
    attendance: 64.2,
    cgpa: 5.92,
    backlogs: 3,
    riskLevel: "High",
    lastMeetingDate: "2026-09-01",
    notes: "Severe attendance shortage (<65%) and multiple backlogs. Parents notified for counseling.",
    mentorName: "Prof. Amit Deshmukh",
  },
];

export interface DocumentItem {
  id: string;
  title: string;
  category: "Student Services" | "Curriculum" | "Accreditation" | "Department Notice" | "Certificates";
  format: "PDF" | "DOCX" | "ZIP";
  size: string;
  uploadedBy: string;
  date: string;
  isPublic: boolean;
  downloadUrl: string;
}

export const DEMO_DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-1",
    title: "Official Student Bonafide Certificate Application Form",
    category: "Student Services",
    format: "PDF",
    size: "245 KB",
    uploadedBy: "Academic Office",
    date: "2026-08-01",
    isPublic: true,
    downloadUrl: "#",
  },
  {
    id: "doc-2",
    title: "B.Tech CSE Scheme & Syllabus 2026-27 (Semesters 1-8)",
    category: "Curriculum",
    format: "PDF",
    size: "4.8 MB",
    uploadedBy: "Board of Studies (CSE)",
    date: "2026-07-15",
    isPublic: true,
    downloadUrl: "#",
  },
  {
    id: "doc-3",
    title: "NBA Tier-1 Self Assessment Report (SAR) - CSE Department",
    category: "Accreditation",
    format: "PDF",
    size: "12.4 MB",
    uploadedBy: "Dr. Ramesh Kumar (HOD)",
    date: "2026-06-20",
    isPublic: false,
    downloadUrl: "#",
  },
  {
    id: "doc-4",
    title: "Institutional Digital Identity Card Form & Guidelines",
    category: "Student Services",
    format: "PDF",
    size: "512 KB",
    uploadedBy: "IT Cell Administration",
    date: "2026-08-10",
    isPublic: true,
    downloadUrl: "#",
  },
  {
    id: "doc-5",
    title: "AICTE Mandatory Disclosure & Compliance Audit 2026",
    category: "Accreditation",
    format: "PDF",
    size: "8.1 MB",
    uploadedBy: "Dean Office",
    date: "2026-05-30",
    isPublic: false,
    downloadUrl: "#",
  },
];

export interface AuditLogItem {
  id: string;
  user: string;
  role: string;
  action: string;
  module: string;
  timestamp: string;
  ipAddress: string;
}

export const DEMO_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: "log-1",
    user: "Dr. Ramesh Kumar",
    role: "HOD",
    action: "Approved Academic Leave for Prof. Amit Deshmukh",
    module: "Leave Sanctions",
    timestamp: "2026-09-04 11:24 AM",
    ipAddress: "10.0.4.12",
  },
  {
    id: "log-2",
    user: "Dr. Priya Sharma",
    role: "Faculty",
    action: "Entered CIE-1 marks for 62 students in CS501 (DBMS)",
    module: "Gradebook",
    timestamp: "2026-09-04 10:15 AM",
    ipAddress: "10.0.4.45",
  },
  {
    id: "log-3",
    user: "Dean Office / NIT Admin",
    role: "Super Admin",
    action: "Updated Course Allocation for Odd Semester 2026-27",
    module: "Academic Setup",
    timestamp: "2026-09-03 04:30 PM",
    ipAddress: "10.0.1.5",
  },
  {
    id: "log-4",
    user: "Dr. Priya Sharma",
    role: "Faculty",
    action: "Marked attendance for CS501 (5th Sem Sec A, 58 Present, 4 Absent)",
    module: "Attendance Register",
    timestamp: "2026-09-03 09:55 AM",
    ipAddress: "10.0.4.45",
  },
  {
    id: "log-5",
    user: "Dean Office / NIT Admin",
    role: "Super Admin",
    action: "Enrolled new faculty member Prof. Rajesh Kulkarni into CSE registry",
    module: "Faculty Management",
    timestamp: "2026-09-02 02:10 PM",
    ipAddress: "10.0.1.5",
  },
];

