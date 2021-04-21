import { Component, OnInit } from '@angular/core';
import { RestService } from "../rest.service";
import { Student } from "../shared/student";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent
{
    restService : RestService;
    students : Student[];

    constructor(restService : RestService) 
    {
        this.restService = restService;
        this.students = [];

        this.loadStudents();
    }

    //nel template in (click) non si possono chiamare funzioni globali, quindi c'è questa funzione che media
    prompt(message : string) : any
    {
        return window.prompt(message);
    }

    loadStudents() : void
    {
        this.restService.getData("http://localhost:4200/api/student.php")
            .subscribe(data => this.students = data);
    }

    addNewStudent(name : string, surname : string, sidi_code : string, tax_code : string) : void
    {
        let st : Student = {
			id: Math.floor(Math.random() * 1000000),
			name: name,
			surname: surname,
			sidi_code: sidi_code,
			tax_code: tax_code
		};

        this.restService.postData("http://localhost:4200/api/student.php", st)
            .subscribe(data => this.loadStudents());
    }

    removeStudent(id : number) : void
    {
        let st : Student = {
			id: id,
			name: "",
			surname: "",
			sidi_code: "",
			tax_code: ""
		};

        this.restService.deleteData("http://localhost:4200/api/student.php", st)
            .subscribe(data => this.loadStudents());
    }

    updateStudent(id : number, name : string, surname : string, sidi_code : string, tax_code : string) : void
    {
        let st : Student = {
			id: id,
			name: name,
			surname: surname,
			sidi_code: sidi_code,
			tax_code: tax_code
		};

        this.restService.putData("http://localhost:4200/api/student.php", st)
            .subscribe(data => this.loadStudents());
    }
}
