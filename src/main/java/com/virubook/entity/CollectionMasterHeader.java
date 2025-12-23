package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
public class CollectionMasterHeader {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "collection_master_header_date")
    private LocalDate collection_master_header_date;

    @Column(name = "collection_master_header_key")
    private String collection_master_header_key;

    @Column(name = "collection_master_header_number")
    private Integer collection_master_header_number;

    @ManyToOne
    @JoinColumn(name = "customer_master_id", referencedColumnName = "id")
    private CustomerMaster customer_master_id;

    @Column(name = "collection_master_header_added_user")
    private String collection_master_header_added_user;

}
