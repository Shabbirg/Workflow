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


  selectedTemplate(value) {
    this.templateType = value;
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
    if (this.insertType == 1) {
      this.listTemplates.push(temp);
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
    //if (this.Template.OrderId > 0) {
    //  template.OrderId = template.OrderId + 1;
    //}

   // this.listTemplates.push(this.Template);
   // console.log(this.Template);
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
  templates: any[] = [
    'one','two'
  ];

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


}



