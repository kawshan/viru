package com.virubook.controller;

import com.virubook.dao.StockTransferHeaderDao;
import com.virubook.entity.StockTransferHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/stock-transfer")
public class StockTransferHeaderController {

    @Autowired
    private StockTransferHeaderDao stockTransferHeaderDao;


    @GetMapping(value = "/findall")
    public List<StockTransferHeader> findAll() {
        return stockTransferHeaderDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
    }

    @GetMapping
    public ModelAndView stockTransferView(){
        ModelAndView stockTransferUI = new ModelAndView();
        stockTransferUI.setViewName("stockTransfer.html");
        return stockTransferUI;
    }


    @PostMapping
    public ResponseEntity<Object> saveStockTransfer(@RequestBody StockTransferHeader stockTransferHeader) {

        try {

            String stockTransferKey = stockTransferHeaderDao.getNextStockTransferCode();
            if (stockTransferKey==null || stockTransferKey.equals("")){
                stockTransferHeader.setStock_transfer_header_key("STTR0001");
            }else {
                stockTransferHeader.setStock_transfer_header_key(stockTransferKey);
            }


            Integer stockTransferNumber = stockTransferHeaderDao.getNextStockTransferNumber();
            if (stockTransferNumber==null || stockTransferNumber.equals("")){
                stockTransferHeader.setStock_transfer_header_number(1001);
            }else {
                stockTransferHeader.setStock_transfer_header_number(stockTransferNumber);
            }



            StockTransferHeader savedStockTransferHeader = stockTransferHeaderDao.save(stockTransferHeader);
            stockTransferHeaderDao.save(savedStockTransferHeader);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedStockTransferHeader);


        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }


    }




    @PutMapping
    public String updateStockTransfer(@RequestBody StockTransferHeader stockTransferHeader) {
        try {
            stockTransferHeaderDao.save(stockTransferHeader);
            return "ok";
        }catch (Exception e) {
            return "update stockTransfer failed"+e.getMessage();
        }
    }



    @DeleteMapping
    public String deleteStockTransfer(@RequestBody StockTransferHeader stockTransferHeader) {
        try {

            //need to implement delete in details thing.


            stockTransferHeaderDao.delete(stockTransferHeader);
            return "ok";
        }catch (Exception e) {
            return "delete stockTransfer failed"+e.getMessage();
        }
    }



    @GetMapping(value = "/last-hundred-records")
    public List<StockTransferHeader> getLastHundredRecords(){
        return stockTransferHeaderDao.getLastHundredStockTransferHeaders();
    }


    @GetMapping(value = "/get_stock_transfer_from_header_key/{headerKey}")
    public StockTransferHeader getStockTransferFromHeaderKey(@PathVariable("headerKey") String headerKey){
        return stockTransferHeaderDao.getStockTransferHeaderByKey(headerKey);
    }




}
