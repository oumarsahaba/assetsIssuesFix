import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, timeout } from 'rxjs';
import { AppError } from 'src/app/commons/errors/app-error';
import { BadRequestError } from 'src/app/commons/errors/bad-request-error';
import { UnprocessableEntityError } from 'src/app/commons/errors/unprocessable-entity-error';
import { handleFormError } from 'src/app/commons/helpers';
import { AgentFromExcel } from 'src/app/commons/interfaces/agent-from-excel';
import { AgentService } from 'src/app/services/agent.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit, OnDestroy{
  
  displayModal: any = false;
  file: File;
  agents: AgentFromExcel[]
  sheetName: string
  agents$: Observable<AgentFromExcel[]>
  uploadProgression = false
  uploadCompleted = false
  form = new FormGroup({
    file: new FormControl('', Validators.required),
    sheetName: new FormControl('', Validators.required)
})


  constructor( private agentService: AgentService,
    private toastr: ToastrService){}


  ngOnInit(): void {
  }

  ngOnDestroy(){
  }
  
  chooseFile(){
    const inputElement = document.getElementById("excelInput");
    inputElement.click();
  }
  reloadupload(){
    //@ts-ignore
    this.file= null
    this.uploadCompleted = false
    this.uploadProgression = false
    this.form.value.file = null
  
  }
  importFile(){    
    console.log("here");

    if (this.form.valid) {
      console.log("here2");
      
      this.agentService.uploadAgentsFromExcel(this.file,this.form.get('sheetName')?.value).subscribe(
        {next: event => {
          console.log(event);
          
        if (event.type === HttpEventType.DownloadProgress) {
            this.uploadProgression = true
            this.uploadCompleted = false
            //this.form.disable()
        
        }
        if (event.type === HttpEventType.Response) {
          this.uploadCompleted = true
          this.uploadProgression = false
          this.toggleModal()
          this.toastr.success('File successfully uploaded');
        }
      
        },
        error: (err: AppError) => {
          if (err instanceof UnprocessableEntityError)
          handleFormError(err, this.form)      }
    })
    }
    
    
  }
  // On file Select 
  onChange(event : any) { 
    this.file = event.target.files[0]; 
    this.form.get('file')?.setValue(this.file.name)
    console.log(this.file, event.target.files[0].name);
    
}
  extractFile(){
    const inputElement = document.getElementById("excelInput");
    //@ts-ignore
    var f = inputElement.files[0];
    console.log(f);
    
    /* f is a File */
    var reader = new FileReader();
    reader.onload = (e) =>{
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach((sheetName) => {
        // Here is your object
        var XL_row_object :any = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        var json_object = XL_row_object;
        
        console.log(json_object,this.agents);

      })

    };

    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(f);
  }

  toggleModal() {
    this.displayModal = !this.displayModal
    this.reloadupload()
}



}


