import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {
  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [false, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.myForm.reset({
        ...this.person,
        termsAndConditions: false
      })
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
  }

  isInvalidField(field: string): boolean | null | undefined {
    return this.myForm.get(field)?.errors && this.myForm.get(field)?.touched;
  }
}
