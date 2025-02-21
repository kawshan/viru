package com.virubook.dao;

import com.virubook.entity.ItemMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemMasterDao extends JpaRepository<ItemMaster,Integer> {

    @Query(value = "select im from ItemMaster im where im.item_name=?1")
    public ItemMaster findByItemName(String itemName);

    @Query(value = "select concat('IM',lpad(max(substring(item_code,3))+1,4,'0'))as max_item_master_code from item_master",nativeQuery = true)
    public String findMaxItemMasterCode();


}
