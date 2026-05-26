package com.virubook.service;

import com.virubook.dao.DeleteInvoiceReportDao;
import com.virubook.dto.DeleteInvoiceReportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeleteInvoiceReportService {

    @Autowired
    private DeleteInvoiceReportDao deleteInvoiceReportDao;

    public List<DeleteInvoiceReportDto> getStockReport(String fromDate, String toDate) {
        List<Object[]> results = deleteInvoiceReportDao.getDeleteStockReport(fromDate, toDate);
        return results.stream().map(obj->
                new DeleteInvoiceReportDto(
                        (String) obj[0],
                        (Date) obj[1],
                        (String) obj[2],
                        (String) obj[3],
                        (BigDecimal) obj[4],
                        (String) obj[5],
                        (Date) obj[6]
                )
                ).collect(Collectors.toList());
    }
}
