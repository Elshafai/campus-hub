import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  GraduationCap,
  BookOpen,
  Building2,
  Shield,
  Database,
  Layers,
  FileCode,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Student Management",
    description: "Complete CRUD operations for student records with enrollment tracking",
    color: "bg-student/10 text-student",
  },
  {
    icon: GraduationCap,
    title: "Doctor Management",
    description: "Manage faculty members, specializations, and course assignments",
    color: "bg-doctor/10 text-doctor",
  },
  {
    icon: BookOpen,
    title: "Course Management",
    description: "Course catalog with prerequisites, credit hours, and enrollment limits",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Building2,
    title: "Department Management",
    description: "Organize departments with head assignments and resource allocation",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Admin, Doctor, and Student roles with granular permissions",
    color: "bg-admin/10 text-admin",
  },
  {
    icon: Database,
    title: "Grades System",
    description: "Comprehensive grading with GPA calculation and transcripts",
    color: "bg-success/10 text-success",
  },
];

const techStack = [
  "ASP.NET Core MVC",
  "Entity Framework Core",
  "SQL Server",
  "Identity Framework",
  "Bootstrap 5",
  "Razor Views",
];

const architecturePatterns = [
  { name: "Repository Pattern", description: "Abstraction layer for data access" },
  { name: "Unit of Work", description: "Transaction management across repositories" },
  { name: "Service Layer", description: "Business logic encapsulation" },
  { name: "ViewModels", description: "Data transfer between controllers and views" },
];

export default function Overview() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white hover:bg-white/30">
                Graduation Project
              </Badge>
              <h1 className="text-4xl font-bold">University Management System</h1>
              <p className="mt-2 max-w-2xl text-lg text-white/80">
                Complete ASP.NET Core MVC specification with database schema, entity models,
                ViewModels, controllers, and UI prototypes ready for implementation.
              </p>
            </div>
            <div className="hidden lg:block">
              <GraduationCap className="h-24 w-24 text-white/30" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="border-white/30 text-white">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Entity Models
              </CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Core entities</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ViewModels
              </CardTitle>
              <FileCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15+</div>
              <p className="text-xs text-muted-foreground">DTOs & ViewModels</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                User Roles
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Admin, Doctor, Student</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Controllers
              </CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10+</div>
              <p className="text-xs text-muted-foreground">With Area support</p>
            </CardContent>
          </Card>
        </div>

        {/* Core Features */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Core Modules</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${feature.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Architecture Patterns */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">Architecture Patterns</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {architecturePatterns.map((pattern) => (
              <Card key={pattern.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{pattern.name}</CardTitle>
                  <CardDescription>{pattern.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Navigation */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Navigate through the specification sections to get all the code you need
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
              <li>Review the <strong>Database Schema</strong> for ER diagram and relationships</li>
              <li>Copy <strong>Entity Models</strong> to your Models/Entities folder</li>
              <li>Implement <strong>ViewModels</strong> for each module</li>
              <li>Set up <strong>Architecture</strong> with Repository and Service patterns</li>
              <li>Create <strong>Controllers</strong> with the provided templates</li>
              <li>Use <strong>UI Prototypes</strong> as reference for Razor Views</li>
              <li>Initialize database with <strong>Seed Data</strong></li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
