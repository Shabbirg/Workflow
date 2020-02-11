import { Component, OnInit, Input, TemplateRef, ElementRef, ContentChild, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myGroup: FormGroup;
  templateType: string = '';
  templateType2: string = '';
  insertType: number = 1;
  currentIndex: number;
  show: boolean = true;
  temp: number = 1;
  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.myGroup = this.fb.group({
      groups: this.fb.array([]),
    })
  }

  viewchildload() {
    for (var i = 0; i < this.data.length; i++) {
      //@ViewChild(this.numbers[i]);
      //@ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;
    }
  }
  @ViewChild('one', { static: true }) one: TemplateRef<any>;
  @ViewChild('two', { static: true }) two: TemplateRef<any>;
  @ViewChild('three', { static: true }) three: TemplateRef<any>;
  @ViewChild('four', { static: true }) four: TemplateRef<any>;
  @ViewChild('five', { static: true }) five: TemplateRef<any>;
  @ViewChild('six', { static: true }) six: TemplateRef<any>;
  @ViewChild('five1', { static: true }) five1: TemplateRef<any>;
  @ViewChild('six1', { static: true }) six1: TemplateRef<any>;
  //config = {
  //  one: true,
  //  two: true,
  //}
  //conf = [{"one":true}, {"two":true}, {"three":true}]
  tempArray: any[] =[
  ];

  add() {
    if (this.templateType == '') {    //Not Selected
      this.templateType = 'empty';
      return false;
    }
    else if (this.templateType != 'empty') {
      if (this.insertType == 1 && this.temp==1) {     //Adding New Template
        this.data2.push(this.templateType)
        this.templateType = '';
        this.modalService.dismissAll();
      }
      else if (this.insertType == 1 && this.temp == 0) {     //Adding New Template
        this.tempArray.push(this.templateType)
        this.templateType = '';
        this.modalService.dismissAll();
      }
      else {                          //Inserting Template
        this.modalService.dismissAll();
        this.data2.splice(this.currentIndex + 1, 0, this.templateType);
        this.templateType = '';
        this.modalService.dismissAll();
      }
    }
  }
  toggle() {
    this.show = !this.show;
  }

  insertTemplate(value, content,temp) {
    this.temp =temp;
    this.show = !this.show;
    this.insertType = 2;
    this.currentIndex = value;
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  removeTemplate(val) {
    this.data2.splice(val, 1);
  }

  selectedTemplate(value) {
    
    this.templateType = value;
  }

  objectKeys = Object.keys;

  ngOnInit() {
    this.viewchildload();
  }

  data2: any[] = [
    'one'
  ];

  openWindowCustomClass(content) {
    this.insertType = 1;
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
  // control = <FormArray>this.myGroup.controls.groups;
  obj: any[] = ['five', 'six'];
  data3: any[] = [
    { "name": 'five1', "obj": this.obj },
    { "name": 'six1', "obj": this.obj }
  ]
  data: any[] = ['one', 'two', 'three', 'four', 'five', 'six']
  templateType3: any[] = []
  //data2 = {
  //  groups: [],
  //}

  addNewGroup() {

    this.templateType2 = this.templateType;
    this.templateType3.push(this.templateType)
    let control = <FormArray>this.myGroup.controls.groups;
    control.push(
      this.fb.group({
        val1: [''],
        val2: [''],
        val3: [''],
        tempType:[''],
        child: this.fb.array([])
      }))
    console.log(control.value);
  }


}



