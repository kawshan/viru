package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "stock_transfer_header")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockTransferHeader {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "stock_transfer_header_key")
    private String stock_transfer_header_key;

    @Column(name = "stock_transfer_header_number")
    private String stock_transfer_header_number;

    @Column(name = "stock_transfer_header_date")
    private LocalDate stock_transfer_header_date;











}
