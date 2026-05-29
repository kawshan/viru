package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "collection_master_details")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CollectionMasterDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "collection_master_details_header_key")
    private String collection_master_details_header_key;

    @Column(name = "collection_master_details_invoice_number")
    private Integer collection_master_details_invoice_number;

    @Column(name = "collection_master_details_amount")
    private BigDecimal collection_master_details_amount;

    @Column(name = "collection_master_details_type")
    private String collection_master_details_type;

    @Column(name = "collection_master_details_check_no")
    private String collection_master_details_check_no;

    @Column(name = "collection_master_details_bank")
    private String collection_master_details_bank;

    @Column(name = "collection_master_details_branch")
    private String collection_master_details_branch;

    @Column(name = "collection_master_details_pdc_date")
    private LocalDate collection_master_details_pdc_date;




}
