import { MainLayout } from "@/components/layout/MainLayout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { repositoryPattern, servicesLayer, folderStructure, programConfiguration } from "@/data/specification";

export default function Architecture() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Architecture</h1>
          <p className="mt-2 text-muted-foreground">
            Repository Pattern, Unit of Work, and Service Layer implementation
          </p>
        </div>

        {/* Architecture Diagram */}
        <Card>
          <CardHeader>
            <CardTitle>Layered Architecture</CardTitle>
            <CardDescription>Separation of concerns with clean architecture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border bg-muted/30 p-6">
              <pre className="text-sm font-mono text-foreground">
{`┌───────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│  │   Views     │  │ Controllers │  │  ViewModels │                │
│  │  (Razor)    │◄─│    (MVC)    │──│    (DTOs)   │                │
│  └─────────────┘  └──────┬──────┘  └─────────────┘                │
└───────────────────────────┼───────────────────────────────────────┘
                            │ Dependency Injection
                            ▼
┌───────────────────────────────────────────────────────────────────┐
│                        BUSINESS LAYER                              │
│  ┌───────────────────────────────────────────────────────────┐    │
│  │                    SERVICES                                │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │    │
│  │  │StudentService│  │ DoctorService│  │ CourseService│    │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘    │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │    │
│  │  │ GradeService │  │EnrollService │  │  DeptService │    │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘    │    │
│  └────────────────────────────┬──────────────────────────────┘    │
└───────────────────────────────┼───────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────┐
│                        DATA ACCESS LAYER                           │
│  ┌───────────────────────────────────────────────────────────┐    │
│  │                    UNIT OF WORK                            │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │    │
│  │  │ StudentRepo  │  │  DoctorRepo  │  │  CourseRepo  │    │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘    │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │    │
│  │  │  GradeRepo   │  │ EnrollRepo   │  │   DeptRepo   │    │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘    │    │
│  └────────────────────────────┬──────────────────────────────┘    │
└───────────────────────────────┼───────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────┐
│                        DATABASE LAYER                              │
│  ┌───────────────────────────────────────────────────────────┐    │
│  │              UniversityDbContext (EF Core)                 │    │
│  │                          │                                  │    │
│  │                    SQL Server                               │    │
│  └───────────────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="repository" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="repository">Generic Repository</TabsTrigger>
            <TabsTrigger value="unitOfWork">Unit of Work</TabsTrigger>
            <TabsTrigger value="specificRepos">Specific Repositories</TabsTrigger>
            <TabsTrigger value="studentService">Student Service</TabsTrigger>
            <TabsTrigger value="gradeService">Grade Service</TabsTrigger>
            <TabsTrigger value="programCs">Program.cs</TabsTrigger>
            <TabsTrigger value="folderStructure">Folder Structure</TabsTrigger>
          </TabsList>

          <TabsContent value="repository">
            <CodeBlock
              title="Repositories/Interfaces/IRepository.cs & Repository.cs"
              code={repositoryPattern.genericRepository}
            />
          </TabsContent>

          <TabsContent value="unitOfWork">
            <CodeBlock
              title="Repositories/UnitOfWork.cs"
              code={repositoryPattern.unitOfWork}
            />
          </TabsContent>

          <TabsContent value="specificRepos">
            <CodeBlock
              title="Repositories/Implementations/StudentRepository.cs"
              code={repositoryPattern.specificRepositories}
            />
          </TabsContent>

          <TabsContent value="studentService">
            <CodeBlock
              title="Services/Implementations/StudentService.cs"
              code={servicesLayer.studentService}
            />
          </TabsContent>

          <TabsContent value="gradeService">
            <CodeBlock
              title="Services/Implementations/GradeService.cs"
              code={servicesLayer.gradeService}
            />
          </TabsContent>

          <TabsContent value="programCs">
            <CodeBlock
              title="Program.cs"
              code={programConfiguration}
            />
          </TabsContent>

          <TabsContent value="folderStructure">
            <CodeBlock
              title="Project Folder Structure"
              language="text"
              code={folderStructure}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
