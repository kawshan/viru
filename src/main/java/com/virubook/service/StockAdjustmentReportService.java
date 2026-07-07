package com.virubook.service;

import com.virubook.dao.StockAdjustmentReportDao;
import com.virubook.dao.StockTransferReportDao;
import com.virubook.dto.StockAdjustmentReportDto;
import com.virubook.dto.StockTransferReportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockAdjustmentReportService {

    @Autowired
    private StockAdjustmentReportDao stockAdjustmentReportDao;

public List<StockAdjustmentReportDto> getStockAdjustmentReport(String locationId, String fromDate, String toDate) {
    List<Object[]> result = stockAdjustmentReportDao.getStockAdjustmentReport(locationId, fromDate, toDate);
    return result.stream().map(obj->
            new StockAdjustmentReportDto(
                    (Date) obj[0],
                    (String) obj[1],
                    (Integer) obj[2],
                    (String) obj[3],
                    (BigDecimal) obj[4]
            )
            ).collect(Collectors.toList());
}
}
