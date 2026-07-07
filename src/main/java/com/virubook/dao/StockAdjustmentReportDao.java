package com.virubook.dao;

import com.virubook.entity.StockAdjustmentHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockAdjustmentReportDao extends JpaRepository<StockAdjustmentHeader,Integer> {


    @Query(value = "select sah.stock_adjustment_header_date, sah.stock_adjustment_header_key, sah.stock_adjustment_header_no, im.item_short_name, sad.stock_adjustment_details_quantity from stock_adjustment_header sah inner join stock_adjustment_details as sad on sah.stock_adjustment_header_key = sad.stock_adjustment_details_header_key inner join item_master im on sad.item_master_id = im.id inner join location_master lm on sah.location_master_id = lm.id where lm.id=?1 and sah.stock_adjustment_header_date between ?2 and ?3 order by sah.stock_adjustment_header_date asc;",nativeQuery = true)
    public List<Object[]> getStockAdjustmentReport(String locationId, String fromDate, String toDate);


}
