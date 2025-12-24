package com.virubook.controller;

import com.virubook.dao.DeletedInvoiceHeaderMasterDao;
import com.virubook.dao.InvoiceHeaderMasterDao;
import com.virubook.entity.InvoiceHeaderMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/delete-invoice-header")
public class DeleteInvoiceHeaderMasterController {

    @Autowired
    private DeletedInvoiceHeaderMasterDao deletedInvoiceHeaderMasterDao;




}
