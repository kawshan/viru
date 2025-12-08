package com.virubook.dao;

import com.virubook.entity.InvoiceHeaderMaster;
import com.virubook.entity.PerfomaInvoiceHeaderMaster;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PerfomaInvoiceHeaderMasterDao extends JpaRepository<PerfomaInvoiceHeaderMaster,Integer> {

    @Query(value = "select ihm from PerfomaInvoiceHeaderMaster ihm order by ihm.id limit 100")
    public List<PerfomaInvoiceHeaderMaster> findAllInvoiceHeaderMasterLimit100();


    @Query(value = "select concat('IN',lpad(max(substring(invoice_header_key,3))+1,4,'0')) as max_invoice_code from perfoma_invoice_header_master;",nativeQuery = true)
    public String findMaxInvoiceCode();

    @Query(value = "select ihm from PerfomaInvoiceHeaderMaster ihm where ihm.invoice_header_number=?1")
    public PerfomaInvoiceHeaderMaster findByInvoiceHeaderNumber(Integer invoiceHeaderNumber);


    @Query(value = "select id from perfoma_invoice_header_master where invoice_header_key=?1",nativeQuery = true)
    public String findIdByInvoiceHeaderKey(String invoiceHeaderKey);


    @Query(value = "select max(invoice_header_number)+1 from perfoma_invoice_header_master as next_invoice_Number;",nativeQuery = true)
    public Integer getNextInvoiceNumber();


    @Transactional
    @Modifying
    @Query(value = "delete from perfoma_invoice_detail where invoice_detail_header_key=?1;",nativeQuery = true)
    public void deleteInvoiceDetailByInvoiceHeaderKey(String invoiceHeaderKey);


    @Query(value = "select ihm.invoice_header_key from PerfomaInvoiceHeaderMaster ihm where ihm.invoice_header_number=?1")
    public String getKeyByHeaderNumber(Integer headerNumber);


}
