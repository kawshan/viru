package com.virubook.controller;

import com.virubook.dto.ProductionReportsDto;
import com.virubook.service.ProductionDetailsReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/production-report")
public class ProductionDetailsReportController {

    @Autowired
    private ProductionDetailsReportService productionDetailsReportService;


    @GetMapping(value = "/view")
    public ModelAndView productionDetailsReport() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("productionReport.html");
        return modelAndView;
    }


    @GetMapping(value = "/{fromDate}/{toDate}")
    public List<ProductionReportsDto> getProductionReports(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate) {
        return productionDetailsReportService.generateProductionReportsDto(fromDate, toDate);
    }





}
