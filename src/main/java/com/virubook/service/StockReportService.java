package com.virubook.service;

import com.virubook.dao.StockReportDao;
import com.virubook.dto.StockReportDto;
import com.virubook.dto.StockReportDtoForAllItems;
import com.virubook.dto.WaragodaStockDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockReportService {

    @Autowired
    private StockReportDao stockReportDao;


    public List<StockReportDto> generateStockReport(Integer itemId, String fromDate, String toDate) {
        List<Object[]> results = stockReportDao.getStockReport(itemId,fromDate,toDate);
        return results.stream().map(obj ->
                new StockReportDto(
                        (Date) obj[0],         // Converts the first column (dates) to a Date object
                        (String) obj[1],       // Converts the second column (code) to a String
                        (String) obj[2],       // Converts the third column (colType) to a String
                        (BigDecimal) obj[3]    // Converts the fourth column (itemQuantity) to an Integer
                )
                ).collect(Collectors.toList());
    }

    public List<StockReportDtoForAllItems> generateStockReportForAllItems(String fromDate, String toDate) {
        List<Object[]> results = stockReportDao.getStockReportForAllItems(fromDate,toDate);
        return results.stream().map(obj ->
                new StockReportDtoForAllItems(
                        (Integer) obj[0],
                        (String) obj[1],
                        (String) obj[2],
                        (String) obj[3],
                        (BigDecimal) obj[4]
                )
                ).collect(Collectors.toList());
    }


    public List<WaragodaStockDto> generateStockReportForShopWaragoda(String fromDate, String toDate) {
        List<Object[]> results = stockReportDao.getStockReportForShopWaragoda(fromDate,toDate);
        return results.stream().map(obj ->
                new WaragodaStockDto(
                        (Integer) obj[0],
                        (String) obj[1],
                        (String) obj[2],
                        (String) obj[3],
                        (String) obj[4],
                        (BigDecimal) obj[5]
                )
        ).collect(Collectors.toList());
    }













}
