const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding NIT CSE Department Management System database...");

  // Clear existing
  await prisma.notification.deleteMany();
  await prisma.placementApplication.deleteMany();
  await prisma.placementCompany.deleteMany();
  await prisma.project.deleteMany();
  await prisma.event.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.studyMaterial.deleteMany();
  await prisma.assignmentSubmission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.examResult.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.leaveRequest.deleteMany();
  await prisma.timetableSlot.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.student.deleteMany();
  await prisma.faculty.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();

  // Create Department
  const dept = await prisma.department.create({
    data: {
      id: "dept-cse",
      code: "CSE",
      name: "Computer Science & Engineering",
      hodName: "Dr. Ramesh Kumar",
      hodEmail: "hod.cse@nitcampus.ac.in",
      phone: "+91 80 2345 6789",
      building: "Sir M. Visvesvaraya Block, 3rd Floor",
      academicYear: "2026-27",
    },
  });

  // Create Primary Users
  const hodUser = await prisma.user.create({
    data: {
      id: "usr-hod",
      email: "hod.cse@nitcampus.ac.in",
      passwordHash: "demo123",
      name: "Dr. Ramesh Kumar",
      role: "HOD",
      phone: "+91 98450 12345",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  });

  const facultyUser = await prisma.user.create({
    data: {
      id: "usr-fac2",
      email: "priya.sharma@nitcampus.ac.in",
      passwordHash: "demo123",
      name: "Dr. Priya Sharma",
      role: "FACULTY",
      phone: "+91 98451 23456",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      id: "usr-stu1",
      email: "aarav.cs23@nitcampus.ac.in",
      passwordHash: "demo123",
      name: "Aarav Sharma",
      role: "STUDENT",
      phone: "+91 98765 01001",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    },
  });

  // Seed Faculty Members
  const fac1 = await prisma.faculty.create({
    data: {
      id: "fac-1",
      userId: hodUser.id,
      employeeId: "CSE-FAC-001",
      name: "Dr. Ramesh Kumar",
      designation: "Professor",
      qualification: "Ph.D (IISc Bangalore), B.Tech (IITK)",
      email: "hod.cse@nitcampus.ac.in",
      phone: "+91 98450 12345",
      experienceYears: 21,
      attendanceRate: 98.5,
      status: "Active",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      officeRoom: "CS-301 (HOD Chamber)",
      specialization: "Artificial Intelligence, High Performance Computing",
      isSpotlight: true,
      spotlightTitle: "Faculty of the Month",
    },
  });

  const fac2 = await prisma.faculty.create({
    data: {
      id: "fac-2",
      userId: facultyUser.id,
      employeeId: "CSE-FAC-002",
      name: "Dr. Priya Sharma",
      designation: "Professor",
      qualification: "Ph.D (IIT Bombay), M.Tech (NITK)",
      email: "priya.sharma@nitcampus.ac.in",
      phone: "+91 98451 23456",
      experienceYears: 18,
      attendanceRate: 99.2,
      status: "Active",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      officeRoom: "CS-304",
      specialization: "Distributed Databases, Data Mining",
      isSpotlight: true,
      spotlightTitle: "Highest Attendance (99.2%)",
    },
  });

  const fac3 = await prisma.faculty.create({
    data: {
      id: "fac-3",
      employeeId: "CSE-FAC-003",
      name: "Dr. Anand K. Rao",
      designation: "Professor",
      qualification: "Ph.D (IIT Madras), PostDoc (NUS Singapore)",
      email: "anand.rao@nitcampus.ac.in",
      phone: "+91 98452 34567",
      experienceYears: 16,
      attendanceRate: 96.8,
      status: "Active",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      officeRoom: "CS-308",
      specialization: "Cloud Architecture, OS Kernel Virtualization",
      isSpotlight: true,
      spotlightTitle: "Top Research Citations (42 Papers)",
    },
  });

  const fac4 = await prisma.faculty.create({
    data: {
      id: "fac-4",
      employeeId: "CSE-FAC-004",
      name: "Dr. Meenakshi Sundaram",
      designation: "Associate Professor",
      qualification: "Ph.D (Anna Univ), M.E",
      email: "meenakshi.s@nitcampus.ac.in",
      phone: "+91 98453 45678",
      experienceYears: 14,
      attendanceRate: 95.0,
      status: "Active",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      officeRoom: "CS-312",
      specialization: "Network Security, Wireless Networks",
    },
  });

  // Seed Subjects
  const sub1 = await prisma.subject.create({
    data: {
      id: "sub-1",
      code: "CS501",
      name: "Database Management Systems",
      credits: 4,
      semester: 5,
      type: "Theory",
      facultyId: fac2.id,
      description: "Relational algebra, SQL, normal forms, transaction ACID properties.",
    },
  });

  const sub2 = await prisma.subject.create({
    data: {
      id: "sub-2",
      code: "CS502",
      name: "Operating Systems",
      credits: 4,
      semester: 5,
      type: "Theory",
      facultyId: fac3.id,
      description: "Processes, threads, CPU scheduling, memory paging, file systems.",
    },
  });

  const sub3 = await prisma.subject.create({
    data: {
      id: "sub-3",
      code: "CS503",
      name: "Computer Networks",
      credits: 4,
      semester: 5,
      type: "Theory",
      facultyId: fac4.id,
      description: "OSI and TCP/IP stack, routing protocols, flow & error control.",
    },
  });

  // Seed Students
  const stu1 = await prisma.student.create({
    data: {
      id: "stu-1",
      userId: studentUser.id,
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
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      parentName: "Sunil Sharma",
      parentPhone: "+91 94480 12001",
      address: "#42, Indiranagar, Bangalore",
    },
  });

  const stu2 = await prisma.student.create({
    data: {
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
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      parentName: "Bhavesh Patel",
      parentPhone: "+91 94480 12002",
      address: "#108, HSR Layout Sector 2, Bangalore",
    },
  });

  // Seed Timetable Slots
  await prisma.timetableSlot.createMany({
    data: [
      { dayOfWeek: "Monday", periodIndex: 1, startTime: "09:00 AM", endTime: "10:00 AM", semester: 5, section: "A", room: "CS-201", subjectId: sub1.id, facultyId: fac2.id },
      { dayOfWeek: "Monday", periodIndex: 2, startTime: "10:00 AM", endTime: "11:00 AM", semester: 5, section: "A", room: "CS-201", subjectId: sub2.id, facultyId: fac3.id },
      { dayOfWeek: "Monday", periodIndex: 3, startTime: "11:15 AM", endTime: "12:15 PM", semester: 5, section: "A", room: "CS-201", subjectId: sub3.id, facultyId: fac4.id },
      { dayOfWeek: "Tuesday", periodIndex: 1, startTime: "09:00 AM", endTime: "10:00 AM", semester: 5, section: "A", room: "CS-201", subjectId: sub3.id, facultyId: fac4.id },
      { dayOfWeek: "Tuesday", periodIndex: 2, startTime: "10:00 AM", endTime: "11:00 AM", semester: 5, section: "A", room: "CS-201", subjectId: sub1.id, facultyId: fac2.id },
    ],
  });

  // Seed Notices
  await prisma.notice.createMany({
    data: [
      {
        title: "Schedule for Continuous Internal Evaluation 1 (CIE-1)",
        category: "Examination",
        content: "The first internal assessment for 3rd, 5th, and 7th Semester B.Tech CSE will commence from Sept 22.",
        priority: "Urgent",
        targetRole: "All",
        publishDate: "2026-09-02",
      },
      {
        title: "Google India On-Campus Placement Drive (₹38.5 LPA)",
        category: "Placement",
        content: "Google University Programs team is visiting NIT campus on October 4, 2026 for SDE-1.",
        priority: "High",
        targetRole: "4th Year",
        publishDate: "2026-09-03",
      },
    ],
  });

  // Seed Placement Companies
  const comp1 = await prisma.placementCompany.create({
    data: {
      name: "Google India",
      role: "Software Development Engineer (SDE-1)",
      packageLPA: 38.5,
      location: "Bengaluru",
      minCgpa: 8.5,
      maxBacklogs: 0,
      deadline: "2026-09-15",
      driveDate: "2026-10-04",
      status: "Active",
    },
  });

  const comp2 = await prisma.placementCompany.create({
    data: {
      name: "Microsoft",
      role: "Software Engineer - Azure Core",
      packageLPA: 44.0,
      location: "Bengaluru",
      minCgpa: 8.0,
      maxBacklogs: 0,
      deadline: "2026-09-20",
      driveDate: "2026-10-10",
      status: "Active",
    },
  });

  console.log("Database seeded successfully with initial records!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
