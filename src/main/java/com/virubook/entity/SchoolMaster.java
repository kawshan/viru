package com.virubook.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "school_master")
@AllArgsConstructor
@NoArgsConstructor
public class SchoolMaster {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "school_master_name")
    private String school_master_name;

    @Column(name = "school_master_address")
    private String school_master_address;

    @Column(name = "school_master_area")
    private String school_master_area;

    @Column(name = "school_master_district")
    private String school_master_district;

    @Column(name = "school_master_contact_person")
    private String school_master_contact_person;

    @Column(name = "school_master_contact_number")
    private String school_master_contact_number;

    @Column(name = "school_master_email")
    private String school_master_email;





}
