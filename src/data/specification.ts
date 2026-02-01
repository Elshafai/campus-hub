// University Management System - Complete Specification
// This file contains all entity models, relationships, and business logic

// ============================================
// ENTITY MODELS (C# Class Definitions)
// ============================================

export const entityModels = {
  // Base Entity for common properties
  baseEntity: `
public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public bool IsActive { get; set; } = true;
}`,

  // Department Entity
  department: `
public class Department : BaseEntity
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    [StringLength(10)]
    public string Code { get; set; }

    [StringLength(500)]
    public string Description { get; set; }

    public int? HeadOfDepartmentId { get; set; }

    // Navigation Properties
    public virtual Doctor HeadOfDepartment { get; set; }
    public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
    public virtual ICollection<Student> Students { get; set; } = new List<Student>();
    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}`,

  // ApplicationUser (Identity)
  applicationUser: `
public class ApplicationUser : IdentityUser
{
    [Required]
    [StringLength(50)]
    public string FirstName { get; set; }

    [Required]
    [StringLength(50)]
    public string LastName { get; set; }

    public string FullName => $"{FirstName} {LastName}";

    [StringLength(500)]
    public string ProfilePictureUrl { get; set; }

    public DateTime DateOfBirth { get; set; }

    [StringLength(20)]
    public string Gender { get; set; }

    [StringLength(200)]
    public string Address { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;
}`,

  // Student Entity
  student: `
public class Student : BaseEntity
{
    [Required]
    [StringLength(20)]
    public string StudentId { get; set; } // e.g., "STU-2024-001"

    [Required]
    public string UserId { get; set; }

    [Required]
    public int DepartmentId { get; set; }

    public DateTime EnrollmentDate { get; set; }

    [Range(1, 8)]
    public int CurrentSemester { get; set; } = 1;

    [StringLength(20)]
    public string AcademicStatus { get; set; } = "Active"; // Active, Suspended, Graduated, Withdrawn

    public decimal? GPA { get; set; }

    public int TotalCreditsEarned { get; set; } = 0;

    // Navigation Properties
    public virtual ApplicationUser User { get; set; }
    public virtual Department Department { get; set; }
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}`,

  // Doctor Entity
  doctor: `
public class Doctor : BaseEntity
{
    [Required]
    [StringLength(20)]
    public string EmployeeId { get; set; } // e.g., "DOC-2024-001"

    [Required]
    public string UserId { get; set; }

    [Required]
    public int DepartmentId { get; set; }

    [StringLength(100)]
    public string Specialization { get; set; }

    [StringLength(50)]
    public string AcademicRank { get; set; } // Professor, Associate Professor, Assistant Professor, Lecturer

    public DateTime HireDate { get; set; }

    [StringLength(200)]
    public string OfficeLocation { get; set; }

    [StringLength(100)]
    public string OfficeHours { get; set; }

    // Navigation Properties
    public virtual ApplicationUser User { get; set; }
    public virtual Department Department { get; set; }
    public virtual ICollection<CourseAssignment> CourseAssignments { get; set; } = new List<CourseAssignment>();
    public virtual Department HeadOfDepartment { get; set; } // If this doctor is head of a department
}`,

  // Course Entity
  course: `
public class Course : BaseEntity
{
    [Required]
    [StringLength(20)]
    public string CourseCode { get; set; } // e.g., "CS-101"

    [Required]
    [StringLength(200)]
    public string Title { get; set; }

    [StringLength(2000)]
    public string Description { get; set; }

    [Required]
    [Range(1, 6)]
    public int CreditHours { get; set; }

    [Required]
    public int DepartmentId { get; set; }

    [Range(1, 8)]
    public int Semester { get; set; }

    public int? PrerequisiteCourseId { get; set; }

    public int MaxEnrollment { get; set; } = 50;

    [StringLength(50)]
    public string CourseType { get; set; } = "Required"; // Required, Elective, Core

    // Navigation Properties
    public virtual Department Department { get; set; }
    public virtual Course PrerequisiteCourse { get; set; }
    public virtual ICollection<Course> DependentCourses { get; set; } = new List<Course>();
    public virtual ICollection<CourseAssignment> CourseAssignments { get; set; } = new List<CourseAssignment>();
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}`,

  // CourseAssignment (Doctor-Course relationship)
  courseAssignment: `
public class CourseAssignment : BaseEntity
{
    [Required]
    public int DoctorId { get; set; }

    [Required]
    public int CourseId { get; set; }

    [Required]
    [StringLength(20)]
    public string AcademicYear { get; set; } // e.g., "2024-2025"

    [Required]
    [StringLength(20)]
    public string Semester { get; set; } // Fall, Spring, Summer

    [StringLength(100)]
    public string Schedule { get; set; } // e.g., "Mon/Wed 10:00-11:30"

    [StringLength(50)]
    public string Room { get; set; }

    // Navigation Properties
    public virtual Doctor Doctor { get; set; }
    public virtual Course Course { get; set; }
}`,

  // Enrollment (Student-Course relationship)
  enrollment: `
public class Enrollment : BaseEntity
{
    [Required]
    public int StudentId { get; set; }

    [Required]
    public int CourseAssignmentId { get; set; }

    public DateTime EnrollmentDate { get; set; } = DateTime.UtcNow;

    [StringLength(20)]
    public string Status { get; set; } = "Enrolled"; // Enrolled, Completed, Withdrawn, Failed

    // Navigation Properties
    public virtual Student Student { get; set; }
    public virtual CourseAssignment CourseAssignment { get; set; }
    public virtual Grade Grade { get; set; }
}`,

  // Grade Entity
  grade: `
public class Grade : BaseEntity
{
    [Required]
    public int EnrollmentId { get; set; }

    [Range(0, 100)]
    public decimal? MidtermScore { get; set; }

    [Range(0, 100)]
    public decimal? FinalScore { get; set; }

    [Range(0, 100)]
    public decimal? AssignmentScore { get; set; }

    [Range(0, 100)]
    public decimal? AttendanceScore { get; set; }

    [Range(0, 100)]
    public decimal? TotalScore { get; set; }

    [StringLength(2)]
    public string LetterGrade { get; set; } // A, B+, B, C+, C, D+, D, F

    [Range(0, 4)]
    public decimal? GradePoints { get; set; }

    public DateTime? GradedAt { get; set; }

    public int? GradedByDoctorId { get; set; }

    // Navigation Properties
    public virtual Enrollment Enrollment { get; set; }
    public virtual Doctor GradedByDoctor { get; set; }
}`
};

// ============================================
// VIEW MODELS
// ============================================

export const viewModels = {
  // Student View Models
  studentViewModels: `
// List View
public class StudentListViewModel
{
    public int Id { get; set; }
    public string StudentId { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string DepartmentName { get; set; }
    public int CurrentSemester { get; set; }
    public string AcademicStatus { get; set; }
    public decimal? GPA { get; set; }
}

// Details View
public class StudentDetailsViewModel
{
    public int Id { get; set; }
    public string StudentId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; }
    public string Address { get; set; }
    public string ProfilePictureUrl { get; set; }
    public string DepartmentName { get; set; }
    public DateTime EnrollmentDate { get; set; }
    public int CurrentSemester { get; set; }
    public string AcademicStatus { get; set; }
    public decimal? GPA { get; set; }
    public int TotalCreditsEarned { get; set; }
    public List<EnrollmentViewModel> Enrollments { get; set; }
}

// Create/Edit View
public class StudentCreateEditViewModel
{
    public int Id { get; set; }

    [Required]
    [Display(Name = "First Name")]
    public string FirstName { get; set; }

    [Required]
    [Display(Name = "Last Name")]
    public string LastName { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Phone]
    [Display(Name = "Phone Number")]
    public string PhoneNumber { get; set; }

    [Required]
    [Display(Name = "Date of Birth")]
    [DataType(DataType.Date)]
    public DateTime DateOfBirth { get; set; }

    public string Gender { get; set; }

    public string Address { get; set; }

    [Required]
    [Display(Name = "Department")]
    public int DepartmentId { get; set; }

    public IEnumerable<SelectListItem> Departments { get; set; }
}`,

  // Doctor View Models
  doctorViewModels: `
// List View
public class DoctorListViewModel
{
    public int Id { get; set; }
    public string EmployeeId { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string DepartmentName { get; set; }
    public string Specialization { get; set; }
    public string AcademicRank { get; set; }
    public int CoursesCount { get; set; }
}

// Details View
public class DoctorDetailsViewModel
{
    public int Id { get; set; }
    public string EmployeeId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; }
    public string Address { get; set; }
    public string ProfilePictureUrl { get; set; }
    public string DepartmentName { get; set; }
    public string Specialization { get; set; }
    public string AcademicRank { get; set; }
    public DateTime HireDate { get; set; }
    public string OfficeLocation { get; set; }
    public string OfficeHours { get; set; }
    public bool IsHeadOfDepartment { get; set; }
    public List<CourseAssignmentViewModel> CourseAssignments { get; set; }
}`,

  // Course View Models
  courseViewModels: `
// List View
public class CourseListViewModel
{
    public int Id { get; set; }
    public string CourseCode { get; set; }
    public string Title { get; set; }
    public int CreditHours { get; set; }
    public string DepartmentName { get; set; }
    public int Semester { get; set; }
    public string CourseType { get; set; }
    public int EnrolledStudents { get; set; }
    public int MaxEnrollment { get; set; }
}

// Details View
public class CourseDetailsViewModel
{
    public int Id { get; set; }
    public string CourseCode { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int CreditHours { get; set; }
    public string DepartmentName { get; set; }
    public int Semester { get; set; }
    public string PrerequisiteCourseName { get; set; }
    public string CourseType { get; set; }
    public int MaxEnrollment { get; set; }
    public List<DoctorListViewModel> AssignedDoctors { get; set; }
    public List<StudentListViewModel> EnrolledStudents { get; set; }
}`,

  // Enrollment View Model
  enrollmentViewModel: `
public class EnrollmentViewModel
{
    public int Id { get; set; }
    public string CourseName { get; set; }
    public string CourseCode { get; set; }
    public string DoctorName { get; set; }
    public string Semester { get; set; }
    public string AcademicYear { get; set; }
    public string Status { get; set; }
    public GradeViewModel Grade { get; set; }
}

public class EnrollStudentViewModel
{
    [Required]
    public int StudentId { get; set; }

    [Required]
    public int CourseAssignmentId { get; set; }

    public string StudentName { get; set; }
    public IEnumerable<SelectListItem> AvailableCourses { get; set; }
}`,

  // Grade View Model
  gradeViewModel: `
public class GradeViewModel
{
    public int EnrollmentId { get; set; }
    public string StudentName { get; set; }
    public string StudentId { get; set; }
    public string CourseName { get; set; }
    public decimal? MidtermScore { get; set; }
    public decimal? FinalScore { get; set; }
    public decimal? AssignmentScore { get; set; }
    public decimal? AttendanceScore { get; set; }
    public decimal? TotalScore { get; set; }
    public string LetterGrade { get; set; }
    public decimal? GradePoints { get; set; }
}

public class GradeEntryViewModel
{
    public int EnrollmentId { get; set; }
    public string StudentName { get; set; }
    public string StudentId { get; set; }

    [Range(0, 100)]
    [Display(Name = "Midterm (30%)")]
    public decimal? MidtermScore { get; set; }

    [Range(0, 100)]
    [Display(Name = "Final (40%)")]
    public decimal? FinalScore { get; set; }

    [Range(0, 100)]
    [Display(Name = "Assignments (20%)")]
    public decimal? AssignmentScore { get; set; }

    [Range(0, 100)]
    [Display(Name = "Attendance (10%)")]
    public decimal? AttendanceScore { get; set; }
}

public class CourseGradesViewModel
{
    public string CourseCode { get; set; }
    public string CourseName { get; set; }
    public string Semester { get; set; }
    public string AcademicYear { get; set; }
    public List<GradeEntryViewModel> StudentGrades { get; set; }
}`
};

// ============================================
// DATABASE CONTEXT
// ============================================

export const dbContext = `
public class UniversityDbContext : IdentityDbContext<ApplicationUser>
{
    public UniversityDbContext(DbContextOptions<UniversityDbContext> options) 
        : base(options)
    {
    }

    public DbSet<Department> Departments { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Doctor> Doctors { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<CourseAssignment> CourseAssignments { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }
    public DbSet<Grade> Grades { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Department Configuration
        modelBuilder.Entity<Department>(entity =>
        {
            entity.HasIndex(d => d.Code).IsUnique();
            
            entity.HasOne(d => d.HeadOfDepartment)
                .WithOne(doc => doc.HeadOfDepartment)
                .HasForeignKey<Department>(d => d.HeadOfDepartmentId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        // Student Configuration
        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasIndex(s => s.StudentId).IsUnique();
            
            entity.HasOne(s => s.User)
                .WithMany()
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(s => s.Department)
                .WithMany(d => d.Students)
                .HasForeignKey(s => s.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Doctor Configuration
        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.HasIndex(d => d.EmployeeId).IsUnique();
            
            entity.HasOne(d => d.User)
                .WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(d => d.Department)
                .WithMany(dept => dept.Doctors)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Course Configuration
        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasIndex(c => c.CourseCode).IsUnique();
            
            entity.HasOne(c => c.Department)
                .WithMany(d => d.Courses)
                .HasForeignKey(c => c.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(c => c.PrerequisiteCourse)
                .WithMany(c => c.DependentCourses)
                .HasForeignKey(c => c.PrerequisiteCourseId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        // CourseAssignment Configuration
        modelBuilder.Entity<CourseAssignment>(entity =>
        {
            entity.HasIndex(ca => new { ca.DoctorId, ca.CourseId, ca.AcademicYear, ca.Semester })
                .IsUnique();

            entity.HasOne(ca => ca.Doctor)
                .WithMany(d => d.CourseAssignments)
                .HasForeignKey(ca => ca.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(ca => ca.Course)
                .WithMany(c => c.CourseAssignments)
                .HasForeignKey(ca => ca.CourseId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Enrollment Configuration
        modelBuilder.Entity<Enrollment>(entity =>
        {
            entity.HasIndex(e => new { e.StudentId, e.CourseAssignmentId }).IsUnique();

            entity.HasOne(e => e.Student)
                .WithMany(s => s.Enrollments)
                .HasForeignKey(e => e.StudentId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.CourseAssignment)
                .WithMany()
                .HasForeignKey(e => e.CourseAssignmentId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Grade Configuration
        modelBuilder.Entity<Grade>(entity =>
        {
            entity.HasOne(g => g.Enrollment)
                .WithOne(e => e.Grade)
                .HasForeignKey<Grade>(g => g.EnrollmentId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(g => g.GradedByDoctor)
                .WithMany()
                .HasForeignKey(g => g.GradedByDoctorId)
                .OnDelete(DeleteBehavior.SetNull);
        });
    }
}`;

// ============================================
// REPOSITORY PATTERN
// ============================================

export const repositoryPattern = {
  genericRepository: `
public interface IRepository<T> where T : BaseEntity
{
    Task<T> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    IQueryable<T> Query();
}

public class Repository<T> : IRepository<T> where T : BaseEntity
{
    protected readonly UniversityDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(UniversityDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public virtual async Task<T> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.Where(e => e.IsActive).ToListAsync();
    }

    public virtual async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await _dbSet.Where(predicate).ToListAsync();
    }

    public virtual async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public virtual async Task UpdateAsync(T entity)
    {
        entity.UpdatedAt = DateTime.UtcNow;
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public virtual async Task DeleteAsync(int id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            entity.IsActive = false; // Soft delete
            await UpdateAsync(entity);
        }
    }

    public virtual async Task<bool> ExistsAsync(int id)
    {
        return await _dbSet.AnyAsync(e => e.Id == id);
    }

    public virtual IQueryable<T> Query()
    {
        return _dbSet.Where(e => e.IsActive);
    }
}`,

  unitOfWork: `
public interface IUnitOfWork : IDisposable
{
    IRepository<Department> Departments { get; }
    IStudentRepository Students { get; }
    IDoctorRepository Doctors { get; }
    ICourseRepository Courses { get; }
    ICourseAssignmentRepository CourseAssignments { get; }
    IEnrollmentRepository Enrollments { get; }
    IGradeRepository Grades { get; }
    Task<int> SaveChangesAsync();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly UniversityDbContext _context;

    public IRepository<Department> Departments { get; private set; }
    public IStudentRepository Students { get; private set; }
    public IDoctorRepository Doctors { get; private set; }
    public ICourseRepository Courses { get; private set; }
    public ICourseAssignmentRepository CourseAssignments { get; private set; }
    public IEnrollmentRepository Enrollments { get; private set; }
    public IGradeRepository Grades { get; private set; }

    public UnitOfWork(UniversityDbContext context)
    {
        _context = context;
        Departments = new Repository<Department>(context);
        Students = new StudentRepository(context);
        Doctors = new DoctorRepository(context);
        Courses = new CourseRepository(context);
        CourseAssignments = new CourseAssignmentRepository(context);
        Enrollments = new EnrollmentRepository(context);
        Grades = new GradeRepository(context);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}`,

  specificRepositories: `
// Student Repository with specialized queries
public interface IStudentRepository : IRepository<Student>
{
    Task<Student> GetStudentWithDetailsAsync(int id);
    Task<IEnumerable<Student>> GetStudentsByDepartmentAsync(int departmentId);
    Task<IEnumerable<Student>> GetStudentsBySemesterAsync(int semester);
    Task<Student> GetStudentByUserIdAsync(string userId);
}

public class StudentRepository : Repository<Student>, IStudentRepository
{
    public StudentRepository(UniversityDbContext context) : base(context) { }

    public async Task<Student> GetStudentWithDetailsAsync(int id)
    {
        return await _dbSet
            .Include(s => s.User)
            .Include(s => s.Department)
            .Include(s => s.Enrollments)
                .ThenInclude(e => e.CourseAssignment)
                    .ThenInclude(ca => ca.Course)
            .Include(s => s.Enrollments)
                .ThenInclude(e => e.Grade)
            .FirstOrDefaultAsync(s => s.Id == id && s.IsActive);
    }

    public async Task<IEnumerable<Student>> GetStudentsByDepartmentAsync(int departmentId)
    {
        return await _dbSet
            .Include(s => s.User)
            .Where(s => s.DepartmentId == departmentId && s.IsActive)
            .ToListAsync();
    }

    public async Task<IEnumerable<Student>> GetStudentsBySemesterAsync(int semester)
    {
        return await _dbSet
            .Include(s => s.User)
            .Include(s => s.Department)
            .Where(s => s.CurrentSemester == semester && s.IsActive)
            .ToListAsync();
    }

    public async Task<Student> GetStudentByUserIdAsync(string userId)
    {
        return await _dbSet
            .Include(s => s.User)
            .Include(s => s.Department)
            .FirstOrDefaultAsync(s => s.UserId == userId && s.IsActive);
    }
}`
};

// ============================================
// SERVICES LAYER
// ============================================

export const servicesLayer = {
  studentService: `
public interface IStudentService
{
    Task<IEnumerable<StudentListViewModel>> GetAllStudentsAsync();
    Task<StudentDetailsViewModel> GetStudentDetailsAsync(int id);
    Task<StudentCreateEditViewModel> GetStudentForEditAsync(int id);
    Task<int> CreateStudentAsync(StudentCreateEditViewModel model);
    Task UpdateStudentAsync(StudentCreateEditViewModel model);
    Task DeleteStudentAsync(int id);
    Task<bool> EnrollStudentAsync(int studentId, int courseAssignmentId);
    Task<decimal> CalculateGPAAsync(int studentId);
}

public class StudentService : IStudentService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly UserManager<ApplicationUser> _userManager;

    public StudentService(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager)
    {
        _unitOfWork = unitOfWork;
        _userManager = userManager;
    }

    public async Task<IEnumerable<StudentListViewModel>> GetAllStudentsAsync()
    {
        var students = await _unitOfWork.Students.Query()
            .Include(s => s.User)
            .Include(s => s.Department)
            .Select(s => new StudentListViewModel
            {
                Id = s.Id,
                StudentId = s.StudentId,
                FullName = s.User.FullName,
                Email = s.User.Email,
                DepartmentName = s.Department.Name,
                CurrentSemester = s.CurrentSemester,
                AcademicStatus = s.AcademicStatus,
                GPA = s.GPA
            })
            .ToListAsync();

        return students;
    }

    public async Task<int> CreateStudentAsync(StudentCreateEditViewModel model)
    {
        // Create ApplicationUser
        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email,
            FirstName = model.FirstName,
            LastName = model.LastName,
            PhoneNumber = model.PhoneNumber,
            DateOfBirth = model.DateOfBirth,
            Gender = model.Gender,
            Address = model.Address
        };

        var result = await _userManager.CreateAsync(user, GenerateDefaultPassword());
        if (!result.Succeeded)
            throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));

        await _userManager.AddToRoleAsync(user, "Student");

        // Create Student
        var student = new Student
        {
            UserId = user.Id,
            StudentId = await GenerateStudentIdAsync(),
            DepartmentId = model.DepartmentId,
            EnrollmentDate = DateTime.UtcNow,
            CurrentSemester = 1,
            AcademicStatus = "Active"
        };

        await _unitOfWork.Students.AddAsync(student);
        return student.Id;
    }

    public async Task<decimal> CalculateGPAAsync(int studentId)
    {
        var enrollments = await _unitOfWork.Enrollments.Query()
            .Include(e => e.Grade)
            .Include(e => e.CourseAssignment)
                .ThenInclude(ca => ca.Course)
            .Where(e => e.StudentId == studentId && e.Grade != null && e.Status == "Completed")
            .ToListAsync();

        if (!enrollments.Any())
            return 0;

        var totalCredits = 0;
        decimal totalPoints = 0;

        foreach (var enrollment in enrollments)
        {
            var credits = enrollment.CourseAssignment.Course.CreditHours;
            var gradePoints = enrollment.Grade.GradePoints ?? 0;

            totalCredits += credits;
            totalPoints += credits * gradePoints;
        }

        return totalCredits > 0 ? Math.Round(totalPoints / totalCredits, 2) : 0;
    }

    private async Task<string> GenerateStudentIdAsync()
    {
        var year = DateTime.Now.Year;
        var count = await _unitOfWork.Students.Query()
            .CountAsync(s => s.StudentId.StartsWith($"STU-{year}"));
        return $"STU-{year}-{(count + 1):D3}";
    }

    private string GenerateDefaultPassword()
    {
        return "Student@123"; // In production, generate random or send via email
    }
}`,

  gradeService: `
public interface IGradeService
{
    Task<CourseGradesViewModel> GetCourseGradesAsync(int courseAssignmentId);
    Task SaveGradesAsync(CourseGradesViewModel model);
    Task<GradeViewModel> GetStudentGradeAsync(int enrollmentId);
    (string LetterGrade, decimal GradePoints) CalculateLetterGrade(decimal totalScore);
}

public class GradeService : IGradeService
{
    private readonly IUnitOfWork _unitOfWork;

    public GradeService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task SaveGradesAsync(CourseGradesViewModel model)
    {
        foreach (var gradeEntry in model.StudentGrades)
        {
            var grade = await _unitOfWork.Grades.GetByEnrollmentIdAsync(gradeEntry.EnrollmentId);
            
            if (grade == null)
            {
                grade = new Grade { EnrollmentId = gradeEntry.EnrollmentId };
            }

            grade.MidtermScore = gradeEntry.MidtermScore;
            grade.FinalScore = gradeEntry.FinalScore;
            grade.AssignmentScore = gradeEntry.AssignmentScore;
            grade.AttendanceScore = gradeEntry.AttendanceScore;

            // Calculate total score (weighted)
            grade.TotalScore = CalculateTotalScore(gradeEntry);

            // Calculate letter grade and grade points
            var (letterGrade, gradePoints) = CalculateLetterGrade(grade.TotalScore ?? 0);
            grade.LetterGrade = letterGrade;
            grade.GradePoints = gradePoints;
            grade.GradedAt = DateTime.UtcNow;

            if (grade.Id == 0)
                await _unitOfWork.Grades.AddAsync(grade);
            else
                await _unitOfWork.Grades.UpdateAsync(grade);

            // Update enrollment status if fully graded
            if (grade.TotalScore.HasValue)
            {
                var enrollment = await _unitOfWork.Enrollments.GetByIdAsync(gradeEntry.EnrollmentId);
                enrollment.Status = grade.TotalScore >= 50 ? "Completed" : "Failed";
                await _unitOfWork.Enrollments.UpdateAsync(enrollment);
            }
        }

        await _unitOfWork.SaveChangesAsync();
    }

    private decimal CalculateTotalScore(GradeEntryViewModel entry)
    {
        decimal total = 0;
        if (entry.MidtermScore.HasValue) total += entry.MidtermScore.Value * 0.30m;
        if (entry.FinalScore.HasValue) total += entry.FinalScore.Value * 0.40m;
        if (entry.AssignmentScore.HasValue) total += entry.AssignmentScore.Value * 0.20m;
        if (entry.AttendanceScore.HasValue) total += entry.AttendanceScore.Value * 0.10m;
        return Math.Round(total, 2);
    }

    public (string LetterGrade, decimal GradePoints) CalculateLetterGrade(decimal totalScore)
    {
        return totalScore switch
        {
            >= 90 => ("A", 4.0m),
            >= 85 => ("B+", 3.5m),
            >= 80 => ("B", 3.0m),
            >= 75 => ("C+", 2.5m),
            >= 70 => ("C", 2.0m),
            >= 65 => ("D+", 1.5m),
            >= 60 => ("D", 1.0m),
            _ => ("F", 0.0m)
        };
    }
}`
};

// ============================================
// CONTROLLERS
// ============================================

export const controllers = {
  studentController: `
[Authorize(Roles = "Admin")]
public class StudentController : Controller
{
    private readonly IStudentService _studentService;
    private readonly IDepartmentService _departmentService;

    public StudentController(IStudentService studentService, IDepartmentService departmentService)
    {
        _studentService = studentService;
        _departmentService = departmentService;
    }

    // GET: Student
    public async Task<IActionResult> Index()
    {
        var students = await _studentService.GetAllStudentsAsync();
        return View(students);
    }

    // GET: Student/Details/5
    public async Task<IActionResult> Details(int id)
    {
        var student = await _studentService.GetStudentDetailsAsync(id);
        if (student == null)
            return NotFound();

        return View(student);
    }

    // GET: Student/Create
    public async Task<IActionResult> Create()
    {
        var model = new StudentCreateEditViewModel
        {
            Departments = await _departmentService.GetDepartmentSelectListAsync()
        };
        return View(model);
    }

    // POST: Student/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(StudentCreateEditViewModel model)
    {
        if (!ModelState.IsValid)
        {
            model.Departments = await _departmentService.GetDepartmentSelectListAsync();
            return View(model);
        }

        try
        {
            await _studentService.CreateStudentAsync(model);
            TempData["Success"] = "Student created successfully!";
            return RedirectToAction(nameof(Index));
        }
        catch (Exception ex)
        {
            ModelState.AddModelError("", ex.Message);
            model.Departments = await _departmentService.GetDepartmentSelectListAsync();
            return View(model);
        }
    }

    // GET: Student/Edit/5
    public async Task<IActionResult> Edit(int id)
    {
        var model = await _studentService.GetStudentForEditAsync(id);
        if (model == null)
            return NotFound();

        model.Departments = await _departmentService.GetDepartmentSelectListAsync();
        return View(model);
    }

    // POST: Student/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, StudentCreateEditViewModel model)
    {
        if (id != model.Id)
            return NotFound();

        if (!ModelState.IsValid)
        {
            model.Departments = await _departmentService.GetDepartmentSelectListAsync();
            return View(model);
        }

        try
        {
            await _studentService.UpdateStudentAsync(model);
            TempData["Success"] = "Student updated successfully!";
            return RedirectToAction(nameof(Index));
        }
        catch (Exception ex)
        {
            ModelState.AddModelError("", ex.Message);
            model.Departments = await _departmentService.GetDepartmentSelectListAsync();
            return View(model);
        }
    }

    // POST: Student/Delete/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _studentService.DeleteStudentAsync(id);
            TempData["Success"] = "Student deleted successfully!";
        }
        catch (Exception ex)
        {
            TempData["Error"] = ex.Message;
        }
        return RedirectToAction(nameof(Index));
    }
}`,

  gradeController: `
[Authorize(Roles = "Admin,Doctor")]
public class GradeController : Controller
{
    private readonly IGradeService _gradeService;
    private readonly ICourseAssignmentService _courseAssignmentService;

    public GradeController(IGradeService gradeService, ICourseAssignmentService courseAssignmentService)
    {
        _gradeService = gradeService;
        _courseAssignmentService = courseAssignmentService;
    }

    // GET: Grade/CourseGrades/5
    public async Task<IActionResult> CourseGrades(int courseAssignmentId)
    {
        var model = await _gradeService.GetCourseGradesAsync(courseAssignmentId);
        if (model == null)
            return NotFound();

        return View(model);
    }

    // POST: Grade/SaveGrades
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> SaveGrades(CourseGradesViewModel model)
    {
        if (!ModelState.IsValid)
            return View("CourseGrades", model);

        try
        {
            await _gradeService.SaveGradesAsync(model);
            TempData["Success"] = "Grades saved successfully!";
            return RedirectToAction(nameof(CourseGrades), new { courseAssignmentId = model.CourseAssignmentId });
        }
        catch (Exception ex)
        {
            ModelState.AddModelError("", ex.Message);
            return View("CourseGrades", model);
        }
    }
}`,

  accountController: `
public class AccountController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AccountController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    // GET: Account/Login
    [HttpGet]
    public IActionResult Login(string returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }

    // POST: Account/Login
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;

        if (!ModelState.IsValid)
            return View(model);

        var result = await _signInManager.PasswordSignInAsync(
            model.Email, model.Password, model.RememberMe, lockoutOnFailure: true);

        if (result.Succeeded)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            var roles = await _userManager.GetRolesAsync(user);

            // Redirect based on role
            if (roles.Contains("Admin"))
                return RedirectToAction("Index", "Dashboard", new { area = "Admin" });
            else if (roles.Contains("Doctor"))
                return RedirectToAction("Index", "Dashboard", new { area = "Doctor" });
            else if (roles.Contains("Student"))
                return RedirectToAction("Index", "Dashboard", new { area = "Student" });

            return RedirectToLocal(returnUrl);
        }

        if (result.IsLockedOut)
        {
            return View("Lockout");
        }

        ModelState.AddModelError("", "Invalid login attempt.");
        return View(model);
    }

    // POST: Account/Logout
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return RedirectToAction("Login");
    }

    private IActionResult RedirectToLocal(string returnUrl)
    {
        if (Url.IsLocalUrl(returnUrl))
            return Redirect(returnUrl);
        else
            return RedirectToAction("Index", "Home");
    }
}`
};

// ============================================
// SEED DATA
// ============================================

export const seedData = `
public static class DbInitializer
{
    public static async Task SeedAsync(
        UniversityDbContext context,
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager)
    {
        // Seed Roles
        string[] roles = { "Admin", "Doctor", "Student" };
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        // Seed Admin User
        var adminEmail = "admin@university.edu";
        if (await userManager.FindByEmailAsync(adminEmail) == null)
        {
            var admin = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                FirstName = "System",
                LastName = "Administrator",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(admin, "Admin@123");
            await userManager.AddToRoleAsync(admin, "Admin");
        }

        // Seed Departments
        if (!context.Departments.Any())
        {
            var departments = new[]
            {
                new Department { Name = "Computer Science", Code = "CS", Description = "Department of Computer Science and Information Technology" },
                new Department { Name = "Mathematics", Code = "MATH", Description = "Department of Mathematics and Statistics" },
                new Department { Name = "Physics", Code = "PHY", Description = "Department of Physics and Applied Sciences" },
                new Department { Name = "Business Administration", Code = "BA", Description = "Department of Business Administration and Management" },
                new Department { Name = "English Literature", Code = "ENG", Description = "Department of English Language and Literature" }
            };
            context.Departments.AddRange(departments);
            await context.SaveChangesAsync();
        }

        // Seed Doctors
        var csDept = await context.Departments.FirstOrDefaultAsync(d => d.Code == "CS");
        if (csDept != null && !context.Doctors.Any())
        {
            var doctorData = new[]
            {
                ("dr.ahmed@university.edu", "Ahmed", "Hassan", "Machine Learning", "Professor"),
                ("dr.sara@university.edu", "Sara", "Ali", "Database Systems", "Associate Professor"),
                ("dr.omar@university.edu", "Omar", "Khalil", "Software Engineering", "Assistant Professor")
            };

            foreach (var (email, firstName, lastName, specialization, rank) in doctorData)
            {
                var user = new ApplicationUser
                {
                    UserName = email,
                    Email = email,
                    FirstName = firstName,
                    LastName = lastName,
                    EmailConfirmed = true,
                    DateOfBirth = new DateTime(1975, 1, 1)
                };
                await userManager.CreateAsync(user, "Doctor@123");
                await userManager.AddToRoleAsync(user, "Doctor");

                var doctor = new Doctor
                {
                    UserId = user.Id,
                    EmployeeId = $"DOC-2020-{context.Doctors.Count() + 1:D3}",
                    DepartmentId = csDept.Id,
                    Specialization = specialization,
                    AcademicRank = rank,
                    HireDate = DateTime.UtcNow.AddYears(-5),
                    OfficeLocation = $"Building A, Room {100 + context.Doctors.Count()}"
                };
                context.Doctors.Add(doctor);
            }
            await context.SaveChangesAsync();
        }

        // Seed Courses
        if (csDept != null && !context.Courses.Any())
        {
            var courses = new[]
            {
                new Course { CourseCode = "CS-101", Title = "Introduction to Programming", Description = "Fundamentals of programming using Python", CreditHours = 3, DepartmentId = csDept.Id, Semester = 1, CourseType = "Required" },
                new Course { CourseCode = "CS-102", Title = "Data Structures", Description = "Arrays, linked lists, trees, graphs", CreditHours = 3, DepartmentId = csDept.Id, Semester = 2, CourseType = "Required" },
                new Course { CourseCode = "CS-201", Title = "Database Systems", Description = "Relational databases and SQL", CreditHours = 3, DepartmentId = csDept.Id, Semester = 3, CourseType = "Required" },
                new Course { CourseCode = "CS-202", Title = "Software Engineering", Description = "Software development lifecycle and methodologies", CreditHours = 3, DepartmentId = csDept.Id, Semester = 4, CourseType = "Required" },
                new Course { CourseCode = "CS-301", Title = "Machine Learning", Description = "Introduction to ML algorithms and applications", CreditHours = 3, DepartmentId = csDept.Id, Semester = 5, CourseType = "Elective" },
                new Course { CourseCode = "CS-302", Title = "Web Development", Description = "Modern web technologies and frameworks", CreditHours = 3, DepartmentId = csDept.Id, Semester = 5, CourseType = "Elective" }
            };
            context.Courses.AddRange(courses);
            await context.SaveChangesAsync();
        }

        // Seed Students
        if (csDept != null && !context.Students.Any())
        {
            for (int i = 1; i <= 10; i++)
            {
                var email = $"student{i}@university.edu";
                var user = new ApplicationUser
                {
                    UserName = email,
                    Email = email,
                    FirstName = $"Student{i}",
                    LastName = $"User{i}",
                    EmailConfirmed = true,
                    DateOfBirth = new DateTime(2000, 1, 1).AddMonths(i)
                };
                await userManager.CreateAsync(user, "Student@123");
                await userManager.AddToRoleAsync(user, "Student");

                var student = new Student
                {
                    UserId = user.Id,
                    StudentId = $"STU-2024-{i:D3}",
                    DepartmentId = csDept.Id,
                    EnrollmentDate = DateTime.UtcNow.AddMonths(-6),
                    CurrentSemester = (i % 4) + 1,
                    AcademicStatus = "Active"
                };
                context.Students.Add(student);
            }
            await context.SaveChangesAsync();
        }
    }
}`;

// ============================================
// PROGRAM.CS CONFIGURATION
// ============================================

export const programConfiguration = `
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllersWithViews();

// Configure Entity Framework
builder.Services.AddDbContext<UniversityDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<UniversityDbContext>()
.AddDefaultTokenProviders();

// Configure Cookie
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.ExpireTimeSpan = TimeSpan.FromHours(1);
});

// Register Repositories
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// Register Services
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<IDoctorService, DoctorService>();
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IEnrollmentService, EnrollmentService>();
builder.Services.AddScoped<IGradeService, GradeService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Seed Database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<UniversityDbContext>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    
    await context.Database.MigrateAsync();
    await DbInitializer.SeedAsync(context, userManager, roleManager);
}

app.MapControllerRoute(
    name: "areas",
    pattern: "{area:exists}/{controller=Dashboard}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();`;

// ============================================
// FOLDER STRUCTURE
// ============================================

export const folderStructure = `
UniversityManagementSystem/
├── Controllers/
│   ├── AccountController.cs
│   ├── HomeController.cs
│   └── ErrorController.cs
├── Areas/
│   ├── Admin/
│   │   ├── Controllers/
│   │   │   ├── DashboardController.cs
│   │   │   ├── StudentController.cs
│   │   │   ├── DoctorController.cs
│   │   │   ├── CourseController.cs
│   │   │   ├── DepartmentController.cs
│   │   │   └── EnrollmentController.cs
│   │   └── Views/
│   │       ├── Dashboard/
│   │       ├── Student/
│   │       ├── Doctor/
│   │       ├── Course/
│   │       ├── Department/
│   │       └── Enrollment/
│   ├── Doctor/
│   │   ├── Controllers/
│   │   │   ├── DashboardController.cs
│   │   │   ├── CourseController.cs
│   │   │   └── GradeController.cs
│   │   └── Views/
│   │       ├── Dashboard/
│   │       ├── Course/
│   │       └── Grade/
│   └── Student/
│       ├── Controllers/
│       │   ├── DashboardController.cs
│       │   ├── EnrollmentController.cs
│       │   └── GradeController.cs
│       └── Views/
│           ├── Dashboard/
│           ├── Enrollment/
│           └── Grade/
├── Data/
│   ├── UniversityDbContext.cs
│   └── DbInitializer.cs
├── Models/
│   ├── Entities/
│   │   ├── BaseEntity.cs
│   │   ├── ApplicationUser.cs
│   │   ├── Department.cs
│   │   ├── Student.cs
│   │   ├── Doctor.cs
│   │   ├── Course.cs
│   │   ├── CourseAssignment.cs
│   │   ├── Enrollment.cs
│   │   └── Grade.cs
│   └── ViewModels/
│       ├── Account/
│       │   ├── LoginViewModel.cs
│       │   └── RegisterViewModel.cs
│       ├── Student/
│       │   ├── StudentListViewModel.cs
│       │   ├── StudentDetailsViewModel.cs
│       │   └── StudentCreateEditViewModel.cs
│       ├── Doctor/
│       ├── Course/
│       ├── Enrollment/
│       └── Grade/
├── Repositories/
│   ├── Interfaces/
│   │   ├── IRepository.cs
│   │   ├── IStudentRepository.cs
│   │   ├── IDoctorRepository.cs
│   │   └── ...
│   ├── Implementations/
│   │   ├── Repository.cs
│   │   ├── StudentRepository.cs
│   │   └── ...
│   └── UnitOfWork.cs
├── Services/
│   ├── Interfaces/
│   │   ├── IStudentService.cs
│   │   ├── IDoctorService.cs
│   │   └── ...
│   └── Implementations/
│       ├── StudentService.cs
│       ├── DoctorService.cs
│       └── ...
├── Views/
│   ├── Shared/
│   │   ├── _Layout.cshtml
│   │   ├── _LayoutAdmin.cshtml
│   │   ├── _Sidebar.cshtml
│   │   ├── _ValidationScriptsPartial.cshtml
│   │   └── Error.cshtml
│   ├── Account/
│   │   ├── Login.cshtml
│   │   └── AccessDenied.cshtml
│   └── Home/
│       └── Index.cshtml
├── wwwroot/
│   ├── css/
│   │   └── site.css
│   ├── js/
│   │   └── site.js
│   └── lib/
│       └── bootstrap/
├── appsettings.json
└── Program.cs
`;
