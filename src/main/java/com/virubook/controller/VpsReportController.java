package com.virubook.controller;

import com.virubook.dto.VpsReportDto;
import com.virubook.service.VpsReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/vpsReport")
public class VpsReportController {

    @Autowired
    private VpsReportService vpsReportService;

    @GetMapping(value = "/{fromDate}/{toDate}")
    public List<VpsReportDto>getVpsReport(@PathVariable("fromDate") String fromDate,@PathVariable("toDate") String toDate){
        return vpsReportService.generateVpsReport(fromDate, toDate);
    }



}
