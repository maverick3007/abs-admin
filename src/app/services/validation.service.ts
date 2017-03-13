export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'invalidDateString': 'Geen correcte datum',
            'invalidIntegerString': 'Geen geheel getal',
            'invalidNumberString': 'Geen getal'
        };

        return config[validatorName];
    }

    static stringIsDateValidator(control) {
        /*if(control.value == 'test')
       {
           return { 'invalidDateString': true };
       }else{
           return null;
       }*/
        if (control.value != '') {
            let val = Date.parse(control.value);
            if (val > 0) {  // d.valueOf() could also work
                // date is valid
                return null;
            }
            else {

                // date is not valid
                return { 'invalidDateString': true };
            }
        } else {
            return { 'invalidDateString': true };
        }
    }

    static stringIsInteger(control) {
        if (control.value === 0) {
            return null;
        }
        if (control.value != '') {
            if (control.value === parseInt(control.value, 10)) {
                return null;
            } else {
                return { 'invalidIntegerString': true };
            }
        } else {
            return { 'invalidIntegerString': true };
        }
    }

    static stringIsNumeric(control) {
        let n = control.value;
        if (!isNaN(parseFloat(n)) && isFinite(n)) {
            return null;
        } else {
            return { 'invalidNumberString': true };
        }
    }
}