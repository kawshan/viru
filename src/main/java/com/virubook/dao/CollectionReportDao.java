package com.virubook.dao;

import com.virubook.dto.CollectionReportDto;
import com.virubook.entity.CollectionMasterHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CollectionReportDao extends JpaRepository<CollectionMasterHeader,Integer> {



    @Query(value = "select cm.customer_name, inv.invoice_number, inv.invoiced_value, ifnull(col.collection_amount,0) as collection_amount, (inv.invoiced_value - ifnull(col.collection_amount,0)) as remaining_amount from (select ih.customer_master_id, ih.invoice_header_number as invoice_number, sum(idm.invoice_detail_value) as invoiced_value from invoice_header_master as ih inner join invoice_detail as idm on ih.invoice_header_key = idm.invoice_detail_header_key where ih.invoice_header_master_pay_type = 'credit' group by ih.customer_master_id, ih.invoice_header_number) as inv inner join customer_master as cm on cm.id = inv.customer_master_id left join (select cmh.customer_master_id, cmd.collection_master_details_invoice_number as invoice_number, sum(cmd.collection_master_details_amount) as collection_amount from collection_master_header as cmh inner join collection_master_details as cmd on cmh.collection_master_header_key = cmd.collection_master_details_header_key group by cmh.customer_master_id, cmd.collection_master_details_invoice_number) as col on col.customer_master_id = inv.customer_master_id and col.invoice_number = inv.invoice_number where (inv.invoiced_value - ifnull(col.collection_amount,0)) > 0",nativeQuery = true)
    public List<Object[]> getCollectionReport();

    @Query(value = "select cm.customer_name, inv.invoice_number, inv.invoiced_value, ifnull(col.collection_amount,0) as collection_amount, (inv.invoiced_value - ifnull(col.collection_amount,0)) as remaining_amount from (select ih.customer_master_id, ih.invoice_header_number as invoice_number, sum(idm.invoice_detail_value) as invoiced_value from invoice_header_master as ih inner join invoice_detail as idm on ih.invoice_header_key = idm.invoice_detail_header_key where ih.invoice_header_master_pay_type = 'credit' group by ih.customer_master_id, ih.invoice_header_number) as inv inner join customer_master as cm on cm.id = inv.customer_master_id left join (select cmh.customer_master_id, cmd.collection_master_details_invoice_number as invoice_number, sum(cmd.collection_master_details_amount) as collection_amount from collection_master_header as cmh inner join collection_master_details as cmd on cmh.collection_master_header_key = cmd.collection_master_details_header_key group by cmh.customer_master_id, cmd.collection_master_details_invoice_number) as col on col.customer_master_id = inv.customer_master_id and col.invoice_number = inv.invoice_number where (inv.invoiced_value - ifnull(col.collection_amount,0)) > 0 and cm.customer_name=?1",nativeQuery = true)
    public List<Object[]> getCollectionReportCustomerVise(String customerName);




}
