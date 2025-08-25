export interface IRole{
    roleId:number,
    role:string
}
export interface IDesignation{
    designationId:number,
    designation:string
}
export interface APIResponseModel{
    message:string,
    result:boolean,
    data:any
}
export interface Employee {
  id: number;
  empName: string;
  empId: number;
  empCode: string;
  empEmailId: string;
  empDesignation: string;
  role: string;
}
export interface ClientProject {
    id: string;
  clientProjectId: number;
  projectName: string;
  startDate: string;
  expectedEndDate: string;
  leadByEmpId: number;
  completedDate: string;
  contactPerson: string;
  contactPersonContactNo: string;
  totalEmpWorking: number;
  projectCost: number;
  projectDetails: string;
  contactPersonEmailId: string;
  clientId: number;
}

