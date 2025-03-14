package com.virubook.dao;

import com.virubook.entity.CustomerMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockReportDao extends JpaRepository<CustomerMaster,Integer> {

    @Query(value = "select ph.production_header_date as dates, ph.production_header_number as code, 'production' as col_type, pd.production_details_quantity as item_quantity from production_header as ph inner join production_details as pd on ph.production_header_key=pd.production_details_header_key and pd.item_master_id = ?1 and ph.production_header_date between ?2 and ?3 union all select ihm.invoice_header_date as dates, ihm.invoice_header_number as code, 'invoice' as col_type, idm.invoice_detail_quantity as in_quantity from invoice_header_master as ihm inner join invoice_detail as idm on ihm.invoice_header_key=idm.invoice_detail_header_key and idm.item_master_id = ?1 and ihm.invoice_header_date between ?2 and ?3 order by dates asc;" ,nativeQuery = true)
    public List<Object[]> getStockReport(Integer itemNumber, String fromDate, String toDate);


    @Query(value = "select (select coalesce(sum(pd.production_details_quantity),0) from production_header as ph inner join production_details as pd on ph.production_header_key = pd.production_details_header_key and pd.item_master_id = ?1 and ph.production_header_date < ?2 )-(select coalesce(sum(idm.invoice_detail_quantity),0) from invoice_header_master as ihm inner join invoice_detail as idm on ihm.invoice_header_key = idm.invoice_detail_header_key and idm.item_master_id=?1 and ihm.invoice_header_date < ?2 )as starting_value;",nativeQuery = true)
    public String getPreviousValue(Integer itemId, String fromDate);



}
