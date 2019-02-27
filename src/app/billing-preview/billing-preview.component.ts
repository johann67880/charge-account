import { Component, OnInit } from '@angular/core';
import { PDFService } from '../services/pdf.service';
import { SafeHtml, DomSanitizer} from '@angular/platform-browser';
import { CommonService } from '../services/common-service.service';

@Component({
  selector: 'billing-preview',
  templateUrl: './billing-preview.component.html',
  styleUrls: ['./billing-preview.component.css'],
  providers : [PDFService]
})
export class BillingPreviewComponent implements OnInit {

  pdfSrc: string;
  public safeUrl: SafeHtml;
  blobFile : any;

  constructor(private pdfService : PDFService, private sanitizer : DomSanitizer, private commonService : CommonService) {
    
  }

  ngOnInit() {
    //Pass values to pdf service.
    this.blobFile = this.pdfService.previewBillingPDF(this.commonService.getSelectedCompany(), this.commonService.getConcepts());
    this.setSafeUrl(this.pdfSrc, this.blobFile);
  }

  public setSafeUrl(pdfurl: string, blobFile : any) {
    this.pdfSrc = URL.createObjectURL(blobFile);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
  }
}
