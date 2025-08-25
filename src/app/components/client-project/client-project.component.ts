import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ClientService } from '../../service/client.service';
import { ClientProject, Employee } from '../../Model/interface/interface';
import { Client } from '../../Model/class/client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit{
  onResetForm() {
    this.projectForm.reset();
    this.editMode = false;
  }
  isSubmitting: boolean = false;
  editMode: boolean = false;
  onEditProject(project: ClientProject) {
    this.projectForm.patchValue({ ...project, id: project.id });
    this.editMode = true;
  }

  onUpdateProject() {
    this.isSubmitting = true;
    const formValue = this.projectForm.value;
    if (!formValue.id) {
      alert('Project ID is missing. Cannot update.');
      this.isSubmitting = false;
      return;
    }
    this.clientService.updateClientProject(formValue).subscribe({
      next: () => {
        alert('Project Updated successfully');
        this.projectForm.reset();
        this.editMode = false;
        this.isSubmitting = false;
        this.getAllClientProjects();
      },
      error: () => {
        alert('Failed to update Project');
        this.isSubmitting = false;
      }
    });
  }

  onDeleteProject(id: string) {
    const isDelete = confirm('Are you sure to delete this project?');
    if (isDelete) {
      this.clientService.deleteClientProject(id).subscribe({
        next: () => {
          alert('Project Deleted successfully');
          this.getAllClientProjects();
        },
        error: () => {
          alert('Failed to delete Project');
        }
      });
    }
  }

  projectForm:FormGroup=new FormGroup({
    id: new FormControl(''),
    clientProjectId: new FormControl(0),
    projectName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    startDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    expectedEndDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    leadByEmpId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    completedDate: new FormControl(''),
    contactPerson: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    contactPersonContactNo: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern('^[0-9]{10}$')] }),
    totalEmpWorking: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    projectCost: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    projectDetails: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
    contactPersonEmailId: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    clientId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
  // Add import for Validators
  constructor() {}

  clientService=inject(ClientService);
  employeeList:Employee[]=[];
  clientList:Client[]=[];
  projectList: ClientProject[] = [];

  ngOnInit(){
  this.getAllClients();
  this.getAllEmployees();
  this.getAllClientProjects();
  }
  getAllEmployees(){
    this.clientService.getAllEmployees().subscribe((res:any)=>{
      this.employeeList=res;
    })
  }
  getAllClients(){
    this.clientService.getAllClients().subscribe((res:any)=>{
      this.clientList=res;
    })
  }
  OnSaveProject(){
    const formValue=this.projectForm.value;
    debugger;
    this.clientService.addClientProjectUpdate(formValue).subscribe((res:any)=>{
      if(res!==null){
        alert("Project Added successfully");
        this.projectForm.reset();
        this.getAllClientProjects();
      }
      else{
        alert("Failed to add Project")
      }
    })
  }
  getAllClientProjects(){
    this.clientService.getAllClientProjects().subscribe((res:any)=>{
  this.projectList = res;
    })
  }
}
