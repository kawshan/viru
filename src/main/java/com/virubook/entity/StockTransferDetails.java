package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "stock_transfer_details")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockTransferDetails {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "stock_transfer_details_description")
    private String stock_transfer_details_description;

    @Column(name = "stock_transfer_details_header_key")
    private String stock_transfer_details_header_key;

    @Column(name = "stock_transfer_details_quantity")
    private Integer stock_transfer_details_quantity;


    @ManyToOne
    @JoinColumn(name = "from_location",referencedColumnName = "id")
    private LocationMaster from_location;

    @ManyToOne
    @JoinColumn(name = "to_location",referencedColumnName = "id")
    private LocationMaster to_location;

    @ManyToOne
    @JoinColumn(name = "item_master_id",referencedColumnName = "id")
    private ItemMaster item_master_id;






}
