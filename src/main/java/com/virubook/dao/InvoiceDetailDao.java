package com.virubook.dao;

import com.virubook.entity.InvoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvoiceDetailDao extends JpaRepository<InvoiceDetail,Integer> {


    @Query(value = "select ind from InvoiceDetail ind where ind.invoice_detail_header_key=?1")
    public List<InvoiceDetail> getAllByInvoiceHeader(String headerKey);



}
