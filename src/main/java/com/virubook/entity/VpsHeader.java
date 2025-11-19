package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "vps_header")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class VpsHeader {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vps_header")
    private Integer id_vps_header;

    @Column(name = "vps_header_invoice_no")
    private String vps_header_invoice_no;

    @Column(name = "vps_header_total_invoice_value")
    private BigDecimal vps_header_total_invoice_value;

    @Column(name = "vps_header_key")
    private String vps_header_key;

    @Column(name = "vps_header_number")
    private String vps_header_number;








}