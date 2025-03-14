package com.virubook.controller;

import com.virubook.dto.StockReportDto;
import com.virubook.service.StockReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/stock-report")
public class StockReportController {

    @Autowired
    private StockReportService stockReportService;

    @GetMapping("/{itemId}/{fromDate}/{toDate}")
    public List<StockReportDto> getStockReport(@PathVariable("itemId") Integer itemId, @PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate ){
        return stockReportService.generateStockReport(itemId, fromDate, toDate);
    }






}
