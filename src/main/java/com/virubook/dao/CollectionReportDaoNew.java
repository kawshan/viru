package com.virubook.dao;

import com.virubook.dto.CollectionReportDtoNew;
import com.virubook.entity.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CollectionReportDaoNew extends JpaRepository<ItemCategory,Integer> {

    @Query(value = "SELECT cmh.collection_master_header_number, cmh.collection_master_header_date, cmh.collection_master_header_added_user, cmd.collection_master_details_invoice_number, cmd.collection_master_details_type, cmd.collection_master_details_bank, cmd.collection_master_details_branch, cmd.collection_master_details_check_no, cmd.collection_master_details_amount FROM collection_master_header AS cmh LEFT JOIN collection_master_details AS cmd ON cmh.collection_master_header_key = cmd.collection_master_details_header_key WHERE cmh.collection_master_header_date BETWEEN ?1 AND ?2",nativeQuery = true)
    public List<Object[]> getAllCollectionReportNew(String fromDate, String toDate);


}
