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
public class StockReportItemViseDto {

    private Date date;
    private String code;
    private String item_name;
    private BigDecimal item_quantity;
}
