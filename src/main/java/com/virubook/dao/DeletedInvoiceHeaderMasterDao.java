package com.virubook.dao;

import com.virubook.entity.DeletedInvoiceHeaderMaster;
import com.virubook.entity.InvoiceHeaderMaster;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeletedInvoiceHeaderMasterDao extends JpaRepository<DeletedInvoiceHeaderMaster,Integer> {




}
