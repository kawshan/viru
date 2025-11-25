package com.virubook.dao;

import com.virubook.entity.VpsDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VpsDetailsDao extends JpaRepository<VpsDetails,Integer> {

    @Query(value = "select vd from VpsDetails vd where vd.vps_details_header_key=?1")
    List<VpsDetails> findVpsDetailsByHeaderKey(String headerKey);

    @Query(value = "SELECT MAX(h.vps_header_total_invoice_value) - IFNULL(SUM(d.vps_details_amount), 0) AS remaining_balance FROM vps_header h LEFT JOIN vps_details d ON h.vps_header_key = d.vps_details_header_key WHERE h.vps_header_key = ?1 ",nativeQuery = true)
    public String getRemainingBalance(String headerKey);


}
