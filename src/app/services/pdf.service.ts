import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { CompanyStepModel } from '../models/companyStep.model';
import { ProductDetailStepModel } from '../models/productDetailStep.model';

@Injectable()
export class PDFService {
    
    public previewBillingPDF(company : CompanyStepModel, concepts : ProductDetailStepModel) : any {
        var doc = new jsPDF();
        doc.text("Prueba Beto", 35, 25);
        return doc.output('blob');
    }
}