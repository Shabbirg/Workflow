import { Component, OnInit, Input, TemplateRef, ElementRef, ContentChild, ViewChild, ViewContainerRef,ComponentRef, ComponentFactoryResolver,CompilerFactory } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendMailComponent } from './send-mail/send-mail.component';
import { GetNotificationComponent} from './get-notification/get-notification.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { TemplateInfo } from 'src/model/template-info';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  myGroup: FormGroup;
  listTemplates: TemplateInfo[]=[];
  Template: TemplateInfo;
  templateType: string = '';
  templateType2: string = '';
  insertType: number = 1;
  currentIndex: number;
  constructor(private fb: FormBuilder, private modalService: NgbModal, private resolver: ComponentFactoryResolver) {
    this.myGroup = this.fb.group({
      groups: this.fb.array([]),
    })
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





  add() {
    if (this.templateType == '') {    //Not Selected
      this.templateType = 'empty';
      return false;
    }
    else if (this.templateType != 'empty') {
      if (this.insertType == 1) {     //Adding New Template
        this.templates.push(this.templateType)
        this.templateType = '';
        this.modalService.dismissAll();
      }
      else {                          //Inserting Template
        this.modalService.dismissAll();
        this.templates.splice(this.currentIndex + 1, 0, this.templateType);
        this.templateType = '';
        this.modalService.dismissAll();
      }
    }
  }

  selectedTemplate2(val) {
    let template = new TemplateInfo;
    template.Name = val;
    this.Template= template;
    console.log(this.Template);
  }

  add2() {
    this.listTemplates.push(this.Template);
    console.log(this.listTemplates);
  }

  insertTemplate(value, content) {
    this.insertType = 2;
    this.currentIndex = value;
    this.modalService.open(content, { windowClass: 'dark-modal' });

  }

  removeTemplate(val) {
    this.templates.splice(val, 1);
  }

  reset() {
    this.templates =[];
  }
  selectedTemplate(value) {
    this.templateType = value;
  }

  objectKeys = Object.keys;



  ngOnInit() {
    // this.viewchildload();
   //setTimeout(() => this.loadCollapse(), 100);
  }

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
    'one'
  ];

  openWindowCustomClass(content) {
    this.insertType = 1;
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
  // control = <FormArray>this.myGroup.controls.groups;
  obj: any[] = ['five', 'six'];
  dataa: any[] = ['one', 'two', 'three', 'four', 'five', 'six']
  test: any = this.loadCollapse();
  templateType3: any[] = []
  //templates = {
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



