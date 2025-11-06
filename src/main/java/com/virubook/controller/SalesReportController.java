package com.virubook.controller;

import com.virubook.dto.SalesReportDto;
import com.virubook.service.SalesReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/sales-report")
public class SalesReportController {

    @Autowired
    private SalesReportService salesReportService;

    @GetMapping(value = "/{fromDate}/{toDate}/{locationId}")
    public List<SalesReportDto> getSalesReport(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate, @PathVariable("locationId")String locationId) {
        return salesReportService.generateSalesReport(fromDate, toDate, locationId);
    }

    @GetMapping(value = "/view")
    public ModelAndView salesReportView(){
        ModelAndView salesReportUI = new ModelAndView();
        salesReportUI.setViewName("salesReport.html");
        return salesReportUI;
    }




}
