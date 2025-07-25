package com.virubook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ProductionReportsDto {

    private Date production_header_date;
    private String production_header_key;
    private String production_header_number;
    private String item_short_name;
    private BigDecimal total_quantity;


}
