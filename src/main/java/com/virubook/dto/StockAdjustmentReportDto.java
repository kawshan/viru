package com.virubook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockAdjustmentReportDto {

    private Date date;
    private String key;
    private Integer number;
    private String item_short_name;
    private BigDecimal quantity;
}
