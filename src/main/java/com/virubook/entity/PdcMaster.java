package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PdcMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private String id;

    @Column(name = "pdc_master_created_date")
    private LocalDate pdc_master_created_date;

    @Column(name = "pdc_master_bank_name")
    private String pdc_master_bank_name;

    @Column(name = "pdc_master_branch_name")
    private String pdc_master_branch_name;

    @Column(name = "pdc_master_cheque_no")
    private String pdc_master_cheque_no;

    @Column(name = "pdc_master_amount")
    private BigDecimal pdc_master_amount;

    @Column(name = "pdc_master_pdc_date")
    private LocalDate pdc_master_pdc_date;

    @ManyToOne
    @JoinColumn(name = "pdc_status_id", referencedColumnName = "id")
    private PdcStatus pdc_status_id;





}
