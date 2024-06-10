import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDnaInputRestriction]'
})
export class DnaInputRestrictionDirective {

  constructor(private ngControl: NgControl) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const control = this.ngControl.control;
    if (control) {
      const newValue = value.replace(/[^ATCGatcg]/g, '');
      control.setValue(newValue, { emitEvent: false });
    }
  }
}
