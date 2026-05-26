package com.virubook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CollectionReportDto {

    private String customer_name;
    private String invoice_key;
    private Integer invoice_number;
    private Date invoice_date;
    private BigDecimal invoice_value;
    private BigDecimal collection_amount;
    private BigDecimal remaining_amount;




}
