import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { cantBeStrider, emailPattern, firstNameAndLastnamePattern } from 'src/app/shared/validators/validators';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(ValidatorsService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(ValidatorsService.emailPattern)]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService) {}

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
