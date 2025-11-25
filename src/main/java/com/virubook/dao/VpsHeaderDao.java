package com.virubook.dao;

import com.virubook.entity.VpsHeader;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface VpsHeaderDao extends JpaRepository<VpsHeader, Integer> {


    @Query(value = "select vh.id from VpsHeader vh where vh.vps_header_key = ?1")
    public String getIdFromHeaderKey(String vps_header_key);


    @Query(value = "select concat('VPS',lpad(max(substring(vps_header_key,4))+1,4,'0')) from vps_header as max_vps_header_key;",nativeQuery = true)
    public String nextVpsHeaderKey();

    @Query(value = "select max(vps_header_number) +1 from vps_header as next_vps_number;",nativeQuery = true)
    public Integer nextVpsHeaderNumber();

    @Transactional
    @Modifying
    @Query(value = "delete from vps_details where vps_details_header_key =?1",nativeQuery = true)
    public void deleteVpsDetails(String vps_details_key);






}
