package com.virubook.controller;

import ch.qos.logback.core.boolex.EvaluationException;
import com.virubook.dto.ItemWiseInvoiceReportDto;
import com.virubook.service.ItemWiseInvoiceReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/item-wise-sales-report")
public class ItemWiseInvoiceReportController {


    @Autowired
    private ItemWiseInvoiceReportService itemWiseInvoiceReportService;

    @GetMapping(value = "/view")
    public ModelAndView itemWiseInvoiceReportView(){
        ModelAndView reportUI = new ModelAndView();
        reportUI.setViewName("itemWiseInvoiceReport.html");
        return reportUI;
    }

    @GetMapping(value = "/report/{fromDate}/{toDate}")
    public List<ItemWiseInvoiceReportDto> getItemWiseInvoiceReport(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate){
        return itemWiseInvoiceReportService.getItemWiseInvoiceReport(fromDate, toDate);
    }


}
