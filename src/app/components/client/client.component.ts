import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../Model/class/client';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { ClientService } from '../../service/client.service';
import { APIResponseModel } from '../../Model/interface/interface';

@Component({
  selector: 'app-client',
  imports: [FormsModule,CommonModule,UpperCasePipe,DatePipe],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{
  clientObj:Client=new Client();
  clientList:Client[]=[];
  clientService=inject(ClientService);
  currentDate: Date = new Date();
  isEditMode: boolean = false;
  ngOnInit(){
    this.LoadClients();
  }
  LoadClients(){
    this.clientService.getAllClients().subscribe((res:any)=>{
      this.clientList=res;
    }
    )
  }
  onSaveClient(){
    if (this.isEditMode) {
      this.clientService.updateClient(this.clientObj).subscribe((res:any)=>{
        if(res!==null){
          alert("Client Updated successfully");
          this.LoadClients();
          this.clientObj=new Client();
          this.isEditMode = false;
        }
        else{
          alert("Failed to update Client")
        }
      })
    } else {
      // Remove id property so json-server auto-generates a unique id
      const { id, ...clientData } = this.clientObj;
      this.clientService.addClient(clientData as Client).subscribe((res:any)=>{
        if(res!==null){
          alert("Client Added successfully");
          this.LoadClients();
          this.clientObj=new Client();
        }
        else{
          alert("Failed to add Client")
        }
      })
    }
  }
  onDelete(id: any) {
    const isDelete = confirm("Are you sure to delete Client");
    if (isDelete) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          alert("Client Deleted successfully");
          this.LoadClients();
        },
        error: () => {
          alert("Failed to delete Client");
        }
      });
    }
  }
  onEdit(data:Client){
    this.clientObj = { ...data };
    this.isEditMode = true;
  }
  resetClientForm(form: any) {
    if (form && form.resetForm) {
      form.resetForm();
    }
    this.clientObj = new Client();
    this.isEditMode = false;
  }


}
