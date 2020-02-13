import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {
  message: string;
  mailData: FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.mailData = this.formBuilder.group({
      To: [''],
      Subject: [''],
      Compose: [''],
    });
  }


  @Output() public mailChildEvent = new EventEmitter();
  sendData() {
    this.mailChildEvent.emit(this.mailData.value);
  }


  getData() {
    console.log(this.mailData.value);
  }


  test1() {
    console.log(this.mailData.value);
  }
 

}
