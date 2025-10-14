package com.virubook.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockTransferReportDto {

    private Date stock_transfer_date;
    private Integer stock_transfer_number;
    private String stock_transfer_key;
    private String item_short_name;
    private Integer quantity;
    private String from_location;
    private String to_location;













}
