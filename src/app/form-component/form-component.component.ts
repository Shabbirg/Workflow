
import { Component, OnInit, Input, TemplateRef, ElementRef, ContentChild, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, CompilerFactory } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {

  myGroup: FormGroup;
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
  }



  addNewGroup() {

    this.templateType2 = this.templateType;
    let control = <FormArray>this.myGroup.controls.groups;
    control.push(
      this.fb.group({
        val1: [''],
        val2: [''],
        val3: [''],
        tempType: [''],
        child: this.fb.array([])
      }))

    console.log(control.value);
  }
}
