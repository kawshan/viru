package com.virubook.controller;

import com.virubook.dto.StockTransferReportDto;
import com.virubook.service.StockTransferReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/stock-transfer-report")
public class StockTransferReportController {

    @Autowired
    private StockTransferReportService stockTransferReportService;

    @GetMapping
    public ModelAndView getStockTransferReportView() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("StockTransferReport.html");
        return modelAndView;
    }



    @GetMapping(value = "/{fromDate}/{toDate}")
    public List<StockTransferReportDto> getStockTransferReport(@PathVariable("fromDate") String fromDate,@PathVariable("toDate") String toDate) {
        return stockTransferReportService.getStockTransferReport(fromDate, toDate);
    }



}
