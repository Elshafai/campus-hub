import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const entities = [
  {
    name: "Department",
    description: "Academic departments within the university",
    columns: [
      { name: "Id", type: "int", pk: true, fk: false, nullable: false, description: "Primary Key" },
      { name: "Name", type: "nvarchar(100)", pk: false, fk: false, nullable: false, description: "Department name" },
      { name: "Code", type: "nvarchar(10)", pk: false, fk: false, nullable: false, description: "Unique code (e.g., CS)" },
      { name: "Description", type: "nvarchar(500)", pk: false, fk: false, nullable: true, description: "Department description" },
      { name: "HeadOfDepartmentId", type: "int", pk: false, fk: true, nullable: true, description: "FK to Doctor" },
      { name: "CreatedAt", type: "datetime2", pk: false, fk: false, nullable: false, description: "Creation timestamp" },
      { name: "IsActive", type: "bit", pk: false, fk: false, nullable: false, description: "Soft delete flag" },
    ],
  },
  {
    name: "ApplicationUser",
    description: "Identity user extended with profile information",
    columns: [
      { name: "Id", type: "nvarchar(450)", pk: true, fk: false, nullable: false, description: "Primary Key (GUID)" },
      { name: "FirstName", type: "nvarchar(50)", pk: false, fk: false, nullable: false, description: "User first name" },
      { name: "LastName", type: "nvarchar(50)", pk: false, fk: false, nullable: false, description: "User last name" },
      { name: "Email", type: "nvarchar(256)", pk: false, fk: false, nullable: false, description: "Email address" },
      { name: "DateOfBirth", type: "datetime2", pk: false, fk: false, nullable: false, description: "Date of birth" },
      { name: "Gender", type: "nvarchar(20)", pk: false, fk: false, nullable: true, description: "Male/Female/Other" },
      { name: "Address", type: "nvarchar(200)", pk: false, fk: false, nullable: true, description: "Home address" },
      { name: "ProfilePictureUrl", type: "nvarchar(500)", pk: false, fk: false, nullable: true, description: "Profile image URL" },
    ],
  },
  {
    name: "Student",
    description: "Student records linked to ApplicationUser",
    columns: [
      { name: "Id", type: "int", pk: true, fk: false, nullable: false, description: "Primary Key" },
      { name: "StudentId", type: "nvarchar(20)", pk: false, fk: false, nullable: false, description: "Unique ID (STU-2024-001)" },
      { name: "UserId", type: "nvarchar(450)", pk: false, fk: true, nullable: false, description: "FK to ApplicationUser" },
      { name: "DepartmentId", type: "int", pk: false, fk: true, nullable: false, description: "FK to Department" },
      { name: "EnrollmentDate", type: "datetime2", pk: false, fk: false, nullable: false, description: "Date of enrollment" },
      { name: "CurrentSemester", type: "int", pk: false, fk: false, nullable: false, description: "Current semester (1-8)" },
      { name: "AcademicStatus", type: "nvarchar(20)", pk: false, fk: false, nullable: false, description: "Active/Suspended/Graduated" },
      { name: "GPA", type: "decimal(3,2)", pk: false, fk: false, nullable: true, description: "Grade Point Average" },
      { name: "TotalCreditsEarned", type: "int", pk: false, fk: false, nullable: false, description: "Total credits completed" },
    ],
  },
  {
    name: "Doctor",
    description: "Faculty/Doctor records",
    columns: [
      { name: "Id", type: "int", pk: true, fk: false, nullable: false, description: "Primary Key" },
      { name: "EmployeeId", type: "nvarchar(20)", pk: false, fk: false, nullable: false, description: "Unique ID (DOC-2024-001)" },
      { name: "UserId", type: "nvarchar(450)", pk: false, fk: true, nullable: false, description: "FK to ApplicationUser" },
      { name: "DepartmentId", type: "int", pk: false, fk: true, nullable: false, description: "FK to Department" },
      { name: "Specialization", type: "nvarchar(100)", pk: false, fk: false, nullable: true, description: "Area of expertise" },
      { name: "AcademicRank", type: "nvarchar(50)", pk: false, fk: false, nullable: true, description: "Professor/Lecturer/etc" },
      { name: "HireDate", type: "datetime2", pk: false, fk: false, nullable: false, description: "Employment start date" },
      { name: "OfficeLocation", type: "nvarchar(200)", pk: false, fk: false, nullable: true, description: "Office room/building" },
    ],
  },
  {
    name: "Course",
    description: "Course catalog",
    columns: [
      { name: "Id", type: "int", pk: true, fk: false, nullable: false, description: "Primary Key" },
      { name: "CourseCode", type: "nvarchar(20)", pk: false, fk: false, nullable: false, description: "Unique code (CS-101)" },
      { name: "Title", type: "nvarchar(200)", pk: false, fk: false, nullable: false, description: "Course title" },
      { name: "Description", type: "nvarchar(2000)", pk: false, fk: false, nullable: true, description: "Course description" },
      { name: "CreditHours", type: "int", pk: false, fk: false, nullable: false, description: "Credit hours (1-6)" },
      { name: "DepartmentId", type: "int", pk: false, fk: true, nullable: false, description: "FK to Department" },
      { name: "Semester", type: "int", pk: false, fk: false, nullable: false, description: "Recommended semester" },
      { name: "PrerequisiteCourseId", type: "int", pk: false, fk: true, nullable: true, description: "FK to Course (self)" },
      { name: "MaxEnrollment", type: "int", pk: false, fk: false, nullable: false, description: "Max students allowed" },
      { name: "CourseType", type: "nvarchar(50)", pk: false, fk: false, nullable: false, description: "Required/Elective" },
    ],
  },
  {
    name: "CourseAssignment",
    description: "Doctor-Course assignments per semester",
    columns: [
      { name: "Id", type: "int", pk: true, fk: false, nullable: false, description: "Primary Key" },
      { name: "DoctorId", type: "int", pk: false, fk: true, nullable: false, description: "FK to Doctor" },
      { name: "CourseId", type: "int", pk: false, fk: true, nullable: false, description: "FK to Course" },
      { name: "AcademicYear", type: "nvarchar(20)", pk: false, fk: false, nullable: false, description: "e.g., 2024-2025" },
      { name: "Semester", type: "nvarchar(20)", pk: false, fk: false, nullable: false, description: "Fall/Spring/Summer" },
      { name: "Schedule", type: "nvarchar(100)", pk: false, fk: false, nullable: true, description: "Class schedule" },
      { name: "Room", type: "nvarchar(50)", pk: false, fk: false, nullable: true, description: "Classroom" },
    ],
  },
  {
    name: "Enrollment",
    description: "Student-Course enrollment records",
    columns: [
      { name: "Id", type: "int", pk: true, fk: false, nullable: false, description: "Primary Key" },
      { name: "StudentId", type: "int", pk: false, fk: true, nullable: false, description: "FK to Student" },
      { name: "CourseAssignmentId", type: "int", pk: false, fk: true, nullable: false, description: "FK to CourseAssignment" },
      { name: "EnrollmentDate", type: "datetime2", pk: false, fk: false, nullable: false, description: "When enrolled" },
      { name: "Status", type: "nvarchar(20)", pk: false, fk: false, nullable: false, description: "Enrolled/Completed/Failed" },
    ],
  },
  {
    name: "Grade",
    description: "Student grades for courses",
    columns: [
      { name: "Id", type: "int", pk: true, fk: false, nullable: false, description: "Primary Key" },
      { name: "EnrollmentId", type: "int", pk: false, fk: true, nullable: false, description: "FK to Enrollment (1:1)" },
      { name: "MidtermScore", type: "decimal(5,2)", pk: false, fk: false, nullable: true, description: "Midterm score (0-100)" },
      { name: "FinalScore", type: "decimal(5,2)", pk: false, fk: false, nullable: true, description: "Final exam score" },
      { name: "AssignmentScore", type: "decimal(5,2)", pk: false, fk: false, nullable: true, description: "Assignments score" },
      { name: "AttendanceScore", type: "decimal(5,2)", pk: false, fk: false, nullable: true, description: "Attendance score" },
      { name: "TotalScore", type: "decimal(5,2)", pk: false, fk: false, nullable: true, description: "Weighted total" },
      { name: "LetterGrade", type: "nvarchar(2)", pk: false, fk: false, nullable: true, description: "A/B+/B/C+/C/D/F" },
      { name: "GradePoints", type: "decimal(3,2)", pk: false, fk: false, nullable: true, description: "GPA points (0-4)" },
    ],
  },
];

const relationships = [
  { from: "Student", to: "ApplicationUser", type: "1:1", description: "Each student has one user account" },
  { from: "Student", to: "Department", type: "N:1", description: "Many students belong to one department" },
  { from: "Doctor", to: "ApplicationUser", type: "1:1", description: "Each doctor has one user account" },
  { from: "Doctor", to: "Department", type: "N:1", description: "Many doctors belong to one department" },
  { from: "Department", to: "Doctor", type: "1:1", description: "Department has one head (optional)" },
  { from: "Course", to: "Department", type: "N:1", description: "Many courses belong to one department" },
  { from: "Course", to: "Course", type: "N:1", description: "Course can have a prerequisite course" },
  { from: "CourseAssignment", to: "Doctor", type: "N:1", description: "Doctor teaches many course sections" },
  { from: "CourseAssignment", to: "Course", type: "N:1", description: "Course has many sections/semesters" },
  { from: "Enrollment", to: "Student", type: "N:1", description: "Student has many enrollments" },
  { from: "Enrollment", to: "CourseAssignment", type: "N:1", description: "Section has many enrolled students" },
  { from: "Grade", to: "Enrollment", type: "1:1", description: "Each enrollment has one grade record" },
];

export default function Schema() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Database Schema</h1>
          <p className="mt-2 text-muted-foreground">
            Complete database design with Entity Framework Core Code First approach
          </p>
        </div>

        {/* ER Diagram */}
        <Card>
          <CardHeader>
            <CardTitle>Entity Relationship Diagram</CardTitle>
            <CardDescription>Visual representation of database relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border bg-muted/30 p-8">
              <pre className="text-sm font-mono text-foreground">
{`┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  ApplicationUser │◄────────│     Student     │────────►│   Department    │
│─────────────────│  1:1    │─────────────────│   N:1   │─────────────────│
│ Id (PK)         │         │ Id (PK)         │         │ Id (PK)         │
│ FirstName       │         │ StudentId       │         │ Name            │
│ LastName        │         │ UserId (FK)     │         │ Code            │
│ Email           │         │ DepartmentId    │         │ HeadOfDeptId    │◄─┐
│ DateOfBirth     │         │ CurrentSemester │         │ Description     │  │
└─────────────────┘         │ GPA             │         └─────────────────┘  │
        ▲                   └────────┬────────┘                 ▲            │
        │ 1:1                        │                         │            │
        │                            │ 1:N                     │ N:1        │
┌───────┴─────────┐                  │                         │            │
│     Doctor      │──────────────────┼─────────────────────────┘            │
│─────────────────│                  │                                      │
│ Id (PK)         │──────────────────┼──────────────────────────────────────┘
│ EmployeeId      │                  │                              1:1 (optional)
│ UserId (FK)     │                  │
│ DepartmentId    │                  │
│ Specialization  │                  │
│ AcademicRank    │                  │
└────────┬────────┘                  │
         │ 1:N                       │
         ▼                           ▼
┌─────────────────┐         ┌─────────────────┐
│CourseAssignment │◄────────│   Enrollment    │
│─────────────────│   N:1   │─────────────────│
│ Id (PK)         │         │ Id (PK)         │
│ DoctorId (FK)   │         │ StudentId (FK)  │
│ CourseId (FK)   │         │ CourseAssignId  │
│ AcademicYear    │         │ Status          │
│ Semester        │         │ EnrollmentDate  │
└────────┬────────┘         └────────┬────────┘
         │ N:1                       │ 1:1
         ▼                           ▼
┌─────────────────┐         ┌─────────────────┐
│     Course      │         │     Grade       │
│─────────────────│         │─────────────────│
│ Id (PK)         │◄──┐     │ Id (PK)         │
│ CourseCode      │   │     │ EnrollmentId    │
│ Title           │   │     │ MidtermScore    │
│ CreditHours     │   │     │ FinalScore      │
│ DepartmentId    │   │     │ TotalScore      │
│ PrerequisiteId  │───┘     │ LetterGrade     │
└─────────────────┘ N:1     │ GradePoints     │
     (self-ref)             └─────────────────┘`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Relationships Table */}
        <Card>
          <CardHeader>
            <CardTitle>Entity Relationships</CardTitle>
            <CardDescription>Summary of all database relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From Entity</TableHead>
                  <TableHead>To Entity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relationships.map((rel, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{rel.from}</TableCell>
                    <TableCell>{rel.to}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{rel.type}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{rel.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Entity Tables */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Table Definitions</h2>
          <Tabs defaultValue="Department" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1">
              {entities.map((entity) => (
                <TabsTrigger key={entity.name} value={entity.name} className="text-sm">
                  {entity.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {entities.map((entity) => (
              <TabsContent key={entity.name} value={entity.name}>
                <Card>
                  <CardHeader>
                    <CardTitle>{entity.name}</CardTitle>
                    <CardDescription>{entity.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Column</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Constraints</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {entity.columns.map((col) => (
                          <TableRow key={col.name}>
                            <TableCell className="font-medium">{col.name}</TableCell>
                            <TableCell>
                              <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                {col.type}
                              </code>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {col.pk && <Badge className="bg-primary">PK</Badge>}
                                {col.fk && <Badge className="bg-warning">FK</Badge>}
                                {!col.nullable && <Badge variant="outline">NOT NULL</Badge>}
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {col.description}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
