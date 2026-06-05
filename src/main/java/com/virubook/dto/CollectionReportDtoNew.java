package com.virubook.dto;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CollectionReportDtoNew {

    private Integer collection_master_header_number;
    private Date collection_master_header_date;
    private String collection_master_header_added_user;
    private Integer collection_master_details_invoice_number;
    private String collection_master_details_type;
    private String collection_master_details_bank;
    private String collection_master_details_branch;
    private String collection_master_details_check_no;
    private BigDecimal collection_master_details_amount;

}
