package com.virubook.service;

import com.virubook.dao.DeleteStockreportDao;
import com.virubook.dto.DeleteStockReportDto;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeleteStockReportService {

    @Autowired
    private DeleteStockreportDao deleteStockreportDao;

    public List<DeleteStockReportDto> getStockReport(String fromDate, String toDate) {
        List<Object[]> results = deleteStockreportDao.getDeleteStockReport(fromDate, toDate);
        return results.stream().map(obj->
                new DeleteStockReportDto(
                        (String) obj[0],
                        (Date) obj[1],
                        (Integer) obj[2],
                        (String) obj[3],
                        (BigDecimal) obj[4],
                        (String) obj[5]
                )
                ).collect(Collectors.toList());
    }
}
