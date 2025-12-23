package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "stock_adjustment_header")
@AllArgsConstructor
@NoArgsConstructor

public class StockAdjustmentHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "stock_adjustment_header_no")
    private Integer stock_adjustment_header_no;

    @Column(name = "stock_adjustment_header_key")
    private String stock_adjustment_header_key;

    @Column(name = "stock_adjustment_header_date")
    private LocalDate stock_adjustment_header_date;

    @Column(name = "stock_adjustment_header_added_user")
    private String stock_adjustment_header_added_user;

    @ManyToOne
    @JoinColumn(name = "location_master_id",referencedColumnName = "id")
    private LocationMaster location_master_id;





}
