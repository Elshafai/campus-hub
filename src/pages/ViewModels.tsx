import { MainLayout } from "@/components/layout/MainLayout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { viewModels } from "@/data/specification";

export default function ViewModels() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">ViewModels</h1>
          <p className="mt-2 text-muted-foreground">
            Data Transfer Objects for passing data between Controllers and Views
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Why ViewModels?</CardTitle>
            <CardDescription>Best practices for ASP.NET MVC</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li><strong>Security:</strong> Prevent over-posting attacks by exposing only required fields</li>
              <li><strong>Separation:</strong> Keep domain entities separate from view concerns</li>
              <li><strong>Flexibility:</strong> Combine data from multiple entities for a single view</li>
              <li><strong>Validation:</strong> Apply view-specific validation attributes</li>
              <li><strong>Performance:</strong> Only transfer necessary data to views</li>
            </ul>
          </CardContent>
        </Card>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="student">Student ViewModels</TabsTrigger>
            <TabsTrigger value="doctor">Doctor ViewModels</TabsTrigger>
            <TabsTrigger value="course">Course ViewModels</TabsTrigger>
            <TabsTrigger value="enrollment">Enrollment ViewModels</TabsTrigger>
            <TabsTrigger value="grade">Grade ViewModels</TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <CodeBlock
              title="Models/ViewModels/Student/"
              code={viewModels.studentViewModels}
            />
          </TabsContent>

          <TabsContent value="doctor">
            <CodeBlock
              title="Models/ViewModels/Doctor/"
              code={viewModels.doctorViewModels}
            />
          </TabsContent>

          <TabsContent value="course">
            <CodeBlock
              title="Models/ViewModels/Course/"
              code={viewModels.courseViewModels}
            />
          </TabsContent>

          <TabsContent value="enrollment">
            <CodeBlock
              title="Models/ViewModels/Enrollment/"
              code={viewModels.enrollmentViewModel}
            />
          </TabsContent>

          <TabsContent value="grade">
            <CodeBlock
              title="Models/ViewModels/Grade/"
              code={viewModels.gradeViewModel}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
