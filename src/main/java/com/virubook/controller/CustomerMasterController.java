package com.virubook.controller;

import com.virubook.dao.CustomerMasterDao;
import com.virubook.entity.CustomerMaster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer-master")
public class CustomerMasterController {

    @Autowired
    private CustomerMasterDao customerMasterDao;

    @GetMapping(value = "/findall")
    public List<CustomerMaster> listCustomerMaster() {
        return customerMasterDao.findAll();
    }



    @PostMapping
    public String saveCustomerMaster(@RequestBody CustomerMaster customerMaster) {
        try {
            customerMasterDao.save(customerMaster);
            return "ok";
        }catch (Exception e){
            return "customer save failed"+e.getMessage();
        }
    }


    @PutMapping
    public String updateCustomerMaster(@RequestBody CustomerMaster customerMaster) {
        try {
            customerMasterDao.save(customerMaster);
            return "ok";
        }catch (Exception e){
            return "customer update failed"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteCustomerMaster(@RequestBody CustomerMaster customerMaster) {
        try {
            customerMaster.setCustomer_status(false);
            customerMasterDao.save(customerMaster);
            return "ok";
        }catch (Exception e){
            return "customer delete failed"+e.getMessage();
        }
    }




}
