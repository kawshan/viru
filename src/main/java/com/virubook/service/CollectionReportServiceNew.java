package com.virubook.service;

import com.virubook.dao.CollectionReportDaoNew;
import com.virubook.dto.CollectionReportDto;
import com.virubook.dto.CollectionReportDtoNew;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class CollectionReportServiceNew {

    @Autowired
    private CollectionReportDaoNew collectionReportDaoNew;

    public List<CollectionReportDtoNew> getAllCollectionReport(String fromDate, String toDate) {
        List<Object[]> resultList = collectionReportDaoNew.getAllCollectionReportNew(fromDate,toDate);
        return resultList.stream().map(obj->
                new CollectionReportDtoNew(
                        (Integer) obj[0],
                        (Date) obj[1],
                        (String) obj[2],
                        (Integer) obj[3],
                        (String) obj[4],
                        (String) obj[5],
                        (String) obj[6],
                        (String) obj[7],
                        (BigDecimal) obj[8]
                )
                ).collect(Collectors.toList());

    }



}
