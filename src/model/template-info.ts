import { Component } from '@angular/core';

export class TemplateInfo
{
  public Id: string;
  public Name: string;
  public ParentId: string;
  public isParallalTemp: boolean=false;
  public OrderId: number=0;
  public Stage: number=0;
  public TemplateType: string;

  public Datafield1: string;
  public Datafield2: string;
  public Datafield3: string;
  public Component: Component;
}
