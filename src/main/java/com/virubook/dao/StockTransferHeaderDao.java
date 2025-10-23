package com.virubook.dao;

import com.virubook.entity.StockTransferHeader;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockTransferHeaderDao extends JpaRepository<StockTransferHeader, Integer> {

    @Query(value = "select concat('STTR',lpad(max(substring(stock_transfer_header_key,5))+1,4,'0')) from stock_transfer_header as max_stock_transfer_header;",nativeQuery = true)
    public String getNextStockTransferCode();


    @Query(value = "select max(stock_transfer_header_number)+1 from stock_transfer_header as next_stock_transfer_number;",nativeQuery = true)
    public Integer getNextStockTransferNumber();


    @Query(value = "select st from StockTransferHeader st order by st.id desc limit 100")
    public List<StockTransferHeader> getLastHundredStockTransferHeaders();



    @Query(value = "select sth from StockTransferHeader sth where sth.stock_transfer_header_key=?1")
    public StockTransferHeader getStockTransferHeaderByKey(String key);

    @Transactional
    @Modifying
    @Query(value = "delete from stock_transfer_details where stock_transfer_details_header_key = ?1;",nativeQuery = true)
    public void deleteStockTransferDetailsFromHeaderKey(String headerKey);



}
