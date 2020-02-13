import { Component, OnInit, Input, TemplateRef, ElementRef, ContentChild, ViewChild, ViewContainerRef,ComponentRef, ComponentFactoryResolver,CompilerFactory } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendMailComponent } from './send-mail/send-mail.component';
import { GetNotificationComponent} from './get-notification/get-notification.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { TemplateInfo } from 'src/model/template-info';
import { Template } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  myGroup: FormGroup;
  listTemplates: TemplateInfo[]=[];
  Template: TemplateInfo;
  isParallal: boolean;
  templateType: string = '';
  templateType2: string = '';
  insertType: number = 1;
  currentIndex: number;
  currentComponent: Component;
  public message;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private resolver: ComponentFactoryResolver) {
    this.myGroup = this.fb.group({
      groups: this.fb.array([]),
    })
  } 

  ngOnInit() {
    let temp = new TemplateInfo();
    temp.Name = 'one';
    this.Template = temp;
    this.listTemplates.push(this.Template)
  }
  ///////////
  componentRef: any;
  @ViewChild('loadComponent', { read: ViewContainerRef }) entry: ViewContainerRef;
  componentsArray: any = [SendMailComponent, GetNotificationComponent]
  


  createComponent(Id: number) {
    this.entry.clear();
    if (Id == 1) {
      const factory = this.resolver.resolveComponentFactory(SendMailComponent);
      this.componentRef = this.entry.createComponent(factory);
    } else if (Id == 2) {
      const factory = this.resolver.resolveComponentFactory(GetNotificationComponent);
      this.componentRef = this.entry.createComponent(factory);
    }
    this.componentRef.instance.message = "Called by appComponent";
  }

  loadComponentTest() {
    for (let i = 0; i < this.componentsArray.length; i++) {
      const factory = this.resolver.resolveComponentFactory(this.componentsArray[i]);
      this.componentRef = this.entry.createComponent(factory);
    }
  }

  destroyComponent() {
    this.componentRef.destroy();
  }

  data = [
    {
      "Id": 1,
      "Name": "Send Mail"
    },
    {
      "Id": 2,
      "Name": "Get Notification"
    }
  ]
  selectName(id: number) {
    this.createComponent(id);
  }

  ///////////

  @ViewChild('one', { static: false }) one: TemplateRef<any>;
  @ViewChild('two', { static: false }) two: TemplateRef<any>;
  @ViewChild('three', { static: false }) three: TemplateRef<any>;
  @ViewChild('four', { static: false }) four: TemplateRef<any>;
  @ViewChild('five', { static: false }) five: TemplateRef<any>;
  @ViewChild('six', { static: false }) six: TemplateRef<any>;
  @ViewChild('five1', { static: false }) five1: TemplateRef<any>;
  @ViewChild('six1', { static: false }) six1: TemplateRef<any>;

  //config = {
  //  one: true,
  //  two: true,
  //}
  //conf = [{"one":true}, {"two":true}, {"three":true}]


  selectedTemplate(value) {
    this.templateType = value;
    this.currentComponent = '';
    if (value == 'two') {
      this.currentComponent =  SendMailComponent;
    }
  }
  
  add() {
    this.modalService.dismissAll();

    if (this.isParallal) {
      let temp = new TemplateInfo();
      temp.Stage = this.currentIndex+2;
      temp.Name = this.templateType;
      temp.isParallalTemp = true;
      this.listTemplates.splice(this.currentIndex + 1, 0, temp);
      this.isParallal = false;
      return false;
    }

    let temp = new TemplateInfo();

    temp.Stage = this.listTemplates.length + 1;
    temp.Name = this.templateType;
    temp.Component = this.currentComponent;
   
    if (this.insertType == 1) {
      this.listTemplates.push(temp);
      console.log(temp);
    }
    else {
      this.listTemplates.splice(this.currentIndex + 1, 0, temp);
      this.templateType = '';
    }    
   
  }

  insertTemplate(value, content) {
    this.insertType = 2;
    this.currentIndex = value;
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  parallalTemplate(value, content) {
    let template = new TemplateInfo;
    template.OrderId = 1;
    template.Stage = value;
    this.Template = template;
    this.isParallal = true;
    this.insertType = 2;
    this.currentIndex = value;    
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  removeTemplate(val) {
    this.listTemplates.splice(val, 1);
  }

  reset() {
    this.listTemplates = [];
  }


  pushData(val,Id) {
    console.log(val);
  }
  objectKeys = Object.keys;

  loadCollapse() {
    var acc = document.getElementsByClassName("accordion");
    console.log(acc);
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }


  openWindowCustomClass(content) {
    this.insertType = 1;
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
  // control = <FormArray>this.myGroup.controls.groups;
  obj: any[] = ['five', 'six'];
  dataa: any[] = ['one', 'two', 'three', 'four', 'five', 'six']
  test: any = this.loadCollapse();


  addNewGroup() {
    this.templateType2 = this.templateType;
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

  test1() {
    console.log('test')
  }

}



