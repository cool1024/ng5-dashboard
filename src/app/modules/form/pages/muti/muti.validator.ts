import { Validators, AsyncValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

// 这是一个异步校验器
export function mutiAsyncValidatorFn(): AsyncValidatorFn {
    return (c: AbstractControl): Promise<ValidationErrors | null> => {
        return new Promise<ValidationErrors | null>((resolve, reject) => {
            setTimeout(() => {
                if (c.value === 2) {
                    resolve({ muti: '我不太喜欢2这个数字～' });
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    };
}
