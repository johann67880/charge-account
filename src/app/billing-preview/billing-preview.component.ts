import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Company } from '../models/company.model';
import { ProductDetail } from '../models/productDetail.model';
import { PDFService } from '../services/pdf.service';
import { SafeHtml, DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'billing-preview',
  templateUrl: './billing-preview.component.html',
  styleUrls: ['./billing-preview.component.css'],
  providers : [PDFService]
})
export class BillingPreviewComponent implements OnInit, OnChanges {

  @Input()
  company : Company;

  @Input()
  items : ProductDetail[];

  @Input()
  description : string;

  pdfSrc: string;
  public safeUrl: SafeHtml;
  blobFile : any;

  constructor(private pdfService : PDFService, private sanitizer : DomSanitizer) { }

  ngOnChanges() {
    this.blobFile = this.pdfService.previewBillingPDF(this.company, this.items, this.description);
    this.setSafeUrl(this.pdfSrc, this.blobFile);
  }

  ngOnInit() {
    
  }

  public setSafeUrl(pdfurl: string, blobFile : any) {
    this.pdfSrc = URL.createObjectURL(blobFile);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
  }
}
