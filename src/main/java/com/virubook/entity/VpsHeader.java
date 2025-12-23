package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "vps_header")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class VpsHeader {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "vps_header_invoice_number")
    private String vps_header_invoice_number;

    @Column(name = "vps_header_total_invoice_value")
    private BigDecimal vps_header_total_invoice_value;

    @Column(name = "vps_header_key")
    private String vps_header_key;

    @Column(name = "vps_header_number")
    private Integer vps_header_number;


    @Column(name = "vps_header_saved_date")
    private LocalDate vps_header_saved_date;

    @Column(name = "vps_header_added_user")
    private String vps_header_added_user;




}