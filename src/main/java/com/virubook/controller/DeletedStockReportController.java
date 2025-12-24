package com.virubook.controller;

import com.virubook.dto.DeleteStockReportDto;
import com.virubook.service.DeleteStockReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/delete-sales-report")
public class DeletedStockReportController {

    @Autowired
    private DeleteStockReportService deleteStockReportService;


    @GetMapping(value = "/view")
    public ModelAndView deleteStockReportView(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("deleteStockReport.html");
        return modelAndView;
    }


    @GetMapping(value = "/report/{fromDate}/{toDate}")
    public List<DeleteStockReportDto> getDeletedStockReport(@PathVariable(value = "fromDate") String fromDate, @PathVariable(value = "toDate") String toDate) {
        return deleteStockReportService.getStockReport(fromDate, toDate);
    }



}
