export class Client {
  id: number;
  contactPersonName: string;
  companyName: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  employeeStrength: number;
  gstNo: string;
  contactNo: string;
  regNo: string;

  constructor() {
    this.id = 0;
    this.contactPersonName = "";
    this.companyName = "";
    this.address = "";
    this.city = "";
    this.pincode = "";
    this.state = "";
    this.employeeStrength = 0;
    this.gstNo = "";
    this.contactNo = "";
    this.regNo = "";
  }
}