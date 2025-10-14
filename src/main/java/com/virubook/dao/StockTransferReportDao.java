package com.virubook.dao;

import com.virubook.entity.StockAdjustmentHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockTransferReportDao extends JpaRepository<StockAdjustmentHeader,Integer> {


    @Query(value = "select\n" +
            "sth.stock_transfer_header_date, sth.stock_transfer_header_number, sth.stock_transfer_header_key,\n" +
            "im.item_short_name, std.stock_transfer_details_quantity, lm.location_master_name as from_location, lm2.location_master_name as to_location\n" +
            "from stock_transfer_header as sth\n" +
            "join stock_transfer_details as std on sth.stock_transfer_header_key = std.stock_transfer_details_header_key\n" +
            "join item_master as im on im.id = std.item_master_id\n" +
            "join location_master as lm on lm.id =std.from_location\n" +
            "join location_master as lm2 on lm2.id =std.to_location\n" +
            "where  sth.stock_transfer_header_date between ?1 and ?2 \n" +
            "order by\n" +
            "sth.stock_transfer_header_number asc;",nativeQuery = true)
    public List<Object[]> getStockAdjustmentReport(String fromDate, String toDate);


}
