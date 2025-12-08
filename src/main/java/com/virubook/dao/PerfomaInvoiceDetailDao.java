package com.virubook.dao;

import com.virubook.entity.InvoiceDetail;
import com.virubook.entity.PerfomaInvoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PerfomaInvoiceDetailDao extends JpaRepository<PerfomaInvoiceDetail,Integer> {


    @Query(value = "select ind from PerfomaInvoiceDetail ind where ind.invoice_detail_header_key=?1 order by ind.id desc ")
    public List<PerfomaInvoiceDetail> getAllByInvoiceHeader(String headerKey);

    @Query(value = "select sum(invoice_detail_rate*invoice_detail_quantity) as gross_value from perfoma_invoice_detail  where invoice_detail_header_key=?1",nativeQuery = true)
    public String getGrossValue(String headerKey);

    @Query(value = "select coalesce(sum(invoice_detail_discount),0) as total_discount from perfoma_invoice_detail  where invoice_detail_header_key=?1",nativeQuery = true)
    public String getTotalDiscount(String headerKey);

    @Query(value = "select sum(invoice_detail_value) as net_value from perfoma_invoice_detail where invoice_detail_header_key=?1",nativeQuery = true)
    public String getNetValue(String headerKey);

    @Query(value = "SELECT (SELECT SUM(invoice_detail_value / 100) FROM perfoma_invoice_detail WHERE invoice_detail_header_key = ?1) * COALESCE((SELECT invoice_header_master_additional_discount FROM perfoma_invoice_header_master WHERE invoice_header_key = ?1), 0) AS discounted_total",nativeQuery = true)
    public String getAdditionalDiscountValue(String headerKey);

    @Query(value = "select count(*) from perfoma_invoice_detail where invoice_detail_header_key=?1",nativeQuery = true)
    public String getItemCountFromInvoiceNumber(String headerKey);



}
