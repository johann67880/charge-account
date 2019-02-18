import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Company } from '../models/company.model';
import { BillingDetail } from '../models/billingDetail.model';
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
  items : BillingDetail[];

  @Input()
  description : string;

  pdfSrc: string = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/149125/relativity.pdf';
  public safeUrl: SafeHtml;

  constructor(private pdfService : PDFService, private sanitizer : DomSanitizer) { }

  ngOnChanges() {
    this.pdfService.previewBillingPDF(this.company, this.items, this.description);
    this.setInnerHtml(this.pdfSrc);
  }

  ngOnInit() {
    
  }

  public setInnerHtml(pdfurl: string) {
   this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
  }
}
