import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { CompanyStepModel } from '../models/companyStep.model';
import { ProductDetailStepModel } from '../models/productDetailStep.model';
import { CommonService } from './common-service.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import es from '@angular/common/locales/es';
import { registerLocaleData, TitleCasePipe} from '@angular/common';
import 'jspdf-autotable';
registerLocaleData(es);

declare var html2canvas: any;

@Injectable()
export class PDFService {

    titles = {
        tin  : "NIT",
        billing : "Cuenta de cobro",
        to : "Debe a",
        amountTitle : "La suma de",
        conceptsTitle : "Por concepto de",
        totalValue : "Valor total",
        concepts : "Conceptos"
    };

    constructor(private commonService : CommonService, private translateService : TranslateService) {
        this.translateService.get([
            "common.tin",
            "pdfFile.to",
            "common.billing",
            "pdfFile.amountTitle",
            "pdfFile.conceptsTitle",
            "pdfFile.totalValue",
            "pdfFile.concepts"
        ])
        .subscribe(response => {
            this.titles.tin = response['common.tin'];
            this.titles.amountTitle = response['pdfFile.amountTitle'];
            this.titles.billing = response['common.billing'];
            this.titles.to = response['pdfFile.to'];
            this.titles.conceptsTitle = response['pdfFile.conceptsTitle'];
        });
    }

    public previewBillingPDF(company : CompanyStepModel, concepts : ProductDetailStepModel) : any {
        
        var doc = jsPDF();
        doc.setFontType("bold");
        doc.setFontSize(11);
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

        //source company
        let titleCase = new TitleCasePipe();
        let billingId = this.commonService.getBillingId() ? this.commonService.getBillingId() : "000";

        let title = this.titles.billing.toUpperCase() + " #" + billingId;
        var textWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(title, ((pageWidth - textWidth) / 2), 25);

        //date
        let date = new DatePipe('es');
        let billingDate = titleCase.transform(date.transform(Date.now(), "MMMM yyyy"));
        textWidth = doc.getStringUnitWidth(billingDate) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(billingDate, ((pageWidth - textWidth) / 2), 32);

        //Company Name
        let companyName = (company) ? company.selectedCompany.Name.toUpperCase() : "";
        textWidth = doc.getStringUnitWidth(companyName) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(companyName, ((pageWidth - textWidth) / 2), 50);

        //TIN
        let tinCompany = (company) ? company.selectedCompany.Tin : "";
        let tinText = this.titles.tin.toUpperCase() + ": " + tinCompany.toUpperCase();
        textWidth = doc.getStringUnitWidth(tinText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(tinText, ((pageWidth - textWidth) / 2), 57);

        //Contact Name
        let companyContactName = (company) ? titleCase.transform(company.selectedCompany.ContactName) : "";
        textWidth = doc.getStringUnitWidth(companyContactName) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(companyContactName, ((pageWidth - textWidth) / 2), 64);

        //destination
        doc.setFontType("normal");
        let to = this.titles.to + ":";
        textWidth = doc.getStringUnitWidth(to) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(to, ((pageWidth - textWidth) / 2), 82);

        //Destination Tin
        doc.setFontType("bold");
        let destinationTin = (company) ? company.destinationTin.toUpperCase() : "";
        let destinationTinText = this.titles.tin.toUpperCase() + ": " + destinationTin;
        textWidth = doc.getStringUnitWidth(destinationTinText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(destinationTinText, ((pageWidth - textWidth) / 2), 89);

        //Destination Name
        let destinationName = (company) ? company.destinationName : "";
        textWidth = doc.getStringUnitWidth(destinationName) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(destinationName, ((pageWidth - textWidth) / 2), 96);

        //Total Title
        doc.setFontType("normal");
        let amountTitle = this.titles.amountTitle + ":";
        textWidth = doc.getStringUnitWidth(amountTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(amountTitle, ((pageWidth - textWidth) / 2), 114);

        //Total Text
        let totalText = (concepts) ? titleCase.transform(concepts.TotalText) : "";
        textWidth = doc.getStringUnitWidth(totalText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(totalText, ((pageWidth - textWidth) / 2), 121);

        //Total Value
        doc.setFontType("bold");
        let price = (concepts) ? "($" + concepts.Total.toLocaleString("es-CO") + ")" : "";
        textWidth = doc.getStringUnitWidth(price) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(price, ((pageWidth - textWidth) / 2), 128);

        //Concepts
        doc.setFontType("normal");
        let conceptsTitle = this.titles.conceptsTitle + ":";
        textWidth = doc.getStringUnitWidth(conceptsTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.text(conceptsTitle, ((pageWidth - textWidth) / 2), 146);

        //list of concepts

        let conceptNames = (concepts) ? concepts.Concepts.map(x => x.Name) : [];
        let conceptPrices = (concepts) ? concepts.Concepts.map(x => x.Price) : [];

        doc.autoTable({
            head: [[this.titles.concepts, this.titles.totalValue]],
            body: [[conceptNames, conceptPrices]],
            startY : 153,
            headStyles: {fillColor: [255, 255, 255], textColor : 0},
            styles: {
                lineColor: [0, 0, 0],
                lineWidth: 0.2
            },
        });

        //description

        //signature

        return doc.output('blob');
    }
}