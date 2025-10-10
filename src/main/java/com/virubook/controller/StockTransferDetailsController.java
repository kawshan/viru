package com.virubook.controller;

import com.virubook.dao.StockTransferDetailsDao;
import com.virubook.entity.StockTransferDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/stock_transfer_details")
public class StockTransferDetailsController {

    @Autowired
    private StockTransferDetailsDao stockTransferDetailsDao;


    @GetMapping(value = "/findall")
    public List<StockTransferDetails> findAll() {
        return stockTransferDetailsDao.findAll();
    }


    @GetMapping(value = "/get_by_header_key/{headerKey}")
    public List<StockTransferDetails> getByHeaderKey(@PathVariable("headerKey") String headerKey) {
        return stockTransferDetailsDao.findByHeaderKey(headerKey);
    }


    @PostMapping
    public String saveStockTransferDetails(@RequestBody StockTransferDetails stockTransferDetails) {
        try {
            stockTransferDetailsDao.save(stockTransferDetails);
            return "ok";
        }catch (Exception e) {
            return "save stock transfer details failed"+e.getMessage();
        }
    }



    @PutMapping
    public String updateStockTransferDetails(@RequestBody StockTransferDetails stockTransferDetails) {
        try {
            stockTransferDetailsDao.save(stockTransferDetails);
            return "ok";
        }catch (Exception e) {
            return "update stock transfer details failed"+e.getMessage();
        }
    }

    @DeleteMapping
    public String deleteStockTransferDetails(@RequestBody StockTransferDetails stockTransferDetails) {
        try {
            stockTransferDetailsDao.delete(stockTransferDetails);
            return "ok";
        }catch (Exception e) {
            return "delete stock transfer details failed"+e.getMessage();
        }
    }



}
