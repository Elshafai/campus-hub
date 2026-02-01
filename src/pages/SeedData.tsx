import { MainLayout } from "@/components/layout/MainLayout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { seedData } from "@/data/specification";

const defaultCredentials = [
  { role: "Admin", email: "admin@university.edu", password: "Admin@123" },
  { role: "Doctor", email: "dr.ahmed@university.edu", password: "Doctor@123" },
  { role: "Doctor", email: "dr.sara@university.edu", password: "Doctor@123" },
  { role: "Doctor", email: "dr.omar@university.edu", password: "Doctor@123" },
  { role: "Student", email: "student1@university.edu", password: "Student@123" },
  { role: "Student", email: "student2@university.edu", password: "Student@123" },
];

const sampleDepartments = [
  { code: "CS", name: "Computer Science", description: "Computer Science and IT" },
  { code: "MATH", name: "Mathematics", description: "Mathematics and Statistics" },
  { code: "PHY", name: "Physics", description: "Physics and Applied Sciences" },
  { code: "BA", name: "Business Administration", description: "Business and Management" },
  { code: "ENG", name: "English Literature", description: "English Language and Literature" },
];

const sampleCourses = [
  { code: "CS-101", title: "Introduction to Programming", credits: 3, semester: 1 },
  { code: "CS-102", title: "Data Structures", credits: 3, semester: 2 },
  { code: "CS-201", title: "Database Systems", credits: 3, semester: 3 },
  { code: "CS-202", title: "Software Engineering", credits: 3, semester: 4 },
  { code: "CS-301", title: "Machine Learning", credits: 3, semester: 5 },
  { code: "CS-302", title: "Web Development", credits: 3, semester: 5 },
];

export default function SeedData() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Seed Data</h1>
          <p className="mt-2 text-muted-foreground">
            Database initialization with sample data for testing
          </p>
        </div>

        {/* Default Credentials */}
        <Card>
          <CardHeader>
            <CardTitle>Default Login Credentials</CardTitle>
            <CardDescription>Test accounts created by the seed data</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Password</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defaultCredentials.map((cred, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge
                        className={
                          cred.role === "Admin"
                            ? "bg-admin"
                            : cred.role === "Doctor"
                            ? "bg-doctor"
                            : "bg-student"
                        }
                      >
                        {cred.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{cred.email}</TableCell>
                    <TableCell className="font-mono">{cred.password}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="mt-4 text-sm text-destructive">
              ⚠️ Change these credentials in production!
            </p>
          </CardContent>
        </Card>

        {/* Sample Data Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
              <CardDescription>5 sample departments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleDepartments.map((dept) => (
                    <TableRow key={dept.code}>
                      <TableCell>
                        <Badge variant="outline">{dept.code}</Badge>
                      </TableCell>
                      <TableCell>{dept.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>6 sample CS courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Sem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleCourses.map((course) => (
                    <TableRow key={course.code}>
                      <TableCell>
                        <Badge variant="outline">{course.code}</Badge>
                      </TableCell>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.semester}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* DbInitializer Code */}
        <CodeBlock
          title="Data/DbInitializer.cs"
          code={seedData}
        />

        {/* Usage Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
            <CardDescription>Running the seed data in your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The seed data is automatically called in <code>Program.cs</code> after database migration:
            </p>
            <CodeBlock
              title="Program.cs (excerpt)"
              code={`// Seed Database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<UniversityDbContext>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    
    await context.Database.MigrateAsync();
    await DbInitializer.SeedAsync(context, userManager, roleManager);
}`}
            />
            <div className="rounded-lg border bg-muted/30 p-4">
              <h4 className="font-medium">Migration Commands</h4>
              <pre className="mt-2 text-sm font-mono">
{`# Create initial migration
dotnet ef migrations add InitialCreate

# Apply migration to database
dotnet ef database update

# Seed data runs automatically on startup`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
