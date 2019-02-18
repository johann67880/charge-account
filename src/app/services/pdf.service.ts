import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { BillingDetail } from '../models/billingDetail.model';
import jsPDF from 'jspdf';

@Injectable()
export class PDFService {
    
    public previewBillingPDF(company : Company, items : BillingDetail[], description : string) {
        var doc = new jsPDF();
        doc.text("Prueba jsPDF", 35, 25);
        //doc.save("Test.pdf");
    }
}