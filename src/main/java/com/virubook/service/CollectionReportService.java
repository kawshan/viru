package com.virubook.service;

import com.virubook.dao.CollectionReportDao;
import com.virubook.dto.CollectionReportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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
                        (Integer) obj[1],
                        (BigDecimal) obj[2],
                        (BigDecimal) obj[3],
                        (BigDecimal) obj[4]
                )
                ).collect(Collectors.toList());
    }



    public List<CollectionReportDto> generateCollectionReportCustomerVise(String customerName) {
        List<Object[]> resultList = collectionReportDao.getCollectionReportCustomerVise(customerName);
        return resultList.stream().map(obj->
                new CollectionReportDto(
                        (String) obj[0],
                        (Integer) obj[1],
                        (BigDecimal) obj[2],
                        (BigDecimal) obj[3],
                        (BigDecimal) obj[4]
                )
        ).collect(Collectors.toList());
    }



}
