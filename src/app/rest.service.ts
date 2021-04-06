import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from "rxjs/operators";
import { Employee } from "./shared/employee";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  	providedIn: 'root'
})
export class RestService 
{
	constructor(private http : HttpClient) 
	{ }
	
	getData(apiUrl : string) : Observable<Employee[]>
	{
        return this.http.get<Employee[]>(apiUrl)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
	}

	postData(apiUrl : string, body : any) : Observable<Employee[]>
	{
		return this.http.post<Employee[]>(apiUrl, body)
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}
	
	deleteData(apiUrl : string) : Observable<Employee[]>
	{
		return this.http.delete<Employee[]>(apiUrl)
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}

	putData(apiUrl : string, body : any) : Observable<Employee[]>
	{
		return this.http.put<Employee[]>(apiUrl, body)
			.pipe(
				retry(1),
				catchError(this.handleError)
			);
	}

    private handleError(handleError: any): import("rxjs").OperatorFunction<Employee[], any> 
    {
        throw new Error('Method not implemented.');
    }
}
