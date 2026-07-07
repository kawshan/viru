package com.virubook.service;

import com.virubook.dao.StockReportDao;
import com.virubook.dao.StockReportItemViseDao;
import com.virubook.dto.StockReportDto;
import com.virubook.dto.StockReportDtoForAllItems;
import com.virubook.dto.StockReportItemViseDto;
import com.virubook.dto.WaragodaStockDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockReportItemViseService {

    @Autowired
    private StockReportItemViseDao stockReportItemViseDao;


    public List<StockReportItemViseDto> generateStockReport(String locationId, String itemId, String fromDate, String toDate) {
        List<Object[]> results = stockReportItemViseDao.getStockReportItemVise(locationId,itemId,fromDate,toDate);
        return results.stream().map(obj ->
                new StockReportItemViseDto(
                        (Date) obj[0],         // Converts the first column (dates) to a Date object
                        (String) obj[1],       // Converts the second column (code) to a String
                        (String) obj[2],       // Converts the third column (item name) to a String
                        (BigDecimal) obj[3]    // Converts the fourth column (itemQuantity) to an Integer
                )
                ).collect(Collectors.toList());
    }













}
