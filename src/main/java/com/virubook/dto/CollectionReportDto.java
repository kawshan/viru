package com.virubook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CollectionReportDto {

    private String customer_name;
    private Integer invoice_number;
    private BigDecimal invoice_value;
    private BigDecimal collection_amount;
    private BigDecimal remaining_amount;




}
