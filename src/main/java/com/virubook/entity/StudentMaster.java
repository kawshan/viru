package com.virubook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table
@AllArgsConstructor
@NoArgsConstructor
public class StudentMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "student_master_full_name")
    private String student_master_full_name;

    @Column(name = "student_master_addmission_no")
    private String student_master_addmission_no;

    @Column(name = "student_master_permenent_residence")
    private String student_master_permenent_residence;

    @Column(name = "student_master_guardian_full_name")
    private String student_master_guardian_full_name;

    @Column(name = "student_master_guardian_nic")
    private String student_master_guardian_nic;

    @Column(name = "student_master_guardian_contact_no_mobile")
    private String student_master_guardian_contact_no_mobile;

    @Column(name = "student_master_guardian_contact_no_home")
    private String student_master_guardian_contact_no_home;

    @Column(name = "student_master_status")
    private Boolean student_master_status;

    @ManyToOne
    @JoinColumn(name = "grade_id", referencedColumnName = "id")
    private Grade grade_id;


    @ManyToOne
    @JoinColumn(name = "school_master_id",referencedColumnName = "id")
    private SchoolMaster school_master_id;
}
