package com.virubook.controller;

import com.virubook.dto.CollectionReportDtoNew;
import com.virubook.service.CollectionReportService;
import com.virubook.service.CollectionReportServiceNew;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/collection_report_new")
public class CollectionReportControllerNew {

    @Autowired
    private CollectionReportServiceNew collectionReportServiceNew;

    @GetMapping(value = "/{fromDate}/{toDate}")
    public List<CollectionReportDtoNew> findCollectionReport(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate) {
        return collectionReportServiceNew.getAllCollectionReport(fromDate, toDate);

    }


}
