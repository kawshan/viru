package com.virubook.controller;

import com.virubook.dao.InvoiceHeaderMasterDao;
import com.virubook.dao.PerfomaInvoiceHeaderMasterDao;
import com.virubook.entity.InvoiceHeaderMaster;
import com.virubook.entity.PerfomaInvoiceHeaderMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/perfoma-invoice-header")
public class PreformaInvoiceHeaderMasterController {

    @Autowired
    private PerfomaInvoiceHeaderMasterDao perfomaInvoiceHeaderMasterDao;

    @GetMapping
    public ModelAndView invoiceHeaderMasterView(){
        ModelAndView invoiceMasterUI = new ModelAndView();
        invoiceMasterUI.setViewName("perfomainvoiceMaster.html");
        return invoiceMasterUI;
    }


    @GetMapping(value = "/findall")
    public List<PerfomaInvoiceHeaderMaster> findAllInvoiceHeaderMasters(){
        return perfomaInvoiceHeaderMasterDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping(value = "/findall-limit-100")
    public List<PerfomaInvoiceHeaderMaster> findAllInvoiceHeaderMastersLimit100(){
        return perfomaInvoiceHeaderMasterDao.findAllInvoiceHeaderMasterLimit100();
    }


    @PostMapping
    public ResponseEntity<Object> saveInvoiceHeaderMaster(@RequestBody PerfomaInvoiceHeaderMaster perfomaInvoiceHeaderMaster){
        try {

            PerfomaInvoiceHeaderMaster existingInvoiceHeaderMaster = perfomaInvoiceHeaderMasterDao.findByInvoiceHeaderNumber(perfomaInvoiceHeaderMaster.getInvoice_header_number());
            if(existingInvoiceHeaderMaster != null){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Invoice Number Already exists");
            }


            Integer nextInvoiceNumber = perfomaInvoiceHeaderMasterDao.getNextInvoiceNumber();
            if (nextInvoiceNumber == null || nextInvoiceNumber.equals("")){
                perfomaInvoiceHeaderMaster.setInvoice_header_number(1001);
            }else {
                perfomaInvoiceHeaderMaster.setInvoice_header_number(nextInvoiceNumber);
            }



            String maxInvoiceHeaderCode = perfomaInvoiceHeaderMasterDao.findMaxInvoiceCode();
            if (maxInvoiceHeaderCode == null || maxInvoiceHeaderCode.equals("")) {
                perfomaInvoiceHeaderMaster.setInvoice_header_key("IN0001");
            }else {
                perfomaInvoiceHeaderMaster.setInvoice_header_key(maxInvoiceHeaderCode);
            }

            PerfomaInvoiceHeaderMaster savedInvoiceHeaderMaster = perfomaInvoiceHeaderMasterDao.save(perfomaInvoiceHeaderMaster);
            return ResponseEntity.ok(savedInvoiceHeaderMaster);


        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping
    public String updateInvoiceHeaderMaster(@RequestBody PerfomaInvoiceHeaderMaster perfomaInvoiceHeaderMaster){
        try {
            perfomaInvoiceHeaderMasterDao.save(perfomaInvoiceHeaderMaster);
            return "ok";
        }catch (Exception e){
            return "Update Unsuccessful"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteInvoiceHeaderMaster(@RequestBody PerfomaInvoiceHeaderMaster perfomaInvoiceHeaderMaster){
        try {
            perfomaInvoiceHeaderMasterDao.deleteInvoiceDetailByInvoiceHeaderKey(perfomaInvoiceHeaderMaster.getInvoice_header_key());
            perfomaInvoiceHeaderMasterDao.delete(perfomaInvoiceHeaderMaster);
            return "ok";
        }catch (Exception e){
            return "Delete Unsuccessful"+e.getMessage();
        }
    }




    @GetMapping(value = "/findIdByHeaderKey/{headerKey}")
    public String getIdFromHeaderKey(@PathVariable("headerKey")String headerKey){
        return perfomaInvoiceHeaderMasterDao.findIdByInvoiceHeaderKey(headerKey);
    }



    @GetMapping(value = "/getNextInvoiceNumber")
    public Integer getNextInvoiceNumber(){
        Integer nextInvoiceNumber = perfomaInvoiceHeaderMasterDao.getNextInvoiceNumber();
        if(nextInvoiceNumber == null || nextInvoiceNumber.equals("")){
            return 1001;
        }else {
            return nextInvoiceNumber;
        }
    }



    @GetMapping(value = "/getHeaderKeyByHeaderNumber/{number}")
    public String getHeaderKeyByHeaderNumber(@PathVariable Integer number){
        return perfomaInvoiceHeaderMasterDao.getKeyByHeaderNumber(number);
    }


}
