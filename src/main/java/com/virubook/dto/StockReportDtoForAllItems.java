package com.virubook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class StockReportDtoForAllItems {

    private Integer item_master_id;
    private String item_short_name;
    private String item_category_name;
    private String location_master_name;
    private BigDecimal stock_quantity;



}