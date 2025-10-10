package com.virubook.dao;

import com.virubook.entity.StockTransferDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockTransferDetailsDao extends JpaRepository<StockTransferDetails, Integer> {

    @Query(value = "select std from StockTransferDetails std where std.stock_transfer_details_header_key= ?1")
    List<StockTransferDetails> findByHeaderKey(String headerKey);





}
