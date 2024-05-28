import { Component, Input } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../alertify.service';
import { FileUploadDialogComponent, FileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  constructor(
    private dialog: MatDialog,
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {

  }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryStrings: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {
          this.alertifyService.message("Files uploaded successfully.", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight,
          })
        }, (errorResponse: HttpErrorResponse) => {
          const error = errorResponse.error;
          this.alertifyService.message(error, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight,
          })
        })
      }
    })
  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     data: FileUploadDialogState.Yes
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == FileUploadDialogState.Yes) {
  //       afterClosed();
  //     }
  //   });
  // }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
}