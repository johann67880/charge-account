import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { BillingDetail } from '../models/billingDetail.model';
import jsPDF from 'jspdf';

@Injectable()
export class PDFService {
    
    public previewBillingPDF(company : Company, items : BillingDetail[], description : string) : any {
        var doc = new jsPDF();
        doc.text("Prueba Beto", 35, 25);
        return doc.output('blob');
    }
}