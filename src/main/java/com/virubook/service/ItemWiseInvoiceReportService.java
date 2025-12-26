package com.virubook.service;

import com.virubook.dao.ItemWiseInvoiceReportDao;
import com.virubook.dto.ItemWiseInvoiceReportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemWiseInvoiceReportService {

    @Autowired
    private ItemWiseInvoiceReportDao itemWiseInvoiceReportDao;


    public List<ItemWiseInvoiceReportDto> getItemWiseInvoiceReport(String fromDate, String toDate) {
        List<Object[]> result = itemWiseInvoiceReportDao.getItemWiseInvoiceReport(fromDate, toDate);
        return result.stream().map(obj->
                new ItemWiseInvoiceReportDto(
                        (String) obj[0],
                        (Date) obj[1],
                        (Integer) obj[2],
                        (String) obj[3],
                        (BigDecimal) obj[4],
                        (BigDecimal) obj[5],
                        (BigDecimal) obj[6],
                        (String) obj[7]
                )
                ).collect(Collectors.toList());
    }


}
