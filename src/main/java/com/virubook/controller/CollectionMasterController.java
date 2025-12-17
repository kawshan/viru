package com.virubook.controller;

import com.virubook.dao.CollectionMasterDao;
import com.virubook.dao.CollectionMasterDetailsDao;
import com.virubook.entity.CollectionMasterHeader;
import org.json.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/collection-master")
public class CollectionMasterController {

    @Autowired
    private CollectionMasterDao collectionMasterDao;
    @Autowired
    private CollectionMasterDetailsDao collectionMasterDetailsDao;

    @GetMapping
    public ModelAndView collectionMasterView() {
        ModelAndView collectionUI = new ModelAndView();
        collectionUI.setViewName("collectionMaster.html");
        return collectionUI;
    }

    @GetMapping(value = "/findall")
    public List<CollectionMasterHeader> findAll() {
        return collectionMasterDao.findAll();
    }

    @PostMapping
    public ResponseEntity<Object> saveCollectionMaster(@RequestBody CollectionMasterHeader header) {
        try {

            Integer existingHeaderNumber = collectionMasterDao.getNextInvoiceNumber();
            if (existingHeaderNumber == null || existingHeaderNumber.equals("")){
                header.setCollection_master_header_number(1001);
            }else {
                header.setCollection_master_header_number(existingHeaderNumber);
            }


            String existingHeaderKey = collectionMasterDao.findMaxCollectionCode();
            if (existingHeaderKey == null || existingHeaderKey.equals("")){
                header.setCollection_master_header_key("COL0001");
            }else {
                header.setCollection_master_header_key(existingHeaderKey);
            }


            CollectionMasterHeader savedHeader = collectionMasterDao.save(header);
            return ResponseEntity.ok(savedHeader);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping
    public String updateCollectionMaster(@RequestBody CollectionMasterHeader collectionMasterHeader) {
        try {
            collectionMasterDao.save(collectionMasterHeader);
            return "ok";
        }catch (Exception e) {
            return "update failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteCollectionMaster(@RequestBody CollectionMasterHeader collectionMasterHeader) {
        try {
            collectionMasterDao.deleteCollectionDetailsByCollectionHeaderKey(collectionMasterHeader.getCollection_master_header_key());
            collectionMasterDao.delete(collectionMasterHeader);
            return "ok";
        }catch (Exception e) {
            return "delete failed"+e.getMessage();
        }
    }



    @GetMapping(value = "/findIdByHeaderKey/{headerKey}")
    public String getIdFromHeaderKey(@PathVariable("headerKey") String headerKey) {
        return collectionMasterDao.findIdByHeaderKey(headerKey);
    }


}
