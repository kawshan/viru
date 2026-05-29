package com.virubook.dao;

import com.virubook.entity.PdcMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PdcMasterDao extends JpaRepository<PdcMaster,Integer> {


    @Query(value = "select pdc from PdcMaster pdc where pdc.pdc_master_cheque_no=?1")
    public PdcMaster getByChequeNo(String checkNo);

}
