import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Client } from '../Model/class/client';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { APIResponseModel, Employee } from '../Model/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  getAllClients(): Observable<Client[]> {
  return this.http.get<Client[]>(environment.API_URL + 'clients');
}
  // Add new client
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(environment.API_URL + 'clients', client);
  }

  // Update client
  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(environment.API_URL + 'clients/' + client.id, client);
  }

  // Delete client
  deleteClient(id: any): Observable<any> {
    return this.http.delete(environment.API_URL + 'clients/'+id);
  }
  getAllEmployees():Observable<any>{
    return this.http.get("http://localhost:3000/employees");
  }
  addClientProjectUpdate(obj: any): Observable<any> {
    return this.http.post("http://localhost:3000/clientProjects", obj);
  }

  updateClientProject(obj: any): Observable<any> {
    return this.http.put(`http://localhost:3000/clientProjects/${obj.id}`, obj)
      .pipe(
        catchError((error: any) => {
          console.error('Update project failed:', error);
          return throwError(() => error);
        })
      );
  }

  deleteClientProject(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/clientProjects/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Delete project failed:', error);
          return throwError(() => error);
        })
      );
  }
  getAllClientProjects():Observable<any>{
    return this.http.get("http://localhost:3000/clientProjects");
  }
  addnewEmployee(employee: Employee): Observable<any> {
    return this.http.post("http://localhost:3000/employees", employee);
  }
  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(`http://localhost:3000/employees/${employee.id}`, employee);
  }
  deleteEmployee(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/employees/${id}`);
  }
}
