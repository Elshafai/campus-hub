import { MainLayout } from "@/components/layout/MainLayout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { entityModels, dbContext } from "@/data/specification";

export default function Entities() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Entity Models</h1>
          <p className="mt-2 text-muted-foreground">
            C# entity classes for Entity Framework Core Code First approach
          </p>
        </div>

        <Tabs defaultValue="baseEntity" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="baseEntity">BaseEntity</TabsTrigger>
            <TabsTrigger value="applicationUser">ApplicationUser</TabsTrigger>
            <TabsTrigger value="department">Department</TabsTrigger>
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="doctor">Doctor</TabsTrigger>
            <TabsTrigger value="course">Course</TabsTrigger>
            <TabsTrigger value="courseAssignment">CourseAssignment</TabsTrigger>
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="grade">Grade</TabsTrigger>
            <TabsTrigger value="dbContext">DbContext</TabsTrigger>
          </TabsList>

          <TabsContent value="baseEntity">
            <CodeBlock
              title="Models/Entities/BaseEntity.cs"
              code={entityModels.baseEntity}
            />
          </TabsContent>

          <TabsContent value="applicationUser">
            <CodeBlock
              title="Models/Entities/ApplicationUser.cs"
              code={entityModels.applicationUser}
            />
          </TabsContent>

          <TabsContent value="department">
            <CodeBlock
              title="Models/Entities/Department.cs"
              code={entityModels.department}
            />
          </TabsContent>

          <TabsContent value="student">
            <CodeBlock
              title="Models/Entities/Student.cs"
              code={entityModels.student}
            />
          </TabsContent>

          <TabsContent value="doctor">
            <CodeBlock
              title="Models/Entities/Doctor.cs"
              code={entityModels.doctor}
            />
          </TabsContent>

          <TabsContent value="course">
            <CodeBlock
              title="Models/Entities/Course.cs"
              code={entityModels.course}
            />
          </TabsContent>

          <TabsContent value="courseAssignment">
            <CodeBlock
              title="Models/Entities/CourseAssignment.cs"
              code={entityModels.courseAssignment}
            />
          </TabsContent>

          <TabsContent value="enrollment">
            <CodeBlock
              title="Models/Entities/Enrollment.cs"
              code={entityModels.enrollment}
            />
          </TabsContent>

          <TabsContent value="grade">
            <CodeBlock
              title="Models/Entities/Grade.cs"
              code={entityModels.grade}
            />
          </TabsContent>

          <TabsContent value="dbContext">
            <CodeBlock
              title="Data/UniversityDbContext.cs"
              code={dbContext}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
