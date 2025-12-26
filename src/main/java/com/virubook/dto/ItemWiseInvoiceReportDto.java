package com.virubook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemWiseInvoiceReportDto {


    private String customer_name;
    private Date invoice_date;
    private Integer invoice_number;
    private String item_short_name;
    private BigDecimal rate;
    private BigDecimal invoice_detail_quantity;
    private BigDecimal invoice_value_final;
    private String location_name;



}
