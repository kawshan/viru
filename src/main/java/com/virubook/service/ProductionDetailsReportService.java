package com.virubook.service;

import com.virubook.dao.ProductionDetailsReportDao;
import com.virubook.dto.ProductionReportsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductionDetailsReportService {


    @Autowired
    private ProductionDetailsReportDao productionDetailsReportDao;



    public List<ProductionReportsDto> generateProductionReportsDto(String fromDate, String toDate) {
        List<Object[]> results = productionDetailsReportDao.productionDetailsReport(fromDate,toDate);
        return results.stream().map(obj->
                new ProductionReportsDto(
                        (Date) obj[0],
                        (String) obj[1],
                        (String) obj[2],
                        (String) obj[3],
                        (BigDecimal) obj[4]
                )
                ).collect(Collectors.toList());
    }





}
