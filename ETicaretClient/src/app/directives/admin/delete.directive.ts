import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { DialogService } from '../../services/common/dialog.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef, // directive'in cagirildigi html nesnesini elde etmek icin.
    private _renderer: Renderer2, // bu nesneyi manipule etmemiz icin gereken referans.
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {
    const img = _renderer.createElement("img")
    img.setAttribute("src", "../../../../../assets/delete.jpg");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")//ilgili elemente verilen event (click) gerceklestiginde tetiklenir. Dolayisiyla onclick tetiklenir.
  async onclick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        const td: HTMLTableCellElement = this.element.nativeElement
        await this.httpClientService.delete({
          controller: this.controller
        }, this.id).subscribe(data => {
          $(td.parentElement.style.pointerEvents = 'none')
          $(td.parentElement).fadeOut(1000, () => {
            this.callback.emit();
          })
        });
      }
    })
  }

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: DeleteState.Yes
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == DeleteState.Yes) {
  //       afterClosed();
  //     }
  //   });
  // }
}
