package com.virubook.dao;

import com.virubook.entity.StockAdjustmentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeleteInvoiceReportDao extends JpaRepository<StockAdjustmentDetails,Integer> {

    @Query(value = "select cm.customer_name, dihm.invoice_header_date, dihm.invoice_header_number, im.item_short_name,\n" +
            "(didm.invoice_detail_value) * (1- ifnull(dihm.invoice_header_master_additional_discount,0)/100) as net_invoice_value,\n" +
            "dihm.invoice_header_master_deleted_user\n" +
            "from deleted_invoice_header_master as dihm\n" +
            "inner join deleted_invoice_detail didm on dihm.invoice_header_key = didm.invoice_detail_header_key\n" +
            "inner join customer_master cm on dihm.customer_master_id = cm.id\n" +
            "inner join item_master im on didm.item_master_id = im.id\n" +
            "where dihm.invoice_header_date between ?1 and ?2 order by dihm.invoice_header_date asc;",nativeQuery = true)
    public List<Object[]> getDeleteStockReport(String fromDate, String toDate);




}
