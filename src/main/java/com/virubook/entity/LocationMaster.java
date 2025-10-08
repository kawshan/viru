package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "location_master")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "location_master_key")
    private String location_master_key;

    @Column(name = "location_master_code")
    private String location_master_code;

    @Column(name = "location_master_name")
    private String location_master_name;

    @Column(name = "location_master_status")
    private Boolean location_master_status;


}
