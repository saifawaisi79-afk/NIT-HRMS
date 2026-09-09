"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  DEPARTMENT_DATA,
  DEMO_FACULTY,
  DEMO_STUDENTS,
  DEMO_SUBJECTS,
  DEMO_TIMETABLE,
  DEMO_LEAVES,
  DEMO_NOTICES,
  DEMO_EVENTS,
  DEMO_PROJECTS,
  DEMO_PLACEMENTS,
  DEMO_ASSIGNMENTS,
  DEMO_MATERIALS,
  DEMO_NOTIFICATIONS,
  DEMO_FEES,
  DEMO_ADMISSIONS,
  DEMO_STUDENT_RESULTS,
  DEMO_FACULTY_WORKLOAD,
  DEMO_MENTORING,
  DEMO_DOCUMENTS,
  DEMO_AUDIT_LOGS,
  DepartmentInfo,
  FacultyMember,
  StudentRecord,
  SubjectCourse,
  TimetableEntry,
  LeaveItem,
  NoticeItem,
  EventItem,
  ProjectItem,
  PlacementItem,
  AssignmentItem,
  StudyMaterialItem,
  FeeRecord,
  AdmissionApplicant,
  StudentResult,
  FacultyWorkloadItem,
  MentoringRecord,
  DocumentItem,
  AuditLogItem,
} from "@/lib/data/cse-demo-data";

export type UserRole = "HOD" | "Faculty" | "Student" | "Super Admin";
export type PortalType = "Student" | "Faculty" | "HOD" | "Administration" | "IT";

interface DepartmentContextType {
  // Portal State & Navigation
  activePortal: PortalType | null;
  selectPortal: (portal: PortalType) => void;
  exitPortal: () => void;

  // Department Meta
  department: DepartmentInfo;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: {
    name: string;
    role: string;
    designation: string;
    email: string;
    avatar: string;
  };

  // Faculty State & Actions
  facultyList: FacultyMember[];
  addFaculty: (faculty: Omit<FacultyMember, "id" | "empId">) => void;
  updateFaculty: (id: string, faculty: Partial<FacultyMember>) => void;
  deleteFaculty: (id: string) => void;

  // Student State & Actions
  studentList: StudentRecord[];
  addStudent: (student: Omit<StudentRecord, "id">) => void;
  updateStudent: (id: string, student: Partial<StudentRecord>) => void;
  deleteStudent: (id: string) => void;

  // Attendance State & Actions
  attendanceRecords: Record<string, "Present" | "Absent" | "Late" | "On Duty">;
  markAttendance: (studentId: string, status: "Present" | "Absent" | "Late" | "On Duty") => void;
  markAllAttendance: (status: "Present" | "Absent" | "Late" | "On Duty") => void;

  // Timetable
  timetable: TimetableEntry[];
  addTimetableSlot: (slot: Omit<TimetableEntry, "id">) => { success: boolean; conflict?: string };
  deleteTimetableSlot: (id: string) => void;

  // Subjects
  subjects: SubjectCourse[];
  addSubject: (subject: Omit<SubjectCourse, "id">) => void;

  // Leaves
  leaves: LeaveItem[];
  applyLeave: (leave: Omit<LeaveItem, "id" | "appliedDate" | "status">) => void;
  updateLeaveStatus: (id: string, status: "Approved" | "Rejected", remarks?: string) => void;

  // Notices
  notices: NoticeItem[];
  addNotice: (notice: Omit<NoticeItem, "id" | "publishedDate">) => void;

  // Events
  events: EventItem[];
  registerForEvent: (eventId: string) => void;

  // Projects
  projects: ProjectItem[];
  addProject: (project: Omit<ProjectItem, "id">) => void;

  // Placements
  placements: PlacementItem[];
  applyPlacement: (companyId: string) => void;

  // Assignments & Notes
  assignments: AssignmentItem[];
  materials: StudyMaterialItem[];
  addStudyMaterial: (material: Omit<StudyMaterialItem, "id" | "uploadDate">) => void;

  // Extended Modules: Fees, Admissions, Results, Workload, Mentoring, Documents, Audit Logs
  fees: FeeRecord[];
  markFeePaid: (id: string) => void;
  admissions: AdmissionApplicant[];
  updateAdmissionStatus: (id: string, status: AdmissionApplicant["status"]) => void;
  results: StudentResult[];
  workload: FacultyWorkloadItem[];
  updateWorkload: (id: string, deltaHours: number) => void;
  mentoring: MentoringRecord[];
  addMentoringNote: (id: string, note: string) => void;
  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, "id" | "date">) => void;
  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, module: string) => void;

  // Global Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Notifications
  notifications: typeof DEMO_NOTIFICATIONS;
  markNotificationsAsRead: () => void;

  // Toast System
  toasts: { id: string; title: string; message: string; type: "success" | "info" | "warning" | "error" }[];
  showToast: (title: string, message: string, type?: "success" | "info" | "warning" | "error") => void;
}

const DepartmentContext = createContext<DepartmentContextType | undefined>(undefined);

export function DepartmentProvider({ children }: { children: React.ReactNode }) {
  const [activePortal, setActivePortal] = useState<PortalType | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>("HOD");
  const [department] = useState<DepartmentInfo>(DEPARTMENT_DATA);
  const [facultyList, setFacultyList] = useState<FacultyMember[]>(DEMO_FACULTY);
  const [studentList, setStudentList] = useState<StudentRecord[]>(DEMO_STUDENTS);
  const [timetable, setTimetable] = useState<TimetableEntry[]>(DEMO_TIMETABLE);
  const [subjects, setSubjects] = useState<SubjectCourse[]>(DEMO_SUBJECTS);
  const [leaves, setLeaves] = useState<LeaveItem[]>(DEMO_LEAVES);
  const [notices, setNotices] = useState<NoticeItem[]>(DEMO_NOTICES);
  const [events, setEvents] = useState<EventItem[]>(DEMO_EVENTS);
  const [projects, setProjects] = useState<ProjectItem[]>(DEMO_PROJECTS);
  const [placements, setPlacements] = useState<PlacementItem[]>(DEMO_PLACEMENTS);
  const [assignments, setAssignments] = useState<AssignmentItem[]>(DEMO_ASSIGNMENTS);
  const [materials, setMaterials] = useState<StudyMaterialItem[]>(DEMO_MATERIALS);
  const [fees, setFees] = useState<FeeRecord[]>(DEMO_FEES);
  const [admissions, setAdmissions] = useState<AdmissionApplicant[]>(DEMO_ADMISSIONS);
  const [results] = useState<StudentResult[]>(DEMO_STUDENT_RESULTS);
  const [workload, setWorkload] = useState<FacultyWorkloadItem[]>(DEMO_FACULTY_WORKLOAD);
  const [mentoring, setMentoring] = useState<MentoringRecord[]>(DEMO_MENTORING);
  const [documents, setDocuments] = useState<DocumentItem[]>(DEMO_DOCUMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(DEMO_AUDIT_LOGS);
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; title: string; message: string; type: "success" | "info" | "warning" | "error" }[]>([]);

  const selectPortal = (portal: PortalType) => {
    setActivePortal(portal);
    // Set browser cookie for Next.js middleware route protection
    try {
      sessionStorage.setItem("csex_active_portal", portal);
      document.cookie = `csex_active_portal=${portal}; path=/; SameSite=Strict`;
    } catch (e) {}

    if (portal === "Student") {
      setCurrentRole("Student");
      showToast("Student Portal Activated", "Switched to student academic services.");
    } else if (portal === "Faculty") {
      setCurrentRole("Faculty");
      showToast("Faculty Portal Activated", "Teaching workspace & attendance register active.");
    } else if (portal === "HOD") {
      setCurrentRole("HOD");
      showToast("HOD Portal Activated", "Department administration & approvals unlocked.");
    } else if (portal === "Administration") {
      setCurrentRole("Super Admin");
      showToast("Administration Portal Activated", "Full institutional operations access granted.");
    } else if (portal === "IT") {
      setCurrentRole("Super Admin");
      showToast("IT Dev Portal Activated", "Command center & engineering infrastructure active.");
    }
  };

  const exitPortal = () => {
    setActivePortal(null);
    // Clear both sessionStorage and the middleware cookie
    try {
      sessionStorage.removeItem("csex_active_portal");
      document.cookie = "csex_active_portal=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
    } catch (e) {}
    showToast("Portal Closed", "Returned to demo portal selector.", "info");
  };

  // Default attendance map for active class
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, "Present" | "Absent" | "Late" | "On Duty">>(() => {
    const initial: Record<string, "Present" | "Absent" | "Late" | "On Duty"> = {};
    DEMO_STUDENTS.forEach((s) => {
      initial[s.id] = s.status === "At Risk" ? "Absent" : "Present";
    });
    return initial;
  });

  // Current user details adaptive to role
  const currentUser = {
    HOD: {
      name: "Dr. Ramesh Kumar",
      role: "HOD & Professor",
      designation: "Head of Department (CSE)",
      email: "hod.cse@nitcampus.ac.in",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    Faculty: {
      name: "Dr. Priya Sharma",
      role: "Faculty Member",
      designation: "Professor (DBMS & Data Systems)",
      email: "priya.sharma@nitcampus.ac.in",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
    Student: {
      name: "Saif Awaisi",
      role: "Student",
      designation: "3rd Year CSE (USN: 1NT23CS042)",
      email: "saif.cs23@nitcampus.ac.in",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    },
    "Super Admin": {
      name: "Dean Office / NIT Admin",
      role: "Super Admin",
      designation: "System Administrator",
      email: "admin.cse@nitcampus.ac.in",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    },
  }[currentRole];

  // Toast handler
  const showToast = (title: string, message: string, type: "success" | "info" | "warning" | "error" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Faculty Actions
  const addFaculty = (data: Omit<FacultyMember, "id" | "empId">) => {
    const newId = `fac-${Date.now()}`;
    const newEmpId = `CSE-FAC-${String(facultyList.length + 1).padStart(3, "0")}`;
    const newFaculty: FacultyMember = {
      ...data,
      id: newId,
      empId: newEmpId,
    };
    setFacultyList((prev) => [newFaculty, ...prev]);
    showToast("Faculty Added", `${data.name} has been enrolled into CSE faculty registry.`);
  };

  const updateFaculty = (id: string, data: Partial<FacultyMember>) => {
    setFacultyList((prev) => prev.map((f) => (f.id === id ? { ...f, ...data } : f)));
    showToast("Faculty Updated", "Faculty record has been saved successfully.");
  };

  const deleteFaculty = (id: string) => {
    setFacultyList((prev) => prev.filter((f) => f.id !== id));
    showToast("Faculty Removed", "Faculty profile has been deleted from active registry.", "warning");
  };

  // Student Actions
  const addStudent = (data: Omit<StudentRecord, "id">) => {
    const newId = `stu-${Date.now()}`;
    const newStudent: StudentRecord = { ...data, id: newId };
    setStudentList((prev) => [newStudent, ...prev]);
    setAttendanceRecords((prev) => ({ ...prev, [newId]: "Present" }));
    showToast("Student Enrolled", `${data.name} (${data.usn}) has been admitted.`);
  };

  const updateStudent = (id: string, data: Partial<StudentRecord>) => {
    setStudentList((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
    showToast("Student Updated", "Student information updated successfully.");
  };

  const deleteStudent = (id: string) => {
    setStudentList((prev) => prev.filter((s) => s.id !== id));
    showToast("Student Removed", "Student record removed.", "warning");
  };

  // Attendance Actions
  const markAttendance = (studentId: string, status: "Present" | "Absent" | "Late" | "On Duty") => {
    setAttendanceRecords((prev) => ({ ...prev, [studentId]: status }));
  };

  const markAllAttendance = (status: "Present" | "Absent" | "Late" | "On Duty") => {
    const updated: Record<string, "Present" | "Absent" | "Late" | "On Duty"> = {};
    studentList.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceRecords(updated);
    showToast("Attendance Marked", `Marked all students as ${status}.`);
  };

  // Timetable
  const addTimetableSlot = (slot: Omit<TimetableEntry, "id">) => {
    // Check conflicts
    const facultyConflict = timetable.find(
      (t) => t.day === slot.day && t.period === slot.period && t.facultyName === slot.facultyName
    );
    if (facultyConflict) {
      return { success: false, conflict: `Conflict: ${slot.facultyName} is already scheduled in Room ${facultyConflict.room} during this period.` };
    }

    const roomConflict = timetable.find(
      (t) => t.day === slot.day && t.period === slot.period && t.room === slot.room
    );
    if (roomConflict) {
      return { success: false, conflict: `Conflict: Room ${slot.room} is already occupied by ${roomConflict.subjectCode} during this period.` };
    }

    const newSlot: TimetableEntry = { ...slot, id: `tt-${Date.now()}` };
    setTimetable((prev) => [...prev, newSlot]);
    showToast("Timetable Updated", `Scheduled ${slot.subjectCode} on ${slot.day} period ${slot.period}.`);
    return { success: true };
  };

  const deleteTimetableSlot = (id: string) => {
    setTimetable((prev) => prev.filter((t) => t.id !== id));
    showToast("Slot Removed", "Timetable slot has been cleared.");
  };

  // Subjects
  const addSubject = (sub: Omit<SubjectCourse, "id">) => {
    const newSubject: SubjectCourse = { ...sub, id: `sub-${Date.now()}` };
    setSubjects((prev) => [...prev, newSubject]);
    showToast("Course Created", `${sub.code}: ${sub.name} added to curriculum.`);
  };

  // Leaves
  const applyLeave = (data: Omit<LeaveItem, "id" | "appliedDate" | "status">) => {
    const newLeave: LeaveItem = {
      ...data,
      id: `lv-${Date.now()}`,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Pending",
    };
    setLeaves((prev) => [newLeave, ...prev]);
    showToast("Leave Submitted", "Your leave application has been routed to HOD for review.");
  };

  const updateLeaveStatus = (id: string, status: "Approved" | "Rejected", remarks?: string) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, approverRemarks: remarks || `${status} by HOD` } : l))
    );
    showToast(`Leave ${status}`, `Leave request has been marked as ${status}.`, status === "Approved" ? "success" : "warning");
  };

  // Notices
  const addNotice = (notice: Omit<NoticeItem, "id" | "publishedDate">) => {
    const newNotice: NoticeItem = {
      ...notice,
      id: `not-${Date.now()}`,
      publishedDate: new Date().toISOString().split("T")[0],
    };
    setNotices((prev) => [newNotice, ...prev]);
    showToast("Notice Published", `Circular "${notice.title.substring(0, 30)}..." published to ${notice.targetAudience}.`);
  };

  // Events
  const registerForEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === eventId ? { ...ev, registrations: ev.registrations + 1 } : ev))
    );
    showToast("Registration Confirmed", "You have been registered for this event. Ticket QR sent to email.");
  };

  // Projects
  const addProject = (proj: Omit<ProjectItem, "id">) => {
    const newProject: ProjectItem = { ...proj, id: `proj-${Date.now()}` };
    setProjects((prev) => [newProject, ...prev]);
    showToast("Project Registered", `Project "${proj.title}" submitted to department repository.`);
  };

  // Placements
  const applyPlacement = (companyId: string) => {
    setPlacements((prev) =>
      prev.map((p) => (p.id === companyId ? { ...p, appliedCount: p.appliedCount + 1 } : p))
    );
    showToast("Application Submitted", "Resume & academic transcript forwarded to company portal.");
  };

  // Study Materials
  const addStudyMaterial = (mat: Omit<StudyMaterialItem, "id" | "uploadDate">) => {
    const newMat: StudyMaterialItem = {
      ...mat,
      id: `mat-${Date.now()}`,
      uploadDate: new Date().toISOString().split("T")[0],
    };
    setMaterials((prev) => [newMat, ...prev]);
    showToast("Material Uploaded", `File uploaded to Module ${mat.module} repository.`);
  };

  // Notifications
  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast("Notifications Read", "All notifications marked as read.", "info");
  };

  // Fees Action
  const markFeePaid = (id: string) => {
    setFees((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              status: "Paid",
              paidAmount: f.totalFee,
              pendingAmount: 0,
              paymentDate: new Date().toISOString().split("T")[0],
              receiptNo: `NIT-CSE-REC-${Date.now().toString().slice(-6)}`,
            }
          : f
      )
    );
    showToast("Fee Payment Recorded", "Receipt generated and student clearance updated.");
  };

  // Admissions Action
  const updateAdmissionStatus = (id: string, status: AdmissionApplicant["status"]) => {
    setAdmissions((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    showToast("Admission Status Updated", `Application marked as ${status}.`);
  };

  // Workload Action
  const updateWorkload = (id: string, deltaHours: number) => {
    setWorkload((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        const newHours = Math.max(2, w.weeklyHours + deltaHours);
        const status = newHours > 18 ? "Overloaded" : newHours < 10 ? "Underloaded" : "Balanced";
        return { ...w, weeklyHours: newHours, status };
      })
    );
    showToast("Workload Adjusted", "Faculty teaching hours and workload balance updated.");
  };

  // Mentoring Action
  const addMentoringNote = (id: string, note: string) => {
    setMentoring((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              notes: note,
              lastMeetingDate: new Date().toISOString().split("T")[0],
            }
          : m
      )
    );
    showToast("Mentoring Log Saved", "Session notes and student action items updated.");
  };

  // Documents Action
  const addDocument = (doc: Omit<DocumentItem, "id" | "date">) => {
    const newDoc: DocumentItem = {
      ...doc,
      id: `doc-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };
    setDocuments((prev) => [newDoc, ...prev]);
    showToast("Document Uploaded", `${doc.title} published to repository.`);
  };

  // Audit Logs Action
  const addAuditLog = (action: string, module: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      user: currentUser.name,
      role: currentRole,
      action,
      module,
      timestamp: "Just now",
      ipAddress: "10.0.4.12",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  return (
    <DepartmentContext.Provider
      value={{
        activePortal,
        selectPortal,
        exitPortal,
        department,
        currentRole,
        setCurrentRole,
        currentUser,
        facultyList,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        studentList,
        addStudent,
        updateStudent,
        deleteStudent,
        attendanceRecords,
        markAttendance,
        markAllAttendance,
        timetable,
        addTimetableSlot,
        deleteTimetableSlot,
        subjects,
        addSubject,
        leaves,
        applyLeave,
        updateLeaveStatus,
        notices,
        addNotice,
        events,
        registerForEvent,
        projects,
        addProject,
        placements,
        applyPlacement,
        assignments,
        materials,
        addStudyMaterial,
        fees,
        markFeePaid,
        admissions,
        updateAdmissionStatus,
        results,
        workload,
        updateWorkload,
        mentoring,
        addMentoringNote,
        documents,
        addDocument,
        auditLogs,
        addAuditLog,
        isSearchOpen,
        setIsSearchOpen,
        notifications,
        markNotificationsAsRead,
        toasts,
        showToast,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
}

export function useDepartment() {
  const context = useContext(DepartmentContext);
  if (!context) {
    throw new Error("useDepartment must be used within a DepartmentProvider");
  }
  return context;
}
