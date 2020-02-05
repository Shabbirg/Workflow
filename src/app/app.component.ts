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
  @ViewChild('one') one: TemplateRef<any>;
  @ViewChild('two') two: TemplateRef<any>;
  @ViewChild('three') three: TemplateRef<any>;
  @ViewChild('four') four: TemplateRef<any>;
  @ViewChild('five') five: TemplateRef<any>;
  @ViewChild('six') six: TemplateRef<any>;
  @ViewChild('five1') five1: TemplateRef<any>;
  @ViewChild('six1') six1: TemplateRef<any>;
  //config = {
  //  one: true,
  //  two: true,
  //}
  //conf = [{"one":true}, {"two":true}, {"three":true}]

  add() {
    if (this.templateType == '') {    //Not Selected
      this.templateType = 'empty';
      return false;
    }
    else if (this.templateType != 'empty') {
      if (this.insertType == 1) {     //Adding New Template
        this.data2.push(this.templateType)
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

  insertTemplate(value, content) {
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
        tempType: ['five1'],
        child: this.fb.array([])
      }))

    console.log(control.value);
  }


}



