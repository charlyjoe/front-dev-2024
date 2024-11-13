import { Component } from '@angular/core';
import { DtoInvoiceList } from '../../_dto/dto-invoice-list';
import Swal from 'sweetalert2';
import { InvoiceService } from '../../_service/invoice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxPhotoEditorModule, RouterModule ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent {
  invoices: DtoInvoiceList[] = []; 

  current_date = new Date(); 
  loading = false; 
  swal = Swal; 

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    this.loading = true;
    this.invoiceService.getInvoices().subscribe({
      next: (v) => {
        this.invoices = v;
        this.loading = false;
        this.current_date = new Date();
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      },
    });
  }

  showInvoice(id: number) {
    this.router.navigate(['invoice/' + id]);
  }
}
