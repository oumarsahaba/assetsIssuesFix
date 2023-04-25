import {AppError} from "./errors/app-error";
import {FormGroup} from "@angular/forms";
import {UnprocessableEntityError} from "./errors/unprocessable-entity-error";
import {Router} from "@angular/router";

export function handleFormError(err: AppError, form: FormGroup) {
    if (err instanceof UnprocessableEntityError) {
        let validationErrors = err.errors

        Object.keys(validationErrors).forEach(prop => {
            const formControl = form.get(prop);
            if (formControl) {
                let error = validationErrors[prop as keyof typeof validationErrors]

                if (Array.isArray(error)) {
                    formControl.setErrors({
                        serverError: error[0]
                    });
                }
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
