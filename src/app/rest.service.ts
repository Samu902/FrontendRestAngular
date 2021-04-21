import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from "rxjs/operators";
import { Student } from "./shared/student";
import { HttpClient, HttpHeaders, JsonpClientBackend } from "@angular/common/http";

@Injectable({
  	providedIn: 'root'
})
export class RestService 
{
	constructor(private http : HttpClient) 
	{ }
	
	getData(apiUrl : string) : Observable<Student[]>
	{
        return this.http.get<Student[]>(apiUrl)
            .pipe(
                retry(1)
            );
	}

	postData(apiUrl : string, body : any) : Observable<Student[]>
	{
		return this.http.post<Student[]>(apiUrl, body)
			.pipe(
				retry(1)
			);
	}
	
	deleteData(apiUrl : string, body : any) : Observable<Student[]>
	{
		const options = {
			headers: new HttpHeaders({
			    'Content-Type': 'application/json'
			}),
			body: body
        }

		return this.http.delete<Student[]>(apiUrl, options)
			.pipe(
				retry(1)
			);
	}

	putData(apiUrl : string, body : any) : Observable<Student[]>
	{
		return this.http.put<Student[]>(apiUrl, body)
			.pipe(
				retry(1)
			);
	}
}
