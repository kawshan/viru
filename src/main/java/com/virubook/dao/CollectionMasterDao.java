package com.virubook.dao;

import com.virubook.entity.CollectionMasterHeader;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CollectionMasterDao extends JpaRepository<CollectionMasterHeader,Integer> {

    @Query(value = "select concat('COL',lpad(max(substring(collection_master_header_key,4))+1,4,'0')) as max_colllection_code from collection_master_header;",nativeQuery = true)
    public String findMaxCollectionCode();

    @Query(value = "select max(collection_master_header_number)+1 from collection_master_header as next_collection_Number;",nativeQuery = true)
    public Integer getNextInvoiceNumber();

    @Query(value = "select id from collection_master_header where collection_master_header_key=?1",nativeQuery = true)
    public String findIdByHeaderKey(String key);

    @Transactional
    @Modifying
    @Query(value = "delete from collection_master_details where collection_master_details_header_key=?1",nativeQuery = true)
    public void deleteCollectionDetailsByCollectionHeaderKey(String productionHeaderKey);


}
