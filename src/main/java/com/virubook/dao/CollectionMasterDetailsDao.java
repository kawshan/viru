package com.virubook.dao;

import com.virubook.entity.CollectionMasterDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CollectionMasterDetailsDao extends JpaRepository<CollectionMasterDetails,Integer> {

    @Query(value = "select cmd from CollectionMasterDetails cmd where cmd.collection_master_details_header_key=?1")
    public List<CollectionMasterDetails> getAllByHeaderKey(String headerKey);

}
