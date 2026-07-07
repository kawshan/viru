package com.virubook.controller;

import com.virubook.dao.StockAdjustmentReportDao;
import com.virubook.dto.StockAdjustmentReportDto;
import com.virubook.dto.StockTransferReportDto;
import com.virubook.service.StockAdjustmentReportService;
import com.virubook.service.StockTransferReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/stock-adjustment-report")
public class StockAdjustmentReportController {

    @Autowired
    private StockAdjustmentReportService stockAdjustmentReportService;

    @GetMapping
    public ModelAndView getStockTransferReportView() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("StockAdjustmentReport.html");
        return modelAndView;
    }



    @GetMapping(value = "/{locationId}/{fromDate}/{toDate}")
    public List<StockAdjustmentReportDto> getStockTransferReport(@PathVariable("locationId")String locationId, @PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate) {
        return stockAdjustmentReportService.getStockAdjustmentReport(locationId,fromDate, toDate);
    }



}
