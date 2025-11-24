package com.virubook.dao;

import com.virubook.entity.VpsDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VpsDetailsDao extends JpaRepository<VpsDetails,Integer> {

    @Query(value = "select vd from VpsDetails vd where vd.vps_details_header_key=?1")
    List<VpsDetails> findVpsDetailsByHeaderKey(String headerKey);



}
