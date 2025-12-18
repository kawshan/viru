package com.virubook.controller;

import com.virubook.dto.CollectionReportDto;
import com.virubook.service.CollectionReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/collection-report")
public class CollectionReportController {

    @Autowired
    private CollectionReportService collectionReportService;

    @GetMapping
    public List<CollectionReportDto> getCollectionReport() {
        return collectionReportService.generateCollectionReport();
    }



}
