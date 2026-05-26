package com.virubook.controller;

import com.virubook.dao.DeletedInvoiceHeaderMasterDao;
import com.virubook.dao.InvoiceHeaderMasterDao;
import com.virubook.entity.InvoiceHeaderMaster;
import com.virubook.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/invoice-header")
public class InvoiceHeaderMasterController {

    @Autowired
    private InvoiceHeaderMasterDao invoiceHeaderMasterDao;


    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public ModelAndView invoiceHeaderMasterView(){
        ModelAndView invoiceMasterUI = new ModelAndView();
        invoiceMasterUI.setViewName("invoiceMaster.html");
        return invoiceMasterUI;
    }


    @GetMapping(value = "/findall")
    public List<InvoiceHeaderMaster> findAllInvoiceHeaderMasters(){
        return invoiceHeaderMasterDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping(value = "/findall-limit-100")
    public List<InvoiceHeaderMaster> findAllInvoiceHeaderMastersLimit100(){
        return invoiceHeaderMasterDao.findAllInvoiceHeaderMasterLimit100();
    }


    @PostMapping
    public ResponseEntity<Object> saveInvoiceHeaderMaster(@RequestBody InvoiceHeaderMaster invoiceHeaderMaster){
        try {

            InvoiceHeaderMaster existingInvoiceHeaderMaster = invoiceHeaderMasterDao.findByInvoiceHeaderNumber(invoiceHeaderMaster.getInvoice_header_number());
            if(existingInvoiceHeaderMaster != null){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Invoice Number Already exists");
            }


            Integer nextInvoiceNumber = invoiceHeaderMasterDao.getNextInvoiceNumber();
            if (nextInvoiceNumber == null || nextInvoiceNumber.equals("")){
                invoiceHeaderMaster.setInvoice_header_number(1001);
            }else {
                invoiceHeaderMaster.setInvoice_header_number(nextInvoiceNumber);
            }



            String maxInvoiceHeaderCode = invoiceHeaderMasterDao.findMaxInvoiceCode();
            if (maxInvoiceHeaderCode == null || maxInvoiceHeaderCode.equals("")) {
                invoiceHeaderMaster.setInvoice_header_key("IN0001");
            }else {
                invoiceHeaderMaster.setInvoice_header_key(maxInvoiceHeaderCode);
            }

            InvoiceHeaderMaster savedInvoiceHeaderMaster = invoiceHeaderMasterDao.save(invoiceHeaderMaster);
            return ResponseEntity.ok(savedInvoiceHeaderMaster);


        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping
    public String updateInvoiceHeaderMaster(@RequestBody InvoiceHeaderMaster invoiceHeaderMaster){
        try {
            invoiceHeaderMasterDao.save(invoiceHeaderMaster);
            return "ok";
        }catch (Exception e){
            return "Update Unsuccessful"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteInvoiceHeaderMaster(@RequestBody InvoiceHeaderMaster invoiceHeaderMaster){
        try {

            invoiceHeaderMaster.setInvoice_header_master_delete_date(LocalDate.now());
            invoiceHeaderMasterDao.save(invoiceHeaderMaster);

            invoiceService.deleteInvoice(invoiceHeaderMaster.getInvoice_header_key());
            return "ok";
        }catch (Exception e){
            return "Delete Unsuccessful"+e.getMessage();
        }
    }




    @GetMapping(value = "/findIdByHeaderKey/{headerKey}")
    public String getIdFromHeaderKey(@PathVariable("headerKey")String headerKey){
        return invoiceHeaderMasterDao.findIdByInvoiceHeaderKey(headerKey);
    }



    @GetMapping(value = "/getNextInvoiceNumber")
    public Integer getNextInvoiceNumber(){
        Integer nextInvoiceNumber = invoiceHeaderMasterDao.getNextInvoiceNumber();
        if(nextInvoiceNumber == null || nextInvoiceNumber.equals("")){
            return 1001;
        }else {
            return nextInvoiceNumber;
        }
    }



    @GetMapping(value = "/getHeaderKeyByHeaderNumber/{number}")
    public String getHeaderKeyByHeaderNumber(@PathVariable Integer number){
        return invoiceHeaderMasterDao.getKeyByHeaderNumber(number);

    }


    @GetMapping(value = "/makelock/{headerKey}")
    public String makeLockInvoice(@PathVariable("headerKey") String headerKey){
        try {
            invoiceHeaderMasterDao.makeInvoiceLock(headerKey);
            return "ok";
        }catch (Exception e){
            return "error"+e.getMessage();
        }
    }



    @GetMapping(value = "/checkLockStatus/{headerKey}")
    public String checkLockStatus(@PathVariable("headerKey") String headerKey){
        try {
            return invoiceHeaderMasterDao.checkLockedStatus(headerKey);
        }catch (Exception e){
            return "error"+e.getMessage();
        }
    }


    @GetMapping(value = "/set-delete-user/{userName}/{headerKey}")
    public String setDeletedUser(@PathVariable("userName") String userName,@PathVariable("headerKey") String headerKey){
        try {
            invoiceHeaderMasterDao.setDeletedUser(userName,headerKey);
            return "ok";
        }catch (Exception e){
            return "error"+e.getMessage();
        }
    }


    @GetMapping(value = "/getInvoiceHeaderFromHeaderKey/{headerKey}")
    public InvoiceHeaderMaster getInvoiceHeaderFromHeaderKey(@PathVariable("headerKey")String headerKey){
        return invoiceHeaderMasterDao.getInvoiceHeaderMasterByHeaderKey(headerKey);
    }



}
