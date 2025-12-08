package com.virubook.controller;

import com.virubook.dao.InvoiceDetailDao;
import com.virubook.dao.PerfomaInvoiceDetailDao;
import com.virubook.entity.InvoiceDetail;
import com.virubook.entity.PerfomaInvoiceDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/perfomainvoiceDetail")
public class PerfomaInvoiceDetailController {

    @Autowired
    private PerfomaInvoiceDetailDao perfomaInvoiceDetailDao;


    @GetMapping(value = "/findall")
    public List<PerfomaInvoiceDetail> findAllInvoiceDetails(){
        return perfomaInvoiceDetailDao.findAll();
    }

    @PostMapping
    public String saveInvoiceDetail(@RequestBody PerfomaInvoiceDetail perfomainvoiceDetail){
        try {
            perfomaInvoiceDetailDao.save(perfomainvoiceDetail);
            return "ok";
        }catch (Exception e){
            return "Save Invoice Detail Failed"+e.getMessage();
        }
    }

    @PutMapping
    public String updateInvoiceDetail(@RequestBody PerfomaInvoiceDetail perfomainvoiceDetail){
        try {
            perfomaInvoiceDetailDao.save(perfomainvoiceDetail);
            return "ok";
        }catch (Exception e){
            return "Update Invoice Detail Failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteInvoiceDetail(@RequestBody PerfomaInvoiceDetail perfomainvoiceDetail){
        try {
            perfomaInvoiceDetailDao.delete(perfomainvoiceDetail);
            return "ok";
        }catch (Exception e){
            return "Delete Invoice Detail Failed"+e.getMessage();
        }
    }


    @GetMapping(value = "/getFromHeaderKey/{headerKey}")
    public List<PerfomaInvoiceDetail> getInvoiceDetailFromHeaderKey(@PathVariable String headerKey){
        return  perfomaInvoiceDetailDao.getAllByInvoiceHeader(headerKey);
    }

    @GetMapping(value = "/getGrossValue/{headerKey}")
    public String getGrossValue(@PathVariable("headerKey")String headerKey){
        return perfomaInvoiceDetailDao.getGrossValue(headerKey);
    }

    @GetMapping(value = "/getTotalDiscount/{headerKey}")
    public String getTotalDiscount(@PathVariable("headerKey")String headerKey){
        return perfomaInvoiceDetailDao.getTotalDiscount(headerKey);
    }


    @GetMapping(value = "/getNetValue/{headerKey}")
    public String getNetValue(@PathVariable("headerKey")String headerKey){
        return perfomaInvoiceDetailDao.getNetValue(headerKey);
    }


    @GetMapping(value = "/getAdditionalDiscountValue/{headerKey}")
    public String getAdditionalDiscountValue(@PathVariable("headerKey") String headerKey){
        return perfomaInvoiceDetailDao.getAdditionalDiscountValue(headerKey);
    }


    @GetMapping(value = "/getItemCountFromHeaderKey/{headerKey}")
    public String getItemCount(@PathVariable("headerKey") String headerKey){
        return perfomaInvoiceDetailDao.getItemCountFromInvoiceNumber(headerKey);
    }


}
