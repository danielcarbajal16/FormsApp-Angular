import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { cantBeStrider, emailPattern, firstNameAndLastnamePattern } from 'src/app/shared/validators/validators';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(ValidatorsService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(ValidatorsService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [ this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2') ]
  });

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService, private emailValidator: EmailValidator) {}

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

  errorMessage(field: string): string | null {
    if (!this.myForm.get(field)) {
      return null;
    }
    
    const errors = this.myForm.get(field)?.errors || {};
    
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required': return 'Este campo es requerido'
        case 'pattern': return 'Formato de email no válido';
        case 'emailTaken': return 'Email ya tomado';
        case 'noStrider': return 'El username no puede ser Strider';
        case 'minlength': return `Este campo requiere un mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'notEqual': return 'Las contraseñas deben de ser iguales';
      }
    }
    
    return null;
  }

}
