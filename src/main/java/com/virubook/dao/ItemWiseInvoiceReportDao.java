package com.virubook.dao;

import com.virubook.entity.InvoiceHeaderMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemWiseInvoiceReportDao extends JpaRepository<InvoiceHeaderMaster,Integer> {


    @Query(value = "SELECT cm.customer_name, ihm.invoice_header_date, ihm.invoice_header_number, im.item_short_name, (idm.invoice_detail_rate - COALESCE(idm.invoice_detail_discount,0)) AS rate, idm.invoice_detail_quantity, (idm.invoice_detail_value) * (1 - IFNULL(ihm.invoice_header_master_additional_discount,0) / 100) AS net_invoice_value, lm.location_master_name, ihm.invoice_header_key FROM invoice_header_master AS ihm LEFT JOIN invoice_detail AS idm ON ihm.invoice_header_key = idm.invoice_detail_header_key LEFT JOIN item_master AS im ON idm.item_master_id = im.id INNER JOIN customer_master AS cm ON ihm.customer_master_id = cm.id INNER JOIN location_master AS lm ON ihm.location_master_id = lm.id WHERE ihm.invoice_header_date BETWEEN ?1 AND ?2 ORDER BY ihm.invoice_header_date ASC;",nativeQuery = true)
    public List<Object[]> getItemWiseInvoiceReport(String fromDate, String toDate);


}
