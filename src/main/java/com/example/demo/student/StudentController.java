package com.example.demo.student;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/students")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        try {
            return studentService.getAllStudents();
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    @GetMapping(path = "{studentId}")
    public Student getStudent(@PathVariable Long studentId) {

        return studentService.getStudent(studentId);
    }

    @PostMapping
    public void addStudent(@Valid @RequestBody Student student) {

        studentService.addStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    public void deleteStudent(@PathVariable Long studentId) {
        studentService.deleteStudent(studentId);
    }

}
