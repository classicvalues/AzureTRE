import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Configuration } from 'src/app/models/configuration';
import { Workspace } from 'src/app/models/workspace';
import { DREApiCoreService } from '../services/dre-api-core.service';
import { WorkspaceCreateComponent } from '../workspaceCreate/workspaceCreate.component';
import { WorkspaceDeleteComponent } from '../workspaceDelete/workspaceDelete.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public workspaces: Array<Workspace>;
  private errorMessage: any;
  public currentWorkspace: Workspace;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private dreApiCoreService: DREApiCoreService,
    private configuration: Configuration,
    public dialog: MatDialog,

    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    console.log('HomeComponent.ngOnInit');

    console.log("here");
    this.dreApiCoreService.getWorkspaces().subscribe({
      next: workspaces => {
        console.log('workspaces', workspaces);
        this.workspaces = workspaces;

      },
      error: err => {
        this.errorMessage = err;

      }
    });
  }

  showSelectWorkspace() {
    this.currentWorkspace = null;
  }

  onWorkspaceSelected(workspace: Workspace) {
    // add go to workspace route
    console.log(this.currentWorkspace);

    this.router.navigateByUrl('/workspaces/' + workspace.id + '/')
    //this.currentWorkspace = workspace;
  }

  openCreateWorkspaceDialog() {
    const dialogRef = this.dialog.open(WorkspaceCreateComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteWorkspaceDialog(workspaceName) {
    const dialogRef = this.dialog.open(WorkspaceDeleteComponent, {
      data: {
        workspaceName
      },
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}