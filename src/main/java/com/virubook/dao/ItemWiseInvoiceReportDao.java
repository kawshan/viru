package com.virubook.dao;

import com.virubook.entity.InvoiceHeaderMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemWiseInvoiceReportDao extends JpaRepository<InvoiceHeaderMaster,Integer> {


    @Query(value = "select cm.customer_name, ihm.invoice_header_date, ihm.invoice_header_number, im.item_short_name,\n" +
            "(idm.invoice_detail_rate - (coalesce(idm.invoice_detail_discount,0))) as rate,idm.invoice_detail_quantity,\n" +
            "(idm.invoice_detail_value) * (1 - ifnull(ihm.invoice_header_master_additional_discount, 0) / 100)as net_invoice_value,\n" +
            "lm.location_master_name\n" +
            "from invoice_header_master as ihm inner join invoice_detail as idm on ihm.invoice_header_key = idm.invoice_detail_header_key\n" +
            "inner join item_master im on idm.item_master_id = im.id\n" +
            "inner join customer_master cm on ihm.customer_master_id = cm.id\n" +
            "inner join location_master lm on ihm.location_master_id = lm.id\n" +
            "where ihm.invoice_header_date between ?1 and ?2 order by ihm.invoice_header_date asc;",nativeQuery = true)
    public List<Object[]> getItemWiseInvoiceReport(String fromDate, String toDate);


}
