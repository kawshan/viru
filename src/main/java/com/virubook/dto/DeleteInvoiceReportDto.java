package com.virubook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteInvoiceReportDto {

    private String customer_name;
    private Date invoice_header_date;
    private Integer invoice_header_number;
    private String item_short_name;
    private BigDecimal net_invoice_value;
    private String deleted_user_name;

}
