package com.virubook.service;

import com.virubook.dao.StockTransferReportDao;
import com.virubook.dto.StockTransferReportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockTransferReportService {

    @Autowired
    private StockTransferReportDao stockTransferReportDao;

public List<StockTransferReportDto> getStockTransferReport(String fromDate, String toDate) {
    List<Object[]> result = stockTransferReportDao.getStockAdjustmentReport(fromDate, toDate);
    return result.stream().map(obj->
            new StockTransferReportDto(
                    (Date) obj[0],
                    (Integer) obj[1],
                    (String) obj[2],
                    (String) obj[3],
                    (Integer) obj[4],
                    (String) obj[5],
                    (String) obj[6]
            )
            ).collect(Collectors.toList());
}
}
