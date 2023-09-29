import {AppError} from "./errors/app-error";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BadRequestError} from "./errors/bad-request-error";
import {UnprocessableEntityError} from "./errors/unprocessable-entity-error";

export function handleFormError(err: AppError, form: FormGroup) {
    if (err instanceof BadRequestError) {
        let validationErrors = err.errors

        Object.keys(validationErrors).forEach(prop => {
            const formControl = form.get(prop);
            if (formControl) {
                let error = validationErrors[prop as keyof typeof validationErrors]

                formControl.setErrors({
                    serverError: error
                });
            }
        });
    }

    if (err instanceof UnprocessableEntityError) {
        let validationErrors = err.errors

        if (validationErrors.hasOwnProperty('message')) {
            form.setErrors(validationErrors)

            console.log(form.getError('message'))
        }

        // Object.keys(validationErrors).forEach(prop => {
        //
        //     form.get(prop)
        //     const formControl = form.get(prop);
        //     if (formControl) {
        //         let error = validationErrors[prop as keyof typeof validationErrors]
        //
        //         formControl.setErrors({
        //             serverError: error
        //         });
        //     }
        // });
    }
}

export function navigateBack(router: Router) {
    const currentRoute = router.url;

    router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        router.navigate([currentRoute]);
    });
}
