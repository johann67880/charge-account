import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { CompanyStepModel } from '../models/companyStep.model';
import { ProductDetailStepModel } from '../models/productDetailStep.model';
import { CommonService } from './common-service.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import es from '@angular/common/locales/es';
import { registerLocaleData, TitleCasePipe} from '@angular/common';
registerLocaleData(es);

@Injectable()
export class PDFService {

    titles = {
        tin  : "NIT",
        billing : "Cuenta de cobro",
        to : "Debe a",
        amountTitle : "La suma de",
        conceptsTitle : "Por concepto de"
    };

    constructor(private commonService : CommonService, private translateService : TranslateService) {
        this.translateService.get([
            "common.tin",
            "pdfFile.to",
            "common.billing",
            "pdfFile.amountTitle",
            "pdfFile.conceptsTitle"
        ])
        .subscribe(response => {
            this.titles.tin = response['pdfFile.tin'];
            this.titles.amountTitle = response['pdfFile.amountTitle'];
            this.titles.billing = response['common.billing'];
            this.titles.to = response['pdfFile.to'];
            this.titles.conceptsTitle = response['pdfFile.conceptsTitle'];
        });
    }

    public previewBillingPDF(company : CompanyStepModel, concepts : ProductDetailStepModel) : any {
        
        var doc = jsPDF();
        doc.setFontSize(13);
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

        //source company
        let titleCase = new TitleCasePipe();
        let billingId = this.commonService.getBillingId() ? this.commonService.getBillingId() : "000";

        let title = this.titles.billing + " #" + billingId;
        var textWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(title, ((pageWidth - textWidth) / 2), 35);

        //date
        let date = new DatePipe('es');
        let billingDate = titleCase.transform(date.transform(Date.now(), "MMMM yyyy"));
        textWidth = doc.getStringUnitWidth(billingDate) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(billingDate, ((pageWidth - textWidth) / 2), 45);


        let tinCompany = (company) ? company.selectedCompany.Tin : "";
        let tinText = this.titles.tin + ": " + tinCompany;
        textWidth = doc.getStringUnitWidth(tinText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(tinText, ((pageWidth - textWidth) / 2), 55);

        let companyName = (company) ? company.selectedCompany.Name : "";
        textWidth = doc.getStringUnitWidth(companyName) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(companyName, ((pageWidth - textWidth) / 2), 65);

        let companyContactName = (company) ? company.selectedCompany.ContactName : "";
        textWidth = doc.getStringUnitWidth(companyContactName) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(companyContactName, ((pageWidth - textWidth) / 2), 75);

        //destination
        let to = this.titles.to + ":";
        textWidth = doc.getStringUnitWidth(to) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(to, ((pageWidth - textWidth) / 2), 85);

        let destinationTin = (company) ? company.destinationTin : "";
        let destinationTinText = this.titles.tin + ": " + destinationTin;
        textWidth = doc.getStringUnitWidth(destinationTinText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(destinationTinText, ((pageWidth - textWidth) / 2), 95);

        let destinationName = (company) ? company.destinationName : "";
        textWidth = doc.getStringUnitWidth(destinationName) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(destinationName, ((pageWidth - textWidth) / 2), 105);

        //total money
        let amountTitle = this.titles.amountTitle + ":";
        textWidth = doc.getStringUnitWidth(amountTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(amountTitle, ((pageWidth - textWidth) / 2), 115);

        let totalText = (concepts) ? concepts.TotalText : "";
        textWidth = doc.getStringUnitWidth(totalText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(totalText, ((pageWidth - textWidth) / 2), 125);

        let currency = new CurrencyPipe('es');

        let price = (concepts) ? "(" + currency.transform(concepts.Total) + ")" : "";
        textWidth = doc.getStringUnitWidth(price) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(price, ((pageWidth - textWidth) / 2), 135);

        //concepts
        let conceptsTitle = this.titles.conceptsTitle + ":";
        textWidth = doc.getStringUnitWidth(conceptsTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(conceptsTitle, ((pageWidth - textWidth) / 2), 145);

        //list of concepts

        //description

        //signature

        return doc.output('blob');
    }
}