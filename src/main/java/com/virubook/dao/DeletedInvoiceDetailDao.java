package com.virubook.dao;

import com.virubook.entity.DeletedInvoiceDetail;
import com.virubook.entity.InvoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeletedInvoiceDetailDao extends JpaRepository<DeletedInvoiceDetail,Integer> {




}
