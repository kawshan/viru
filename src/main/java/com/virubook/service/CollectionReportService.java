package com.virubook.service;

import com.virubook.dao.CollectionReportDao;
import com.virubook.dto.CollectionReportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollectionReportService {

    @Autowired
    private CollectionReportDao collectionReportDao;


    public List<CollectionReportDto> generateCollectionReport() {
        List<Object[]> resultList = collectionReportDao.getCollectionReport();
        return resultList.stream().map(obj->
                new CollectionReportDto(
                        (String) obj[0],
                        (String) obj[1],
                        (Integer) obj[2],
                        (Date) obj[3],
                        (BigDecimal) obj[4],
                        (BigDecimal) obj[5],
                        (BigDecimal) obj[6]
                )
                ).collect(Collectors.toList());
    }



    public List<CollectionReportDto> generateCollectionReportCustomerVise(String customerName) {
        List<Object[]> resultList = collectionReportDao.getCollectionReportCustomerVise(customerName);
        return resultList.stream().map(obj->
                new CollectionReportDto(
                        (String) obj[0],
                        (String) obj[1],
                        (Integer) obj[2],
                        (Date) obj[3],
                        (BigDecimal) obj[4],
                        (BigDecimal) obj[5],
                        (BigDecimal) obj[6]
                )
        ).collect(Collectors.toList());
    }



}
