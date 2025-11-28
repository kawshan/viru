package com.virubook.dao;

import com.virubook.dto.VpsReportDto;
import com.virubook.entity.VpsHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VpsReportDao extends JpaRepository<VpsHeader,Integer> {


    @Query(value = "select\n" +
            "vh.vps_header_invoice_number, vh.vps_header_key, vh.vps_header_number, vh.vps_header_saved_date, vd.vps_details_date, vd.vps_details_amount, vd.vps_details_payment_type\n" +
            "from\n" +
            "vps_header vh inner join vps_details as vd on vh.vps_header_key = vd.vps_details_header_key\n" +
            "where vh.vps_header_saved_date between ?1 and ?2;",nativeQuery = true)
    public List<Object[]> getVpsReport(String fromDate, String toDate);




}
