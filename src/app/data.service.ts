import { Injectable } from '@angular/core';
import { Form } from './form';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  form = new Form()

  getData() {
    return this.http.get('http://localhost:3000/user')
  }

  saveData(form: Form) {
    return this.http.post('http://localhost:3000/user', form)
  }

  getSingleData(form: Form) {
    // return this.http.get('http://localhost:3000/user/',{params: {id: form.id}})
    let url = 'http://localhost:3000/user/' + form._id
    return this.http.get(url)
  }

  editData(form: Form){
    //return this.http.put('http://localhost:3000/user/', form, {params: {id: form.id}})
    let url = 'http://localhost:3000/user/' + form._id
    return this.http.put(url, form)
  }

  deleteData(id: string){
    let url = 'http://localhost:3000/user/' + id
    return this.http.delete(url)
  }
}
