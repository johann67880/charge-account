import { Injectable } from '@angular/core';
import { Company } from '../models/company.model';
import { ProductDetail } from '../models/productDetail.model';
import jsPDF from 'jspdf';

@Injectable()
export class PDFService {
    
    public previewBillingPDF(company : Company, items : ProductDetail[], description : string) : any {
        var doc = new jsPDF();
        doc.text("Prueba Beto", 35, 25);
        return doc.output('blob');
    }
}