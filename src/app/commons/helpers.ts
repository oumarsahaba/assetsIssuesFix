import {AppError} from "./errors/app-error";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BadRequestError} from "./errors/bad-request-error";
import {UnprocessableEntityError} from "./errors/unprocessable-entity-error";
import * as XLSX from 'xlsx';
import { ClientError } from "./errors/client-error";
import * as FileSaver from "file-saver";




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


export function exportExcelFile(dataset: any[],headers : string[], exportedFileName: string){
    console.log(Object.values(dataset[0]), headers);
    
    if(Object.values(dataset[0]).length != headers.length)
        throw new ClientError("Cannot export excel file. Dataset columns and headers must be same length");
        
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
    //get the headers and sub headers

    XLSX.utils.sheet_add_aoa(worksheet, [headers], {origin: -1});
    // Iterate over the data and add the fields to the worksheet
    for (let i = 0; i < dataset.length; i++) {
        const data = dataset[i];
        const row = Object.values(data);
        XLSX.utils.sheet_add_aoa(worksheet, [row], {origin: -1});
    }
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer: any = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
    saveAsExcelFile(excelBuffer, exportedFileName);

}
   
function saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
