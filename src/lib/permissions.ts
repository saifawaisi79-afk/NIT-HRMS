/**
 * RBAC Permission Utility
 * Central source of truth for all role-based permissions.
 * Used by API routes and UI components.
 */

export type PortalRole = "Student" | "Faculty" | "HOD" | "Administration" | "IT";

export type Permission =
  // Student permissions
  | "READ_OWN_PROFILE"
  | "EDIT_OWN_PROFILE"
  | "READ_OWN_ATTENDANCE"
  | "READ_OWN_RESULTS"
  | "READ_OWN_ASSIGNMENTS"
  | "SUBMIT_ASSIGNMENT"
  | "APPLY_LEAVE"
  | "READ_OWN_LEAVES"
  | "READ_NOTICES"
  | "READ_EVENTS"
  | "READ_PLACEMENTS"
  | "READ_OWN_DOCUMENTS"
  | "READ_OWN_TIMETABLE"
  | "READ_OWN_SUBJECTS"
  // Faculty permissions
  | "READ_ASSIGNED_STUDENTS"
  | "MARK_ATTENDANCE"
  | "CREATE_ASSIGNMENT"
  | "REVIEW_ASSIGNMENT"
  | "UPLOAD_MATERIAL"
  | "ENTER_MARKS"
  | "READ_FACULTY_LEAVES"
  | "READ_ASSIGNED_PERFORMANCE"
  | "READ_OWN_WORKLOAD"
  | "READ_FACULTY_DIRECTORY"
  // HOD permissions
  | "READ_DEPARTMENT_STUDENTS"
  | "READ_DEPARTMENT_FACULTY"
  | "APPROVE_LEAVE"
  | "MANAGE_COURSE_ALLOCATION"
  | "MANAGE_DEPARTMENT_TIMETABLE"
  | "REVIEW_RESULTS"
  | "READ_DEPARTMENT_REPORTS"
  | "MANAGE_DEPARTMENT_NOTICES"
  | "MANAGE_DEPARTMENT_PROJECTS"
  | "READ_ALL_LEAVES"
  // Admin permissions
  | "MANAGE_STUDENTS"
  | "MANAGE_FACULTY"
  | "MANAGE_DEPARTMENTS"
  | "MANAGE_SUBJECTS"
  | "MANAGE_USERS"
  | "MANAGE_ROLES"
  | "MANAGE_ADMISSIONS"
  | "MANAGE_FEES"
  | "MANAGE_DOCUMENTS"
  | "MANAGE_EXAMS"
  | "VIEW_COLLEGE_REPORTS"
  | "VIEW_AUDIT_LOGS"
  | "MANAGE_SYSTEM_SETTINGS"
  | "MANAGE_ACADEMIC_CONFIG";

const ROLE_PERMISSIONS: Record<PortalRole, Permission[]> = {
  Student: [
    "READ_OWN_PROFILE",
    "EDIT_OWN_PROFILE",
    "READ_OWN_ATTENDANCE",
    "READ_OWN_RESULTS",
    "READ_OWN_ASSIGNMENTS",
    "SUBMIT_ASSIGNMENT",
    "APPLY_LEAVE",
    "READ_OWN_LEAVES",
    "READ_NOTICES",
    "READ_EVENTS",
    "READ_PLACEMENTS",
    "READ_OWN_DOCUMENTS",
    "READ_OWN_TIMETABLE",
    "READ_OWN_SUBJECTS",
  ],
  Faculty: [
    "READ_OWN_PROFILE",
    "EDIT_OWN_PROFILE",
    "READ_ASSIGNED_STUDENTS",
    "READ_OWN_TIMETABLE",
    "MARK_ATTENDANCE",
    "CREATE_ASSIGNMENT",
    "REVIEW_ASSIGNMENT",
    "UPLOAD_MATERIAL",
    "ENTER_MARKS",
    "APPLY_LEAVE",
    "READ_FACULTY_LEAVES",
    "READ_ASSIGNED_PERFORMANCE",
    "READ_OWN_WORKLOAD",
    "READ_FACULTY_DIRECTORY",
    "READ_NOTICES",
    "READ_EVENTS",
  ],
  HOD: [
    "READ_OWN_PROFILE",
    "READ_DEPARTMENT_STUDENTS",
    "READ_DEPARTMENT_FACULTY",
    "READ_FACULTY_DIRECTORY",
    "APPROVE_LEAVE",
    "READ_ALL_LEAVES",
    "MANAGE_COURSE_ALLOCATION",
    "MANAGE_DEPARTMENT_TIMETABLE",
    "REVIEW_RESULTS",
    "READ_DEPARTMENT_REPORTS",
    "MANAGE_DEPARTMENT_NOTICES",
    "MANAGE_DEPARTMENT_PROJECTS",
    "MARK_ATTENDANCE",
    "READ_OWN_WORKLOAD",
    "READ_NOTICES",
    "READ_EVENTS",
    "ENTER_MARKS",
  ],
  Administration: [
    "READ_OWN_PROFILE",
    "MANAGE_STUDENTS",
    "MANAGE_FACULTY",
    "MANAGE_DEPARTMENTS",
    "MANAGE_SUBJECTS",
    "MANAGE_USERS",
    "MANAGE_ROLES",
    "MANAGE_ADMISSIONS",
    "MANAGE_FEES",
    "MANAGE_DOCUMENTS",
    "MANAGE_EXAMS",
    "VIEW_COLLEGE_REPORTS",
    "VIEW_AUDIT_LOGS",
    "MANAGE_SYSTEM_SETTINGS",
    "MANAGE_ACADEMIC_CONFIG",
    "APPROVE_LEAVE",
    "READ_ALL_LEAVES",
    "READ_DEPARTMENT_STUDENTS",
    "READ_DEPARTMENT_FACULTY",
    "READ_FACULTY_DIRECTORY",
    "READ_NOTICES",
    "READ_EVENTS",
    "MANAGE_DEPARTMENT_NOTICES",
  ],
  IT: [
    "READ_OWN_PROFILE",
    "VIEW_AUDIT_LOGS",
    "MANAGE_SYSTEM_SETTINGS",
    "READ_DEPARTMENT_STUDENTS",
    "READ_DEPARTMENT_FACULTY",
  ],
};

/** Check if a role has a specific permission */
export function hasPermission(role: PortalRole, permission: Permission): boolean {
  const perms = ROLE_PERMISSIONS[role];
  if (!perms) return false;
  return perms.includes(permission);
}

/** Check if a role has ALL of the specified permissions */
export function hasAllPermissions(role: PortalRole, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

/** Check if a role has ANY of the specified permissions */
export function hasAnyPermission(role: PortalRole, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

/** Roles that can manage students */
export const STUDENT_MANAGERS: PortalRole[] = ["Administration"];

/** Roles that can read all students */
export const STUDENT_READERS: PortalRole[] = ["HOD", "Administration", "IT"];

/** Roles that can manage faculty */
export const FACULTY_MANAGERS: PortalRole[] = ["Administration"];

/** Roles that can read faculty directory */
export const FACULTY_READERS: PortalRole[] = ["Faculty", "HOD", "Administration", "IT"];

/** Roles that can mark/write attendance */
export const ATTENDANCE_WRITERS: PortalRole[] = ["Faculty", "HOD", "Administration"];

/** Roles that can view all attendance */
export const ATTENDANCE_READERS: PortalRole[] = ["Faculty", "HOD", "Administration"];

/** Roles that can approve leave */
export const LEAVE_APPROVERS: PortalRole[] = ["HOD", "Administration"];

/** Roles that can view all leave records */
export const LEAVE_ALL_READERS: PortalRole[] = ["HOD", "Administration"];
