import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../Model/interface/interface';
import { ClientService } from '../../service/client.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employeeList: Employee[] = [];
  isEditMode: boolean = false;
  newEmployee: Employee = {
    id: 0,
    empName: '',
    empId: 0,
    empCode: '',
    empEmailId: '',
    empDesignation: '',
    role: ''
  };
  employeeService = inject(ClientService);

  ngOnInit() {
    this.LoadEmployees();
  }
  LoadEmployees() {
    this.employeeService.getAllEmployees().subscribe((res: any) => {
      this.employeeList = res;
    });
  }

  onSaveEmployee() {
    // Remove id property so json-server auto-generates a unique id
    const { id, ...employeeData } = this.newEmployee;
    this.employeeService.addnewEmployee(employeeData as Employee).subscribe((res: any) => {
      if (res !== null) {
        alert("Employee Added successfully");
        this.LoadEmployees();
        this.resetForm();
      }
      this.newEmployee = {
        id: 0,
        empName: '',
        empId: 0,
        empCode: '',
        empEmailId: '',
        empDesignation: '',
        role: ''
      };
    })
  }

  onUpdateEmployee() {
    // Use id for update
    if (!this.newEmployee.id) {
      alert('Employee ID is missing. Cannot update.');
      return;
    }
    this.employeeService.updateEmployee(this.newEmployee).subscribe((res: any) => {
      if (res !== null) {
        alert("Employee Updated successfully");
        this.LoadEmployees();
        this.resetForm();
      }
    })
  }
  onEditEmployee(employee: Employee) {
    this.isEditMode = true;
    this.newEmployee = { ...employee };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetForm() {
    this.newEmployee = {
      id: 0,
      empName: '',
      empId: 0,
      empCode: '',
      empEmailId: '',
      empDesignation: '',
      role: ''
    };
  }
  onDelete(id: any) {
    const isDelete = confirm("Are you sure to delete Employee");
    if (isDelete) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          alert("Employee Deleted successfully");
          this.LoadEmployees();
        },
        error: () => {
          alert("Failed to delete Employee");
        }
      });
    }
  }
}
