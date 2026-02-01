import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Users,
  GraduationCap,
  BookOpen,
  Building2,
  TrendingUp,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Bell,
  Menu,
  ChevronDown,
} from "lucide-react";

// Mock Data
const students = [
  { id: "STU-2024-001", name: "Ahmed Mohamed", email: "ahmed@university.edu", department: "Computer Science", semester: 3, gpa: 3.75, status: "Active" },
  { id: "STU-2024-002", name: "Sara Ali", email: "sara@university.edu", department: "Mathematics", semester: 2, gpa: 3.92, status: "Active" },
  { id: "STU-2024-003", name: "Omar Hassan", email: "omar@university.edu", department: "Physics", semester: 4, gpa: 3.45, status: "Active" },
  { id: "STU-2024-004", name: "Fatima Ibrahim", email: "fatima@university.edu", department: "Computer Science", semester: 1, gpa: null, status: "Active" },
  { id: "STU-2024-005", name: "Youssef Khalil", email: "youssef@university.edu", department: "Business Admin", semester: 5, gpa: 2.89, status: "Suspended" },
];

const stats = [
  { label: "Total Students", value: "1,234", icon: Users, change: "+12%", color: "text-student" },
  { label: "Active Doctors", value: "89", icon: GraduationCap, change: "+3%", color: "text-doctor" },
  { label: "Courses", value: "156", icon: BookOpen, change: "+8%", color: "text-primary" },
  { label: "Departments", value: "12", icon: Building2, change: "0%", color: "text-warning" },
];

function DashboardPrototype() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Administrator</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary" />
            <span className="font-medium">Admin User</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3 text-success" />
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
            <CardDescription>Latest student course registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Student {i} enrolled in CS-{100 + i}</p>
                    <p className="text-xs text-muted-foreground">{i} hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
            <CardDescription>Students per department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Computer Science", "Mathematics", "Physics", "Business Admin"].map((dept, i) => (
                <div key={dept} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{dept}</span>
                    <span className="text-muted-foreground">{300 - i * 50} students</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${100 - i * 15}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StudentListPrototype() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage student records</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-9" />
              </div>
            </div>
            <select className="rounded-md border px-3 py-2 text-sm">
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>Physics</option>
            </select>
            <select className="rounded-md border px-3 py-2 text-sm">
              <option>All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s}>Semester {s}</option>
              ))}
            </select>
            <select className="rounded-md border px-3 py-2 text-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Graduated</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                      {student.name}
                    </div>
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.semester}</TableCell>
                  <TableCell>
                    {student.gpa ? (
                      <Badge variant={student.gpa >= 3.5 ? "default" : student.gpa >= 2.5 ? "secondary" : "destructive"}>
                        {student.gpa.toFixed(2)}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Active" ? "default" : "destructive"}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing 1-5 of 1,234 students</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button size="sm">2</Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function GradeEntryPrototype() {
  const grades = [
    { studentId: "STU-2024-001", name: "Ahmed Mohamed", midterm: 85, final: 90, assignments: 88, attendance: 95 },
    { studentId: "STU-2024-002", name: "Sara Ali", midterm: 92, final: 95, assignments: 94, attendance: 100 },
    { studentId: "STU-2024-003", name: "Omar Hassan", midterm: 78, final: 82, assignments: 80, attendance: 85 },
    { studentId: "STU-2024-004", name: "Fatima Ibrahim", midterm: null, final: null, assignments: 75, attendance: 90 },
  ];

  const calculateTotal = (g: typeof grades[0]) => {
    if (g.midterm === null || g.final === null) return null;
    return (g.midterm * 0.3 + g.final * 0.4 + g.assignments * 0.2 + g.attendance * 0.1).toFixed(1);
  };

  const getLetterGrade = (total: number | null) => {
    if (total === null) return "N/A";
    if (total >= 90) return "A";
    if (total >= 85) return "B+";
    if (total >= 80) return "B";
    if (total >= 75) return "C+";
    if (total >= 70) return "C";
    if (total >= 65) return "D+";
    if (total >= 60) return "D";
    return "F";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Grade Entry</h1>
          <p className="text-muted-foreground">CS-101: Introduction to Programming</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export Grades</Button>
          <Button>Save All</Button>
        </div>
      </div>

      {/* Course Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Course Code</p>
              <p className="font-medium">CS-101</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Academic Year</p>
              <p className="font-medium">2024-2025</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Semester</p>
              <p className="font-medium">Fall</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Enrolled Students</p>
              <p className="font-medium">32</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grading Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Grades</CardTitle>
          <CardDescription>
            Grading weights: Midterm (30%), Final (40%), Assignments (20%), Attendance (10%)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Midterm (30%)</TableHead>
                <TableHead className="text-center">Final (40%)</TableHead>
                <TableHead className="text-center">Assignments (20%)</TableHead>
                <TableHead className="text-center">Attendance (10%)</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((g) => {
                const total = calculateTotal(g);
                const letter = getLetterGrade(total ? parseFloat(total) : null);
                return (
                  <TableRow key={g.studentId}>
                    <TableCell className="font-medium">{g.studentId}</TableCell>
                    <TableCell>{g.name}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="w-20 text-center mx-auto"
                        defaultValue={g.midterm ?? ""}
                        placeholder="0-100"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="w-20 text-center mx-auto"
                        defaultValue={g.final ?? ""}
                        placeholder="0-100"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="w-20 text-center mx-auto"
                        defaultValue={g.assignments}
                        placeholder="0-100"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="w-20 text-center mx-auto"
                        defaultValue={g.attendance}
                        placeholder="0-100"
                      />
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {total ?? "—"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          letter === "A" || letter === "B+" || letter === "B"
                            ? "default"
                            : letter === "F"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {letter}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function LoginPrototype() {
  return (
    <div className="flex min-h-[600px] items-center justify-center bg-muted/30 rounded-lg">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">University Management System</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="your.email@university.edu" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Password</label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="rounded border" />
            <label htmlFor="remember" className="text-sm">
              Remember me
            </label>
          </div>
          <Button className="w-full">Sign In</Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact Admin
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function UIPrototypes() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">UI Prototypes</h1>
          <p className="mt-2 text-muted-foreground">
            Interactive prototypes to guide your Razor Views + Bootstrap implementation
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Notes</CardTitle>
            <CardDescription>Converting these prototypes to Razor Views</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>These prototypes use <strong>Tailwind CSS</strong> — convert to <strong>Bootstrap 5</strong> classes</li>
              <li>Replace React components with <strong>Razor tag helpers</strong> and <strong>partial views</strong></li>
              <li>Use <strong>@Html.ActionLink</strong> and <strong>asp-action</strong> for navigation</li>
              <li>Replace state management with <strong>ViewBag</strong>, <strong>ViewData</strong>, or <strong>TempData</strong></li>
              <li>Use <strong>jQuery DataTables</strong> for sortable/searchable tables</li>
              <li>Add <strong>@Html.AntiForgeryToken()</strong> to all forms</li>
            </ul>
          </CardContent>
        </Card>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="students">Student List</TabsTrigger>
            <TabsTrigger value="grades">Grade Entry</TabsTrigger>
            <TabsTrigger value="login">Login Page</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Views/Admin/Dashboard/Index.cshtml</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardPrototype />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Views/Admin/Student/Index.cshtml</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentListPrototype />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle>Grade Entry Form</CardTitle>
                <CardDescription>Views/Doctor/Grade/CourseGrades.cshtml</CardDescription>
              </CardHeader>
              <CardContent>
                <GradeEntryPrototype />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login Page</CardTitle>
                <CardDescription>Views/Account/Login.cshtml</CardDescription>
              </CardHeader>
              <CardContent>
                <LoginPrototype />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
