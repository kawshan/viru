package com.virubook.controller;

import com.virubook.dao.CollectionMasterDetailsDao;
import com.virubook.entity.CollectionMasterDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/collection-details")
public class CollectionMasterDetailsController {

    @Autowired
    private CollectionMasterDetailsDao collectionMasterDetailsDao;

    @GetMapping(value = "/findByHeaderKey/{headerKey}")
    public List<CollectionMasterDetails> findByHeaderKey(@PathVariable("headerKey")String headerKey) {
        return collectionMasterDetailsDao.getAllByHeaderKey(headerKey);
    }


    @PostMapping
    public String saveCollectionMasterDetails(@RequestBody CollectionMasterDetails collectionMasterDetails) {
        try {
            collectionMasterDetailsDao.save(collectionMasterDetails);
            return "ok";
        }catch (Exception e) {
            return "Save Collection Master Details Failed"+e.getMessage();
        }
    }


    @PutMapping
    public String updateCollectionMasterDetails(@RequestBody CollectionMasterDetails collectionMasterDetails) {
        try {
            collectionMasterDetailsDao.save(collectionMasterDetails);
            return "ok";
        }catch (Exception e) {
            return "Update Collection Master Details Failed"+e.getMessage();
        }
    }


    @DeleteMapping
    public String deleteCollectionMasterDetails(@RequestBody CollectionMasterDetails collectionMasterDetails) {
        try {
            collectionMasterDetailsDao.delete(collectionMasterDetails);
            return "ok";
        }catch (Exception e) {
            return "Delete Collection Master Details Failed"+e.getMessage();
        }
    }


    @GetMapping(value = "/getTotalAmountByHeaderkey/{headerkey}")
    public String gettotalAmountByHeaderkey(@PathVariable("headerkey")String headerkey) {
        return collectionMasterDetailsDao.getTotalValue(headerkey);
    }


}
