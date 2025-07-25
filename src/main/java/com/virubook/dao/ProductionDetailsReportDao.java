package com.virubook.dao;

import com.virubook.entity.ProductionDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductionDetailsReportDao extends JpaRepository<ProductionDetails,Integer> {


    @Query(value = "select ph.production_header_date, ph.production_header_key, ph.production_header_number, im.item_short_name, sum(pd.production_details_quantity) as total_quantity from production_header as ph join production_details pd on ph.production_header_key = pd.production_details_header_key join item_master im on pd.item_master_id = im.id where ph.production_header_date between ?1 and ?2 group by ph.production_header_date, ph.production_header_key, ph.production_header_number, im.item_short_name order by ph.production_header_date asc;",nativeQuery = true)
    public List<Object[]> productionDetailsReport(String fromDate, String toDate);



}
