import { Component, OnInit } from '@angular/core';
import { RestService } from "../rest.service";
import { Employee } from "../shared/employee";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent
{
    restService : RestService;
    employees : Employee[];

    constructor(restService : RestService) 
    {
        this.restService = restService;
        this.employees = [];

        this.loadEmployees();
    }

    //nel template in (click) non si possono chiamare funzioni globali, quindi c'è questa funzione che media
    prompt(message : string) : any
    {
        return window.prompt(message);
    }

    loadEmployees() : void
    {
        this.restService.getData("http://localhost:4200/api/tutorial/1.0/employees")
            .subscribe(data => this.employees = data);
    }

    addNewEmployee(firstName : string, lastName : string, email : string, phone : string) : void
    {
        let emp : Employee = {
			employeeId: Math.floor(Math.random() * 1000000),
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone
		};

        this.restService.postData("http://localhost:4200/api/tutorial/1.0/employees", emp)
            .subscribe(data => this.loadEmployees());
    }

    removeEmployee(id : number) : void
    {
        this.restService.deleteData("http://localhost:4200/api/tutorial/1.0/employees/" + id)
            .subscribe(data => this.loadEmployees());
    }

    updateEmployee(id : number, firstName : string, lastName : string, email : string, phone : string) : void
    {
        let emp : Employee = {
			employeeId: id,
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone
		};

        this.restService.putData("http://localhost:4200/api/tutorial/1.0/employees/" + id, emp)
            .subscribe(data => this.loadEmployees());
    }
}
