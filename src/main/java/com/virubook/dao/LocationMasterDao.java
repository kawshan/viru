package com.virubook.dao;

import com.virubook.entity.LocationMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LocationMasterDao extends JpaRepository<LocationMaster,Integer> {



    @Query(value = "select concat('L',lpad(max(substring(location_master_key,2))+1,4,'0')) as max_location_key from location_master;\n",nativeQuery = true)
    public String getMaxLocationKey();




}
