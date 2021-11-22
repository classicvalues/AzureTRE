import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Template } from '../../../../../src/app/models/template';
import { Workspace } from '../../../../../src/app/models/workspace';
import { WorkspaceServiceCreateRequest } from '../../../../../src/app/models/workspaceServiceCreateRequest';
import { ResourceCreateComponent } from '../../../../../src/app/resourceCreate/resourceCreate.component';
import { TREWorkspaceApiService } from '../services/tre-workspace-api.service';

@Component({
    selector: 'app-workspace-service-create',
    templateUrl: '../../../../../src/app/resourceCreate/resourceCreate.component.html',
    styleUrls: ['../../../../../src/app/resourceCreate/resourceCreate.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class WorkspaceServiceCreateComponent extends ResourceCreateComponent {

    schema: Observable<Template>;
    resourceType = "Workspace Service";
    templates$: Observable<Template[]> = this.dreApi.getWorkspaceServiceTemplates()
        .pipe(map(templates => templates));

    constructor(public dialogRef: MatDialogRef<WorkspaceServiceCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public currentWorkspace: Workspace,
        public spinner: NgxSpinnerService, public dreApi: TREWorkspaceApiService) {
        super(spinner);
    }


    selectTemplate(template: Template) {
        this.template = template;
        console.log('Template selected' + this.template);
        this.schema = this.dreApi.getWorkspaceServiceTemplate(template.name);
        console.log("Schema:" + JSON.stringify(this.schema));
        this.templateSelected = true;
    }

    createResource() {


        if (this.formData == null) this.formData = {};

        this.ajv.validate(this.schema, this.formData);

        if (this.ajv.errors) {
            console.log(this.ajv.errors);

            return;
        }

        this.submitted = true;
        const req: WorkspaceServiceCreateRequest = {
            templateName: this.template.name,
            properties: this.formData
        };
        console.log(this.formData);

        console.log(this.currentWorkspace);

        this.dreApi.createWorkspaceService(this.currentWorkspace, req).subscribe(
            (result) => {
                if (result.succeeded) {
                    console.log(`createWorkspaceService result: ${result.succeeded}`);
                    console.log(`message returned is: ${result.message}`);
                } else {
                    console.log(`message returned is: ${result}`);
                    this.error = true;
                }


            },
            (_) => {
                this.error = true;

            }
        );
    }
}