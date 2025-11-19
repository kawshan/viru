package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "vps_details")
@AllArgsConstructor
@NoArgsConstructor



public class VpsDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vps_details")
    private Integer id_vps_details;

    @Column(name = "vps_details_payment_type")
    private String vps_details_payment_type;

    @Column(name = "vps_details_amount")
    private BigDecimal vps_details_amount;

    @Column(name = "vps_details_date")
    private LocalDate vps_details_date;

    @Column(name = "vps_details_header_key")
    private String vps_details_header_key;





}
