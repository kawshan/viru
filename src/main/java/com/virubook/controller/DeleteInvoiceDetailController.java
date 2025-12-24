package com.virubook.controller;

import com.virubook.dao.DeletedInvoiceDetailDao;
import com.virubook.dao.InvoiceDetailDao;
import com.virubook.entity.InvoiceDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/delete-invoiceDetail")
public class DeleteInvoiceDetailController {

    @Autowired
    private DeletedInvoiceDetailDao deletedInvoiceDetailDao;



}
