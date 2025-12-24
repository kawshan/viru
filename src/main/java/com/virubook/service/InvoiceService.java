package com.virubook.service;

import com.virubook.dao.InvoiceHeaderMasterDao;
import com.virubook.entity.InvoiceHeaderMaster;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceHeaderMasterDao invoiceHeaderMasterDao;

    @Transactional
    public void deleteInvoice(String headerKey){
        invoiceHeaderMasterDao.insertIntoDeletedTable(headerKey);
        invoiceHeaderMasterDao.deleteInvoiceHeader(headerKey);


        invoiceHeaderMasterDao.insertIntoDeleteDetailsTable(headerKey);
        invoiceHeaderMasterDao.deleteFromDetailsTable(headerKey);


    }




}
