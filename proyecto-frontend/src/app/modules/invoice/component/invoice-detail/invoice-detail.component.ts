import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../_model/invoice';
import Swal from 'sweetalert2';
import { InvoiceService } from '../../_service/invoice.service';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css',
})
export class InvoiceDetailComponent {
  id: number = 0; // invoice id
  invoice: Invoice = new Invoice();

  loading = false; // loading request
  swal = Swal;

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  errorMessage(message: string) {
    this.swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.getInvoice();
    } else {
      this.errorMessage('El id de la factura es inválido');
    }
  }

  getInvoice() {
    this.loading = true;
    this.invoiceService.getInvoice(this.id).subscribe({
      next: (v) => {
        this.invoice = v;
        this.loading = false;
        console.log(this.invoice);
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      },
    });
  }
}
