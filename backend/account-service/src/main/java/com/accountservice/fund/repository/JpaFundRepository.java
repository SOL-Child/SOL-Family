package com.accountservice.fund.repository;

import com.accountservice.fund.entity.Fund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaFundRepository extends JpaRepository<Fund, Long> {

}
