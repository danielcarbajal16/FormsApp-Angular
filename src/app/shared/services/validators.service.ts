import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {
    public static firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public static emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    cantBeStrider = (control: FormControl): ValidationErrors | null => {
        const value: string = control.value.trim().toLowerCase();
    
        if (value === 'strider') {
            return {
                noStrider: true
            }
        }
        
        return null;
    }

    isValidField(form: FormGroup, field: string) {
        return form.controls[field].errors && form.controls[field].touched;
    }

    isFieldOneEqualFieldTwo(field1: string, field2: string) {
        return (formGroup: FormGroup): ValidationErrors | null => {
            const fieldValue1 = formGroup.get(field1)?.value;
            const fieldValue2 = formGroup.get(field2)?.value;

            if (fieldValue1 !== fieldValue2) {
                const errors = formGroup.get(field2)?.errors || {};
                formGroup.get(field2)?.setErrors({ ...errors, notEqual: true });
                return { notEqual: true }
            }

            return null;
        }
    }
}