import { MainLayout } from "@/components/layout/MainLayout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { controllers } from "@/data/specification";

const controllerOverview = [
  {
    name: "AccountController",
    area: "Root",
    role: "All",
    actions: ["Login", "Logout", "Register", "AccessDenied"],
  },
  {
    name: "DashboardController",
    area: "Admin",
    role: "Admin",
    actions: ["Index", "Analytics"],
  },
  {
    name: "StudentController",
    area: "Admin",
    role: "Admin",
    actions: ["Index", "Details", "Create", "Edit", "Delete"],
  },
  {
    name: "DoctorController",
    area: "Admin",
    role: "Admin",
    actions: ["Index", "Details", "Create", "Edit", "Delete"],
  },
  {
    name: "CourseController",
    area: "Admin",
    role: "Admin",
    actions: ["Index", "Details", "Create", "Edit", "Delete", "Assign"],
  },
  {
    name: "DepartmentController",
    area: "Admin",
    role: "Admin",
    actions: ["Index", "Details", "Create", "Edit", "Delete"],
  },
  {
    name: "EnrollmentController",
    area: "Admin",
    role: "Admin",
    actions: ["Index", "Enroll", "Withdraw", "BulkEnroll"],
  },
  {
    name: "DashboardController",
    area: "Doctor",
    role: "Doctor",
    actions: ["Index", "MyCourses"],
  },
  {
    name: "GradeController",
    area: "Doctor",
    role: "Doctor",
    actions: ["CourseGrades", "SaveGrades", "ExportGrades"],
  },
  {
    name: "DashboardController",
    area: "Student",
    role: "Student",
    actions: ["Index", "Profile"],
  },
  {
    name: "EnrollmentController",
    area: "Student",
    role: "Student",
    actions: ["AvailableCourses", "Enroll", "MyCourses", "Withdraw"],
  },
  {
    name: "GradeController",
    area: "Student",
    role: "Student",
    actions: ["MyGrades", "Transcript"],
  },
];

export default function Controllers() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Controllers</h1>
          <p className="mt-2 text-muted-foreground">
            MVC Controllers with role-based authorization and Areas
          </p>
        </div>

        {/* Controller Overview Table */}
        <Card>
          <CardHeader>
            <CardTitle>Controller Overview</CardTitle>
            <CardDescription>All controllers organized by Area and Role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left font-medium">Controller</th>
                    <th className="pb-3 text-left font-medium">Area</th>
                    <th className="pb-3 text-left font-medium">Required Role</th>
                    <th className="pb-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {controllerOverview.map((ctrl, index) => (
                    <tr key={index}>
                      <td className="py-3 font-medium">{ctrl.name}</td>
                      <td className="py-3">
                        <Badge variant="outline">{ctrl.area}</Badge>
                      </td>
                      <td className="py-3">
                        <Badge
                          className={
                            ctrl.role === "Admin"
                              ? "bg-admin"
                              : ctrl.role === "Doctor"
                              ? "bg-doctor"
                              : ctrl.role === "Student"
                              ? "bg-student"
                              : "bg-muted"
                          }
                        >
                          {ctrl.role}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-1">
                          {ctrl.actions.map((action) => (
                            <code
                              key={action}
                              className="rounded bg-muted px-1.5 py-0.5 text-xs"
                            >
                              {action}
                            </code>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="student">StudentController</TabsTrigger>
            <TabsTrigger value="grade">GradeController</TabsTrigger>
            <TabsTrigger value="account">AccountController</TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <CodeBlock
              title="Areas/Admin/Controllers/StudentController.cs"
              code={controllers.studentController}
            />
          </TabsContent>

          <TabsContent value="grade">
            <CodeBlock
              title="Areas/Doctor/Controllers/GradeController.cs"
              code={controllers.gradeController}
            />
          </TabsContent>

          <TabsContent value="account">
            <CodeBlock
              title="Controllers/AccountController.cs"
              code={controllers.accountController}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
