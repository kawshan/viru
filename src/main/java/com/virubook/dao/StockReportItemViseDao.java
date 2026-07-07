package com.virubook.dao;

import com.virubook.entity.ItemMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockReportItemViseDao extends JpaRepository<ItemMaster,Integer> {



    @Query(value = "SELECT COALESCE(SUM(stock_quantity),0) AS previous_stock FROM (SELECT id.item_master_id, -id.invoice_detail_quantity AS stock_quantity FROM invoice_header_master ih INNER JOIN invoice_detail id ON ih.invoice_header_key=id.invoice_detail_header_key WHERE ih.location_master_id=?1 AND id.item_master_id=?2 AND ih.invoice_header_date<?3 UNION ALL SELECT sad.item_master_id, sad.stock_adjustment_details_quantity AS stock_quantity FROM stock_adjustment_header sah INNER JOIN stock_adjustment_details sad ON sah.stock_adjustment_header_key=sad.stock_adjustment_details_header_key WHERE sah.location_master_id=?1 AND sad.item_master_id=?2 AND sah.stock_adjustment_header_date<?3 UNION ALL SELECT std.item_master_id, std.stock_transfer_details_quantity AS stock_quantity FROM stock_transfer_header sth INNER JOIN stock_transfer_details std ON sth.stock_transfer_header_key=std.stock_transfer_details_header_key WHERE std.to_location=?1 AND std.item_master_id=?2 AND sth.stock_transfer_header_date<?3) stock_movements INNER JOIN item_master im ON stock_movements.item_master_id=im.id;",nativeQuery = true)
    public String getPreviousQuantity(String locationId, String itemId, String fromDate);

    @Query(value = "SELECT ih.invoice_header_date AS `date`,ih.invoice_header_key AS `code`,im.item_name AS `item_name`,id.invoice_detail_quantity AS `quantity` FROM invoice_header_master ih INNER JOIN invoice_detail id ON ih.invoice_header_key=id.invoice_detail_header_key INNER JOIN item_master im ON id.item_master_id=im.id WHERE ih.location_master_id=?1 AND id.item_master_id=?2 AND ih.invoice_header_date BETWEEN ?3 AND ?4 UNION ALL SELECT sah.stock_adjustment_header_date AS `date`,sah.stock_adjustment_header_key AS `code`,im.item_name AS `item_name`,sad.stock_adjustment_details_quantity AS `quantity` FROM stock_adjustment_header sah INNER JOIN stock_adjustment_details sad ON sah.stock_adjustment_header_key=sad.stock_adjustment_details_header_key INNER JOIN item_master im ON sad.item_master_id=im.id WHERE sah.location_master_id=?1 AND sad.item_master_id=?2 AND sah.stock_adjustment_header_date BETWEEN ?3 AND ?4 UNION ALL SELECT sth.stock_transfer_header_date AS `date`,sth.stock_transfer_header_key AS `code`,im.item_name AS `item_name`,std.stock_transfer_details_quantity AS `quantity` FROM stock_transfer_header sth INNER JOIN stock_transfer_details std ON sth.stock_transfer_header_key=std.stock_transfer_details_header_key INNER JOIN item_master im ON std.item_master_id=im.id WHERE std.to_location=?1 AND std.item_master_id=?2 AND sth.stock_transfer_header_date BETWEEN ?3 AND ?4 ORDER BY `date`,`code`;",nativeQuery = true)
    public List<Object[]> getStockReportItemVise(String locationId, String itemId, String fromDate, String toDate);



}
