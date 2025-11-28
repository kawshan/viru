package com.virubook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class VpsReportDto {


    private String vps_header_invoice_number;
    private String vps_header_key;
    private Integer vps_header_number;
    private Date vps_header_saved_date;
    private Date vps_details_date;
    private BigDecimal vps_details_amount;
    private String vps_details_payment_type;


}
