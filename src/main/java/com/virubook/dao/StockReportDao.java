package com.virubook.dao;

import com.virubook.entity.CustomerMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockReportDao extends JpaRepository<CustomerMaster,Integer> {

    @Query(value = "select ph.production_header_date as dates, ph.production_header_number as code, 'production' as col_type, pd.production_details_quantity as item_quantity from production_header as ph inner join production_details as pd on ph.production_header_key=pd.production_details_header_key and pd.item_master_id = ?1 and ph.production_header_date between ?2 and ?3 union all select ihm.invoice_header_date as dates, ihm.invoice_header_number as code, 'invoice' as col_type, idm.invoice_detail_quantity as in_quantity from invoice_header_master as ihm inner join invoice_detail as idm on ihm.invoice_header_key=idm.invoice_detail_header_key and idm.item_master_id = ?1 and ihm.invoice_header_date between ?2 and ?3 union all select sah.stock_adjustment_header_date as dates, sah.stock_adjustment_header_no as code, 'stock' as col_type, sad.stock_adjustment_details_quantity from stock_adjustment_header as sah inner join stock_adjustment_details as sad on sah.stock_adjustment_header_key = sad.stock_adjustment_details_header_key and sad.item_master_id = ?1 and sah.stock_adjustment_header_date between ?2 and ?3 order by dates asc;" ,nativeQuery = true)
    public List<Object[]> getStockReport(Integer itemNumber, String fromDate, String toDate);


    @Query(value = "select (select coalesce(sum(pd.production_details_quantity),0) from production_header as ph inner join production_details as pd on ph.production_header_key = pd.production_details_header_key and pd.item_master_id = ?1 and ph.production_header_date < ?2) - (select coalesce(sum(idm.invoice_detail_quantity),0) from invoice_header_master as ihm inner join invoice_detail as idm on ihm.invoice_header_key = idm.invoice_detail_header_key and idm.item_master_id=?1 and ihm.invoice_header_date < ?2) + (select coalesce(sum(stock_adjustment_details_quantity),0) from stock_adjustment_header as sah inner join stock_adjustment_details as sad on sah.stock_adjustment_header_key = sad.stock_adjustment_details_header_key and sad.item_master_id=?1 and sah.stock_adjustment_header_date < ?2) as previous_value;",nativeQuery = true)
    public String getPreviousValue(Integer itemId, String fromDate);


    @Query(value = "SELECT combined.item_master_id, im.item_short_name, icm.item_category_name, COALESCE(lm.location_master_name, 'Production') AS location_master_name, SUM(combined.quantity_change) AS stock_quantity FROM (SELECT pd.item_master_id, pd.production_details_quantity AS quantity_change, lm_prod.id AS location_master_id FROM production_header ph INNER JOIN production_details pd ON ph.production_header_key = pd.production_details_header_key INNER JOIN location_master lm_prod ON lm_prod.location_master_name = 'Production' WHERE ph.production_header_date BETWEEN ?1 AND ?2 UNION ALL SELECT idm.item_master_id, -idm.invoice_detail_quantity AS quantity_change, ihm.location_master_id FROM invoice_header_master ihm INNER JOIN invoice_detail idm ON ihm.invoice_header_key = idm.invoice_detail_header_key WHERE ihm.invoice_header_date BETWEEN ?1 AND ?2 UNION ALL SELECT sad.item_master_id, sad.stock_adjustment_details_quantity AS quantity_change, sah.location_master_id FROM stock_adjustment_header sah INNER JOIN stock_adjustment_details sad ON sah.stock_adjustment_header_key = sad.stock_adjustment_details_header_key WHERE sah.stock_adjustment_header_date BETWEEN ?1 AND ?2 UNION ALL SELECT std.item_master_id, -std.stock_transfer_details_quantity AS quantity_change, std.from_location AS location_master_id FROM stock_transfer_header sth INNER JOIN stock_transfer_details std ON sth.stock_transfer_header_key = std.stock_transfer_details_header_key WHERE sth.stock_transfer_header_date BETWEEN ?1 AND ?2 UNION ALL SELECT std.item_master_id, std.stock_transfer_details_quantity AS quantity_change, std.to_location AS location_master_id FROM stock_transfer_header sth INNER JOIN stock_transfer_details std ON sth.stock_transfer_header_key = std.stock_transfer_details_header_key WHERE sth.stock_transfer_header_date BETWEEN ?1 AND ?2) AS combined LEFT JOIN location_master lm ON combined.location_master_id = lm.id LEFT JOIN item_master im ON combined.item_master_id = im.id LEFT JOIN item_category_master icm ON im.item_category_master_id = icm.id GROUP BY combined.item_master_id, im.item_short_name, icm.item_category_name, COALESCE(lm.location_master_name, 'Production') ORDER BY location_master_name asc;", nativeQuery = true)
    public List<Object[]> getStockReportForAllItems(String fromDate, String toDate);


    @Query(value = "SELECT combined.item_master_id,\n" +
            "       im.item_short_name,\n" +
            "       icm.item_category_name,\n" +
            "       COALESCE(lm.location_master_name, 'Production') AS location_master_name,\n" +
            "       SUM(combined.quantity_change) AS stock_quantity\n" +
            "FROM (\n" +
            "    SELECT pd.item_master_id,\n" +
            "           pd.production_details_quantity AS quantity_change,\n" +
            "           lm_prod.id AS location_master_id\n" +
            "    FROM production_header ph\n" +
            "    INNER JOIN production_details pd\n" +
            "        ON ph.production_header_key = pd.production_details_header_key\n" +
            "    INNER JOIN location_master lm_prod\n" +
            "        ON lm_prod.location_master_name = 'Production'\n" +
            "    WHERE ph.production_header_date BETWEEN ?1 AND ?2 \n" +
            "\n" +
            "    UNION ALL\n" +
            "\n" +
            "    SELECT idm.item_master_id,\n" +
            "           -idm.invoice_detail_quantity AS quantity_change,\n" +
            "           ihm.location_master_id\n" +
            "    FROM invoice_header_master ihm\n" +
            "    INNER JOIN invoice_detail idm\n" +
            "        ON ihm.invoice_header_key = idm.invoice_detail_header_key\n" +
            "    WHERE ihm.invoice_header_date BETWEEN ?1 AND ?2 \n" +
            "\n" +
            "    UNION ALL\n" +
            "\n" +
            "    SELECT sad.item_master_id,\n" +
            "           sad.stock_adjustment_details_quantity AS quantity_change,\n" +
            "           sah.location_master_id\n" +
            "    FROM stock_adjustment_header sah\n" +
            "    INNER JOIN stock_adjustment_details sad\n" +
            "        ON sah.stock_adjustment_header_key = sad.stock_adjustment_details_header_key\n" +
            "    WHERE sah.stock_adjustment_header_date BETWEEN ?1 AND ?2 \n" +
            "\n" +
            "    UNION ALL\n" +
            "\n" +
            "    SELECT std.item_master_id,\n" +
            "           -std.stock_transfer_details_quantity AS quantity_change,\n" +
            "           std.from_location AS location_master_id\n" +
            "    FROM stock_transfer_header sth\n" +
            "    INNER JOIN stock_transfer_details std\n" +
            "        ON sth.stock_transfer_header_key = std.stock_transfer_details_header_key\n" +
            "    WHERE sth.stock_transfer_header_date BETWEEN ?1 AND ?2 \n" +
            "\n" +
            "    UNION ALL\n" +
            "\n" +
            "    SELECT std.item_master_id,\n" +
            "           std.stock_transfer_details_quantity AS quantity_change,\n" +
            "           std.to_location AS location_master_id\n" +
            "    FROM stock_transfer_header sth\n" +
            "    INNER JOIN stock_transfer_details std\n" +
            "        ON sth.stock_transfer_header_key = std.stock_transfer_details_header_key\n" +
            "    WHERE sth.stock_transfer_header_date BETWEEN ?1 AND ?2 \n" +
            ") AS combined\n" +
            "LEFT JOIN location_master lm\n" +
            "    ON combined.location_master_id = lm.id\n" +
            "LEFT JOIN item_master im\n" +
            "    ON combined.item_master_id = im.id\n" +
            "LEFT JOIN item_category_master icm\n" +
            "    ON im.item_category_master_id = icm.id\n" +
            "GROUP BY combined.item_master_id,\n" +
            "         im.item_short_name,\n" +
            "         icm.item_category_name,\n" +
            "         location_master_name\n" +
            "HAVING location_master_name = 'Shop Waragoda'\n" +
            "ORDER BY im.item_short_name;",nativeQuery = true)
    public List<Object[]> getStockReportForShopWaragoda(String fromDate,String toDate);


}
