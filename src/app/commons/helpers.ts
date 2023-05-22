import {AppError} from "./errors/app-error";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BadRequestError} from "./errors/bad-request-error";

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
}

export function navigateBack(router: Router) {
    const currentRoute = router.url;

    router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        router.navigate([currentRoute]);
    });
}
