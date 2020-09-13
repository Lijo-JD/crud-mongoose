import { Component, OnChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Form } from '../form';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnChanges {

  datas : Form[];
  current_form = new Form();

  constructor(private data: DataService, private ref: ChangeDetectorRef) { }

  getData(): void {
    this.data.getData().subscribe((data: Form[]) => {
      this.datas = data;
    });
  }

  ngOnInit(): void {
    this.getData();
    console.log("ngOnInit called");
  }

  ngOnChanges(): void {
    this.getData();
    console.log("ngOnChanges called");
  }

  crud = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
  });

  onReset() {
    this.crud.reset();
    this.current_form = new Form();
  }

  onSave() {
    if (this.current_form._id) {
      this.data.editData(this.current_form).subscribe((test: any) => {
        console.log(test);
      });
    } else {
      this.data.saveData(this.current_form).subscribe((test: any) => {
        console.log(test);
      });
    }
    this.crud.reset();
    this.ref.detectChanges();
    console.log("Detect changes called")
  }

  onEdit(form: Form) {
    this.data.getSingleData(form).subscribe((data: Form) => {
      this.current_form = {...data}
    });
  }

  onDelete(id: string) {
    this.data.deleteData(id).subscribe((test: any) => {
      console.log(test);
    });
    this.ref.detectChanges();
    console.log("Detect changes called")
  }

}
